/**
 * @file 插件配置
 * @author Lohoyo <824591872@qq.com>
 *
 */

module.exports = api => {
    if (process.env.SAN_CLI_UI_DEV) {
        api.registerAddon({
            id: 'san.widgets.client-addon.dev3',
            url: 'http://localhost:8893/index.js'
        });
    } else {
        api.registerAddon({
            id: 'san.widgets.webhint.client-addon',
            path: 'san-cli-ui-widget-webhint/dist'
        });
    }

    api.registerWidget({
        id: 'san.widgets.webhint',
        title: 'san-cli-ui-widget-webhint.title',
        description: 'san-cli-ui-widget-webhint.description',
        icon: 'check-circle',
        component: 'san.widgets.components.webhint',
        minWidth: 2,
        minHeight: 1,
        maxWidth: 2,
        maxHeight: 1,
        maxCount: 1
    });

    api.onAction('san-cli-ui-widget-webhint.actions.lint', url => {
        const {execSync} = require('child_process');
        let lintRes;
        try {
            const res = execSync('npx hint ' + url, {encoding: 'utf8'})
        } catch (err) {
            if (err.stderr.indexOf('not an existing file nor a valid URL') !== -1) {
                return false;
            }
            lintRes = /".+"/.exec(err.stdout)[0];
        }
        execSync('open ' + lintRes);
        return true;
    });
}
