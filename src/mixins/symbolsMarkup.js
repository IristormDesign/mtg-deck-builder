export default {
	data () {
		return {
			manaSymbol: {
				w: '<svg class="mana-symbol white"><use href="#white-mana" /></svg>',
				u: '<svg class="mana-symbol blue"><use href="#blue-mana" /></svg>',
				b: '<svg class="mana-symbol black"><use href="#black-mana" /></svg>',
				r: '<svg class="mana-symbol red"><use href="#red-mana" /></svg>',
				g: '<svg class="mana-symbol green"><use href="#green-mana" /></svg>',
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
