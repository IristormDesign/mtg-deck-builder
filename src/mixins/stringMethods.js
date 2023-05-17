export default {
	methods: {
		alertNameExists (name) {
			return `⚠ You already have a deck named “${name}.” Please give a different name.`
		},
		curlApostrophes (string) {
			return string.replace(/'/g, '’') // Turn every straight apostrophe (or closing single quotation mark) into a curly one.
		},
		stringToPath (string) {
			const path = string
				.toLowerCase()
				.replace(/\s/g, '-') // Turn each whitespace character into a hyphen.
				.replace(/-{2,}/g, '-') // Turn each instance of multiple hyphens in a row into a single hyphen.
				// .replace(/[^\w-]/g, '-') // Turn any character that's NOT a word character (a letter or digit) into a hyphen.

			// path = encodeURIComponent(path)

			return path
		}
	}
}
