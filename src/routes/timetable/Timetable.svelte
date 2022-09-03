<script>
  
  import axios from 'axios';
  import { tokenConfig, apiURL } from '../../axiosConfig';
  import {token} from '../../stores';

  let days = [1,2,3,4,5]
  let intervals = [1,2,3,4,5,6,7,8,9,10,11,12]

  let daysString = ['', 'Luni', 'Marti', 'Miercuri', 'Joi', 'Vineri']

  async function loadTimetable() {
    const {data} = await axios.get(
      `${apiURL}/v1/teacher/timetable`,
      tokenConfig($token),
    )
    let timetable = {}

    for (let dayIndex in days) {
      let day = days[dayIndex]
      timetable[day] = {}

      for (let intervalIndex in intervals) {
        let interval = intervals[intervalIndex]
        timetable[day][interval] = {}
      }
    }

    for (let periodIndex in data) {
      let period = data[periodIndex]
      timetable[period.day][period.interval] = period
    }
    console.log(timetable)
    return timetable
  }

</script>

{#await loadTimetable() then timetable}
  {#each days as day}
    <table>
      <th>{daysString[day]}</th>
      {#each intervals as interval}
        <tr>
          <td>
            {#if timetable[day][interval].subject}
              {timetable[day][interval].subject.name} - 
              {timetable[day][interval].subject.grade.gradeNumber}{timetable[day][interval].subject.grade.gradeLetter} 
              ({timetable[day][interval].room})
            {:else}
              -
             {/if}
          </td>
        </tr>
      {/each}
  </table>
  {/each}
{/await}