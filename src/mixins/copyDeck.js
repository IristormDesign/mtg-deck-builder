import stringMethods from '@/mixins/stringMethods.js'
import sortDeckMenu from '@/mixins/sortDeckMenu.js'
import store from '@/js/store.js'
import router from '@/js/router.js'

export default {
	mixins: [stringMethods, sortDeckMenu],
	methods: {
		/**
		 * @param {Object} sourceDeck
		 * @returns {Object} An object containing the copied deck's amended name and path.
		 */
		amendCopiedDeckName (sourceDeck) {
			const regexCopySuffix = /\(\d+\)$/ // A copied deck's name suffix, which is a string ending with `(N)`, where N is at least one digit.
			let copiedDeckName = sourceDeck.name
			let copiedDeckPath

			/* It's possible the copied deck's name could match an existing deck's name. In this case, keep increasing the copy suffix's number by 1 until it no longer matches another deck's name. */
			const makeUniqueDeckName = (copyNum) => {
				copiedDeckPath = this.stringToPath(copiedDeckName)

				if (store.getters.deckExists(copiedDeckPath)) {
					copyNum++

					copiedDeckName = copiedDeckName.replace(
						regexCopySuffix, `(${copyNum})`
					)
					makeUniqueDeckName(copyNum)
				}
			}

			if (regexCopySuffix.test(sourceDeck.name)) { // If the source deck's name has the copy suffix...
				const suffix = sourceDeck.name.match(regexCopySuffix) // From the deck name, get the copy suffix alone.
				let copyNum = suffix[0].match(/\d+/) // From the suffix, get the number alone.

				copyNum = Number(copyNum[0]) + 1 // Convert `copyNum[0]` from a string into a number type, then increase it by 1.

				copiedDeckName = copiedDeckName.replace(
					regexCopySuffix, `(${copyNum})`
				)
				makeUniqueDeckName(copyNum)
			} else {
				copiedDeckName += ' (2)'
				makeUniqueDeckName(2)
			}

			return {
				name: copiedDeckName,
				path: copiedDeckPath
			}
		},
		storeCopiedDeckAndRedirect (deck, newData) {
			deck.name = newData.name
			deck.path = newData.path
			deck.editDate = new Date()

			store.state.decks.push(deck)
			this.sortDeckMenu()
			store.commit('decks', store.state.decks)

			router.push({
				name: 'listEditor',
				params: { deckPath: deck.path }
			})
		}
	}
}
