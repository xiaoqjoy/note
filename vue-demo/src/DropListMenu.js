import E from 'wangeditor' // npm 安装
const { $, BtnMenu, DropListMenu, PanelMenu, DropList, Panel, Tooltip } = E
var _this = null


export default class DropMenu extends DropListMenu {

    constructor(editor) {
        // 菜单栏中，标题菜单的 DOM 元素
        // 注意，这里的 $ 不是 jQuery ，是 E.$ （wangEditor 自带的 DOM 操作工具，类似于 jQuery）
        // data-title属性表示当鼠标悬停在该按钮上时提示该按钮的功能简述
        const $elem = $('<div class="w-e-menu" data-title="插入代码" style="font-size: 15px;width: 100px;">插入代码</div>')

        // droplist 配置
        const dropListConf = {
            width: 100,
            title: '',
            type: 'list',
            list: [
                { $elem: $('<span>股票名称</span>'), value: '{{股票名称}}' },
                { $elem: $('<span>代码</span>'), value: '{{代码}}' },
                { $elem: $('<span>时间</span>'), value: '{{时间}}' }
            ],
            // droplist 每个 item 的点击事件
            clickHandler: (value) => {
                // value 参数即 dropListConf.list 中配置的 value
                this.command(value)
            },
        }

        super($elem, editor, dropListConf)
    }

    command(value) {

        console.log(value)


        // 设置标题
        this.editor.cmd.do('formatBlock', value)

        this.editor.cmd.do('insertHTML', value)
    }

    // 菜单是否需要激活
    tryChangeActive() {
        const reg = /^h/i
        const cmdValue = this.editor.cmd.queryCommandValue('formatBlock')
        if (reg.test(cmdValue)) {
            // 选区处于标题内，激活菜单
            this.active()
        } else {
            // 否则，取消激活
            this.unActive()
        }
    }
}