/**
 * 处理标题数据
 * @param {string}  title 标题数据
 * @param {object}  config 标题配置项
 */
const processingTitle = (title, config = {}) => {
    let titleOption = {};
    // 首先判断是不是空值，空值就直接返回
    if (!title || (typeof title === 'object' && JSON.stringify(title) === '{}')) {
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
    // 判断有没有 x
    if (x) {
        // 有 x 的话，判断是数组还是对象,
        // 是数组的话，代表着这个数据就是 data
        if (x instanceof Array) {
            axis['xAxis'] = {
                data: x
            }
            if (y && JSON.stringify(y) !== '{}') {
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
                if (x.unitConfig && JSON.stringify(x.unitConfig) !== '{}') {
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
                if (y && JSON.stringify(y) !== '{}') {
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
                        ...x
                    }
                }
            }
        }
    } else {
        // 如果没有 x 的话，那么看是否有 y
        if (y) {
            if (y instanceof Array) {
                axis['yAxis'] = {
                    data: y
                };
                axis['xAxis'] = {
                    type: 'value'
                }
            }
        }
    }
    return axis;
}

const processingSeries = (series, config = {}) => {
    if ((typeof series === 'object' && JSON.stringify(series) === '{}')) {
        return null;
    }
    return {
        data: series.data,
        type: series.type || 'bar'
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
    if (type === 'bar') {
        // 对于标题的处理
        const title = processingTitle(data.title);
        title && (option['title'] = title);

        option = {
            ...option,
            ...processingAxis(data)
        }

        // 对于 series 的处理
        const series = processingSeries(data.series);
        series && (option['series'] = series);
    }

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
    if (config.barStyle) {
        for (const key in option['series']) {
            if (config.barStyle.width) {
                option['series'].barWidth = config.barStyle.width;
            }
            if (config.barStyle.round) {
                option['series'].itemStyle = {
                    borderRadius: config.barStyle.round
                }
            }
        }
    }
    return option;
}

export default processing;