<template>
	<nav class="table-of-contents" aria-label="Table of Contents">
		<svg class="svg-symbols" xmlns="http://www.w3.org/2000/svg">
			<symbol id="expand-down-icon" viewBox="0 -960 960 960">
				<path d="M480-336.23 663.77-520 603-579.77l-123 123-123-123L296.23-520 480-336.23ZM480.07-68q-85.48 0-160.69-32.44t-130.84-88.05q-55.63-55.61-88.09-130.79Q68-394.46 68-479.93q0-85.74 32.5-161.17 32.5-75.43 88.21-131.23 55.71-55.8 130.79-87.74Q394.57-892 479.93-892q85.73 0 161.15 31.92 75.43 31.92 131.24 87.71 55.81 55.79 87.75 131.21Q892-565.74 892-479.98q0 85.75-31.92 160.62t-87.7 130.6q-55.78 55.73-131.18 88.25Q565.8-68 480.07-68Z"/>
			</symbol>
			<symbol id="expand-up-icon" viewBox="0 -960 960 960">
				<path d="m357-380.23 123-123 123 123L663.77-440 480-623.77 296.23-440 357-380.23ZM480.07-68q-85.48 0-160.69-32.44t-130.84-88.05q-55.63-55.61-88.09-130.79Q68-394.46 68-479.93q0-85.74 32.5-161.17 32.5-75.43 88.21-131.23 55.71-55.8 130.79-87.74Q394.57-892 479.93-892q85.73 0 161.15 31.92 75.43 31.92 131.24 87.71 55.81 55.79 87.75 131.21Q892-565.74 892-479.98q0 85.75-31.92 160.62t-87.7 130.6q-55.78 55.73-131.18 88.25Q565.8-68 480.07-68Zm-.07-86q136.51 0 231.26-94.74Q806-343.49 806-480t-94.74-231.26Q616.51-806 480-806t-231.26 94.74Q154-616.51 154-480t94.74 231.26Q343.49-154 480-154Zm0-326Z"/>
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
						<transition appear name="toc-subchapters-transition">
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
						</transition>
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
