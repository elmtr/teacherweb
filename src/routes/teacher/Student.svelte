<script>
  import axios from 'axios';
  import { link, location } from 'svelte-spa-router';
  import {writable} from 'svelte/store';

  import { tokenConfig, apiURL } from '../../axiosConfig';
  import {token, truancies, draftMarks} from '../../stores';

  import {fetchPoints, fetchDraftMarks, fetchMarks, fetchTruancies, patchDecreasePoints, patchIncreasePoints} from '../../fetch/fetch'

  let pointsValue = writable(0);
  export let params = {}

  async function getDraftMarks() {
    let data = await fetchDraftMarks($token, params.subjectKey, params.studentKey)
    draftMarks.set(data)
    return data
  }

  async function getTruancies() {
    let data = await fetchTruancies($token, params.subjectKey, params.studentKey)
    truancies.set(data)
    return data
  }

  async function decreasePoints(key) {
    await patchDecreasePoints($token, key)
    pointsValue.set($pointsValue - 1)
  }

  async function increasePoints(key) {
    await patchIncreasePoints($token, key)    
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
{#await getDraftMarks() then draftMarks}
  {#each draftMarks as draftMark}
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
{#await fetchMarks($token, params.subjectKey, params.studentKey) then marks}
  {#each marks as mark}
    {mark.value} - {mark.dateDay}.{mark.dateMonth}<br>
  {/each}
  <a href="{$location}/add/mark" use:link> adauga nota</a>
{/await}

<h1>truancies</h1>
{#await getTruancies() then truancies}
  {#each truancies as truancy}
    {#if truancy.motivated}
      {truancy.motivated ? "motivata" : "nemotivata"} - 
      {truancy.dateDay}.{truancy.dateMonth}<br>
    {:else} 
      <a href="{$location}/motivate/{truancy.key}" use:link>
        {truancy.motivated ? "motivata" : "nemotivata"} - 
        {truancy.dateDay}.{truancy.dateMonth}
      </a><br>
    {/if}
  {/each}
  <a href="{$location}/add/truancy" use:link> adauga absenta</a>
{/await}