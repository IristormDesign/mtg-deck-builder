/* eslint-disable no-console */

import { register } from 'register-service-worker'

if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
	window.addEventListener('load', function () {
		setTimeout(function () {
			register(`${process.env.BASE_URL}service-worker.js`, {
				ready () {
					console.log(
						'App is being served from cache by a service worker.\n' +
							'For more details, visit https://goo.gl/AFskqB'
					)
				},
				registered () {
					console.log('Service worker has been registered.')
				},
				cached () {
					console.log('Content has been cached for offline use.')
				},
				updatefound () {
					console.log('New content is downloading.')
				},
				updated (registration) {
					console.log('New content is available; please refresh.')

					document.dispatchEvent(
						new CustomEvent('swUpdated', { detail: registration })
					)
				},
				offline () {
					console.log('No internet connection found. App is running in offline mode.')
				},
				error (error) {
					console.error('Error during service worker registration:', error)
				}
			})
		}, 2750) // Wait an amount of time equal to the total number of seconds for the slowest page transition animation to finish.
	})
}
