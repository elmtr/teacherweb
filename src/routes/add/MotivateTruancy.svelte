<script>

  import axios from 'axios'
  import {tokenConfig, apiURL} from '../../axiosConfig'
  import {token} from '../../stores'
  import {pop} from 'svelte-spa-router'
  import {fetchTruancies} from '../../fetch/fetch'
  import { updateMotivateTruancy } from '../../fetch/update'
  import SubmitButton from '../../kiui/SubmitButton.svelte'

  export let params = {}

</script>

<main>
  {#await fetchTruancies($token, params.subjectKey, params.studentKey) then truancies}
    {#each truancies as truancy}
        {#if truancy.key == params.key}
          {truancy.dateDay}.{truancy.dateMonth}
        {/if}
    {/each}
  {/await}
  <br>

  <SubmitButton value="motiveaza absenta" onClick={async () => {
    await updateMotivateTruancy($token, params.key)
    pop()
  }}/>
</main>