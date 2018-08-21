/**
 * Created by brave on 2018/8/6.
 */


let mongodb = {
    host:'localhost',
    port:27017,
    name:'myPhone'
};
let mongoose = require('mongoose');
mongoose.connect('mongodb://' + mongodb.host + ':' + mongodb.port + '/' + mongodb.name);
mongoose.set('debug', true);
mongoose.Promise = global.Promise;


let phoneNumberDao = require('./models/phoneNumberModel');



let findNumber = async function(){

    let phoneNumbers = await phoneNumberDao.query({});
    console.log('phoneNumbers:'+phoneNumbers.length);

    for (let i = 0; i < phoneNumbers.length; i++) {
        let phoneNumber = phoneNumbers[i];
        let phoneNum = phoneNumber.phoneNum;
        let rule1Result = rule1(phoneNum);
        let rule2Result = rule2(phoneNum);
        console.log('-------phoneNumber _id:'+phoneNumber._id +',pn:'+phoneNumber.phoneNum+',rule1Result:'+rule1Result+',rule2Result:'+rule2Result);
        //if(rule1Result > 0){
            await phoneNumberDao.update({_id:phoneNumber._id},{rule1:rule1Result,rule2:rule2Result});
        //}
    }

};


//除了前3位,不同数字小于等于几个,算是好号码
let rule1 = (phoneNumber)=>{

    let pnArray = phoneNumber.split('');

    let subPNArray = pnArray.slice(3, 11);

    let tmpMap = new Map();
    for (let i = 0; i < subPNArray.length; i++) {
        let subPN = subPNArray[i];

        let subPNCount = tmpMap.get(subPN);
        if(subPNCount == null){
            subPNCount = 0;
        }
        tmpMap.set(subPN,subPNCount+1);
    }

    return tmpMap.size;

};

const cArray = ['A','B','C','D','E','F','G','H','I','J'];
let rule2 = (phoneNumber)=>{

    let pnArray = phoneNumber.split('');

    let subPNArray = pnArray.slice(3, 11);

    let pnChars = '';
    let tmpMap = new Map();
    for (let i = 0; i < subPNArray.length; i++) {
        let subPN = subPNArray[i];

        let pnC = tmpMap.get(subPN);
        if(pnC == null){
            pnC = cArray[tmpMap.size];
            tmpMap.set(subPN,pnC);
        }
        pnChars += pnC;
    }

    return pnChars;

};


findNumber();