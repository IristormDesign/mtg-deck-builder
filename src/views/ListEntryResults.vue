<template>
	<article class="list-entry-results content-box">
		<h3>Results of Card List Entry</h3>

		<section v-if="cardsSuccessfullyAdded?.main.length + cardsSuccessfullyAdded?.sideboard.length > 0">
			<h4>✅ New Cards</h4>
			<p>The following cards (<strong>{{ cardsSuccessfullyAdded.main.length + cardsSuccessfullyAdded.sideboard.length }}</strong> total distinct name<template v-if="cardsSuccessfullyAdded.main.length + cardsSuccessfullyAdded.sideboard.length > 1">s</template>) have been added to <i>{{ deck.name }}</i>.</p>

			<ler-card-lists :cardEntryCategory="cardsSuccessfullyAdded" />
		</section>

		<section v-if="cardsToUpdate?.main.length + cardsToUpdate?.sideboard.length > 0">
			<h4>✅ Existing Cards, Updated Quantities</h4>
			<p>The following card names (<strong>{{ cardsToUpdate.main.length + cardsToUpdate.sideboard.length }}</strong> total distinct name<template v-if="cardsToUpdate.main.length + cardsToUpdate.sideboard.length > 1">s</template>) already exist in their respective card groups of <i>{{ deck.name }}</i>. These names’ former quantity numbers have been replaced with the new quantity numbers you’ve set.</p>

			<ler-card-lists :cardEntryCategory="cardsToUpdate" />

			<p v-if="this.anyCardRemoved">The card names set to a quantity of zero have been removed from your deck.</p>
		</section>

		<section v-if="cardsToAddZeroQty.main?.length + cardsToAddZeroQty.sideboard?.length > 0">
			<h4>❌ New Zero-Quantity Cards</h4>
			<p>The following card names have <em>not</em> been added to <i>{{ deck.name }}</i> because they’re new names set to a quantity of zero in their respective card groups. 🤔</p>

			<ler-card-lists :cardEntryCategory="cardsToAddZeroQty" />
		</section>

		<section v-if="cardRequestInvalid?.length > 0">
			<h4>❌ Invalid Cards</h4>
			<p>The following card names you’ve submitted aren’t recognized to exist in <i>Magic: The Gathering</i>.</p>
			<ul>
				<li
					v-for="(card, index) of cardRequestInvalid"
					:key="index"
				>{{ displayFullName(card) }} (&times;{{ card.qty }})</li>
			</ul>
			<p>If you’re sure these card names exist, carefully check your entries for spelling mistakes, missing words, or excess words. (Letter case doesn’t matter, though.) If you find mistakes in them, you can submit the names again with the corrections.</p>
		</section>

		<section v-if="cardRequestsAborted?.length > 0">
			<h4>❌ Data Retrieval Failure</h4>
			<p>The following card names couldn’t be added to <i>{{ deck.name }}</i> because, unfortunately, the data for them couldn’t be retrieved from the Scryfall web servers right now.</p>
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
			<p>This error typically happens when Scryfall’s web servers are offline at the moment, or if your computer or phone is having an internet connection problem. Try adding these card names again at a later time.</p>
		</section>

		<section v-if="cardRequestOtherError?.length > 0">
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

		<section v-if="repeatedCardNames?.main.length + repeatedCardNames?.sideboard.length > 0">
			<h4>❌ Repeated Card Names</h4>
			<p>You’ve entered the following card names multiple times for the same card group. Each name repeated after its first instance within its group has been ignored.</p>

			<ler-card-lists :cardEntryCategory="repeatedCardNames" />
		</section>

		<div class="ok button-container">
			<router-link
				:to="{ name: 'listEditor'}"
			>OK</router-link>
		</div>
	</article>
</template>

<script>
import LerCardLists from '@/components/deck-page/ListEntryResultsCardLists.vue'
import getActiveDeck from '@/mixins/getActiveDeck.js'

export default {
	components: { LerCardLists },
	mixins: [getActiveDeck],
	props: {
		anyCardRemoved: Boolean,
		cardRequestsAborted: Array,
		cardRequestInvalid: Array,
		cardRequestOtherError: Array,
		cardsSuccessfullyAdded: Object,
		cardsToAddZeroQty: Object,
		cardsToUpdate: Object,
		repeatedCardNames: Object
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
				!this.repeatedCardNames
			) {
				this.$router.replace('list-entry')
			}
		},
		displayFullName (card) {
			return card.name + (card.name2 ? ` // ${card.name2}` : '')
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
