<script>
  
  import axios from 'axios';
  import { link, location } from 'svelte-spa-router';
  import {writable} from 'svelte/store';

  import { tokenConfig, apiURL } from '../../axiosConfig';
  import {token, truancies, draftMarks} from '../../stores';

  let pointsValue = writable(0);
  export let params = {}

  async function loadPoints() {
    const {data} = await axios.get(
      `${apiURL}/v1/teacher/points?subjectID=${params.subjectID}&studentID=${params.studentID}`,
      tokenConfig($token),
    )
    pointsValue.set(data.value)

    return data
  }

  async function loadDraftMarks() {
    const {data} = await axios.get(
      `${apiURL}/v1/teacher/draftMarks?subjectID=${params.subjectID}&studentID=${params.studentID}`,
      tokenConfig($token),
    )
    draftMarks.set(data)
    console.log($draftMarks)
    return data
  }

  async function loadMarks() {
    const {data} = await axios.get(
      `${apiURL}/v1/teacher/marks?subjectID=${params.subjectID}&studentID=${params.studentID}`,
      tokenConfig($token),
    )
    return data
  }

  async function loadTruancies() {
    const {data} = await axios.get(
      `${apiURL}/v1/teacher/truancies?subjectID=${params.subjectID}&studentID=${params.studentID}`,
      tokenConfig($token),
    )
    truancies.set(data)
    console.log($truancies)
    return data
  }

  async function decreasePoints() {
    pointsValue.set($pointsValue - 1)

    const {data} = await axios.patch(
      `${apiURL}/v1/teacher/points/decrease?subjectID=${params.subjectID}&studentID=${params.studentID}`,
      {},
      tokenConfig($token)
    )
  }

  async function increasePoints() {
    pointsValue.set($pointsValue + 1)

    const {data} = await axios.patch(
      `${apiURL}/v1/teacher/points/increase?subjectID=${params.subjectID}&studentID=${params.studentID}`,
      {},
      tokenConfig($token)
    )
  }

</script>


<h1>points</h1>
{#await loadPoints() then points}
  <button on:click={decreasePoints}>
    -
  </button>
  {$pointsValue}
  <button on:click={increasePoints}>
    +
  </button>
{/await}


<h1>draft marks</h1>
{#await loadDraftMarks() then draftMarks}
  {#each draftMarks as draftMark}
    <a href="{$location}/modify/{draftMark.id}" use:link>
      {draftMark.value} - {draftMark.dateDay}.{draftMark.dateMonth}
    </a> -- 
    <a href="{$location}/definitivate/{draftMark.id}" use:link>
      definitiveaza
    </a>
    <br>
  {/each}
  <a href="{$location}/add/draftmark" use:link> adauga nota</a>

{/await}

<h1>marks</h1>
{#await loadMarks() then marks}
  {#each marks as mark}
    {mark.value} - {mark.dateDay}.{mark.dateMonth}<br>
  {/each}
  <a href="{$location}/add/mark" use:link> adauga nota</a>
{/await}

<h1>truancies</h1>
{#await loadTruancies() then truancies}
  {#each truancies as truancy}
    {#if truancy.motivated}
      {truancy.motivated ? "motivata" : "nemotivata"} - 
      {truancy.dateDay}.{truancy.dateMonth}<br>
    {:else} 
      <a href="{$location}/motivate/{truancy.id}" use:link>
        {truancy.motivated ? "motivata" : "nemotivata"} - 
        {truancy.dateDay}.{truancy.dateMonth}
      </a><br>
    {/if}
  {/each}
  <a href="{$location}/add/truancy" use:link> adauga absenta</a>
{/await}