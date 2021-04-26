<script>
	import { dev } from '$app/env';

	let item = {
		_id: '',
		name: '',
		image: ''
	};

	let url = dev
		? import.meta.env['VITE_DEV_BACKEND_PATH']
		: import.meta.env['VITE_PROD_BACKEND_PATH'];

	fetch(url + 'menu?type=burger')
		.then((response) => {
			response.json().then(({ response }) => {
				item = response[Math.floor(Math.random() * response.length)];
			});
		})
		.catch((e) => console.error(e));
</script>

<svelte:head>
	<title>Burgis Burger - Na? Hunger?</title>
</svelte:head>

<div id={'home-container'}>
	<div class={'order-now'}>
		<span class={'title'}>Na? Hast du Hunger?</span>
		<span class={'description'}>
			Lass dir dein Essen in wenigen Minuten liefern oder hole es selber bei uns ab!
		</span>
		<a href={'/order'} class={'btn order-btn'}> JETZT BESTELLEN </a>
	</div>
	<div class={'recommended'}>
		<img class={'item'} src={item?.image} alt={''} />
		<div class={'info'}>
			<span class={'id'}>{item?._id}</span>
			<span class={'name'}>{item?.name}</span>
		</div>
	</div>
</div>

<style lang="scss">
	@import '../styles/colors.scss';
	@import '../styles/proportions.scss';

	#home-container {
		display: grid;
		grid-template-columns: auto $h-sidebar-w;

		.order-now {
			height: 100vh;
			width: $h-start-w;

			margin-left: $p-padding-w;

			display: flex;
			flex-direction: column;
			align-items: flex-start;
			justify-content: center;

			.title {
				font-size: clamp(2rem, 5.5vw, 7rem);
				font-weight: 900;
			}

			.description {
				margin-top: 2rem;
				color: $text-secondary;
				font-weight: 700;
				font-size: clamp(1rem, 1.5vw, 3rem);
			}

			.order-btn {
				margin-top: 2rem;
			}
		}

		.recommended {
			grid-column: 2;
			height: 100vh;

			background-color: $primary;

			display: grid;
			place-items: center end;

			.item {
				height: clamp(1rem, 24vw, 26rem);
				position: absolute;
				top: 50%;
				right: $h-sidebar-w;
				transform: translate(50%, -50%);
			}

			.info {
				display: flex;
				flex-direction: column;

				margin-right: $p-padding-w;

				font-weight: 900;

				.id {
					color: $text-yellow;
					font-size: clamp(0.5rem, 3vw, 4rem);
					margin-bottom: -0.6rem;
				}

				.name {
					color: $text-black;
					font-size: clamp(1rem, 4vw, 5rem);
				}
			}
		}
	}
</style>
