<script>
	
	import {token, today, now, subjects, grades, info} from '../stores'
	import {push, link} from 'svelte-spa-router'
	import {fetchSchool, fetchTimetable} from '../fetch/fetch'
	import { findInterval } from '../utils/utils'
	import { writable } from 'svelte/store'

	// kiui
	import CurrentPeriod from '../kiui/CurrentPeriod.svelte'
	import NextPeriod from '../kiui/NextPeriod.svelte'
  import Grade from '../kiui/Grade.svelte'
  import NavBar from '../kiui/ NavBar.svelte'
	
	if ($token == "") {
		push("/login/update")
	}

	let interval = writable(1)

	function setInterval(school) {
		interval.set(findInterval(school.intervals, $now))
		return ''
	}

</script>

<main>
	<!-- getting interval -->
	{#await fetchSchool($token) then school}
		{setInterval(school)}
	{/await}	

	<!-- navbar -->
	<NavBar />

	<div id="greeting">
		Bună, {$info.firstName}! 👋
	</div>

	<!-- getting timetable -->
	{#await fetchTimetable($token) then timetable}
		{#if timetable[$today]}
			<CurrentPeriod timetable={timetable} day={$today} interval={$interval} />
			<br>
			<NextPeriod timetable={timetable} day={$today} interval={$interval + 1} />
		{/if}

		<div id="heading">Clasele mele</div>

		<!-- getting grades -->
		{#if $subjects}
			{#each Object.keys($grades) as grade}
				<Grade grade={$grades[grade]} />
			{/each}
		{/if}
	{/await}

	
</main>

<style scoped>
	#greeting {
		font-size: 1.8em;
		color: var(--black);
		margin-left: 25px;
		margin-top: 30px;
		margin-bottom: 20px;
		font-weight: 600;
		font-family: sans-serif;
	}

	#heading {
		font-size: 1.5em;
		color: var(--black);
		margin-left: 30px;
		margin-top: 30px;
		margin-bottom: 5px;
		font-weight: 600;
		font-family: sans-serif;
	}
</style>
