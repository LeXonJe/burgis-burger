<script>
	import { goto } from '$app/navigation';
	import { browser } from '$app/env';

	browser && setTimeout(() => goto('/'), 2000);
</script>

<div class="error-container">
	<h1>404</h1>
	<p>Ooops!</p>
	<span>Sie werden in Kürze weitergeleitet...</span>
</div>

<style lang="scss">
	.error-container {
		height: 100vh;
		width: 100vw;

		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		* {
			margin: 0;
			padding: 0;
		}

		h1 {
			font-size: 6rem;
			font-weight: 900;
		}

		p {
			font-size: 2rem;
			font-weight: 500;
		}

		span {
			font-size: 1.2rem;
			font-weight: 400;

			margin-top: 2rem;
		}
	}
</style>
