<script>

  import axios from 'axios'
  import {tokenConfig, apiURL} from '../../axiosConfig'
  import {token, truancies} from '../../stores'
  import {pop} from 'svelte-spa-router'

  export let params = {}

  async function submit() {
    try {
      const {data} = await axios.patch(
        `${apiURL}/v1/teacher/truancies?id=${params.key}`,
        {},
        tokenConfig($token)
      )
      pop()
    } catch(error) {
      console.log(error.response.data.message)
    }
  }

  async function fetchTruancies() {
    if ($truancies.length < 1) {
      const {data} = await axios.get(
        `${apiURL}/v1/teacher/truancies?subjectKey=${params.subjectKey}&studentKey=${params.studentKey}`,
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
  {#await fetchTruancies() then truancies}
    {#each truancies as truancy}
        {#if truancy.key == params.key}
          {truancy.dateDay}.{truancy.dateMonth}
        {/if}
    {/each}
  {/await}
  <br>

  <input type="submit" value="motiveaza absenta" on:click={submit}/>
</main>