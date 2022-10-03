<script>

  import {updateModifyDraftMark} from '../../fetch/update'
  import {pop} from 'svelte-spa-router'
  import {writable} from 'svelte/store'
  import { fetchDraftMarks } from '../../fetch/fetch'
  import {token} from '../../stores'
  
  // kiui
  import InputValue from '../../kiui/InputValue.svelte'
  import InputSelect from '../../kiui/InputSelect.svelte'
  import SubmitButton from '../../kiui/SubmitButton.svelte'
  
  export let params = {}

  let value = writable()
  let dateDay = writable("")
  let dateMonth = writable("")

  function draftMarkToStore(val, dDay, dMonth) {
    $value = val
    $dateDay = dDay
    $dateMonth = dMonth
    
    return ''
  }

</script>

<main>
  {#await fetchDraftMarks($token, params.subjectKey, params.studentKey) then draftMarks}
    {#each draftMarks as draftMark}
        {#if draftMark.key == params.key}
          {draftMarkToStore(draftMark.value, draftMark.dateDay, draftMark.dateMonth)}
          <InputValue placeholder="value" bind:value={$value} />
          <br>
          <InputSelect bind:value={$dateDay} list={[...Array(31).keys()]} />
          <InputSelect bind:value={$dateMonth} list={[...Array(12).keys()]} />
        {/if}
    {/each}
  {/await}
  <br>

  <SubmitButton value="Modifică nota ciornă" onClick={async () => {
    await updateModifyDraftMark($token, params.key, Number($value), $dateDay, $dateMonth, params.subjectKey, params.studentKey)
    pop()
  }}/>
</main>