<template>
	<article class="deck-action-page content-box">
		<h2>Delete Decks</h2>
		<div class="intro">
			<figure>
				<img class="card-illustration" src="~@/img/planar-cleansing.jpg" width="626" height="457" alt="An illustration of a crowd of people getting sucked upward into a glowing, stormy sky" />
				<figcaption>Illustration from <a href="https://scryfall.com/card/m20/33/planar-cleansing" target="_blank"><i>Planar Cleansing</i></a> by Michael Komarck</figcaption>
			</figure>
			<p v-if="numExisting > 0 && !hasBeenDeleted">In the checklist, select the decks you want to erase. Warning: Deleted decks can’t be restored.</p>
		</div>
		<template v-if="!hasBeenDeleted">
			<form v-if="numExisting > 0">
				<div
					class="multi-select-buttons"
					v-show="numExisting >= 3"
				>
					<div class="button-container">
						<button
							@click="selectAll()"
							:disabled="numChecked === numExisting"
							type="button"
						>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M268-253.85 55.85-466l42.77-42.15 170 170L282.46-352l42.16 42.15-56.62 56Zm226 0L281.85-466 324-508.77l170 170 368-368L904.15-664 494-253.85ZM480.15-466l-42.77-42.15 198-198L678.15-664l-198 198Z"/></svg>
							Select All
						</button>
					</div>
					<div class="button-container">
						<button
							@click="checkedDecks = []"
							:disabled="numChecked === 0"
							type="button"
						>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M872.62-103.39 607.85-368.16 495.38-255.69 283.23-467.85l42.15-43.38 170 170 68.31-69.08-410.92-410.92 42.15-43.38 719.85 719.84-42.15 41.38Zm-603.24-152.3L57.23-467.85 99.38-510l170 170 13.85-13.85 42.15 42.16-56 56ZM706-466.31l-42.15-42.15 198.3-198.31 43.39 40.92L706-466.31ZM592-579.54l-42.15-42.15 87.53-87.54 42.16 42.15L592-579.54Z"/></svg>
							Deselect All
						</button>
					</div>
				</div>
				<ul class="checklist" ref="checklist">
					<li v-for="deck in $store.state.decks" :key="deck.name">
						<input type="checkbox" :id="deck.name" :value="deck.name" v-model="checkedDecks">
						<label :for="deck.name">{{ deck.name }}</label>
					</li>
				</ul>
				<div class="button-container submit-button">
					<button
						@click.prevent="$store.commit('idOfShowingDialog', 'confirmDeletion')"
						:disabled="numChecked <= 0"
					>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M292.31-140q-29.92 0-51.12-21.19Q220-182.39 220-212.31V-720h-40v-60h180v-35.38h240V-780h180v60h-40v507.69Q740-182 719-161q-21 21-51.31 21H292.31ZM680-720H280v507.69q0 5.39 3.46 8.85t8.85 3.46h375.38q4.62 0 8.46-3.85 3.85-3.84 3.85-8.46V-720ZM376.16-280h59.99v-360h-59.99v360Zm147.69 0h59.99v-360h-59.99v360ZM280-720v520-520Z"/></svg>
						Delete Selected
					</button>
				</div>
			</form>
			<div v-else class="result-message">
				<p>You have no decks.<br><router-link :to="{name: 'createDeck'}" class="no-text-break">(Create one!)</router-link></p>
			</div>
		</template>
		<div
			v-else
			class="result-message"
			@click="headerLinkAttention()"
		>
			<p>
				<template v-if="numChecked === 1">
					That deck is
				</template>
				<template v-else>
					Those {{ checkedDecks.length }} decks are
				</template>
				now deleted.
			</p>
		</div>
		<standard-dialog
			dialogID="confirmDeletion"
			class="with-two-buttons"
		>
			<p>
				⚠ You’re about to permanently delete
				<template v-if="numChecked === 1">
					<i>{{ checkedDecks[0] }}</i>.
				</template>
				<template v-else-if="numChecked === 2">
					<i>{{ checkedDecks[0] }}</i> and <i>{{ checkedDecks[1] }}</i>.
				</template>
				<template v-else-if="numExisting === numChecked">
					all {{ numExisting }} of your decks.
				</template>
				<template v-else>
					the <strong>{{ numChecked }}</strong> decks you’ve selected.
				</template>
			</p>
			<form slot="form" method="dialog">
				<button @click="removeSelectedDecks()">Delete</button>
				<button class="cancel" autofocus>Cancel</button>
			</form>
		</standard-dialog>
	</article>
</template>

<script>
import StandardDialog from '@/components/StandardDialog.vue'
import headerLinkAttention from '@/mixins/headerLinkAttention.js'

export default {
	components: { StandardDialog },
	mixins: [headerLinkAttention],
	props: {
		presetDeckName: String
	},
	data () {
		return {
			checkedDecks: [],
			hasBeenDeleted: false
		}
	},
	computed: {
		numChecked () {
			return this.checkedDecks.length
		},
		numExisting () {
			return this.$store.state.decks.length
		}
	},
	mounted () {
		if (this.presetDeckName) {
			this.checkedDecks.push(this.presetDeckName)
		}
	},
	methods: {
		selectAll () {
			const checkboxes = this.$refs.checklist.querySelectorAll('input')

			this.checkedDecks = [] // First uncheck all decks in case any of them are already checked.

			checkboxes.forEach(checkbox => {
				this.checkedDecks.push(checkbox.value)
			})
		},
		removeSelectedDecks () {
			this.hasBeenDeleted = true

			let decks = this.$store.state.decks
			const checkedDeckNames = new Set(this.checkedDecks)

			decks = decks.filter(
				deck => !checkedDeckNames.has(deck.name)
			)

			this.$store.commit('decks', decks)
		}
	}
}
</script>

<style lang="scss">
	@import '@/sass/page-deck-actions.scss';
</style>
