<script>
  import {writable} from 'svelte/store';

  import {token} from '../../stores';

  import {
    fetchStudents
  } from '../../fetch/fetch'

  // kiui
  import Points from '../../kiui/Dashboard/Points.svelte'
  import Marks from '../../kiui/Dashboard/Marks.svelte'
  import DraftMarks from '../../kiui/Dashboard/DraftMarks.svelte'
  import Truancies from '../../kiui/Dashboard/Truancies.svelte'
  import HeaderBack from '../../kiui/HeaderBack.svelte'
  import Loader from '../../kiui/Loader.svelte'
  
  // kiui dialog
  import MotivateTruancy from '../../kiui/PopUps/MotivateTruancy.svelte'
  import AddTruancy from '../../kiui/PopUps/AddTruancy.svelte'
  import AddMark from '../../kiui/PopUps/AddMark.svelte'
  import AddDraftMark from '../../kiui/PopUps/AddDraftMark.svelte'
  import ModifyDraftMark from '../../kiui/PopUps/ModifyDraftMark.svelte'
  import DefinitivateDraftMark from '../../kiui/PopUps/DefinitivateDraftMark.svelte'

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
</script>

<HeaderBack />

{#await fetchStudents($token, params.gradeKey) then students}
  {selectStudent(students)}
  <div id="heading">
    {$student.lastName} {$student.firstName}
  </div>
{/await}

<Loader />

<Points subjectKey={params.subjectKey} studentKey={params.studentKey} mod={true}  />

<DraftMarks subjectKey={params.subjectKey} studentKey={params.studentKey} mod={true} />

<Marks subjectKey={params.subjectKey} studentKey={params.studentKey} mod={true}  />

<Truancies subjectKey={params.subjectKey} studentKey={params.studentKey} mod={true}  />

<!-- pop-ups -->
<MotivateTruancy />
<AddTruancy {params} />
<AddMark {params} />
<AddDraftMark {params} />
<ModifyDraftMark {params} />
<DefinitivateDraftMark />

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
