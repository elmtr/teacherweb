<script>

  import axios from 'axios'
  import {tokenConfig, apiURL} from '../../axiosConfig'
  import {token, truancies} from '../../stores'
  import {pop} from 'svelte-spa-router'

  export let params = {}

  async function submit() {
    try {
      const {data} = await axios.patch(
        `${apiURL}/v1/teacher/truancies?id=${params.id}`,
        {},
        tokenConfig($token)
      )
      pop()
    } catch(error) {
      console.log(error.response.data.message)
    }
  }

  async function loadTruancies() {
    if ($truancies.length < 1) {
      const {data} = await axios.get(
        `${apiURL}/v1/teacher/truancies?subjectID=${params.subjectID}&studentID=${params.studentID}`,
        tokenConfig($token),
      )
      truancies.set(data)
      console.log($truancies)
      return data
    } else {
      return $truancies
    }
  }

</script>

<main>
  {#await loadTruancies() then truancies}
    {#each truancies as truancy}
        {#if truancy.id == params.id}
          {truancy.dateDay}.{truancy.dateMonth}
        {/if}
    {/each}
  {/await}
  <br>

  <input type="submit" value="motiveaza absenta" on:click={submit}/>
</main>