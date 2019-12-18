<%--
  Created by IntelliJ IDEA.
  User: kzn
  Overall version 1.6
  This version 1.6
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title></title>
    <link href="<%=request.getContextPath()%>/resources/css/bootstrap.min.css" rel="stylesheet" type="text/css">
    <link href="<%=request.getContextPath()%>/resources/ace/css/ace.css" class="ace-main-stylesheet" id="main-ace-style"
          rel="stylesheet" type="text/css"/>
    <link href="<%=request.getContextPath()%>/resources/css/sweetalert/sweetalert.css" media="all" rel="stylesheet"
          type="text/css"/>
    <link href="<%=request.getContextPath()%>/resources/ace/css/jquery-ui.css" rel="stylesheet">
    <link href="<%=request.getContextPath()%>/resources/css/common.css" rel="stylesheet" type="text/css">
    <link href="<%=request.getContextPath()%>/resources/css/personal.css" rel="stylesheet" type="text/css">
    <script src="<%=request.getContextPath()%>/resources/ace/js/jquery.js"></script>
    <script src="<%=request.getContextPath()%>/resources/ace/js/jquery-ui.js"></script>
    <script src="<%=request.getContextPath()%>/resources/js/validate.js"></script>
    <script>
		document.onreadystatechange=function(){
			if(document.readyState=="complete"){
				$(".myContent").removeClass("hidden");
				$(".loading").css("display","none");
			}
		}
    </script>
</head>
<body>
<%@ include file="include/header.jsp" %>
<div class="myContainer">
    <div class="myContent hidden">
        <div class="left">
            <ul>
                <li><a class="selected-li">个人管理</a></li>
            </ul>
        </div>
        <div class="right">
            <div class="right-main" style="position: relative">
                <div class="l-title">个人管理</div>
                <div class="s-title">个人管理/个人信息</div>
                <div class="editUser">

                    <input type="text">
                    <input type="password">
                    <div class="pop-tip" style="margin-top: 0">基本信息</div>
                    <div class="pop-lines">
                        <div></div>
                        <div></div>
                    </div>
                    <label><span style="visibility: hidden;margin-left: 14px">*</span><span>用户名：</span><span
                            class="username"></span><img id="ewm" src="<%=request.getContextPath()%>/resources/icon/ewm.png"></label>
                    <label><span style="visibility: hidden;">*</span><span>您的姓名：</span><span
                            class="name"></span></label>
                    <label><span>*</span><span>移动电话：</span><input
                            class="normal-input mobile"></label>
                    <label><span>*</span><span>办公电话：</span><input
                            class="normal-input telephone"></label>
                    <label><span style="visibility: hidden;margin-left: 28px">*</span><span>职位：</span><input
                            class="normal-input position"></label>
                    <div class="pop-tip">修改密码<span style="color: #fb2020;font-size: 12px">(如不修改请勿填写)</span></div>
                    <div class="pop-lines">
                        <div></div>
                        <div></div>
                    </div>
                    <label><span style="margin-left: 14px">*</span><span>原密码：</span><input
                            class="normal-input oldPassword" type="password"></label>
                    <label><span style="visibility: hidden;margin-left: 14px">*</span><span>新密码：</span><input
                            class="normal-input newPassword" type="password"></label>
                    <label><span style="visibility: hidden">*</span><span>确认密码：</span><input
                            class="normal-input confirmPassword" type="password"></label>
                </div>
                <div class="bottom-buttons">
                    <button id="cancel" class="normal-button">取&nbsp;消</button>
                    <button id="confirm" class="main-button">确&nbsp;认</button>
                </div>
            </div>
        </div>
    </div>
    <div class="myContent loading">
        <div id="loading">
            <img src="<%=request.getContextPath()%>/resources/icon/loading.gif">
        </div>
    </div>
</div>
</body>
<script src="<%=request.getContextPath()%>/resources/js/util/bootstrap.min.js" type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/resources/ace/js/bootbox.js"></script>
<script src="<%=request.getContextPath()%>/resources/js/util/staticUrl.js" type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/resources/js/util/util-common.js" type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/resources/js/util/sweetalert.min.js"></script>
<script src="<%=request.getContextPath()%>/resources/js/personal.js"></script>

</html>
