<script>
  
  import {token, subjects, students} from '../../stores';

  import {fetchStudents} from '../../fetch/fetch';
  import { writable } from 'svelte/store'

  // kiui
  import Subjects from '../../kiui/Slide/Subjects.svelte'
  import Student from '../../kiui/Student.svelte'
  import HeaderBack from '../../kiui/HeaderBack.svelte'
  import Loader from '../../kiui/Loader.svelte'

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

<Loader />

<Subjects subjects={$subjects} gradeKey={params.gradeKey} {currentSubject} />

{#await fetchStudents($token, params.gradeKey) then students}
  {#if students.length > 0}
    {#each students as student}
      <Student gradeKey={params.gradeKey} {currentSubject} {student} />
    {/each}
  {:else}
    <div id="no-students">
      <span>Nu sunt elevi în clasă</span>
    </div>
  {/if}
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

  #no-students {
    width: 100%;
    text-align: center;
    margin-top: 30vh;
    font-family: var(--sans-serif);
    color: var(--darkgreen);
  }
</style>