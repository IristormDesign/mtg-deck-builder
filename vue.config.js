const { defineConfig } = require('@vue/cli-service')

process.env.VUE_APP_VERSION = require('./package.json').version

module.exports = defineConfig({
	transpileDependencies: true,
	pages: {
		index: {
			entry: 'src/js/main.js'
		}
	},
	pwa: {
		name: 'MTG Deck Builder',
		themeColor: '#ba4218', // The color of the site header's bottom border.
		msTileColor: '#1a2529',
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
				},
				{
					src: './img/icons/maskable.png',
					type: 'image/png',
					sizes: '512x512',
					purpose: 'maskable'
				}
			]
		},
		workboxOptions: {
			exclude: [
				/^\.htaccess$/
			]
		},
		iconPaths: {
			appleTouchIcon: 'img/icons/apple-touch-icon.png',
			maskIcon: null,
			msTileImage: 'img/icons/mstile-150x150.png'
		}
	}
})
