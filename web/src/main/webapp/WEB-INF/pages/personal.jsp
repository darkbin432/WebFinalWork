<%--
  Created by IntelliJ IDEA.
  User: 斌
  Date: 2020/1/4
  Time: 20:18
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="en">
<head>
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
    </style>
    <link rel="shortcut icon" href="../assets/ico/favicon.ico">
    <link rel="apple-touch-icon-precomposed" sizes="144x144" href="../assets/ico/apple-touch-icon-144-precomposed.png">
    <link rel="apple-touch-icon-precomposed" sizes="114x114" href="../assets/ico/apple-touch-icon-114-precomposed.png">
    <link rel="apple-touch-icon-precomposed" sizes="72x72" href="../assets/ico/apple-touch-icon-72-precomposed.png">
    <link rel="apple-touch-icon-precomposed" href="../assets/ico/apple-touch-icon-57-precomposed.png">
</head>



<body class="">
<div class="navbar">
    <div class="navbar-inner">
        <a class="brand" href="<%=request.getContextPath()%>/manage/index"><span class="first">杭州师范大学</span> <span class="second">新闻管理中心</span></a>
    </div>
</div>


<div class="row-fluid">
    <div class="dialog">
        <div class="block">
            <p class="block-heading">更改密码</p>
            <div class="block-body">
                <div>
                    <label>请输入您的邮箱</label>
                    <input type="email" class="span12">
                    <a id="sendMessage" class="btn btn-primary pull-right">发送</a>
                    <div class="clearfix"></div>
                </div>
            </div>
        </div>
        <a href="<%=request.getContextPath()%>/manage/logout">重新登陆</a>
    </div>
</div>

<script src="<%=request.getContextPath()%>/resources/lib/bootstrap/js/bootstrap.js"></script>
<script src="<%=request.getContextPath()%>/resources/js/util/staticUrl.js" type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/resources/js/personal.js"></script>
<script type="text/javascript">
    $("[rel=tooltip]").tooltip();
    $(function() {
        $('.demo-cancel-click').click(function(){return false;});
    });
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
</script>

</body>
</html>


