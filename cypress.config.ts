import { defineConfig } from 'cypress';

export default defineConfig({
    projectId: 'jiun2o',
    e2e: {
        setupNodeEvents(on, config) {
            // implement node event listeners here
        },

        baseUrl: 'http://localhost:3000/',
    },
});
