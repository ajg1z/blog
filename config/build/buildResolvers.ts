import { ResolveOptions } from 'webpack';
import { BuildOptions } from './types/config';

export function buildResolvers(options: BuildOptions): ResolveOptions {
    return {
        extensions: ['.tsx', '.ts', '.js', '.jsx'],
        preferAbsolute: true,
        modules: [options.paths.src, 'node_modules'],
        alias: {
            '@': options.paths.src,
            'node:path': require.resolve('path-browserify'),
            'node:util': require.resolve('util/'),
        },
        fallback: {
            path: require.resolve('path-browserify'),
            util: require.resolve('util/'),
        },
        mainFiles: ['index'],
    };
}
