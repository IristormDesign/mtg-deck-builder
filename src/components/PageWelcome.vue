<template>
	<article class="welcome">
		<img class="illustration" src="/img/welcome.jpg" width="1920" height="1080" alt="Fantasy illustration" @click="attentionOpenDeckButton" />

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
			}, 500)
		}
	}
}
</script>
