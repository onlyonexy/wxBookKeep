Component({
  properties: {
    options: {
      type: Array,
      value: []
    },
    defaultOption: {
      type: Object,
      value: {
        id: '',
        name: '请选择'
      }
    },
    key: {
      type: String,
      value: 'id'
    },
    text: {
      type: String,
      value: 'name'
    }
  },
  data: {
    result: [],
    isShow: false,
    current: {}
  },
  methods: {
    optionTap(e) {
      let dataset = e.target.dataset
      const that = this
      that.setData({
        current: dataset,
        isShow: false
      });

      // 调用父组件方法，并传参
      that.triggerEvent("change", { ...dataset })
    },
    openClose() {
      const that = this
      that.setData({
        isShow: !this.data.isShow
      })
    },

    // 此方法供父组件调用
    close() {
      const that = this
      that.setData({
        isShow: false
      })
    }
  },
  lifetimes: {

    /**
     * created 组件实例化，但节点树还未导入，因此这时不能用setData
      attached 节点树完成，可以用setData渲染节点，但无法操作节点
      ready(不是onReady) 组件布局完成，这时可以获取节点信息，也可以操作节点
      moved 组件实例被移动到树的另一个位置
      detached 组件实例从节点树中移除
     */
    ready(){
      // 属性名称转换, 如果不是 { id: '', name:'' } 格式，则转为 { id: '', name:'' } 格式
      let result = []
      const that = this
      if (that.data.key !== 'id' || that.data.text !== 'name') {       
        for (let item of that.data.options) {
          let { [that.data.key]: id, [that.data.text]: name } = item
          result.push({ id, name })
        }
      }
      that.setData({
        current: Object.assign({}, that.data.defaultOption),
        result: result
      })
      console.log('---select',that.data.result)
    },
    attached() {
      
    }
  }
})