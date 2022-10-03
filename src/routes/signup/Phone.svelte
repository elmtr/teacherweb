<script>

  import axios from 'axios'
  import {tokenConfig, apiURL} from '../../axiosConfig'
  import {push} from 'svelte-spa-router'

  // kiui
  import InputValue from '../../kiui/InputValue.svelte'
  import SubmitButton from '../../kiui/SubmitButton.svelte'

  let phone

  async function submit() {
    try {
      const {data} = await axios.post(
        `${apiURL}/v1/teacher/signup/phone`,
        {phone},
        tokenConfig(localStorage.getItem("userToken"))
      )
      localStorage.setItem("phone", phone)

      push('/signup/verify-code')
    } catch(error) {
      console.log(error.response.data.message)
    }
  }

</script>

<main>
  <InputValue placeholder="phone" bind:value={phone} />

  <SubmitButton value="submit" onClick={submit} />
</main>