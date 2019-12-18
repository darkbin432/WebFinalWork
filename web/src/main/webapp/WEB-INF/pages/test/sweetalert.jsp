<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>

<!DOCTYPE html>
<!-- release v4.1.8, copyright 2014 - 2015 Kartik Visweswaran -->
<%--<html lang="zh">--%>
<head>
    <meta charset="UTF-8"/>
    <title>123</title>
    <link href="<%=request.getContextPath()%>/resources/css/bootstrap.min.css" rel="stylesheet">
    <link href="<%=request.getContextPath()%>/resources/css/sweetalert/sweetalert.css" media="all" rel="stylesheet"
          type="text/css"/>
    <script src="<%=request.getContextPath()%>/resources/js/jquery-3.3.1.min.js"></script>
    <script src="<%=request.getContextPath()%>/resources/js/util/bootstrap.min.js" type="text/javascript"></script>
</head>
<body>
<div id="test">
    <button id="qrcode" class="main-button">二维码</button>
</div>
</body>
<script src="<%=request.getContextPath()%>/resources/ace/js/jquery.js"></script>
<script src="<%=request.getContextPath()%>/resources/js/util/staticUrl.js" type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/resources/js/util/bootstrap.min.js" type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/resources/js/util/sweetalert.min.js"></script>
<script>

    $('#qrcode').click(function () {

        var title = "我是标题";

        swal({
                title: title,
                imageUrl: "data:image/png;base64,iVBORw0KGgoAAAANSUhHjTkSuQm",
                imageSize: "400x400",
                showCancelButton: false,
                confirmButtonText: "关闭",
                closeOnConfirm: true
            }
        );
    });
</script>