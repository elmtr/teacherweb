<script>
  import {signupBasic} from '../../fetch/signup'

  // kiui
  import InputValue from '../../kiui/Inputs/InputValue.svelte'
  import SubmitButton from '../../kiui/Inputs/SubmitButton.svelte'

  let firstName = ""
  let lastName = ""
</script>

<main>
  <br>
  <InputValue placeholder="Nume" bind:value={lastName} />
  <InputValue placeholder="Prenume" bind:value={firstName} />

  <SubmitButton value="submit" onClick={async () => {
    await signupBasic(firstName, lastName)
  }} />
</main>