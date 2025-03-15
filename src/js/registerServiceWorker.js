/* eslint-disable no-console */

import { register } from 'register-service-worker'

if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
	window.addEventListener('load', function () {
		register(`${process.env.BASE_URL}service-worker.js`, {
			ready () {
				console.info(
					'App is being served from cache by a service worker.\n' +
							'For more details, visit https://goo.gl/AFskqB'
				)
			},
			registered () {
				console.info('Service worker has been registered.')
			},
			cached () {
				console.info('Content has been cached for offline use.')
			},
			updatefound () {
				console.info('New content is downloading.')
			},
			updated (registration) {
				console.info('New content is available; please refresh.')

				document.dispatchEvent(
					new CustomEvent('swUpdated', { detail: registration })
				)
			},
			offline () {
				console.info('No internet connection found. App is running in offline mode.')
			},
			error (error) {
				console.error('Error during service worker registration:', error)
			}
		})
	})
}
