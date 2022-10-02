<script>

  import axios from 'axios'
  import {tokenConfig, apiURL} from '../../axiosConfig'
  import {token} from '../../stores'
  import {pop} from 'svelte-spa-router'
  import {postDraftMark} from '../../fetch/set'

  export let params = {}

  let value = 10
  let dateDay = "21"
  let dateMonth = "09"

</script>

<main>
  <br>
  <input name="value" placeholder="value" type="text" bind:value={value}>
  <input name="dateDay" placeholder="dateDay" type="text" bind:value={dateDay}>
  <input name="dateMonth" placeholder="dateMonth" type="text" bind:value={dateMonth}>

  <input type="submit" value="submit" on:click={async () => {
    await postDraftMark($token, Number(value), dateDay, dateMonth, params.subjectKey, params.studentKey);
    pop()
  }}/>
</main>