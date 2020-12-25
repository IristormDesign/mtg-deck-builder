<template>
	<article class="not-found contents">
		<h2>Error: Page Not Found</h2>
		<p>Your web browser tried to go to a page that doesn’t exist. Perhaps that page had existed before but was later removed.</p>
		<p><router-link :to="{name: 'home'}">Go to the home page?</router-link></p>
	</article>
</template>

<script>
export default {
	name: 'notFound'
}
</script>
