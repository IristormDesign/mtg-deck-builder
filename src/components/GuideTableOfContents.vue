<template>
	<nav class="table-of-contents" aria-label="Table of Contents">
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

						<ol v-if="chapter.subchapters && $route.path === '/guide/' + chapter.path">
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
				tocLinks.forEach(link => {
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
				})
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
		}
	}
}
</script>
