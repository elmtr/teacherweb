<script>

  import axios from 'axios'
  import {tokenConfig} from '../../axiosConfig'
  import {token, truancies} from '../../stores'
  import {push} from 'svelte-spa-router'
  import { onMount } from 'svelte';
  export let params = {}

  async function submit() {
    try {
      const {data} = await axios.patch(
        `http://127.0.0.1:4200/v1/teacher/truancies?id=${params.id}`,
        {},
        tokenConfig($token)
      )
      push(`/teacher/${params.subjectID}/${params.studentID}`)
    } catch(error) {
      console.log(error.response.data.message)
    }
  }

  async function loadTruancies() {
    if ($truancies.length < 1) {
      const {data} = await axios.get(
        `http://127.0.0.1:4200/v1/teacher/truancies?subjectID=${params.subjectID}&studentID=${params.studentID}`,
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