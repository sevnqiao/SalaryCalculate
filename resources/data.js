
const expp_gjj_percent_array = [
  { name: '1%', value: 0.01 },
  { name: '2%', value: 0.02 },
  { name: '3%', value: 0.03 },
  { name: '4%', value: 0.04 },
  { name: '5%', value: 0.05 },
  { name: '6%', value: 0.06 },
  { name: '7%', value: 0.07 },
  { name: '8%', value: 0.08 }
]

// 扣除项目
const deductList = [
  { orgValue: '', value: '', name: '养老保险金' },
  { orgValue: '', value: '', name: '医疗保险金' },
  { orgValue: '', value: '', name: '失业保险金' },
  { orgValue: '', value: '', name: '基本住房公积金' },
  { orgValue: '', value: '', name: '补充住房公积金' },
  { orgValue: '', value: '', name: '工伤保险金' },
  { orgValue: '', value: '', name: '生育保险金' },
  { orgValue: '', value: '', name: '共计支出' }
]

// 附加抵扣项
const additionArray = [
  { name: '子女教育：', dataSource: [0, 500, 1000], value: 0 },
  { name: '继续教育：', dataSource: [0, 300, 400], value: 0 },
  { name: '大病医疗：', dataSource: [0], value: 0 },
  { name: '贷款利息：', dataSource: [0, 1000], value: 0 },
  { name: '住房租金：', dataSource: [0, 800, 1100, 1500], value: 0 },
  { name: '赡养老人：', dataSource: [0, 1000, 2000], value: 0 }
]

// 城市数据
const cityArray = [
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
]

const taxRateData = [
  { minRateMoney: 0, maxRateMoney: 3000, rate: 0.03, rateText: '3%', rapid: 0 },
  { minRateMoney: 3000, maxRateMoney: 12000, rate: 0.1, rateText: '10%', rapid: 210 },
  { minRateMoney: 12000, maxRateMoney: 25000, rate: 0.2, rateText: '20%', rapid: 1410 },
  { minRateMoney: 25000, maxRateMoney: 35000, rate: 0.25, rateText: '25%', rapid: 2660 },
  { minRateMoney: 35000, maxRateMoney: 55000, rate: 0.3, rateText: '30%', rapid: 4410 },
  { minRateMoney: 55000, maxRateMoney: 80000, rate: 0.35, rateText: '35%', rapid: 7160 },
  { minRateMoney: 80000, maxRateMoney: 999999, rate: 0.45, rateText: '45%', rapid: 15160 }
]

const yearTaxRateData = [
  { minRateMoney: 0, maxRateMoney: 36000, rate: 0.03, rateText: '3%', rapid: 0 },
  { minRateMoney: 36000, maxRateMoney: 144000, rate: 0.1, rateText: '10%', rapid: 2520 },
  { minRateMoney: 144000, maxRateMoney: 300000, rate: 0.2, rateText: '20%', rapid: 16920 },
  { minRateMoney: 300000, maxRateMoney: 420000, rate: 0.25, rateText: '25%', rapid: 31920 },
  { minRateMoney: 420000, maxRateMoney: 660000, rate: 0.3, rateText: '30%', rapid: 52920 },
  { minRateMoney: 660000, maxRateMoney: 9600000, rate: 0.35, rateText: '35%', rapid: 85920 },
  { minRateMoney: 9600000, maxRateMoney: 99999999, rate: 0.45, rateText: '45%', rapid: 181920 }
]

const oldTaxRateData = [
  { minRateMoney: 0, maxRateMoney: 1500, rate: 0.03, rateText: '3%', rapid: 0 },
  { minRateMoney: 1500, maxRateMoney: 4500, rate: 0.1, rateText: '10%', rapid: 105 },
  { minRateMoney: 4500, maxRateMoney: 9000, rate: 0.2, rateText: '20%', rapid: 555 },
  { minRateMoney: 9000, maxRateMoney: 35000, rate: 0.25, rateText: '25%', rapid: 1005 },
  { minRateMoney: 35000, maxRateMoney: 55000, rate: 0.3, rateText: '30%', rapid: 2755 },
  { minRateMoney: 55000, maxRateMoney: 80000, rate: 0.35, rateText: '35%', rapid: 5505 },
  { minRateMoney: 80000, maxRateMoney: 999999, rate: 0.45, rateText: '45%', rapid: 13505 }
]

module.exports = {
  expp_gjj_percent_array: expp_gjj_percent_array,
  deductList: deductList,
  additionArray: additionArray,
  cityArray: cityArray,
  taxRateData: taxRateData,
  yearTaxRateData: yearTaxRateData,
  oldTaxRateData: oldTaxRateData,
}