<script>
	import { goto } from '$app/navigation';
	import { browser } from '$app/env';
	import { session } from '$app/stores';
	import { onDestroy } from 'svelte';
	import { BACKEND_PATH } from '$lib/env.svelte';
	import Select from '$lib/select.svelte';

	let points = 0;
	let sessionData = {};
	let money = [];
	$: active = money[0];
	$: isNotRound = (points / active?.points) % 1 != 0;

	const unsubscribe = session.subscribe((data) => {
		sessionData = data;
		if ('list' in data && 'details' in data) {
			const list = Object.values(data.list);
			list.forEach((order) => {
				points += order.price * order.quantity;
			});
		} else {
			browser && goto('/');
		}
	});

	const url = BACKEND_PATH;

	if (browser) {
		fetch(url + 'money')
			.then((response) => {
				response.json().then(({ response }) => {
					money = response;
				});
			})
			.catch((e) => console.error(e));
	}

	function setActive(e) {
		active = e.detail;
	}

	function submit() {
		const packet = {
			list: {},
			details: sessionData.details,
			pay: active._id
		};

		Object.values(sessionData.list).map((item) => {
			packet.list[item._id] = item.quantity;
		});

		fetch(url + 'order', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(packet)
		})
			.then(() => console.log('Sent order.'))
			.catch((e) => {
				throw e;
			});
		session.set({});
		goto('/thanks');
	}

	onDestroy(unsubscribe);
</script>

<svelte:head>
	<title>Burgis Burger - Zahlen</title>
</svelte:head>

<div id={'pay-container'}>
	<div class={'center'}>
		<div class={'title'}>Wie möchtest du bezahlen?</div>
		<div class={'select'}>
			<Select {points} items={money} {active} on:active={setActive} />
		</div>
		<div class={'points'}>
			<span class={'description c-1'}>Deine Bestellung kostet:</span>
			<span class={'count c-1'}>{points} Punkte</span>
			<span class={'description c-2'}>Du bezahlst mit:</span>
			<span class={'count c-2'}>{Math.ceil(points / active?.points)}x {active?.name}</span>
			{#if isNotRound}
				<span class={'info c-2'}>Du erhälst Wechselgeld.</span>
			{/if}
		</div>
		<span class={'btn'} on:click={submit}>KOSTENPFLICHTIG BESTELLEN</span>
	</div>
</div>

<style lang="scss">
	@import '../styles/colors.scss';

	#pay-container {
		height: 100%;
		width: 100%;

		display: grid;
		place-items: center;

		.center {
			display: grid;
			place-items: center;
			gap: clamp(1rem, 5.2vw, 3rem);

			text-align: center;

			.title {
				font-size: clamp(1.2rem, 2.5vw, 3rem);
				font-weight: 800;
			}

			.points {
				display: grid;
				grid-template-columns: repeat(2, 1fr);
				grid-template-rows: repeat(2, 3fr) clamp(0.6rem, 1vw, 1rem);
				place-items: start center;
				column-gap: 5rem;

				.c-1 {
					grid-column: 1;
				}

				.c-2 {
					grid-column: 2;
				}

				.description {
					font-size: clamp(1rem, 1.7vw, 2rem);
					font-weight: 600;

					grid-row: 1;

					color: $text-secondary;
				}

				.count {
					font-size: clamp(0.8rem, 1.7vw, 2rem);
					font-weight: 800;
				}

				.info {
					font-size: clamp(0.6rem, 1vw, 1rem);
					font-weight: 600;
				}
			}
		}
	}
</style>
