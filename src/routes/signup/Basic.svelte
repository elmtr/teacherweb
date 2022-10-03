<script>

  import axios from 'axios'
  import {config, apiURL} from '../../axiosConfig'
  import {push} from 'svelte-spa-router'

  // kiui
  import InputValue from '../../kiui/InputValue.svelte'
  import SubmitButton from '../../kiui/SubmitButton.svelte'


  let firstName
  let lastName

  async function submit() {
    try {
      const {data} = await axios.post(
        `${apiURL}/v1/teacher/signup/basic`,
        {firstName, lastName},
        config
      )
      localStorage.setItem('userInfo', JSON.stringify(data.teacher))
      localStorage.setItem('userToken', data.token)
      push('/signup/phone')
    } catch(error) {
      console.log(error.response.data.message)
    }
  }

</script>

<main>
  <br>
  <InputValue placeholder="firstName" bind:value={firstName} />
  <InputValue placeholder="lastName" bind:value={lastName} />

  <SubmitButton value="submit" onClick={submit} />
</main>