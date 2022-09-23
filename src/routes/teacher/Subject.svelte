<script>
  
  import {token, subjects, students} from '../../stores';
  import {link, push} from 'svelte-spa-router';

  import {fetchStudents} from '../../fetch/fetch';
  import { writable } from 'svelte/store'

  export let params = {}

  const nextSubject = writable("");
  const currentSubject = writable("")
  currentSubject.set(Object.keys($subjects[params.gradeKey])[0])
  console.log($currentSubject)
  const prevSubject = writable("");
  
  let subjectKeys = Object.keys($subjects[params.gradeKey]).concat(Object.keys($subjects[params.gradeKey]))

  function loadSubjects() {
    for (let i = 0; i <= subjectKeys.length - 1; i++) {
      if (subjectKeys[i] == $currentSubject) {
        nextSubject.set(subjectKeys[i + 1])
        break 
      }
    }

    for (let i = subjectKeys.length - 1; i >= 1; i--) {
      if (subjectKeys[i] == $currentSubject) {
        prevSubject.set(subjectKeys[i - 1])
        break
      }
    }
  }

</script>

<span on:click={() => {
  loadSubjects()
  currentSubject.set($prevSubject)
}}>prev</span>

<div>
  {$subjects[params.gradeKey][$currentSubject].name}
</div>

<span on:click={() => {
  loadSubjects()
  currentSubject.set($nextSubject)
}}>next</span><br>

{#await fetchStudents($token, params.gradeKey) then students}
  {#each students as student}
    <a href="/teacher/{params.gradeKey}/{$currentSubject}/{student.key}" use:link>{student.lastName} {student.firstName}</a><br>
  {/each}
{/await}