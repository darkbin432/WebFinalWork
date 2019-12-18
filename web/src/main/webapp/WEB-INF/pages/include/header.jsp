<%--
  Created by IntelliJ IDEA.
  User: kzn
  Overall version 1.6
  This version 1.6
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<div class="myHeader">
    <div class="myHeader-content">
        <img class="logo" src="<%=request.getContextPath()%>/resources/icon/jishenglogo.png">
        <span class="logo-text">杭州市计生协综合服务管理系统</span>
        <div>
            <ul>
                <li onclick="location='index'"><div></div>首页</li>
                <li onclick="location='member'"><div></div>组织成员</li>
                <li onclick="location='huiyuan'"><div></div>会员管理</li>
                <li onclick="location='task'"><div></div>工作管理</li>
                <li onclick="location='information'"><div></div>公告与资讯</li>
                <li onclick="location='statistics'"><div></div>统计分析</li>
            </ul>
            <img class="user-img" src="<%=request.getContextPath()%>/resources/icon/admin_head.png">
            <span class="user-realName"></span>
            <div class="user-line"></div>
            <span class="user-exit">退出</span>
        </div>
    </div>
</div>
<script>
	var user;
	jQuery(
		function ($) {
			$.ajax({
				type: "GET",
				url: rootPath+"/getCurrentUser",
				dataType: "json",
				async:false,
                cache:false,
				data: {
				},
				success: function (data) {
					if(data.status==200){
						user=data.data;
						$(".user-realName").html(user.name)

					}else {
					}
				},
				error: function () {
				}
			});
			$(".user-img,.user-realName").click(function () {
				window.location.href = rootPath+"/personal";
			})
            $(".user-exit").click(function () {
				window.location.href = rootPath+"/logout";
			})
		}
	);

</script>