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
    if (passcode.length < 4) {
      passcode += n
    }
  }

  function removeDigit() {
    passcode = passcode.substr(0, passcode.length - 1)
  }

</script>

<main>

  <div id="title">
    
  </div>

  <div id="container">
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
    </div>
  </div><br>

  <div id="spacing"></div>

  <div class="row">
    <div class="cell">
      <div class="key" on:click={() => {addDigit(1)}}>
        <div>1</div>
      </div>
    </div>
    <div class="cell">
      <div class="key" on:click={() => {addDigit(2)}}>
        <div>2</div>
      </div>
    </div>
    <div class="cell">
      <div class="key" on:click={() => {addDigit(3)}}>
        <div>3</div>
      </div>
    </div>
  </div> 

  <div class="row">
    <div class="cell">
      <div class="key" on:click={() => {addDigit(4)}}>
        <div>4</div>
      </div>
    </div>
    <div class="cell">
      <div class="key" on:click={() => {addDigit(5)}}>
        <div>5</div>
      </div>
    </div>
    <div class="cell">
      <div class="key" on:click={() => {addDigit(6)}}>
        <div>6</div>
      </div>
    </div>
  </div> 

  <div class="row">
    <div class="cell">
      <div class="key" on:click={() => {addDigit(7)}}>
        <div>7</div>
      </div>
    </div>
    <div class="cell">
      <div class="key" on:click={() => {addDigit(8)}}>
        <div>8</div>
      </div>
    </div>
    <div class="cell">
      <div class="key" on:click={() => {addDigit(9)}}>
        <div>9</div>
      </div>
    </div>
  </div> 
  <div class="row">
    <div class="cell">
      <div class="key" style="background: var(--lightgreen);" on:click={() => {removeDigit()}}>
        <div>
          <img src="/img/close.png" alt="" style="width: var(" >
        </div>
      </div>
    </div>
    <div class="cell">
      <div class="key" on:click={() => {addDigit(1)}}>
        <div>0</div>
      </div>
    </div>
    <div class="cell">
      <div class="key" style="background: var(--lightgreen);" on:click={async () => {
        await loginUpdate(phone, passcode)
      }}>
        <div>ok</div>
      </div>
    </div>
  </div> 

</main>

<style scoped>
  #spacing {
    width: 100%;
    height: 100px;
  }

  .row {
    box-sizing: border-box;
    height: 60px;
    width: 80%;
    margin: auto;
    margin-bottom: 30px;
    display: flex;
    flex-wrap: wrap;
  }

  .cell {
    flex: 33%;
  }

  .key {
    margin: auto;
    background: var(--white);
    border-radius: 100%;
    border: var(--border);
    width: 60px;
    height: 60px;

    position: relative;
  }

  .key div {
    width: 100%;
    text-align: center;
    font-family: var(--sans-serif);
    color: var(--darkgreen);

    margin: 0;
    position: absolute;
    top: 50%;
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
  }

  .key div img {
    width: 30px;
  }

  #title {
    width: 100%;
    height: 20px;

    margin-top: 30px;
    font-size: 1.5em;
    font-family: var(--sans-serif);
    color: var(--darkgreen);
    text-align: center;
  }

  #container {
    width: 100%;
    height: 30px;
    margin: auto;
    margin-top: 60px;
  }

  #passcode {
    width: 40%;
    height: 100%;
    margin-left: 30%;
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