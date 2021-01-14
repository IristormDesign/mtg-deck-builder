module.exports = {
	pages: {
		index: {
			entry: 'src/main.js',
			title: 'MTG Deck Organizer'
		}
	},
	css: {
		loaderOptions: {
			scss: {
				prependData: '@import "./src/sass/index.scss";'
			}
		}
	}
}
