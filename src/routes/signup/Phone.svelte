<script>

  import axios from 'axios'
  import {tokenConfig} from '../../axiosConfig'
  import {push} from 'svelte-spa-router'

  let phone

  async function submit() {
    try {
      const {data} = await axios.post(
        'http://127.0.0.1:4200/v1/teacher/signup/phone',
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
  <input name="phone" placeholder="phone" type="text" bind:value={phone}>

  <input type="submit" value="submit" on:click={submit}/>
</main>