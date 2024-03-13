<template>
	<article class="manual-page content-box">
		<header>
			<h2>User Manual</h2>
		</header>

		<nav class="table-of-contents" aria-label="Table of Contents">
			<h3>Table of Contents</h3>
			<div class="toc-links">
				<ol>
					<li>
						<a href="#m-intro">Introduction</a>
						<ol>
							<li><a href="#m-game-rules">Game Rules</a></li>
							<li><a href="#m-symbols">Symbols</a></li>
						</ol>
					</li>
					<li>
						<a href="#m-app-header">App Header</a>
						<ol>
							<li><a href="#m-deck-menu">Deck Menu</a></li>
						</ol>
					</li>
					<li><a href="#m-create-deck">Create Deck Page</a></li>
					<li>
						<a href="#m-deck-pages">Deck Pages</a>
						<ol>
							<li><a href="#m-deck-name">Deck Name</a></li>
							<li><a href="#m-deck-statistics">Deck Statistics</a></li>
							<li><a href="#m-deck-views">Deck Views Menu</a></li>
						</ol>
					</li>
					<li>
						<a href="#m-deck-editor">Deck Editor View</a>
						<ol>
							<li><a href="#m-card-image">Card Image</a></li>
							<li><a href="#m-card-sorter">Card Sorter</a></li>
							<li>
								<a href="#m-group-switch">Card Group Switch</a>
								<ol>
									<li><a href="#m-sideboard-uses">Sideboard Uses</a></li>
								</ol>
							</li>
							<li><a href="#m-sideboard-header">Sideboard Header</a></li>
							<li>
								<a href="#m-card-list">Card List</a>
								<ol>
									<li><a href="#m-card-stars">Card Stars</a></li>
									<li><a href="#m-card-buttons">Card Buttons</a></li>
									<li><a href="#m-card-quantities">Card Quantities</a></li>
								</ol>
							</li>
							<li><a href="#m-scryfall-button">Scryfall Advanced Search Button</a></li>
							<li><a href="#m-card-adder">Card Adder</a></li>
							<li><a href="#m-deck-actions">Deck Actions</a></li>
						</ol>
					</li>
					<li><a href="#m-more-stats">More Statistics View</a></li>
					<li><a href="#m-draw-sim">Draw Simulator View</a></li>
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
			<manual-deck-editor />
			<manual-more-stats />
			<manual-draw-sim />
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
import ManualDeckEditor from '@/components/manual-chapters/ManualDeckEditor.vue'
import ManualMoreStats from '@/components/manual-chapters/ManualMoreStats.vue'
import ManualDrawSim from '@/components/manual-chapters/ManualDrawSim.vue'
import ManualStorageOfDeckData from '@/components/manual-chapters/ManualStorageOfDeckData.vue'
import ManualAppDevelopment from '@/components/manual-chapters/ManualAppDevelopment.vue'

export default {
	components: { ManualIntroduction, ManualAppHeader, ManualCreateDeckPage, ManualDeckPages, ManualDeckEditor, ManualMoreStats, ManualDrawSim, ManualStorageOfDeckData, ManualAppDevelopment },
	mounted () {
		this.modifyManualLinkEffects()

		document.addEventListener('scrollend', this.scrollendEvent)
	},
	destroyed () {
		document.removeEventListener('scrollend', this.scrollendEvent)
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
				this.$store.commit('pageScrollByAnchors', true)
				this.$store.commit('stickAppHeader', false)

				setTimeout(() => {
					this.$store.commit('pageScrollByAnchors', false)
				}, 10) // There needs to be a little timeout duration because otherwise the header sometimes appears when a link to a higher section is clicked.
			}
		}
	}
}
</script>

<style lang="scss">
	@import '@/sass/page-manual.scss';
</style>
