<script>

  import axios from 'axios'
  import {tokenConfig, apiURL} from '../../axiosConfig'
  import {token} from '../../stores'
  import {fetchDraftMarks} from '../../fetch/fetch'
  import {updateDefinitivateDraftMark} from '../../fetch/update'
  import {pop} from 'svelte-spa-router'

  // kiui
  import SubmitButton from '../../kiui/SubmitButton.svelte'

  export let params = {}

</script>

<main>
  {#await fetchDraftMarks($token, params.subjectKey, params.studentKey) then draftMarks}
    {#each draftMarks as draftMark}
        {#if draftMark.key == params.key}
          {draftMark.value} - {draftMark.dateDay}.{draftMark.dateMonth}
        {/if}
    {/each}
  {/await}
  <br>

  <SubmitButton value="Definitivează nota ciornă" onClick={async () => {
    await updateDefinitivateDraftMark($token,params.subjectKey, params.studentKey, params.key)
    pop()
  }}/>
</main>