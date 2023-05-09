import babelRemoveAttributesPlugin from '../babel/babelRemoveAttributesPlugin';
import { BuildOptions } from '../types/config';

interface BuildBabelLoaderProps extends BuildOptions {
    isTsx: boolean;
}

export function buildBabelLoader(options: BuildBabelLoaderProps) {
    const { isDev, isTsx } = options;

    return {
        test: isTsx ? /\.(jsx|tsx)$/ : /\.(|js|ts)$/,
        exclude: /node_modules/,
        use: {
            loader: 'babel-loader',
            options: {
                cacheDirectory: true,
                presets: ['@babel/preset-env'],
                plugins: [
                    isTsx && [
                        babelRemoveAttributesPlugin(),
                        {
                            props: ['data-testid'],
                        },
                    ],
                    isDev && require.resolve('react-refresh/babel'),
                    [
                        '@babel/plugin-transform-typescript',
                        {
                            isTsx,
                        },
                    ],
                    '@babel/plugin-transform-runtime',
                ].filter(Boolean),
            },
        },
    };
}
