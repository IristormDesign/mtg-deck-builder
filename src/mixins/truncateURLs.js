export default {
	/**
	 * Truncates the URL to a card image.
	 * @param {string} url - The URL to truncate.
	 * @returns {string} The truncated URL.
	 */
	truncateCardImageURL (url) {
		const regexBeginningFragment = /^https:\/\/cards\.scryfall\.io\/normal\//i // The substring `https://cards.scryfall.io/normal/`, located at the beginning of a string.
		const regexEndingFragment = /\?\d*$/i // A substring of a question mark followed by a series of digits, located at the end of string.

		return url
			.replace(regexBeginningFragment, '')
			.replace(regexEndingFragment, '')
	},
	/**
	 * Truncates the URL of a card link.
	 * @param {string} url - The URL to truncate.
	 * @returns {string} The truncated URL.
	 */
	truncateCardLinkURL (url) {
		const regexBeginningFragment = /^https:\/\/scryfall\.com\/card\//i // The substring `https://scryfall.com/card/`, located at the beginning of the string.
		const regexEndingFragment = /\?utm_source=api$/i // The substring `?utm_source=api`, located at the end of the string.

		return url
			.replace(regexBeginningFragment, '')
			.replace(regexEndingFragment, '')
	}
}
