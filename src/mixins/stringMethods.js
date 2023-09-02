export default {
	methods: {
		/**
		 * @param {string} name
		 */
		alertNameExists (name) {
			return `You already have a deck named “${name}.” Please give a different name.`
		},
		/**
		 * Turn each straight apostrophe (or single closing quotation mark) into a curly one.
		 * @param {string} string
		 */
		curlApostrophes (string) {
			return string.replace(/'/g, '’')
		},
		/**
		 * @param {string} string The string to convert into a path for a valid URL.
		 * @returns {string} The path.
		 */
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
