<script>

  import {push} from 'svelte-spa-router'
  import {onMount} from 'svelte'
  import {loginUpdate} from '../../fetch/login'
    
  // kiui
  import SubmitButton from '../../kiui/Inputs/SubmitButton.svelte'

  let passcode
  let phone
  
  onMount(() => {
    phone = localStorage.getItem("phone")
    if (phone == null) {
      push("/login")
    }
  })

</script>

<main>
  <input name="passcode" placeholder="passcode" type="text" bind:value={passcode} />

  <SubmitButton value="Conectare" onClick={async () => {
    await loginUpdate()
  }}/>
</main>