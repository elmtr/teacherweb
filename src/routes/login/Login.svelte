<script>

  import {login} from '../../fetch/login'

  // kiui
  import InputValue from '../../kiui/Inputs/InputValue.svelte'
  import InputPassword from '../../kiui/Inputs/InputPassword.svelte'
  import SubmitButton from '../../kiui/Inputs/SubmitButton.svelte'

  let phone
  let password

</script>

<main>
  <br>
  <InputValue placeholder="Numarul de telefon" bind:value={phone} />
  <InputPassword placeholder="Parola" bind:value={password} />

  <SubmitButton value="submit" onClick={async () => {
    await login(phone, password)
  }} />
</main>