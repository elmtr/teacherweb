<script>
  import axios from 'axios'
  import {tokenConfig, apiURL} from '../../axiosConfig'
  import {token} from '../../stores'
  import {pop} from 'svelte-spa-router'
    import { postTruancy } from '../../fetch/set'

  export let params = {}

  let dateDay
  let dateMonth


</script>

<main>
  <input name="dateDay" placeholder="dateDay" type="text" bind:value={dateDay}>
  <input name="dateMonth" placeholder="dateMonth" type="text" bind:value={dateMonth}>

  <input type="submit" value="submit" on:click={async () => {
    await postTruancy(token, dateDay, dateMonth, params.subjectKey, params.studentKey)
    pop()
  }}/>
</main>