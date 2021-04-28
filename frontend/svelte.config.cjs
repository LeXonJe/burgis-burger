const sveltePreprocess = require('svelte-preprocess');
const adapter = require('@sveltejs/adapter-node');

/** @type {import('@sveltejs/kit').Config} */
module.exports = {
	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',

    adapter: adapter({ out: 'build' }),

		files: {
			assets: 'public/'
		}
	},

	preprocess: sveltePreprocess()
};
