<script>

  import axios from 'axios'
  import {tokenConfig} from '../../axiosConfig'
  import {token} from '../../stores'
  import {push} from 'svelte-spa-router'
  export let params = {}
  let value
  let dateDay
  let dateMonth

  async function submit() {
    try {
      const {data} = await axios.post(
        'http://127.0.0.1:4200/v1/teacher/draftmarks',
        {"value": Number(value), dateDay, dateMonth, "subjectID": params.subjectID, "studentID": params.studentID},
        tokenConfig($token)
      )
      push(`/teacher/${params.subjectID}/${params.studentID}`)
    } catch(error) {
      console.log(error.response.data.message)
    }
  }

</script>

<main>
  <br>
  <input name="value" placeholder="value" type="text" bind:value={value}>
  <input name="dateDay" placeholder="dateDay" type="text" bind:value={dateDay}>
  <input name="dateMonth" placeholder="dateMonth" type="text" bind:value={dateMonth}>


  <input type="submit" value="submit" on:click={submit}/>
</main>