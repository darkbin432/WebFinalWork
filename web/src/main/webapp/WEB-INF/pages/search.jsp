<%--
  Created by IntelliJ IDEA.
  User: 斌
  Date: 2019/12/22
  Time: 15:52
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="en"><head>
    <meta charset="utf-8">
    <title>杭州师范大学·新闻管理</title>
    <meta content="IE=edge,chrome=1" http-equiv="X-UA-Compatible">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="">

    <link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/resources/lib/bootstrap/css/bootstrap.css">
    <link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/resources/css/theme.css">
    <link rel="stylesheet" href="<%=request.getContextPath()%>/resources/lib/font-awesome/css/font-awesome.css">
    <script src="<%=request.getContextPath()%>/resources/lib/jquery-1.7.2.min.js" type="text/javascript"></script>
    <style type="text/css">
        #line-chart {
            height:300px;
            width:800px;
            margin: 0px auto;
            margin-top: 1em;
        }
        .brand { font-family: georgia, serif; }
        .brand .first {
            color:#FFFFFF;
            font-style: italic;
        }
        .brand .second {
            color:#FFFFFF;
            font-weight: bold;
        }
        #calendar {
            width: 100%;
            margin: 0 auto;
        }
    </style>
</head>




<body class="">
<div class="navbar">
    <div class="navbar-inner">
        <ul class="nav pull-right">
            <li><a href="#" class="hidden-phone visible-tablet visible-desktop" role="button">首页</a></li>
            <li id="fat-menu" class="dropdown">
                <a href="#" role="button" class="dropdown-toggle" data-toggle="dropdown" id="currentUser">
                    <i class="icon-user"></i>管理员
                    <i class="icon-caret-down"></i>
                </a>

                <ul class="dropdown-menu">
                    <li><a tabindex="-1" href="#">我的数据</a></li>
                    <li class="divider"></li>
                    <li><a tabindex="-1" class="visible-phone" href="#">首页</a></li>
                    <li class="divider visible-phone"></li>
                    <li><a tabindex="-1" href="<%=request.getContextPath()%>/manage/logout">退出</a></li>
                </ul>
            </li>

        </ul>
        <a class="brand" href="<%=request.getContextPath()%>/manage/index"><span class="first">杭州师范大学</span> <span class="second">新闻管理中心</span></a>
    </div>
</div>



<div class="sidebar-nav">
    <a href="#dashboard-menu" class="nav-header" data-toggle="collapse"><i class="icon-dashboard"></i>数据操作</a>
    <ul id="dashboard-menu" class="nav nav-list collapse in">
        <li><a href="<%=request.getContextPath()%>/manage/index">全部新闻</a></li>
        <li ><a href="<%=request.getContextPath()%>/manage/edit">内容编辑</a></li>
        <li class="active"><a href="<%=request.getContextPath()%>/manage/search">新闻查找</a></li>

    </ul>

    <a href="#accounts-menu" class="nav-header" data-toggle="collapse"><i class="icon-briefcase"></i>用户</a>
    <ul id="accounts-menu" class="nav nav-list collapse">
        <li ><a href="<%=request.getContextPath()%>/manage/logout">重新登陆</a></li>
        <li ><a href="<%=request.getContextPath()%>/manage/personal">更改密码</a></li>
    </ul>

    <a href="#error-menu" class="nav-header collapsed" data-toggle="collapse"><i class="icon-exclamation-sign"></i>更多<i class="icon-chevron-up"></i></a>
    <ul id="error-menu" class="nav nav-list collapse">
        <li ><a href="403.html">403 page</a></li>
        <li ><a href="404.html">404 page</a></li>
        <li ><a href="500.html">500 page</a></li>
        <li ><a href="503.html">503 page</a></li>
    </ul>
</div>



<div class="content">
    <div class="header">
        <h1 class="page-title">新闻查找</h1>
    </div>
    <ul class="breadcrumb">
        <li><a href="index.html">数据操作</a> <span class="divider">/</span></li>
        <li class="active">新闻查找</li>
    </ul>

    <div class="container-fluid">
        <div class="row-fluid">
            <link rel='stylesheet' type='text/css' href='<%=request.getContextPath()%>/resources/lib/fullcalendar-1.5.3/fullcalendar/fullcalendar.css' />
            <link rel='stylesheet' type='text/css' href='<%=request.getContextPath()%>/resources/lib/fullcalendar-1.5.3/fullcalendar/fullcalendar.print.css' media='print' />
            <script type='text/javascript' src='<%=request.getContextPath()%>/resources/lib/fullcalendar-1.5.3/fullcalendar/fullcalendar.min.js'></script>

            <script type='text/javascript'>

                $(document).ready(function() {

                    var date = new Date();
                    var d = date.getDate();
                    var m = date.getMonth();
                    var y = date.getFullYear();

                    $('#calendar').fullCalendar({
                        header: false,
                    });
                    $('#calendar').fullCalendar('next');

                });

            </script>



            <div style="float:right; margin-top: 1em;">
                <a href="#" class="btn btn-primary">添加</a>
                <a href="#" class="btn btn-danger">删除</a>
            </div>
            <h2>上传新闻</h2>
            <div id='calendar'></div>

            <footer>
                <hr>
                <p class="pull-right">版权所有<a href="http://www.cssmoban.com/" title="网页模板" target="_blank">杭州师范大学</a></p>
            </footer>


        </div>
    </div>
</div>


<script src="<%=request.getContextPath()%>/resources/lib/bootstrap/js/bootstrap.js"></script>
<script src="<%=request.getContextPath()%>/resources/js/util/staticUrl.js" type="text/javascript"></script>
<script type="text/javascript">
    $("[rel=tooltip]").tooltip();
    $(function() {
        $('.demo-cancel-click').click(function(){return false;});
    });

</script>

<script type="text/javascript">
    jQuery(
        function ($) {
            function getCurrentUser() {
                $.ajax({
                    type: "POST",
                    url: rootPath + "/getCurrentUser",
                    dataType: "json",
                    data: {},
                    success: function (response) {
                        if (response.status === 200) {
                            $("#currentUser").html("<i class=\"icon-user\"></i>" + response.data.name + "\n" +
                                "                    <i class=\"icon-caret-down\"></i>")
                        }
                    },
                    error: function () {

                    }
                })
            }

            getCurrentUser();
        })
</script>

</body>
</html>


