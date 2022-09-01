<script>

  import axios from 'axios'
  import {tokenConfig} from '../../axiosConfig'
  import {push} from 'svelte-spa-router'
  let passcode


  async function submit() {
    try {
      const {data} = await axios.post(
        'http://127.0.0.1:4200/v1/teacher/signup/passcode',
        {passcode},
        tokenConfig(localStorage.getItem("userToken"))
      )

      push('/')
    } catch(error) {
      console.log(error.response.data.message)
    }
  }

</script>

<main>
  <input name="passcode" placeholder="passcode" type="text" bind:value={passcode}>

  <input type="submit" value="submit" on:click={submit}/>
</main>