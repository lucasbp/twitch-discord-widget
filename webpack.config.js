const fs = require('fs');
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
            contentBase: path.join(__dirname, 'public'),
            host: (argv.devrig ? 'localhost.rig.twitch.tv' : 'localhost'),
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            port: 8080,
        };

        if (fs.existsSync(path.resolve(__dirname, 'conf/server.key'))) {
            devServer.https = {
                key: fs.readFileSync(path.resolve(__dirname, 'conf/server.key')),
                cert: fs.readFileSync(path.resolve(__dirname, 'conf/server.crt')),
            };
        }
    }

    return {
        mode: environment,
        entry: {
            app: glob.sync('./src/app/**/*.js'),
            config: glob.sync('./src/pages/config/**/*'),
            panel: glob.sync('./src/pages/panel/**/*')
        },
        optimization: {
            minimize: true,
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
                    loader: 'babel-loader'
                },
                {
                    test: /\.s[ac]ss$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true,
                                url: false
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true,
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