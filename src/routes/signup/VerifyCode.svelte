<script>
  // kiui
  import InputText from '../../kiui/Inputs/InputText.svelte'
  import SubmitButton from '../../kiui/Inputs/SubmitButton.svelte'
  import { signupVerifyCode } from '../../fetch/signup'
  
  let code = ""
</script>

<main>
  <InputText placeholder="verify-code" bind:value={code} />

  <SubmitButton value="submit" onClick={signupVerifyCode} />
</main>