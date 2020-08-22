<template>
	<div>
		<ul class="tabs">
			<li
				v-for="tab in tabs"
				v-bind:class="{ 'is-active': tab.isActive }"
				v-bind:key="tab.name"
			>
				<a
					v-bind:href="tab.href"
					v-on:click="selectTab(tab)"
				>
					{{ tab.name || '?' }}
				</a>
			</li>
			<li>
				<a
					href="#"
					title="Create a new deck list"
					v-on:click="$emit('create-deck')"
				>+</a>
			</li>
		</ul>

		<slot><!-- Tab contents inserted here --></slot>
	</div>
</template>

<script>
export default {
	name: 'tabs',

	data () {
		return {
			tabs: []
		}
	},
	created () {
		this.tabs = this.$children
	},
	methods: {
		selectTab (selectedTab) {
			this.tabs.forEach(tab => {
				tab.isActive = (tab.href === selectedTab.href)
			})
			this.$emit('tab-active')
		}
	}
}
</script>
