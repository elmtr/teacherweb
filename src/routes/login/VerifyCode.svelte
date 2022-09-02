<script>

  import axios from 'axios'
  import {config} from '../../axiosConfig'
  import {push} from 'svelte-spa-router'

  let code

  async function submit() {
    try {
      let phone = localStorage.getItem('phone')
      const {data} = await axios.post(
        'http://127.0.0.1:4200/v1/teacher/login/verify-code',
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

  <input type="submit" value="submit" on:click={submit}/>
</main>