<script>
  
  // kiui
  import SubmitButton from '../../kiui/Inputs/SubmitButton.svelte'
  import { loginVerifyCode } from '../../fetch/login'

  let code

</script>

<main>
  <br>
  <input name="code" placeholder="code" type="text" bind:value={code}>

  <SubmitButton value="submit" onClick={loginVerifyCode}/>
</main>