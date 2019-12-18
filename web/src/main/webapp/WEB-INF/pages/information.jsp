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
    <link href="<%=request.getContextPath()%>/resources/wangeditor/css/wangEditor.css" rel="stylesheet">
    <link href="<%=request.getContextPath()%>/resources/ace/css/ace.css" class="ace-main-stylesheet" id="main-ace-style"
          rel="stylesheet" type="text/css"/>
    <link href="<%=request.getContextPath()%>/resources/ace/css/select2.css" rel="stylesheet">
    <link href="<%=request.getContextPath()%>/resources/ace/css/jquery-ui.css" rel="stylesheet">
    <link href="<%=request.getContextPath()%>/resources/css/common.css" rel="stylesheet" type="text/css">
    <link href="<%=request.getContextPath()%>/resources/css/information.css" rel="stylesheet" type="text/css">
    <script src="<%=request.getContextPath()%>/resources/ace/js/jquery.js"></script>
    <script src="<%=request.getContextPath()%>/resources/ace/js/select2.js"></script>
    <script src="<%=request.getContextPath()%>/resources/wangeditor/js/wangEditor.js"></script>
    <script src="<%=request.getContextPath()%>/resources/ace/js/jquery-ui.js"></script>
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
                <li><a id="gg" class="selected-li">对内公告</a></li>
                <li><a id="zx">对外资讯</a></li>
                <li>
                    <a>健康宣教<img src="<%=request.getContextPath()%>/resources/icon/fanhui1.png"></a>
                    <ul>
                        <li><a id="qc">青春教育</a></li>
                        <li><a id="zd">计生指导</a></li>
                        <li><a id="zc">政策法规</a></li>
                        <li><a id="ys">优生优育</a></li>
                    </ul>
                </li>
            </ul>
            <div id="other"><div id="othertext"></div></div>
            <div id="other1"><div id="othertext1"></div></div>
        </div>
        <div class="right">
            <%--公告资讯宣教--%>
            <div class="right-main ">
                <div class="l-title">对内公告</div>
                <div class="s-title">公告与资讯/对内公告</div>
                <div class="search-div">
                    <label><input class="normal-input" placeholder="输入公告标题" value=""></label>
                    <button class="main-button">搜&nbsp;索</button>
                </div>
                <div class="information-buttons">
                    <button class="main-button add-button hidden"><img src="<%=request.getContextPath()%>/resources/icon/jia-2.png">添加
                    </button>
                    <button class="normal-button refresh">刷&nbsp;新</button>
                </div>
                <%--对内公告--%>
                <div class="information-table ">
                    <div class="row">
                        <div class="col-lg-12">
                            <table id="gg-table" class="table table-striped table-bordered table-hover">
                                <thead>
                                <tr>
                                    <th>序号</th>
                                    <th style="padding-left: 8px !important;">标题</th>
                                    <th>发布时间</th>
                                    <th>修改时间</th>
                                    <th>发布者</th>
                                    <th>点击次数</th>
                                    <th>操作</th>
                                </tr>
                                </thead>
                                <tbody class="gonggaoList"></tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <%--对外资讯--%>
                <div class="information-table hidden">
                    <div class="row">
                        <div class="col-lg-12">
                            <table id="zx-table" class="table table-striped table-bordered table-hover">
                                <thead>
                                <tr>
                                    <th>序号</th>
                                    <th>封面</th>
                                    <th>标题</th>
                                    <th>发布时间</th>
                                    <th>修改时间</th>
                                    <th>发布者</th>
                                    <th>点击次数</th>
                                    <th>操作</th>
                                </tr>
                                </thead>
                                <tbody class="zixunList"></tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <%--宣教除青春--%>
                <div class="information-table hidden">
                    <div class="row">
                        <div class="col-lg-12">
                            <table id="xj-table" class="table table-striped table-bordered table-hover">
                                <thead>
                                <tr>
                                    <th>序号</th>
                                    <th>封面</th>
                                    <th>标题</th>
                                    <th>操作</th>
                                </tr>
                                </thead>
                                <tbody class="xuanjiaoList"></tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <input class="hidden" value="0">
            </div>
            <%--编辑公告、资讯、宣教，添加公告、资讯、宣教--%>
            <div id="edit" class="right-main hidden">
                <div class="l-title"><img src="<%=request.getContextPath()%>/resources/icon/fanhui.png">编辑公告</div>
                <div class="s-title">公告与资讯/对内公告/编辑</div>
                <input name="id" hidden value="">
                <div class="main-title">
                    <%--公告资讯 标题，宣教 名称--%>
                    <span>标题</span>
                    <label>
                        <input id="edit-title" class="normal-input">
                    </label>
                    <label>
                        <select id="edit-imporance">
                            <option value="1">普通</option>
                            <option value="2">重要</option>
                            <option value="3">紧急</option>
                        </select>
                    </label>
                </div>
                <%--编辑添加--%>
                <div class="main-text">
                    <span>内容</span>
                    <div id="inputArea"></div>
                </div>
                <%--公告无，资讯、宣教有--%>
                <div class="main-cover">
                    <span>封面</span>
                    <div>
                        <div><img src="<%=request.getContextPath()%>/resources/icon/tianjiakaobei2.png"></div>
                        <div><span>上传封面</span></div>
                        <div><span>jpg png</span></div>
                    </div>
                    <div id="addCover1">
                        <div class="deleteImg"><img src="<%=request.getContextPath()%>/resources/icon/guanbi(2).png"></div>
                        <div class="mask hidden"></div>
                        <label><input id="image-src" class="hidden"></label>
                        <%--<img src="<%=request.getContextPath()%>/resources/icon/area.png">--%>
                    </div>
                    <label><input type="file" class="hidden" accept="image/jpeg,image/png"></label>
                </div>
                <%--宣教有其余无--%>
                <div class="main-cover">
                    <span>附件</span>
                    <div>
                        <div><img src="<%=request.getContextPath()%>/resources/icon/tianjiakaobei2.png"></div>
                        <div><span>上传附件</span></div>
                        <div><span>pdf</span></div>
                    </div>
                    <div style="height: 160px;align-items: flex-start">
                        <iframe></iframe>
                        <a target="_blank" class="hidden">预览</a>
                        <a target="_blank" class="hidden">下载</a>
                        <a target="_blank" class="hidden">删除</a>
                    </div>
                    <label><input type="file" class="hidden" accept="application/pdf"></label>
                </div>
                <div class="main-buttons">
                    <button id="cancel-btn" class="normal-button">取&nbsp;消</button>
                    <button id="add-update-button" class="main-button">确&nbsp;认</button>
                </div>
            </div>
            <%--详情--%>
            <div class="right-main hidden">
                <div class="l-title"><img src="<%=request.getContextPath()%>/resources/icon/fanhui.png">宣教详情</div>
                <div class="s-title">公告与资讯/健康宣教/计生指导</div>
                <div class="read-main">
                    <div>
                        <div class="read-title">0岁宝宝的哭啼声</div>
                        <div class="read-type">计生指导</div>
                        <div class="read-cover">
                            <%--<img src="<%=request.getContextPath()%>/resources/icon/area.png">--%>
                        </div>
                        <div class="read-text">
                            <%--0岁宝宝的哭啼声0岁宝宝的哭啼声0岁宝宝的哭啼声0岁宝宝的哭啼声0岁宝宝的哭啼声0岁宝宝的哭啼声0岁宝宝的哭啼声0岁宝宝的哭啼声0岁宝宝的哭啼声0岁宝宝的哭啼声0岁宝宝的哭啼声0岁宝宝的哭啼声0岁宝宝的哭啼声0岁宝宝的哭啼声0岁宝宝的哭啼声--%>
                        </div>
                        <div class="read-fujian">

                        </div>
                    </div>
                    <div></div>
                    <div class="others">
                        <div class="other-title">
                            其他宣教
                        </div>
                        <%--5个有封面--%>
                        <%--<div class="other-item-type1">--%>
                            <%--<div>--%>
                                <%--<img src="<%=request.getContextPath()%>/resources/icon/1-tupianzhanweitu.png">--%>
                            <%--</div>--%>
                            <%--<div>--%>
                                <%--<div>0岁宝宝的哭啼声0岁宝宝的哭啼声0岁宝宝的哭啼声0岁宝宝的哭啼声0岁宝宝的哭啼声0岁宝宝的哭啼声</div>--%>
                                <%--<div>计生指导</div>--%>
                            <%--</div>--%>
                        <%--</div>--%>
                        <%--5个无封面--%>
                        <%--<div class="other-item-type2">--%>
                            <%--<div>--%>
                                <%--<div>0岁宝宝的哭啼声0岁宝宝的哭啼声0岁宝宝的哭啼声0岁宝宝的哭啼声0岁宝宝的哭啼声0岁宝宝的哭啼声</div>--%>
                                <%--<div>计生指导</div>--%>
                            <%--</div>--%>
                        <%--</div>--%>

                    </div>
                </div>

            </div>
            <%--青春--%>
            <div class="right-main hidden">
                <div class="l-title">青春健康</div>
                <div class="s-title">公告与资讯/健康宣教/青春健康/视频详情</div>
                <div class="search-div">
                    <label><input id="xuanjiao-search-title" class="normal-input" placeholder="输入宣教标题" value=""></label>
                    <button id="xuanjiao-search-button" class="main-button">搜&nbsp;索</button>
                </div>
                <div class="information-buttons">
                    <button class="main-button add-button hidden"><img src="<%=request.getContextPath()%>/resources/icon/jia-2.png">添加
                    </button>
                    <button class="normal-button refresh">刷&nbsp;新</button>
                    <button class="normal-button video-delete-button">编&nbsp;辑</button>
                </div>
                <div class="row">
                    <div class="col-lg-12">
                        <table id="Videos-table" class="table table-striped table-bordered table-hover">
                            <tbody></tbody>
                        </table>
                    </div>
                </div>
                <div id="textDiv"><div id="textDiv1"></div></div>
            </div>
            <%--添加视频--%>
            <div class="right-main hidden">
                <div class="l-title"><img src="<%=request.getContextPath()%>/resources/icon/fanhui.png">添加视频</div>
                <div class="s-title">公告与资讯/健康资讯/青春健康/添加视频</div>
                <div class="main-title">
                    <span>标题</span>
                    <label><input id="add-video-title" class="normal-input"></label>
                </div>
                <div class="main-cover">
                    <span>视频</span>
                    <div>
                        <div><img src="<%=request.getContextPath()%>/resources/icon/tianjiakaobei2.png"></div>
                        <div><span>上传视频</span></div>
                        <div><span>MP4 avi</span></div>
                    </div>
                    <div>
                        <div class="deleteVideo"><img src="<%=request.getContextPath()%>/resources/icon/guanbi(2).png"></div>
                        <label><input id="video-src" class="hidden"></label>
                        <div class="mask hidden"></div>
                        <div class="play hidden"><img src="<%=request.getContextPath()%>/resources/icon/bofang.png"></div>
                        <%--<video controls src="<%=request.getContextPath()%>/resources/test/test.mov"></video>--%>
                    </div>
                    <label><input type="file" class="hidden" accept="video/*"></label>
                </div>
                <div class="main-cover">
                    <span>封面</span>
                    <div>
                        <div><img src="<%=request.getContextPath()%>/resources/icon/tianjia(NO).png"></div>
                        <div><span>上传封面</span></div>
                        <div><span>jpg png</span></div>
                    </div>
                    <div id="add-video-image">
                        <div class="deleteImg"><img src="<%=request.getContextPath()%>/resources/icon/guanbi(2).png"></div>
                        <div class="mask hidden"></div>
                        <label><input id="QCJY-img-src" class="hidden"></label>
                        <%--<img src="<%=request.getContextPath()%>/resources/icon/area.png">--%>
                    </div>
                    <label><input type="file" class="hidden" accept="image/jpeg,image/png"></label>
                </div>
                <div class="main-buttons">
                    <button class="normal-button">取&nbsp;消</button>
                    <button id="add-QCJY-button" class="main-button">确&nbsp;认</button>
                </div>
                <input name="id" hidden value="">
            </div>
        </div>
    </div>
    <div class="myContent loading">
        <div id="loading">
            <img src="<%=request.getContextPath()%>/resources/icon/loading.gif">
        </div>
    </div>
</div>
<div class="popBox" id="playVideo" style="display: none">
    <div class="popBox-mask"></div>
    <div class="popBox-content">
        <div>

        </div>
    </div>
</div>
<div class="popBox" id="selectType" style="display: none">
    <div class="popBox-mask"></div>
    <div class="popBox-content">
        <div class="selectType-title">
            选择添加类型
            <div><img  class="closeType" src="<%=request.getContextPath()%>/resources/icon/guanbi(1).png"></div>
        </div>
        <div class="typeButtons">
            <button class="normal-button">PDF</button>
            <button class="main-button">视频</button>
        </div>
    </div>
</div>
</body>
<script src="<%=request.getContextPath()%>/resources/js/util/bootstrap.min.js" type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/resources/ace/js/bootbox.js"></script>
<script src="<%=request.getContextPath()%>/resources/js/util/staticUrl.js" type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/resources/js/util/util-common.js" type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/resources/ace/js/dataTables/jquery.dataTables.js"></script>
<script src="<%=request.getContextPath()%>/resources/ace/js/dataTables/jquery.dataTables.bootstrap.js"></script>
<script src="<%=request.getContextPath()%>/resources/js/information.js"></script>
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

	var inputArea = new E('inputArea');
	inputArea.create()
</script>
</html>
