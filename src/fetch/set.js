import axios from "axios"
import { tokenConfig, apiURL } from '../axiosConfig';
import {draftMarks, loading, marks} from '../stores'
import {get} from 'svelte/store'

export async function postMark(
  token, value, dateDay, dateMonth, subjectKey, studentKey
) {
  try {
    loading.set(true)
    const {data} = await axios.post(
      `${apiURL}/v1/teacher/marks`,
      {value, dateDay, dateMonth, subjectKey, studentKey},
      tokenConfig(token)
    )
    loading.set(false)
  } catch(error) {
    console.log(error.response.data.message)
    loading.set(false)
  }
}

export async function postDraftMark(
  token, value, dateDay, dateMonth, subjectKey, studentKey
) {
  try {
    loading.set(true)
    const {data} = await axios.post(
      `${apiURL}/v1/teacher/draftmarks`,
      {value, dateDay, dateMonth, subjectKey, studentKey},
      tokenConfig(token)
    )
    loading.set(false)
  } catch(error) {
    console.log(error.response.data.message)
    loading.set(false)
  }
}

export async function postTruancy(
  token, dateDay, dateMonth, subjectKey, studentKey
) {
  try {
    loading.set(true)
    const {data} = await axios.post(
      `${apiURL}/v1/teacher/truancies`,
      {dateDay, dateMonth, subjectKey, studentKey},
      tokenConfig(token)
    )
    loading.set(false)
  } catch(error) {
    console.log(error.response.data.message)
    loading.set(false)
  }
}