// 所有名片模板
// 珍岛的模板
let zhendaoList = []
let companyList = ['上海', '无锡', '苏州', '宁波', '温州', '深圳', '成都', '杭州']
let index = 0
let num = 0
for (let i = 0; i < 24; i++) {
  let zhendaoObj = {
    type: 'zhendao',
    templateId: i,
    subheading: '', // 副标题
    company: '', // 公司
    local: '', // 地方
    background_img: require('@/assets/card/1.png'), // 背景图片
    phone_icon: require('@/assets/nav/phone.png'), // 电话图片
    email_icon: require('@/assets/nav/email.png'), // 邮件图片
    address_icon: require('@/assets/nav/map.png')// 地址图片
  }

  num++
  if (num > 3) {
    index++
    num = 1
  }
  zhendaoObj.company = `珍岛股份·${companyList[index]}`
  zhendaoObj.local = companyList[index]

  if ((i - 1) % 3 === 0) {
    zhendaoObj.subheading = 'T云商务'
  } else if ((i - 2) % 3 === 0) {
    zhendaoObj.subheading = 'T云客服'
  }
  zhendaoList.push(zhendaoObj)
}

// 其他模板参数
let otherList = [
  {
    type: 'other', // 珍岛的模板是zhendao，别的都是other
    templateId: 24,
    subheading: '', // 副标题
    company: '', // 公司
    local: '', // 地方
    background_img: require('@/assets/card/15.png'), // 背景图片
    phone_icon: require('@/assets/nav/phone3.png'), // 电话图片
    email_icon: require('@/assets/nav/email3.png'), // 邮件图片
    address_icon: require('@/assets/nav/address3.png'), // 地址图片
    thumbnail: require('@/assets/card/thumbnail/3.png')// 缩略图
  },
  {
    type: 'other', // 珍岛的模板是zhendao，别的都是other
    templateId: 25,
    subheading: '', // 副标题-不是珍岛的模板不用填
    company: '', // 公司-不是珍岛的模板不用填
    local: '', // 地方-不是珍岛的模板不用填
    background_img: require('@/assets/card/16.png'), // 背景图片
    phone_icon: require('@/assets/nav/phone4.png'), // 电话图片
    email_icon: require('@/assets/nav/email4.png'), // 邮件图片
    address_icon: require('@/assets/nav/address4.png'), // 地址图片
    thumbnail: require('@/assets/card/16.png')// 缩略图
  },
  {
    type: 'other', // 珍岛的模板是zhendao，别的都是other
    templateId: 26,
    subheading: '', // 副标题-不是珍岛的模板不用填
    company: '', // 公司-不是珍岛的模板不用填
    local: '', // 地方-不是珍岛的模板不用填
    background_img: require('@/assets/card/17.png'), // 背景图片
    phone_icon: require('@/assets/nav/phone4.png'), // 电话图片
    email_icon: require('@/assets/nav/email4.png'), // 邮件图片
    address_icon: require('@/assets/nav/address4.png'), // 地址图片
    thumbnail: require('@/assets/card/thumbnail/1.png')// 缩略图
  },
  {
    type: 'other', // 珍岛的模板是zhendao，别的都是other
    templateId: 27,
    subheading: '', // 副标题-不是珍岛的模板不用填
    company: '', // 公司-不是珍岛的模板不用填
    local: '', // 地方-不是珍岛的模板不用填
    background_img: require('@/assets/card/1.png'), // 背景图片
    phone_icon: require('@/assets/nav/phone4.png'), // 电话图片
    email_icon: require('@/assets/nav/email4.png'), // 邮件图片
    address_icon: require('@/assets/nav/address4.png'), // 地址图片
    thumbnail: require('@/assets/card/thumbnail/1.png')// 缩略图
  },
  {
    type: 'other', // 珍岛的模板是zhendao，别的都是other
    templateId: 28,
    subheading: '', // 副标题-不是珍岛的模板不用填
    company: '', // 公司-不是珍岛的模板不用填
    local: '', // 地方-不是珍岛的模板不用填
    background_img: require('@/assets/card/18.png'), // 背景图片
    phone_icon: require('@/assets/nav/cellphone1.png'), // 电话图片
    email_icon: require('@/assets/nav/email.png'), // 邮件图片
    address_icon: require('@/assets/nav/address1.png'), // 地址图片
    thumbnail: require('@/assets/card/thumbnail/5.png')// 缩略图
  },
  {
    type: 'other', // 珍岛的模板是zhendao，别的都是other
    templateId: 29,
    subheading: '', // 副标题-不是珍岛的模板不用填
    company: '', // 公司-不是珍岛的模板不用填
    local: '', // 地方-不是珍岛的模板不用填
    background_img: require('@/assets/card/19.png'), // 背景图片
    phone_icon: require('@/assets/nav/cellphone1.png'), // 电话图片
    email_icon: require('@/assets/nav/email.png'), // 邮件图片
    address_icon: require('@/assets/nav/address1.png'), // 地址图片
    thumbnail: require('@/assets/card/thumbnail/6.png')// 缩略图
  },
  {
    type: 'other', // 珍岛的模板是zhendao，别的都是other
    templateId: 30,
    subheading: '', // 副标题-不是珍岛的模板不用填
    company: '', // 公司-不是珍岛的模板不用填
    local: '', // 地方-不是珍岛的模板不用填
    background_img: require('@/assets/card/20.png'), // 背景图片
    phone_icon: require('@/assets/nav/phone4.png'), // 电话图片
    email_icon: require('@/assets/nav/email4.png'), // 邮件图片
    address_icon: require('@/assets/nav/address4.png'), // 地址图片
    thumbnail: require('@/assets/card/thumbnail/7.png')// 缩略图
  },
  {
    type: 'other', // 珍岛的模板是zhendao，别的都是other
    templateId: 31,
    subheading: '', // 副标题
    company: '', // 公司
    local: '', // 地方
    background_img: require('@/assets/card/21.png'), // 背景图片
    phone_icon: require('@/assets/nav/phone3.png'), // 电话图片
    email_icon: require('@/assets/nav/email3.png'), // 邮件图片
    address_icon: require('@/assets/nav/address3.png'), // 地址图片
    thumbnail: require('@/assets/card/thumbnail/8.png')// 缩略图
  }

]

const templateList = zhendaoList.concat(otherList)
console.log(templateList)

export default templateList
