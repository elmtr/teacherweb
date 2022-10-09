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

<style>
	:root {
		--darkgreen: #054D1B;
		--lightgreen: #38E377;
		--gray: #BDBDBD;
		--black: #303030;
		--white: white;
		--offwhite: #F2F2F2;
		--red: red;
		--border-radius: 20px;
		--border: 1.5px solid var(--darkgreen);
		--width: 93%;
		--serif: serif;
		--sans-serif: sans-serif;
	}

	/* main {
		background: var(--offwhite);
	} */
</style>

