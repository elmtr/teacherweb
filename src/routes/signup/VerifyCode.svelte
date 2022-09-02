<script>

  import axios from 'axios'
  import {tokenConfig} from '../../axiosConfig'
  import {push} from 'svelte-spa-router'
  
  let code

  async function submit() {
    try {
      let phone = localStorage.getItem("phone")
      const {data} = await axios.post(
        'http://127.0.0.1:4200/v1/teacher/signup/verify-code',
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
  <input name="verify-code" placeholder="verify-code" type="text" bind:value={code} />

  <input type="submit" value="submit" on:click={submit}/>
</main>