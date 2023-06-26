/**
 * 判断是否是空对象
 * @param obj 要检测的对象
 * @returns 是空对象返回 true，不是返回 false
 */
const isNullObject = (obj) => {
    return JSON.stringify(obj) === '{}'
}

/**
 * 对 轴线的单位进行统一化处理
 * @param val 轴线的 label
 * @param unit 设置的单位
 * @param location 单位要展现的位置
 * @returns 
 */
const processingFormatter = (val, unit, location) => {
    if (location === 'before') {
        return unit + val;
    } else {
        return val + unit;
    }
}

/**
 * 对轴线的数据进行统一化处理
 * @param data 包含轴线的数据和一些配置
 * @param type 查看 data 是否是 type 类型
 * @param fn 对轴线的数据进行统一化
 */
const judgementType = (data, type, fn) => {
    if (data) {
        if (data instanceof type) {
            return fn(data)
        } else {
            const axis_data = data.data;
            const unitConfig = data.unitConfig;
            if (unitConfig && !isNullObject(unitConfig)) {
                const axis_options = axis_data ? fn(axis_data) : fn(data, true);
                axis_options.axisLabel = {
                    formatter: (val) => {
                        return processingFormatter(val, unitConfig.unit, unitConfig.location);
                    }
                }
                return axis_options;
            } else {
                return axis_data ? fn(axis_data) : fn(data, true)
            }
        }
    } else {
        return fn(null, true)
    }
}

/**
 * 简单的对 axis 样式进行配置，后期需要优化
 * @param axis axis 原本的一些配置
 * @param config axis 的样式配置
 */
const setAxisStyle = (axis, config) => {
    if (!isNullObject(config)) {
        const { x = null, y = null } = config;
        if (x) {
            axis['xAxis'] = {
                ...axis['xAxis'],
                show: typeof x.show === 'undefined' ? true : x.show, // 默认显示 x 轴线
                axisLine: {
                    ...x.lineStyle,
                },
                axisTick: {
                    ...x.tickStyle,
                },
                axisLabel: {
                    ...x.labelStyle
                },
                splitLine: {
                    ...x.splitLine
                }
            }
        }
        if (y) {
            axis['yAxis'] = {
                ...axis['yAxis'],
                show: typeof y.show === 'undefined' ? true : y.show, // 默认显示 x 轴线
                axisLine: {
                    ...y.lineStyle,
                },
                axisTick: {
                    ...y.tickStyle,
                },
                axisLabel: {
                    ...y.labelStyle
                },
                splitLine: {
                    ...y.splitLine
                }
            }
        }
    };

    return axis;
}



export {
    isNullObject,
    judgementType,
    setAxisStyle
}