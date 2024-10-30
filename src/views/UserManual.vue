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
						<a href="#intro">Introduction</a>
						<ol>
							<li><a href="#game-rules">Game Rules</a></li>
						</ol>
					</li>
					<li>
						<a href="#app-header">App Header</a>
						<ol>
							<li><a href="#deck-menu">Deck Menu</a></li>
						</ol>
					</li>
					<li><a href="#create-deck">Create Deck Page</a></li>
					<li>
						<a href="#deck-pages">Deck Pages</a>
					</li>
					<li>
						<a href="#deck-page-header">Deck Page Header</a>
						<ol>
							<li><a href="#deck-name">Deck Name</a></li>
							<li><a href="#basic-statistics">Basic Statistics</a></li>
							<li><a href="#mode-menu">Mode Menu</a></li>
							<li>
								<a href="#deck-actions">Deck Actions</a>
								<ol>
									<li><a href="#convert-to-text-action">Convert to Text</a></li>
									<li><a href="#copy-action">Copy</a></li>
									<li><a href="#export-action">Export</a></li>
									<li><a href="#delete-action">Delete</a></li>
								</ol>
							</li>
						</ol>
					</li>
					<li><a href="#deck-page-modes">Deck Page Modes</a></li>
					<li>
						<a href="#deck-editor">Deck Editor</a>
						<ol>
							<li><a href="#card-image">Card Image</a></li>
							<li><a href="#card-sorter">Card Sorter</a></li>
							<li>
								<a href="#card-groups">Card Group Switch</a>
								<ol>
									<li><a href="#sideboard-uses">Sideboard Uses</a></li>
								</ol>
							</li>
							<li><a href="#sideboard-header">Sideboard Header</a></li>
							<li>
								<a href="#card-list">Card List</a>
								<ol>
									<li><a href="#card-stars">Card Stars</a></li>
									<li><a href="#card-bars">Card Bars</a></li>
									<li><a href="#card-quantities">Card Quantities</a></li>
								</ol>
							</li>
							<li><a href="#scryfall-button">Scryfall Advanced Search Button</a></li>
							<li>
								<a href="#card-adder">Card Adder</a>
								<ol>
									<li><a href="#card-name-query">Name Query</a></li>
									<li><a href="#scryfall-url-query">Scryfall Page URL Query</a></li>
									<li><a href="#random-card-query">Random Query</a></li>
									<li><a href="#card-adder-other-info">Other Info</a></li>
								</ol>
							</li>
							<li>
								<a href="#add-card-list">Add Card List Button</a>
								<ol>
									<li><a href="#card-list-entry">Card List Entry Page</a></li>
								</ol>
							</li>
						</ol>
					</li>
					<li>
						<a href="#deck-analyzer">Deck Analyzer</a>
						<ol>
							<li><a href="#data-tables">Data Tables</a></li>
							<li><a href="#statistics-filter">Statistics Filter</a></li>
						</ol>
					</li>
					<li><a href="#draw-sim">Draw Simulator</a></li>
					<li>
						<a href="#keyboard-shortcuts">Keyboard Shortcuts</a>
						<ol>
							<li><a href="#kbsc-deck-page-modes">Deck Page Modes</a></li>
							<li><a href="#kbsc-deck-editor">Deck Editor Actions</a></li>
							<li><a href="#kbsc-deck-analyzer">Deck Analyzer Actions</a></li>
							<li><a href="#kbsc-draw-sim">Draw Simulator Actions</a></li>
						</ol>
					</li>
					<li>
						<a href="#storage-of-deck-data">Storage of Deck Data</a>
						<ol>
							<li><a href="#deck-data-files">Deck Data Files</a></li>
						</ol>
					</li>
					<li><a href="#app-dev">App Development</a></li>
				</ol>
			</div>
		</nav>

		<div class="manual-contents">
			<manual-introduction />
			<app-header />
			<create-deck-page />
			<deck-pages />
			<deck-page-header />
			<deck-page-modes />
			<deck-editor />
			<deck-analyzer />
			<draw-sim />
			<keyboard-shortcuts />
			<storage-of-deck-data />
			<app-development />
		</div>
	</article>
</template>

<script>
import ManualIntroduction from '@/components/manual-chapters/ManualIntroduction.vue'
import AppHeader from '@/components/manual-chapters/AppHeader.vue'
import CreateDeckPage from '@/components/manual-chapters/CreateDeckPage.vue'
import DeckPages from '@/components/manual-chapters/DeckPages.vue'
import DeckPageHeader from '@/components/manual-chapters/DeckPageHeader.vue'
import DeckPageModes from '@/components/manual-chapters/DeckPageModes.vue'
import DeckEditor from '@/components/manual-chapters/DeckEditor.vue'
import DeckAnalyzer from '@/components/manual-chapters/DeckAnalyzer.vue'
import DrawSim from '@/components/manual-chapters/DrawSim.vue'
import KeyboardShortcuts from '@/components/manual-chapters/KeyboardShortcuts.vue'
import StorageOfDeckData from '@/components/manual-chapters/StorageOfDeckData.vue'
import AppDevelopment from '@/components/manual-chapters/AppDevelopment.vue'

export default {
	components: { ManualIntroduction, AppHeader, CreateDeckPage, DeckPages, DeckPageHeader, DeckPageModes, DeckEditor, DeckAnalyzer, DrawSim, KeyboardShortcuts, StorageOfDeckData, AppDevelopment },
	watch: {
		$route () {
			if (this.$route.hash === '') {
				setTimeout(() => {
					window.scrollTo(0, 0)
				}, 1)
			}
		}
	},
	mounted () {
		if (window.innerWidth > 960) { // The exact window width is equal to the pixel breakpoint when the table of contents section no longer stays on the side of the page when scrolling down.
			this.highlightTOCLinkOfVisibleSection()
			this.highlightFirstTOCLinkWhenAtTopOfPage()
		}
	},
	methods: {
		highlightTOCLinkOfVisibleSection () {
			const observer = new IntersectionObserver(
				(entries) => {
					entries.forEach(entry => {
						if (entry.isIntersecting) {
							doIntersectionEffect(entry)
						}
					})
				}, {
					rootMargin: '-50%'
				}
			)

			const tocLinks = document.querySelectorAll('.toc-links a')
			const tocContainer = document.querySelector('.table-of-contents')

			function doIntersectionEffect (entry) {
				tocLinks.forEach(link => {
					const linkMatchesWithSection = link.getAttribute('href').substring(1) === entry.target.id

					link.classList.toggle(
						'visible', linkMatchesWithSection
					)

					if (linkMatchesWithSection) {
						tocContainer.scrollTo({
							top: link.offsetTop - 83.3333, // The subtracted number is equal to five times the links' line-height in pixels.
							behavior: 'smooth'
						})
					}
				})
			}

			const sections = document.querySelectorAll('section')

			sections.forEach(section => {
				observer.observe(section)
			})
		},
		highlightFirstTOCLinkWhenAtTopOfPage () {
			const tocLinks = document.querySelectorAll('.toc-links a')

			window.addEventListener('scroll', () => {
				if (window.scrollY === 0) {
					tocLinks.forEach(link => {
						link.classList.remove('visible')
					})

					tocLinks[0].classList.add('visible')
				}
			})
		}
	}
}
</script>

<style lang="scss">
	@import '@/sass/page-user-manual.scss';
</style>
