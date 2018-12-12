import Vue from 'vue'
// 存储localStorage时设置前缀
// const storePrefix = 'lc_';

// 存储localStorage
export const setStore = (name, content) => {
	if (!name) return;
	if (typeof content !== 'string') {
		// console.log(123)
		content = JSON.stringify(content);
	}
	window.localStorage.setItem(name, content);
}

// 获取localStorage
export const getStore = name => {
	if (!name) return;
	return JSON.parse(window.localStorage.getItem(name));
	//return JSON.stringify(window.localStorage.getItem(name));
}

// 删除localStorage
export const removeStore = name => {
	if (!name) return;
	window.localStorage.removeItem(name);
}
