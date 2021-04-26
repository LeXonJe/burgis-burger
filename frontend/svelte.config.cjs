const sveltePreprocess = require('svelte-preprocess');

/** @type {import('@sveltejs/kit').Config} */
module.exports = {
	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',

		files: {
			assets: 'public/'
		}
	},

	preprocess: sveltePreprocess()
};
