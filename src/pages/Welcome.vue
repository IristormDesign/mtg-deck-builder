<template>
	<article class="welcome">
		<img @click="attentionOpenDeckButton"
			srcset="
				@/img/welcome-2560.jpg 2560w,
				@/img/welcome-1920.jpg 1920w,
				@/img/welcome-1440.jpg 1440w,
				@/img/welcome-1080.jpg 1080w"
			src="@/img/welcome-1920.jpg"
			width="1920" height="1080" alt="Fantasy illustration"
		/>
		<div class="wrap">
			<div class="text-box">
				<header>
					<h2>Greetings, planeswalker.</h2>
				</header>
				<p>In this app, you can create and manage your decks for the collectible strategy card game <a href="https://magic.wizards.com" target="_blank" rel="noopener noreferrer"><i>Magic: The Gathering</i></a>.</p>
				<p>To view a pre-made deck, click on the Open Deck button above. To start a new deck, click on the Create Deck button above.</p>
			</div>
		</div>
	</article>
</template>

<script>
export default {
	name: 'page-welcome',
	methods: {
		attentionOpenDeckButton () {
			const openDeckButton = document.querySelector('button.deck-selector')

			openDeckButton.classList.add('attention')

			setTimeout(() => {
				openDeckButton.classList.remove('attention')
			}, 1000)
		}
	}
}
</script>
