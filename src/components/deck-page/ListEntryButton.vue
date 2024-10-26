<template>
	<section
		class="list-entry-button"
	>
		<router-link
			:to="{name: 'listEntry'}"
			v-show="!$store.state.showSideboard"
		>
			<div>Add Card List</div>
		</router-link>
	</section>
</template>
