<script>
	
	import {token, today, now, subjects, grades} from '../stores'
	import {push, link} from 'svelte-spa-router'
	import {fetchSchool, fetchTimetable} from '../fetch/fetch'
	import { findInterval } from '../utils/utils'
	import { writable } from 'svelte/store'
	
	if ($token == "") {
		push("/login/update")
	}

	let day = $today
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
		{timetable[day][$interval][0].subject.grade.gradeNumber}{timetable[day][$interval][0].subject.grade.gradeLetter} - {timetable[day][$interval][0].subject.name}
		<br>
		{timetable[day][$interval + 1][0].subject.grade.gradeNumber}{timetable[day][$interval + 1][0].subject.grade.gradeLetter} - {timetable[day][$interval + 1][0].subject.name}
	{/await}
</main>
