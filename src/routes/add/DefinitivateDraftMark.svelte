<script>

  import axios from 'axios'
  import {tokenConfig, apiURL} from '../../axiosConfig'
  import {token, draftMarks} from '../../stores'
  import {pop} from 'svelte-spa-router'

  export let params = {}

  async function submit() {
    try {
      const {data} = await axios.post(
        `${apiURL}/v1/teacher/draftmarks/definitivate?id=${params.key}`,
        {},
        tokenConfig($token)
      )
      pop()
    } catch(error) {
      console.log(error.response.data.message)
    }
  }

  async function fetchDraftMarks() {
    if ($draftMarks.length < 1) {
      const {data} = await axios.get(
        `${apiURL}/v1/teacher/draftmarks?subjectKey=${params.subjectKey}&studentKey=${params.studentKey}`,
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
  {#await fetchDraftMarks() then draftMarks}
    {#each draftMarks as draftMark}
        {#if draftMark.key == params.key}
          {draftMark.value} - {draftMark.dateDay}.{draftMark.dateMonth}
        {/if}
    {/each}
  {/await}
  <br>

  <input type="submit" value="definitiveaza nota ciorna" on:click={submit}/>
</main>