// pages/index/annual-bonus/index.js

import {
  taxRateData,
  oldTaxRateData
} from '../../../resources/data.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    deductList: 
    [
      { name: '平均到每个月', value: '', oldValue: '' },
      { name: '扣税', value: '', oldValue: '' },
      { name: '税后奖金', value: '', oldValue: '' }
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      shuiQianNum: Number(options.shuiQianNum)
    })
  },

  inputShuiQian(e) {
    this.data.shuiQianNum = Number(e.detail.value)
  },

  caclulateAfterRateMoney() {
    const per_mounth = this.data.deductList[0]
    const tax = this.data.deductList[1]
    const final_money = this.data.deductList[2]
    const newTax = this.cacluateNewTax(this.data.shuiQianNum, taxRateData)
    const oldTax = this.cacluateNewTax(this.data.shuiQianNum, oldTaxRateData)

    per_mounth.value = newTax.per_mounth
    per_mounth.oldValue = oldTax.per_mounth

    tax.value = newTax.tax
    tax.oldValue = oldTax.tax

    final_money.value = newTax.final_money
    final_money.oldValue = oldTax.final_money

    this.setData({
      deductList: [
        per_mounth, tax, final_money
      ],
      expp_salary: oldTax.tax - newTax.tax
    })
  },

  cacluateNewTax(money,taxRateList){
    const yinShuiNum = money / 12
    var taxRate
    for (let i = 0; i < taxRateList.length; ++i) {
      const tempTaxRate = taxRateList[i]
      if (yinShuiNum >= tempTaxRate.minRateMoney && yinShuiNum <= tempTaxRate.maxRateMoney) {
        taxRate = tempTaxRate
      }
    }
    const tax = money * taxRate.rate - taxRate.rapid
    const final_money = money - tax
    return{
      per_mounth: yinShuiNum.toFixed(0),
      tax: tax.toFixed(0),
      final_money: final_money.toFixed(0)
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  navgationToTaxCaculate() {
    wx.navigateTo({
      url: 'annual-bonus-tax/index'
    })
  },
})