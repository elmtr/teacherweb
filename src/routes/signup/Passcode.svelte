<script>
  
  import {passcode} from '../../stores'
  import {pop} from 'svelte-spa-router'
  
  // kiui
  import Passcode from '../../kiui/Passcode.svelte'
  import Header from '../../kiui/Header.svelte'
  import Title from '../../kiui/Title.svelte'


  import KeyPad from '../../kiui/Inputs/KeyPad.svelte'
  import Previous from '../../kiui/Inputs/Previous.svelte'
  import Next from '../../kiui/Inputs/Next.svelte'

  import { push } from 'svelte-spa-router'

  let active = false

  $: {
    if ($passcode.length === 4) {
      active = true
    } else {
      active = false
    }
  }
  
</script>

<main>
  <Header />
  <Title value="Creează-ți un PIN" />
  <div style="height: 20px;"></div>
  <Passcode value={$passcode} />

  <div style="height: 100px;"></div>
  <KeyPad bind:value={$passcode} length={4} okButton={false} />

  <Previous onClick={pop} />
  <Next {active} onClick={async () => {
    push("/signup/check-passcode")
  }} />
</main>