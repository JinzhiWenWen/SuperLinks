export default {
	// base_url:"http://192.168.1.108:3000/",
	// server_url:"http://192.168.1.108:3000/v1/",
	// img_url:"http://192.168.1.108:3000/uploads",

	base_url:"http://47.75.110.74:3000/",
	server_url:"http://47.75.110.74:3000/v1/",
	img_url:"http://47.75.110.74:3000/uploads",
	activityStatus:{
        TOAUDIT:0,//待审核
        AUDITFAIL:1,// 审核失败
        PREPARATION:2,// 筹备中
        EXECUTION:3,// 执行中
        REVIEW:4,// 评价中
		FINISHED:5,// 已完成
		CLOSED:6//已关闭
    },
	slkdetailtype:{
		transfer:1,//转账
		create:2,//创建节点
		logout:3,//注销节点
		joinConsensus:4,//加入共识
		quitConsensus:5,//退出共识
		consensusAward:6,//共识奖励
		activityPledge:7,//活动抵押
		activityAward:8,//活动激励
		recharge:9,//充值
		sweetsConversion:10,//糖果兑换
		freeze:11,//冻结惩罚
		retreatPledge:12,//抵押退回
		DEPOSIT:13,//提现
		UNFREEZE:14//冻结退回
	}
}
