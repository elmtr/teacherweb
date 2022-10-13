<script>
  import { pop } from 'svelte-spa-router'
  import {signupBasic} from '../../fetch/signup'

  // kiui
  import InputText from '../../kiui/Inputs/InputText.svelte'
  import SubmitButton from '../../kiui/Inputs/SubmitButton.svelte'
  import SignupNav from '../../kiui/Inputs/SignupNav.svelte'
  import Next from '../../kiui/Inputs/Next.svelte'
  import Previous from '../../kiui/Inputs/Previous.svelte'

  let firstName = ""
  let lastName = ""
</script>

<main>
  <br>
  <InputText preinput="" label="Nume" placeholder="ex. Popescu" bind:value={lastName} />
  <InputText preinput="" label="Prenume" placeholder="ex. Ion" bind:value={firstName} />

  <!-- <SignupNav previous="" next="/signup/phone" /> -->
  <Next onClick={async () => {
    await signupBasic(firstName, lastName)
  }} />

  <Previous onClick={pop} />
</main>