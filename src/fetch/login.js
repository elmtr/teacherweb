import axios from "axios"
import { push } from "svelte-spa-router";
import { config, tokenConfig, apiURL} from '../axiosConfig';
import {token, info, subjects, grades, errorMessage, phoneNumber} from '../stores'
import {get} from 'svelte/store'

import {sortSubjects, sortGrades} from '../sort/sort'

export async function login(phone, password) {
  try {
    const {data} = await axios.post(
      `${apiURL}/v1/teacher/login`,
      {phone, password},
      config
    )
    phoneNumber.set(phone)

    push('/login/verify-code')
  } catch(error) {
    errorMessage.set(error.response.data.message)
  }
}

export async function loginVerifyCode(code) {
  try {
    let phone = get(phoneNumber)
    const {data} = await axios.post(
      `${apiURL}/v1/teacher/login/verify-code`,
      {phone, code},
      config
    )
    localStorage.setItem('info', JSON.stringify(data.teacher))

		info.set(data.teacher)
    subjects.set(sortSubjects(get(info).subjects))
    grades.set(sortGrades(get(info).subjects))

    push('/login/update')
  } catch(error) {
    errorMessage.set(error.response.data.message)
  }
}

export async function loginUpdate(phone, passcode) {
  try {
    const {data} = await axios.post(
      `${apiURL}/v1/teacher/login/update`,
      {phone, passcode},
    )
    localStorage.setItem('info', JSON.stringify(data.teacher))

    token.set(data.token)
    info.set(data.teacher)

    // keep it logged in
    // localStorage.setItem("token", data.token)

    push('/')
  } catch(error) {
    errorMessage.set(error.response.data.message)
  }
}