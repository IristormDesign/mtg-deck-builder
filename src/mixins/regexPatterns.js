export default {
	data () {
		return {
			regexManaSymbols: {
				White: /.W./g,
				Blue: /.U./g,
				Black: /.B./g,
				Red: /.R./g,
				Green: /.G./g,
				Colorless: /.C./g,
				Snow: /.S./g,
				Hybrid: /.\/./g
			},
			regexCardTypes: {
				Creature: /\bCreature\b/,
				Planeswalker: /\bPlaneswalker\b/,
				Battle: /\bBattle\b/,
				Enchantment: /\bEnchantment\b/,
				Artifact: /\bArtifact\b/,
				Sorcery: /\bSorcery\b/,
				Instant: /\bInstant\b/,
				'Kindred/Tribal': /\bKindred\b/,
				Land: /\bLand\b/
			}
		}
	}
}
