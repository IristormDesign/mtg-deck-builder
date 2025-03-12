<template>
	<div
		class="dropdown-menu-component"
		:class="isShowingDropdown ? 'opened' : 'closed'"
		aria-haspopup="true"
		:aria-expanded="isShowingDropdown.toString()"
	>
		<slot name="menuToggler"></slot>

		<transition name="dropdown-transition">
			<slot name="menuList"></slot>
		</transition>
	</div>
</template>

<script>
export default {
	props: {
		isShowingDropdown: {
			type: Boolean,
			required: true
		},
		togglerRef: {
			type: String,
			required: true
		},
		togglerRegionRef: String
	},
	watch: {
		isShowingDropdown (value) {
			if (value) {
				this.$store.commit('showingAnyPopup', this.isShowingDropdown)
			}

			const dropdownToggler = this.$parent.$refs[this.togglerRef]

			this.$nextTick(() => {
				if (this.isShowingDropdown) {
					dropdownToggler.focus() // This allows the user to press the tab key once and the browser will focus on the dropdown's first menu item.
					document.activeElement.blur() // Immediately blur to allow the user could then close it via keyboard shortcut, while still having the browser remember the previous focus position.
				} else {
					dropdownToggler.blur()
				}
			})
		},
		'$store.state.showingAnyPopup' (isShowing) {
			/* Automatically close the dropdown by alternative triggers, such as the user pressing the Esc key or opening another popup element. */
			if (!isShowing) {
				this.$emit('hideDropdown')
			}
		}
	},
	mounted () {
		document.addEventListener(
			'click', this.closeDropdownOnOutsideClick
		)
	},
	destroyed () {
		document.removeEventListener(
			'click', this.closeDropdownOnOutsideClick
		)
	},
	methods: {
		closeDropdownOnOutsideClick (event) {
			if (!this.isShowingDropdown) return

			const parentRefs = this.$parent.$refs

			if (parentRefs[this.togglerRef].contains(event.target)) return

			if (
				parentRefs[this.togglerRegionRef] &&
				parentRefs[this.togglerRegionRef].contains(event.target)
			) return

			this.$emit('hideDropdown')
		}
	}
}
</script>
