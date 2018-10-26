//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    array: ['1%', '2%', '3%', '4%', '5%', '6%', '7%', '8%'],
    valueArray: ['0.01', '0.02', '0.03', '0.04', '0.05', '0.06', '0.07', '0.08'],


    cityArray: [{ value: 'beijing', name: '北京'},
                { value: 'shanghai', name: '上海' },
                { value: 'guangzhou', name: '广州' },
                { value: 'shenzhen', name: '深圳' },
                { value: 'nanjing', name: '南京' },
                { value: 'hangzhou', name: '杭州' },
                { value: 'wuhan', name: '武汉' },
                { value: 'chongqing', name: '重庆' },
                { value: 'beijing', name: '北京' },
                { value: 'beijing', name: '北京' }],







    index: 0,
    disablePicker: true,
    disableSheBaoCheckInput: true,
    disableGongJiJinCheckInput: true,
    gongJiJinCheck: true,

    shuiQianNum:10000,
    sheBaoBasicNum:4279,
    gongJiJinBasicNum:2300,
    buChongGongJiJinPercent:0,

    items: [
      { orgValue: '', value: '', name: '养老保险金' },
      { orgValue: '', value: '', name: '医疗保险金' },
      { orgValue: '', value: '', name: '失业保险金' },
      { orgValue: '', value: '', name: '基本住房公积金' },
      { orgValue: '', value: '', name: '补充住房公积金' },
      { orgValue: '', value: '', name: '工伤保险金' },
      { orgValue: '', value: '', name: '生育保险金' },
      { orgValue: '', value: '', name: '共计支出' },
      { orgValue: '', value: '', name: '应纳税工资' },
      { orgValue: '', value: '', name: '个人所得税' },
      { orgValue: '', value: '', name: '税后月薪' }
    ],
  },

  onLoad:function(){
    this.setData({
      sheBaoBasicNum:this.data.shuiQianNum,
      gongJiJinBasicNum: this.data.shuiQianNum
    })
  },

  bindPickerChange(e) {
    this.setData({
      index: e.detail.value,
      buChongGongJiJinPercent: this.data.valueArray[e.detail.value]
    })
  },

  bindCheckBoxChange(e) {
    this.setData({
      buChongGongJiJinPercent: this.data.valueArray[this.data.index],
      disablePicker: !this.data.disablePicker
    })
  },
  bindGongJiJinInputCheckBoxChange(e) {
    this.setData({
      disableGongJiJinCheckInput: !this.data.disableGongJiJinCheckInput
    })
  },
  bindSheBaoInputCheckBoxChange(e) {
    this.setData({
      disableSheBaoCheckInput: !this.data.disableSheBaoCheckInput
    })
  },
  bindGongJiJinCheckBoxChange(e) {
    this.setData({
      gongJiJinCheck: !this.data.gongJiJinCheck
    })
  },

  inputShuiQian(e) {
    this.setData ({
      shuiQianNum: e.detail.value
    })
  },
  inputSheBao(e) {
    this.setData({
      sheBaoBasicNum: e.detail.value
    })
  },
  inputGongJiJin(e) {
    this.setData({
      gongJiJinBasicNum: e.detail.value
    })
  },

  blurSheBao(e) {
    var num = e.detail.value
    if (num > this.data.shuiQianNum) {
      num = this.data.shuiQianNum;
    }
    if (num < 4279) {
      num = 4279;
    }
    if (num > 21396) {
      num = 21396;
    }
    this.setData({
      sheBaoBasicNum: num
    })
  },
  blurGongJiJin(e) {
    var num = e.detail.value
    if (num > this.data.shuiQianNum) {
      num = this.data.shuiQianNum;
    }
    if (num < 2300) {
      num = 2300;
    }
    if (num > 21396) {
      num = 21396;
    }
    this.setData({
      gongJiJinBasicNum: num
    })
  },

  caclulate(e) {
    const self = this
    wx.request({
      url: 'https://salarycalculator.sinaapp.com/calculate',
      data:{
        city: 'shanghai',
        origin_salary: this.data.shuiQianNum,
        base_3j: this.data.sheBaoBasicNum,
        base_gjj: this.data.gongJiJinBasicNum,
        is_gjj: this.data.gongJiJinCheck,
        is_exgjj: !this.data.disablePicker,
        factor_exgjj: this.data.buChongGongJiJinPercent
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        const datadict = self.data.items
        for (let i = 0, lenI = datadict.length; i < lenI; ++i) {
          const item = datadict[i]
          if (i==0){
            item.value = res.data.personal_yanglao + '   ' + '(8%)'
            item.orgValue = res.data.org_yanglao + '   ' + '(20%)'
          } else if (i == 1) {
            item.value = res.data.personal_yiliao + '   ' + '(2%)'
            item.orgValue = res.data.org_yiliao + '   ' + '(9.5%)'
          } else if (i == 2) {
            item.value = res.data.personal_shiye + '   ' + '(0.5%)'
            item.orgValue = res.data.org_shiye + '   ' + '(0.5%)'
          } else if (i == 3) {
            item.value = res.data.personal_gjj + '   ' + '(7%)'
            item.orgValue = res.data.org_gjj + '   ' + '(7%)'
          } else if (i == 4) {
            item.value = res.data.personal_exgjj + '   ' + '(' + self.data.buChongGongJiJinPercent*100 + '%)'
            item.orgValue = res.data.org_exgjj + '   ' + '(' + self.data.buChongGongJiJinPercent * 100 + '%)'
          } else if (i == 5) {
            item.value = res.data.personal_gongshang
            item.orgValue = res.data.org_gongshang + '   ' + '(0.2%)'
          } else if (i == 6) {
            item.value = res.data.personal_shengyu
            item.orgValue = res.data.org_shengyu + '   ' + '(1%)'
          } else if (i == 7) {
            item.value = res.data.personal_allpay
            item.orgValue = res.data.org_allpay
          } else if (i == 8) {
            item.value = res.data.before_tax
          } else if (i == 9) {
            item.value = res.data.tax
            item.orgValue = res.data.old_tax + '(老税法)'
          } else if (i == 10) {
            item.value = res.data.final_salary
            item.orgValue = res.data.old_final_salary+'(老税法)'
          }
        }
        // console.log('picker发送选择改变，携带值为', self.data.items)

        self.setData({
          items: datadict
        })
      }
    })

  }
})
