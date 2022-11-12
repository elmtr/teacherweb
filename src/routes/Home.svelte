<script>
	
	import {token, today, subjects, grades, interval} from '../stores'
	import {push} from 'svelte-spa-router'
	import {fetchSchool, fetchTimetable} from '../fetch/fetch'
	import { get } from 'svelte/store'

	// kiui
	import CurrentPeriod from '../kiui/Timetable/CurrentPeriod.svelte'
	import NextPeriod from '../kiui/Timetable/NextPeriod.svelte'
  import Grade from '../kiui/Grade.svelte'
  import NavBar from '../kiui/NavBar.svelte'
	import Loader from '../kiui/PopUps/Loader.svelte'
	
	if ($token == "") {
		push("/login/update")
	}

	let gradesIndeces = []

	$: {
		gradesIndeces = Object.keys(get(grades))
		gradesIndeces.sort((a, b) => {
			if (a > b) {
				return -1
			}
			if (a < b) {
				return 1
			}
		})
	}

</script>

<main>
	<Loader />
	{#if $token}
		<!-- getting interval -->
		{#await fetchSchool($token) then school}		
			<!-- navbar -->
			<NavBar location="home" />

			<!-- getting timetable (for widget) -->
			{#await fetchTimetable($token) then data}
				{#if data[$today]}
					{#if data[$today][$interval]}
						<CurrentPeriod user="teacher" />
					{/if}
					<br>
					{#if data[$today][$interval + 1]}
						<NextPeriod user="teacher" />
					{/if}
				{/if}

				<div id="heading">Clasele mele</div>

				<!-- getting grades -->
				{#if $subjects}
					{#each gradesIndeces as grade}
						<Grade grade={$grades[grade]} />
					{/each}
				{/if}
			{/await}
		{/await}	
	{/if}
</main>

<style scoped>
	#heading {
		font-size: 1.5em;
		color: var(--black);
		margin-left: 30px;
		margin-top: 15px;
		margin-bottom: 5px;
		font-weight: 600;
		font-family: var(--sans-serif);
	}
</style>
