/**
 * 处理 x 轴的数据
 * @param data x 轴的数据
 * @param isNull x 轴是否有传递数据
 */
const processingXAxis = (data, isNull = false) => {
    if (!isNull) {
        return {
            data: data
        }
    } else {
        return {
            type: 'category',
            ...data
        }
    }
}


/**
 * 处理 y 轴的数据
 * @param data y 轴的数据
 * @param isNull y 轴是否有传递数据
 */
const processingYAxis = (data = {}, isNull = false) => {
    if (!isNull) {
        return {
            data
        }
    } else {
        return {
            type: 'value',
            ...data
        }
    }
}

export {
    processingXAxis,
    processingYAxis
}