<script>
  import { signupPassword } from '../../fetch/signup'
  import {pop} from 'svelte-spa-router'
  
  // kiui
  import Header from '../../kiui/Header.svelte'
  import Title from '../../kiui/Title.svelte'
  

  import InputPassword from '../../kiui/Inputs/InputPassword.svelte'
  import Previous from '../../kiui/Inputs/Previous.svelte'
  import Next from '../../kiui/Inputs/Next.svelte'

  let password = ""
  let checkPassword = ""

  let active = false

  $: {
    if (password === checkPassword && password !== "") {
      active = true
    } else {
      active = false
    }
  }
</script>

<main>
  <Header />
  <Title value="Acum poți să-ți creezi o parolă" />
  
  <InputPassword 
    preinput="" 
    label="Parola" 
    placeholder="ex. 1Motocoasa.Circuit#Triplu23" 
    bind:value={password} 
  />
  <InputPassword 
    discoverable={false}
    preinput="" 
    label="Confirmă parola" 
    placeholder="(aceeași cu cea de sus)" 
    bind:value={checkPassword} 
  />

  <Previous onClick={pop} />
  <Next {active} onClick={async () => {
    await signupPassword(password);
  }} />
</main>