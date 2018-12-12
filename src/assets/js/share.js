function getWxSignature() {
	alert(1)
	$.ajax({
		url: "http://192.168.1.108:3000/v1/activityWxShaer",
		type: 'post',
		data: {
			urlhref: 'http://superlinks.io/'
		},
		success: function(jsons) {
			var data = JSON.parse(jsons);
			wx.config({
				debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。 
				appId: 'wxb57fe909a10059e3', // 必填，公众号的唯一标识 
				timestamp: data.timestamp, // 必填，生成签名的时间戳 
				nonceStr: data.nonceStr, // 必填，生成签名的随机串 
				signature: data.signature, // 必填，签名，见附录1 
				jsApiList: [
					'onMenuShareTimeline',
					'onMenuShareAppMessage',
					'onMenuShareQQ',
					'onMenuShareWeibo',
					'onMenuShareQZone'
				] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2 
			});
			shareFunc(); // 微信的分享接口 里面为ready 
		}
	});
}