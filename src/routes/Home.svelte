<script>
	
	import {token, today, now, subjects, grades} from '../stores'
	import {push, link} from 'svelte-spa-router'
	import {fetchSchool, fetchTimetable} from '../fetch/fetch'
	import { findInterval } from '../utils/utils'
	import { writable } from 'svelte/store'

	// kiui
	import CurrentPeriod from '../kiui/CurrentPeriod.svelte'
	import NextPeriod from '../kiui/NextPeriod.svelte'
	
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
	{#if $subjects}
		{#each Object.keys($grades) as grade}
			<a href={`/teacher/${$grades[grade].key}`} use:link>{$grades[grade].gradeNumber}{$grades[grade].gradeLetter}</a> <br>
		{/each}
	{/if}

	{#await fetchSchool($token) then school}
		{setInterval(school)}
	{/await}

	{#await fetchTimetable($token) then timetable}
		{#if timetable[$today]}
			<CurrentPeriod timetable={timetable} day={$today} interval={$interval} />
			<br>
			<NextPeriod timetable={timetable} day={$today} interval={$interval + 1} />
		{/if}
	{/await}
</main>
