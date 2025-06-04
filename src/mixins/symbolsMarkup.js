export default {
	data () {
		return {
			manaSymbol: {
				w: '<svg class="mana-symbol"><use href="#white-mana" /></svg>',
				u: '<svg class="mana-symbol"><use href="#blue-mana" /></svg>',
				b: '<svg class="mana-symbol"><use href="#black-mana" /></svg>',
				r: '<svg class="mana-symbol"><use href="#red-mana" /></svg>',
				g: '<svg class="mana-symbol"><use href="#green-mana" /></svg>',
				c: '<svg class="mana-symbol"><use href="#colorless-mana" /></svg>',
				s: '<svg class="mana-symbol"><use href="#snow-mana" /></svg>',
				wu: '<svg class="mana-symbol hybrid"><use href="#white-blue-mana" /></svg>',
				wb: '<svg class="mana-symbol hybrid"><use href="#white-black-mana" /></svg>',
				ub: '<svg class="mana-symbol hybrid"><use href="#blue-black-mana" /></svg>',
				ur: '<svg class="mana-symbol hybrid"><use href="#blue-red-mana" /></svg>',
				br: '<svg class="mana-symbol hybrid"><use href="#black-red-mana" /></svg>',
				bg: '<svg class="mana-symbol hybrid"><use href="#black-green-mana" /></svg>',
				rw: '<svg class="mana-symbol hybrid"><use href="#red-white-mana" /></svg>',
				rg: '<svg class="mana-symbol hybrid"><use href="#red-green-mana" /></svg>',
				gw: '<svg class="mana-symbol hybrid"><use href="#green-white-mana" /></svg>',
				gu: '<svg class="mana-symbol hybrid"><use href="#green-blue-mana" /></svg>',
				gen2w: '<svg class="mana-symbol hybrid"><use href="#two-generic-white-mana" /></svg>',
				gen2u: '<svg class="mana-symbol hybrid"><use href="#two-generic-blue-mana" /></svg>',
				gen2b: '<svg class="mana-symbol hybrid"><use href="#two-generic-black-mana" /></svg>',
				gen2r: '<svg class="mana-symbol hybrid"><use href="#two-generic-red-mana" /></svg>',
				gen2g: '<svg class="mana-symbol hybrid"><use href="#two-generic-green-mana" /></svg>',
				wp: '<svg class="mana-symbol hybrid"><use href="#white-phyrexian-mana" /></svg>',
				up: '<svg class="mana-symbol hybrid"><use href="#blue-phyrexian-mana" /></svg>',
				bp: '<svg class="mana-symbol hybrid"><use href="#black-phyrexian-mana" /></svg>',
				rp: '<svg class="mana-symbol hybrid"><use href="#red-phyrexian-mana" /></svg>',
				gp: '<svg class="mana-symbol hybrid"><use href="#green-phyrexian-mana" /></svg>',
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
