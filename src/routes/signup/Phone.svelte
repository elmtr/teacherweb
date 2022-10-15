<script>
  import {signupPhone} from '../../fetch/signup'
  import {pop} from 'svelte-spa-router'

  // kiui
  import InputText from '../../kiui/Inputs/InputText.svelte'
  import Title from '../../kiui/Title.svelte'
  import Header from '../../kiui/Header.svelte'
  import Next from '../../kiui/Inputs/Next.svelte'
  import Previous from '../../kiui/Inputs/Previous.svelte'

  let phone = ""
  let active = false
  $: {
    if (phone.length === 10) {
      active = true
    } else {
      active = false
    }
  }
</script>

<main>
  <Header />
  <Title value="Sigur nu ești robot? 🤖" />
  <InputText preinput="+4" label="Numarul de telefon" placeholder="ex. 0712345678" bind:value={phone} />

  <Next {active} onClick={async () => {
    await signupPhone(phone)
  }} />

  <Previous onClick={pop} />
</main>