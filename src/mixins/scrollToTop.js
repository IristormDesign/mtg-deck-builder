export default {
	methods: {
		scrollToTop () {
			window.scrollTo({
				top: 0,
				behavior: 'smooth'
			})
			history.replaceState('', document.title, window.location.pathname)
		}
	}
}
