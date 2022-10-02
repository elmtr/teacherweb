<script>
  import { link, location } from 'svelte-spa-router';
  import {writable} from 'svelte/store';

  import {token, draftMarks,  marks, truancies} from '../../stores';

  import {
    fetchPoints, 
    fetchDraftMarks, 
    fetchMarks, 
    updateDecreasePoints, 
    updateIncreasePoints,
    fetchTruancies
  } from '../../fetch/fetch'

  let pointsValue = writable(0);
  export let params = {}

  async function decreasePoints(key) {
    await updateDecreasePoints($token, key)
    pointsValue.set($pointsValue - 1)
  }

  async function increasePoints(key) {
    await updateIncreasePoints($token, key)    
    pointsValue.set($pointsValue + 1)
  }

  async function getPoints() {
    let data = await fetchPoints($token, params.subjectKey, params.studentKey)
    pointsValue.set(data.value)

    return data
  }


</script>

<h1>points</h1>
{#await getPoints() then points}
  <button on:click={() => {decreasePoints(points.key)}}>
    -
  </button>
  {$pointsValue}
  <button on:click={() => {increasePoints(points.key)}}>
    +
  </button>
{/await}

<h1>draft marks</h1>
{#await fetchDraftMarks($token, params.subjectKey, params.studentKey) then data}
  {#each $draftMarks as draftMark}
    <a href="{$location}/modify/{draftMark.key}" use:link>
      {draftMark.value} - {draftMark.dateDay}.{draftMark.dateMonth}
    </a> -- 
    <a href="{$location}/definitivate/{draftMark.key}" use:link>
      definitiveaza
    </a>
    <br>
  {/each}
  <a href="{$location}/add/draftmark" use:link> adauga nota</a>
{/await}

<h1>marks</h1>
{#await fetchMarks($token, params.subjectKey, params.studentKey) then data}
  {#each $marks as mark}
    <span>
      {mark.value} - {mark.dateDay}.{mark.dateMonth}
    </span>
    <br>
  {/each}
  <a href="{$location}/add/mark" use:link> adauga nota</a>
{/await}

<h1>truancies</h1>
{#await fetchTruancies($token, params.subjectKey, params.studentKey) then data}
  {#each $truancies as truancy}
    <span>
      {truancy.dateDay}.{truancy.dateMonth} - 
      {#if truancy.motivated} 
        motivata
      {:else}
        <a href="{$location}/motivate/{truancy.key}" use:link>nemotivata</a>
      {/if}
    </span>
    <br>
  {/each}
  <a href="{$location}/add/truancy" use:link> adauga absenta</a>
{/await}