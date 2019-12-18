<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>

<!DOCTYPE html>
<!-- release v4.1.8, copyright 2014 - 2015 Kartik Visweswaran -->
<%--<html lang="zh">--%>
<head>
    <meta charset="UTF-8"/>
    <title>123</title>
    <link href="<%=request.getContextPath()%>/resources/css/bootstrap.min.css" rel="stylesheet">
    <link href="<%=request.getContextPath()%>/resources/css/fileinput.css" media="all" rel="stylesheet"
          type="text/css"/>
    <script src="<%=request.getContextPath()%>/resources/js/jquery-3.3.1.min.js"></script>
    <script src="<%=request.getContextPath()%>/resources/js/util/bootstrap.min.js" type="text/javascript"></script>
</head>
<body>
<input type="text" placeholder="输入活动Id" id="activityId">

<button class="a">生成二维码</button>
<div id="test">
    二维码显示在这里
</div>
</body>
<script src="<%=request.getContextPath()%>/resources/ace/js/jquery.js"></script>
<script src="<%=request.getContextPath()%>/resources/js/util/staticUrl.js" type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/resources/js/util/fileinput.js" type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/resources/js/util/fileinput_locale_zh.js"
        type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/resources/js/util/bootstrap.min.js" type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/resources/js/test/qrTest.js?v=2" type="text/javascript"></script>