<template>
	<nav>
		<ul class="tabs">
			<li v-for="(deck, i) in decks" :key="i">
				<template v-if="activeTab != deck.name">
					<a @click="selectTab(deck)" :href="tabHref(deck)">
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
	</nav>
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
	},
	props: {
		activeTab: String,
		decks: Array
	}
}
</script>
