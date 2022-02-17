const path = require('path');
const glob = require('glob');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require('copy-webpack-plugin');

const bundlePath = path.resolve(__dirname, 'dist/');

module.exports = (env, argv) => {
    let environment;
    let devServer;

    if ('mode' in argv && argv.mode == 'development') {
        environment = 'development';
    }
    else {
        environment = 'production';
    }

    if (environment == 'development') {
        devServer = {
            static: './public',
            host: 'localhost',
            port: 8080,
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        };
    }

    return {
        mode: environment,
        entry: {
            app: glob.sync('./src/app/**/*.js'),
            config: glob.sync('./src/pages/config/**/*'),
            panel: glob.sync('./src/pages/panel/**/*')
        },
        optimization: {
            minimize: true
        },
        output: {
            path: bundlePath,
            filename: '[name].bundle.js'
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/i,
                    exclude: /(node_modules|bower_components)/,
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                },
                {
                    test: /\.s[ac]ss$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: (environment == 'development' ? true : false),
                                url: false
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: (environment == 'development' ? true : false),
                                sassOptions: {
                                    outputStyle: 'compressed'
                                }
                            }
                        }
                    ]
                }
            ]
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: '[name].min.css'
            }),
            new CopyPlugin({
                patterns: [
                    { from: 'public', to: '.' }
                ]
            }),
        ],
        devtool: "source-map",
        devServer
    };
}