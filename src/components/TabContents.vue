<template>
	<div class="tab-contents">
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
	mounted () {
		this.isActive = this.selected
	}
}
</script>
