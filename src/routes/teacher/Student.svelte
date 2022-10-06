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
  import AddTruancy from '../../kiui/AddTruancy.svelte'
  import AddMark from '../../kiui/AddMark.svelte'
  import AddDraftMark from '../../kiui/AddDraftMark.svelte'
  import ModifyDraftMark from '../../kiui/ModifyDraftMark.svelte'

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

<!-- pop-ups -->
<MotivateTruancy />
<AddTruancy {params} />
<AddMark {params} />
<AddDraftMark {params} />
<ModifyDraftMark {params} />

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
