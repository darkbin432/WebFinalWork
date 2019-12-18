<%--
  Overall version 1.6
  This version 1.6
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="zh-cn">
<head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
    <meta charset="utf-8"/>

    <title>杭州市计生协综合服务管理系统</title>
    <%--<link rel="shortcut icon" href="<%=request.getContextPath()%>/resources/ace/img/favicon.ico" >--%>
    <meta name="description" content="overview &amp; stats"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0"/>

    <%--<%@ include file="include/ace/ace_head.jsp" %>--%>
    <%--<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/resources/css/common_old.css">--%>
    <%--<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/resources/css/index_old.css">--%>

    <%--<%@ include file="include/ace/ace_js.jsp" %>--%>

    <%--<script src="<%=request.getContextPath()%>/resources/js/staticUrl.js"></script>--%>

    <%--<script src="<%=request.getContextPath()%>/resources/js/common.js"></script>--%>



</head>

<body class="no-skin">


<!-- #section:basics/navbar.layout -->
<%--<%@ include file="include/navbar.jsp" %>--%>
<!-- /section:basics/navbar.layout -->

<div class="main-container" id="main-container">
    <script type="text/javascript">
        try {
            ace.settings.check('main-container', 'fixed')
        } catch (e) {
        }
    </script>
</div>

<!-- #section:basics/sidebar -->
<%--<%@ include file="include/sidebar.jsp" %>--%>
<!-- /section:basics/sidebar -->

<div class="main-content">
    <div class="main-content-inner">
        <!-- #section:basics/content.breadcrumbs -->

        <!-- /section:basics/content.breadcrumbs -->

        <div class="page-content">
            <!-- PAGE CONTENT BEGINS -->
            <jsp:include page="${view}"></jsp:include>
            <!-- PAGE CONTENT ENDS -->
        </div>
        <!-- /.page-content -->
    </div>
</div>
<!-- /.main-content -->




<%--<%@ include file="include/footer.jsp" %>--%>
<!-- /.main-container -->
<!-- inline scripts related to this page -->
</body>
</html>
