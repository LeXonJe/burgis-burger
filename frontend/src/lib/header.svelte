<script>
	import Logo from '../resources/logo.png';

	function logoSecret() {
		window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank');
	}
</script>

<div class={'header-container'}>
	<img class={'logo'} on:click={logoSecret} src={Logo} alt={'Logo'} />
	<span class={'text'}>BURGIS BURGER</span>
</div>

<style lang="scss">
	@import '../styles/colors.scss';
	@import '../styles/proportions.scss';

	.header-container {
		position: absolute;
		top: 0;
		left: $p-padding-w;
		z-index: 10;

		height: $header-h;

		display: flex;
		align-items: center;

		.logo {
			height: 100%;
			$radius: 6px;
			border-bottom-left-radius: $radius;
			border-bottom-right-radius: $radius;

			&:hover {
				cursor: pointer;
			}
		}

		.text {
			margin-left: 1rem;

			font-size: 2rem;
			font-weight: 900;

			color: $primary;
		}
	}
</style>
