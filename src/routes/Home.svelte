<script>
	
	import {token, info} from '../stores'
	import {push, link} from 'svelte-spa-router'

	if ($token == "") {
		push("/login/update")
	}

	let subjects = $info.subjects

</script>

<main>
	{#if subjects}
		{#each subjects as subject}
			<a href="/teacher/{subject.id}" use:link>
				{subject.grade.gradeNumber}{subject.grade.gradeLetter} - {subject.name} 
			</a>
			<br>
		{/each}
	{/if}
</main>
