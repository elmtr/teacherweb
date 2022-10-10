<script>

  import axios from 'axios'
  import {config, apiURL} from '../../axiosConfig'
  import {push} from 'svelte-spa-router'

  // kiui
  import InputValue from '../../kiui/Inputs/InputValue.svelte'
  import InputPassword from '../../kiui/Inputs/InputPassword.svelte'
  import SubmitButton from '../../kiui/Inputs/InputPassword.svelte'

  let phone
  let password

  async function submit() {
    try {
      const {data} = await axios.post(
        `${apiURL}/v1/teacher/login`,
        {phone, password},
        config
      )
      localStorage.setItem('phone', phone)
      push('/login/verify-code')
    } catch(error) {
      console.log(error.response.data.message)
    }
  }

</script>

<main>
  <br>
  <InputValue placeholder="Numarul de telefon" bind:value={phone} />
  <InputPassword placeholder="Parola" bind:value={password} />

  <SubmitButton value="submit" onClick={submit} />
</main>