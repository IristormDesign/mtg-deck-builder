<template>
	<section class="deck-actions">
		<dropdown-menu
			:isShowingDropdown="menuIsOpen"
			togglerRef="deckActionsToggler"
			@hideDropdown="menuIsOpen = false"
		>
			<button
				slot="menuToggler"
				class="dropdown-menu-toggler"
				ref="deckActionsToggler"
				@click="menuIsOpen = !menuIsOpen"
				type="button"
			>
				Deck Actions
				<svg
					class="dropdown-arrow"
					xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M480-373.85 303.85-550h352.3L480-373.85Z"
				/></svg>
			</button>
			<ul
				slot="menuList"
				v-show="menuIsOpen"
				role="menu"
			>
				<li role="menuitem">
					<button @click="promptToRename()" type="button">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M200-200h50.46l409.46-409.46-50.46-50.46L200-250.46V-200Zm-60 60v-135.38l527.62-527.39q9.07-8.24 20.03-12.73 10.97-4.5 23-4.5t23.3 4.27q11.28 4.27 19.97 13.58l48.85 49.46q9.31 8.69 13.27 20 3.96 11.31 3.96 22.62 0 12.07-4.12 23.03-4.12 10.97-13.11 20.04L275.38-140H140Zm620.38-570.15-50.23-50.23 50.23 50.23Zm-126.13 75.9-24.79-25.67 50.46 50.46-25.67-24.79Z"/></svg>
						Rename
					</button>
				</li>
				<li role="menuitem">
					<button @click="promptToDuplicate()" type="button">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M747.69-220H332.31Q302-220 281-241q-21-21-21-51.31v-535.38Q260-858 281-879q21-21 51.31-21H610l210 210v397.69Q820-262 799-241q-21 21-51.31 21ZM580-660v-180H332.31q-4.62 0-8.46 3.85-3.85 3.84-3.85 8.46v535.38q0 4.62 3.85 8.46 3.84 3.85 8.46 3.85h415.38q4.62 0 8.46-3.85 3.85-3.84 3.85-8.46V-660H580ZM172.31-60Q142-60 121-81q-21-21-21-51.31V-660h60v527.69q0 4.62 3.85 8.46 3.84 3.85 8.46 3.85H580v60H172.31ZM320-840v180-180V-280v-560Z"/></svg>
						Duplicate
					</button>
				</li>
				<li role="menuitem">
					<button @click="goToArchivePage()" type="button">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="m480-256.16 146.15-146.15L584-444.46l-74 74v-178h-60v178l-74-74-42.15 42.15L480-256.16ZM200-643.85v431.54q0 5.39 3.46 8.85t8.85 3.46h535.38q5.39 0 8.85-3.46t3.46-8.85v-431.54H200ZM215.39-140q-29.93 0-52.66-22.73Q140-185.46 140-215.39v-464.38q0-12.84 4.12-24.5 4.11-11.65 12.34-21.5l56.16-67.92q9.84-12.85 24.61-19.58Q252-820 268.46-820h422.31q16.46 0 31.42 6.73T747-793.69L803.54-725q8.23 9.85 12.34 21.69 4.12 11.85 4.12 24.7v463.22q0 29.93-22.73 52.66Q774.54-140 744.61-140H215.39Zm.23-563.84H744l-43.62-51.93q-1.92-1.92-4.42-3.08-2.5-1.15-5.19-1.15H268.85q-2.69 0-5.2 1.15-2.5 1.16-4.42 3.08l-43.61 51.93ZM480-421.92Z"/></svg>
						Archive
					</button>
				</li>
				<li role="menuitem">
					<button @click="goToDeletePage()" type="button">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M292.31-140q-29.92 0-51.12-21.19Q220-182.39 220-212.31V-720h-40v-60h180v-35.38h240V-780h180v60h-40v507.69Q740-182 719-161q-21 21-51.31 21H292.31ZM680-720H280v507.69q0 5.39 3.46 8.85t8.85 3.46h375.38q4.62 0 8.46-3.85 3.85-3.84 3.85-8.46V-720ZM376.16-280h59.99v-360h-59.99v360Zm147.69 0h59.99v-360h-59.99v360ZM280-720v520-520Z"/></svg>
						Delete
					</button>
				</li>
			</ul>
		</dropdown-menu>
		<dialogs-rename-deck :deck="deck" />
		<dialogs-duplicate-deck :deck="deck" />
	</section>
</template>

<script>
import DropdownMenu from '@/components/DropdownMenu.vue'
import DialogsRenameDeck from '@/components/deck-page/DialogsRenameDeck.vue'
import DialogsDuplicateDeck from '@/components/deck-page/DialogsDuplicateDeck.vue'

export default {
	components: { DropdownMenu, DialogsRenameDeck, DialogsDuplicateDeck },
	props: {
		deck: Object
	},
	data () {
		return {
			menuIsOpen: false
		}
	},
	methods: {
		promptToRename () {
			this.$store.commit('idOfShowingDialog', {
				id: 'renameDeck',
				data: this.deck.name
			})
		},
		promptToDuplicate () {
			this.$store.commit('idOfShowingDialog', 'duplicateDeck')
		},
		goToArchivePage () {
			this.$router.push({
				name: 'archiveDecks',
				params: { presetDeckName: this.deck.name }
			})
		},
		goToDeletePage () {
			this.$router.push({
				name: 'deleteDecks',
				params: { presetDeckName: this.deck.name }
			})
		}
	}
}
</script>
