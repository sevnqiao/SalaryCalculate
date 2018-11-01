//index.js
//获取应用实例
var wxCharts = require('../../utils/wxcharts.js');
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
    // 是否隐藏底部饼状图
    hidden_pichart: Boolean(true),
    // 税前工资
    shuiQianNum: Number(10000),
    // 社保相关
    sb_num: Number(0),
    sb_min: Number(0),
    sb_max: Number(0),
    // 公积金相关
    gjj_num: Number(0),
    gjj_min: Number(0),
    gjj_max: Number(0),
    // 记录企业总支出
    org_pay: Number(0),

    // 补充公积金
    expp_gjj_index: Number(0),
    expp_gjj_percent: Number(0),
    expp_gjj_percent_array: [
      { name: '1%', value: '0.01' },
      { name: '2%', value: '0.02' },
      { name: '3%', value: '0.03' },
      { name: '4%', value: '0.04' },
      { name: '5%', value: '0.05' },
      { name: '6%', value: '0.06' },
      { name: '7%', value: '0.07' },
      { name: '8%', value: '0.08' }
    ],

    // 扣除项目
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

    // 附加抵扣项
    additionArray: [
      { orgValue: '', value: '', name: '子女教育(1000元)' },
      { orgValue: '', value: '', name: '继续教育(1000元)' },
      { orgValue: '', value: '', name: '大病医疗(1000元)' },
      { orgValue: '', value: '', name: '住房贷款利息(1000元)' },
      { orgValue: '', value: '', name: '住房租金(1000元)' },
      { orgValue: '', value: '', name: '赡养老人(1000元)' }
    ],

    // 城市数据
    cityIndex: 0,
    current_city: 'beijing',
    cityArray: [
      { name: '北京', enName: 'beijing', sb_min: '3387', sb_max: '25401', gjj_min: '2273', gjj_max: '25401'},
      { name: '上海', enName: 'shanghai', sb_min: '4279', sb_max: '21396', gjj_min: '2300', gjj_max: '21400'},
      { name: '天津', enName: 'tianjin', sb_min: '3364', sb_max: '16821', gjj_min: '2050', gjj_max: '24240'},
      { name: '深圳', enName: 'shenzhen', sb_min: '2200', sb_max: '25044', gjj_min: '2130', gjj_max: '25044' },
      { name: '杭州', enName: 'hangzhou', sb_min: '3055', sb_max: '15275', gjj_min: '2010', gjj_max: '24311' },
      { name: '广州', enName: 'guangzhou', sb_min: '2100', sb_max: '99999', gjj_min: '2100', gjj_max: '24654' },
      { name: '南京', enName: 'nanjing', sb_min: '3030', sb_max: '19935', gjj_min: '1890', gjj_max: '22500'},
      { name: '济南', enName: 'jinan', sb_min: '3510', sb_max: '17550', gjj_min: '1910', gjj_max: '17550' },
      { name: '贵阳', enName: 'guiyang', sb_min: '3227', sb_max: '16137', gjj_min: '1400', gjj_max: '33750' },
      { name: '西安', enName: 'xian', sb_min: '3372', sb_max: '19443', gjj_min: '1680', gjj_max: '19443' },
      { name: '乌鲁木齐', enName: 'wulumuqi', sb_min: '3019', sb_max: '15096', gjj_min: '1620', gjj_max: '15399' },
      { name: '福州', enName: 'fuzhou', sb_min: '1800', sb_max: '18783', gjj_min: '1650', gjj_max: '18783' },
      { name: '石家庄', enName: 'shijiazhuang', sb_min: '3028', sb_max: '99999', gjj_min: '3308', gjj_max: '16539' },
      { name: '呼和浩特', enName: 'huhehaote', sb_min: '2810', sb_max: '14052', gjj_min: '1760', gjj_max: '15498' },
      { name: '太原', enName: 'taiyuan', sb_min: '3077', sb_max: '15387', gjj_min: '1625', gjj_max: '16206' },
      { name: '兰州', enName: 'lanzhou', sb_min: '3287', sb_max: '16431', gjj_min: '1620', gjj_max: '18071' },
      { name: '郑州', enName: 'zhengzhou', sb_min: '3524', sb_max: '17621', gjj_min: '3524', gjj_max: '17625' },
      { name: '长沙', enName: 'changsha', sb_min: '2695', sb_max: '13473', gjj_min: '1580', gjj_max: '31950' },
      { name: '昆明', enName: 'kunming', sb_min: '3676', sb_max: '18378', gjj_min: '1570', gjj_max: '19088' },
      { name: '武汉', enName: 'wuhan', sb_min: '3400', sb_max: '19921', gjj_min: '1750', gjj_max: '29881' },
      { name: '沈阳', enName: 'shenyang', sb_min: '66', sb_max: '99999', gjj_min: '1620', gjj_max: '18545' },
      { name: '南昌', enName: 'nanchang', sb_min: '2807', sb_max: '15774', gjj_min: '1083', gjj_max: '16450' },
      { name: '合肥', enName: 'hefei', sb_min: '3396', sb_max: '16981', gjj_min: '1520', gjj_max: '20172' },
      { name: '重庆', enName: 'chongqing', sb_min: '3664', sb_max: '18318', gjj_min: '1500', gjj_max: '18318' },
      { name: '成都', enName: 'chengdu', sb_min: '2388', sb_max: '17908', gjj_min: '1500', gjj_max: '22302' },
      { name: '西宁', enName: 'xining', sb_min: '3827', sb_max: '19134', gjj_min: '3827', gjj_max: '19134' },
      { name: '长春', enName: 'changchun', sb_min: '3606', sb_max: '18410', gjj_min: '2000', gjj_max: '21485' },
      { name: '哈尔滨', enName: 'haerbin', sb_min: '2787', sb_max: '15646', gjj_min: '1680', gjj_max: '14601' },
      { name: '银川', enName: 'yinchuan', sb_min: '3392', sb_max: '16957', gjj_min: '1660', gjj_max: '17025' },
      { name: '海口', enName: 'haikou', sb_min: '3453', sb_max: '17265', gjj_min: '1430', gjj_max: '15508' },
      { name: '南宁', enName: 'nanning', sb_min: '2834', sb_max: '14171', gjj_min: '1680', gjj_max: '18870' },

    ],
  },

  onLoad:function(){

    const cityDict = this.data.cityArray[this.data.cityIndex]
    this.setData({
      sb_num: cityDict.sb_min,
      gjj_num: cityDict.gjj_min,

      sb_min: cityDict.sb_min,
      sb_max: cityDict.sb_max,
      gjj_min: cityDict.gjj_min,
      gjj_max: cityDict.gjj_max,

      current_city: cityDict.enName,
    })

  },

  // 选择城市
  selectCity(e) {
    var tempIndex = new Number(e.detail.value)
    if (tempIndex == this.data.cityIndex) {
      return
    }
    const cityDict = this.data.cityArray[tempIndex]

    this.setData ({
      sb_num: cityDict.sb_min,
      gjj_num: cityDict.gjj_min,

      cityIndex: tempIndex,
      current_city: cityDict.enName,

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
    const index = new Number(e.detail.value)
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
      gjj_check: !this.data.gjj_check
    })
  },
  // 输入税前工资
  inputShuiQian(e) {
    var shebao = this.data.sb_num
    var gongjijin = this.data.gjj_num
    if (this.data.disable_sb_input) {
      shebao = e.detail.value
      if (shebao < this.data.sb_min) {
        shebao = this.data.sb_min;
      } else if (shebao > this.data.sb_max) {
        shebao = this.data.sb_max;
      }
    }
    if (this.data.disable_gjj_input) {
      gongjijin = e.detail.value
      if (gongjijin < this.data.gjj_min) {
        gongjijin = this.data.gjj_min;
      } else if (gongjijin > this.data.gjj_max) {
        gongjijin = this.data.gjj_max;
      }
    }
    this.setData ({
      shuiQianNum: e.detail.value,
      sb_num: shebao,
      gjj_num: gongjijin
    })
  },
  // 社保基数修改完成事件
  blurSheBao(e) {
    var num = new Number(e.detail.value)
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
    var num = new Number(e.detail.value)
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

  // 计算税后工资
  caclulate(e) {
    const self = this

    wx.showLoading({
      title: '计算中...',
    })

    wx.request({
      url: 'https://salarycalculator.sinaapp.com/calculate',
      data:{
        city: this.data.current_city,
        origin_salary: this.data.shuiQianNum,
        base_3j: this.data.sb_num,
        base_gjj: this.data.gjj_num,
        is_gjj: this.data.gjj_check,
        is_exgjj: this.data.expp_gjj_check,
        factor_exgjj: this.data.expp_gjj_percent
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        wx.hideLoading()
        const datadict = self.data.items
        for (let i = 0, lenI = datadict.length; i < lenI; ++i) {
          const item = datadict[i]
          if (i==0){
            item.value =  res.data.personal_yanglao + '(' + (res.data.personal_yanglao / self.data.sb_num * 100).toFixed() + '%)'
            item.orgValue =  res.data.org_yanglao + '(' + (res.data.org_yanglao / self.data.sb_num * 100).toFixed() + '%)'
          } else if (i == 1) {
            item.value =  res.data.personal_yiliao + '(' + (res.data.personal_yiliao / self.data.sb_num * 100).toFixed(1) + '%)'
            item.orgValue =  res.data.org_yiliao + '(' + (res.data.org_yiliao / self.data.sb_num * 100).toFixed(1) + '%)'
          } else if (i == 2) {
            item.value =  res.data.personal_shiye  + '(' + (res.data.personal_shiye / self.data.sb_num * 100).toFixed(1) + '%)'
            item.orgValue =  res.data.org_shiye  + '(' + (res.data.org_shiye / self.data.sb_num * 100).toFixed(1) + '%)'
          } else if (i == 3) {
            item.value =  res.data.personal_gjj  + '(' + (res.data.personal_gjj / self.data.gjj_num * 100).toFixed() + '%)'
            item.orgValue =  res.data.org_gjj  + '(' + (res.data.org_gjj / self.data.gjj_num * 100).toFixed() + '%)'
          } else if (i == 4) {
            item.value =  res.data.personal_exgjj  + '(' + self.data.expp_gjj_percent*100 + '%)'
            item.orgValue =  res.data.org_exgjj   + '(' + self.data.expp_gjj_percent * 100 + '%)'
          } else if (i == 5) {
            item.orgValue = res.data.org_gongshang + '(' + (res.data.org_gongshang / self.data.sb_num * 100).toFixed(2) + '%)'
          } else if (i == 6) {
            item.orgValue = res.data.org_shengyu + '(' + (res.data.org_shengyu / self.data.sb_num * 100).toFixed(2) + '%)'
          } else if (i == 7) {
            item.value =  res.data.personal_allpay
            item.orgValue =  res.data.org_allpay
          } else if (i == 8) {
            item.value =  res.data.before_tax
          } else if (i == 9) {
            item.value =  res.data.tax
            item.orgValue =  res.data.old_tax + '(老税法)'
          } else if (i == 10) {
            item.value =  res.data.final_salary
            item.orgValue =  res.data.old_final_salary +'(老税法)'
          }
        }
        // console.log('picker发送选择改变，携带值为', self.data.items)

        self.setData({
          items: datadict,
          hidden_pichart: false
        })

        self.createPieChart(res.data)
        self.createOrgPieChart(res.data)
      },
      fail() {
        wx.hideLoading()
      }
    })

  },
  // 绘制底部饼状图
  createPieChart: function (e){
    var windowWidth = 320;
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }
    pieChart = new wxCharts({
      animation: true,
      canvasId: 'pieCanvas',
      type: 'pie',
      series: [{
        name: '养老保险',
        data: e.personal_yanglao / this.data.shuiQianNum * 100,
      }
      , {
        name: '医疗保险',
        data: e.personal_yiliao / this.data.shuiQianNum * 100,
      }
      , {
        name: '失业保险',
        data: e.personal_shiye / this.data.shuiQianNum * 100,
      }
      , {
        name: '公积金',
        data: e.personal_gjj / this.data.shuiQianNum * 100,
      }
      , {
        name: '补充公积金',
        data: e.personal_exgjj / this.data.shuiQianNum * 100,
      }
      , {
        name: '个人所得税',
        data: e.tax / this.data.shuiQianNum * 100,
      }
      , {
        name: '税后月薪',
        data: e.before_tax / this.data.shuiQianNum * 100,
      }
      ],
      width: windowWidth,
      height: 300,
      dataLabel: true,
    })
  },
  createOrgPieChart: function (e) {
    var windowWidth = 320
    var orgTotalPay = new Number(e.org_allpay)
    orgTotalPay += this.data.shuiQianNum
    this.setData({
      org_pay: orgTotalPay
    })

    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }
    pieChart = new wxCharts({
      animation: true,
      canvasId: 'orgPieCanvas',
      type: 'pie',
      series: [
        {
          name: '个人税前工资',
          data: this.data.shuiQianNum / orgTotalPay * 100,
        }, {
          name: '养老保险',
          data: e.org_yanglao / orgTotalPay * 100,
        }, {
          name: '医疗保险',
          data: e.org_yiliao / orgTotalPay * 100,
        }, {
          name: '失业保险',
          data: e.org_shiye / orgTotalPay * 100,
        }, {
          name: '生育保险',
          data: e.org_shengyu / orgTotalPay * 100,
        }, {
          name: '工伤保险',
          data: e.org_gongshang / orgTotalPay * 100,
        }, {
          name: '公积金',
          data: e.org_gjj / orgTotalPay * 100,
        }, {
          name: '补充公积金',
          data: e.org_exgjj / orgTotalPay * 100,
        }
      ],
      width: windowWidth,
      height: 300,
      dataLabel: true,
    })
  }
})
