<template>
	<article class="manual-page content-box">
		<header>
			<h2>User Manual</h2>
		</header>

		<nav class="table-of-contents" aria-label="Table of Contents">
			<h3>Table of Contents</h3>
			<div class="toc-links">
				<ol>
					<li>
						<a href="#m-intro">Introduction</a>
						<ol>
							<li><a href="#m-game-rules">Game Rules</a></li>
						</ol>
					</li>
					<li>
						<a href="#m-app-header">App Header</a>
						<ol>
							<li><a href="#m-deck-menu">Deck Menu</a></li>
						</ol>
					</li>
					<li><a href="#m-create-deck">Create Deck Page</a></li>
					<li>
						<a href="#m-deck-pages">Deck Pages</a>
					</li>
					<li>
						<a href="#m-deck-page-header">Deck Page Header</a>
						<ol>
							<li><a href="#m-deck-name">Deck Name</a></li>
							<li><a href="#m-basic-statistics">Basic Statistics</a></li>
							<li><a href="#m-mode-menu">Mode Menu</a></li>
							<li><a href="#m-deck-actions">Deck Actions</a></li>
						</ol>
					</li>
					<li><a href="#m-deck-page-modes">Deck Page Modes</a></li>
					<li>
						<a href="#m-deck-editor">Deck Editor</a>
						<ol>
							<li><a href="#m-card-image">Card Image</a></li>
							<li><a href="#m-card-sorter">Card Sorter</a></li>
							<li>
								<a href="#m-card-groups">Card Group Switch</a>
								<ol>
									<li><a href="#m-sideboard-uses">Sideboard Uses</a></li>
								</ol>
							</li>
							<li><a href="#m-sideboard-header">Sideboard Header</a></li>
							<li>
								<a href="#m-card-list">Card List</a>
								<ol>
									<li><a href="#m-card-stars">Card Stars</a></li>
									<li><a href="#m-card-buttons">Card Buttons</a></li>
									<li><a href="#m-card-quantities">Card Quantities</a></li>
								</ol>
							</li>
							<li><a href="#m-scryfall-button">Scryfall Advanced Search Button</a></li>
							<li><a href="#m-card-adder">Card Adder</a></li>
						</ol>
					</li>
					<li>
						<a href="#m-deck-analyzer">Deck Analyzer</a>
						<ol>
							<li><a href="#m-data-tables">Data Tables</a></li>
							<li><a href="#m-statistics-filter">Statistics Filter</a></li>
						</ol>
					</li>
					<li><a href="#m-draw-sim">Draw Simulator</a></li>
					<li>
						<a href="#m-keyboard-shortcuts">Keyboard Shortcuts</a>
						<ol>
							<li><a href="#m-kbsc-deck-page-modes">Deck Page Modes</a></li>
							<li><a href="#m-kbsc-deck-editor">Deck Editor Actions</a></li>
							<li><a href="#m-kbsc-draw-sim">Draw Simulator Actions</a></li>
						</ol>
					</li>
					<li>
						<a href="#m-storage-of-deck-data">Storage of Deck Data</a>
						<ol>
							<li><a href="#m-deck-data-files">Deck Data Files</a></li>
						</ol>
					</li>
					<li><a href="#m-app-dev">App Development</a></li>
				</ol>
			</div>
		</nav>

		<div class="manual-contents">
			<manual-introduction />
			<app-header />
			<create-deck-page />
			<deck-pages />
			<deck-page-header />
			<deck-page-modes />
			<deck-editor />
			<deck-analyzer />
			<draw-sim />
			<keyboard-shortcuts />
			<storage-of-deck-data />
			<app-development />
		</div>
	</article>
</template>

<script>
import ManualIntroduction from '@/components/manual-chapters/ManualIntroduction.vue'
import AppHeader from '@/components/manual-chapters/AppHeader.vue'
import CreateDeckPage from '@/components/manual-chapters/CreateDeckPage.vue'
import DeckPages from '@/components/manual-chapters/DeckPages.vue'
import DeckPageHeader from '@/components/manual-chapters/DeckPageHeader.vue'
import DeckPageModes from '@/components/manual-chapters/DeckPageModes.vue'
import DeckEditor from '@/components/manual-chapters/DeckEditor.vue'
import DeckAnalyzer from '@/components/manual-chapters/DeckAnalyzer.vue'
import DrawSim from '@/components/manual-chapters/DrawSim.vue'
import KeyboardShortcuts from '@/components/manual-chapters/KeyboardShortcuts.vue'
import StorageOfDeckData from '@/components/manual-chapters/StorageOfDeckData.vue'
import AppDevelopment from '@/components/manual-chapters/AppDevelopment.vue'

export default {
	components: { ManualIntroduction, AppHeader, CreateDeckPage, DeckPages, DeckPageHeader, DeckPageModes, DeckEditor, DeckAnalyzer, DrawSim, KeyboardShortcuts, StorageOfDeckData, AppDevelopment }
}
</script>

<style lang="scss">
	@import '@/sass/page-user-manual.scss';
</style>
