// bar 默认配置
const options = {
    // 标题
    title: {
        text: '标题',
        show: true, // 是否显示
        left: 'left', // 显示的位置
        textStyle: {
            fontSize: 12, // 标题的大小
        }
    },
    //  总体样式配置
    gridStyle: {
        defaultColor: ['#52AC0B'], // 默认颜色配置
        activeColor: '#ddd', // 选中或者需要突出的颜色配置
        fontSize: 12, // 全局的一个字体大小配置
    },
    // x 轴配置
    x: {
        data: ["2019", "2020", "2021", "2022"],
        line: {
            show: false
        },
        tick: {
            show: false
        },
        label: {
            show: true,
        }
    },
    // y 轴配置，这里明天需要进行一下配置，有可能会出现多轴的情况，这里先简单用单轴的来模拟
    y: {
        show: false, // 是否显示 y 轴
        type: 'value', // 默认
        unitOption: {
            show: true, // 是否显示单位
            unit: 'k', // 单位
            lacation: 'before', // 显示的位置，前面还是后面
            unitFn: (val) => { }, // 自定义设置函数
        }
    }
}