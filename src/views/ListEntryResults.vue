<template>
	<article class="list-entry-results content-box">
		<h3>Results of Card List Entry</h3>

		<section v-if="cardsSuccessfullyAdded && cardsSuccessfullyAdded.length > 0">
			<h4>✅ New Cards</h4>
			<p>The following new card names (<strong>{{ cardsSuccessfullyAdded.length }}</strong> total) have been added to the main card group of <i>{{ deck.name }}</i>.</p>
			<ul>
				<li
					v-for="(card, index) of cardsSuccessfullyAdded"
					:key="index"
				>{{ displayFullName(card) }} (&times;{{ card.qty }})</li>
			</ul>
		</section>
		<section v-else-if="cardsToUpdate && cardsToUpdate.length > 0">
			<h4>❌ New Cards</h4>
			<p>No new card names have been added to <i>{{ deck.name }}</i>.</p>
		</section>

		<section v-if="cardsToUpdate && cardsToUpdate.length > 0">
			<h4>✅ Existing Cards</h4>
			<p>The following card names (<strong>{{ cardsToUpdate.length }}</strong> total) were already in the main card group of <i>{{ deck.name }}</i>, but their quantities have been updated to the new quantities you’ve set.</p>
			<ul>
				<li
					v-for="(card, index) of cardsToUpdate"
					:key="index"
				>{{ displayFullName(card) }} (&times;{{ card.qty }})</li>
			</ul>
			<p v-if="this.anyCardRemoved">Card names set to a quantity of zero have been removed.</p>
		</section>

		<section v-if="cardsToAddZeroQty && cardsToAddZeroQty.length > 0">
			<h4>❌ New Zero-Quantity Cards</h4>
			<p>The following new card names have <em>not</em> been added to <i>{{ deck.name }}</i> because you’ve set their quantities to zero. 🤔</p>
			<ul>
				<li
					v-for="(card, index) of cardsToAddZeroQty"
					:key="index"
				>{{ displayFullName(card) }} (&times;{{ card.qty }})</li>
			</ul>
		</section>

		<section v-if="cardRequestInvalid && cardRequestInvalid.length > 0">
			<h4>❌ Invalid Cards</h4>
			<p>The following card names aren’t recognized to exist in <i>Magic: The Gathering</i>, and so they can’t be added to your deck.</p>
			<ul>
				<li
					v-for="(card, index) of cardRequestInvalid"
					:key="index"
				>{{ displayFullName(card) }} (&times;{{ card.qty }})</li>
			</ul>
			<p>If you’re sure these card names exist, check your entries for spelling mistakes, missing words, or excess words. (Letter case doesn’t matter, though.) If you find mistakes in them, you can submit the names again with the corrections.</p>
		</section>

		<section v-if="cardRequestsAborted && cardRequestsAborted.length > 0">
			<h4>❌ Data Retrieval Failure</h4>
			<p>The following card names couldn’t be added to <i>{{ deck.name }}</i> because the data for them couldn’t be retrieved from the Scryfall web servers right now.</p>
			<ul>
				<li
					v-for="(card, index) of cardRequestsAborted"
					:key="index"
				>{{ displayFullName(card) }} (&times;{{ card.qty }})</li>
			</ul>
			<div class="button-container copy-button">
				<button @click="copyFailedList('aborted')">Copy This Card List</button>
				<transition>
					<div
						class="notification"
						v-if="showMessageCopiedList"
					>→ Now copied.</div>
				</transition>
			</div>
			<p>This error can happen if Scryfall’s web servers are down at the moment, or if your computer or phone is having an internet connection problem. Try adding these card names again at a later time.</p>
		</section>

		<section v-if="cardRequestOtherError && cardRequestOtherError.length > 0">
			<h4>❌ Miscellaneous Technical Error</h4>
			<p>The following card names couldn’t be added to <i>{{ deck.name }}</i> because of an unusual technical error that involves trying to retrieve card data from Scryfall.</p>
			<ul>
				<li
					v-for="(card, index) of cardRequestOtherError"
					:key="index"
				>{{ displayFullName(card) }} (&times;{{ card.qty }})</li>
			</ul>
			<div class="button-container copy-button">
				<button @click="copyFailedList('other')">Copy This Card List</button>
				<transition>
					<div
						class="notification"
						v-if="showMessageCopiedList"
					>→ Now copied.</div>
				</transition>
			</div>
			<p>If you’ve been regularly getting this error message, consider <router-link :to="'/contact'">reporting it to the developer</router-link> of MTG Deck Builder.</p>
		</section>

		<section v-if="repeatedCardNames && repeatedCardNames.length > 0">
			<h4>❌ Repeated Cards</h4>
			<p>The following entries are card names you’ve included more than once in your submitted list, and so each repeated name after its first instance has been ignored.</p>
			<ul>
				<li
					v-for="(card, index) of repeatedCardNames"
					:key="index"
				>{{ displayFullName(card) }} (&times;{{ card.qty }})</li>
			</ul>
		</section>

		<section
			v-if="invalidEntries && invalidEntries.length > 0"
			class="invalid-list"
		>
			<h4>❌ Non-List Text</h4>
			<p>The following lines of text you’ve submitted aren’t in the valid format for card list entries, and so these lines have been ignored for adding card names.</p>
			<ul>
				<li
					v-for="(entry, index) of invalidEntries"
					:key="index"
				>{{ entry }}</li>
			</ul>
		</section>

		<div class="ok button-container">
			<router-link
				:to="{ name: 'listEditor'}"
			>OK</router-link>
		</div>
	</article>
</template>

<script>
import getActiveDeck from '@/mixins/getActiveDeck.js'

export default {
	mixins: [getActiveDeck],
	props: {
		anyCardRemoved: Boolean,
		cardRequestsAborted: Array,
		cardRequestInvalid: Array,
		cardRequestOtherError: Array,
		cardsSuccessfullyAdded: Array,
		cardsToAddZeroQty: Array,
		cardsToUpdate: Array,
		invalidEntries: Array,
		repeatedCardNames: Array
	},
	data () {
		return {
			showMessageCopiedList: false
		}
	},
	created () {
		this.noDataRedirect()
	},
	metaInfo () {
		return {
			title: this.deck.name + ' · Results of Card List Entry'
		}
	},
	methods: {
		noDataRedirect () {
			if (
				!this.cardRequestsAborted &&
				!this.cardRequestInvalid &&
				!this.cardRequestOtherError &&
				!this.cardsSuccessfullyAdded &&
				!this.cardsToAddZeroQty &&
				!this.cardsToUpdate &&
				!this.invalidEntries &&
				!this.repeatedCardNames
			) {
				this.$router.replace('list-entry')
			}
		},
		displayFullName (card) {
			return card.name + (
				card.name2 ? ` // ${card.name2}` : ''
			)
		},
		copyFailedList (failedReason) {
			let listText = ''

			function renderFailedList (list) {
				list.forEach(card => {
					listText += `${card.qty} ${card.name}\n`
				})
			}
			switch (failedReason) {
				case 'aborted':
					renderFailedList(this.cardRequestsAborted)
					break
				case 'other':
					renderFailedList(this.cardRequestOtherError)
			}

			navigator.clipboard.writeText(listText)

			this.showMessageCopiedList = true

			setTimeout(() => {
				this.showMessageCopiedList = false
			}, 1500)
		}
	}
}
</script>

<style lang="scss">
	@use '@/sass/page-list-entry.scss';
</style>
