<template>
	<section class="list-entry-button">
		<router-link
			:to="{name: 'listEntry'}"
			v-show="!$store.state.showSideboard"
		>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M654.87-135.87v-120h-120v-50.26h120v-120h50.26v120h120v50.26h-120v120h-50.26ZM130-250v-50.26h50.26V-250H130Zm120.51 0v-50.26h205.13q-.36 13.9-.06 24.81.29 10.91 2.14 25.45H250.51ZM130-412.98v-50.25h50.26v50.25H130Zm120.51 0v-50.25h297.08q-14.48 10.41-26.53 23.23-12.06 12.82-22.01 27.02H250.51ZM130-576.36v-50.25h50.26v50.25H130Zm120.51 0v-50.25H750v50.25H250.51ZM130-739.74V-790h50.26v50.26H130Zm120.51 0V-790H750v50.26H250.51Z"/></svg>
		</router-link>
		<div class="section-label">Add Multiple</div>
	</section>
</template>
