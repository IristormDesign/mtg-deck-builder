<template>
	<footer class="site-footer">
		<div class="wrap">
			<p><strong>MTG Deck Builder</strong> by Iristorm Design — Version 1.0.0 <span>|</span> <router-link to="/terms">Terms of Service</router-link> <span>|</span> <router-link to="/privacy">Privacy Policy</router-link> <span>|</span> <a href="#clear" @click.prevent="clearLocalStorage()">Clear Stored Data</a></p>
			<p><i>Magic: The Gathering</i> content is TM and &copy; by Wizards of the Coast. This app is not affiliated with or endorsed by Wizards of the Coast, but is allowed under their Fan Content Policy.</p>
			<p>Data and images of <i>Magic</i> cards are provided by the Scryfall API. This app is not affiliated with or endorsed by Scryfall.</p>
			<p>All other content, unless indicated otherwise, is copyright &copy; 2021 by Damian Schmidt.</p>
		</div>
	</footer>
</template>

<script>
export default {
	methods: {
		clearLocalStorage () {
			const confirmed = confirm('⚠ Do you want to permanently erase all decks you’ve made here? (The app’s default decks will be restored.)')

			if (confirmed) {
				localStorage.clear()

				window.location.href = '/' // Make the page reload which is necessary to restore the default decks.
			}
		}
	}
}
</script>
