<script>

  import {push} from 'svelte-spa-router'
  import {onMount} from 'svelte'
  import {loginUpdate} from '../../fetch/login'
    
  // kiui
  import SubmitButton from '../../kiui/Inputs/SubmitButton.svelte'

  let passcode = ""
  let phone
  
  onMount(() => {
    phone = localStorage.getItem("phone")
    if (phone == null) {
      push("/login")
    }
  })

  function addDigit(n) {
    passcode += n
  }

  function removeDigit() {
    passcode = passcode.substr(0, passcode.length - 1)
  }

</script>

<main>

  <div id="passcode">
    {#if passcode.length > 0}
      <div class="digit digit-on"></div>
    {:else}
      <div class="digit"></div>
    {/if}
    {#if passcode.length > 1}
      <div class="digit digit-on"></div>
    {:else}
      <div class="digit"></div>
    {/if}
    {#if passcode.length > 2}
      <div class="digit digit-on"></div>
    {:else}
      <div class="digit"></div>
    {/if}
    {#if passcode.length > 3}
      <div class="digit digit-on"></div>
    {:else}
      <div class="digit"></div>
    {/if}
  </div><br>

  <div class="row">
    <div class="key" on:click={() => {addDigit(1)}}>1</div>
    <div class="key" on:click={() => {addDigit(2)}}>2</div>
    <div class="key" on:click={() => {addDigit(3)}}>3</div>
  </div> 
  <div class="row">
    <div class="key" on:click={() => {addDigit(4)}}>4</div>
    <div class="key" on:click={() => {addDigit(5)}}>5</div>
    <div class="key" on:click={() => {addDigit(6)}}>6</div>
  </div>  
  <div class="row">
    <div class="key" on:click={() => {addDigit(7)}}>7</div>
    <div class="key" on:click={() => {addDigit(8)}}>8</div>
    <div class="key" on:click={() => {addDigit(9)}}>9</div>
  </div>   

  <div class="key" on:click={() => {removeDigit()}}>del</div>



  <SubmitButton value="Conectare" onClick={async () => {
    await loginUpdate(phone, passcode)
  }}/>
</main>

<style scoped>
  .row {
    background: blue;
    box-sizing: border-box;
    height: 50px;
  }

  .key {
    float: left;
    margin-left: 10px;
    background: red;
    width: 30px;
    height: 30px;
  }

  .digit {
    width: 10px;
    height: 10px;
    border-radius: 100%;
    border: var(--border);
    float: left;
    margin-left: 20px;
  }
  
  .digit-on {
    background: var(--darkgreen);
  }
</style>