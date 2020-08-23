<template>
	<div>
		<ul class="tabs">
			<li
				v-for="tab in tabs" :key="tab.name"
				:class="{ 'is-active': tab.isActive }"
			>
				<a :href="tab.href" @click="selectTab(tab)">
					{{ tab.name || '?' }}
				</a>
			</li>
			<li>
				<a
					href="#" title="Create a new deck list"
					@click="$emit('create-deck')"
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
