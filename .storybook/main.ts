import type { StorybookConfig } from '@storybook/react-webpack5';
const postCssModulesValues = require('postcss-modules-values');

const config: StorybookConfig = {
    stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/addon-onboarding',
        '@storybook/addon-interactions',
    ],
    framework: {
        name: '@storybook/react-webpack5',
        options: {},
    },
    docs: {
        autodocs: 'tag',
    },
    // @see https://storybook.js.org/docs/react/builders/webpack#override-the-default-configuration
    async webpackFinal(config, { configType }) {
        if (!config) {
            return config;
        }

        if (configType === 'DEVELOPMENT' && config.module?.rules) {
            const cssRules = config.module.rules.find(
                // @ts-expect-error
                // `rule` isn't configured with the correct type for some reason
                (rule) => rule && rule.test.toString() === '/\\.css$/'
            );
            if (!cssRules) {
                return config;
            }

            // @ts-expect-error
            // `rule` isn't configured with the correct type for some reason
            cssRules.use = [
                'style-loader',
                {
                    loader: 'css-loader',
                    options: {
                        modules: {
                            // enable css-loader for files end with .css instead of .module.css
                            auto: (resourcePath) =>
                                resourcePath.endsWith('.css'),
                        },
                    },
                },
                {
                    loader: 'postcss-loader',
                    options: {
                        postcssOptions: {
                            plugins: [postCssModulesValues],
                        },
                    },
                },
            ];
        }

        if (configType === 'PRODUCTION') {
            // Modify config for production
        }

        return config;
    },
};
export default config;
