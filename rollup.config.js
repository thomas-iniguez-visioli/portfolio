import path from 'path';
import alias from '@rollup/plugin-alias';
import replace from '@rollup/plugin-replace';
import vue from 'rollup-plugin-vue';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import css from 'rollup-plugin-css-only';
import postcss from 'rollup-plugin-postcss';
import routes from './src/router/index'
export default {
    input: "./src/main.js",// Point d'entrée
    output: {
        dir: 'dist',
        format: 'es',
        entryFileNames: '[name].js',
        chunkFileNames: '[name]-[hash].js',
        assetFileNames: '[name].[ext]'
    },
    plugins: [
        alias({
            entries: [
                { find: '@', replacement: path.resolve("./", 'src') }
            ]
        }),
        replace({
            'process.env.NODE_ENV': JSON.stringify('production'),
            preventAssignment: true
        }),
        nodeResolve(), // Résout les imports de modules
        commonjs(), // Convertit CommonJS en ESM
        vue({ preprocessStyles: true, compilerOptions: { whitespace: 'condense' } }), // Configure Vue pour Rollup
        css({ output: 'bundle.css' }), // Extrait les fichiers CSS en un seul fichier
        postcss({
            extract: true, // Génère un fichier CSS distinct
            minimize: true, // Minifie le CSS
            plugins: [require('autoprefixer')()] // Ajoute des préfixes CSS automatiquement
        })
    ]
};
