<%--
  Created by IntelliJ IDEA.
  User: 斌
  Date: 2019/12/22
  Time: 15:13
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <title>管理员</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="shortcut icon" href="<%=request.getContextPath()%>/resources/images/favicon.png" />
    <link href="<%=request.getContextPath()%>/resources/css/manage/min.css" rel="stylesheet" type="text/css">
    <link href="<%=request.getContextPath()%>/resources/css/manage/sans.css" rel="stylesheet" type="text/css">
    <link href="<%=request.getContextPath()%>/resources/css/fonts/font-awesome.css" rel="stylesheet" type="text/css">
    <link href="<%=request.getContextPath()%>/resources/css/manage/icons.css" rel="stylesheet" type="text/css">

    <link rel="stylesheet" href="<%=request.getContextPath()%>/resources/css/ie7/ie7.css">

    <link href="<%=request.getContextPath()%>/resources/css/manage/style-m.css" rel="stylesheet" type="text/css">

</head>

<body data-spy="scroll" data-target=".navbar-fixed-top">
<header>
    <div class="top-bar">
        <div class="container">
            <div class="row">
                <div class="col-sm-6 address">
                    <i class="ti-location-pin"></i> Hangzhou Normal University
                </div>
                <div class="col-sm-6 social">
                    <ul>
                        <li><a href="#"><i class="fa fa-twitter"></i></a></li>
                        <li><a href="#"><i class="fa fa-facebook-square"></i></a></li>
                        <li><a href="#"><i class="fa fa-linkedin-square"></i></a></li>
                        <li><a href="#"><i class="fa fa-pinterest"></i></a></li>
                        <li><a href="#"><i class="fa fa-instagram"></i></a></li>
                        <li><a href="#"><i class="fa fa-youtube"></i></a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <nav class="navbar navbar-custom navbar-fixed-top" role="navigation">
        <div class="container">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-main-collapse">
                    <i class="fa fa-bars"></i>
                </button>
                <a class="navbar-brand" href="<%=request.getContextPath()%>/manage/index">
                    杭州师范大学<span>管理云</span>
                </a>
                <p>HZNU<b>Management Platform</b></p>
            </div>
        </div>
    </nav>
</header>
<div class="clear"></div>
<div id="page-content">
    <section class="breadcrumb">
        <div class="container">
            <h2>管理员登录</h2>
            <ul>
                <li><a href="<%=request.getContextPath()%>/manage/index">首页</a></li>
                <li><a href="#">管理员登录</a></li>
            </ul>
        </div>
    </section>
    <section class="contact-us">
        <div class="container">
            <div class="row">
                <div class="col-md-8 col-md-offset-2">
                    <div class="form-box">
                        <h2>登录</h2>
                        <div class="form-content">
                            <input type="text" id="username" placeholder="用户名" />
                            <input type="text" id="password" placeholder="密码" />
                            <div class="text-center">
                                <input type="button" class="btn-default" id="btn_login" value="登录" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</div>
<div class="clear"></div>
<footer>
    <div class="container">
        <div class="row contact-sec">
            <div class="col-md-5 col-lg-5">
                <h2><span>HZNU</span></h2>
                <div class="row">
                    <div class="col-sm-6">
                        <p>地址：浙江省杭州市余杭区仓前街道余杭塘路2318号<br/>联系电话：0571-28865012</p>
                    </div>
                    <div class="col-sm-6">
                        <ul>
                            <li><i class="fa fa-phone"></i>邮编：311121</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="col-md-5 col-lg-5 col-md-offset-2 col-lg-offset-2">
                <h2><span>招生热线</span></h2>
                <div class="row">
                    <div class="col-sm-6">
                        <p>本科招生热线: 0571-28865193
                            <br/>研究生招生热线：0571-28865143</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="copyright">
        <div class="container">
            <div class="row">
                <div class="col-sm-6 col-md-6 col-lg-6">
                    Copyright &copy; 2019 杭州师范大学
                </div>
            </div>
        </div>
    </div>
</footer>
<script src="<%=request.getContextPath()%>/resources/js/jquery.min.js"></script>
<script src="<%=request.getContextPath()%>/resources/js/bootstrap.min.js"></script>
<%--<script src="<%=request.getContextPath()%>/resources/js/bootstrap-hover-dropdown.min.js"></script>--%>
<%--<script src="<%=request.getContextPath()%>/resources/js/custom.js"></script>--%>
<script src="<%=request.getContextPath()%>/resources/js/util/staticUrl.js" type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/resources/js/login.js" type="text/javascript"></script>
</body>
</html>

