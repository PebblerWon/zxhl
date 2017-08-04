const download = (url)=>{
	let ab = document.createElement("a");
	ab.href = url;
	ab.download = '导出表';
	document.body.appendChild(ab);
	try{
		ab.click();
	}catch(e){alert('下载失败')}
	setTimeout(()=>{document.body.removeChild(ab)},50)
	return;
}
export default download;