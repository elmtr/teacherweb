<script>

	import Router, { push } from 'svelte-spa-router';
	import routes from './routes';

	import {token, info, subjects, grades, draftMarks,  marks} from './stores';
	import {onMount} from 'svelte';
  import { sortGrades, sortSubjects } from './sort/sort'

	onMount(() => {
		token.set(localStorage.getItem('token'))
		info.set(JSON.parse(localStorage.getItem('userInfo')))

		if ($info) {
			subjects.set(sortSubjects($info.subjects))
			grades.set(sortGrades($info.subjects))
		}

		if (!$info) {
			push("/login")
		}
		if (!$token) {
			push("/login/update")
		}
	})
	
</script>

<main>
	<Router {routes} />
</main>

