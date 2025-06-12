function manaMarkup (fileName, altText, isLarge) {
	function classes () {
		let classes = 'mana-symbol'

		if (isLarge) {
			classes += ' large'
		}

		return classes
	}

	return `<img class="${classes()}" src="/img/mana/${fileName}.svg" alt="${altText}" />`
}

export default {
	data () {
		return {
			manaSymbol: {
				w: manaMarkup('white', 'W'),
				u: manaMarkup('blue', 'U'),
				b: manaMarkup('black', 'B'),
				r: manaMarkup('red', 'R'),
				g: manaMarkup('green', 'G'),
				c: manaMarkup('colorless', 'C'),
				s: manaMarkup('snow', 'S'),
				wu: manaMarkup('hybrid-wu', 'W/U', true),
				wb: manaMarkup('hybrid-wb', 'W/B', true),
				ub: manaMarkup('hybrid-ub', 'U/B', true),
				ur: manaMarkup('hybrid-ur', 'U/R', true),
				br: manaMarkup('hybrid-br', 'B/R', true),
				bg: manaMarkup('hybrid-bg', 'B/G', true),
				rw: manaMarkup('hybrid-rw', 'R/W', true),
				rg: manaMarkup('hybrid-rg', 'R/G', true),
				gw: manaMarkup('hybrid-gw', 'G/W', true),
				gu: manaMarkup('hybrid-gu', 'G/U', true),
				'2w': manaMarkup('hybrid-2w', '2/W', true),
				'2u': manaMarkup('hybrid-2u', '2/U', true),
				'2b': manaMarkup('hybrid-2b', '2/B', true),
				'2r': manaMarkup('hybrid-2r', '2/R', true),
				'2g': manaMarkup('hybrid-2g', '2/G', true),
				wp: manaMarkup('phyrexian-w', 'W/P', true),
				up: manaMarkup('phyrexian-u', 'U/P', true),
				bp: manaMarkup('phyrexian-b', 'B/P', true),
				rp: manaMarkup('phyrexian-r', 'R/P', true),
				gp: manaMarkup('phyrexian-g', 'G/P', true)
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
