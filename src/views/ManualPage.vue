<template>
	<article class="manual-page content-box">
		<header>
			<h2>User Manual</h2>
		</header>

		<nav class="table-of-contents">
			<h3>Table of Contents</h3>
			<div class="toc-links">
				<ol>
					<li>
						<a href="#m-intro">Introduction</a>
						<ol>
							<li><a href="#m-symbols">Symbols</a></li>
						</ol>
					</li>
					<li>
						<a href="#m-app-header">App Header</a>
						<ol>
							<li><a href="#m-decks-menu">Decks Menu</a></li>
						</ol>
					</li>
					<li><a href="#m-create-deck">“Create Deck” Page</a></li>
					<li>
						<a href="#m-deck-pages">Deck Pages</a>
						<ol>
							<li><a href="#m-deck-name">Deck Name</a></li>
							<li><a href="#m-deck-statistics">Deck Statistics</a></li>
							<li><a href="#m-card-image">Card Image</a></li>
							<li><a href="#m-card-sorter">Card Sorter</a></li>
							<li><a href="#m-group-switch">Card Group Switch</a></li>
							<li><a href="#m-sideboard-header">Sideboard Header</a></li>
							<li><a href="#m-card-list">Card List</a></li>
							<li><a href="#m-card-quantities">Card Quantities</a></li>
							<li><a href="#m-card-adder">Card Adder</a></li>
							<li><a href="#m-deck-actions">Deck Actions</a></li>
						</ol>
					</li>
					<li><a href="#m-more-stats-pages">“More Stats” Pages</a></li>
					<li>
						<a href="#m-storage-of-deck-data">Storage of Deck Data</a>
						<ol>
							<li><a href="#m-deck-data-files">Deck Data Files</a></li>
						</ol>
					</li>
					<li><a href="#m-app-dev">App Development</a></li>
				</ol>
			</div>
		</nav>

		<div class="the-manual">
			<manual-introduction />
			<manual-app-header />
			<manual-create-deck-page />
			<manual-deck-pages />
			<manual-more-stats-pages />
			<manual-storage-of-deck-data />
			<manual-app-development />
		</div>
	</article>
</template>

<script>
import ManualIntroduction from '@/components/manual-chapters/ManualIntroduction.vue'
import ManualAppHeader from '@/components/manual-chapters/ManualAppHeader.vue'
import ManualCreateDeckPage from '@/components/manual-chapters/ManualCreateDeckPage.vue'
import ManualDeckPages from '@/components/manual-chapters/ManualDeckPages.vue'
import ManualMoreStatsPages from '@/components/manual-chapters/ManualMoreStatsPages.vue'
import ManualStorageOfDeckData from '@/components/manual-chapters/ManualStorageOfDeckData.vue'
import ManualAppDevelopment from '@/components/manual-chapters/ManualAppDevelopment.vue'

export default {
	components: { ManualIntroduction, ManualAppHeader, ManualCreateDeckPage, ManualDeckPages, ManualMoreStatsPages, ManualStorageOfDeckData, ManualAppDevelopment },
	mounted () {
		this.modifyManualLinkEffects()
	},
	methods: {
		modifyManualLinkEffects () {
			document.querySelectorAll('.manual-page a').forEach(link => {
				link.addEventListener('click', this.manualLinkClickEvent)
			})
		},
		manualLinkClickEvent (event) {
			const regexManualSectionLink = /^#.*/ // A string beginning with `#`.

			if (regexManualSectionLink.test(event.target.hash)) {
				const targetedSection = document.querySelector(event.target.hash)

				event.preventDefault()
				this.$store.commit('setPageScrollByAnchors', true)
				this.$store.commit('setStickAppHeader', false)
				targetedSection.scrollIntoView({ behavior: 'smooth' })

				setTimeout(() => {
					this.$store.commit('setPageScrollByAnchors', false)
				}, 1000) // Duration should be equal to the amount of time the browser scrolls the page between anchors.
			}
		}
	}
}
</script>

<style lang="scss">
	@import '@/sass/page-manual.scss';
</style>
