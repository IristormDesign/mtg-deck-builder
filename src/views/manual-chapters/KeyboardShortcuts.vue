<template>
	<section id="keyboard-shortcuts">
		<h3>Keyboard Shortcuts</h3>
		<p>If you’re using MTG Deck Builder on a computer with a physical keyboard (instead of on a touchscreen device), then you have the option to use keyboard shortcuts. With keyboard shortcuts, you can press designated keys to perform tasks in the app, which let you interact with the app faster than by a mouse or trackpad alone.</p>
		<p>Special keyboard shortcuts are available for <a href="#kbsc-deck-page-modes">switching between deck page modes</a> and for doing various actions each within the <a href="#kbsc-list-editor">List Editor</a>, <a href="#kbsc-stats-analyzer">Stats Analyzer</a>, and <a href="#kbsc-draw-sim">Draw Simulator</a> modes. (There are no shortcut actions within the Text Renderer.)</p>
		<p>Be aware that the app’s keyboard shortcuts can’t work while your web browser is actively focused on any kind of text field, such as the ones in the <a href="#card-adder">card adder</a>, <a href="#card-quantities">card quantities</a>, or your browser’s web address bar. Under that condition, pressing a letter or digit key will enter that key’s character into the text field instead of doing the shortcut’s action. If you’d want to use a keyboard shortcut but your browser is focusing on a text field, stop the focus by pressing the <kbd>Esc</kbd> key or by clicking on a spot elsewhere on the page.</p>
		<p>The app’s scheme of keyboard shortcuts is designed for left-hand ergonomics on the standard English-language (QWERTY) layout of keys. If your keyboard has a different layout, then the shortcuts may be less ergonomic.</p>

		<kb-sc-deck-page-modes />
		<kb-sc-list-editor />
		<kb-sc-stats-analyzer />
		<kb-sc-draw-sim />
	</section>
</template>

<script>
import KbScDeckPageModes from '@/components/manual-subchapters/KbScDeckPageModes.vue'
import KbScListEditor from '@/components/manual-subchapters/KbScListEditor.vue'
import KbScStatsAnalyzer from '@/components/manual-subchapters/KbScStatsAnalyzer.vue'
import KbScDrawSim from '@/components/manual-subchapters/KbScDrawSim.vue'

export default {
	components: { KbScDeckPageModes, KbScListEditor, KbScStatsAnalyzer, KbScDrawSim }
}
</script>
