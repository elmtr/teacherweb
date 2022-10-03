<script>

  import {token, d} from '../../stores'
  import {pop} from 'svelte-spa-router'
  import {postDraftMark} from '../../fetch/set'

  // kiui
  import InputValue from '../../kiui/InputValue.svelte'
  import InputSelect from '../../kiui/InputSelect.svelte'
  import SubmitButton from '../../kiui/SubmitButton.svelte'

  export let params = {}

  let value = 10
  let dateDay = ('0' + d.getDate()).slice(-2)
  let dateMonth = ('0' + (d.getMonth() + 1)).slice(-2)

</script>

<main>
  <br>
  <InputValue placeholder="value" bind:value={value} />

  <br>

  <InputSelect bind:value={dateDay} list={[...Array(31).keys()]}/>
  <InputSelect bind:value={dateMonth} list={[...Array(12).keys()]}/>

  <br>

  <SubmitButton value="Adaugă notă ciornă" onClick={async () => {
    await postDraftMark($token, Number(value), dateDay, dateMonth, params.subjectKey, params.studentKey);
    pop()
  }}/>
</main>