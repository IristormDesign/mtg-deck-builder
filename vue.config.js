module.exports = {
	pages: {
		index: {
			entry: 'src/main.js'
		}
	},
	pwa: {
		name: 'MTG Deck Builder',
		themeColor: '#ea4b12',
		msTileColor: '#272e31',
		appleMobileWebAppCapable: 'yes',
		manifestOptions: {
			icons: [
				{
					src: './img/icons/android-chrome-192x192.png',
					type: 'image/png',
					sizes: '192x192'
				},
				{
					src: './img/icons/android-chrome-512x512.png',
					type: 'image/png',
					sizes: '512x512'
				}
			]
		},
		iconPaths: {
			appleTouchIcon: 'img/icons/apple-touch-icon.png',
			maskIcon: null,
			msTileImage: 'img/icons/mstile-150x150.png'
		}
	}
}
