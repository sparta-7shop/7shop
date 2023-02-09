const Constant = require("../config/constant");
const {msgCfg, errCfg, eventCfg}=Constant;
// console.log(Cfg)
const checkAuth = data => {
	if (data.userName && (data.psw||data.token)) {
		return true;
	}
	// console.log(data);
	return false;
};
const withCheckSomeTheme = (valid, cb, errCb) => {
	if (valid) {
		typeof cb === "function" && cb();
	} else {
		typeof errCb === "function" && errCb();
	}
};
const withCheckAuth = (io, data, cb) => {
	withCheckSomeTheme(
		checkAuth(data),
		() => {
			typeof cb === "function" && cb(data);
		},
		() => {
			io.emit(eventCfg.err, {
				errMsg: errCfg.err999,
				code: -999
			});
		}
	);
};
const userTokenGen = ({ userName, userType }) => {
	return `${userName}-${Number(new Date())}-xx${userType}xx`;
};
const getTokenHandler = data => {
	if (data.userName !== "test") {
		return userTokenGen(data);
	}
	return devToken;
};
const checkToken = data => {
	// console.log(data);
	if(data.userInfo){
		return /xx[a-z]*xx$/.test(data.userInfo.token);
	}else {
		return /xx[a-z]*xx$/.test(data.token);
	}

};
const withCheckToken = (io, data, cb) => {
	withCheckSomeTheme(
		checkToken(data),
		() => {
			typeof cb === "function" && cb(data);
		},
		() => {
			io.emit(eventCfg.err, {
				errMsg: errCfg.err998,
				code: -998
			});
		}
	);
};
const genId=({userName})=>{
	return `${userName}-${Number(new Date())}`;
};
const getUserInfo=(users)=>{
	let ret=[];
	for(const i in users){
		const userInfo=users[i].userInfo;
		const {userName,id,source}=userInfo;
		ret.push({
			userName,customerId:id,source
		})
	}
	return ret;
};
module.exports = function ioLogic(io,users) {
	let countOnlineClient=0;
	io.on("connection", function(socket) {
		console.log("유저가 연결되었습니다. 현재 온라인 유저 수 : ",++countOnlineClient);
		let id;
		socket.on("disconnect", function() {
			console.log("유저가 연결을 종료했습니다. 현재 온라인 유저 수 : ",--countOnlineClient);
			for(const i in users){
				if(users[i].userInfo.id===id){
					delete users[i]
				}
			}
		});
		socket.broadcast.emit(eventCfg.sysMsgService,msgCfg.newJoin);
		socket.on(eventCfg.qryOnlineCustomers,data=>{
			//	현재 접속중인 손님 검색
			withCheckToken(io, data, () => {
				// console.log('users',users,getUserInfo(users));
				io.emit(eventCfg.getOnlineCustomer, {data:getUserInfo(users)});
			});
		});
		socket.on(eventCfg.getToken, data => {
			if (checkAuth(data)) {
				data.id = genId(data);
				id=data.id;
				if(data.userType===Constant.customer){
					users[data.id] = {
						socket:socket,
						userInfo:data,
						userType:Constant.customer
					};
					// console.log(users);
				}else {
					users[data.id] = {
						socket:socket,
						userInfo:data,
						userType:Constant.service
					};
				}
				socket.emit(eventCfg.getToken, {
					token: getTokenHandler(data),
					userName:data.userName,
					type:data.type,
					id:data.id,
				});
			}
		});
		socket.on(eventCfg.chatMsg, function(msg) {
			withCheckToken(io, msg, msg => {
				socket.emit(eventCfg.chatMsg, msg);
				if(msg.userType===Constant.customer){
					console.log(users,id);
					for (const i in users){
						if(users[i].userType===Constant.service){
							users[i].socket.emit(eventCfg.chatMsg, msg);
						}
					}
				}else{
					for (const i in users){
						if(users[i].userType===Constant.customer){
							if(msg.targetId===users[i].userInfo.id){
								users[i].socket.emit(eventCfg.chatMsg, msg);
							}
						}else{
							if(users[i].userInfo.id!==id){
								users[i].socket.emit(eventCfg.chatMsg, msg);
							}
						}
					}
				}
			});
		});
	});
};