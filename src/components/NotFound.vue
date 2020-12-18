<template>
	<article class="not-found contents">
		<h2>Error: Page Not Found</h2>
		<p>You tried to go to a web page that doesn’t exist. Perhaps the page once existed but it’s been removed.</p>
		<p><router-link :to="{name: 'home'}"><strong>Go to the home page?</strong></router-link></p>
	</article>
</template>

<script>
export default {
	name: 'notFound'
}
</script>
