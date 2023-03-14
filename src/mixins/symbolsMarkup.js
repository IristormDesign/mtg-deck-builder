export default {
	data () {
		return {
			manaSymbol: {
				w: '<span class="mana-symbol white" title="White mana"><div>W</div></span>',
				u: '<span class="mana-symbol blue" title="Blue mana">U</span>',
				b: '<span class="mana-symbol black" title="Black mana">B</span>',
				r: '<span class="mana-symbol red" title="Red mana">R</span>',
				g: '<span class="mana-symbol green" title="Green mana">G</span>'
			},
			raritySymbol: {
				c: '<div class="rarity-symbol common" title="Common">C</div>',
				u: '<div class="rarity-symbol uncommon" title="Uncommon">U</div>',
				r: '<div class="rarity-symbol rare" title="Rare">R</div>',
				m: '<div class="rarity-symbol mythic" title="Mythic rare">M</div>',
				s: '<div class="rarity-symbol special" title="Special">S</div>'
			}
		}
	}
}
