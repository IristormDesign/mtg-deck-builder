<template functional>
	<article class="donate-page content-box">
		<h2>Donation Request</h2>

		<figure class="card-illustration">
			<img
				src="@/img/beloved-beggar.jpg"
				srcset="@/img/beloved-beggar.jpg 1x, @/img/beloved-beggar@2x.jpg 2x"
				width="469" height="345"
				alt="An illustration of an old homeless man happily receiving coins from a passerby"
			/>
			<figcaption>Illustration from <a href="https://scryfall.com/card/mid/3/beloved-beggar-generous-soul" target="_blank">Beloved Beggar<svg><use href="#open-in-new-icon" /></svg></a> by Francisco Miyara</figcaption>
		</figure>

		<p>My name is Damian Schmidt, and I’m the sole designer and developer of MTG Deck Builder by Iristorm Design.</p>
		<p>This app has taken me a lot of turns and mana—ahem, time and effort—to create. As an independent fan project, it’s never been funded by Wizards of the Coast or any other company.</p>
		<p>I also have a long, ever-expanding to-do list of things in MTG Deck Builder I could add or improve for future updates. So, I could be busy tinkering on this app for more years to come if I’ll still have the motivation for it.</p>
		<p>Despite all that, I’ve made MTG Deck Builder available to everyone for free, and without displaying advertisements. That means this app earns me zero income—except, possibly, for some users’ generosity to me.</p>
		<p>So, if you’ve been using MTG Deck Builder and you respect my work in creating it, would you consider a donation? I’d gladly appreciate even a small amount, though you’re not obligated to give anything. (Maybe you’re not drawing enough lands yourself. I get it.)</p>
		<p>If you’re willing to donate, click the button below, which takes you to a donation page on PayPal. (That page should say the donation goes to Damian Schmidt, me.) Thanks for your support!</p>
		<p class="button-container donate-button">
			<a
				href="https://www.paypal.com/donate/?hosted_button_id=PFHT9UD5KEC72"
				target="_blank"
			>
				<img class="paypal-logo" src="@/img/paypal-logo.svg" width="150" height="150" alt="PayPal logo" />
				<span>Donate on PayPal</span>
			</a>
		</p>
		<p>You can also <router-link to="/contact">contact me</router-link> to send a suggestion or another message.</p>
	</article>
</template>

<style lang="scss">
	@use '@/sass/page-donate.scss';
</style>
