// components/radiogroup/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        itemsArray:{
            type: Array,
            value: [],
            observer: function (newVal, oldVal) {
                this.setData({
                    itemsArray: newVal
                })
            }
        },
        selectIndex: {
            type: Number,
            value: 0,
            observer: function (newVal, oldVal) {
                this.setData({
                    selectIndex: newVal
                })
            }
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        
    },

    /**
     * 组件的方法列表
     */
    methods: {
        radioChange: function (e) {
            const index = this.data.itemsArray.indexOf(Number(e.detail.value))
            this.setData({
                selectIndex: index
            });
        }
    },

    
})
