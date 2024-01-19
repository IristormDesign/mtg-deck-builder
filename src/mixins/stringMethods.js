export default {
	methods: {
		/**
		 * @param {string} name
		 */
		alertNameExists (name) {
			return `You already have a deck named “${name}.” Please give a different name.`
		},
		alertNameTooLong (length) {
			const stringExcessChars = () => {
				const numExcess = length - 50

				if (numExcess === 1) {
					return '1 character'
				} else {
					return `${numExcess} characters`
				}
			}

			return `That deck name is too long by ${stringExcessChars()}. Please revise it to have 50 characters or fewer.`
		},
		alertNoLetters () {
			return 'The deck name must have at least one letter.'
		},
		hasNoLetters (string) {
			const regexAtLeastOneLetter = /([A-Za-z])+/

			return !regexAtLeastOneLetter.test(string)
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
			if (name.length > 50) {
				alert(this.alertNameTooLong(name.length))
				return false
			} else if (this.hasNoLetters(name)) {
				alert(this.alertNoLetters())
				return false
			} else if ( // If the submitted deck name already exists (based on the deck path), unless that name is of the currently active deck (because letters' cases have been edited)...
				this.$store.getters.deckExists(path) &&
				path !== this.$route.params.deckPath
			) {
				alert(this.alertNameExists(name))
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
		}
	}
}
