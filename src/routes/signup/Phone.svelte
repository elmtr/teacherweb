<script>
  import {signupPhone} from '../../fetch/signup'

  // kiui
  import InputValue from '../../kiui/Inputs/InputValue.svelte'
  import SubmitButton from '../../kiui/Inputs/SubmitButton.svelte'

  let phone = ""
</script>

<main>
  <label for="phone"></label>
  +4 <InputValue placeholder="Numar de telefon" bind:value={phone} />

  <SubmitButton value="submit" onClick={signupPhone} />
</main>