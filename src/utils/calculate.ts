/**
 * 获取最大值
 * @param data 要获取最大值的数据
 * return 返回最大值
 */
const getMax = (data) => {
    const max = data.reduce((ele, item) => {
        if (ele.length) {
            const itemMax = Math.max(...ele, Math.max(...item.data));
            return [itemMax];
        } else {
            ele.push(Math.max(...item.data))
            return ele;
        }
    }, []);
    return max[0]
}

/**
 * 获取最小值
 * @param data 要获取最小值的数据
 * return 返回最小值
 */
const getMin = (data) => {
    const min = data.reduce((ele, item) => {
        if (ele.length) {
            const itemMin = Math.min(...ele, Math.min(...item.data));
            return [itemMin];
        } else {
            ele.push(Math.min(...item.data))
            return ele;
        }
    }, []);
    return min[0]
}


export {
    getMax,
    getMin
}