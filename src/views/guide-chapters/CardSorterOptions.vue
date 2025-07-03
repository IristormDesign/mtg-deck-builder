<template>
	<ul>
		<li>
			<p><strong>Starred</strong> – Sorts between <template v-if="displayAsDialog">starred</template><a v-else href="#card-stars">starred</a> and un-starred. If your deck has no card names with a star, then this sorting option is hidden.</p>
		</li>
		<li>
			<p><strong>Name</strong> – Sorts alphabetically by card name.</p>
		</li>
		<li>
			<p><strong>Mana Color</strong> – Sorts between monocolored, multicolored, and colorless. Monocolored cards are sorted by Wizards of the Coast’s conventional order of the mana colors: white, blue, black, red, green. Colorless cards are sorted between spells and lands.</p>
		</li>
		<li>
			<p><strong>Mana Value</strong> – Sorts from least to greatest by mana value (a.k.a. converted mana cost). Cards of mana value 0 are sorted between lands and spells.</p>
		</li>
		<li>
			<p><strong>Supertype</strong> – Sorts alphabetically by first-indicated supertype, and moves cards without supertypes to the bottom. (Common supertypes are “basic” [on land cards] and “legendary.”)</p>
		</li>
		<li>
			<p><strong>Type</strong> – Sorts by card type in this order: creatures, planeswalkers, battles, enchantments, artifacts, sorceries, instants, lands.</p>
		</li>
		<li>
			<p><strong>First Subtype</strong> – Sorts alphabetically by first-indicated subtype, and moves cards without subtypes to the bottom.</p>
		</li>
		<li>
			<p><strong>Last Subtype</strong> – Sorts alphabetically by last-indicated subtype, and moves cards without subtypes to the bottom.</p>
		</li>
		<li>
			<p><strong>Rarity</strong> – Sorts from highest to lowest by level of rarity.</p>
		</li>
		<li>
			<p><strong>Mana Sources</strong> – Sorts from least to most by the number of distinct mana colors that each card can produce. Among cards having equal numbers of producible colors to each other, they’re grouped with other cards having the same combination of producible colors. Cards that can’t produce any mana are moved to the bottom.</p>
		</li>
		<li>
			<p><strong>P/T</strong> (Power and Toughness) – Sorts from greatest to least by the sum of the power and toughness numbers of each card. (For example, the power and toughness sum of a 3/2 creature is 5.) Among cards with the same sums as each other, they’re sorted by power alone from greatest to least.</p>
			<p>Additionally, power/toughness sorting handles every planeswalker card as if it has those attributes, where its power is 0 and its toughness equals its loyalty number.  Cards without the power/toughness or loyalty attributes are moved to the bottom.</p>
		</li>
		<li>
			<p><strong>Quantity</strong> – Sorts from greatest to least by card name <template v-if="displayAsDialog">quantity</template><a v-else href="#card-quantities">quantity</a>.</p>
		</li>
	</ul>
</template>

<script>
export default {
	props: {
		displayAsDialog: Boolean
	}
}

</script>
