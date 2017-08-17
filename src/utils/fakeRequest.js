export default function fakeRequest(params,fakeData){ 
  return new Promise((resolve,reject)=>{
    setTimeout(()=>resolve(fakeData), Math.floor(Math.random()*1000))
  })
}