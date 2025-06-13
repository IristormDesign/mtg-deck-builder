<template>
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
		<p>If you’re willing to donate, you can do so through your choice of either the PayPal or Stripe payment services. (The linked payment pages from the buttons below should say that your donation goes to me, Damian Schmidt.)</p>
		<p>Thanks for your support!</p>
		<div class="donate-buttons">
			<div class="button-container">
				<a
					href="https://www.paypal.com/donate/?hosted_button_id=PFHT9UD5KEC72"
					target="_blank"
				>
					<img src="@/img/paypal-logo.svg" width="150" height="150" alt="PayPal logo" />
					<span><small>Donate via</small> PayPal<svg><use href="#open-in-new-icon" /></svg></span>
				</a>
			</div>
			<div class="button-container">
				<a
					href="https://donate.stripe.com/eVq5kD56B0yW8JSet3fYY00"
					target="_blank"
				>
					<img src="@/img/stripe-logo.png" width="180" height="180" alt="Stripe logo" />
					<span><small>Donate via</small> Stripe<svg><use href="#open-in-new-icon" /></svg></span>
				</a>
			</div>
		</div>
		<p>You can also <router-link to="/contact">contact me</router-link> to send a suggestion or another message.</p>
	</article>
</template>

<script>
export default {
	metaInfo: {
		title: 'Donation Request'
	}
}
</script>

<style lang="scss">
	@use '@/sass/page-donate.scss';
</style>
