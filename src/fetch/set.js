import axios from "axios"
import { tokenConfig, apiURL } from '../axiosConfig';
import {draftMarks, marks} from '../stores'
import {get} from 'svelte/store'

export async function postMark(
  token, value, dateDay, dateMonth, subjectKey, studentKey
) {
  try {
    const {data} = await axios.post(
      `${apiURL}/v1/teacher/marks`,
      {value, dateDay, dateMonth, subjectKey, studentKey},
      tokenConfig(token)
    )
  } catch(error) {
    console.log(error.response.data.message)
  }
}

export async function postDraftMark(
  token, value, dateDay, dateMonth, subjectKey, studentKey
) {
  try {
    const {data} = await axios.post(
      `${apiURL}/v1/teacher/draftmarks`,
      {value, dateDay, dateMonth, subjectKey, studentKey},
      tokenConfig(token)
    )
  } catch(error) {
    console.log(error.response.data.message)
  }
}

export async function postTruancy(
  token, dateDay, dateMonth, subjectKey, studentKey
) {
  try {
    const {data} = await axios.post(
      `${apiURL}/v1/teacher/truancies`,
      {dateDay, dateMonth, subjectKey, studentKey},
      tokenConfig(token)
    )
  } catch(error) {
    console.log(error.response.data.message)
  }
}