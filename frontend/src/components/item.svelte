<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	const add = () => dispatch('add');
	const remove = () => dispatch('remove');
	const deleteItem = () => dispatch('delete');

	export let order;
</script>

<div class={'item-order'}>
	<img src={order.image} alt={'Item'} />
	<div class={'info'}>
		<div class={'title'}>
			{order.name}
		</div>
		<span class={'cost'}>
			{order.price} Punkte
		</span>
		<span class={'sm-btn delete-btn'} on:click={deleteItem}>x</span>
		<span class={'counter'}>
			<span class={'sm-btn add'} on:click={add}> + </span>
			<span class={'number'}>{order.quantity}x</span>
			<span class={'sm-btn remove'} on:click={remove}> − </span>
		</span>
	</div>
</div>

<style lang="scss">
	@import '../styles/colors.scss';

	.item-order {
		padding: 1rem;

		display: grid;
		place-items: center start;
		grid-template-columns: 5rem auto;

		background-color: $background;
		border-radius: 4px;

		transition: background-color 150ms ease;

		&:hover {
			background-color: lighten($background, 2);
		}

		img {
			place-self: center;
			width: 60%;
		}

		.info {
			width: 100%;
			place-self: center;

			display: grid;
			grid-template-columns: 2fr 1fr;
			grid-template-rows: repeat(2, 1fr);

			.title {
				font-size: clamp(0.5rem, 1.3vw, 1.5rem);
				font-weight: 800;

				color: $primary;
			}

			.sm-btn {
				font-size: 0.8rem;
				font-weight: 900;

				background-color: $background-light;

				display: inline-grid;
				place-items: baseline center;

				width: 20px;
				height: 20px;

				border-radius: 5px;

				-webkit-user-select: none; /* Safari */
				-ms-user-select: none; /* IE 10 and IE 11 */
				user-select: none; /* Standard syntax */

				&:hover {
					cursor: pointer;
				}
			}

			.delete-btn {
				grid-area: 1 / 2;
				place-self: start end;

				background-color: red;

				opacity: 0;

				transition: opacity 150ms ease;

				&:hover {
					cursor: pointer;
				}
			}

			.cost {
				grid-area: 2 / 1;
				font-size: clamp(0.8rem, 0.9vw, 1rem);
				font-weight: 500;
			}

			.counter {
				grid-area: 2 / 2;
				place-self: end end;

				display: grid;
				grid-template-columns: 1fr 2fr 1fr;
				place-items: baseline center;

				.number {
					font-weight: 500;
				}
			}
		}

		&:hover {
			.delete-btn {
				display: inline-grid;
				opacity: 1;
			}
		}
	}
</style>
