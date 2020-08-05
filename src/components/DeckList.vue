<template>
	<div class="deck-list">
		<div v-if="activeDeck.cards.length == 0" class="no-cards">
			<p>This deck currently has no cards.</p>
		</div>
		<div v-else>
			<div class="labels">
				<div class="button-group">
					<div>Card Name</div>
					<div>Mana Cost</div>
					<div>Type</div>
				</div>
				<div class="qty-group">Quantity</div>
			</div>
			<ul>
				<li
					v-for="card in activeDeck.cards"
					v-bind:key="card.name"
				>
					<button v-on:click="$emit('selected-card-event', card, activeDeck)">
						<h3 class="name">{{ card.name }}</h3>
						<div class="mana">{{ card.mana }}</div>
						<div class="type">{{ card.type }}</div>
					</button>

					<div class="qty">
						<button v-on:click="$emit('dec-qty-event', card, activeDeck)">&minus;</button>

						<span>{{ card.qty }}</span>

						<button
							v-if="card.qty < 4 || (card.qty < 99 && RegExp(/^Basic Land\b/).test(card.type))"
							v-on:click="$emit('inc-qty-event', card)"
						>+</button>
						<button v-else disabled>+</button>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>

export default {
	name: 'deck-list',
	props: {
		activeDeck: Object
	}
}
</script>

<style scoped lang="scss">
@import '../sass/variables';

.deck-list {
	grid-column: span 2;
}
.no-cards {
	display: flex;
	align-items: center;
	justify-content: center;
}
.labels {
	@include heading-font;
	display: flex;
	text-transform: uppercase;
	justify-content: space-between;
	font-size: .75em;
	display: grid;
	grid-template-columns: repeat(8, 1fr);
	grid-gap: .75em;
	padding: 0 .5em;
	color: #bbb;
	letter-spacing: 0;

	.button-group {
		display: flex;
		grid-column: span 7;

		div {
			&:nth-of-type(1) {
				width: 33.3%;
			}
			&:nth-of-type(2) {
				width: 33.33%;
			}
			&:nth-of-type(3) {
				width: 33.3%;
			}
		}
	}
	.qty-group {
		grid-column: span 1;
		text-align: center;
	}
}
ul {
	line-height: 1.25;
	margin: 0;
	padding: 0;
	list-style: none;
}
li {
	display: grid;
	grid-template-columns: repeat(8, 1fr);
	grid-gap: .75em;

	&:hover {
		> button {
			background: #fff;
			transition-duration: 0s;
			outline: 0;
		}
		.qty {
			button {
				transition-duration: 0s;
			}
			button[disabled] {
				opacity: .5;
			}
			button:not([disabled]) {
				opacity: 1;
			}
		}
	}
	> button {
		background: hsl(0, 0%, 87.5%);
		display: flex;
		grid-column: span 7;
		justify-content: space-between;
		margin: 2px 0;
		padding: .083em .375em;
		border-radius: .5em / 50%;
		border: 2px outset #ccc;
		border-top-color: #eee;
		transition: all .125s ease-out;
		width: 100%;
		text-align: left;
		margin-right: .375em;
		align-items: center;
		line-height: 1.25;
		color: #111;

		&:active {
			background: greenyellow;
		}
	}
}
.name {
	font-size: 1em;
	line-height: 1;
	margin: 0;
	width: 33.3%;
	color: inherit;
}
.mana {
	text-align: left;
	width: 33.3%;
}
.type {
	@include heading-font;
	font-size: .875em;
	width: 33.3%;
}
.qty {
	grid-column: span 1;
	width: 100%;
	display: flex;
	align-items: center;

	button {
		@include heading-font;
		background: tan;
		color: #000;
		font-weight: bold;
		line-height: 1;
		font-size: 1.25em;
		margin: 0;
		transition: all .125s ease, opacity .25s ease;
		border-radius: .25em;
		border: 1px outset wheat;
		border-bottom-width: 2px;
		padding: 0 .375em;
		opacity: .667;
		height: 1.333em;

		&[disabled] {
			&,
			&:hover {
				background: gray;
				cursor: not-allowed;
				opacity: .333;
				border-color: gray;
			}
		}
		&:first-of-type {
			margin-right: .375em;
		}
		&:last-of-type {
			margin-left: .375em;
		}
		&:hover {
			background: wheat;
			outline: 0;
		}
		&:focus {
			opacity: 1 !important;
		}
		&:active {
			transition-duration: 0s;
			border-top-width: 0;
			border-bottom-width: 0;
			margin-bottom: -2px;
		}
	}
	span {
		display: inline-block;
		width: 1.25em;
		font-size: 1.125em;
		text-align: center;
	}
}
</style>
