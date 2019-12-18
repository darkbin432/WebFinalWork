/**
 * 	Overall version 1.6
 * 	This version 1.6
 */

jQuery(function ($) {
	setTimeout("$('.username').focus()",50);
	$("#btn_login").click(function () {
		var username=$(".username").val();
		var password=$(".password").val();
		var flag=false;
		if (password === "") {
			$(".password-msg").css("visibility","unset");
			flag=true;
		}
		if(username === ""){
			$(".username-msg").html("请输入5～16位用户名");
			$(".username-msg").css("visibility","unset");
			flag=true;
		}else if (!isUsername(username)){
			$(".username-msg").html("用户名格式错误");
			$(".username-msg").css("visibility","unset");
			flag=true;
		}
		if(!flag){
			$.ajax({
				type: "POST",
				url: rootPath+"/api/login",
				dataType:"json",
				data: {
					username:username,
					password:password
				},
				success:function (data) {
					if(data.status===200&&data.msg==="success"){
						$(".error-msg").text("登录成功");
						setTimeout(function () {
							window.location.href=rootPath+'/index';
						},500);
					}else{
						$(".error-msg").text("用户名或密码错误");
						$(".password").val("");
					}
				},
				error:function () {
					$(".error-msg").text("服务器请求失败");
				}
			})
		}
	});
	$(".username").focus(function () {
		$(".username-msg").css("visibility","hidden");
		$(".error-msg").text("");
	});
	$(".password").focus(function () {
		$(".password-msg").css("visibility","hidden");
		$(".error-msg").text("");
	});
	$(".username").blur(function () {
		if(!isUsername($(this).val())){
			$(".username-msg").html("用户名格式错误");
			$(".username-msg").css("visibility","unset");
		}
	});
	$('.username').bind('input propertychange', function() {
		if($(this).val().length>16){
			$(this).val($(this).val().substr(0,$(this).val().length-1))
		}
	});
	$('.password').bind('input propertychange', function() {
		if($(this).val().length>16){
			$(this).val($(this).val().substr(0,$(this).val().length-1))
		}
	});
	$(document).keydown(function(event){
		if(event.keyCode===13){
			$("#btn_login").click();
		}
	});
});