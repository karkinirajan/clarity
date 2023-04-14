
export default {
    modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt'],



    target: 'server',
    pinia: {
        autoImports: [
            // automatically imports `defineStore`
            'defineStore', // import { defineStore } from 'pinia'
            ['defineStore', 'definePiniaStore'], // import { defineStore as definePiniaStore } from 'pinia'
        ],
    },
    build: {
        buildDir: './build',
    }

};
