<template>
	<nav class="mode-menu">
		<ul>
			<li>
				<router-link
					:to="{ name: 'listEditor' }"
					:class="onPage('listEditor')"
					title="(1)"
				>
					<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#EA33F7"><path d="M216-216h44.46l393.46-393.46-44.46-44.46L216-260.46V-216Zm-52 52v-118.38l534-535.54 120.31 118.77L282.38-164H164Zm580-534.77L698.77-744 744-698.77ZM631.3-631.3l-21.84-22.62 44.46 44.46-22.62-21.84Z"/></svg>
					List Editor
				</router-link>
			</li>
			<li>
				<router-link
					:to="{ name: 'statsAnalyzer' }"
					:class="onPage('statsAnalyzer')"
					title="(2)"
				>
					<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#EA33F7"><path d="M140-140v-680h680v680H140Zm60-60h560v-560H200v560Zm94.62-90h59.99v-190h-59.99v190Zm310.77 0h59.99v-390h-59.99v390ZM450-290h60v-110h-60v110Zm0-190h60v-80h-60v80ZM200-200v-560 560Z"/></svg>
					Stats Analyzer
				</router-link>
			</li>
			<li>
				<router-link
					:to="{ name: 'drawSim' }"
					:class="onPage('drawSim')"
					title="(3)"
				>
					<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#EA33F7"><path d="M599.61-395.39 638.85-532l-117.7-79.08-40.23 136.62 118.69 79.07Zm-419.3 182.62-87.69-41.77 87.69-187.07v228.84ZM260-148.62v-334.61l124.77 334.61H260Zm206.92.39L260-715.69l391.31-142.15 207.3 570.07-391.69 139.54Zm31.08-67 294-105-170.62-471-294.38 107 171 469Zm62-288Z"/></svg>
					Draw Simulator
				</router-link>
			</li>
		</ul>
	</nav>
</template>

<script>
export default {
	methods: {
		onPage (routeName) {
			if (this.$route.name === routeName) {
				return 'current-page'
			}
		}
	}
}
</script>
