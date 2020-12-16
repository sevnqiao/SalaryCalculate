//index.js
//获取应用实例

import {
  expp_gjj_percent_array,
  deductList,
  additionArray,
  cityArray,
  taxRateData,
  yearTaxRateData,
  oldTaxRateData 
  } from '../../resources/data.js'

var pieChart = null;
Page({
  data: {
    // 禁止社保基数输入
    disable_sb_input: Boolean(true),
    // 禁止公积金基数输入
    disable_gjj_input: Boolean(true),
    // 是否缴纳公积金
    gjj_check: Boolean(true),
    // 是否缴纳补充公积金
    expp_gjj_check: Boolean(false),
    // 税前工资
    shuiQianNum: Number(10000),
    // 社保相关
    sb_num: Number(0),
    // 公积金相
    gjj_num: Number(0),

    // 补充公积金
    expp_gjj_index: Number(0),

    // 附加抵扣项
    additionTotal: Number(0),
    // 城市数据
    cityIndex: 0,

  },

  onLoad: function () {

      wx.request({
          url: 'https://rbac-new.dazhuanjia.com/bdc/homePage/content_display/configuration',
      })
      
    const cityDict = cityArray[this.data.cityIndex]
    this.gjj_min = cityDict.gjj_min
    this.gjj_max = cityDict.gjj_max
    this.sb_min = cityDict.sb_min
    this.sb_max = cityDict.sb_max

    this.setData({
      expp_gjj_percent_array: expp_gjj_percent_array,
      additionArray: additionArray,
      cityArray: cityArray,
      sb_num: cityDict.sb_min,
      gjj_num: cityDict.gjj_min,
    })
  },

  initVideoAd () {
    let random = parseInt(Math.random() * (10 - 1 + 1) + 1)
    let lng = random % 2 
    console.log(random, lng)
    if (lng === 0) {
      this.setData({
        cacluateTitle: '计算年度收入'
      }) 
      return
    }

    this.setData({
      cacluateTitle: '观看视频解锁年度收入表'
    }) 

    //实例
//     let videoAd = wx.createRewardedVideoAd({
//       adUnitId: 'adunit-dea07a31ebe19775'
//     })

//     this.videoAd = videoAd;

//     videoAd.load()

//     //捕捉错误
//     videoAd.onError(err => {
//       console.log(err)
//     })

//     //关闭视频的回调函数
//     videoAd.onClose(res => {
//       // 用户点击了【关闭广告】按钮
//       // 小于 2.1.0 的基础库版本，res 是一个 undefined
//       console.log(res)
//       if (res && res.isEnded || res === undefined) {
//         // 正常播放结束，可以下发游戏奖励
//         setTimeout(() => {
//           this.caclulate()
//           this.videoAd = null
//         }, 250)
        
//       } else {
//         // 播放中途退出，不下发游戏奖励
//         wx.showToast({
//           title: '您的视频还没看完，无法获得年终奖计算结果',
//           icon:'none'
//         })
//       }
//     })
  },

  // 选择城市
  selectCity(e) {
    var tempIndex = Number(e.detail.value)
    if (tempIndex == this.data.cityIndex) {
      return
    }
    const cityDict = cityArray[tempIndex]
    this.gjj_min = cityDict.gjj_min
    this.gjj_max = cityDict.gjj_max
    this.sb_min = cityDict.sb_min
    this.sb_max = cityDict.sb_max

    this.setData({
      sb_num: cityDict.sb_min,
      gjj_num: cityDict.gjj_min,

      cityIndex: tempIndex,

      expp_gjj_index: 0,
      expp_gjj_check: false,
      disable_sb_input: true,
      disable_gjj_input: true,
      gjj_check: true,
      hidden_pichart: true,
    })

  },

  // 选择补充公积金picker
  bindPickerChange(e) {
    const index = Number(e.detail.value)
    this.setData({
      expp_gjj_index: index,
    })
  },
  // 勾选补充公积金
  bindCheckBoxChange(e) {
    const exppDict = expp_gjj_percent_array[this.data.expp_gjj_index]
    this.setData({
      expp_gjj_check: !this.data.expp_gjj_check
    })
  },
  // 勾选是否自定义公积金基数
  bindGongJiJinInputCheckBoxChange(e) {
    this.setData({
      disable_gjj_input: !this.data.disable_gjj_input
    })
  },
  // 勾选是否自定义社保基数
  bindSheBaoInputCheckBoxChange(e) {
    this.setData({
      disable_sb_input: !this.data.disable_sb_input
    })
  },
  // 勾选是否缴纳公积金
  bindGongJiJinCheckBoxChange(e) {
    const checkArray = e.detail.value
    const gjj_check = checkArray.indexOf('gjj') > -1
    const expp_gjj_check = checkArray.indexOf('expp_gjj') > -1
    if (gjj_check) {
      this.setData({
        gjj_check: gjj_check,
        expp_gjj_check: expp_gjj_check
      })
    } else {
      this.setData({
        gjj_check: false,
        expp_gjj_check: false
      })
    }
    
  },
  // 展开附加扣除
  showAddition(){
    console.log(123)
    this.setData({
      showAdditionItem: !this.data.showAdditionItem
    })
  },

  // 输入税前工资
  inputShuiQian(e) {
    this.setData({
      shuiQianNum: Number(e.detail.value),
    })
  },
  // 社保基数修改完成事件
  blurSheBao(e) {
    var num = Number(e.detail.value)
    if (num > this.data.shuiQianNum) {
      num = this.data.shuiQianNum;
    }
    if (num < this.sb_min) {
      num = this.sb_min;
    } else if (num > this.sb_max) {
      num = this.sb_max;
    }
    this.setData({
      sb_num: num
    })
  },
  // 公积金基数修改完成事件
  blurGongJiJin(e) {
    var num = Number(e.detail.value)
    if (num > this.data.shuiQianNum) {
      num = this.data.shuiQianNum;
    }
    if (num < this.gjj_min) {
      num = this.gjj_min;
    } else if (num > this.gjj_max) {
      num = this.gjj_max;
    }
    this.setData({
      gjj_num: num
    })
  },

  bindAdditionPickerChange: function (e) {
    const index = e.currentTarget.id
    const addition = additionArray[index]
    addition.value = addition.dataSource[e.detail.value]
    var total = 0
    for (let i = 0; i < additionArray.length; ++i) {
      const tempAddition = additionArray[i]
      total = total + tempAddition.value
    }
    this.setData({
      additionArray: additionArray,
      additionTotal: total
    })
  },


  caclulateAfterRateMoney(e) {

    const shuiQianSalary = this.data.shuiQianNum
    var tips = ''
    if (shuiQianSalary < 1000) {
      tips = 'Sorry, 你的工资少的太可怜了，不足以驱动这个程序的运算，增加收入才是你目前该做的事情！'
    } else if (shuiQianSalary > 300000) {
      tips = 'Amazing, 你的工资太高了，吓的我都计算不出来了'
    }
    if(tips.length > 0) {
      wx.showModal({
        title: '',
        content: tips,
        showCancel: false
      })
      return
    }




    wx.showLoading({
      title: '计算中...',
    })
    const self = this
    var random = Math.random() * (800 - 200 + 1) + 200
    setTimeout(function () {
      wx.hideLoading()
      if(self.videoAd != null && self.videoAd != undefined && self.videoAd){
        self.videoAd.show()
      } else {
        self.caclulate()
      }
    }, random)
  },

  caclulate(e) {
    const city = cityArray[this.data.cityIndex]
    var ee = {}

    // 个人扣除项目
    ee['yaonglao_personal'] = this.data.sb_num * city.yanglao_personal_rate
    ee['yiliao_personal'] = this.data.sb_num * city.yiliao_personal_rate
    ee['shiye_personal'] = this.data.sb_num * city.sy_personal_rate
    if (this.data.gjj_check) {
      ee['gjj_personal'] = this.data.gjj_num * city.gjj_personal_rate
      if (this.data.expp_gjj_check) {
        ee['expp_gjj_personal'] = this.data.gjj_num * this.data.expp_gjj_percent_array[this.data.expp_gjj_index].value
      } else {
        ee['expp_gjj_personal'] = 0;
      }
    } else {
      ee['gjj_personal'] = 0;
      ee['expp_gjj_personal'] = 0;
    }
    ee['total_personal'] = ee.yaonglao_personal + ee.yiliao_personal + ee.shiye_personal + ee.gjj_personal + ee.expp_gjj_personal

    // 公司扣除项目
    ee['yaonglao_company'] = this.data.sb_num * city.yanglao_company_rate
    ee['yiliao_company'] = this.data.sb_num * city.yiliao_company_rate
    ee['shiye_company'] = this.data.sb_num * city.sy_company_rate
    if (this.data.gjj_check) {
      ee['gjj_company'] = this.data.gjj_num * city.gjj_company_rate
      if (this.data.expp_gjj_check) {
        ee['expp_gjj_company'] = this.data.gjj_num * this.data.expp_gjj_percent_array[this.data.expp_gjj_index].value
      } else {
        ee['expp_gjj_company'] = 0;
      }
    } else {
      ee['gjj_company'] = 0;
      ee['expp_gjj_company'] = 0;
    }
    ee['gs_company'] = this.data.sb_num * city.gs_company_rate
    ee['shyu_company'] = this.data.sb_num * city.shyu_company_rate
    ee['total_company'] = ee.yaonglao_company + ee.yiliao_company + ee.shiye_company + ee.gjj_company + ee.expp_gjj_company + ee.gs_company + ee.shyu_company

    // 新税法  扣税  税后工资
    ee['before_tax'] = this.data.shuiQianNum - 5000 - ee.total_personal - this.data.additionTotal
    if (ee.before_tax < 0) {
      ee.before_tax = 0
    }
    ee['tax'] = 0
    for (let i = 0; i < taxRateData.length; ++i) {
      const taxRate = taxRateData[i]
      if (ee.before_tax > taxRate.minRateMoney && ee.before_tax <= taxRate.maxRateMoney) {
        ee['tax'] = Number(ee.before_tax * taxRate.rate - taxRate.rapid)
      }
    }
    ee['final_salary'] = this.data.shuiQianNum - ee.total_personal - ee.tax

    // 老税法  扣税  税后工资
    ee['old_before_tax'] = this.data.shuiQianNum - 3500 - ee.total_personal
    if (ee.old_before_tax < 0) {
      ee.old_before_tax = 0
    }
    ee['old_tax'] = 0
    for (let i = 0; i < oldTaxRateData.length; ++i) {
      const taxRate = oldTaxRateData[i]
      if (ee.old_before_tax > taxRate.minRateMoney && ee.old_before_tax <= taxRate.maxRateMoney) {
        ee['old_tax'] = Number(ee.old_before_tax * taxRate.rate - taxRate.rapid)
      }
    }
    ee['old_final_salary'] = this.data.shuiQianNum - ee.total_personal - ee.old_tax

    const datadict = deductList
    for (let i = 0, lenI = datadict.length; i < lenI; ++i) {
      const item = datadict[i]
      if (i == 0) {
        item.value = ee.yaonglao_personal.toFixed(0) + '(' + city.yanglao_personal_rate * 100 + '%)'
        item.orgValue = ee.yaonglao_company.toFixed(0) + '(' + (city.yanglao_company_rate * 100).toFixed() + '%)'
      } else if (i == 1) {
        item.value = ee.yiliao_personal.toFixed(0) + '(' + (city.yiliao_personal_rate * 100).toFixed(1) + '%)'
        item.orgValue = ee.yiliao_company.toFixed(0) + '(' + (city.yiliao_company_rate * 100).toFixed(1) + '%)'
      } else if (i == 2) {
        item.value = ee.shiye_personal.toFixed(0) + '(' + (city.sy_personal_rate * 100).toFixed(1) + '%)'
        item.orgValue = ee.shiye_company.toFixed(0) + '(' + (city.sy_company_rate * 100).toFixed(1) + '%)'
      } else if (i == 3) {
        item.value = ee.gjj_personal.toFixed(0) + '(' + (ee.gjj_personal / this.data.gjj_num * 100).toFixed() + '%)'
        item.orgValue = ee.gjj_company.toFixed(0) + '(' + (ee.gjj_company / this.data.gjj_num * 100).toFixed() + '%)'
      } else if (i == 4) {
        item.value = ee.expp_gjj_personal.toFixed(0) + '(' + (ee.expp_gjj_personal / this.data.gjj_num * 100).toFixed() + '%)'
        item.orgValue = ee.expp_gjj_company.toFixed(0) + '(' + (ee.expp_gjj_company / this.data.gjj_num * 100).toFixed() + '%)'
      } else if (i == 5) {
        item.orgValue = ee.gs_company.toFixed(0) + '(' + (city.gs_company_rate * 100).toFixed(1) + '%)'
      } else if (i == 6) {
        item.orgValue = ee.shyu_company.toFixed(0) + '(' + (city.shyu_company_rate * 100).toFixed(1) + '%)'
      } else if (i == 7) {
        item.value = ee.total_personal.toFixed(0)
        item.orgValue = ee.total_company.toFixed(0)
      } else if (i == 8) {
        item.value = this.data.additionTotal.toFixed(0)
      } else if (i == 9) {
        item.value = ee.before_tax.toFixed()
      } else if (i == 10) {
        item.value = ee.tax.toFixed()
        item.orgValue = ee.old_tax.toFixed() + '(老税法)'
      } else if (i == 11) {
        item.value = ee.final_salary.toFixed(0)
        item.orgValue = ee.old_final_salary.toFixed(0) + '(老税法)'
      }
    }
    this.data.deductList = datadict
    this.caclulateCurrentYear(ee)

    wx.reportAnalytics('input_salary', {
      salarynum: this.data.shuiQianNum,
      salary_after_tax_num: ee.final_salary,
    });
  },

  caclulateCurrentYear(ee) {
    var yearTaxList = []
    for (var i = 0; i < 12; i++) {
      var lastMounthTax
      if (i === 0) {
        lastMounthTax = { mounth: 0, totalShuiQianNum: 0, totalTax: 0, totalAddition: 0, total3J: 0, totalBase: 0, shuiQianNum: 0, tax: 0, personal3j: 0, additionNum: 0, totalSalary:0 }
      } else {
        lastMounthTax = yearTaxList[i - 1]
      }
      if (i === 1) {
        lastMounthTax.additionNum = 0
      }
      const currentMounth = this.caclulateCurrentMounth(lastMounthTax, ee)
      yearTaxList = yearTaxList.concat(currentMounth)
    }
    this.navgationToYearTaxCaculate(yearTaxList, ee)
  },


  caclulateCurrentMounth(lastMounthTax, ee) {
    var currentMounth = { mounth: 0, totalShuiQianNum: 0, totalTax: 0, totalAddition: 0, total3J: 0, totalBase: 0, shuiQianNum: 0, tax: 0, personal3j: 0, additionNum: 0, totalSalary:0 }
    currentMounth.mounth = lastMounthTax.mounth + 1
    currentMounth.totalBase = lastMounthTax.totalBase + 5000
    // 税前
    currentMounth.shuiQianNum = this.data.shuiQianNum
    currentMounth.totalShuiQianNum = lastMounthTax.totalShuiQianNum + currentMounth.shuiQianNum

    // 三金
    currentMounth.personal3j = ee.total_personal
    currentMounth.total3J = lastMounthTax.total3J + currentMounth.personal3j

    // 附加扣除
    currentMounth.additionNum = this.data.additionTotal
    currentMounth.totalAddition = lastMounthTax.totalAddition + this.data.additionTotal

    // 扣税
    var yinShuiNum = currentMounth.totalShuiQianNum - currentMounth.totalAddition - currentMounth.total3J - currentMounth.totalBase
    if (yinShuiNum < 0) {
      yinShuiNum = 0
    }
    if (currentMounth.mounth === 1) {
      yinShuiNum += this.data.additionTotal
    }

    var taxRate
    for (let i = 0; i < yearTaxRateData.length; ++i) {
      const tempTaxRate = yearTaxRateData[i]
      if (yinShuiNum >= tempTaxRate.minRateMoney && yinShuiNum <= tempTaxRate.maxRateMoney) {
        taxRate = tempTaxRate
      }
    }
    currentMounth.tax = Number((yinShuiNum * taxRate.rate - taxRate.rapid - lastMounthTax.totalTax).toFixed(1))
    if (currentMounth.tax < 0){
      currentMounth.tax = 0
    } 
    currentMounth.totalTax = Number((lastMounthTax.totalTax + currentMounth.tax).toFixed(1))

    // 最终工资
    currentMounth['final_salary'] = Number((currentMounth.shuiQianNum - currentMounth.personal3j - currentMounth.tax).toFixed(1))
    currentMounth.totalSalary = Number((lastMounthTax.totalSalary + currentMounth['final_salary']).toFixed(1))

    return currentMounth
  },


  navgationToYearTaxCaculate(yearTaxList, ee) {
    wx.navigateTo({
      url: `year-tax/index?yearTaxList=${JSON.stringify(yearTaxList)}&shuiQianNum=${this.data.shuiQianNum}&deductList=${JSON.stringify(deductList)}&caclulateResult=${JSON.stringify(ee)}`
    })
  },


    /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
