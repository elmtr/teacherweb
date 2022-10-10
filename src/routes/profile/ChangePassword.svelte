<script>

  import axios from 'axios'
  import {apiURL, tokenConfig} from '../../axiosConfig'
  import {pop} from 'svelte-spa-router'
  import {token} from '../../stores'

  // kiui
  import InputValue from '../../kiui/Inputs/InputValue.svelte'
  import SubmitButton from '../../kiui/Inputs/InputValue.svelte'


  let password
  let newPassword

  async function submit() {
    try {
      const {data} = await axios.post(
        `${apiURL}/v1/teacher/profile/change-password`,
        {password, newPassword},
        tokenConfig($token),
      )
      localStorage.setItem('userInfo', JSON.stringify(data))
      pop()
    } catch(error) {
      console.log(error.response.data.message)
    }
  }

</script>

<main>
  <br>
  <InputValue placeholder="password" bind:value={password} />
  <InputValue placeholder="newPassword" bind:value={newPassword} />

  <SubmitButton  value="submit" on:click={submit} />
</main>