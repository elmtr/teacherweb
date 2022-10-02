<script>

  import {token, marks} from '../../stores'
  import { postMark } from '../../fetch/set'
  import { pop } from 'svelte-spa-router'

  export let params = {}

  let value = 5
  let dateDay = "20"
  let dateMonth = "10"

</script>

<main>
  <br>
  <input name="value" placeholder="value" type="text" bind:value={value}>
  <input name="dateDay" placeholder="dateDay" type="text" bind:value={dateDay}>
  <input name="dateMonth" placeholder="dateMonth" type="text" bind:value={dateMonth}>

  <input type="submit" value="submit" on:click={async () => {
    await postMark($token, Number(value), dateDay, dateMonth, params.subjectKey, params.studentKey);
    pop()
  }}/>
</main>