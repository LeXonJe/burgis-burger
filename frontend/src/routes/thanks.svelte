<div id={'thanks-container'}>
	<span class={'title'}>VIELEN DANK!</span>
	<span class={'subtitle'}>Wir werden dir deine Bestellung umgehend liefern.</span>
	<a href={'/'} class={'btn btn-back'}>ZURÜCK ZUM HAUPTBILDSCHIRM</a>
</div>

<style lang="scss">
	@import '../styles/colors.scss';

	#thanks-container {
		height: 100vh;
		width: 100vw;

		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;

		font-weight: 800;

		.title {
			font-size: clamp(3.8rem, 5vw, 6rem);

			color: $primary;
		}

		.subtitle {
			font-size: clamp(1rem, 2vw, 2rem);
		}

		.btn-back {
			margin-top: 5rem;
		}
	}
</style>
