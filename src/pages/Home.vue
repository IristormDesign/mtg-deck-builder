<template>
	<article class="home-page">
		<img
			srcset="
				@/img/welcome-2560.jpg 2560w,
				@/img/welcome-1920.jpg 1920w,
				@/img/welcome-1440.jpg 1440w,
				@/img/welcome-1080.jpg 1080w"
			src="@/img/welcome-1920.jpg"
			width="1920" height="1080" alt="Fantasy illustration"
			@click="$store.getters.attentionHeaderButton"
		/>
		<div class="wrap">
			<div class="text-box">
				<header>
					<h2>Greetings, planeswalker.</h2>
				</header>
				<p>This app lets you <strong>build and organize your decks</strong> for <i>Magic: The Gathering</i>.</p>
				<p>Click the <strong>Open Deck</strong> button above to <strong>view a pre-made deck</strong>. Or, click the <strong>Create Deck</strong> button above to <strong>start a new one</strong>!</p>
				<p>For <strong>help</strong>, click the <strong>Manual</strong> button above.</p>
			</div>
		</div>
	</article>
</template>
