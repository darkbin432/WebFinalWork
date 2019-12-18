/**
 * 	Overall version 1.6
 * 	This version 1.6
 */

jQuery(function ($) {
	bootbox.setDefaults("locale","zh_CN");



	$("#ewm").click(function () {
		$.ajax({
			type: "GET",
			url: rootPath + "/api/test/getOrganizationMemberQR/" + user.id,
			dataType: "json",
			success: function (data) {
				if (data.status === 200) {
					swal({
							title: user.name,
							imageUrl: data.data,
							imageSize: "400x400",
							showCancelButton: false,
							confirmButtonText: "关闭",
							closeOnConfirm: true
						}
					);
				}
			},
			error: function () {
				alert("服务器请求失败")
			}
		})

	})
	$(".username").html(user.username);
	$(".name").html(user.name);
	$(".mobile").val(user.mobile);
	$(".telephone").val(user.telephone);
	$(".position").val(user.position);
	$("#confirm").click(function () {
		var flag = true;

		if (flag && $(".mobile").val() === "") {
			bootAlert("移动电话不能为空");
			flag = false;
		}

		if (flag && !isMobile($(".mobile").val())) {
			bootAlert("请输入11位有效的移动电话");
			flag = false;
		}

		if (flag && $(".telephone").val() === "") {
			bootAlert("办公电话不能为空");
			flag = false;
		}

		if (flag && !isPhone($(".telephone").val())) {
			bootAlert("请输入8位有效的办公电话");
			flag = false;
		}

		if (flag && ($(".oldPassword").val() != "" || $(".newPassword").val() != "") || $(".confirmPassword").val() != ""){
			if ($(".oldPassword").val() === "") {
				bootAlert("原密码不能为空");
				flag = false;
			}else if (flag && $(".newPassword").val() === "") {
				bootAlert("新密码不能为空");
				flag = false;
			}else if ($(".newPassword").val() !== $(".confirmPassword").val()) {
				bootAlert("确认密码与新密码不一致");
				$(".confirmPassword").val("");
				flag = false;
			}
		}

		if (flag) {
			bootbox.confirm({
				title: "用户信息修改",
				message: "请确认是否修改信息？",
				callback: function (result) {
					if (result) {
						if ($(".oldPassword").val() == "" && $(".newPassword").val() == "" && $(".confirmPassword").val() == "") {
							updatePersonalInfo($(".username").html(),$(".mobile").val(),$(".telephone").val(),$(".position").val())
						} else {
							updatePersonalInfo($(".username").html(), $(".mobile").val(),$(".telephone").val(),$(".position").val(), $(".oldPassword").val(), $(".confirmPassword").val());
						}
					}
				}
			});
		}
	})
	$("#cancel").click(function () {
		window.location.href = rootPath + "/index"
	})
});
function updatePersonalInfo(username, mobile, telephone, position, oldpassword, newpassword) {
	$.ajax({
		type: "POST",
		url: rootPath + "/api/updatePersonalInfo",
		dataType: "json",
		data: {
			username: username,
			mobile: mobile,
			telephone: telephone,
			position: position,
			password: oldpassword,
			newPassword: newpassword,
		},
		success: function (data) {
			if (data.status === 200 && data.msg === "success") {
				user.mobile = mobile;
				user.telephone = telephone;
				user.position = position;
				$(".mobile").val(user.mobile);
				$(".telephone").val(user.telephone);
				$(".position").val(user.position);
				bootAlert("修改成功");
				$(".oldPassword").val("");
				$(".newPassword").val("");
				$(".confirmPassword").val("");
			} else if (data.msg === "原密码错误") {
				bootAlert("原密码错误");
			} else {
				bootAlert("修改失败");
				$(".oldPassword").val("");
				$(".newPassword").val("");
				$(".confirmPassword").val("");
			}

		},
		error: function () {
			alert("服务器请求失败");
		}
	})
}

function bootAlert(message) {
	bootbox.alert({
		message: message,
		buttons: {
			ok: {
				label: '确认',
			}
		}
	});
}