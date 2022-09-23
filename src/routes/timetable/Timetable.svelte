<script>
  
  import {token, today} from '../../stores';
  import {fetchTimetable} from '../../fetch/fetch'
    import { writable } from 'svelte/store'
    import { onMount } from 'svelte'

  let days = [1,2,3,4,5]
  let intervals = [1,2,3,4,5,6,7,8,9,10,11,12]

  let daysString = ['', 'Luni', 'Marti', 'Miercuri', 'Joi', 'Vineri']

  let day = writable(1);
  onMount(() => {
    if ($today > 5) {
      day.set(1)
    } else day.set($today)
  })


</script>

<div></div>

<span on:click={() => {
  if ($day === 1) {
    day.set(5)
  } else {
    day.update(value => value - 1)
  }
}}>prev</span>

<div>
  {daysString[$day]}
</div>

<span on:click={() => {
  if ($day === 5) {
    day.set(1)
  } else {
    day.update(value => value + 1)
  }
}}>next</span><br>

{#await fetchTimetable($token) then periods}
    <table>
      {#each intervals as interval}
        <tr>
          <td>
            {#if periods[$day][interval].length > 0}
              {#each periods[$day][interval] as period}
                {period.subject.name}{' / '}
              {/each}

              (
              {#each periods[$day][interval] as period}
                {period.room}{' / '}
              {/each}
              )
            {:else}
              -
             {/if}
          </td>
        </tr>
      {/each}
  </table>
{/await}