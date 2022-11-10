<script>
	
	import {token, today, now, subjects, grades, info} from '../stores'
	import {push, link} from 'svelte-spa-router'
	import {fetchSchool, fetchTimetable} from '../fetch/fetch'
	import { findInterval } from '../utils/utils'
	import { writable, get } from 'svelte/store'

	// kiui
	import CurrentPeriod from '../kiui/Timetable/CurrentPeriod.svelte'
	import NextPeriod from '../kiui/Timetable/NextPeriod.svelte'
  import Grade from '../kiui/Grade.svelte'
  import NavBar from '../kiui/NavBar.svelte'
	import Loader from '../kiui/PopUps/Loader.svelte'
	
	if ($token == "") {
		push("/login/update")
	}

	let interval = writable(1)
	let gradesIndeces = []

	function setInterval(school) {
		interval.set(findInterval(school.intervals, $now))
		return ''
	}

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
			{setInterval(school)}
		
			<!-- navbar -->
			<NavBar location="home" />

			<!-- getting timetable (for widget) -->
			{#await fetchTimetable($token) then timetable}
				{#if timetable[$today]}
					{#if timetable[$today][$interval]}
						<CurrentPeriod user="teacher" timetable={timetable} day={$today} interval={$interval}/>
					{/if}
					<br>
					{#if timetable[$today][$interval + 1]}
						<NextPeriod user="teacher" timetable={timetable} day={$today} interval={$interval + 1} />
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
		margin-top: 30px;
		margin-bottom: 5px;
		font-weight: 600;
		font-family: var(--sans-serif);
	}
</style>
