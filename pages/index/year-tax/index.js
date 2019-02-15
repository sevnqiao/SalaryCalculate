// pages/index/year-tax/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    yearTaxList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var yearTaxList = JSON.parse(options.yearTaxList)
    this.data.shuiQianNum = Number(options.shuiQianNum)
    const caclulateResult = JSON.parse(options.caclulateResult)
    const deductList = JSON.parse(options.deductList)
    
    yearTaxList = yearTaxList.map(function (item) {
      var tempItem = item
      item['old_tax'] = Number((caclulateResult.old_tax).toFixed(1))
      item['old_final_salary'] = Number((caclulateResult.old_final_salary).toFixed(1))
      return tempItem
    });

    const total = {
      tax: yearTaxList[11].totalTax,
      oldTax: Number((caclulateResult.old_tax * 12).toFixed(1)),
      salary: yearTaxList[11].totalSalary,
      oldSalary: Number((caclulateResult.old_final_salary * 12).toFixed(1))
    }

    this.setData({
      expp_salary: (total.oldTax - total.tax).toFixed(0), 
      total: total,
      caclulateResult: caclulateResult,
      deductList: deductList,
      yearTaxList: yearTaxList,
      totalSalary: yearTaxList[11].totalSalary
    })
  },



  // 绘制底部饼状图
  createPieChart: function (city, salary) {
    var windowWidth = 320;
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (city) {
      console.error('getSystemInfoSync failed!');
    }
    pieChart = new wxCharts({
      animation: true,
      canvasId: 'pieCanvas',
      type: 'pie',
      series: [
        {
          name: '养老保险',
          data: salary.yaonglao_personal / this.data.shuiQianNum * 100,
        }
        , {
          name: '医疗保险',
          data: salary.yiliao_personal / this.data.shuiQianNum * 100,
        }, {
          name: '失业保险',
          data: salary.shiye_personal / this.data.shuiQianNum * 100,
        }, {
          name: '公积金',
          data: salary.gjj_personal / this.data.shuiQianNum * 100,
        }, {
          name: '补充公积金',
          data: salary.expp_gjj_personal / this.data.shuiQianNum * 100,
        },
        {
          name: '个人所得税',
          data: salary.tax / this.data.shuiQianNum * 100,
        }, {
          name: '税后月薪',
          data: salary.before_tax / this.data.shuiQianNum * 100,
        }
      ],
      width: windowWidth,
      height: 300,
      dataLabel: true,
    })
  },
  createOrgPieChart: function (city, salary) {
    var windowWidth = 320
    var orgTotalPay = salary.total_company + this.data.shuiQianNum
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
          data: salary.yaonglao_company / orgTotalPay * 100,
        }, {
          name: '医疗保险',
          data: salary.yiliao_company / this.data.shuiQianNum * 100,
        }, {
          name: '失业保险',
          data: salary.shiye_company / orgTotalPay * 100,
        }, {
          name: '生育保险',
          data: salary.shyu_company / orgTotalPay * 100,
        }, {
          name: '工伤保险',
          data: salary.gs_company / orgTotalPay * 100,
        }, {
          name: '公积金',
          data: salary.gjj_company / orgTotalPay * 100,
        }, {
          name: '补充公积金',
          data: salary.expp_gjj_company / orgTotalPay * 100,
        }
      ],
      width: windowWidth,
      height: 300,
      dataLabel: true,
    })
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})