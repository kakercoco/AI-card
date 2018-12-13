//所有名片模板
//珍岛的模板
let zhendao_list = [];
let company_list = ['上海','无锡','苏州','宁波','温州','深圳','成都','杭州'];
let index = 0;
let num = 0
for(let i = 0;i<24;i++){
    let zhendao_obj = {
        type:'zhendao',
        templateId:i,
        subheading:'',//副标题
        company:'',//公司
        local:'',//地方
        background_img:require('@/assets/card/1.png'),//背景图片
        phone_icon:require('@/assets/nav/phone.png'),//电话图片
        email_icon:require('@/assets/nav/email.png'),//邮件图片
        address_icon:require('@/assets/nav/map.png'),//地址图片
    }

    num ++
    if(num > 3){
        index ++
        num = 1;
    }
    zhendao_obj.company = `珍岛股份·${company_list[index]}`;
    zhendao_obj.local = company_list[index];

    if((i - 1) % 3 == 0 ){
        zhendao_obj.subheading = 'T云商务';
    }
    else if((i - 2) % 3 == 0){
        zhendao_obj.subheading = 'T云客服';
    }
    zhendao_list.push(zhendao_obj)
}

//其他模板参数
let other_list = [
    {
        type:'other',
        templateId:24,
        subheading:'',//副标题
        company:'',//公司
        local:'',//地方
        background_img:require('@/assets/card/15.png'),//背景图片
        phone_icon:require('@/assets/nav/phone3.png'),//电话图片
        email_icon:require('@/assets/nav/email3.png'),//邮件图片
        address_icon:require('@/assets/nav/address3.png'),//地址图片
    }
]

const template_list = zhendao_list.concat(other_list);
console.log(template_list);


export default template_list