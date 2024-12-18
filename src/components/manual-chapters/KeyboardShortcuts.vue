<template>
	<section id="keyboard-shortcuts">
		<h3>Keyboard Shortcuts</h3>
		<p>If you’re using MTG Deck Builder on a computer with a physical keyboard (instead of on a mobile device), you have the ability to use keyboard shortcuts, by which you can press designated keys to perform tasks in the app. You might find keyboard shortcuts convenient because they let you interact with elements on the page faster than by a mouse or trackpad alone.</p>
		<p>Special keyboard shortcuts are available for <a href="#kbsc-deck-page-modes">switching deck page modes</a> and for doing various actions each within the <a href="#kbsc-list-editor">List Editor</a>, <a href="#kbsc-deck-analyzer">Deck Analyzer</a>, and <a href="#kbsc-draw-sim">Draw Simulator</a>.</p>
		<p>Be aware that the app’s keyboard shortcuts cannot work while your web browser is actively focused on any kind of text field, such as the one in the <a href="#card-adder">card adder</a>, any <a href="#card-quantities">card quantity</a>, or your browser’s web address bar. Under that condition, pressing a letter or digit key will enter that key’s character into the text field instead of doing the shortcut’s action. If you’d want to use a keyboard shortcut but your browser is focused on a text field, first stop the focus by pressing the <kbd>Esc</kbd> key or by clicking on a spot elsewhere on the page.</p>
		<p>The app’s scheme of keyboard shortcuts is designed for left-hand ergonomics on the standard English-language (QWERTY) arrangement of keys. If your keyboard has a different arrangement, then the shortcuts may be less ergonomic.</p>

		<kb-sc-deck-page-modes />
		<kb-sc-list-editor />
		<kb-sc-deck-analyzer />
		<kb-sc-draw-sim />
	</section>
</template>

<script>
import KbScDeckPageModes from '@/components/manual-chapters/KbScDeckPageModes.vue'
import KbScListEditor from '@/components/manual-chapters/KbScListEditor.vue'
import KbScDeckAnalyzer from '@/components/manual-chapters/KbScDeckAnalyzer.vue'
import KbScDrawSim from '@/components/manual-chapters/KbScDrawSim.vue'

export default {
	components: { KbScDeckPageModes, KbScListEditor, KbScDeckAnalyzer, KbScDrawSim }
}
</script>
