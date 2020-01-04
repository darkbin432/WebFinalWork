/**
 * @author 斌
 */

jQuery(
    function ($) {

        //jquery验证邮箱
        function checkSubmitEmail(email){
            if(email == "" || email == null){
                return false;
            }
            if(!email.match(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/)){
                return false;
            }
            return true;
        }

        $("#sendMessage").click(function () {
            var email = $(".span12").val();
            if (checkSubmitEmail(email)){
                $.ajax({
                    type: "POST",
                    url: rootPath + "/api/sendMail",
                    dataType: "json",
                    data: {
                        to: email,
                        subject: "杭州师范大学·管理员——修改密码",
                        text: "点击下方链接，进行验证并修改密码：\nhttp://darkbin432.cn/changepassword?user=admin?mail.key=65e6585f-17be-44ed-87fe-a2615e7950fe"
                    },
                    success: function (response) {
                        if (response.status === 200) {
                            window.location=rootPath + "/manage/index";
                        }
                    },
                    error: function () {

                    }
                })
            }

        })

    }
);

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
