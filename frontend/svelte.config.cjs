const sveltePreprocess = require('svelte-preprocess');

/** @type {import('@sveltejs/kit').Config} */
module.exports = {
	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',

    vite: {
      define: {
        'DEV_BACKEND_PATH': JSON.stringify(process.env.DEV_BACKEND_PATH),
        'PROD_BACKEND_PATH': JSON.stringify(process.env.PROD_BACKEND_PATH),
      }
    },

		files: {
			assets: 'public/'
		}
	},

	preprocess: sveltePreprocess()
};
