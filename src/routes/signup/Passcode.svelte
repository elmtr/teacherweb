<script>

  import axios from 'axios'
  import {tokenConfig, apiURL} from '../../axiosConfig'
  import {push} from 'svelte-spa-router'

  // kiui
  import InputValue from '../../kiui/InputValue.svelte'
  import SubmitButton from '../../kiui/SubmitButton.svelte'
  
  let passcode

  async function submit() {
    try {
      const {data} = await axios.post(
        `${apiURL}/v1/teacher/signup/passcode`,
        {passcode},
        tokenConfig(localStorage.getItem("userToken"))
      )
      localStorage.setItem("userInfo", JSON.stringify(data.student))
      localStorage.removeItem("userToken")

      push('/')
    } catch(error) {
      console.log(error.response.data.message)
    }
  }

</script>

<main>
  <InputValue placeholder="passcode" bind:value={passcode} />

  <SubmitButton value="submit" onCclick={submit}/>
</main>