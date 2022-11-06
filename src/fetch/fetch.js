import axios from "axios"
import { tokenConfig, apiURL } from '../axiosConfig';
import {sortPeriods} from '../sort/sort'
import {get} from 'svelte/store'
import {students, draftMarks,  marks, truancies, timetable, school} from '../stores'

export async function fetchSchool(token) {
  let schoolValue = {}
  school.subscribe(value => {
    schoolValue = value
  })
  if (!schoolValue.key) {
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

    data.sort((a, b) => {
      if (a.lastName + "" + a.firstName < b.lastName + "" + b.firstName) {
        return -1;
      }
      if (a.lastName + "" + a.firstName > b.lastName + "" + b.firstName) {
        return 1;
      }
      return 0;
    })
    studentsValue[gradeKey] = data
    students.set(studentsValue)
  }
  return studentsValue[gradeKey]
}

export async function fetchDraftMarks(token, subjectKey, studentKey) {
  const {data} = await axios.get(
    `${apiURL}/v1/teacher/draftMarks?subjectKey=${subjectKey}&studentKey=${studentKey}`,
    tokenConfig(token),
  )  
  draftMarks.set(data)

  return data
}

export async function fetchMarks(token, subjectKey, studentKey) {
  const {data} = await axios.get(
    `${apiURL}/v1/teacher/marks?subjectKey=${subjectKey}&studentKey=${studentKey}`,
    tokenConfig(token),
  )  
  marks.set(data)

  return data
}

export async function fetchTruancies(token, subjectKey, studentKey) {
  const {data} = await axios.get(
    `${apiURL}/v1/teacher/truancies?subjectKey=${subjectKey}&studentKey=${studentKey}`,
    tokenConfig(token),
  )  
  truancies.set(data)

  return data
}

export async function fetchPoints(token, subjectKey, studentKey) {
  const {data} = await axios.get(
    `${apiURL}/v1/teacher/points?subjectKey=${subjectKey}&studentKey=${studentKey}`,
    tokenConfig(token),
  )

  return data
}
