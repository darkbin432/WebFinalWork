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
    <link href="<%=request.getContextPath()%>/resources/wangeditor/css/wangEditor.css" rel="stylesheet">
    <script src="<%=request.getContextPath()%>/resources/js/jquery-3.3.1.min.js"></script>
    <script src="<%=request.getContextPath()%>/resources/js/util/bootstrap.min.js" type="text/javascript"></script>
    <script src="<%=request.getContextPath()%>/resources/ace/js/bootbox.js"></script>
    <style>
        .modal-content {
            position: relative;
            background-color: #fff;
            -webkit-background-clip: padding-box;
            background-clip: padding-box;
            border: 1px solid #999;
            border: 1px solid rgba(0, 0, 0, .2);
            border-radius: 0px;
            outline: 0;
            -webkit-box-shadow: 0 3px 9px rgba(0, 0, 0, .5);
            box-shadow: 0 3px 9px rgba(0, 0, 0, .5);
            top: 150px;
        }

        .modal-header {
            padding: 7px;
            border-bottom: 1px solid #e5e5e5;
            background-color: #F44336;
        }

        button.close {
            -webkit-appearance: none;
            padding: 0;
            cursor: pointer;
            background-color: white;
            border: 1px solid #F44336;
            z-index: 1;
            position: relative;
            width: 18px;
            height: 18px;
            border-radius: 9px;
        }

        .close {
            float: right;
            font-size: 17px;
            font-weight: 700;
            line-height: 1;
            color: #F44336;
            text-shadow: 0 1px 0 #fff;
            filter: alpha(opacity=20);
            opacity: 1;
        }

        .modal-body {
            position: relative;
            padding: 15px;
            font-family: Roboto;
        }

        .modal-footer {
            padding: 15px;
            text-align: center;
            border-top: 1px solid #e5e5e5;
        }

        .btn-default {
            color: #FFFFFF;
            background-color: #333;
            border-color: #ccc;
        }

        .btn-default:hover {
            color: #FFFFFF;
            background-color: #333;
            border-color: #ccc;
        }

        .btn-primary {
            color: #fff;
            background-color: #F44336;
            border-color: #F44336;
        }

        button.btn.btn-primary:hover {
            background-color: #F44336;
            border-color: #F44336;
        }

        .modal-title {
            margin: 0;
            line-height: 1.42857143;
            font-size: 16px;
            font-weight: bold;
            color: #FFFFFF;
            font-family: Montserrat;
        }
    </style>
</head>
<body>
<div class="container kv-main">

    <br>
    <%--<form enctype="multipart/form-data">--%>
    <div id="addImage">
        <%--上传模块--%>
        <input id="file1" type="file" multiple class="file"
        <%--data-min-file-count="1"--%>
               data-upload-url="<%=request.getContextPath()%>/api/file/fileUpload?fileType=image">
        <%--文件名存储变量--%>
        <input id="fileImagesHidden" hidden>
    </div>
    <div id="editor" style="width: 100%;height: 300px;">

    </div>
    <%--</form>--%>
    <input type="button" value="ceshi" class="btn btn-default">
</div>
</body>
<script src="<%=request.getContextPath()%>/resources/ace/js/jquery.js"></script>
<script src="<%=request.getContextPath()%>/resources/js/util/fileinput.js" type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/resources/js/util/fileinput_locale_zh.js"
        type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/resources/js/util/bootstrap.min.js" type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/resources/js/test/uploadPage.js?v=2" type="text/javascript"></script>

<script>
	bootbox.confirm({
		title: "Confirm",
		message: "Do you want to activate the Deathstar now? This cannot be undone.",
		buttons: {
			confirm: {
				label: '<i class="fa fa-check"></i> Yes',
				className: 'btn-success'
			},
			cancel: {
				label: '<i class="fa fa-times"></i> No',
				className: 'btn-danger'
			}
		},
		callback: function(result) {
			if (result) {
				backmethod("冯伟大神");
			} else {
				return;
			}
		}
	});

	$("#file1").fileinput({
        autoReplace: true, // 选择图片超过maxFileSize则替换
        language: 'zh', //设置语言
        allowedFileExtensions: ['jpg', 'JPG', 'JPEG', 'gif', 'GIF', 'png', 'PNG'],//接收的文件后缀
        showUpload: true, //是否显示上传按钮
        showCaption: false,//是否显示标题
        maxFileSize: 0,//单位为kb，如果为0表示不限制文件大小
        maxFileCount: 1, //表示允许同时上传的最大文件个数
        validateInitialCount: true
    }).on('fileuploaded', function (event, data, id, index) {
        // fileuploaded 文件上传以后的响应时间
        if (data.response.status == 200 && data.response.data.fileName) {
            // 文件名保存在fileImagesHidden
            $("#fileImagesHidden").val(data.response.data.fileName);
        } else {
            var innerHTML = '<ul><li data-file-id="preview-1-0">' + data.response.msg + '</li></ul>';
            $("#addImage").find($(".kv-fileinput-error.file-error-message")).html(innerHTML);
            $("#addImage").find($(".kv-fileinput-error.file-error-message")).fadeIn(800);
        }
    })
</script>

<script src="<%=request.getContextPath()%>/resources/wangeditor/js/wangEditor.js?v=1"></script>
<script>
	var E = window.wangEditor;
	// var editor = new E('editor')
	E.config.uploadImgUrl = '<%=request.getContextPath()%>/api/file/fileUpload?fileType=image';
	E.config.uploadImgFileName = 'file_data';
	E.config.uploadImgFns = {
		onload:function (resultText,xhr) {
			E.log('上传结束，返回结果为 ' + resultText);
			resultText=JSON.parse(resultText)
			var editor = this;
			var originalName = editor.uploadImgOriginalName || '';  // 上传图片时，已经将图片的名字存在 editor.uploadImgOriginalName
			var img;
			E.log(originalName)
			if (resultText.msg=="上传失败") {
				// 提示错误
				E.warn('上传失败：' + resultText.msg);
				alert(resultText.msg);
			} else {
				E.log('上传成功，即将插入编辑区域，结果为：' + resultText.data.fileName);
				alert(originalName)
				// 将结果插入编辑器
				img = document.createElement('img');
				img.onload = function () {
					var html = '<img src="http://localhost:8090/hzjsResource/images/'+resultText.data.fileName+'" alt="' +resultText.data.fileName+ '" style="max-width:100%;"/>';
					editor.command(null, 'insertHtml', html);
					E.log('已插入图片，地址 ' + resultText.data.fileName);
					img = null;
				};
				img.onerror = function () {
					E.error('使用返回的结果获取图片，发生错误。请确认以下结果是否正确：' + resultText);
					img = null;
				};
				img.src = "http://localhost:8090/hzjsResource/images/"+resultText.data.fileName;
            }

		}
	}
	var editor = new E( document.getElementById('editor') )
	editor.create()
</script>