<template>
	<section class="deck-info date-edited">
		<h3>Last Edit</h3>

		<div class="output">
			{{ dateEdited }}<br>{{ timeEdited }}
		</div>
	</section>
</template>

<script>
export default {
	props: {
		deck: Object
	},
	computed: {
		dateEdited () {
			const dateTime = new Date(this.deck.editDate)
			const month = monthNameFromNumber()
			const day = dateTime.getDate()
			const year = dateTime.getFullYear()

			function monthNameFromNumber () {
				switch (dateTime.getMonth() + 1) {
					case 1:
						return 'Jan.'
					case 2:
						return 'Feb.'
					case 3:
						return 'Mar.'
					case 4:
						return 'Apr.'
					case 5:
						return 'May'
					case 6:
						return 'June'
					case 7:
						return 'July'
					case 8:
						return 'Aug.'
					case 9:
						return 'Sep.'
					case 10:
						return 'Oct.'
					case 11:
						return 'Nov.'
					case 12:
						return 'Dec.'
				}
			}

			return `${month} ${day}, ${year}`
		},
		timeEdited () {
			const dateTime = new Date(this.deck.editDate)
			let hour = dateTime.getHours()
			let minute = dateTime.getMinutes()
			let meridiem

			if (hour < 12) {
				meridiem = 'a.m.'
			} else {
				meridiem = 'p.m.'

				if (hour > 12) {
					hour -= 12
				}
			}

			if (hour === 0) {
				hour = 12
			}
			if (minute < 10) {
				minute = '0' + minute
			}

			return `${hour}:${minute} ${meridiem}`
		}
	}
}
</script>
