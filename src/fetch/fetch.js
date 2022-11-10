import axios from "axios"
import { tokenConfig, apiURL } from '../axiosConfig';
import {sortPeriods} from '../sort/sort'
import {get} from 'svelte/store'
import {students, draftMarks,  marks, truancies, timetable, school, loading, interval, now} from '../stores'
import {findInterval} from '../utils/utils'

export async function fetchSchool(token) {
  let schoolValue = {}
  school.subscribe(value => {
    schoolValue = value
  })
  if (!schoolValue.key) {
    loading.set(true)
    const {data} = await axios.get(
      `${apiURL}/v1/teacher/timetable/school`,
      tokenConfig(token),
    )
    loading.set(false)
    schoolValue = data
    interval.set(findInterval(schoolValue.intervals, get(now)))
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
    loading.set(true)
    const {data} = await axios.get(
      `${apiURL}/v1/teacher/timetable`,
      tokenConfig(token),
    )
    loading.set(false)
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
    loading.set(true)
    const {data} = await axios.get(
      `${apiURL}/v1/teacher/students?gradeKey=${gradeKey}`,
      tokenConfig(token),
    )
    loading.set(false)

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
  loading.set(true)
  const {data} = await axios.get(
    `${apiURL}/v1/teacher/draftMarks?subjectKey=${subjectKey}&studentKey=${studentKey}`,
    tokenConfig(token),
  )
  loading.set(false)
  draftMarks.set(data)

  return data
}

export async function fetchMarks(token, subjectKey, studentKey) {
  loading.set(true)
  const {data} = await axios.get(
    `${apiURL}/v1/teacher/marks?subjectKey=${subjectKey}&studentKey=${studentKey}`,
    tokenConfig(token),
  )
  loading.set(false)
  marks.set(data)

  return data
}

export async function fetchTruancies(token, subjectKey, studentKey) {
  loading.set(true)
  const {data} = await axios.get(
    `${apiURL}/v1/teacher/truancies?subjectKey=${subjectKey}&studentKey=${studentKey}`,
    tokenConfig(token),
  )
  loading.set(false)
  truancies.set(data)

  return data
}

export async function fetchPoints(token, subjectKey, studentKey) {
  loading.set(true)
  const {data} = await axios.get(
    `${apiURL}/v1/teacher/points?subjectKey=${subjectKey}&studentKey=${studentKey}`,
    tokenConfig(token),
  )
  loading.set(false)
  
  return data
}
