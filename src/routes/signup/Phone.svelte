<script>
  import {signupPhone} from '../../fetch/signup'

  // kiui
  import InputText from '../../kiui/Inputs/InputText.svelte'
  import SubmitButton from '../../kiui/Inputs/SubmitButton.svelte'
  import SignupNav from '../../kiui/Inputs/SignupNav.svelte'

  let phone = ""
</script>

<main>
  <label for="phone"></label>
  <InputText preinput="+4" label="Numarul de telefon" placeholder="ex. 0712345678" bind:value={phone} />

  <SubmitButton value="submit" onClick={signupPhone} />

  <SignupNav previous="/signup/basic" next="/signup/verify-code" />
</main>