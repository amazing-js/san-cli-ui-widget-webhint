/**
 * @file webhint 组件
 * @author Lohoyo <824591872@qq.com>
 */

import './webhint.less';

export default {
    template: /* html */`
        <div class="webhint">
            <s-input placeholder="网页地址" value="{= inputValue =}" on-pressEnter="lint"></s-input>
            <s-button type="primary" loading="{{isLoading}}" on-click="lint" disabled="{{!inputValue}}">一键检查</s-button>
            <fragment s-if="isLinted && !isLoading">{{resultTips}}</fragment>
        </div>
    `,

    initData() {
        return {
            isLoading: false,
            isLinted: false,
            inputValue: '',
            resultTips: ''
        };
    },

    attached() {
        // 防止 locales.json 加载过慢，主动 set
        this.dispatch('Widget:title', this.$t(this.data.get('data.definition.title')));
    },

    async lint() {
        this.data.set('isLoading', true);
        const res = await this.$callPluginAction('san-cli-ui-widget-webhint.actions.lint', this.data.get('inputValue'));
        this.data.set('resultTips', res.results[0] ? '检查完毕，请在新标签页中查看结果。' : '检查失败，请输入有效的 URL。');
        this.data.set('isLoading', false);
        !this.data.set('isLinted') && this.data.set('isLinted', true);
    }
};
