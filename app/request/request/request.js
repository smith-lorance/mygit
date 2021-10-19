import Request from 'luch-request' // 使用npm
const http = new Request();
// 添加request拦截器 实现携带token的携带和其他请求头
http.interceptors.request.use(config => {
	let obj = uni.getStorageSync('token')
	if (obj) {
		config.header['x-access-token'] = uni.getStorageSync('userObj').token;
	}
	config.header['Content-Type'] = 'application/json/application/x-www-form-urlencoded'
	return config
}, error => {
	console.log('error')
})

// 添加相应起对错误统一处理
http.interceptors.response.use(
	response => { //对响应数据做些事
		console.log("response")
		return response;
	}, err => { //请求错误时做些事
		console.log("请求失败")
	}
);


/**
 * 统一处理post请求
 * @param {}} url   请求地址
 * @param {*} data  请求对象
 * @param {*} obj   额外配置选项
 * @returns 
 * 
Content-Type
 */
export const post = (url, data, obj) => {
	return http.post(url, data, obj).then(resulr => {
		return resulr.data
	}).catch(err => {

	})
}

/**
 * 统一处理post请求
 * @param {}} url   请求地址
 * @param {*} data  请求对象
 * @param {*} obj   额外配置选项
 * @returns 
 * 
Content-Type
 */
export const put = (url, data, obj) => {
	return http.put(url, data, obj).then(resulr => {
		return resulr.data
	}).catch(err => {
		console.log('请求错误')
	})
}

/**
 * 统一处理get请求
 * @param {}} url  请求地址
 * @param {*} obj  请求对象
 * @returns 
 */
export const get = (url, obj) => {
	return http.get(url, obj).then(resulr => {
		return resulr.data
	}).catch(err => {
		console.log('请求错误')
	})
}

/**
 * 封装删除
 * @param {*} url 
 * @param {*} data 
 * @returns 
 */
export const deletes = (url, data) => {
	return http.delete(url, data, obj).then(resulr => {
		return resulr.data
	}).catch(err => {
		console.log('请求错误')
	})
}
