<template>
	<div class="deck-info date-edited">
		<h3>Last edited</h3>

		<div class="output">
			{{ dateEdited }}<br>{{ timeEdited }}
		</div>
	</div>
</template>

<script>
export default {
	props: {
		deck: Object
	},
	computed: {
		dateEdited: function () {
			const dateTime = new Date(this.deck.editDate)
			let month = dateTime.getMonth() + 1
			const day = dateTime.getDate()
			const year = dateTime.getFullYear()

			switch (month) {
			case 1:
				month = 'Jan.'
				break
			case 2:
				month = 'Feb.'
				break
			case 3:
				month = 'Mar.'
				break
			case 4:
				month = 'Apr.'
				break
			case 5:
				month = 'May'
				break
			case 6:
				month = 'June'
				break
			case 7:
				month = 'July'
				break
			case 8:
				month = 'Aug.'
				break
			case 9:
				month = 'Sep.'
				break
			case 10:
				month = 'Oct.'
				break
			case 11:
				month = 'Nov.'
				break
			case 12:
				month = 'Dec.'
				break
			}

			return `${month} ${day}, ${year}`
		},
		timeEdited: function () {
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
