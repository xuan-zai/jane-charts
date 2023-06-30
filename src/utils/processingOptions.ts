import { getMax, getMin } from './calculate';
import { isNullObject, judgementType, setAxisStyle } from './judgement';
import { processingXAxis, processingYAxis } from './axisUtils';

/**
 * 处理标题数据
 * @param {string}  title 标题数据
 * @param {object}  config 标题配置项
 */
const processingTitle = (title, config = {}) => {
    // 默认的标题配置
    const titleOption = {
        textStyle: {
            fontSize: 14
        }
    };
    // 首先判断是不是空值，空值就直接返回
    if (!title || (typeof title === 'object' && isNullObject(title))) {
        return null;
    }
    // 接下来都是有数据的，在判断是字符串还是对象
    return typeof title === 'string' ? ({ ...titleOption, text: title }) : ({ ...titleOption, text: title.text || '', subtext: title.sub || '' })
}


// 对 axis 数据进行处理
const processingAxis = (data, config = {}) => {
    const { x = null, y = null } = data;
    const axis = {};
    // 对轴线的数据进行处理
    axis['xAxis'] = judgementType(x, Array, processingXAxis);
    axis['yAxis'] = judgementType(y, Array, processingYAxis);
    // 设置完样式之后直接返回 axis 的 option
    return setAxisStyle(axis, config);
}

const processingSeries = (series, config = {}, type = 'bar') => {
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
            type: series.type || type
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

    if (config.legend) {
        const { show = false, location = {} } = config.legend;
        if (show) {
            option['legend'] = {
                ...location
            }
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

            if (config.lineStyle) {
                for (const key in ele) {
                    if (typeof config.lineStyle.smooth !== 'undefined') {
                        ele.smooth = config.lineStyle.smooth
                    }

                    if (!isNullObject(config.lineStyle) && !isNullObject(config.lineStyle.area) && config.lineStyle.area) {
                        if (typeof config.lineStyle.area.show !== 'undefined') {
                            if (config.lineStyle.area.show) {
                                ele.areaStyle = {
                                    opacity: 0.3,
                                }
                            }
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

        if (config.lineStyle) {
            for (const key in option['series']) {
                if (typeof config.lineStyle.smooth !== 'undefined') {
                    option['series'].smooth = config.lineStyle.smooth
                }
            }

            for (const key in option['series']) {
                if (!isNullObject(config.lineStyle) && !isNullObject(config.lineStyle.area) && config.lineStyle.area) {
                    console.log(config.lineStyle.area.show)
                    if (typeof config.lineStyle.area.show !== 'undefined') {
                        if (config.lineStyle.area.show) {
                            option['series'].areaStyle = {
                                opacity: 0.3,
                            }
                        }
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