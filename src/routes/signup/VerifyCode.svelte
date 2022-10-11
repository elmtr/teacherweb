<script>
  // kiui
  import InputValue from '../../kiui/Inputs/InputValue.svelte'
  import SubmitButton from '../../kiui/Inputs/SubmitButton.svelte'
  import { signupVerifyCode } from '../../fetch/signup'
  
  let code = ""
</script>

<main>
  <InputValue placeholder="verify-code" bind:value={code} />

  <SubmitButton value="submit" onClick={signupVerifyCode} />
</main>