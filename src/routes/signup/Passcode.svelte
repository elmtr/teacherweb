<script>
  import { signupPasscode } from '../../fetch/signup'
  
  // kiui
  import InputNumber from '../../kiui/Inputs/InputNumber.svelte'
  import SubmitButton from '../../kiui/Inputs/SubmitButton.svelte'
  
  let passcode = ""
  let checkPasscode = ""
</script>

<main>
  <InputNumber placeholder="Cod PIN" bind:value={passcode} />
  <InputNumber placeholder="Verificare cod PIN" bind:value={checkPasscode} />


  {#if passcode === checkPasscode && passcode !== ""}
    <SubmitButton value="submit" onClick={async () => {
      await signupPasscode(passcode)
    }}/>
  {/if}
</main>