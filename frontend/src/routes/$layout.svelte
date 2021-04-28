<script>
	import Header from '$lib/header.svelte';
</script>

<Header />
<slot />

<style lang="scss">
	@import '../styles/colors.scss';
	@import '../styles/proportions.scss';

	:global {
		#svelte {
			color: $text-primary;
		}

		body {
			background-color: $background;

			overflow-x: hidden;
			overflow-y: auto;
		}

		*::selection {
			background: $primary;
			color: $text-primary;
		}

		*::-moz-selection {
			background: $primary;
			color: $text-primary;
		}

		a {
			text-decoration: none;
			color: $text-primary;
		}

		a:hover {
			cursor: pointer;
		}

		ul {
			list-style: none;
			margin: 0;
			padding: 0;
		}

		// Scrollbar
		/* Works on Firefox */
		* {
			scrollbar-width: none;
			scrollbar-color: $scrollbar-foreground $scrollbar-background;
		}

		/* Works on Chrome, Edge, and Safari */
		*::-webkit-scrollbar {
			width: none;
		}

		*::-webkit-scrollbar-track {
			background: $scrollbar-background;
		}

		*::-webkit-scrollbar-thumb {
			background-color: $scrollbar-foreground;
			border-radius: 20px;
			border: 3px solid $scrollbar-background;
		}

		// Custom Classes
		.btn {
			padding: 14px;
			border-radius: 3px;

			font-size: clamp(0.8rem, 1vw, 1.2rem);
			font-weight: 700;

			transition: all 0.2s ease;
			transition-property: color, background-color;

			-webkit-touch-callout: none;
			-webkit-user-select: none;
			-khtml-user-select: none;
			-moz-user-select: none;
			-ms-user-select: none;
			user-select: none;

			color: $text-black;
			background-color: $primary;

			display: inline-grid;
			place-items: center;

			&:hover {
				cursor: pointer;
				color: $primary;
				background-color: $text-black;
			}

			&.disabled {
				background-color: $text-secondary;

				&:hover {
					color: $text-black;
					cursor: not-allowed;
				}
			}
		}
	}
</style>
