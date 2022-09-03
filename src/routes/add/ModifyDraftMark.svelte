<script>

  import axios from 'axios'
  import {tokenConfig, apiURL} from '../../axiosConfig'
  import {token, draftMarks} from '../../stores'
  import {pop} from 'svelte-spa-router'
  import {writable} from 'svelte/store'
  
  export let params = {}

  const draftMark = writable({})

  let value
  let dateDay
  let dateMonth

  async function submit() {
    try {
      const {data} = await axios.put(
        `${apiURL}/v1/teacher/draftmarks`,
        {"id": params.id, "value": Number(value), dateDay, dateMonth, "subjectID": params.subjectID, "studentID": params.studentID},
        tokenConfig($token)
      )
      pop()
    } catch(error) {
      console.log(error.response.data.message)
    }
  }

  async function loadDraftMarks() {
    if ($draftMarks.length < 1) {
      const {data} = await axios.get(
        `${apiURL}/v1/teacher/draftmarks?subjectID=${params.subjectID}&studentID=${params.studentID}`,
        tokenConfig($token),
      )
      data.forEach(iDraftMark => {
        if (iDraftMark.id == params.id) {
          draftMark.set(iDraftMark)
        }
      });
      value = $draftMark.value
      dateDay = $draftMark.dateDay
      dateMonth = $draftMark.dateMonth
      return data
    } else {
      $draftMarks.forEach(iDraftMark => {
        if (iDraftMark.id == params.id) {
          draftMark.set(iDraftMark)
        }
      });
      value = $draftMark.value
      dateDay = $draftMark.dateDay
      dateMonth = $draftMark.dateMonth
      return $draftMarks
    }
  }

</script>

<main>
  {#await loadDraftMarks() then draftMarks}
    {#each draftMarks as draftMark}
        {#if draftMark.id == params.id}
          <input name="value" placeholder="value" type="text" bind:value={value}>
          <input name="dateDay" placeholder="dateDay" type="text" bind:value={dateDay}>
          <input name="dateMonth" placeholder="dateMonth" type="text" bind:value={dateMonth}>
        {/if}
    {/each}
  {/await}
  <br>

  <input type="submit" value="modify nota ciorna" on:click={submit}/>
</main>