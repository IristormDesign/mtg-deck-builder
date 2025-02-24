export default {
	methods: {
		hasLetterOrDigit (string) {
			return /\w+/.test(string)
		},
		/**
		 * @param {string} string
		 * @returns {string}
		 */
		removeExcessSpaces (string) {
			if (string) {
				string = string.replace(/\s\s+/g, ' ') // Replace each group of multiple consecutive spaces with a single space.
				string = string.trim()

				return string
			}
		},
		/**
		 * Turn each straight apostrophe (or single closing quotation mark) into a curly one.
		 * @param {string} string
		 */
		curlApostrophes (string) {
			return string.replace(/'/g, '’')
		},
		/**
		 * @param {string} name
		 * @param {string} path
		 * @returns {Boolean}
		 */
		nameIsApproved (name, path) {
			const commitDialog = secondParam => {
				return this.$store.commit('idOfShowingDialog', secondParam)
			}

			if (name.length > 50) {
				// this.$store.commit('idOfShowingDialog', 'nameIsTooLong')
				commitDialog('nameIsTooLong')
				return false
			} else if (!this.hasLetterOrDigit(name)) {
				// this.$store.commit('idOfShowingDialog', 'missingLetterOrDigit')
				commitDialog('missingLetterOrDigit')
				return false
			} else if ( // If the submitted deck name already exists (based on the deck path), unless that name is of the currently active deck (because letters' cases have been edited)...
				this.deckExists(path) &&
				path !== this.$route.params.deckPath
			) {
				commitDialog({
					id: 'deckNameExists',
					data: name
				})
				return false
			} else {
				name = this.curlApostrophes(name)
				return true
			}
		},
		/**
		 * @param {string} string The string to convert into a path for a valid URL.
		 * @returns {string} The path.
		 */
		stringToPath (string) {
			return string
				.toLowerCase()
				.replace(/\s/g, '-') // Turn each whitespace character into a hyphen.
				.replace(/-{2,}/g, '-') // Turn each instance of multiple hyphens in a row into a single hyphen.
				.replace(/[^\w-]/g, '') // Erase any character that's NOT a word character (a letter or digit) or a hyphen.
		},
		/* Check whether another deck exists with the same name. If one does, return that deck object (not the name). The name check is actually based on the deck's path because the path must be unique. */
		deckExists (testPath) {
			return this.$store.state.decks.find(
				deck => testPath === deck.path
			)
		}
	}
}
