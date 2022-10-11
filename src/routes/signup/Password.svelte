<script>
  import { signupPassword } from '../../fetch/signup'
  
  // kiui
  import InputPassword from '../../kiui/Inputs/InputPassword.svelte'
  import SubmitButton from '../../kiui/Inputs/SubmitButton.svelte'
  
  let password = ""
  let checkPassword = ""
</script>

<main>
  <InputPassword placeholder="Parola" bind:value={password} />

  <InputPassword placeholder="Verificare parola" bind:value={checkPassword} />

  {#if password === checkPassword && password !== ""}
    <SubmitButton value="submit" onClick={signupPassword} />
  {/if}
</main>