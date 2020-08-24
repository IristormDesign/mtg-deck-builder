<template>
	<ul class="tabs">
		<li v-for="(deck, i) in decks" :key="i">
			<template v-if="activeTab != deck.name">
				<a :href="tabHref(deck)" @click="selectTab(deck)">
					{{ deck.name || '?' }}
				</a>
			</template>
			<template v-else>
				<div>
					{{ deck.name || '?' }}
				</div>
			</template>
		</li>
		<li>
			<a
				href="#" title="Create a new deck list"
				@click="$emit('create-deck')"
			>+</a>
		</li>
	</ul>
</template>

<script>
export default {
	name: 'tabs',
	methods: {
		tabHref (deck) {
			return '#' + deck.name.toLowerCase().replace(/ /g, '-')
		},
		selectTab (deck) {
			this.$emit('activated-tab', deck)
		}
	},
	props: {
		activeTab: String,
		decks: Array
	}
}
</script>
