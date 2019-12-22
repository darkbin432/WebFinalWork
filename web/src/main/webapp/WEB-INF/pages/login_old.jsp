<%--
  Created by IntelliJ IDEA.
  User: kzn
  Overall version 1.6
  This version 1.6
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title></title>
    <meta name="viewport" content="user-scalable=0">
    <meta http-equiv="Content-Type" content="text/html" charset="UTF-8">
    <link type="text/css" href="<%=request.getContextPath()%>/resources/css/login.css" rel="stylesheet">
    <link type="text/css" href="<%=request.getContextPath()%>/resources/css/common.css" rel="stylesheet">
    <script src="<%=request.getContextPath()%>/resources/ace/js/jquery.js"></script>
    <script src="<%=request.getContextPath()%>/resources/js/common.js" type="text/javascript"></script>
    <script src="<%=request.getContextPath()%>/resources/js/login.js" type="text/javascript"></script>
    <script src="<%=request.getContextPath()%>/resources/js/validate.js" type="text/javascript"></script>
</head>
<body>
<div class="login-container">
    <div class="login-header">
        <img src="<%=request.getContextPath()%>/resources/icon/9-jishenglogo.png">
        <span>杭州市计生协综合服务管理系统</span>
    </div>
    <div class="login-content">
        <img src="<%=request.getContextPath()%>/resources/icon/12.png">
        <form>
            <div class="title">
                <span>用户登录</span>
            </div>
            <div class="lines">
                <div class="line1"></div>
                <div class="line2"></div>
            </div>
            <%--不要删--%>
            <input class="normal-input">
            <input class="normal-input" type="password">
            <input type="text" class="username normal-input" placeholder="请输入用户名">
            <span class="username-msg" style="visibility: hidden">请输入5～16位用户名</span>
            <input class="password normal-input" type="password" placeholder="请输入密码">
            <span class="password-msg" style="visibility: hidden">密码不能为空</span>
            <input id="btn_login" type="button" value="登    录">
            <span class="error-msg"></span>
        </form>
    </div>
</div>
</body>
<script src="<%=request.getContextPath()%>/resources/ace/js/bootbox.js"></script>
<script src="<%=request.getContextPath()%>/resources/js/util/staticUrl.js" type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/resources/js/util/util-common.js" type="text/javascript"></script>
</html>