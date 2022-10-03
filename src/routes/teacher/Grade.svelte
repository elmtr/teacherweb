<script>
  
  import {token, subjects, students} from '../../stores';

  import {fetchStudents} from '../../fetch/fetch';
  import { writable } from 'svelte/store'

  import Subjects from '../../kiui/Subjects.svelte'
  import Student from '../../kiui/Student.svelte'

  export let params = {}

  let currentSubject = writable("");

</script>

<Subjects subjects={$subjects} gradeKey={params.gradeKey} {currentSubject} />

{#await fetchStudents($token, params.gradeKey) then students}
  {#each students as student}
    <Student gradeKey={params.gradeKey} {currentSubject} {student} />
  {/each}
{/await}