<template>
	<article class="manual-page content-box">
		<header>
			<h2>User Manual</h2>
		</header>

		<nav class="table-of-contents">
			<h3>Table of Contents</h3>
			<ol>
				<li><a href="#m-intro">Introduction</a></li>
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
						<li><a href="#m-group-toggler">Card Group Toggler</a></li>
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
import ManualIntroduction from '@/components/ManualIntroduction.vue'
import ManualAppHeader from '@/components/ManualAppHeader.vue'
import ManualCreateDeckPage from '@/components/ManualCreateDeckPage.vue'
import ManualDeckPages from '@/components/ManualDeckPages.vue'
import ManualMoreStatsPages from '@/components/ManualMoreStatsPages.vue'
import ManualStorageOfDeckData from '@/components/ManualStorageOfDeckData.vue'
import ManualAppDevelopment from '@/components/ManualAppDevelopment.vue'

export default {
	components: { ManualIntroduction, ManualAppHeader, ManualCreateDeckPage, ManualDeckPages, ManualMoreStatsPages, ManualStorageOfDeckData, ManualAppDevelopment },
	mounted () {
		const manualLinks = document.querySelectorAll('.manual-page a')

		manualLinks.forEach(link => {
			link.addEventListener('click', (event) => {
				const regexManualSectionLink = /^#.*/ // A substring beginning with `#`.

				if (regexManualSectionLink.test(event.target.hash)) {
					const targetedSection = document.querySelector(event.target.hash)

					event.preventDefault()
					targetedSection.scrollIntoView({ behavior: 'smooth' })
				}
			})
		})
	}
}
</script>

<style lang="scss">
	@import '@/sass/page-manual.scss';
</style>
