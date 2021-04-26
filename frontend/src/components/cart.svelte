<script>
	import { createEventDispatcher, onDestroy } from 'svelte';
	import { session } from '$app/stores';
	import { goto } from '$app/navigation';
	import ItemOrder from './item.svelte';

	let details;

	export let orders;

	// To validate that the user has entered all information needed
	$: hasOrdered =
		orders.length > 0 &&
		details.name &&
		(details.deliver ? details.x && details.y && details.z : true);

	const dispatch = createEventDispatcher();

	function filterCoords() {
		let newValue = this.value.match(/-?\d*/g);
		this.value = (newValue && newValue[0]) || '';
	}

	function addItem(item) {
		dispatch('add', item);
	}

	function removeItem(item) {
		dispatch('remove', item);
	}

	function deleteItem(item) {
		dispatch('delete', item);
	}

	const unsubscribe = session.subscribe((data) => {
		if (!('details' in data)) {
			console.log('No data found. Creating details...');
			data.details = {
				deliver: false
			};
		}

		details = data.details;
	});

	function submit() {
		if (hasOrdered) {
			goto('/pay');
		}
	}

	onDestroy(unsubscribe);
</script>

<div class={'cart-container'}>
	<div class={'title-section'}>Dein Warenkorb:</div>
	<div class={'bg-yellow'}>
		<div class={'list-section'}>
			<div class={'list'}>
				{#each orders as order}
					<ItemOrder
						{order}
						on:add={() => addItem(order.item)}
						on:remove={() => removeItem(order.item)}
						on:delete={() => deleteItem(order.item)}
					/>
				{/each}
			</div>
		</div>
	</div>
	<div class={'bg-grey'}>
		<div class={'submit-section'}>
			<div class={'form'}>
				<span class={'text-name'}>Wer bekommt diese Bestellung?</span>
				<input type="text" placeholder={'Name'} class={'name'} bind:value={details.name} />
				<span class={'text-location'}>
					<input type="checkbox" id="deliver" bind:checked={details.deliver} />
					<label for="deliver">Diese Bestellung soll geliefert werden:</label>
				</span>
				<span class={'location'}>
					<input
						type="text"
						placeholder={'X'}
						class={'coordinate'}
						on:input={filterCoords}
						disabled={!details.deliver}
						bind:value={details.x}
					/>
					<input
						type="text"
						placeholder={'Y'}
						class={'coordinate'}
						on:input={filterCoords}
						disabled={!details.deliver}
						bind:value={details.y}
					/>
					<input
						type="text"
						placeholder={'Z'}
						class={'coordinate'}
						on:input={filterCoords}
						disabled={!details.deliver}
						bind:value={details.z}
					/>
				</span>
				<span class={'btn order-btn ' + (hasOrdered ? '' : 'disabled')} on:click={submit}
					>ZAHLUNGSART AUSWÄHLEN</span
				>
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	@import '../styles/colors.scss';
	@import '../styles/proportions.scss';

	.cart-container {
		position: fixed;
		right: 0;
		bottom: 0;

		display: grid;

		width: $o-cart-w;

		.title-section {
			place-self: start;

			display: grid;
			place-items: center;

			font-size: 1.5rem;
			font-weight: 800;

			padding: 0 1rem;

			height: $c-title-h;

			border-top-left-radius: $p-radius;
			border-top-right-radius: $p-radius;
			color: $text-black;
			background-color: $primary;
		}

		.bg-yellow {
			display: grid;
			grid-template-columns: 1fr;
			grid-template-rows: 1fr;

			&::before {
				grid-row: 1;
				grid-column: 1;
				content: '';
				background-color: $primary;
				z-index: -1;
			}

			.list-section {
				grid-row: 1;
				grid-column: 1;

				background-color: $background-light;
				border-top-left-radius: $p-radius;

				height: $c-list-h;
				overflow-y: scroll;

				scrollbar-width: thin;

				&::-webkit-scrollbar {
					width: thin;
				}

				.list {
					display: grid;
					gap: 1rem;

					padding: clamp(1rem, 1.7vw, 2rem);
				}
			}
		}

		.bg-grey {
			display: grid;
			grid-template-columns: 1fr;
			grid-template-rows: 1fr;

			&::before {
				grid-row: 1;
				grid-column: 1;
				content: '';
				height: $c-submit-h;
				background-color: $background-light;
				z-index: -1;
			}

			.submit-section {
				grid-row: 1;
				grid-column: 1;

				height: $c-submit-h;

				border-top-left-radius: $p-radius;
				color: $text-black;
				background-color: $text-primary;

				display: grid;
				place-items: center;

				.form {
					height: calc(#{$c-submit-h} - 2rem);

					display: grid;
					grid-template-columns: 1fr;
					place-items: center stretch;
					column-gap: 1rem;
					padding: 1rem;

					font-size: clamp(0.5rem, 1.2vw, 1.4rem);
					font-weight: 800;

					vertical-align: baseline;

					#deliver {
						margin-left: 0;
					}

					.location {
						display: inline-flex;

						.coordinate {
							width: calc((#{$o-cart-w} - 2rem) / 3 - 2rem);
							margin-right: 1rem;

							&:last-child {
								margin-right: 0;
							}
						}
					}

					.order-btn {
						margin-top: 0;
						padding: 0.8rem;
						font-size: 1rem;
					}
				}
			}
		}
	}
</style>
