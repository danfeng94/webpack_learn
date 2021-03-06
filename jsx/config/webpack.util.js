// 入口配置和模板自动匹配
// =>为了不用每次新增页面都要新增入口页面配置，我们将入口配置改成自动匹配
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');

function getTemplate(name) {
    const files = glob.sync(`./src/pages/${name}/index.html`);
    if (files.length > 0) {
        return files[0];
    }
    return './src/template.html';
}

// 引入页面自定义模板配置
function setHtmlPlugin() {
    const files = glob.sync('./src/pages/**/index.jsx');
    const options = [];
    files.forEach(file => {
        const ret = file.match(/^\.\/src\/pages\/(\S*)\/index\.jsx$/);
        if (ret) {
            const name = ret[1];
            options.push(
                new HtmlWebpackPlugin({
                    filename: `${name}/index.html`,
                    template: getTemplate(name),
                    chunks: ['react_vendors', name, '[name]/index.css'],
                })
            );
        }
    });
    return options;
}

function setEntry() {
    const files = glob.sync('./src/pages/**/index.jsx');
    const entry = {};
    files.forEach(file => {
        const ret = file.match(/^\.\/src\/pages\/(\S*)\/index\.jsx$/);
        // console.log('>>>>>');
        // console.log(ret);
        if (ret) {
            entry[ret[1]] = {
                import: file,
                dependOn: 'react_vendors',
            };
        }
    });

    // 拆分react依赖
    entry['react_vendors'] = {
        import: ['react', 'react-dom'],
        filename: '_commom/[name].js',
    };

    return entry;
}

module.exports = {
    setEntry,
    setHtmlPlugin,
};
