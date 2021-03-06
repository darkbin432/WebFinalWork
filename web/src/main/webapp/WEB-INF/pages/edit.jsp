<%--
  Created by IntelliJ IDEA.
  User: 斌
  Date: 2019/12/22
  Time: 15:52
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
    <link href="<%=request.getContextPath()%>/resources/ace/css/select2.css" rel="stylesheet">
    <link href="<%=request.getContextPath()%>/resources/wangeditor/css/wangEditor.css" rel="stylesheet">
    <link href="<%=request.getContextPath()%>/resources/css/edit.css" rel="stylesheet">
    <script src="<%=request.getContextPath()%>/resources/lib/jquery-1.7.2.min.js" type="text/javascript"></script>
    <script src="<%=request.getContextPath()%>/resources/wangeditor/js/wangEditor.js"></script>
    <script src="<%=request.getContextPath()%>/resources/ace/js/bootbox.js" type="text/javascript"></script>
    <script src="<%=request.getContextPath()%>/resources/ace/js/select2.js"></script>
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
            color: #fff;
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
        <li class="active"><a href="<%=request.getContextPath()%>/manage/edit">内容编辑</a></li>
        <%--<li ><a href="<%=request.getContextPath()%>/manage/search">新闻查找</a></li>--%>
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
        <h1 class="page-title">内容编辑</h1>
    </div>
    <ul class="breadcrumb">
        <li><a href="<%=request.getContextPath()%>/manage/index">数据操作</a> <span class="divider">/</span></li>
        <li><a href="<%=request.getContextPath()%>/manage/index">全部新闻</a> <span class="divider">/</span></li>
        <li class="active">内容编辑</li>
    </ul>

    <div class="container-fluid">
        <div class="row-fluid">
            <div class="btn-toolbar">
                <button class="btn btn-primary" id="saveEdit"><i class="icon-save"></i>保存</button>
                <a href="#myModal" data-toggle="modal" class="btn">删除</a>
                <a href="#myModal2" data-toggle="modal" class="btn btn2">发布</a>
            </div>
            <div class="well">
                <div id="myTabContent" class="tab-content">
                    <div class="tab-pane active in" id="home">
                        <form id="tab">
                            <label>标题</label>
                            <input type="text" class="input-xlarge" id="titleText">
                            <label>类别</label>
                            <label>
                                <select class="type-select" data-searchplaceholder="--新闻类别--">
                                    <option value="1">师大要闻</option>
                                    <option value="2">通知公告</option>
                                    <option value="3">党建文化</option>
                                    <option value="4">媒体师大</option>
                                    <option value="5">教学科研</option>
                                    <option value="6">学术预告</option>
                                </select>
                            </label>
                            <label>来源</label>
                            <input type="text" class="input-xlarge" id="sourceText">
                            <label>作者</label>
                            <input type="text" class="input-xlarge" id="authorText">
                            <label>封面</label>
                            <div class="main-cover" id="headPic">
                                <div><img src="<%=request.getContextPath()%>/resources/images/fm.png"></div>
                                <label><input id="image-src" class="hidden"></label>
                                <div id="addCover">

                                </div>
                                <label><input type="file" class="hidden" accept="image/jpeg,image/png"></label>
                            </div>

                            <label>附件</label>
                            <div class="main-cover" id="fujian">
                                <div><img src="<%=request.getContextPath()%>/resources/images/fm.png"></div>
                                <label><input id="fujian-src" class="hidden"></label>
                                <div id="addCover1">

                                </div>
                                <label><input type="file" class="hidden" accept="application/pdf"></label>
                            </div>
                            <label>内容</label>
                            <div id="contentText"></div>
                        </form>
                    </div>
                </div>

            </div>
            <footer>
                <hr>
                <p class="pull-right">版权所有<a href="http://www.cssmoban.com/" title="网页模板" target="_blank">杭州师范大学</a></p>
            </footer>
        </div>
    </div>
</div>

<div class="modal small hide fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
        <h3 id="myModalLabel">重要提示</h3>
    </div>
    <div class="modal-body">
        <p class="error-text"><i class="icon-warning-sign modal-icon"></i>真的要删除它吗？</p>
    </div>
    <div class="modal-footer">
        <button class="btn" data-dismiss="modal" aria-hidden="true">取消</button>
        <button class="btn btn-danger" data-dismiss="modal" id="editToDelete">删除</button>
    </div>
</div>

<div class="modal small hide fade" id="myModal2" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
        <h3 id="myModalLabel2">重要提示</h3>
    </div>
    <div class="modal-body">
        <p class="error-text"><i class="icon-warning-sign modal-icon"></i>确定要发布吗？</p>
    </div>
    <div class="modal-footer">
        <button class="btn" data-dismiss="modal" aria-hidden="true">取消</button>
        <button class="btn btn-danger" data-dismiss="modal" id="editToPublish">确定</button>
    </div>
</div>


<script src="<%=request.getContextPath()%>/resources/lib/bootstrap/js/bootstrap.js"></script>
<script src="<%=request.getContextPath()%>/resources/js/util/staticUrl.js" type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/resources/js/edit.js"></script>
<script type="text/javascript">
    $("[rel=tooltip]").tooltip();
    $(function() {
        $('.demo-cancel-click').click(function(){return false;});
    });
</script>

</body>

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

<script>
    var E = window.wangEditor;
    // var editor = new E('editor')
    E.config.uploadImgUrl = '<%=request.getContextPath()%>/api/file/fileUpload?fileType=image';
    E.config.uploadImgFileName = 'file_data';
    E.config.uploadImgFns = {
        onload: function (resultText, xhr) {
            E.log('上传结束，返回结果为 ' + resultText);
            resultText = JSON.parse(resultText)
            var editor = this;
            var originalName = editor.uploadImgOriginalName || '';  // 上传图片时，已经将图片的名字存在 editor.uploadImgOriginalName
            var img;
            E.log(originalName)
            if (resultText.msg == "上传失败") {
                // 提示错误
                E.warn('上传失败：' + resultText.msg);
                alert(resultText.msg);
            } else {
                E.log('上传成功，即将插入编辑区域，结果为：' + resultText.data.fileName);
                // 将结果插入编辑器

                img = document.createElement('img');
                img.onload = function () {
                    var html = '<img src="' + imgPath + resultText.data.fileName + '" alt="' + originalName + '" style="max-width:100%;"/>';
                    editor.command(null, 'insertHtml', html);
                    E.log('已插入图片，地址 ' + resultText.data.fileName);
                    img = null;
                };
                img.onerror = function () {
                    E.error('使用返回的结果获取图片，发生错误。请确认以下结果是否正确：' + resultText);
                    img = null;
                };
                img.src = imgPath + resultText.data.fileName;
            }

        }
    }

    var contentText = new E('contentText');
    contentText.create()
</script>
</html>


