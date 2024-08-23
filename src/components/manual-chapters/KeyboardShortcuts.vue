<template>
	<section id="m-keyboard-shortcuts">
		<h3>Keyboard Shortcuts</h3>
		<p>If you’re using MTG Deck Builder on a computer with a physical keyboard (instead of on a mobile device), then you have the option to do special keyboard shortcuts. You might find them convenient in how they let you navigate and interact with various elements on the page faster than by mouse or touchscreen alone.</p>
		<p>Keyboard shortcuts are available for switching between <a href="#m-kbsc-deck-page-modes">deck page modes</a>, and for doing various actions in the <a href="#m-kbsc-deck-editor">Deck Editor</a> and <a href="#m-kbsc-draw-sim">Draw Simulator</a>. (No special keyboard shortcuts are used in More Statistics.)</p>
		<p>The app’s scheme of keyboard shortcuts is designed for left-hand ergonomics on the standard English-language QWERTY layout of keys. If your keyboard has a different layout, the shortcut scheme may be less ergonomic.</p>

		<kb-sc-deck-page-modes />
		<kb-sc-deck-editor />
		<kb-sc-draw-sim />
	</section>
</template>

<script>
import KbScDeckPageModes from '@/components/manual-chapters/KbScDeckPageModes.vue'
import KbScDeckEditor from '@/components/manual-chapters/KbScDeckEditor.vue'
import KbScDrawSim from '@/components/manual-chapters/KbScDrawSim.vue'

export default {
	components: { KbScDeckPageModes, KbScDeckEditor, KbScDrawSim }
}
</script>
