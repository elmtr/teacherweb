import axios from "axios"
import { push } from "svelte-spa-router";
import { tokenConfig, config, apiURL } from '../axiosConfig';

export async function signupBasic(firstName, lastName) {
  try {
    const {data} = await axios.post(
      `${apiURL}/v1/teacher/signup/basic`,
      {firstName, lastName},
      config
    )
    localStorage.setItem('userInfo', JSON.stringify(data.teacher))
    localStorage.setItem('userToken', data.token)
    push('/signup/phone')
  } catch(error) {
    console.log(error.response.data.message)
  }
}

export async function signupPhone(phone) {
  try {
    const {data} = await axios.post(
      `${apiURL}/v1/teacher/signup/phone`,
      {phone},
      tokenConfig(localStorage.getItem("userToken"))
    )
    localStorage.setItem("phone", phone)

    push('/signup/verify-code')
  } catch(error) {
    console.log(error.response.data.message)
  }
}

export async function signupVerifyCode(phone, code) {
  try {
    let phone = localStorage.getItem("phone")
    const {data} = await axios.post(
      `${apiURL}/v1/teacher/signup/verify-code`,
      {phone, code},
      tokenConfig(localStorage.getItem("userToken"))
    )
    localStorage.setItem("userToken", data.token)
    localStorage.setItem("userInfo", JSON.stringify(data.teacher))

    push('/signup/password')
  } catch(error) {
    console.log(error.response.data.message)
  }
}

export async function signupPassword(password) {
  try {
    const {data} = await axios.post(
      `${apiURL}/v1/teacher/signup/password`,
      {password},
      tokenConfig(localStorage.getItem("userToken"))
    )
    localStorage.setItem("userInfo", JSON.stringify(data.teacher))

    push('/signup/passcode')
  } catch(error) {
    console.log(error.response.data.message)
  }
}

export async function signupPasscode(passcode) {
  try {
    const {data} = await axios.post(
      `${apiURL}/v1/teacher/signup/passcode`,
      {passcode},
      tokenConfig(localStorage.getItem("userToken"))
    )
    localStorage.setItem("userInfo", JSON.stringify(data.teacher))
    localStorage.removeItem("userToken")

    push('/')
  } catch(error) {
    console.log(error.response.data.message)
  }
}