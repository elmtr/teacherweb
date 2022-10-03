<script>

  import axios from 'axios'
  import {config, apiURL} from '../../axiosConfig'
  import {push} from 'svelte-spa-router'
  
  // kiui
  import SubmitButton from '../../kiui/SubmitButton.svelte'

  let code

  async function submit() {
    try {
      let phone = localStorage.getItem('phone')
      const {data} = await axios.post(
        `${apiURL}/v1/teacher/login/verify-code`,
        {phone, code},
        config
      )
      localStorage.setItem('userInfo', JSON.stringify(data.teacher))
      push('/login/update')
    } catch(error) {
      console.log(error.response.data.message)
    }
  }

</script>

<main>
  <br>
  <input name="code" placeholder="code" type="text" bind:value={code}>

  <SubmitButton value="submit" onClick={submit}/>
</main>