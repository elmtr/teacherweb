import axios from "axios"
import { tokenConfig, apiURL } from '../axiosConfig';
import {sortPeriods} from '../sort/sort'
import {students, marks, timetable, school} from '../stores'

export async function fetchSchool(token) {
  let schoolValue = {}
  school.subscribe(value => {
    schoolValue = value
  })
  if (!schoolValue[1]) {
    const {data} = await axios.get(
      `${apiURL}/v1/teacher/timetable/school`,
      tokenConfig(token),
    )
    schoolValue = data
    school.set(schoolValue)
  }
  return schoolValue
}

export async function fetchTimetable(token) {
  let timetableValue = {}
  timetable.subscribe(value => {
    timetableValue = value
  })
  if (!timetableValue[1]) {
    const {data} = await axios.get(
      `${apiURL}/v1/teacher/timetable`,
      tokenConfig(token),
    )
    timetableValue = sortPeriods(data)
    timetable.set(timetableValue)
  }
  return timetableValue
}

export async function fetchStudents(token, gradeKey) {
  let studentsValue = {}
  students.subscribe(value => {
    studentsValue = value
  })
  if (!studentsValue[gradeKey]) {
    const {data} = await axios.get(
      `${apiURL}/v1/teacher/students?gradeKey=${gradeKey}`,
      tokenConfig(token),
    )
    studentsValue[gradeKey] = data
    students.set(studentsValue)
  }
  return studentsValue[gradeKey]
}

export async function fetchPoints(token, subjectKey, studentKey) {
  const {data} = await axios.get(
    `${apiURL}/v1/teacher/points?subjectKey=${subjectKey}&studentKey=${studentKey}`,
    tokenConfig(token),
  )

  return data
}

export async function fetchDraftMarks(token, subjectKey, studentKey) {
  const {data} = await axios.get(
    `${apiURL}/v1/teacher/draftMarks?subjectKey=${subjectKey}&studentKey=${studentKey}`,
    tokenConfig(token),
  )
  return data
}

export async function fetchMarks(token, subjectKey, studentKey) {
  let marksValue = {}
  marks.subscribe(value => {
    marksValue = value
  })
  if (!marksValue[subjectKey][studentKey]) {
    const {data} = await axios.get(
      `${apiURL}/v1/teacher/marks?subjectKey=${subjectKey}&studentKey=${studentKey}`,
      tokenConfig(token),
    )
    console.log(data)
    marksValue[subjectKey][studentKey] = data
    marks.set(marksValue)
  }
  return marksValue[subjectKey][studentKey]
}

export async function fetchTruancies(token, subjectKey, studentKey) {
  const {data} = await axios.get(
    `${apiURL}/v1/teacher/truancies?subjectKey=${subjectKey}&studentKey=${studentKey}`,
    tokenConfig(token),
  )
  return data
}

export async function patchDecreasePoints($token, key) {
  const {data} = await axios.patch(
    `${apiURL}/v1/teacher/points/decrease?key=${key}`,
    {},
    tokenConfig($token)
  )
}

export async function patchIncreasePoints($token, key) {
  const {data} = await axios.patch(
    `${apiURL}/v1/teacher/points/increase?key=${key}`,
    {},
    tokenConfig($token)
  )
}