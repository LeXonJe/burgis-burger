<script>
	import { createEventDispatcher } from 'svelte';

	const disptach = createEventDispatcher();

	export let points;
	export let items;
	export let active;

	const setActive = (item) => {
		disptach('active', item);
	};
</script>

<div class={'select-container'}>
	{#each items as item}
		<div class={'item ' + (item === active ? 'active' : '')} on:click={() => setActive(item)}>
			<span class={'factor'}>{Math.ceil(points / item.points)}x</span>
			<img src={item.image} alt={'Item'} />
			<span class={'info'}>
				<span class={'name'}>{item.name}</span>
				<span class={'points'}>{item.points} Punkt{item.points !== 1 ? 'e' : ''}</span>
			</span>
		</div>
	{/each}
</div>

<style lang="scss">
	@import '../styles/colors.scss';
	@import '../styles/proportions.scss';

	.select-container {
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		place-items: center;
		gap: clamp(1rem, 1.7vw, 2rem);

		.item {
			height: clamp(6rem, 11vw, 13rem);
			width: clamp(4rem, 8.3vw, 10rem);

			background-color: $background-light;
			border-radius: $p-radius;

			transition: all 100ms ease;
			transition-property: background-color, transform;

			padding: 0.5rem;

			display: grid;
			grid-template-columns: 1fr;
			grid-template-rows: 1fr 3fr 2fr;
			place-items: center;

			font-weight: 600;

			img {
				width: 50%;
				-webkit-user-select: none; /* Safari */
				-ms-user-select: none; /* IE 10 and IE 11 */
				user-select: none; /* Standard syntax */
			}

			.info {
				display: flex;
				flex-direction: column;

				.name {
					font-weight: 800;
					font-size: clamp(0.8rem, 1.3vw, 1.5rem);
				}

				.points {
					font-size: clamp(0.7rem, 0.9vw, 1rem);
				}
			}

			&.active {
				border: solid 2px $primary;
				transform: scale(1.1);
			}

			&:hover {
				cursor: pointer;
				background-color: $primary;
			}

			&:active {
				transition: background-color 100ms ease-out;
				background-color: $text-primary;
			}
		}
	}
</style>
