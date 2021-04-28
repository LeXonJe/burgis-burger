<script>
	import { browser } from '$app/env';
	import { session } from '$app/stores';
	import Grid from '$lib/grid.svelte';
	import Cart from '$lib/cart.svelte';
	import { onDestroy } from 'svelte';
	import { BACKEND_PATH } from '$lib/env.svelte';

	let menu;
	let selected = {};
	$: orders = Object.values(selected);

	function addItem(item) {
		if (item._id in selected) {
			selected[item._id].quantity += 1;
		} else {
			selected[item._id] = {
				...item,
				quantity: 1
			};
		}
	}

	function removeItem(item) {
		if (item._id in selected) {
			selected[item._id].quantity -= 1;
			if (selected[item._id].quantity < 1) {
				deleteItem(item);
			}
		} else {
			throw new Error('Could not find item. Failed to remove it.');
		}
	}

	function deleteItem(item) {
		if (item._id in selected) {
			selected = delete selected[item._id] && selected;
		} else {
			throw new Error('Could not find item. Failed to delete it.');
		}
	}

	const url = BACKEND_PATH;

	if (browser) {
		fetch(url + 'menu')
			.then((response) => {
				response.json().then(({ response }) => {
					menu = response;
				});
			})
			.catch((e) => console.error(e));
	}

	const unsubscribe = session.subscribe((data) => {
		if (!('list' in data)) {
			console.log('No data found. Creating list...');
			data.list = {};
		}

		// Getting reference so the orders is directly updated
		selected = data.list;
	});

	onDestroy(unsubscribe);
</script>

<svelte:head>
	<title>Burgis Burger - Bestellung</title>
</svelte:head>

<div class={'menu-container'}>
	<span class={'title'}>So, auf was hast du Bock?</span>
	<Grid class={'menu'} items={menu} on:additem={(e) => addItem(e.detail)} />
	<span class={'soon'}>Mehr Sortiment gefällig? Coming Soon!</span>
</div>
<Cart
	{orders}
	on:add={(e) => addItem(e.detail)}
	on:remove={(e) => removeItem(e.detail)}
	on:delete={(e) => deleteItem(e.detail)}
/>

<style lang="scss">
	@import '../styles/colors.scss';
	@import '../styles/proportions.scss';

	.menu-container {
		padding: calc(#{$header-h} + 1rem) $p-padding-w $p-padding-w;
		width: calc(100vw - #{$o-cart-w} - 2 * #{$p-padding-w});

		display: grid;
		gap: clamp(0.5rem, 1.6vw, 2rem);

		.title {
			font-size: clamp(1rem, 2.5vw, 3rem);
			font-weight: 900;
		}

		.soon {
			place-self: center;
			margin-top: 1rem;

			color: $text-secondary;

			font-size: clamp(1rem, 2vw, 1.5rem);
			font-weight: 500;
		}
	}
</style>
