<script>
  import {writable} from 'svelte/store';

  import {students, token} from '../../stores';

  import {
    fetchStudents
  } from '../../fetch/fetch'

  // kiui
  import Points from '../../kiui/Points.svelte'
  import Marks from '../../kiui/Marks.svelte'
  import DraftMarks from '../../kiui/DraftMarks.svelte'
  import Truancies from '../../kiui/Truancies.svelte'
  import HeaderBack from '../../kiui/HeaderBack.svelte'
  
  // kiui dialog
  import MotivateTruancy from '../../kiui/MotivateTruancy.svelte'

  let student = writable({})

  export let params = {}

  function selectStudent(students) {
    for (let index in students) {
      let selStudent = students[index] 
      if (selStudent.key === params.studentKey) {
        student.set(selStudent)
      }
    }

    return ''
  } 

  console.log($students)

</script>

<HeaderBack />

{#await fetchStudents($token, params.gradeKey) then students}
  {selectStudent(students)}
  <div id="heading">
    {$student.firstName} {$student.lastName}
  </div>
{/await}

<Points subjectKey={params.subjectKey} studentKey={params.studentKey} />

<DraftMarks subjectKey={params.subjectKey} studentKey={params.studentKey} />

<Marks subjectKey={params.subjectKey} studentKey={params.studentKey} />

<Truancies subjectKey={params.subjectKey} studentKey={params.studentKey} />

<MotivateTruancy />

<style scoped>
  #heading {
    font-size: 2em;
		color: var(--black);
		margin-left: 18px;
		margin-top: 10px;
		margin-bottom: 15px;
		font-weight: 700;
		font-family: var(--sans-serif);
  }
</style>
