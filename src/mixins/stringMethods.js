export default {
	methods: {
		alertNameExists (name) {
			return `⚠ You already have a deck named “${name}.” Please give a different name.`
		},
		curlApostrophes (string) {
			return string.replace(/'/g, '’') // Turn each straight apostrophe (or single closing quotation mark) into a curly one.
		},
		minimumDeckNameLimit (name) {
			const regexMinChars = /\w+/i // At least one letter or digit

			if (regexMinChars.test(name)) {
				return true
			} else {
				alert('⚠ A deck’s name must have at least one letter or digit.')

				return false
			}
		},
		stringToPath (string) {
			const path = string
				.toLowerCase()
				.replace(/\s/g, '-') // Turn each whitespace character into a hyphen.
				.replace(/-{2,}/g, '-') // Turn each instance of multiple hyphens in a row into a single hyphen.
				.replace(/[^\w-]/g, '') // Erase any character that's NOT a word character (a letter or digit) or a hyphen.

			return path
		}
	}
}
