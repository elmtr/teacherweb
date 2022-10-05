<script>
  
  import {token, subjects, students} from '../../stores';

  import {fetchStudents} from '../../fetch/fetch';
  import { writable } from 'svelte/store'

  // kiui
  import Subjects from '../../kiui/Subjects.svelte'
  import Student from '../../kiui/Student.svelte'
  import HeaderBack from '../../kiui/HeaderBack.svelte'
    import Grade from '../../kiui/Grade.svelte'

  export let params = {}

  let currentSubject = writable("");

  let roman = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII", "XIII"]

</script>

<HeaderBack />


{#if $currentSubject}
  <div id="heading">
    Clasa a {roman[$subjects[params.gradeKey][$currentSubject].grade.gradeNumber]}-a
    {$subjects[params.gradeKey][$currentSubject].grade.gradeLetter.toUpperCase()}
  </div>
{/if}

<Subjects subjects={$subjects} gradeKey={params.gradeKey} {currentSubject} />

{#await fetchStudents($token, params.gradeKey) then students}
  {#each students as student}
    <Student gradeKey={params.gradeKey} {currentSubject} {student} />
  {/each}
{/await}

<style scoped>
	#heading {
		font-size: 2em;
		color: var(--black);
		margin-left: 18px;
		margin-top: 10px;
		margin-bottom: 5px;
		font-weight: 600;
		font-family: var(--sans-serif);
	}
</style>