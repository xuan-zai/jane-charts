import { getMax, getMin } from './calculate';
import { isNullObject } from './judgement';

/**
 * 处理标题数据
 * @param {string}  title 标题数据
 * @param {object}  config 标题配置项
 */
const processingTitle = (title, config = {}) => {
    let titleOption = {};
    // 首先判断是不是空值，空值就直接返回
    if (!title || (typeof title === 'object' && isNullObject(title))) {
        return null;
    }
    // 接下来都是有数据的，在判断是字符串还是对象
    if (typeof title === 'string') {
        titleOption = {
            text: title
        };
    } else {
        const { text = '', sub = '' } = title;
        titleOption = {
            text,
            subtext: sub
        }
    }
    return {
        ...titleOption,
        textStyle: {
            fontSize: 14
        }
    };
}


// 这里其实是相反的，基础的情况下
// 如果传递了 x，没有传递 y，那么 y 则是 {type: value}
// 如果传递了 y，没有传递 x，那么 x 则是 {type: value}
// 还有一种情况，两个都传递了，但是只有一方传递了 data。
const processingAxis = (data, config = {}) => {
    const x = data.x;
    const y = data.y;
    const axis = {};
    // 判断有没有 x，这一块是进行数据的处理
    if (x) {
        // 有 x 的话，判断是数组还是对象,
        // 是数组的话，代表着这个数据就是 data
        if (x instanceof Array) {
            axis['xAxis'] = {
                data: x.data || x
            }
            if (y && !isNullObject(y)) {
                axis['yAxis'] = {
                    type: 'value',
                    ...y
                }
            } else {
                axis['yAxis'] = {
                    type: 'value',
                }
            }
        } else {
            // 如果 x 是对象，那么就需要看 x 中有没有 data
            const x_data = x.data;
            if (x_data) {
                // 如果有 data，说明就是柱状图
                axis['xAxis'] = {
                    data: x.data,
                }
                // 如果编写了 unitConfig 这个字段，并且不是空值的话，那么就是需要单位
                if (x.unitConfig && !isNullObject(x.unitConfig)) {
                    axis['xAxis'].axisLabel = {
                        formatter: (val) => {
                            if (x.unitConfig.location === 'before') {
                                return x.unitConfig.unit + val;
                            } else {
                                return val + x.unitConfig.unit;
                            }
                        }
                    }
                }
                if (y && !isNullObject(y)) {
                    axis['yAxis'] = {
                        type: 'value',
                        ...y
                    }
                } else {
                    axis['yAxis'] = {
                        type: 'value',
                    }
                }
            } else {
                // 没有的话，就是条形图
                if (y instanceof Array) {
                    axis['yAxis'] = {
                        data: y
                    };
                    axis['xAxis'] = {
                        type: 'value',
                        // ...x
                    }
                }
            }
        }
    } else {
        // 如果没有 x 的话，那么看是否有 y
        if (y) {
            if (y instanceof Array) {
                axis['yAxis'] = [{
                    data: y
                }];
                axis['xAxis'] = [{
                    type: 'value'
                }]
            }
        } else {
            // 如果没有 x 也没有 y 的话，那么默认 x 的 type 为 category
            axis['xAxis'] = [{
                type: 'category'
            }];
            axis['yAxis'] = {
                type: 'value',
            }
        }
    }

    // 这一块是样式的处理
    if (config.x) {
        const xAxisShow = config.x.show; // 首先查看 x 轴是否需要显示
        if (typeof xAxisShow !== 'undefined') {
            // 如果 xAxisShow 的值为 false 的话，后面关于 x 轴的样式就不生效了
            if (xAxisShow === false) {
                axis['xAxis'].show = xAxisShow;
            } else {
                axis['xAxis'].show = xAxisShow;

                // 轴线
                if (typeof config.x.lineStyle === 'object' && !isNullObject(config.x.lineStyle)) {
                    const { show, color } = config.x.lineStyle;
                    if (typeof show !== 'undefined') {
                        if (show === false) {
                            axis['xAxis']['axisLine'] = {
                                show: show
                            }
                        } else {
                            axis['xAxis']['axisLine'] = {
                                show: show,
                                lineStyle: {
                                    color
                                }
                            }
                        }
                    }
                }
                // 刻度
                if (typeof config.x.tickStyle === 'object' && !isNullObject(config.x.tickStyle)) {
                    const { show } = config.x.tickStyle;
                    if (typeof show !== 'undefined') {
                        if (show === false) {
                            axis['xAxis']['axisTick'] = {
                                show: show
                            }
                        } else {
                            axis['xAxis']['axisTick'] = {
                                show: show,
                            }
                        }
                    }
                }
                // 标签
                if (typeof config.x.labelStyle === 'object' && !isNullObject(config.x.labelStyle)) {
                    const { show } = config.x.labelStyle;
                    if (typeof show !== 'undefined') {
                        if (show === false) {
                            axis['xAxis']['axisLabel'] = {
                                ...axis['xAxis'].axisLabel,
                                show: show
                            }
                        } else {
                            axis['xAxis']['axisLabel'] = {
                                ...axis['xAxis'].axisLabel,
                                show: show,
                                inside: config.x.labelStyle.inside || false,
                                rotate: config.x.labelStyle.rotate || 0,
                                fontSize: config.x.labelStyle.fontSize || 10
                            }
                        }
                    }
                }
                // 分割线
                if (typeof config.x.splitLine === 'object' && !isNullObject(config.x.splitLine)) {
                    const { show } = config.x.splitLine;
                    if (typeof show !== 'undefined') {
                        if (show === false) {
                            axis['xAxis']['splitLine'] = {
                                show: show
                            }
                        } else {
                            axis['xAxis']['splitLine'] = {
                                show: show,
                            }
                        }
                    }
                }
            }
        }
    }

    if (config.y) {
        const yAxisShow = config.y.show; // 首先查看 x 轴是否需要显示
        if (typeof yAxisShow !== 'undefined') {
            // 如果 xAxisShow 的值为 false 的话，后面关于 x 轴的样式就不生效了
            if (yAxisShow === false) {
                axis['yAxis'].show = yAxisShow;
            } else {
                axis['yAxis'].show = yAxisShow;

                // 轴线
                if (typeof config.y.lineStyle === 'object' && !isNullObject(config.y.lineStyle)) {
                    const { show, color } = config.y.lineStyle;
                    if (typeof show !== 'undefined') {
                        if (show === false) {
                            axis['yAxis']['axisLine'] = {
                                show: show
                            }
                        } else {
                            axis['yAxis']['axisLine'] = {
                                show: show,
                                lineStyle: {
                                    color
                                }
                            }
                        }
                    }
                }
                // 刻度
                if (typeof config.y.tickStyle === 'object' && !isNullObject(config.y.tickStyle)) {
                    const { show } = config.y.tickStyle;
                    if (typeof show !== 'undefined') {
                        if (show === false) {
                            axis['yAxis']['axisTick'] = {
                                show: show
                            }
                        } else {
                            axis['yAxis']['axisTick'] = {
                                show: show,
                            }
                        }
                    }
                }
                // 标签
                if (typeof config.y.labelStyle === 'object' && !isNullObject(config.y.labelStyle)) {
                    const { show } = config.y.labelStyle;
                    if (typeof show !== 'undefined') {
                        if (show === false) {
                            axis['yAxis']['axisLabel'] = {
                                show: show
                            }
                        } else {
                            axis['yAxis']['axisLabel'] = {
                                show: show,
                                inside: config.x.labelStyle.inside || false,
                                rotate: config.x.labelStyle.rotate || 0,
                                fontSize: config.x.labelStyle.fontSize || 10
                            }
                        }
                    }
                }
                // 分割线
                if (typeof config.y.splitLine === 'object' && !isNullObject(config.y.splitLine)) {
                    const { show } = config.y.splitLine;
                    if (typeof show !== 'undefined') {
                        if (show === false) {
                            axis['yAxis']['splitLine'] = {
                                show: show
                            }
                        } else {
                            axis['yAxis']['splitLine'] = {
                                show: show,
                            }
                        }
                    }
                }
            }
        }
    }

    return axis;
}

const processingSeries = (series, config = {}, type) => {
    if ((typeof series === 'object' && isNullObject(series))) {
        return null;
    }

    if (series instanceof Array) {
        return series.map(ele => {
            return {
                ...ele
            }
        })
    } else {
        return {
            data: series.data,
            type: series.type || type || 'bar'
        }
    }
}

/**
 * 处理所传过来的数据
 * @param {string} type 图表类型
 * @param {object} data 图表数据
 * @param {object} config 图表配置项
 * @return 返回的是图表需要的 option
 */
const processing = (type: string, data = {}, config = {}) => {
    let option = {};
    // type
    // bar: 基础柱状图
    if (type === 'bar' || type === 'line') {
        // 对于标题的处理
        const title = processingTitle(data.title);
        title && (option['title'] = title);

        option = {
            ...option,
            ...processingAxis(data, config.axis)
        }

        // 对于 series 的处理
        if (data.series) {
            const series = processingSeries(data.series, {}, type);
            series && (option['series'] = series);
        }
    }

    if (option['series'] instanceof Array) {
        option['series'].length > 0 && option['series'].forEach(ele => {
            // 判断有没有设置 color 属性
            if (config.color) {
                // 设置了的话，需要添加到 option 中
                option["color"] = config.color;
            };
            // 判断有没有设置特殊的颜色，默认是移入改变柱体颜色
            if (config.activeColor) {
                for (const key in ele) {
                    ele.emphasis = {
                        itemStyle: {
                            color: config.activeColor
                        }
                    }
                }
            }
            // 判断有没有对背景色进行设置
            if (config.bgcolor) {
                // 首先判断，show 的值是否为 false，如果是 false 或者没有填写的话，则不需要显示背景色
                if (typeof config.bgcolor.show && config.bgcolor.show === true) {
                    for (const key in ele) {
                        ele = {
                            ...ele,
                            showBackground: config.bgcolor.show,
                            backgroundStyle: {
                                color: config.bgcolor.color,
                                borderRadius: config.bgcolor.round || 9,
                            }
                        }
                    }
                }
            }
            // 判断有没有对每个柱状进行单独的设置
            if (config.barStyle) {
                for (const key in ele) {
                    if (config.barStyle.width) {
                        ele.barWidth = config.barStyle.width;
                    }
                    if (config.barStyle.round) {
                        ele.itemStyle = {
                            borderRadius: config.barStyle.round,
                            color: config.barStyle.color || null,
                        }
                    }
                }
            }
        })
        // 
    } else {
        // 判断有没有设置 color 属性
        if (config.color) {
            // 设置了的话，需要添加到 option 中
            option["color"] = config.color;
        };
        // 判断有没有设置特殊的颜色，默认是移入改变柱体颜色
        if (config.activeColor) {
            for (const key in option['series']) {
                option['series'].emphasis = {
                    itemStyle: {
                        color: config.activeColor
                    }
                }
            }
        }
        // 判断有没有对背景色进行设置
        if (config.bgcolor) {
            // 首先判断，show 的值是否为 false，如果是 false 或者没有填写的话，则不需要显示背景色
            if (typeof config.bgcolor.show && config.bgcolor.show === true) {
                for (const key in option['series']) {
                    option['series'] = {
                        ...option['series'],
                        showBackground: config.bgcolor.show,
                        backgroundStyle: {
                            color: config.bgcolor.color,
                            borderRadius: config.bgcolor.round || 9,
                        }
                    }
                }
            }
        }
        // 判断有没有对每个柱状进行单独的设置
        if (config.barStyle) {
            for (const key in option['series']) {
                if (config.barStyle.width) {
                    option['series'].barWidth = config.barStyle.width;
                }
                if (config.barStyle.round) {
                    option['series'].itemStyle = {
                        borderRadius: config.barStyle.round,
                        color: config.barStyle.color || null,
                    }
                }
            }
        }
        // 判断有没有设置动画属性
        if (config.animation) {
            const { delay } = config.animation;
            option['series'].animationDelay = function (idx: any) {
                return idx * delay
            }
        }
    }
    option['grid'] = {
        bottom: '12%'
    }
    return option;
}

export default processing;