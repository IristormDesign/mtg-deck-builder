<template>
	<footer class="app-footer">
		<div class="wrap">
			<p>
				<span class="group">
					<a href="/"><strong>MTG Deck Builder</strong></a> by <a href="https://iristormdesign.com" target="_blank">Iristorm Design</a> – <span>Version {{appVersion}}</span>
				</span>
				<span class="group">
					<span class="divider">|</span>
					<router-link to="/terms">Terms of Service</router-link>

					<span class="divider">|</span>
					<router-link to="/privacy">Privacy Policy</router-link>
				</span>
			</p>
			<p><a href="https://magic.wizards.com" target="_blank"><i>Magic: The Gathering</i></a> is TM and &copy; by Wizards of the Coast, LLC. This app is not affiliated with Wizards of the Coast, but is allowed under their Fan Content Policy. Data and images of <i>Magic</i> cards are provided via the public API of <a href="https://scryfall.com" target="_blank">Scryfall</a>, LLC. This app is not affiliated with Scryfall. All other content, unless indicated otherwise, is copyright &copy; {{ new Date().getFullYear() }} by Damian Schmidt of Iristorm Design.</p>
		</div>
	</footer>
</template>

<script>
export default {
	data () {
		return {
			appVersion: process.env.VUE_APP_VERSION
		}
	}
}
</script>
