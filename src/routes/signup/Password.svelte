<script>

  import axios from 'axios'
  import {tokenConfig, apiURL} from '../../axiosConfig'
  import {push} from 'svelte-spa-router'

  // kiui
  import InputValue from '../../kiui/InputValue.svelte'
  import SubmitButton from '../../kiui/SubmitButton.svelte'
  
  let password

  async function submit() {
    try {
      const {data} = await axios.post(
        `${apiURL}/v1/teacher/signup/password`,
        {password},
        tokenConfig(localStorage.getItem("userToken"))
      )
      localStorage.setItem("userInfo", JSON.stringify(data.teacher))

      push('/signup/passcode')
    } catch(error) {
      console.log(error.response.data.message)
    }
  }

</script>

<main>
  <InputValue placeholder="password" bind:value={password} />

  <SubmitButton value="submit" onClick={submit} />
</main>