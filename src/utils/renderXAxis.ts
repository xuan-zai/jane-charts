/**
 * 对 x轴 进行处理
 * @param {Array} data x 轴数据
 * @param {object} options x 轴的配置项
 */

const renderXAxis = (data: any, options: any) => {

    /**
     * 默认的 x 轴配置
     */
    const defaultX = {
        show: true, // 是否显示 x 轴
        position: 'bottom', // x 轴的位置
        boundarGap: true, // 两边是否留白
        name_option: {
            name: null, // 坐标轴的名字
            location: 'end', // 坐标轴名称显示的位置
        },
        // 轴线设置
        axisLine: {
            show: false, // 是否显示轴线
            symbol: 'none', // 是否显示箭头
        },
        // 刻度设置
        axisTick: {
            show: false, // 是否显示刻度
            alignWithLabel: true, // 刻度是否与标签对齐，
        },
        // 标签设置
        axisLabel: {
            show: true,  // 是否显示标签
            rotate: 0, // 标签旋转的角度
            margin: 8, // 标签和轴线的距离
            fontSize: 12, // 标签的字体大小 
            // 对标签自定义
            formatter: (value: string, index: any) => {
                if (options.label_unit) {
                    const { unit, location } = options.label_unit;
                    if (location === 'before') {
                        value = unit + value;
                    }else {
                        value = value + unit;
                    }
                }
                return value;
            }
        },
    }

    const set_xOptions = {
        type: data.type,
        data: data.data,
        show: defaultX.show,
        position: defaultX.position,
        name: options?.name_option?.name || defaultX.name_option.name,
        nameLocation: options?.name_option?.location || defaultX.name_option.location,
        boundarGap: defaultX.boundarGap === undefined ? options?.boundarGap : defaultX.boundarGap,
        axisLine: {
            ...defaultX.axisLine
        },
        axisTick: {
            ...defaultX.axisTick
        },
        axisLabel: {
            ...defaultX.axisLabel
        },
    };

    return set_xOptions;
}

export default renderXAxis;