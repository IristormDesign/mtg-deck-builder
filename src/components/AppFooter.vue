<template>
	<footer class="app-footer">
		<recent-decks />

		<div class="legal wrap">
			<p>
				<span class="group">
					<a href="/">MTG Deck Builder</a> by <a href="https://iristormdesign.com" target="_blank">Iristorm Design<svg><use href="#open-in-new-icon" /></svg></a>
				</span>
				<span class="group">
					<span class="divider"> // </span>
					<router-link to="/terms">Terms of Service</router-link>
					<span class="divider"> // </span>
					<router-link to="/privacy">Privacy Policy</router-link>
					<span class="divider"> // </span>
					<router-link to="/release-notes">Release Notes</router-link>
					<span class="divider"> // </span>
					<router-link to="/contact">Contact</router-link>
				</span>
			</p>
			<p v-if="$route.name === 'home'">Intro background illustration from <a href="https://magic.wizards.com/en/news#wallpapers" target="_blank">Invasion of Dominaria<svg><use href="#open-in-new-icon" /></svg></a> by Denys Tsiperko.</p>
			<p><i>Magic: The Gathering</i> brand and content are TM and &copy; by Wizards of the Coast, LLC. All other content, unless indicated otherwise, is copyright &copy; {{ new Date().getFullYear() }} by Damian Schmidt of Iristorm Design. MTG Deck Builder is not affiliated with or endorsed by Wizards of the Coast, but is allowed under its Fan Content Policy.</p>
		</div>
	</footer>
</template>

<script>
import RecentDecks from '@/components/RecentDecks.vue'

export default {
	components: { RecentDecks }
}
</script>

<style lang="scss">
	@use '@/sass/app-footer.scss';
</style>
