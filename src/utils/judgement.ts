/**
 * 判断是否是空对象
 * @param obj 要检测的对象
 * @returns 是空对象返回 true，不是返回 false
 */
const isNullObject = (obj) => {
    return JSON.stringify(obj) === '{}'
}


export {
    isNullObject
}