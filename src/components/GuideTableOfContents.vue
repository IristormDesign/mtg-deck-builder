<template>
	<nav class="table-of-contents" aria-label="Table of Contents">
		<svg class="svg-symbols" xmlns="http://www.w3.org/2000/svg">
			<symbol id="expand-down-icon" viewBox="0 -960 960 960">
				<path d="m480-340 180-180-57-56-123 123-123-123-57 56 180 180Zm0 260q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/>
			</symbol>
			<symbol id="expand-up-icon" viewBox="0 -960 960 960">
				<path d="m357-384 123-123 123 123 57-56-180-180-180 180 57 56ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/>
			</symbol>
		</svg>
		<div class="scrollable-region">
			<h3>Table of Contents</h3>
			<div class="toc-links">
				<ol>
					<li v-for="chapter in chapters" :key="chapter.path">
						<router-link
							:to="'/guide/' + chapter.path"
							@click.native="handleChapterLinkClick()"
						>
							{{ chapter.name }}
						</router-link>
						<template v-if="chapter.subchapters">
							<button
								v-if="$route.path !== '/guide/' + chapter.path"
								@click="manuallyToggleSubchapterList(chapter.path)"
								class="toggle-subchapters-button"
								type="button"
								title="Show/hide subchapter list"
							>
								<svg v-if="chapterManuallyOpened === chapter.path">
									<use href="#expand-up-icon" />
								</svg>
								<svg v-else>
									<use href="#expand-down-icon" />
								</svg>
							</button>
							<div
								v-else
								class="toggle-subchapters-button disabled"
							>
								<svg><use href="#expand-up-icon" /></svg>
							</div>
						</template>
						<ol v-if="(
							chapter.subchapters && $route.path === '/guide/' + chapter.path ||
							chapterManuallyOpened === chapter.path
						)">
							<li
								v-for="subchapter in chapter.subchapters"
								:key="subchapter.hash"
							>
								<router-link
									:to="'/guide/' + chapter.path + subchapter.hash"
									@click.native="$emit('clickedSubchapterLink', subchapter.hash)"
								>
									{{ subchapter.name }}
								</router-link>

								<ol v-if="subchapter.subchapters">
									<li
										v-for="subSubchapter in subchapter.subchapters"
										:key="subSubchapter.hash"
									>
										<router-link
											:to="'/guide/' + chapter.path + subSubchapter.hash"
											@click.native="$emit('clickedSubchapterLink', subSubchapter.hash)"
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
</template>

<script>
export default {
	props: {
		chapters: Array
	},
	data () {
		return {
			chapterManuallyOpened: ''
		}
	},
	watch: {
		$route () {
			this.chapterManuallyOpened = ''
		}
	},
	mounted () {
		if (window.innerWidth > 960) { // The exact window width is equal to the pixel breakpoint when the table of contents section no longer stays on the side of the page when scrolling down.
			this.highlightTOCLinkOfVisibleSection()

			window.addEventListener(
				'scroll', this.highlightPrimaryTOCLinkWhenAtPrimaryChapter
			)
		}
	},
	updated () {
		this.highlightTOCLinkOfVisibleSection()
	},
	destroyed () {
		window.removeEventListener(
			'scroll', this.highlightPrimaryTOCLinkWhenAtPrimaryChapter
		)
	},
	methods: {
		handleChapterLinkClick () {
			this.$emit('clickedChapterLink')

			this.$nextTick(() => {
				this.forceHighlightTOCLink()
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
				for (const link of tocLinks) {
					const regexPrimaryChapter = new RegExp(`/guide/${observedSection.target.id}$`, 'i')
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
				}
			}

			const sections = document.querySelectorAll('section')

			sections.forEach(section => {
				observer.observe(section)
			})
		},
		highlightPrimaryTOCLinkWhenAtPrimaryChapter () {
			let lastElInTopChapterSection = document.querySelectorAll(
				'.guide-contents > section > :not(section)'
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
		manuallyToggleSubchapterList (chapter) {
			if (this.chapterManuallyOpened === chapter) {
				this.chapterManuallyOpened = ''
			} else {
				this.chapterManuallyOpened = chapter
			}
		}
	}
}
</script>
