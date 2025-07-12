<template>
	<article class="list-entry content-box">
		<h3>Card List Entry</h3>
		<header class="intro">
			<p>Add multiple cards all at once to <i>{{ deck.name }}</i> using the entry form below. <router-link to="/guide/card-list-entry">(More info&hellip;)</router-link></p>
		</header>
		<div class="columns">
			<form class="list-entry-form">
				<label for="card-list-entry">Entry Form</label>
				<textarea
					id="card-list-entry"
					v-model.trim="textCardList"
					ref="textCardList"
					rows="20"
					maxlength="5000"
					spellcheck="false"
					placeholder="Paste or type a list of cards here."
				></textarea>
				<div class="button-container">
					<button @click.prevent="submitForm">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M650-131v-120H530v-60h120v-120h60v120h120v60H710v120h-60ZM130-250v-60h60v60h-60Zm140 0v-60h181.85q-1.85 15.8-1.35 30.09t2.35 29.91H270ZM130-410v-60h60v60h-60Zm140 0v-60h279.08q-17.23 12.15-31.5 27.15-14.27 15-25.96 32.85H270ZM130-570v-60h60v60h-60Zm140 0v-60h480v60H270ZM130-730v-60h60v60h-60Zm140 0v-60h480v60H270Z"/></svg>
						Add Cards
					</button>
				</div>
			</form>
			<section class="rules">
				<h4>Rules for List Formatting</h4>
				<p>Have only one card name per line of the list.</p>
				<p>Begin each line with a number for the card’s quantity, and follow with the card’s name. Spelling matters, but letter case doesn’t.</p>
				<p>By default, all cards you enter will be added to your deck’s main group. You can direct some cards to the sideboard group instead: Below the main group’s card list, enter a blank line, and then below that, enter a second card list for the sideboard.</p>
				<p>If you enter other lines of text that don’t match these formatting patterns, they’ll be ignored.</p>
				<p>Example:</p>
				<p><code>
					MAIN<br>
					4 Shock<br>
					1 Balefire Dragon<br>
					15 Mountain<br>
					<br>
					SIDEBOARD<br>
					2 Vandalblast<br>
					1 Blood Moon
				</code></p>
				<p>(The lines with the headings “MAIN” and “SIDEBOARD” have no effect on the process. It’s the blank line between the lists that will actually distinguish the two card groups.)</p>
			</section>
		</div>

		<standard-dialog dialogID="loadingCards">
			<div slot="form">
				<p>Loading your cards now. Please wait.</p>
				<p class="loading-percentage">
					<span v-if="loadingPercent >= 0">{{ loadingPercent }}%</span>
				</p>
			</div>
		</standard-dialog>
		<standard-dialog dialogID="excessiveQuantity">
			<h4>Error: Excessive Quantity</h4>
			<p>Your submitted form has been rejected because it includes a card name with an overly huge quantity (“{{ dd.qty }} {{ dd.name }}”).</p>
			<p>The quantity of each name must be no longer than two digits.</p>
		</standard-dialog>
		<standard-dialog dialogID="tooManyCardNames">
			<p><strong>Error</strong>: Your submitted form has too many card names. Please have no more than 200 total names among both the main and sideboard card groups.</p>
		</standard-dialog>
		<standard-dialog dialogID="extraCardGroups">
			<h4>Error: Unclear Designation of Card Groups</h4>
			<p>Your submitted form has been rejected because it has multiple blank lines between card entries. This confuses MTG Deck Builder about which of your deck’s two card groups (either main or sideboard) you intend to add the cards to.</p>
			<p>In the entry form, a blank line signifies the end of the main group’s card list and the beginning of the sideboard group’s. A card list can’t have any blank lines inserted within itself, or else it won’t be recognized as a single whole list.</p>
			<p>To fix this error, revise your submission to have only one or zero blank lines throughout.</p>
		</standard-dialog>
		<standard-dialog dialogID="invalidListFormat">
			<p><strong>Error</strong>: The text you’ve entered isn’t in the valid format for a card list.</p>
		</standard-dialog>
		<standard-dialog
			dialogID="leavingPageWarning"
			class="with-two-buttons"
		>
			<p>⚠ If you leave this page now, the cards you’ve entered in the entry form will be lost.</p>
			<form slot="form">
				<div class="button-container">
					<button @click="leaveWarningUserResponse = true">Leave</button>
				</div>
				<div class="button-container">
					<button
						@click="leaveWarningUserResponse = false"
						class="cancel"
						autofocus
					>Cancel</button>
				</div>
			</form>
		</standard-dialog>
	</article>
</template>

<script>
import StandardDialog from '@/components/StandardDialog.vue'
import autosize from 'autosize'
import listEntryProcessing from '@/mixins/listEntryProcessing.js'

export default {
	components: { StandardDialog },
	mixins: [listEntryProcessing],
	data () {
		return {
			isLoadingCards: false,
			numberOfNewCardsRequested: 0,
			textCardList: '',
			leaveWarningUserResponse: false
		}
	},
	computed: {
		loadingPercent () {
			return Math.floor(
				this.numberOfNewCardsRequested / this.totalCardsToAdd * 100
			)
		},
		dd () {
			return this.$store.state.dialogData
		},
		totalCardsToAdd () {
			return this.cardsToAdd.main.length + this.cardsToAdd.sideboard.length
		}
	},
	watch: {
		isLoadingCards (isLoading) {
			if (isLoading) {
				this.$store.commit('idOfShowingDialog', 'loadingCards')
			}
		}
	},
	mounted () {
		autosize(this.$refs.textCardList)
	},
	beforeRouteLeave (to, from, next) {
		if (
			this.submittedCards.main.length > 0 ||
			this.repeatedCardNames.main.length > 0 ||
			this.textCardList.length < 10
		) {
			next()
		} else {
			this.$store.commit('idOfShowingDialog', {
				id: 'leavingPageWarning',
				data: {
					callback: () => {
						if (this.leaveWarningUserResponse) {
							next()
						} else {
							next(false)
						}
					}
				}
			})
		}
	},
	metaInfo () {
		return {
			title: this.deck.name + ' · Card List Entry'
		}
	},
	methods: {
		focusOnTextarea () {
			this.$refs.textCardList.focus()
		},
		goToResultsPage () {
			this.$router.replace({
				name: 'listEntryResults',
				params: {
					anyCardRemoved: this.anyCardRemoved,
					cardRequestsAborted: this.cardRequestsAborted,
					cardRequestInvalid: this.cardRequestInvalid,
					cardRequestOtherError: this.cardRequestOtherError,
					cardsSuccessfullyAdded: this.cardsSuccessfullyAdded,
					cardsToAddZeroQty: this.cardsToAddZeroQty,
					cardsToUpdate: this.cardsToUpdate,
					repeatedCardNames: this.repeatedCardNames
				}
			})
		}
	}
}
</script>

<style lang="scss">
	@use '@/sass/page-list-entry.scss';
</style>
