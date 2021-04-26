<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	const onClick = (item) => {
		dispatch('additem', item);
	};

	export let items = [];
</script>

<div class={'grid ' + $$props.class}>
	{#each items as item}
		<div on:click={() => onClick(item)} class="item">
			<img src={item.image} alt={'Item'} />
		</div>
	{/each}
</div>

<style lang="scss">
	@import '../styles/colors.scss';
	@import '../styles/proportions.scss';

	.grid {
		display: grid;
		grid-template-columns: repeat(7, 1fr);
		grid-auto-rows: 1fr;
		gap: clamp(0.5rem, 1.8vw, 2rem);

		.item {
			height: 100%;
			width: 100%;

			background-color: $background-light;
			border-radius: $p-radius;

			transition: background-color 200ms ease;

			display: grid;
			place-items: center;

			img {
				width: 60%;
				-webkit-user-select: none; /* Safari */
				-ms-user-select: none; /* IE 10 and IE 11 */
				user-select: none; /* Standard syntax */
				grid-area: 1 / 1 / 2 / 2;
			}

			&::before {
				content: '';
				padding-bottom: 100%;
				display: block;
				grid-area: 1 / 1 / 2 / 2;
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
