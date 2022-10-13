<script>

  import axios from 'axios'
  import {apiURL, tokenConfig} from '../../axiosConfig'
  import {pop} from 'svelte-spa-router'
  import {token} from '../../stores'

  // kiui
  import InputText from '../../kiui/Inputs/InputText.svelte'
  import SubmitButton from '../../kiui/Inputs/SubmitButton.svelte'


  let passcode
  let newPasscode

  async function submit() {
    try {
      const {data} = await axios.post(
        `${apiURL}/v1/teacher/profile/change-passcode`,
        {passcode, newPasscode},
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
  <InputText placeholder="passcode" bind:value={passcode} />
  <InputText placeholder="newPasscode" bind:value={newPasscode} />

  <SubmitButton  value="submit" on:click={submit} />
</main>