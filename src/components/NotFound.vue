<template>
	<div class="not-found tab-contents">
		<article>
			<h2>No Page Found</h2>
			<p>There’s nothing at the current URL. <router-link :to="{name: 'home'}">Return to the home page?</router-link></p>
		</article>
	</div>
</template>

<script>
export default {
	name: 'notFound'
}
</script>
