<template>
	<article class="guide-page content-box">
		<header>
			<h2>User Guide</h2>
			<a
				v-if="mobileView()"
				@click.prevent="heardTOCLinkClick()"
				href="#toc"
			>
				See table of contents
			</a>
		</header>

		<div class="guide-contents" ref="guideContents">
			<router-view @tocLinkClicked="heardTOCLinkClick" />

			<footer>
				<ul>
					<li v-if="getAdjacentChapters().prev">
						<strong>Previous Chapter</strong>
						<router-link :to="{path: `/guide/${getAdjacentChapters().prev.path}`}">
							← {{ getAdjacentChapters().prev.name }}
						</router-link>
					</li>
					<li v-if="getAdjacentChapters().next">
						<strong>Next Chapter</strong>
						<router-link :to="{path: `/guide/${getAdjacentChapters().next.path}`}">
							{{ getAdjacentChapters().next.name }} →
						</router-link>
					</li>
				</ul>
			</footer>
		</div>

		<guide-table-of-contents
			:chapters="chapters"
			@clickedChapterLink="scrollToTopOfGuideContents"
			@clickedSubchapterLink="setTargetedSection"
		/>
	</article>
</template>

<script>
import GuideTableOfContents from '@/components/GuideTableOfContents.vue'

export default {
	components: { GuideTableOfContents },
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
					path: 'deck-pages',
					subchapters: [
						{
							name: 'Deck Page Modes',
							hash: '#deck-page-modes'
						}
					]
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
									name: 'Rename',
									hash: '#rename-action'
								}, {
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
							hash: '#add-multiple'
						}
					]
				}, {
					name: 'Card List Entry Page',
					path: 'card-list-entry'
				}, {
					name: 'Stats Analyzer',
					path: 'stats-analyzer',
					subchapters: [
						{
							name: 'Data Tables',
							hash: '#data-tables'
						}, {
							name: 'Data Filter',
							hash: '#data-filter'
						}
					]
				}, {
					name: 'Draw Simulator',
					path: 'draw-sim',
					subchapters: [
						{
							name: '“Cards in Library” Statistic',
							hash: '#cards-in-library'
						}, {
							name: '“Drawn Cards” Statistic',
							hash: '#drawn-cards'
						}, {
							name: '“Draw a Card” Button',
							hash: '#draw-a-card'
						}, {
							name: '“Restart” Button',
							hash: '#restart'
						}, {
							name: '“Exclude Starred Cards” Checkbox',
							hash: '#exclude-starred-cards'
						}, {
							name: 'Card List Section',
							hash: '#draw-sim-card-list'
						}, {
							name: 'Card Image Section',
							hash: '#draw-sim-card-image'
						}
					]
				}, {
					name: 'List Takeout',
					path: 'list-takeout',
					subchapters: [
						{
							name: 'Export Deck as Text File',
							hash: '#export-deck-as-text-file'
						}, {
							name: 'Print Deck',
							hash: '#print-deck'
						}, {
							name: 'Copy Card Lists',
							hash: '#copy-card-lists'
						}
					]
				}, {
					name: 'Keyboard Shortcuts',
					path: 'keyboard-shortcuts',
					subchapters: [
						{
							name: 'Setting Deck Page Modes',
							hash: '#kbsc-deck-page-modes'
						}, {
							name: 'List Editor',
							hash: '#kbsc-list-editor',
							subchapters: [
								{
									name: 'Highlighting Rows in Card List',
									hash: '#highlighting-rows'
								},
								{
									name: 'Actions to Highlighted Row',
									hash: '#actions-to-highlighted-row'
								},
								{
									name: 'Other List Editor Actions',
									hash: '#other-list-editor-actions'
								}
							]
						}, {
							name: 'Stats Analyzer',
							hash: '#kbsc-stats-analyzer'
						}, {
							name: 'Draw Simulator',
							hash: '#kbsc-draw-sim',
							subchapters: [
								{
									name: 'Unique Shortcuts to Draw Simulator',
									hash: '#unique-shortcuts-to-draw-sim'
								},
								{
									name: 'Same Shortcuts as List Editor',
									hash: '#same-shortcuts-as-list-editor'
								}
							]
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
			],
			tocIsFlashing: false
		}
	},
	watch: {
		'$route' () {
			this.$nextTick(() => {
				if (this.$route.hash) {
					this.setTargetedSection(this.$route.hash)
				} else {
					document.activeElement.blur() // Needed to prevent the adjacent chapter links from remaining focused when clicked.

					if (this.$route.path !== '/guide/intro') {
						this.scrollToTopOfGuideContents()
					}
				}
			})
		}
	},
	mounted () {
		this.setTargetedSection(this.$route.hash)
	},
	metaInfo () {
		return {
			title: 'User Guide',
			titleTemplate: (() => {
				const currentChapter = this.chapters.find(
					chapter => `/guide/${chapter.path}` === this.$route.path
				)
				let title = ''

				if (
					currentChapter &&
					currentChapter.name !== 'Introduction'
				) {
					title = `${currentChapter.name} · `
				}

				return title + 'User Guide · MTG Deck Builder'
			})()
		}
	},
	methods: {
		setTargetedSection (target) {
			this.$nextTick(() => {
				const sections = this.$refs.guideContents.querySelectorAll('section')

				for (const section of sections) {
					if ('#' + section.id === target) {
						section.scrollIntoView()

						section.classList.add('target')
					} else {
						section.classList.remove('target')
					}
				}
			})
		},
		scrollToTopOfGuideContents () {
			this.$refs.guideContents.scrollIntoView()
		},
		getAdjacentChapters () {
			const index = this.chapters.findIndex(
				chapter => '/guide/' + chapter.path === this.$route.path
			)
			const prev = this.chapters[index - 1]
			const next = this.chapters[index + 1]

			return { prev, next }
		},
		mobileView () {
			return window.innerWidth <= 960 // This number must match the width of the page layout when it has the table of contents section moved from the left side to the bottom.
		},
		heardTOCLinkClick () {
			const toc = document.querySelector('.table-of-contents')

			if (!toc) return

			const rect = toc.getBoundingClientRect()

			if (
				this.mobileView() &&
				(
					rect.top >= 0 ||
					rect.bottom <= document.documentElement.clientHeight
				)
			) {
				toc.scrollIntoView({
					behavior: rect.top < 1024 ? 'smooth' : 'instant'
				})
			} else {
				if (this.tocIsFlashing) return

				this.tocIsFlashing = true
				toc.classList.add('target')

				setTimeout(() => {
					toc.classList.remove('target')
					this.tocIsFlashing = false

					toc.querySelector('a').focus() // The link focus should be delayed or else the page-scroll effect won't consistently happen.
				}, 1000) // Timeout duration should be equal to the CSS animation duration of the flashing effect.
			}
		}
	}
}
</script>

<style lang="scss">
	@use '@/sass/page-user-guide.scss';
</style>
