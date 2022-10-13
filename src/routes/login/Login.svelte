<script>

  import {login} from '../../fetch/login'

  // kiui
  import InputNumber from '../../kiui/Inputs/InputNumber.svelte'
  import InputPassword from '../../kiui/Inputs/InputPassword.svelte'
  import SubmitButton from '../../kiui/Inputs/SubmitButton.svelte'

  let phone
  let password

</script>

<main>
  <br>
  <InputNumber preinput="+4" label="Numărul de telefon" placeholder="ex. 0712345678" bind:value={phone} />
  <InputPassword preinput="" label="Parola" placeholder="ex. 1Motocoasa.Circuit#Triplu23" bind:value={password} />

  <SubmitButton value="submit" onClick={async () => {
    await login(phone, password)
  }} />
</main>