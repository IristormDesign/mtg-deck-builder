<template>
	<div v-show="isActive" class="tab-contents">
		<slot><!-- Tab contents inserted from App.vue --></slot>
	</div>
</template>

<script>
export default {
	name: 'tab-contents',
	props: {
		name: {
			required: true
		},
		selected: {
			default: false
		}
	},
	data () {
		return {
			isActive: false
		}
	},
	computed: {
		href () {
			return '#' + this.name.toLowerCase().replace(/ /g, '-')
		}
	},
	mounted () {
		this.isActive = this.selected
	}
}
</script>
