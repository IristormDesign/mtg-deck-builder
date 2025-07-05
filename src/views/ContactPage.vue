<template>
	<article class="contact-page content-box">
		<h2>Contact</h2>

		<figure class="card-illustration">
			<img
				src="@/img/tidings.jpg"
				srcset="@/img/tidings.jpg 1x, @/img/tidings@2x.jpg 2x"
				width="469" height="343"
				alt="An illustration of a man's hand pressing a wax seal onto a scroll by candlelight"
			/>
			<figcaption>Illustration from <a href="https://scryfall.com/card/c18/108/tidings" target="_blank">Tidings<svg><use href="#open-in-new-icon" /></svg></a> by Pete Venters</figcaption>
		</figure>

		<p>The creator of MTG Deck Builder is Damian Schmidt of <a href="https://iristormdesign.com/" target="_blank">Iristorm Design<svg><use href="#open-in-new-icon" /></svg></a>.</p>
		<p>You may reach him for questions, bug reports, praise, or insults by sending an email to <a href="mailto:damian@iristormdesign.com"><strong>damian@iristormdesign.com</strong><svg><use href="#open-in-new-icon" /></svg></a>.</p>
		<p>Or, send a post or direct message on X (Twitter) to <a href="https://x.com/IristormDesign" target="_blank"><strong>@IristormDesign</strong><svg><use href="#open-in-new-icon" /></svg></a>.</p>
	</article>
</template>

<script>
export default {
	metaInfo: {
		title: 'Contact'
	}
}
</script>

<style lang="scss">
	@use '@/sass/page-contact.scss';
</style>
