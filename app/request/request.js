export default function getHttp({method="get",methodType,aip,data = {},} = {}) {
	return new Promise((resolve, reject) => {
		// methodType=(method==='post'?'application/json':'application/x-www-form-urlencoded');
		methodType=(method!='get'?'application/json':'application/x-www-form-urlencoded');
		uni.getStorage({
			key: 'token',
			success: res => {
				let token = res.data;
				uni.request({
					method:method,
					url: `https://shkeduwlkj.com/api/${aip}`,
					data:data,
					header: {
						'x-access-token': token,
						'Content-Type': methodType
					},
					success: (res) => {
						resolve(res.data);
					},
					fail: (res) => {
						reject(res.data);
					}
				});
			}
		})
	});


}
