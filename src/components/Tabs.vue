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

		<div v-if="noActiveTabs" class="welcome">
			<header>
				<h2>Welcome</h2>
			</header>
			<p>This is an app for building and managing deck lists for the collectible card game <i>Magic: The Gathering</i>.</p>
			<p>To view an existing deck list, click on a tab above. To create a new deck list, click the “+” tab.</p>
		</div>

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
	computed: {
		noActiveTabs () {
			for (let i = 0; i < this.tabs.length; i++) {
				if (this.tabs[i].isActive === true) {
					return false
				}
			}
			return true
		}
	},
	methods: {
		selectTab (selectedTab) {
			this.tabs.forEach(tab => {
				tab.isActive = (tab.href === selectedTab.href)
			})
		}
	}
}
</script>
