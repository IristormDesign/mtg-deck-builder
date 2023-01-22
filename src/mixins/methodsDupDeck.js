import stringMethods from '@/mixins/stringMethods.js'
import store from '@/js/store.js'
import router from '@/js/router.js'

export default {
	mixins: [stringMethods],
	methods: {
		amendDupDeckName (srcDeck) {
			const copySuffixRegex = /\(\d+\)$/ // The sign of a copied deck suffix, which is a string ending with `(N)`, where N is any number.
			const srcDeckName = srcDeck.name
			let dupDeckName = srcDeckName
			let dupDeckPath

			// It's possible that this copied deck's name could match an existing deck's name. In this case, keep increasing the copy suffix's number by 1 until it no longer matches another deck's name.
			const makeUniqueDeckName = (copyNum) => {
				dupDeckPath = this.stringToPath(dupDeckName)

				if (store.getters.existingDeck(dupDeckPath)) {
					copyNum++

					dupDeckName = dupDeckName.replace(
						copySuffixRegex, `(${copyNum})`
					)
					makeUniqueDeckName(copyNum)
				}
			}

			if (copySuffixRegex.test(srcDeckName)) { // If the source deck's name has the copy suffix...
				const suffix = srcDeckName.match(copySuffixRegex) // From the deck name, get the copy suffix alone.
				let copyNum = suffix[0].match(/\d+/) // From the suffix, get the number alone.

				copyNum = Number(copyNum[0]) + 1 // Convert `copyNum[0]` from a string into a number type, then increase it by 1.

				dupDeckName = dupDeckName.replace(
					copySuffixRegex, `(${copyNum})`
				)
				makeUniqueDeckName(copyNum)
			} else {
				dupDeckName += ' (2)'
				makeUniqueDeckName(2)
			}

			return [dupDeckName, dupDeckPath]
		},
		storeDupDeckAndRedirect (dupDeck, dupDeckData) {
			dupDeck.name = dupDeckData[0]
			dupDeck.path = dupDeckData[1]
			dupDeck.editDate = new Date()

			store.state.decks.push(dupDeck)
			store.commit('setDecks', store.state.decks)
			store.commit('sortDeckMenu')

			router.push({
				name: 'deckMain',
				params: { deckPath: dupDeck.path }
			})
		}
	}
}
