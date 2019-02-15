//index.js
//获取应用实例

const app = getApp();
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
    // 是否隐藏底部饼状
    hidden_pichart: Boolean(true),
    // 税前工资
    shuiQianNum: Number(10000),
    // 社保相关
    sb_num: Number(0),
    sb_min: Number(0),
    sb_max: Number(0),
    // 公积金相
    gjj_num: Number(0),
    gjj_min: Number(0),
    gjj_max: Number(0),
    // 记录企业总支出
    org_pay: Number(0),

    // 补充公积金
    expp_gjj_index: Number(0),
    expp_gjj_percent: Number(0),
    expp_gjj_percent_array: [
      { name: '1%', value: 0.01 },
      { name: '2%', value: 0.02 },
      { name: '3%', value: 0.03 },
      { name: '4%', value: 0.04 },
      { name: '5%', value: 0.05 },
      { name: '6%', value: 0.06 },
      { name: '7%', value: 0.07 },
      { name: '8%', value: 0.08 }
    ],

    // 扣除项目
    deductList: [
      { orgValue: '', value: '', name: '养老保险金' },
      { orgValue: '', value: '', name: '医疗保险金' },
      { orgValue: '', value: '', name: '失业保险金' },
      { orgValue: '', value: '', name: '基本住房公积金' },
      { orgValue: '', value: '', name: '补充住房公积金' },
      { orgValue: '', value: '', name: '工伤保险金' },
      { orgValue: '', value: '', name: '生育保险金' },
      { orgValue: '', value: '', name: '共计支出' }
    ],

    // 附加抵扣项
    additionTotal: Number(0),
    additionArray: [
      { name: '子女教育：', dataSource: [0, 500, 1000], value: 0 },
      { name: '继续教育：', dataSource: [0, 300, 400], value: 0 },
      { name: '大病医疗：', dataSource: [0], value: 0 },
      { name: '贷款利息：', dataSource: [0, 1000], value: 0 },
      { name: '住房租金：', dataSource: [0, 800, 1100, 1500], value: 0 },
      { name: '赡养老人：', dataSource: [0, 1000, 2000], value: 0 }
    ],

    // 城市数据
    cityIndex: 0,
    cityArray: [
      { name: '北京', enName: 'beijing', sb_min: 3387, sb_max: 25401, gjj_min: 2273, gjj_max: 25401, yanglao_personal_rate: 0.12, yiliao_personal_rate: 0.03, sy_personal_rate: 0.003, gjj_personal_rate: 0.12, yanglao_company_rate: 0.28, yiliao_company_rate: 0.15, sy_company_rate: 0.012, gjj_company_rate: 0.12, gs_company_rate: 0.006, shyu_company_rate: 0.012 },
      { name: '上海', enName: 'shanghai', sb_min: 4279, sb_max: 21396, gjj_min: 2300, gjj_max: 21400, yanglao_personal_rate: 0.08, yiliao_personal_rate: 0.02, sy_personal_rate: 0.005, gjj_personal_rate: 0.07, yanglao_company_rate: 0.20, yiliao_company_rate: 0.095, sy_company_rate: 0.005, gjj_company_rate: 0.07, gs_company_rate: 0.002, shyu_company_rate: 0.01 },
      { name: '天津', enName: 'tianjin', sb_min: 3364, sb_max: 16821, gjj_min: 2050, gjj_max: 24240, yanglao_personal_rate: 0.08, yiliao_personal_rate: 0.02, sy_personal_rate: 0.005, gjj_personal_rate: 0.11, yanglao_company_rate: 0.19, yiliao_company_rate: 0.1, sy_company_rate: 0.005, gjj_company_rate: 0.07, gs_company_rate: 0.002, shyu_company_rate: 0.005 },
      { name: '深圳', enName: 'shenzhen', sb_min: 2200, sb_max: 25044, gjj_min: 2130, gjj_max: 25044, yanglao_personal_rate: 0.08, yiliao_personal_rate: 0.02, sy_personal_rate: 0.005, gjj_personal_rate: 0.05, yanglao_company_rate: 0.14, yiliao_company_rate: 0.06, sy_company_rate: 0.01, gjj_company_rate: 0.05, gs_company_rate: 0.0017, shyu_company_rate: 0.045 },
      { name: '杭州', enName: 'hangzhou', sb_min: 3055, sb_max: 15275, gjj_min: 2010, gjj_max: 24311, yanglao_personal_rate: 0.08, yiliao_personal_rate: 0.02, sy_personal_rate: 0.005, gjj_personal_rate: 0.12, yanglao_company_rate: 0.14, yiliao_company_rate: 0.1, sy_company_rate: 0.005, gjj_company_rate: 0.12, gs_company_rate: 0.006, shyu_company_rate: 0.012 },
      { name: '广州', enName: 'guangzhou', sb_min: 2100, sb_max: 99999, gjj_min: 2100, gjj_max: 24654, yanglao_personal_rate: 0.08, yiliao_personal_rate: 0.02, sy_personal_rate: 0.002, gjj_personal_rate: 0.05, yanglao_company_rate: 0.14, yiliao_company_rate: 0.07, sy_company_rate: 0.006, gjj_company_rate: 0.05, gs_company_rate: 0.006, shyu_company_rate: 0.012 },
      { name: '南京', enName: 'nanjing', sb_min: 3030, sb_max: 19935, gjj_min: 1890, gjj_max: 22500, yanglao_personal_rate: 0.08, yiliao_personal_rate: 0.02, sy_personal_rate: 0.005, gjj_personal_rate: 0.09, yanglao_company_rate: 0.19, yiliao_company_rate: 0.09, sy_company_rate: 0.005, gjj_company_rate: 0.09, gs_company_rate: 0.002, shyu_company_rate: 0.008 },
      { name: '贵阳', enName: 'guiyang', sb_min: 3227, sb_max: 16137, gjj_min: 1400, gjj_max: 33750, yanglao_personal_rate: 0.08, yiliao_personal_rate: 0.02, sy_personal_rate: 0.003, gjj_personal_rate: 0.06, yanglao_company_rate: 0.19, yiliao_company_rate: 0.075, sy_company_rate: 0.007, gjj_company_rate: 0.06, gs_company_rate: 0.009, shyu_company_rate: 0.01 },
      { name: '乌鲁木齐', enName: 'wulumuqi', sb_min: 3019, sb_max: 15096, gjj_min: 1620, gjj_max: 15399, yanglao_personal_rate: 0.08, yiliao_personal_rate: 0.02, sy_personal_rate: 0.005, gjj_personal_rate: 0.1, yanglao_company_rate: 0.18, yiliao_company_rate: 0.09, sy_company_rate: 0.005, gjj_company_rate: 0.1, gs_company_rate: 0.0035, shyu_company_rate: 0.008 },
      { name: '福州', enName: 'fuzhou', sb_min: 1800, sb_max: 18783, gjj_min: 1650, gjj_max: 18783, yanglao_personal_rate: 0.08, yiliao_personal_rate: 0.02, sy_personal_rate: 0.005, gjj_personal_rate: 0.12, yanglao_company_rate: 0.18, yiliao_company_rate: 0.08, sy_company_rate: 0.005, gjj_company_rate: 0.12, gs_company_rate: 0.0026, shyu_company_rate: 0.005 },
      { name: '石家庄', enName: 'shijiazhuang', sb_min: 3028, sb_max: 99999, gjj_min: 3308, gjj_max: 16539, yanglao_personal_rate: 0.08, yiliao_personal_rate: 0.02, sy_personal_rate: 0.003, gjj_personal_rate: 0.1, yanglao_company_rate: 0.20, yiliao_company_rate: 0.08, sy_company_rate: 0.007, gjj_company_rate: 0.12, gs_company_rate: 0.012, shyu_company_rate: 0.01 },
      { name: '呼和浩特', enName: 'huhehaote', sb_min: 2810, sb_max: 14052, gjj_min: 1760, gjj_max: 15498, yanglao_personal_rate: 0.08, yiliao_personal_rate: 0.02, sy_personal_rate: 0.005, gjj_personal_rate: 0.06, yanglao_company_rate: 0.20, yiliao_company_rate: 0.06, sy_company_rate: 0.005, gjj_company_rate: 0.06, gs_company_rate: 0.004, shyu_company_rate: 0.007 },
      { name: '太原', enName: 'taiyuan', sb_min: 3077, sb_max: 15387, gjj_min: 1625, gjj_max: 16206, yanglao_personal_rate: 0.08, yiliao_personal_rate: 0.02, sy_personal_rate: 0.003, gjj_personal_rate: 0.06, yanglao_company_rate: 0.19, yiliao_company_rate: 0.07, sy_company_rate: 0.007, gjj_company_rate: 0.1, gs_company_rate: 0.004, shyu_company_rate: 0.005 },
      { name: '兰州', enName: 'lanzhou', sb_min: 3287, sb_max: 16431, gjj_min: 1620, gjj_max: 18071, yanglao_personal_rate: 0.08, yiliao_personal_rate: 0.02, sy_personal_rate: 0.003, gjj_personal_rate: 0.07, yanglao_company_rate: 0.19, yiliao_company_rate: 0.08, sy_company_rate: 0.007, gjj_company_rate: 0.07, gs_company_rate: 0.007, shyu_company_rate: 0.01 },
      { name: '郑州', enName: 'zhengzhou', sb_min: 3524, sb_max: 17621, gjj_min: 3524, gjj_max: 17625, yanglao_personal_rate: 0.08, yiliao_personal_rate: 0.02, sy_personal_rate: 0.003, gjj_personal_rate: 0.1, yanglao_company_rate: 0.19, yiliao_company_rate: 0.08, sy_company_rate: 0.007, gjj_company_rate: 0.1, gs_company_rate: 0.005, shyu_company_rate: 0.01 },
      { name: '长沙', enName: 'changsha', sb_min: 2695, sb_max: 13473, gjj_min: 1580, gjj_max: 31950, yanglao_personal_rate: 0.08, yiliao_personal_rate: 0.02, sy_personal_rate: 0.003, gjj_personal_rate: 0.08, yanglao_company_rate: 0.19, yiliao_company_rate: 0.08, sy_company_rate: 0.007, gjj_company_rate: 0.08, gs_company_rate: 0.005, shyu_company_rate: 0.007 },
      { name: '昆明', enName: 'kunming', sb_min: 3676, sb_max: 18378, gjj_min: 1570, gjj_max: 19088, yanglao_personal_rate: 0.08, yiliao_personal_rate: 0.02, sy_personal_rate: 0.003, gjj_personal_rate: 0.1, yanglao_company_rate: 0.19, yiliao_company_rate: 0.099, sy_company_rate: 0.007, gjj_company_rate: 0.1, gs_company_rate: 0.0036, shyu_company_rate: 0 },
      { name: '武汉', enName: 'wuhan', sb_min: 3400, sb_max: 19921, gjj_min: 1750, gjj_max: 29881, yanglao_personal_rate: 0.08, yiliao_personal_rate: 0.02, sy_personal_rate: 0.003, gjj_personal_rate: 0.08, yanglao_company_rate: 0.19, yiliao_company_rate: 0.08, sy_company_rate: 0.007, gjj_company_rate: 0.08, gs_company_rate: 0.048, shyu_company_rate: 0.07 },
      { name: '沈阳', enName: 'shenyang', sb_min: 2666, sb_max: 99999, gjj_min: 1620, gjj_max: 18545, yanglao_personal_rate: 0.1, yiliao_personal_rate: 0.025, sy_personal_rate: 0.006, gjj_personal_rate: 0.12, yanglao_company_rate: 0.25, yiliao_company_rate: 0.109, sy_company_rate: 0.006, gjj_company_rate: 0.12, gs_company_rate: 0.0044, shyu_company_rate: 0.0076 },
      { name: '南昌', enName: 'nanchang', sb_min: 2807, sb_max: 15774, gjj_min: 1083, gjj_max: 16450, yanglao_personal_rate: 0.08, yiliao_personal_rate: 0.02, sy_personal_rate: 0.005, gjj_personal_rate: 0.12, yanglao_company_rate: 0.19, yiliao_company_rate: 0.061, sy_company_rate: 0.005, gjj_company_rate: 0.12, gs_company_rate: 0.002, shyu_company_rate: 0.051 },
      { name: '合肥', enName: 'hefei', sb_min: 3396, sb_max: 16981, gjj_min: 1520, gjj_max: 20172, yanglao_personal_rate: 0.08, yiliao_personal_rate: 0.02, sy_personal_rate: 0.005, gjj_personal_rate: 0.08, yanglao_company_rate: 0.19, yiliao_company_rate: 0.08, sy_company_rate: 0.005, gjj_company_rate: 0.08, gs_company_rate: 0.004, shyu_company_rate: 0 },
      { name: '重庆', enName: 'chongqing', sb_min: 3664, sb_max: 18318, gjj_min: 1500, gjj_max: 18318, yanglao_personal_rate: 0.08, yiliao_personal_rate: 0.02, sy_personal_rate: 0.005, gjj_personal_rate: 0.07, yanglao_company_rate: 0.19, yiliao_company_rate: 0.085, sy_company_rate: 0.005, gjj_company_rate: 0.07, gs_company_rate: 0.006, shyu_company_rate: 0.005 },
      { name: '成都', enName: 'chengdu', sb_min: 2388, sb_max: 17908, gjj_min: 1500, gjj_max: 22302, yanglao_personal_rate: 0.1, yiliao_personal_rate: 0.026, sy_personal_rate: 0.005, gjj_personal_rate: 0.06, yanglao_company_rate: 0.24, yiliao_company_rate: 0.083, sy_company_rate: 0.008, gjj_company_rate: 0.06, gs_company_rate: 0.0028, shyu_company_rate: 0.0077 },
      { name: '长春', enName: 'changchun', sb_min: 3606, sb_max: 18410, gjj_min: 2000, gjj_max: 21485, yanglao_personal_rate: 0.08, yiliao_personal_rate: 0.02, sy_personal_rate: 0.003, gjj_personal_rate: 0.07, yanglao_company_rate: 0.20, yiliao_company_rate: 0.071, sy_company_rate: 0.007, gjj_company_rate: 0.07, gs_company_rate: 0.002, shyu_company_rate: 0.071 },
      { name: '哈尔滨', enName: 'haerbin', sb_min: 2787, sb_max: 15646, gjj_min: 1680, gjj_max: 14601, yanglao_personal_rate: 0.09, yiliao_personal_rate: 0.022, sy_personal_rate: 0.006, gjj_personal_rate: 0.08, yanglao_company_rate: 0.22, yiliao_company_rate: 0.084, sy_company_rate: 0.006, gjj_company_rate: 0.08, gs_company_rate: 0.01, shyu_company_rate: 0.067 },
      { name: '银川', enName: 'yinchuan', sb_min: 3392, sb_max: 16957, gjj_min: 1660, gjj_max: 17025, yanglao_personal_rate: 0.08, yiliao_personal_rate: 0.02, sy_personal_rate: 0.005, gjj_personal_rate: 0.012, yanglao_company_rate: 0.19, yiliao_company_rate: 0.08, sy_company_rate: 0.005, gjj_company_rate: 0.12, gs_company_rate: 0.012, shyu_company_rate: 0.0085 },
      { name: '海口', enName: 'haikou', sb_min: 3453, sb_max: 17265, gjj_min: 1430, gjj_max: 15508, yanglao_personal_rate: 0.08, yiliao_personal_rate: 0.02, sy_personal_rate: 0.005, gjj_personal_rate: 0.01, yanglao_company_rate: 0.19, yiliao_company_rate: 0.08, sy_company_rate: 0.005, gjj_company_rate: 0.1, gs_company_rate: 0.004, shyu_company_rate: 0.005 },
      { name: '南宁', enName: 'nanning', sb_min: 2834, sb_max: 14171, gjj_min: 1680, gjj_max: 18870, yanglao_personal_rate: 0.08, yiliao_personal_rate: 0.02, sy_personal_rate: 0.005, gjj_personal_rate: 0.012, yanglao_company_rate: 0.19, yiliao_company_rate: 0.07, sy_company_rate: 0.005, gjj_company_rate: 0.12, gs_company_rate: 0.004, shyu_company_rate: 0.008 },

    ],

    taxRateData: [
      { minRateMoney: 0, maxRateMoney: 3000, rate: 0.03, rateText: '3%', rapid: 0 },
      { minRateMoney: 3000, maxRateMoney: 12000, rate: 0.1, rateText: '10%', rapid: 210 },
      { minRateMoney: 12000, maxRateMoney: 25000, rate: 0.2, rateText: '20%', rapid: 1410 },
      { minRateMoney: 25000, maxRateMoney: 35000, rate: 0.25, rateText: '25%', rapid: 2660 },
      { minRateMoney: 35000, maxRateMoney: 55000, rate: 0.3, rateText: '30%', rapid: 4410 },
      { minRateMoney: 55000, maxRateMoney: 80000, rate: 0.35, rateText: '35%', rapid: 7160 },
      { minRateMoney: 80000, maxRateMoney: 999999, rate: 0.45, rateText: '45%', rapid: 15160 }
    ],

    yearTaxRateData: [
      { minRateMoney: 0, maxRateMoney: 36000, rate: 0.03, rateText: '3%', rapid: 0 },
      { minRateMoney: 36000, maxRateMoney: 144000, rate: 0.1, rateText: '10%', rapid: 2520 },
      { minRateMoney: 144000, maxRateMoney: 300000, rate: 0.2, rateText: '20%', rapid: 16920 },
      { minRateMoney: 300000, maxRateMoney: 420000, rate: 0.25, rateText: '25%', rapid: 31920 },
      { minRateMoney: 420000, maxRateMoney: 660000, rate: 0.3, rateText: '30%', rapid: 52920 },
      { minRateMoney: 660000, maxRateMoney: 9600000, rate: 0.35, rateText: '35%', rapid: 85920 },
      { minRateMoney: 9600000, maxRateMoney: 99999999, rate: 0.45, rateText: '45%', rapid: 181920 }
    ],

    oldTaxRateData: [
      { minRateMoney: 0, maxRateMoney: 1500, rate: 0.03, rateText: '3%', rapid: 0 },
      { minRateMoney: 1500, maxRateMoney: 4500, rate: 0.1, rateText: '10%', rapid: 105 },
      { minRateMoney: 4500, maxRateMoney: 9000, rate: 0.2, rateText: '20%', rapid: 555 },
      { minRateMoney: 9000, maxRateMoney: 35000, rate: 0.25, rateText: '25%', rapid: 1005 },
      { minRateMoney: 35000, maxRateMoney: 55000, rate: 0.3, rateText: '30%', rapid: 2755 },
      { minRateMoney: 55000, maxRateMoney: 80000, rate: 0.35, rateText: '35%', rapid: 5505 },
      { minRateMoney: 80000, maxRateMoney: 999999, rate: 0.45, rateText: '45%', rapid: 13505 }
    ],

    yearTaxList: []

  },

  onLoad: function () {

    const cityDict = this.data.cityArray[this.data.cityIndex]
    this.setData({
      sb_num: cityDict.sb_min,
      gjj_num: cityDict.gjj_min,

      sb_min: cityDict.sb_min,
      sb_max: cityDict.sb_max,
      gjj_min: cityDict.gjj_min,
      gjj_max: cityDict.gjj_max,

    })
  },

  // 选择城市
  selectCity(e) {
    var tempIndex = Number(e.detail.value)
    if (tempIndex == this.data.cityIndex) {
      return
    }
    const cityDict = this.data.cityArray[tempIndex]

    this.setData({
      sb_num: cityDict.sb_min,
      gjj_num: cityDict.gjj_min,

      cityIndex: tempIndex,

      sb_min: cityDict.sb_min,
      sb_max: cityDict.sb_max,
      gjj_min: cityDict.gjj_min,
      gjj_max: cityDict.gjj_max,

      expp_gjj_index: 0,
      expp_gjj_check: false,
      disable_sb_input: true,
      disable_gjj_input: true,
      gjj_check: true,
      hidden_pichart: true,
      expp_gjj_percent: 0
    })

  },

  // 选择补充公积金picker
  bindPickerChange(e) {
    const index = Number(e.detail.value)
    const exppDict = this.data.expp_gjj_percent_array[index]
    this.setData({
      expp_gjj_index: index,
      expp_gjj_percent: exppDict.value
    })
  },
  // 勾选补充公积金
  bindCheckBoxChange(e) {
    const exppDict = this.data.expp_gjj_percent_array[this.data.expp_gjj_index]
    this.setData({
      expp_gjj_percent: exppDict.value,
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
    this.setData({
      gjj_check: !this.data.gjj_check,
      expp_gjj_check: false
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
    } else if (num < this.data.sb_min) {
      num = this.data.sb_min;
    } else if (num > this.data.sb_max) {
      num = this.data.sb_max;
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
    } else if (num < this.data.gjj_min) {
      num = this.data.gjj_min;
    } else if (num > this.data.gjj_max) {
      num = this.data.gjj_max;
    }
    this.setData({
      gjj_num: num
    })
  },

  bindAdditionPickerChange: function (e) {
    const arr = this.data.additionArray
    const index = e.currentTarget.id
    const addition = arr[index]
    addition.value = addition.dataSource[e.detail.value]
    var total = 0
    for (let i = 0; i < arr.length; ++i) {
      const tempAddition = arr[i]
      total = total + tempAddition.value
    }
    this.setData({
      additionArray: arr,
      additionTotal: total
    })
  },


  caclulateAfterRateMoney(e) {
    wx.showLoading({
      title: '计算中...',
    })
    const self = this
    var random = Math.random() * (800 - 200 + 1) + 200
    setTimeout(function () {
      wx.hideLoading()
      self.caclulate()
    }, random)
  },

  caclulate(e) {
    const city = this.data.cityArray[this.data.cityIndex]
    var ee = {}

    // 个人扣除项目
    ee['yaonglao_personal'] = this.data.sb_num * city.yanglao_personal_rate
    ee['yiliao_personal'] = this.data.sb_num * city.yiliao_personal_rate
    ee['shiye_personal'] = this.data.sb_num * city.sy_personal_rate
    if (this.data.gjj_check) {
      ee['gjj_personal'] = this.data.gjj_num * city.gjj_personal_rate
      if (this.data.expp_gjj_check) {
        ee['expp_gjj_personal'] = this.data.gjj_num * this.data.expp_gjj_percent
      } else {
        ee['expp_gjj_personal'] = 0;
      }
    } else {
      ee['gjj_personal'] = 0;
      ee['expp_gjj_personal'] = 0;
    }
    ee['total_personal'] = ee.yaonglao_personal + ee.yiliao_personal + ee.shiye_personal + ee.gjj_personal + ee.expp_gjj_personal
    this.data.total_personal = ee.total_personal
    // 公司扣除项目
    ee['yaonglao_company'] = this.data.sb_num * city.yanglao_company_rate
    ee['yiliao_company'] = this.data.sb_num * city.yiliao_company_rate
    ee['shiye_company'] = this.data.sb_num * city.sy_company_rate
    if (this.data.gjj_check) {
      ee['gjj_company'] = this.data.gjj_num * city.gjj_company_rate
      if (this.data.expp_gjj_check) {
        ee['expp_gjj_company'] = this.data.gjj_num * this.data.expp_gjj_percent
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
    for (let i = 0; i < this.data.taxRateData.length; ++i) {
      const taxRate = this.data.taxRateData[i]
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
    for (let i = 0; i < this.data.oldTaxRateData.length; ++i) {
      const taxRate = this.data.oldTaxRateData[i]
      if (ee.old_before_tax > taxRate.minRateMoney && ee.old_before_tax <= taxRate.maxRateMoney) {
        ee['old_tax'] = Number(ee.old_before_tax * taxRate.rate - taxRate.rapid)
      }
    }
    ee['old_final_salary'] = this.data.shuiQianNum - ee.total_personal - ee.old_tax

    const datadict = this.data.deductList
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
    console.log(123)
    this.data.deductList = datadict
    this.caclulateCurrentYear(ee)

    wx.reportAnalytics('input_salary', {
      salarynum: this.data.shuiQianNum,
      salary_after_tax_num: ee.final_salary,
    });
  },

  caclulateCurrentYear(ee) {
    this.yearTaxList = []
    for (var i = 0; i < 12; i++) {
      var lastMounthTax
      if (i === 0) {
        lastMounthTax = { mounth: 0, totalShuiQianNum: 0, totalTax: 0, totalAddition: 0, total3J: 0, totalBase: 0, shuiQianNum: 0, tax: 0, personal3j: 0, additionNum: 0, totalSalary:0 }
      } else {
        lastMounthTax = this.yearTaxList[i - 1]
      }
      if (i === 1) {
        lastMounthTax.additionNum = 0
      }
      const currentMounth = this.caclulateCurrentMounth(lastMounthTax, ee)
      this.yearTaxList = this.yearTaxList.concat(currentMounth)
    }
    this.navgationToYearTaxCaculate(this.yearTaxList, ee)
  },


  caclulateCurrentMounth(lastMounthTax, ee) {
    var currentMounth = { mounth: 0, totalShuiQianNum: 0, totalTax: 0, totalAddition: 0, total3J: 0, totalBase: 0, shuiQianNum: 0, tax: 0, personal3j: 0, additionNum: 0, totalSalary:0 }
    currentMounth.mounth = lastMounthTax.mounth + 1
    currentMounth.totalBase = lastMounthTax.totalBase + 5000
    // 税前
    currentMounth.shuiQianNum = this.data.shuiQianNum
    currentMounth.totalShuiQianNum = lastMounthTax.totalShuiQianNum + currentMounth.shuiQianNum

    // 三金
    currentMounth.personal3j = this.data.total_personal
    currentMounth.total3J = lastMounthTax.total3J + currentMounth.personal3j

    // 附加扣除
    currentMounth.additionNum = this.data.additionTotal
    currentMounth.totalAddition = lastMounthTax.totalAddition + this.data.additionTotal

    // 扣税
    var yinShuiNum = currentMounth.totalShuiQianNum - currentMounth.totalAddition - currentMounth.total3J - currentMounth.totalBase

    if (currentMounth.mounth === 1) {
      yinShuiNum += this.data.additionTotal
    }

    var taxRate
    for (let i = 0; i < this.data.yearTaxRateData.length; ++i) {
      const tempTaxRate = this.data.yearTaxRateData[i]
      if (yinShuiNum >= tempTaxRate.minRateMoney && yinShuiNum <= tempTaxRate.maxRateMoney) {
        taxRate = tempTaxRate
      }
    }
    currentMounth.tax = Number((yinShuiNum * taxRate.rate - taxRate.rapid - lastMounthTax.totalTax).toFixed(1))
    currentMounth.totalTax = Number((lastMounthTax.totalTax + currentMounth.tax).toFixed(1))

    // 最终工资
    currentMounth['final_salary'] = Number((currentMounth.shuiQianNum - currentMounth.personal3j - currentMounth.tax).toFixed(1))
    currentMounth.totalSalary = Number((lastMounthTax.totalSalary + currentMounth['final_salary']).toFixed(1))

    return currentMounth
  },










  navgationToTaxCaculate() {
    wx.navigateTo({
      url: 'tax/index?taxRateData=' + JSON.stringify(this.data.taxRateData)
        + '&oldTaxRateData=' + JSON.stringify(this.data.oldTaxRateData)
        + '&yearTaxRateData=' + JSON.stringify(this.data.yearTaxRateData)
    })
  },

  navgationToYearTaxCaculate(yearTaxList, ee) {
    wx.navigateTo({
      url: `year-tax/index?yearTaxList=${JSON.stringify(yearTaxList)}&shuiQianNum=${this.data.shuiQianNum}&deductList=${JSON.stringify(this.data.deductList)}&caclulateResult=${JSON.stringify(ee)}`
    })
  }
})
