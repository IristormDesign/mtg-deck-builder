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
					v-on:click="selectTabMethod(tab)"
				>
					{{ tab.name || '—' }}
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
		<div v-if="noActiveTabs" class="no-active-tabs">
			<header>
				<h2>Welcome</h2>
			</header>
			<p>To view a deck list, click on a tab above.</p>
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
		this.noActiveTabsMethod()
	},
	methods: {
		selectTabMethod (selectedTab) {
			this.tabs.forEach(tab => {
				tab.isActive = (tab.href === selectedTab.href)
			})

			this.noActiveTabsMethod()
		},
		noActiveTabsMethod () {
			for (let i = 0; i < this.tabs.length; i++) {
				if (this.tabs[i].isActive === true) {
					this.noActiveTabs = false
					return
				}
			}
			this.noActiveTabs = true
		}
	}
}
</script>

<style scoped lang="scss">
@import '../sass/variables';

.tabs {
	list-style: none;
	padding: 0;
	border-bottom: 4px solid tan;

	li {
		display: inline-block;
		margin: 0 .5em;

		&.is-active {
			a {
				background: tan;
				color: #000;
				text-decoration: none;
			}
		}
		a {
			@include heading-font;
			background: #000;
			padding: .75em;
			border-radius: .75em .75em 0 0;
			display: block;
			line-height: 1;
		}
	}
}
.no-active-tabs {
	width: 66.67%;

	p {
		margin: 3em 3em 1.5em;
	}
}
</style>
