<template>
	<footer class="app-footer">
		<div class="wrap">
			<p>
				<span class="group">
					<router-link to="/"><strong>MTG Deck Builder</strong></router-link> by <a href="https://iristormdesign.com" target="_blank" rel="noopener">Iristorm Design</a> — <span>Version 1.16.0</span>
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
			<p><a href="https://magic.wizards.com" target="_blank" rel="noopener"><i>Magic: The Gathering</i></a> content is TM and &copy; by Wizards of the Coast. This app is not affiliated with Wizards of the Coast, but is allowed under their Fan Content Policy. Data and images of <i>Magic</i> cards are provided via the public API of <a href="https://scryfall.com" target="_blank" rel="noopener">Scryfall</a>. This app is not affiliated with Scryfall. All other content, unless indicated otherwise, is copyright &copy; {{ new Date().getFullYear() }} by Damian Schmidt.</p>
		</div>
	</footer>
</template>

<script>
export default {
	methods: {
		clearLocalStorage () {
			const confirmed = confirm('⚠ WARNING\n\nYou’re about to permanently delete all of your data stored in this app, including the decks you’ve made. Are you sure you want to do this?')

			if (confirmed) {
				localStorage.clear()

				window.location.href = '/' // Make the page reload which is necessary to restore the default decks.
			}
		}
	}
}
</script>
