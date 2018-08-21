/**
 * Created by tian@zizilaidian.com on 2018/7/26.
 */

//node 版本 9.6.1
//http://service.bj.10086.cn/m/num/index.html

let http = require('http');

// let querystring = require('querystring');


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

let p = 1;
let pageCount = p;

const go = async function(pageNumber){
	/*const options = {
		hostname: 'www.baidu.com',
		port: 80,
		path: '/',
		method: 'GET',
		headers: {
		}
	};
	
	console.log('options:' + JSON.stringify(options));
	let res = await getUrlContent(options);
	console.log('resHeaders:' + JSON.stringify(res.resHeaders));
	console.log('resData:' + res.resData);*/
	
	
	//http://service.bj.10086.cn/m/num/num/phoneNumSearch/numSearchPrep.action
	
	//
	//
	// pnsVO.searchType=0&pnsVO.brand=&pnsVO.reserveFee=&pnsVO.segmentTag=&pnsVO.beautifulTag=&pnsVO.lastNumber=&pnsVO.digitalTag=&pnsVO.minCharge=&pnsVO.numLevel=&pnsVO.offerId=&pnsVO.numString=&pnsVO.containFour=&pnsVO.page=1
	
	console.log('pageNumber:' + pageNumber);
	
	let postData = 'pnsVO.searchType=0&pnsVO.brand=&pnsVO.reserveFee=&pnsVO.segmentTag=&pnsVO.beautifulTag=&pnsVO.lastNumber=&pnsVO.digitalTag=&pnsVO.minCharge=&pnsVO.numLevel=&pnsVO.offerId=&pnsVO.numString=&pnsVO.containFour=&pnsVO.page='+pageNumber;
	
	// let content = querystring.stringify({
	// 	'pnsVO.searchType':0,
	// 	'pnsVO.page':1
	// });

	//'Cookie':'Path=/; WT_FPC=id=25e2ea86c736a629aed1433002616730:lv=1532692058883:ss=1532692056806; BIGipServerg-mobile-num=4005495818.38943.0000; BIGipServerg-num=3988718602.38687.0000; JSESSIONID-ECMOBILE-NUM=d7LfbbGXmXpLPbJ2Dvfnc6GfpjvF0jS9lRq34F40Nvv95q1d9lW3!-988270076; Hm_lvt_60757412ca82896cb4704ced9dde4227=1518780320;',
	const o0 = {
		hostname: 'service.bj.10086.cn',
		port: 80,
		path: '/m/num/num/phoneNumSearch/numSearchPrep.action',
		method: 'POST',
		headers: {
			'Host':'service.bj.10086.cn',
			'Accept':'application/json, text/javascript, */*; q=0.01',
			'X-Requested-With':'XMLHttpRequest',
			'Accept-Encoding':'gzip, deflate',
			'Accept-Language':'zh-cn',
			'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8',
			'Content-Length': postData.length,
			'Origin':'http://service.bj.10086.cn',
			'User-Agent':'Mozilla/5.0 (iPhone; CPU iPhone OS 11_4_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15G77',
			'Referer':'http://service.bj.10086.cn/m/num/index.html',
			'Cookie':'Path=/; BIGipServerg-mobile-num=4005495818.38943.0000; BIGipServerg-num=4022273034.41247.0000; WT_FPC=id=2a7b5496ef7e3df10c41533453120700:lv=1533453120700:ss=1533453120700; ecbm2=b3a115285421433; JSESSIONID-ECMOBILE-NUM=ypl1bnfDTrLfzmpjCWCfDPw7l8XGLK56pQ8CWld1SZmYLG0TRWn6!-2033899547',
			'Connection':'keep-alive'
			
		}
	};
	console.log('o0 options:' + JSON.stringify(o0));
	let res0 = await getUrlContent(o0,postData);
	console.log('0 resHeaders:' + JSON.stringify(res0.resHeaders));
	
	let embc2 = '';
	let JSESSIONID_ECMOBILE_NUM = '';
	let rcArray = res0.resHeaders['set-cookie'];
	for (let i = 0; i < rcArray.length; i++) {
		let rc = rcArray[i];
		console.log('i:' + i + ':' + rc);
	 	if(rc.indexOf('ecbm2')>-1){
			embc2 = rc.substring(rc.indexOf('ecbm2=')+'ecbm2='.length,rc.indexOf(';'));
			
		}
		
		if(rc.indexOf('JSESSIONID-ECMOBILE-NUM=')>-1){
			JSESSIONID_ECMOBILE_NUM = rc.substring(rc.indexOf('JSESSIONID-ECMOBILE-NUM=')+'JSESSIONID-ECMOBILE-NUM='.length,rc.indexOf(';'));
			
		}
		
	}
	
	console.log('0 resHeaders embc2:' + embc2);
	console.log('0 resData:' + res0.resData);
	
	
	
	
	
	//  /m/num/num/phoneNumSearch/encNumSearchNew.action?_c=68389&_=1532692058814
	//http://service.bj.10086.cn/m/num/num/phoneNumSearch/encNumSearchNew.action?_c=68389&_=1532692058814	200	GET	service.bj.10086.cn	/m/num/num/phoneNumSearch/encNumSearchNew.action?_c=68389&_=1532692058814	Fri Jul 27 19:47:27 CST 2018	854	13913	Complete

	//Path=/; BIGipServerg-mobile-num=4005495818.38943.0000; BIGipServerg-num=4022273034.41247.0000; JSESSIONID-ECMOBILE-NUM=ypl1bnfDTrLfzmpjCWCfDPw7l8XGLK56pQ8CWld1SZmYLG0TRWn6!-2033899547; WT_FPC=id=2a7b5496ef7e3df10c41533453120700:lv=1533485016288:ss=1533485016288; ecbm2=717c233ee170244
	//'Cookie':'Path=/; Path=/; WT_FPC=id=25e2ea86c736a629aed1433002616730:lv=1532692058883:ss=1532692056806; ecbm2='+embc2+'; BIGipServerg-mobile-num=4005495818.38943.0000; BIGipServerg-num=3988718602.38687.0000; JSESSIONID-ECMOBILE-NUM='+JSESSIONID_ECMOBILE_NUM+'; Hm_lvt_60757412ca82896cb4704ced9dde4227=1518780320;',
	let now1 = new Date();
	let c = f(embc2,0,'','','','','','','','','','','',pageNumber);
	const o1 = {
		hostname: 'service.bj.10086.cn',
		port: 80,
		path: '/m/num/num/phoneNumSearch/encNumSearchNew.action?_c='+c+'&_=1533212174892',//+ now1.getTime(),
		method: 'GET',
		headers: {
			'Host':'service.bj.10086.cn',
			'Accept-Encoding':'gzip, deflate',
			'Cookie':'Path=/; Path=/; BIGipServerg-mobile-num=4005495818.38943.0000; BIGipServerg-num=4022273034.41247.0000; JSESSIONID-ECMOBILE-NUM='+JSESSIONID_ECMOBILE_NUM+'; WT_FPC=id=2a7b5496ef7e3df10c41533453120700:lv=1533485016288:ss=1533485016288; ecbm2='+embc2,
			'Connection':'keep-alive',
			'Accept':'application/json, text/javascript, */*; q=0.01',
			'User-Agent':'Mozilla/5.0 (iPhone; CPU iPhone OS 11_4_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15G77',
			'Referer':'http://service.bj.10086.cn/m/num/index.html',
			'Accept-Language':'zh-cn',
			'X-Requested-With':'XMLHttpRequest'
		}
	};
	console.log('o1 options:' + JSON.stringify(o1));
	let res1 = await getUrlContent(o1);
	console.log('resHeaders:' + JSON.stringify(res1.resHeaders));
	console.log('resData:' + res1.resData);

	let resultC = JSON.parse(res1.resData);

	let ret = JSON.parse(resultC.ret);
	console.log('resultC.ret:' + ret);

	let result = ret.result;

	console.log('resultC.ret.result:' + ret.result);

	if(result === 'success'){

		let numList = ret.numList;

		let pageObj = ret.page;

		pageCount = pageObj.pageCount;


		for (let i = 0; i < numList.length; i++) {
		    let numObj = numList[i];

			let attribute = numObj.JXHRmSerialAttributeList;
			let phoneNumberJson = {
				attribute1:{
					cardFee: attribute[0].cardFee,
					constantAmount: attribute[0].constantAmount,
					costType: attribute[0].costType,
					costValue: parseInt(attribute[0].costValue),
					enBrand: attribute[0].enBrand,
					isLuckyNum: attribute[0].isLuckyNum,
					noneAgreementPackageList: attribute[0].noneAgreementPackageList,
					numLevel: attribute[0].numLevel,
					numType: parseInt(attribute[0].numType),
					offerId: attribute[0].offerId,
					packageList: attribute[0].packageList,
					phoneNumWareId: parseInt(attribute[0].phoneNumWareId),
					prdName: attribute[0].prdName,
					reuseFlage: attribute[0].reuseFlage,
					simcardFee: attribute[0].simcardFee,
					totalFee: attribute[0].totalFee,
					transactTypeList: attribute[0].transactTypeList,
					validity: parseInt(attribute[0].validity)
				},
				brand: numObj.brand,
				cardFee: numObj.cardFee,
				constantAmount: numObj.constantAmount,
				costValue: numObj.costValue,
				enBrand: numObj.enBrand,
				isLuckyNum: numObj.isLuckyNum,
				numLevel: numObj.numLevel,
				phoneNum: numObj.phoneNum,
				wareId: parseInt(numObj.wareId),

				delete: false,
				create_at: now1
			};

			try{
				let pn = await phoneNumberDao.save(phoneNumberJson);
				console.log('save success... phoneNumberJson phoneNum:' + phoneNumberJson.phoneNum+',_id:'+pn._id);
			}catch (e){
				console.log('save error... phoneNumberJson phoneNum:' + phoneNumberJson.phoneNum+',e:'+e);
			}

		}


	}

	
	
};


const getUrlContent = function(options,postData){
	return new Promise ( function (resolve, reject) {
		
		let resData = '';
		let req = http.request(options, (res) => {
			console.log(`状态码: ${res.statusCode}`);
			console.log(`响应头: ${JSON.stringify(res.headers)}`);
			res.setEncoding('utf8');
			res.on('data', (chunk) => {
				//console.log(`响应主体: ${chunk}`);
				resData += chunk;
			});
			res.on('end', () => {
				console.log('响应中已无数据。');
				resolve({resData:resData,resHeaders:res.headers});
			});
			
		});
		
		req.on('error', (e) => {
			console.error(`请求遇到问题: ${e.message}`);
		});
		// 写入数据到请求主体
		if(options.method === 'POST'){
			console.log('method:' + options.method + ',postData:'+postData);
			req.write(postData,'utf-8');
		}
		
		req.end();
		
	});
};


//go(p);



// function d(){
// 	var encFactor=new String('755f615d4f734f7');
// 	var dec=encFactor.substring(0,3);
// 	var encs=encFactor.substring(3);
// 	var a=parseInt(dec,16);
// 	var b=a.toString(2);
// 	while(b.length<12)
// 		b="0"+b;
// 	var factor="";
// 	for(var i=0;i<b.length;i++){
// 		if(b.charAt(i)=='1'){
// 			factor+=encs.charAt(i)
// 		}
// 	};
// 	console.log(factor);
// 	return parseInt(factor)
// };
//
// d();


function a(a,b){return a+b};

function b(a,b){return a*b};

function c(a,b){return a%b};

function d(ecbm2){
	var encFactor=new String(ecbm2);
	var dec=encFactor.substring(0,3);
	var encs=encFactor.substring(3);
	var a=parseInt(dec,16);
	var b=a.toString(2);
	while(b.length<12)
		b="0"+b;
	var factor="";
	for(var i=0;i<b.length;i++){
		if(b.charAt(i)=='1'){
			factor+=encs.charAt(i)
		}
	};
	return parseInt(factor)
};
function f(ecbm2,searchType,pnsVO_brand,pnsVO_reserveFee,pnsVO_segmentTag,pnsVO_beautifulTag,pnsVO_lastNumber,pnsVO_digitalTag,pnsVO_minCharge,pnsVO_numLevel,pnsVO_offerId,pnsVO_numString,pnsVO_containFour,pnsVO_page){
	var factor=d(ecbm2);
	var seed=new Number(0);
	var seedString=new String(searchType) + pnsVO_brand + pnsVO_reserveFee + pnsVO_segmentTag + pnsVO_beautifulTag
		+ pnsVO_lastNumber + pnsVO_digitalTag + pnsVO_minCharge + pnsVO_numLevel + pnsVO_offerId + pnsVO_numString
		+ pnsVO_containFour + pnsVO_page;
	
	for(var i=0;i<seedString.length;i++){
		seed+=seedString.charCodeAt(i)
	};
	var key=Number(3.42);
	var modf=Number(100000);
	return parseInt(   c( b(  a(factor, seed) ,key) ,modf)     )
};

//console.log(f('2bd6e71456032c3',0,'','','','','','','','','','','',1));

/*
 "page": {
 "beginRowNum": 0,
 "endNo": 257,
 "endRowNum": 16,
 "nextPageNo": 2,
 "pageCount": 257,
 "pageIndex": 1,
 "pageSize": 16,
 "prePageNo": 1,
 "rangeMax": 5,
 "rangeMin": 1,
 "recordCount": 4103,
 "startNo": 1
 },
 "result": "success"
 */




let xtime = function (){


		setInterval( ()=> {

			if(p>pageCount){
				//return;
				console.log('process.exit():'+p);
				process.exit(0);
			}
			console.log('aaaaaaaaaaaaaaaaaa:'+p);
			go(p);
			p++;

		}, 20000);

		//console.log('while p:'+p);

};

xtime();





// 解析 json结果, pageCount负值
// 数据存入mongo
// mongo对象设计


/*

 {
	 "numList": [
	 {
		 "JXHRmSerialAttributeList": [
			 {
			 "cardFee": "0",
			 "constantAmount": "128",
			 "costType": "预存",
			 "costValue": "3072",
			 "enBrand": "",
			 "isLuckyNum": "1",
			 "noneAgreementPackageList": [],
			 "numLevel": "C3-4-5-2",
			 "numType": "1",
			 "offerId": "111003017209",
			 "packageList": [],
			 "phoneNumWareId": 0,
			 "prdName": "161000000001",
			 "reuseFlage": "1",
			 "simcardFee": "",
			 "totalFee": "",
			 "transactTypeList": [],
			 "validity": "24"
			 }
		 ],
		 "brand": "",
		 "cardFee": "",
		 "constantAmount": "",
		 "costValue": "",
		 "enBrand": "",
		 "isLuckyNum": "",
		 "numLevel": "",
		 "phoneNum": "13716893332",
		 "wareId": 0
	 },
	 ],
	 "page": {
		 "beginRowNum": 16,
		 "endNo": 257,
		 "endRowNum": 32,
		 "nextPageNo": 3,
		 "pageCount": 257,
		 "pageIndex": 2,
		 "pageSize": 16,
		 "prePageNo": 1,
		 "rangeMax": 5,
		 "rangeMin": 1,
		 "recordCount": 4097,
		 "startNo": 1
	 },
	 "result": "success"
}
 */

