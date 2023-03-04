import { Configuration, DefinePlugin } from 'webpack';
import path from 'path';
import { buildCssLoader } from '../build/loaders/buildCssLoader';
import { BuildPaths } from '../build/types/config';

export default ({ config }: { config: Configuration }) => {
    const paths: BuildPaths = {
        build: '',
        entry: '',
        html: '',
        src: path.resolve(__dirname, '..', '..', 'src'),
    };

    config!.resolve!.modules!.push(paths.src);
    config!.resolve!.extensions!.push('.ts', '.tsx');
    config!.module!.rules!.push(buildCssLoader(true));

    // eslint-disable-next-line no-param-reassign
    config!.module!.rules = config!.module!.rules!.map((rule) => {
        if (typeof rule !== 'object') return rule;
        if (/svg/.test(rule.test as string)) {
            return { ...rule, exclude: /\.svg$/i };
        }
        return rule;
    });

    config!.module!.rules.push({
        test: /\.svg$/,
        use: ['@svgr/webpack'],
    });

    config!.plugins!.push(
        new DefinePlugin({
            __IS_DEV__: true,
            __API__: '',
        }),
    );

    return config;
};
