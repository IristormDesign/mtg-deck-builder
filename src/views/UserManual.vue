<template>
	<article class="manual-page content-box">
		<header>
			<h2>User Manual</h2>
		</header>

		<nav class="table-of-contents" aria-label="Table of Contents">
			<div class="scrollable-region">
				<h3>Table of Contents</h3>
				<div class="toc-links">
					<ol>
						<li v-for="chapter in chapters" :key="chapter.path">
							<router-link
								:to="{path: `/manual/${chapter.path}`}"
								@click.native="scrollToTopOfManualContents()"
							>
								{{ chapter.name }}
							</router-link>

							<ol v-if="chapter.subchapters">
								<li
									v-for="subchapter in chapter.subchapters"
									:key="subchapter.hash"
								>
									<router-link
										:to="{path: '/manual/' + chapter.path + subchapter.hash}"
										@click.native="setTargetedSection(subchapter.hash)"
									>
										{{ subchapter.name }}
									</router-link>

									<ol v-if="subchapter.subchapters && $route.path === '/manual/' + chapter.path">
										<li
											v-for="subSubchapter in subchapter.subchapters"
											:key="subSubchapter.hash"
										>
											<router-link
												:to="{path: '/manual/' + chapter.path + subSubchapter.hash}"
												@click.native="setTargetedSection(subSubchapter.hash)"
											>
												{{ subSubchapter.name }}
											</router-link>
										</li>
									</ol>
								</li>
							</ol>
						</li>
					</ol>
				</div>
			</div>
		</nav>

		<div class="manual-contents">
			<router-view />

			<footer>
				<ul>
					<li v-if="getAdjacentChapters().prev">
						<strong>Previous Chapter</strong>
						<router-link :to="{path: `/manual/${getAdjacentChapters().prev.path}`}">
							← {{ getAdjacentChapters().prev.name }}
						</router-link>
					</li>
					<li v-if="getAdjacentChapters().next">
						<strong>Next Chapter</strong>
						<router-link :to="{path: `/manual/${getAdjacentChapters().next.path}`}">
							{{ getAdjacentChapters().next.name }} →
						</router-link>
					</li>
				</ul>
			</footer>
		</div>
	</article>
</template>

<script>
export default {
	data () {
		return {
			chapters: [
				{
					name: 'Introduction',
					path: 'intro',
					subchapters: [
						{
							name: 'Game Rules',
							hash: '#game-rules'
						}
					]
				}, {
					name: 'App Header',
					path: 'app-header',
					subchapters: [
						{
							name: 'Deck Menu',
							hash: '#deck-menu'
						}
					]
				}, {
					name: '“Create Deck” Page',
					path: 'create-deck',
					subchapters: [
						{
							name: 'Start New Deck',
							hash: '#start-new-deck'
						}, {
							name: 'Replicate Archived Decks',
							hash: '#replicate-archived-decks'
						}, {
							name: 'Create Deck from Plain-Text List',
							hash: '#create-from-plain-text-list'
						}
					]
				}, {
					name: 'Deck Pages',
					path: 'deck-pages'
				}, {
					name: 'Deck Page Header',
					path: 'deck-page-header',
					subchapters: [
						{
							name: 'Deck Name',
							hash: '#deck-name'
						}, {
							name: 'Basic Statistics',
							hash: '#basic-statistics'
						}, {
							name: 'Mode Menu',
							hash: '#mode-menu'
						}, {
							name: 'Deck Actions',
							hash: '#deck-actions',
							subchapters: [
								{
									name: 'Duplicate',
									hash: '#duplicate-action'
								}, {
									name: 'Archive',
									hash: '#archive-action'
								}, {
									name: 'Delete',
									hash: '#delete-action'
								}
							]
						}
					]
				}, {
					name: 'Deck Page Modes',
					path: 'deck-page-modes'
				}, {
					name: 'List Editor',
					path: 'list-editor',
					subchapters: [
						{
							name: 'Card Image',
							hash: '#card-image'
						}, {
							name: 'Card Sorter',
							hash: '#card-sorter'
						}, {
							name: 'Card Group Switch',
							hash: '#card-groups',
							subchapters: [
								{
									name: 'Sideboard Uses',
									hash: '#sideboard-uses'
								}
							]
						}, {
							name: 'Sideboard Header',
							hash: '#sideboard-header'
						}, {
							name: 'Card List',
							hash: '#card-list',
							subchapters: [
								{
									name: 'Card Stars',
									hash: '#card-stars'
								}, {
									name: 'Card Bars',
									hash: '#card-bars'
								}, {
									name: 'Card Quantities',
									hash: '#card-quantities'
								}
							]
						}, {
							name: 'Scryfall Advanced Search Button',
							hash: '#scryfall-button'
						}, {
							name: 'Card Adder',
							hash: '#card-adder',
							subchapters: [
								{
									name: 'Name Query',
									hash: '#card-name-query'
								}, {
									name: 'Scryfall Page URL Query',
									hash: '#scryfall-url-query'
								}, {
									name: 'Random Query',
									hash: '#random-card-query'
								}, {
									name: 'Other Info',
									hash: '#card-adder-other-info'
								}
							]
						}, {
							name: '“Add Multiple” Button',
							hash: '#add-multiple',
							subchapters: [
								{
									name: 'Card List Entry Page',
									hash: '#card-list-entry'
								}
							]
						}
					]
				}, {
					name: 'Stats Analyzer',
					path: 'stats-analyzer',
					subchapters: [
						{
							name: 'Data Tables',
							hash: '#data-tables'
						}, {
							name: 'Statistics Filter',
							hash: '#statistics-filter'
						}
					]
				}, {
					name: 'Draw Simulator',
					path: 'draw-sim'
				}, {
					name: 'Text Renderer',
					path: 'text-renderer'
				}, {
					name: 'Keyboard Shortcuts',
					path: 'keyboard-shortcuts',
					subchapters: [
						{
							name: 'Deck Page Modes',
							hash: '#kbsc-deck-page-modes'
						}, {
							name: 'List Editor Actions',
							hash: '#kbsc-list-editor'
						}, {
							name: 'Stats Analyzer Actions',
							hash: '#kbsc-stats-analyzer'
						}, {
							name: 'Draw Simulator Actions',
							hash: '#kbsc-draw-sim'
						}
					]
				}, {
					name: 'Storage of Deck Data',
					path: 'storage-of-deck-data',
					subchapters: [
						{
							name: 'Deck Archive Files',
							hash: '#deck-archive-files'
						}
					]
				}, {
					name: 'App Development',
					path: 'app-dev'
				}
			]
		}
	},
	mounted () {
		// if (window.innerWidth > 960) { // The exact window width is equal to the pixel breakpoint when the table of contents section no longer stays on the side of the page when scrolling down.
		this.highlightTOCLinkOfVisibleSection()
		// }

		window.addEventListener(
			'scroll', this.highlightPrimaryTOCLinkWhenAtPrimaryChapter
		)
	},
	updated () {
		if (
			this.$route.path !== '/manual/intro' &&
			!this.$route.hash
		) {
			this.scrollToTopOfManualContents()
		}

		document.activeElement.blur() // Needed to prevent the adjacent chapter links from remaining focused when clicked.

		this.highlightTOCLinkOfVisibleSection()
	},
	destroyed () {
		window.removeEventListener(
			'scroll', this.highlightPrimaryTOCLinkWhenAtPrimaryChapter
		)
	},
	methods: {
		setTargetedSection (target) {
			this.$nextTick(() => {
				const sections = document.querySelectorAll('.manual-contents section')

				for (const section of sections) {
					if ('#' + section.id === target) {
						setTimeout(() => {
							section.classList.add('target')
						}, 125)
					} else {
						section.classList.remove('target')
					}
				}
			})
		},
		scrollToTopOfManualContents () {
			this.$nextTick(() => {
				const manualContents = document.querySelector('.manual-contents')

				if (!manualContents) return

				manualContents.scrollIntoView({
					behavior: 'auto',
					block: 'start'
				})

				this.forceHighlightTOCLink()

				const tocLinks = document.querySelectorAll('.toc-links a')

				setTimeout(() => {
					tocLinks.forEach(link => {
						link.classList.remove('visible')

						if (this.$route.path.includes(link.getAttribute('href'))) {
							link.classList.add('visible')
						}
					})
				}, 1) // The timeout is needed to ensure the correct ToC link is highlighted after the scroll event.
			})
		},
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
			const tocContainer = document.querySelector('.table-of-contents .scrollable-region')

			const doIntersectionEffect = (observedSection) => {
				tocLinks.forEach(link => {
					const regexPrimaryChapter = new RegExp(`/manual/${observedSection.target.id}$`, 'i')
					const regexChapterID = new RegExp(`#${observedSection.target.id}$`, 'i')

					const linkMatchesWithChapter = () => {
						return (
							regexPrimaryChapter.test(link.getAttribute('href')) ||
							regexChapterID.test(link.getAttribute('href'))
						)
					}

					if (linkMatchesWithChapter()) {
						link.classList.add('visible')

						tocContainer.scrollTo({
							top: link.offsetTop - (16.6667 * 6), // The subtracted number is equal the links' line-height in pixels multiplied by an arbitrary number.
							behavior: 'smooth'
						})
					} else {
						link.classList.remove('visible')
					}
				})
			}

			const sections = document.querySelectorAll('section')

			sections.forEach(section => {
				observer.observe(section)
			})
		},
		highlightPrimaryTOCLinkWhenAtPrimaryChapter () {
			let lastElInTopChapterSection = document.querySelectorAll(
				'.manual-contents > section > :not(section)'
			)
			lastElInTopChapterSection = lastElInTopChapterSection[
				lastElInTopChapterSection.length - 1
			]

			if (window.scrollY <= lastElInTopChapterSection.getBoundingClientRect().bottom) {
				this.forceHighlightTOCLink()
			}
		},
		forceHighlightTOCLink () {
			const tocLinks = document.querySelectorAll('.toc-links a')

			setTimeout(() => {
				tocLinks.forEach(link => {
					link.classList.remove('visible')

					if (this.$route.path.includes(link.getAttribute('href'))) {
						link.classList.add('visible')
					}
				})
			}, 1) // The timeout is needed to consistently ensure that the correct ToC link is highlighted after the scroll event.
		},
		getAdjacentChapters () {
			const index = this.chapters.findIndex(
				chapter => '/manual/' + chapter.path === this.$route.path
			)
			const prev = this.chapters[index - 1]
			const next = this.chapters[index + 1]

			return { prev, next }
		}
	}
}
</script>

<style lang="scss">
	@import '@/sass/page-user-manual.scss';
</style>
