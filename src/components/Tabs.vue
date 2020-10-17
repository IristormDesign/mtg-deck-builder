<template>
	<ul class="tabs">
		<li v-for="(deck, i) in $store.state.decks" :key="i">
			<div v-if="$store.state.activeTab == deck.name">
				{{ deck.name || '?' }}
			</div>
			<a v-else
				@click="selectTab(deck)" :href="tabHref(deck)"
			>
				{{ deck.name || '?' }}
			</a>
		</li>
		<li class="add-new-deck">
			<a
				href="#" title="Create a new deck list"
				@click="$emit('create-deck')"
			><span>+</span></a>
		</li>
	</ul>
</template>

<script>
export default {
	name: 'tabs',
	methods: {
		selectTab (deck) {
			this.$emit('activated-tab', deck)
		},
		tabHref (deck) {
			return '#' + deck.name.toLowerCase().replace(/ /g, '-')
		}
	}
}
</script>
