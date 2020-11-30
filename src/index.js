/**
 * @file 入口文件
 * @author Lohoyo <824591872@qq.com>
 *
 */

import Webhint from './components/webhint';
import locales from './locales.json';

/* global ClientAddonApi */
if (window.ClientAddonApi) {
    ClientAddonApi.addLocales(locales);
    ClientAddonApi.defineComponent('san.widgets.components.webhint', Webhint);
}
