export default {
	data () {
		return {
			manaSymbol: {
				w: '<span class="mana-symbol white"><div>W</div></span>',
				u: '<span class="mana-symbol blue">U</span>',
				b: '<span class="mana-symbol black">B</span>',
				r: '<span class="mana-symbol red">R</span>',
				g: '<span class="mana-symbol green">G</span>',
				c: '<span class="mana-symbol">C</span>',
				s: '<span class="mana-symbol">S</span>',
				hybrid: '<span class="mana-symbol hybrid"><div>Y/Z</div></span>'
			},
			raritySymbol: {
				c: '<div class="rarity-symbol common"><div>C</div></div>',
				u: '<div class="rarity-symbol uncommon"><div>U</div></div>',
				r: '<div class="rarity-symbol rare"><div>R</div></div>',
				m: '<div class="rarity-symbol mythic"><div>M</div></div>',
				s: '<div class="rarity-symbol special"><div>S</div></div>',
				b: '<div class="rarity-symbol special"><div>B</div></div>'
			}
		}
	}
}
