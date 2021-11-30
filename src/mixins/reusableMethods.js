export default {
	methods: {
		alertNameExists (name) {
			return `⚠ You already have another deck named “${name}.” Please give a different name.`
		},
		curlApostrophes (string) {
			return string.replace(/'/g, '’') // Convert every straight apostrophe (or single right quotation mark) into a curly one.
		},
		scrollToTop () {
			window.scrollTo(0, 0)
			history.replaceState('', document.title, window.location.pathname)
		},
		stringToPath (string) {
			return string
				.toLowerCase()
				.replace(/\s/g, '-') // Replace whitespace characters with hyphens.
				.replace(/-{2,}/g, '-') // Replace multiple hyphens in a row with a single hyphen.
		}
	}
}
