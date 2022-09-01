<script>
  import axios from 'axios';

  import { config, tokenConfig } from '../../axiosConfig';
  import {token} from '../../stores';
  export let params = {}
  import {link} from 'svelte-spa-router';

  async function loadStudents() {
        const {data} = await axios.get(
      `http://127.0.0.1:4200/v1/teacher/students?id=${params.subjectID}`,
      tokenConfig($token),
    )
    return data
  }
</script>

{#await loadStudents() then students}
  {#each students as student}
    <a href="/teacher/{params.subjectID}/{student.id}" use:link>{student.lastName} {student.firstName}</a><br>
  {/each}
{/await}