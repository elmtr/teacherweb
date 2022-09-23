<script>

	import Router, { push } from 'svelte-spa-router';
	import routes from './routes';

	import {token, info, subjects, grades, marks} from './stores';
	import {onMount} from 'svelte';
  import { sortGrades, sortSubjects } from './sort/sort'
	import {findInterval} from './utils/utils'

	onMount(() => {
		token.set(localStorage.getItem('token'))
		info.set(JSON.parse(localStorage.getItem('userInfo')))

		if ($info) {
			// creating the initial mark slots for each subject
			let marksSkeleton = {}
			for (let i in $info.subjects) {
				marksSkeleton[$info.subjects[i].key] = {}
			}
			marks.set(marksSkeleton)
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

