export type BuildMode = 'production' | 'development';

export interface BuildPaths {
    entry: string;
    build: string;
    html: string;
    src: string;
}

export type Environment = 'storybook' | 'frontend' | 'jest';

export interface BuildOptions {
    mode: BuildMode;
    paths: BuildPaths;
    isDev: boolean;
    port: number;
    apiUrl: string;
    environment: Environment;
}

export interface BuildEnv {
    port: number;
    mode: BuildMode;
    apiUrl: string;
}
