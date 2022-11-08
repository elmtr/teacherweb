import axios from "axios"
import { push } from "svelte-spa-router";
import { tokenConfig, config, apiURL } from '../axiosConfig';
import {errorMessage, token, phoneNumber, info, loading} from '../stores'
import {get} from 'svelte/store'

export async function signupBasic(lastName, firstName, phone) {
  try {
    loading.set(true)
    const {data} = await axios.post(
      `${apiURL}/v1/teacher/signup/basic`,
      {lastName, firstName, phone},
      config
    )
    loading.set(false)
    phoneNumber.set(phone)

    localStorage.setItem('info', JSON.stringify(data.teacher))
    info.set(data.teacher)

    token.set(data.token)

    push('/signup/verify-code')
  } catch(error) {
    errorMessage.set(error.response.data.message)
    loading.set(false)
  }
}

export async function signupVerifyCode(code) {
  try {
    let phone = get(phoneNumber)
    loading.set(true)
    const {data} = await axios.post(
      `${apiURL}/v1/teacher/signup/verify-code`,
      {phone, code},
      tokenConfig(get(token))
    )
    loading.set(false)

    localStorage.setItem('info', JSON.stringify(data.teacher))
    info.set(data.teacher)

    token.set(data.token)

    push('/signup/password')
  } catch(error) {
    errorMessage.set(error.response.data.message)
    loading.set(false)
  }
}

export async function signupPassword(password) {
  try {
    loading.set(true)
    const {data} = await axios.post(
      `${apiURL}/v1/teacher/signup/password`,
      {password},
      tokenConfig(get(token))
    )
    loading.set(false)

    localStorage.setItem('info', JSON.stringify(data.teacher))
    info.set(data.teacher)

    push('/signup/passcode')
  } catch(error) {
    errorMessage.set(error.response.data.message)
    loading.set(false)
  }
}

export async function signupPasscode(passcode) {
  try {
    loading.set(true)
    const {data} = await axios.post(
      `${apiURL}/v1/teacher/signup/passcode`,
      {passcode},
      tokenConfig(get(token))
    )
    loading.set(false)
    
    localStorage.setItem('info', JSON.stringify(data.teacher))
    info.set(data.teacher)

    token.set('')

    push('/')
  } catch(error) {
    errorMessage.set(error.response.data.message)
    loading.set(false)
  }
}