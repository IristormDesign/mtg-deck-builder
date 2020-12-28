<template>
	<footer class="site-footer">
		<p>MTG Deck List Organizer – Version 1.0.0</p>
		<p>Website design and development by Damian Schmidt / <a href="https://iristormdesign.com">Iristorm Design</a>.</p>
		<p><i>Magic: The Gathering</i> material is TM and &copy; by Wizards of the Coast. This web app is not affiliated with Wizards of the Coast.</p>

		<div class="app-options">
			<button class="app-reset" @click="clearLocalStorage()">Reset</button>
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
