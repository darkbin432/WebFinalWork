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
    <link href="<%=request.getContextPath()%>/resources/css/bootstrap.min.css" rel="stylesheet">
    <link href="<%=request.getContextPath()%>/resources/ace/css/ace.css" class="ace-main-stylesheet" id="main-ace-style" rel="stylesheet" type="text/css" />
    <link href="<%=request.getContextPath()%>/resources/ace/css/jquery-ui.css" rel="stylesheet">
    <link type="text/css" href="<%=request.getContextPath()%>/resources/css/common.css" rel="stylesheet">
    <link type="text/css" href="<%=request.getContextPath()%>/resources/css/mail.css" rel="stylesheet">
    <link href="<%=request.getContextPath()%>/resources/wangeditor/css/wangEditor.css" rel="stylesheet">
    <script src="<%=request.getContextPath()%>/resources/ace/js/jquery.js"></script>
    <script src="<%=request.getContextPath()%>/resources/js/util/bootstrap.min.js" type="text/javascript"></script>
    <script src="<%=request.getContextPath()%>/resources/ace/js/bootbox.js" type="text/javascript"></script>
    <script src="<%=request.getContextPath()%>/resources/wangeditor/js/wangEditor.js?v=1"></script>
    <script src="<%=request.getContextPath()%>/resources/ace/js/jquery-ui.js"></script>
    <script src="<%=request.getContextPath()%>/resources/js/common.js" type="text/javascript"></script>
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
                <li><a id="writeMail"><img src="<%=request.getContextPath()%>/resources/icon/xiexin(1).png">写信</a></li>
                <li><a id="recieveMail1" class="selected-top-li"><img src="<%=request.getContextPath()%>/resources/icon/shouxinguanli.png">收信</a></li>
            </ul>
            <div></div>
            <ul>
                <li><a id="recieveMail2">收信箱</a></li>
                <li><a id="starMail"><img src="<%=request.getContextPath()%>/resources/icon/xingbiao.png">星标邮件</a></li>
                <li><a id="draftMail">草稿箱</a></li>
                <li><a id="havesendMail">已发送</a></li>
                <li><a id="trashMail">回收站</a></li>
            </ul>
        </div>
        <div class="right ">
            <div id="write-page" class="hidden right-main">
                <div class="mail-title">写信</div>
                <div class="mail-buttons">
                    <button class="main-button toSend"><img src="<%=request.getContextPath()%>/resources/icon/fasong.png">发送
                    </button>
                    <button class="normal-button toSave">存草稿</button>
                    <button class="normal-button toClose">关闭</button>
                </div>
                <div class="mail-recipients">
                    <span>收件人：</span>
                    <input contenteditable="true" id="mail-search">
                    <div>
                        <img src="<%=request.getContextPath()%>/resources/icon/tianjia.png">
                    </div>
                </div>
                <div class="mail-theme">
                    <span>主<span>题</span>：</span>
                    <div contenteditable="true" id="writeSubject"></div>
                </div>
                <div class="mail-attachment">
                    <ul>
                        <li><a class="addAttachment"><img src="<%=request.getContextPath()%>/resources/icon/fujian.png">添加附件</a>
                            <input class="hidden" type="file">
                            <div></div>
                        </li>
                        <li><a class="addPicture"><img src="<%=request.getContextPath()%>/resources/icon/tupian.png">添加图片</a>
                            <input class="hidden" type="file" accept="image/png,image/jpeg,image/gif">
                            <div></div>
                        </li>
                        <li><a class="addText"><img src="<%=request.getContextPath()%>/resources/icon/report.png">添加文档</a>
                            <input class="hidden" type="file" accept="text/csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/msword,application/pdf,application/vnd.ms-powerpoint,text/plain,application/vnd.ms-works"></li>
                    </ul>
                </div>
                <div class="upload-attachment">
                    <%--<div><a>asdsadas</a><a>删除</a></div>--%>
                </div>
                <div id="write-mail"></div>
                <div class="mail-buttons">
                    <button class="main-button toSend"><img src="<%=request.getContextPath()%>/resources/icon/fasong.png">发送
                    </button>
                    <button class="normal-button toClose">关闭</button>
                </div>
            </div>
            <div id="mails-page" class="right-main">
                <div class="mail-title">收信箱</div>
                <%--收信箱--%>
                <div class="mail-buttons">
                    <button class="normal-button toGarbage">删除</button>
                    <button class="normal-button completeDelete">彻底删除</button>
                    <button class="normal-button readIt">标记已读</button>
                </div>
                <%--星标--%>
                <div class="hidden mail-buttons">
                    <button class="normal-button toGarbage">删除</button>
                    <button class="normal-button completeDelete">彻底删除</button>
                </div>
                <%--草稿箱--%>
                <div class="hidden mail-buttons">
                    <button class="normal-button completeDelete">删除草稿</button>
                </div>
                <%--已发送--%>
                <div class="hidden mail-buttons">
                    <button class="normal-button toGarbage">删除</button>
                    <button class="normal-button completeDelete">彻底删除</button>
                </div>
                <%--回收站--%>
                <div class="hidden mail-buttons">
                    <button class="normal-button recover">恢复</button>
                    <button class="normal-button completeDelete">彻底删除</button>
                </div>
                <%--其余--%>
                <div id="recieveTable" class="mails-type1">
                    <div class="row">
                        <div class="col-lg-12">
                            <table id="mails-type1" class="table table-striped table-bordered table-hover">
                                <thead>
                                <tr>
                                    <th>
                                        <label>
                                            <input type="checkbox">
                                            <span></span>
                                        </label>
                                    </th>
                                    <th><img src="<%=request.getContextPath()%>/resources/icon/youjianheide.png"></th>
                                    <th>发件人</th>
                                    <th>主题</th>
                                    <th>时间</th>
                                    <th>星标</th>
                                </tr>
                                </thead>
                                <tbody class="mailList"></tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <%--已发送--%>
                <div id="sendTable" class="hidden mails-type1 mails-type2">
                    <div class="row">
                        <div class="col-lg-12">
                            <table id="mails-type2" class="table table-striped table-bordered table-hover">
                                <thead>
                                <tr>
                                    <th>
                                        <label>
                                            <input type="checkbox">
                                            <span></span>
                                        </label>
                                    </th>
                                    <th><img src="<%=request.getContextPath()%>/resources/icon/youjianheide.png"></th>
                                    <th>发件人</th>
                                    <th>主题</th>
                                    <th>时间</th>
                                    <th>星标</th>
                                </tr>
                                </thead>
                                <tbody class="mailList"></tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div id="read-page" class="hidden right-main">
                <div class="mail-buttons">
                    <button class="normal-button goBack">返回</button>
                    <button class="normal-button reply">回复</button>
                    <button class="normal-button transmit">转发</button>
                    <button class="normal-button reEdit">重新编辑</button>
                    <button class="normal-button toGarbage">删除</button>
                    <button class="normal-button completeDelete">彻底删除</button>
                </div>
                <div id="read" class="mail-title readSubject">计生活动总结<img src="<%=request.getContextPath()%>/resources/icon/xingbiaoa.png">
                </div>
                <div class="mail-info">
                    <div>发件人：</div>
                    <div class="readInMail">杜玉芬 18798665655admin</div>
                </div>
                <div class="mail-info">
                    <div>收件人：</div>
                    <div class="readToMail">杜玉芬 18798665655admin</div>
                </div>
                <div class="mail-data">
                    <div>时<span>间：</span></div>
                    <div class="readDate">2018年04月16日 18:22 （星期一）</div>
                </div>
                <div class="mail-attachments">
                    <div>附<span>件：</span></div>
                    <div class="readAttachment">0个<span>（<img src="<%=request.getContextPath()%>/resources/icon/juxing21.png">2018年04月16日 18:22 计生项目.docx等)</span>
                        <a>查看附件</a>
                    </div>
                </div>
                <div class="read-area readContent">哈哈哈哈哈哈哈</div>
                <div class="mail-title"><img
                        src="<%=request.getContextPath()%>/resources/icon/fujianda.png">附件<span id="attachment-count">(2）</span></div>
                <div class="attachments">
                    <div class="attachment">
                        <div>
                            <img src="<%=request.getContextPath()%>/resources/icon/juxing21.png">
                        </div>
                        <div>
                            <div>计生项目.docx<span>（164M）</span></div>
                            <div><a>下载</a></div>
                        </div>
                    </div>
                    <div class="attachment">
                        <div>
                            <img src="<%=request.getContextPath()%>/resources/icon/juxing21.png">
                        </div>
                        <div>
                            <div>计生项目.docx<span>（164M）</span></div>
                            <div><a>下载</a></div>
                        </div>
                    </div>
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
<div class="popBox " id="selectRecipients" style="display: none">
    <div class="popBox-mask"></div>
    <div class="popBox-content">
        <div class="selectRecipients-title">
            添加收件人
            <div><img src="<%=request.getContextPath()%>/resources/icon/guanbi(1).png"></div>
        </div>
        <div class="search-member">
            <ul>
                <li>
                    <a class="dept">
                        <img src="<%=request.getContextPath()%>/resources/icon/iconse.png">
                        <img src="<%=request.getContextPath()%>/resources/icon/zuocechouti.png">
                        杭州市计生协
                        <label>
                            <input type="checkbox">
                            <span></span>
                        </label>
                    </a>
                    <ul>
                        <li>
                            <a class="dept-members">
                                <img src="<%=request.getContextPath()%>/resources/icon/iconse.png">
                                <img src="<%=request.getContextPath()%>/resources/icon/wenjian.png">
                                部门成员
                                <label>
                                    <input type="checkbox">
                                    <span></span>
                                </label>
                            </a>
                            <ul>
                                <li>
                                    <a class="member">
                                        <div></div>
                                        <img src="<%=request.getContextPath()%>/resources/icon/chengyuan2.png">杜玉芬
                                        <label>
                                            <input type="checkbox">
                                            <span></span>
                                        </label>
                                    </a>
                                    <a class="member">
                                        <div></div>
                                        <img src="<%=request.getContextPath()%>/resources/icon/chengyuankaobei.png">杜玉芬
                                        <label>
                                            <input type="checkbox">
                                            <span></span>
                                        </label>
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a>
                                <img src="<%=request.getContextPath()%>/resources/icon/iconse.png">
                                <img src="<%=request.getContextPath()%>/resources/icon/wenjian.png">
                                上城区计生协
                                <label>
                                    <input type="checkbox">
                                    <span></span>
                                </label>
                            </a>
                            <ul>
                                <li>
                                    <a>
                                        <img src="<%=request.getContextPath()%>/resources/icon/iconse.png">
                                        <img src="<%=request.getContextPath()%>/resources/icon/wenjian.png">
                                        部门成员
                                        <label>
                                            <input type="checkbox">
                                            <span></span>
                                        </label>
                                    </a>
                                    <ul>
                                        <li>
                                            <a class="member">
                                                <div></div>
                                                <img src="<%=request.getContextPath()%>/resources/icon/chengyuan2.png">杜玉芬
                                                <label>
                                                    <input type="checkbox">
                                                    <span></span>
                                                </label>
                                            </a>
                                            <a class="member">
                                                <div></div>
                                                <img src="<%=request.getContextPath()%>/resources/icon/chengyuankaobei.png">杜玉芬
                                                <label>
                                                    <input type="checkbox">
                                                    <span></span>
                                                </label>
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <a>
                                        <img src="<%=request.getContextPath()%>/resources/icon/iconse.png">
                                        <img src="<%=request.getContextPath()%>/resources/icon/wenjian.png">
                                        湖滨街道
                                        <label>
                                            <input type="checkbox">
                                            <span></span>
                                        </label>
                                    </a>
                                    <ul>
                                        <li>
                                            <a>
                                                <img src="<%=request.getContextPath()%>/resources/icon/iconse.png">
                                                <img src="<%=request.getContextPath()%>/resources/icon/wenjian.png">
                                                部门成员
                                                <label>
                                                    <input type="checkbox">
                                                    <span></span>
                                                </label>
                                            </a>
                                            <ul>
                                                <li>
                                                    <a class="member">
                                                        <div></div>
                                                        <img src="<%=request.getContextPath()%>/resources/icon/chengyuan2.png">杜玉芬
                                                        <label>
                                                            <input type="checkbox">
                                                            <span></span>
                                                        </label>
                                                    </a>
                                                    <a class="member">
                                                        <div></div>
                                                        <img src="<%=request.getContextPath()%>/resources/icon/chengyuankaobei.png">杜玉芬
                                                        <label>
                                                            <input type="checkbox">
                                                            <span></span>
                                                        </label>
                                                    </a>
                                                </li>
                                            </ul>
                                        </li>
                                        <li>
                                            <a class="dept-members">
                                                <img src="<%=request.getContextPath()%>/resources/icon/iconse.png">
                                                <img src="<%=request.getContextPath()%>/resources/icon/wenjian.png">
                                                某某社区
                                                <label>
                                                    <input type="checkbox">
                                                    <span></span>
                                                </label>
                                            </a>
                                            <ul>
                                                <li>
                                                    <a class="member">
                                                        <div></div>
                                                        <img src="<%=request.getContextPath()%>/resources/icon/chengyuan2.png">杜玉芬
                                                        <label>
                                                            <input type="checkbox">
                                                            <span></span>
                                                        </label>
                                                    </a>
                                                    <a class="member">
                                                        <div></div>
                                                        <img src="<%=request.getContextPath()%>/resources/icon/chengyuankaobei.png">杜玉芬
                                                        <label>
                                                            <input type="checkbox">
                                                            <span></span>
                                                        </label>
                                                    </a>
                                                </li>
                                            </ul>
                                            <a>
                                                <img src="<%=request.getContextPath()%>/resources/icon/iconse.png">
                                                <img src="<%=request.getContextPath()%>/resources/icon/wenjian.png">
                                                某某社区
                                                <label>
                                                    <input type="checkbox">
                                                    <span></span>
                                                </label>
                                            </a>
                                            <a>
                                                <img src="<%=request.getContextPath()%>/resources/icon/iconse.png">
                                                <img src="<%=request.getContextPath()%>/resources/icon/wenjian.png">
                                                某某社区
                                                <label>
                                                    <input type="checkbox">
                                                    <span></span>
                                                </label>
                                            </a>
                                            <a>
                                                <img src="<%=request.getContextPath()%>/resources/icon/iconse.png">
                                                <img src="<%=request.getContextPath()%>/resources/icon/wenjian.png">
                                                某某社区
                                                <label>
                                                    <input type="checkbox">
                                                    <span></span>
                                                </label>
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <div class="pop-buttons">
            <button class="normal-button">取消</button>
            <button class="main-button">确认</button>
        </div>
    </div>
</div>
</body>
<script src="<%=request.getContextPath()%>/resources/js/util/staticUrl.js" type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/resources/js/util/util-common.js" type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/resources/ace/js/dataTables/jquery.dataTables.js"></script>
<script src="<%=request.getContextPath()%>/resources/ace/js/dataTables/jquery.dataTables.bootstrap.js"></script>
<script src="<%=request.getContextPath()%>/resources/js/mail.js"></script>
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

	var writeMailEditor = new E('write-mail');
	writeMailEditor.create()
</script>
</html>
