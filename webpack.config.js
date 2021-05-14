const path = require('path');
const webpackMajorVersion = require('webpack/package.json').version.split('.')[0];
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');


const paths = {
    dir_src: 'src',
    dir_main: 'src/main',
    dir_frontend: 'src/main/frontend',
    dir_webapp: 'src/main/webapp',
    dir_build: 'src/main/webapp/build',
    file_built: 'src/main/webapp/index.html',
    dir_js: 'src/main/webapp/js',
    dir_style: 'src/main/webapp/style',
    dir_assets: 'src/main/webapp/media',
    ts_dir: 'src/main/webapp/build/ts',
    js_filename: 'build/js/frontend.js', // 'js/[name]-[hash].js',
    html_template: 'src/main/resources/templates/index.html',
}


module.exports = {
    mode: 'development',
    entry: path.resolve(paths.dir_frontend, 'index.jsx'),
    devtool: 'source-map', // devtool: 'inline-source-map'
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.jsx'],
    },

    output: {
        path: path.resolve(__dirname, paths.dir_webapp),
        filename: paths.js_filename,
        publicPath: '/',
    },

    plugins: [
        new HtmlWebpackPlugin({
            inject: 'body',
            template: paths.html_template,
        }),

        new MiniCssExtractPlugin({
            filename: "build/css/styles.css",
        })
    ],

    module: {
        rules: [
            {
                test: /\.(tsx|ts|js|jsx)$/,
                // in the `src` directory
                include: [path.resolve(__dirname, paths.dir_frontend)],
                exclude: /(node_modules)/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            //   transpileOnly: true,
                            happyPackMode: true
                        }
                    },
                ]
            },
            {
                test: /\.(css|scss)$/,
                // in the `src` directory
                include: [path.resolve(__dirname, paths.dir_frontend)],
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            // This enables local scoped CSS based in CSS Modules spec
                            // modules: true,
                            // generates a unique name for each class (e.g. app__app___2x3cr)
                            // localIdentName: '[name]__[local]___[hash:base64:5]',
                        },
                    },
                    // Add additional loaders here. (e.g. sass-loader)
                ],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                // type: "asset/resource",
                use: ['file-loader?name=/img/[name].[ext]'],
            },
            {
                test: /\.woff$/,
                use: ['file-loader?name=fonts/[name].[ext]'],
            }
        ]
    },
    devServer: {
        contentBase: path.resolve(__dirname, paths.dir_webapp),
        compress: true,
        port: 9000,
        hot: true,
    },
};

