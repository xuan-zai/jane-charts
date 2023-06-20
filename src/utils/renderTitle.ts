/**
 * 对 title 进行处理
 * @param {string} title 图表名称
 * @param {object} options 图表名称的配置项
 */

const renderTitle = (title: string, options: any) => {

    /**
     * 默认的标题样式配置
     */
    const text_style = {
        fontSize: 14, // 标题的字体大小
        color: "#000", // 标题颜色
    }

    const set_title = {
        text: title, // 标题
        left: options.left || 'center', // 标题显示的位置
        show: options.show === undefined ?  true : options.show, // 是否显示标题
        subtext: options.sub_option.sub_title || null, // 子标题
        textStyle: {
            ...text_style,
            ...options.title_style, // 标题的样式配置，可以和官方的相结合
        }
    };

    return set_title;
}

export default renderTitle;