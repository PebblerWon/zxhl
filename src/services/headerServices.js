import qs from 'qs'
import { request, config } from '../utils'
import fakeRequest from '../utils/fakeRequest'
const { api } = config
const {sign} = api
const {useFakeData} = config;



export async function query (params) {
  let fakeData ;
  let resData;
  	if(params){
  		if(params.userName=='super'&&params.password=='super'){
	  		fakeData = {
		  		status:true,
		    	user:{
		      		'姓名':'super'
		    	}
	  		}
	  	}else{
	  		fakeData = {
	  			status:false,
	    		user:null
	  		}
	  	}
	}else{
		fakeData = {
	  		status:true,
	    	user:{
	    		'姓名':'super'
	    	}
	  	}
	}
	if (useFakeData){
		resData = await fakeRequest({},fakeData)
	}else{
		if(params){
			resData = await request(`${sign.SignIn}?${qs.stringify({user:params.userName,psw:params.password})}`)
		}else{
			console.log('wucan')
			let a = await request(`${sign.SignIn}?${qs.stringify({user:'',psw:''})}`)
			resData = await request(`${sign.SignIn}?${qs.stringify({user:'',psw:''})}`)
		}
	}
	console.log(resData);
	return resData;
}



const headerServices = {
  query
}
export default headerServices