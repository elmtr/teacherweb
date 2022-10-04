<script>
	
	import {token, today, now, subjects, grades} from '../stores'
	import {push, link} from 'svelte-spa-router'
	import {fetchSchool, fetchTimetable} from '../fetch/fetch'
	import { findInterval } from '../utils/utils'
	import { writable } from 'svelte/store'

	// kiui
	import CurrentPeriod from '../kiui/CurrentPeriod.svelte'
	import NextPeriod from '../kiui/NextPeriod.svelte'
  import Grade from '../kiui/Grade.svelte'
	
	if ($token == "") {
		push("/login/update")
	}

	let interval = writable(1)

	function setInterval(school) {
		// interval.set(findInterval(school.intervals, $now))
		return ''
	}

</script>

<main>
	<!-- getting interval -->
	{#await fetchSchool($token) then school}
		{setInterval(school)}
	{/await}	

	<!-- getting timetable -->
	{#await fetchTimetable($token) then timetable}
		{#if timetable[$today]}
			<CurrentPeriod timetable={timetable} day={$today} interval={$interval} />
			<br>
			<NextPeriod timetable={timetable} day={$today} interval={$interval + 1} />
		{/if}
	{/await}

	<!-- getting grades -->
	{#if $subjects}
		{#each Object.keys($grades) as grade}
			<Grade grade={$grades[grade]} />
		{/each}
	{/if}
</main>
