<template>
	<section id="stats-analyzer">
		<h3>Stats Analyzer</h3>
		<p>The Stats Analyzer is a <a href="#deck-page-modes">deck page mode</a> where you can inspect lots of data about how your deck is composed. While the <a href="#deck-page-header">deck page header</a> shows a few <a href="#basic-statistics">basic statistics</a>, the Stats Analyzer shows additional statistics that go much further in depth.</p>
		<p>
			<img class="screenshot"
				srcset="@/img/manual-more-stats-page.jpg 1x, @/img/manual-more-stats-page-2x.jpg 1.5x"
				src="@/img/manual-more-stats-page.jpg" width="530" height="441"
				alt="Snippet of the Stats Analyzer mode" title="Screenshot" loading="lazy"
			/>
		</p>
		<p>The major parts of the Stats Analyzer are the <a href="#data-tables">data tables</a> and the <a href="#statistics-filter">statistics filter</a>.</p>

		<data-tables />
		<statistics-filter />
	</section>
</template>

<script>
import DataTables from '@/components/manual-subchapters/DataTables.vue'
import StatisticsFilter from '@/components/manual-subchapters/StatisticsFilter.vue'

export default {
	components: { DataTables, StatisticsFilter }
}
</script>
