<template>
	<footer class="site-footer">
		<div class="wrap">
			<p><strong>MTG Deck Organizer</strong> — Version 1.0.0</p>
			<p>Web design and development by Damian Schmidt of <a href="https://iristormdesign.com">Iristorm Design</a>.</p>
			<p><i>Magic: The Gathering</i> content is TM and &copy; by Wizards of the Coast. This web app is not affiliated with or  endorsed by Wizards of the Coast, but is allowed under their Fan Content Policy. <br>The Scryfall API provides the data and images of cards. This web app is not affiliated with or endorsed by Scryfall.</p>
			<div class="app-options">
				<button class="app-reset" @click="clearLocalStorage()">Reset</button>
			</div>
		</div>
	</footer>
</template>

<script>
export default {
	name: 'site-footer',
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
