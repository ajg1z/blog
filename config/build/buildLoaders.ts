import webpack from 'webpack';
import { buildCssLoader } from './loaders/buildCssLoader';
import { BuildOptions } from './types/config';

export function buildLoaders(options: BuildOptions): webpack.RuleSetRule[] {
    // svg
    const svgLoader = {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
    };

    const babelLoader = {
        test: /\.m?ts|js|jsx|tsx$/,
        exclude: /node_modules/,
        use: {
            loader: 'babel-loader',
            options: {
                presets: [['@babel/preset-env', { targets: 'defaults' }]],
                plugins: [options.isDev && require.resolve('react-refresh/babel')].filter(Boolean),
            },
        },
    };

    // images
    const fileLoader = {
        test: /\.(png|jpe?g|gif|woff|woff2)$/i,
        use: [
            {
                loader: 'file-loader',
            },
        ],
    };

    // typescript + babel(jsx)
    const typescriptLoader = {
        test: /\.tsx?$/,
        use: [
            {
                loader: 'ts-loader',
            },
        ],
        exclude: /node_modules/,
    };

    // css + scss + scss modules
    const cssLoader = buildCssLoader(options.isDev);

    return [fileLoader, svgLoader, babelLoader, typescriptLoader, cssLoader];
}
