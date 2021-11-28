<template>
	<footer class="site-footer">
		<div class="wrap">
			<p>
				<span class="group">
					<router-link to="/"><strong>MTG Deck Builder</strong></router-link> by <a href="https://iristormdesign.com" target="_blank" rel="noopener">Iristorm Design</a> — <span>Version 1.9.2</span>
				</span>
				<span class="group">
					<span class="divider">|</span>
					<router-link to="/terms">Terms of Service</router-link>

					<span class="divider">|</span>
					<router-link to="/privacy">Privacy Policy</router-link>

					<span class="divider">|</span>
					<a href="#clear" @click.prevent="clearLocalStorage()">Clear Stored Data</a>
				</span>
			</p>
			<p><i>Magic: The Gathering</i> content is TM and &copy; by Wizards of the Coast. This app is not affiliated with or endorsed by Wizards of the Coast, but is allowed under their Fan Content Policy. Data and images of <i>Magic</i> cards are provided by the Scryfall API. This app is not affiliated with or endorsed by Scryfall. All other content, unless indicated otherwise, is copyright &copy; 2021 by Damian Schmidt.</p>
		</div>
	</footer>
</template>

<script>
export default {
	methods: {
		clearLocalStorage () {
			const confirmed = confirm('⚠ You’re about to permanently delete all of your data stored in this app, which includes the customized decks you’ve made.\n\nAre you sure you want to do this?')

			if (confirmed) {
				localStorage.clear()

				window.location.href = '/' // Make the page reload which is necessary to restore the default decks.
			}
		}
	}
}
</script>
