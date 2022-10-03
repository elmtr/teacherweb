<script>
  import { link, location } from 'svelte-spa-router';
  import {writable} from 'svelte/store';

  import {token, draftMarks,  marks, truancies} from '../../stores';

  import {
    fetchDraftMarks, 
    fetchMarks, 
    fetchTruancies
  } from '../../fetch/fetch'

  import Points from '../../kiui/Points.svelte'
  import Marks from '../../kiui/Marks.svelte'
  import DraftMarks from '../../kiui/DraftMarks.svelte'
  import Truancies from '../../kiui/Truancies.svelte'

  export let params = {}

</script>

<Points subjectKey={params.subjectKey} studentKey={params.studentKey} />

<DraftMarks subjectKey={params.subjectKey} studentKey={params.studentKey} />

<Marks subjectKey={params.subjectKey} studentKey={params.studentKey} />

<Truancies subjectKey={params.subjectKey} studentKey={params.studentKey} />
