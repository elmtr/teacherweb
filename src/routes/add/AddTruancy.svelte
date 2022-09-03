<script>
  import axios from 'axios'
  import {tokenConfig, apiURL} from '../../axiosConfig'
  import {token} from '../../stores'
  import {pop} from 'svelte-spa-router'

  export let params = {}

  let dateDay
  let dateMonth

  async function submit() {
    try {
      const {data} = await axios.post(
        `${apiURL}/v1/teacher/truancies`,
        {dateDay, dateMonth, "subjectID": params.subjectID, "studentID": params.studentID},
        tokenConfig($token)
      )
      pop()
    } catch(error) {
      console.log(error.response.data.message)
    }
  }

</script>

<main>
  <input name="dateDay" placeholder="dateDay" type="text" bind:value={dateDay}>
  <input name="dateMonth" placeholder="dateMonth" type="text" bind:value={dateMonth}>

  <input type="submit" value="submit" on:click={submit}/>
</main>