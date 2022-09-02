<script>

  import axios from 'axios'
  import {tokenConfig} from '../../axiosConfig'
  import {token, draftMarks} from '../../stores'
  import {pop, push} from 'svelte-spa-router'

  export let params = {}

  async function submit() {
    try {
      const {data} = await axios.post(
        `http://127.0.0.1:4200/v1/teacher/draftmarks/definitivate?id=${params.id}`,
        {},
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
        `http://127.0.0.1:4200/v1/teacher/draftmarks?subjectID=${params.subjectID}&studentID=${params.studentID}`,
        tokenConfig($token),
      )
      draftMarks.set(data)
      console.log($draftMarks)
      return data
    } else {
      return $draftMarks
    }
  }

</script>

<main>
  {#await loadDraftMarks() then draftMarks}
    {#each draftMarks as draftMark}
        {#if draftMark.id == params.id}
          {draftMark.value} - {draftMark.dateDay}.{draftMark.dateMonth}
        {/if}
    {/each}
  {/await}
  <br>

  <input type="submit" value="definitiveaza nota ciorna" on:click={submit}/>
</main>