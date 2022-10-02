<script>

  import {updateModifyDraftMark} from '../../fetch/update'
  import {pop} from 'svelte-spa-router'
  import {writable} from 'svelte/store'
  import { fetchDraftMarks } from '../../fetch/fetch'
  import {token, draftMarks} from '../../stores'
  
  export let params = {}

  const draftMark = writable({})

  let value = writable()
  let dateDay = writable("")
  let dateMonth = writable("")

  function draftMarkToStore(val, dDay, dMonth) {
    $value = val
    $dateDay = dDay
    $dateMonth = dMonth
    
    return ''
  }

  console.log($draftMarks)

</script>

<main>
  {#await fetchDraftMarks($token, params.subjectKey, params.studentKey) then draftMarks}
    {#each draftMarks as draftMark}
        {#if draftMark.key == params.key}
          {draftMarkToStore(draftMark.value, draftMark.dateDay, draftMark.dateMonth)}
          <input name="value" placeholder="value" type="text" bind:value={$value}>
          <input name="dateDay" placeholder="dateDay" type="text" bind:value={$dateDay}>
          <input name="dateMonth" placeholder="dateMonth" type="text" bind:value={$dateMonth}>
        {/if}
    {/each}
  {/await}
  <br>

  <input type="submit" value="modify nota ciorna" on:click={async () => {
    await updateModifyDraftMark($token, params.key, Number($value), $dateDay, $dateMonth, params.subjectKey, params.studentKey)
    pop()
  }}/>
</main>