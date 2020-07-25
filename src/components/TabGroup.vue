<template>
	<div>
		<ul class="tabs">
			<li
				v-for="tab in tabs"
				v-bind:class="{ 'is-active': tab.isActive }"
				v-bind:key="tab.name"
			>
				<a v-bind:href="tab.href" v-on:click="selectTab(tab)">
					{{ tab.name }}
				</a>
			</li>
		</ul>
		<div class="tabs-details">
			<slot></slot>
		</div>
	</div>
</template>

<script>
export default {
	name: 'tab-group',

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
		}
	}
}
</script>

<style scoped lang="scss">
@import '../sass/variables';

.tabs {
	list-style: none;
	padding: 0;
	border-bottom: 4px solid #999;

	li {
		display: inline-block;
		margin: 0 .5em;

		&.is-active {
			a {
				background: #999;
				color: #000;
				text-decoration: none;
			}
		}
		a {
			background: #000;
			padding: .75em;
			border-radius: .75em .75em 0 0;
			display: block;
			line-height: 1;
			font-family: $font-family-heading;
		}
	}
}
</style>
