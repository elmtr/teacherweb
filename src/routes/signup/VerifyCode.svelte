<script>

  import axios from 'axios'
  import {tokenConfig, apiURL} from '../../axiosConfig'
  import {push} from 'svelte-spa-router'

  // kiui
  import InputValue from '../../kiui/InputValue.svelte'
  import SubmitButton from '../../kiui/SubmitButton.svelte'
  
  let code

  async function submit() {
    try {
      let phone = localStorage.getItem("phone")
      const {data} = await axios.post(
        `${apiURL}/v1/teacher/signup/verify-code`,
        {phone, code},
        tokenConfig(localStorage.getItem("userToken"))
      )
      localStorage.setItem("userToken", data.token)
      localStorage.setItem("userInfo", JSON.stringify(data.teacher))

      push('/signup/password')
    } catch(error) {
      console.log(error.response.data.message)
    }
  }

</script>

<main>
  <InputValue placeholder="verify-code" bind:value={code} />

  <SubmitButton value="submit" onClick={submit} />
</main>