<script>

	import Router, { push } from 'svelte-spa-router';
	import routes from './routes';

	import {token, info, subjects, grades, draftMarks,  marks} from './stores';
	import {onMount} from 'svelte';
  import { sortGrades, sortSubjects } from './sort/sort'

	onMount(() => {
		token.set(localStorage.getItem('token'))
		info.set(JSON.parse(localStorage.getItem('info')))

		if ($info) {
			subjects.set(sortSubjects($info.subjects))
			grades.set(sortGrades($info.subjects))
		}
		
		push('/welcome')
	})
	
</script>

<main>
	<div style="width: var(--container); margin: auto;">
		<Router {routes} />
	</div>
</main>

<style>
	:root {
		--darkgreen: #054D1B;
		--darkgreen-transparent: rgba(5, 77, 27, 0.6);
		--lightgreen: #38E377;
		--lightgreen-transparent: rgba(56, 227, 119, 0.6);
		--gray: #BDBDBD;
		--black: #303030;
		--white: white;
		--offwhite: #F2F2F2;
		--red: red;
		--yellow: yellow;
		--border-radius: 20px;
		--border: 1.5px solid var(--darkgreen);
		--width: 93%;
		--serif: serif;
		--sans-serif: sans-serif;

		--container: 100%;
	}

	@media screen and (min-width: 576px) {
		:root {
			--container: 80%;
		}
	}
	
	@media screen and (min-width: 768px) {
		:root {
			--container: 60%;
		}
	}
	
	@media screen and (min-width: 992px) {
		:root {
			--container: 50%;
		}
	}
</style>

