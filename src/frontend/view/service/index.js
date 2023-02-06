$(function() {
	let socket = io();
	let getUserInfo=()=>{
		return sessionStorage.getItem('userInfo')&&JSON.parse(sessionStorage.getItem('userInfo'));
	};
	let userInfo=getUserInfo();
	let userType='service';
	let targetId;

	$('#qryOnlineCustomers').on('click',function () {
		userInfo=getUserInfo();
		console.log('qryOnlineCustomers',{userInfo,userType});
		socket.emit('qryOnlineCustomers',{userInfo,userType});
	});
	socket.on('getOnlineCustomer',(ret)=>{
		console.log(ret);
		const {data}=ret;
		$('#userList').empty();
		Array.isArray(data)&&data.forEach((val,key)=>{
			$('#userList').append(`<span data-customer-id="${val.customerId}">${val.userName}</span>`)
		})
		$('#userList span').on('click',function () {
			console.log('#userList span',this.dataset);
			targetId=this.dataset.customerId;
			$('#userList span').removeClass('active');
			$(this).addClass('active');
		});
	});
	socket.on('sysMsgService', (msg) => {
		$('#messages').append($('<li>').text(`System(service only):${msg}`));
	});

	//common socket event start
	if (userInfo&&userInfo.userName && userInfo.token && userInfo.userId) {
		$('#login').hide();
		socket.emit('getToken', {
			userName: userInfo.userName,
			token: userInfo.token,
			userType,
		})
	}
	$('#login button').on('click',function(e) {
		e.preventDefault();
		socket.emit('getToken', {
			userName: $('#userName').val(),
			psw: $('#psw').val(),
			userType,
		});
		$('#userName').val('');
		$('#psw').val('');
		return false;
	});
	$('#msg').submit(function() {
		userInfo=sessionStorage.getItem('userInfo')&&JSON.parse(sessionStorage.getItem('userInfo'));
		if (userInfo.userName && userInfo.token && userInfo.userId) {
			const data={
				msg: $('#m').val(),
				token: userInfo.token,
				userType,
				targetId,
				createTime: Number(new Date()),
				userId: userInfo.userId,
				userName: userInfo.userName
			};
			console.log('#msg',data);
			socket.emit('chat message', data);
			$('#m').val('');
		} else {
			console.log(userInfo.userName , userInfo.token, userInfo.userId);
			$('#login').show();
		}
		return false;
	});
	socket.on('sysMsg', (msg) => {
		$('#messages').append($('<li>').text(`System:${msg}`));
	});


	socket.on('getToken', (data) => {
		console.log('getToken',data);
		sessionStorage.setItem('userInfo',JSON.stringify({
			token:data.token,
			userName:data.userName,
			userId:data.id,
		}));
		$('#login').hide()
	});
	socket.on('err', (data) => {
		sessionStorage.removeItem('userInfo');
		console.error(data.errMsg, data.errCode);
	});
	socket.on('chat message', function(data) {
		console.log('chat message',data);
		$('#messages').append($('<li>').text(`${data.userType==='customer'?'고객':"상담사"}${data.userType==='customer'?data.source:''} ${data.userName}:${data.msg}`));
	});
	//common socket event end
});