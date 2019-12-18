<%--
  Created by IntelliJ IDEA.
  User: kzn
  Date: 2019-08-22
  Time: 16:51
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
    <link href="<%=request.getContextPath()%>/resources/laydate/theme/default/laydate.css" rel="stylesheet">
    <link href="<%=request.getContextPath()%>/resources/ace/css/select2.css" rel="stylesheet">
    <link href="<%=request.getContextPath()%>/resources/ace/css/jquery-ui.css" rel="stylesheet">
    <link href="<%=request.getContextPath()%>/resources/css/common.css" rel="stylesheet" type="text/css">
    <link href="<%=request.getContextPath()%>/resources/css/sweetalert/sweetalert.css" media="all" rel="stylesheet"
          type="text/css"/>
    <link href="<%=request.getContextPath()%>/resources/css/task.css" rel="stylesheet" type="text/css">
    <script src="<%=request.getContextPath()%>/resources/ace/js/jquery.js"></script>
    <script src="<%=request.getContextPath()%>/resources/ace/js/select2.js"></script>
    <script src="<%=request.getContextPath()%>/resources/wangeditor/js/wangEditor.js"></script>
    <script src="<%=request.getContextPath()%>/resources/js/validate.js"></script>
    <script src="<%=request.getContextPath()%>/resources/ace/js/jquery-ui.js"></script>
    <script type="text/javascript" src="<%=request.getContextPath()%>/resources/js/util/jszip.js"></script>
    <script type="text/javascript" src="<%=request.getContextPath()%>/resources/js/util/FileSaver.js"></script>
    <script>
		document.onreadystatechange = function () {
			if (document.readyState == "complete") {
				$(".myContent").removeClass("hidden");
				$(".loading").css("display", "none");
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
                <li><a id="addGongWen">写公文</a></li>
                <li><a id="gongwenliebiao" class="selected-li">公文列表</a></li>
            </ul>
        </div>
        <div class="right">
            <div class="task-title" style="display: none"></div>
            <div class="right-main"></div>
            <div class="right-main hidden"></div>
            <div id="edit" class="right-main hidden"></div>
            <div class="task-title hidden"></div>
            <div class="right-main hidden"></div>
            <div id="check" class="right-main hidden"></div>
            <%--公文列表--%>
            <div class="right-main ">
                <div class="l-title">公文列表</div>
                <div class="s-title">公文管理/公文列表</div>
                <div class="line"></div>
                <div class="query-title">查询条件</div>
                <div class="query-terms" id="gwcx">
                    <label>
                        <input class="normal-input" id="gwcxTime" placeholder="请选择时间">
                    </label>
                    <label>
                        <input class="normal-input gwcxtj"  placeholder="请输入拟稿人姓名">
                    </label>
                    <button class="main-button gwcx">查&nbsp;询</button>
                </div>
                <div class="task-table">
                    <div class="row">
                        <div class="col-lg-12">
                            <table id="gongwen-table" class="table table-striped table-bordered table-hover">
                                <thead>
                                <tr>
                                    <th>序号</th>
                                    <th>时间</th>
                                    <th>标题</th>
                                    <th>主办处室</th>
                                    <th>拟稿人</th>
                                    <th>操作</th>
                                </tr>
                                </thead>
                                <tbody></tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <%--公文添加编辑--%>
            <div class="right-main hidden">
                <div class="l-title"><img src="<%=request.getContextPath()%>/resources/icon/fanhui.png">写公文</div>
                <div class="s-title">公文管理/写公文</div>
                <div class="line"></div>
                <div class="task-main">
                    <table id="GongWen">
                        <tr>
                            <td rowspan="1" colspan="1">
                                <div class="gongwen-head" style="height: 180px">主送机关</div>
                            </td>
                            <td rowspan="1" colspan="1">
                                <div class="gongwen-input zhusongjg" id="zhusongjg-1" placeholder="请输入主送机关" contenteditable="true"
                                     style="width: 250px;"></div>
                            </td>
                            <td rowspan="1" colspan="1">
                                <div class="gongwen-head">会办单位意见</div>
                            </td>
                            <td rowspan="1" colspan="1">
                                <div class="gongwen-input danweiyj" placeholder="请输入单位意见" contenteditable="true"
                                     style="width: 250px;"></div>
                            </td>
                            <td rowspan="1" colspan="1">
                                <div class="gongwen-head">审核意见</div>
                            </td>
                            <td rowspan="1" colspan="1">
                                <div class="gongwen-input shenheyj" placeholder="请输入审核意见" contenteditable="true"
                                     style="width: 250px;"></div>
                            </td>
                        </tr>
                        <tr>
                            <td rowspan="1" colspan="4">
                                <div class="center-gongwen">
                                    <div style="float:left;">发&nbsp;文&nbsp;号：杭&nbsp;计&nbsp;生&nbsp;协（&nbsp;&nbsp;</div>
                                    <div style="float:left;height: auto;max-width: 350px" class="gongwen-input fawenh"
                                         placeholder="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" contenteditable="true"></div>
                                    <div style="float:left;">&nbsp;&nbsp;）号</div>
                                </div>
                            </td>
                            <td rowspan="1" colspan="2">
                                <div class="center-gongwen">
                                    <div style="float:left;">主办处室：</div>
                                    <div style="float:left;padding: 0;height: auto;width: 200px" class="gongwen-input zhubancs"
                                         placeholder="请输入名称" contenteditable="true"></div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td rowspan="1" colspan="1">
                                <div class="gongwen-head" style="height: 140px">标题（事由）</div>
                            </td>
                            <td rowspan="1" colspan="5">
                                <div class="gongwen-input gwtitle" placeholder="请输入标题（事由）" style="width: 830px"
                                     contenteditable="true"></div>
                            </td>
                        </tr>
                        <tr>
                            <td rowspan="1" colspan="1">
                                <div class="gongwen-head" style="height: 140px">主送机关</div>
                            </td>
                            <td rowspan="1" colspan="5">
                                <div class="gongwen-input zhusongjg" id="zhusongjg-copy" placeholder="请输入主送机关" style="width: 830px"
                                     contenteditable="true"></div>
                            </td>
                        </tr>
                        <tr>
                            <td rowspan="1" colspan="1">
                                <div class="gongwen-head" style="height: 120px">正文</div>
                            </td>
                            <td rowspan="1" colspan="5">
                                <div class="gongwen-fujians gwzw" style="width: 830px">

                                </div>
                                <div class="gongwen-fujian-button" id="gongwen-zhengwen">
                                    <img src="<%=request.getContextPath()%>/resources/icon/tianjia(NO).png"><span>点击添加文稿</span>
                                </div>
                                <input class="hidden" type="file">
                            </td>
                        </tr>
                        <tr>
                            <td rowspan="2" colspan="1">
                                <div class="gongwen-head" style="height: 120px">附件</div>
                            </td>
                            <td rowspan="2" colspan="3">
                                <div class="gongwen-fujians gwfj" style="width: 540px">

                                </div>
                                <div class="gongwen-fujian-button" id="gongwen-fujian">
                                    <img src="<%=request.getContextPath()%>/resources/icon/tianjia(NO).png"><span>点击添加附件</span>
                                </div>
                                <input class="hidden" type="file">
                            </td>
                            <td rowspan="1" colspan="2">
                                <div class="center-gongwen">
                                    <div style="float:left;">处长核签：</div>
                                    <div style="float:left;padding: 0;height: auto;width: 200px" class="gongwen-input chuzhanghq"
                                         placeholder="请输入姓名" contenteditable="true"></div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td rowspan="1" colspan="2">
                                <div class="center-gongwen">
                                    <div style="float:left;">拟<span style="margin: 0 7px">稿</span>人：</div>
                                    <div style="float:left;padding: 0;height: auto;width: 200px" class="gongwen-input nigaor"
                                         placeholder="请输入姓名" contenteditable="true"></div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td rowspan="3" colspan="1">
                                <div class="gongwen-head" style="height: 220px">抄送机关</div>
                            </td>
                            <td rowspan="3" colspan="3">
                                <div class="gongwen-input chaosongjg" style="width: 540px" placeholder="请输入抄送机关"
                                     contenteditable="true"></div>
                            </td>
                            <td rowspan="1" colspan="2">
                                <div class="center-gongwen">
                                    <div style="float:left;">校<span style="margin-left: 28px">对</span>：</div>
                                    <div style="float:left;padding-left: 0;height: auto;width: 200px"
                                         class="gongwen-input jiaodui" placeholder="请输入姓名" contenteditable="true"></div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td rowspan="1" colspan="2">
                                <div class="center-gongwen">
                                    <div style="float:left;">共<span style="margin-left: 28px">印</span>：</div>
                                    <div style="float:left;padding:0;height: auto;width: 160px" class="gongwen-input gongyin"
                                         placeholder="请输入数字" contenteditable="true"></div>
                                    <div style="float:left;padding-left: 14px">份</div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td rowspan="1" colspan="2">
                                <div class="center-gongwen">
                                    <div style="float:left;">印发时间：</div>
                                    <div id="yinfaTime" style="float:left;padding: 0;height: auto;width: 160px"
                                         class="gongwen-input yinfasj" placeholder="请选择时间" contenteditable="true"></div>
                                    <img style="padding-left: 14px"
                                         src="<%=request.getContextPath()%>/resources/icon/4-rili.png">
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td rowspan="1" colspan="6" style="">
                                <div style="float:left;padding: 16px 0 16px 14px;">主&nbsp;题&nbsp;词：</div>
                                <div style="float:left;padding-left: 0;width: 800px" class="gongwen-input zhutic"
                                     placeholder="请输入主题词" contenteditable="true"></div>
                            </td>
                        </tr>
                    </table>
                    <div class="gongwen-buttons" name="">
                        <button class="danger-button bjsc">删&nbsp;除</button>
                        <button class="main-button bjbc">保&nbsp;存</button>
                        <button class="normal-button xzbc">保&nbsp;存</button>
                        <button class="main-button xztj">提&nbsp;交</button>
                    </div>
                </div>
            </div>
            <%--公文查看--%>
            <div class="right-main hidden">
                <div class="l-title"><img src="<%=request.getContextPath()%>/resources/icon/fanhui.png">公文查看</div>
                <div class="s-title">工作管理/公文列表/公文查看</div>
                <div class="line"></div>
                <div class="task-main" style="text-align: center;margin-left: 0">
                    <div class="gongwen-title">杭州市计生协生育协会发文稿纸</div>
                    <table id="GongWenRead" style="margin: auto auto 40px;">
                        <tr>
                            <td rowspan="1" colspan="1">
                                <div class="gongwen-head" style="height: 180px">主送机关</div>
                            </td>
                            <td rowspan="1" colspan="1">
                                <div class="gongwen-input zhusongjg" placeholder="请输入主送机关" contenteditable="false"
                                     style="width: 250px;"></div>
                            </td>
                            <td rowspan="1" colspan="1">
                                <div class="gongwen-head">会办单位意见</div>
                            </td>
                            <td rowspan="1" colspan="1">
                                <div class="gongwen-input danweiyj" placeholder="请输入单位意见" contenteditable="false"
                                     style="width: 250px;"></div>
                            </td>
                            <td rowspan="1" colspan="1">
                                <div class="gongwen-head">审核意见</div>
                            </td>
                            <td rowspan="1" colspan="1">
                                <div class="gongwen-input shenheyj" placeholder="请输入审核意见" contenteditable="false"
                                     style="width: 250px;"></div>
                            </td>
                        </tr>
                        <tr>
                            <td rowspan="1" colspan="4">
                                <div class="center-gongwen">
                                    <div style="float:left;">发&nbsp;文&nbsp;号：杭&nbsp;计&nbsp;生&nbsp;协（&nbsp;&nbsp;</div>
                                    <div style="float:left;height: auto;max-width: 350px" class="gongwen-input fawenh"
                                         placeholder="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" contenteditable="false"></div>
                                    <div style="float:left;">&nbsp;&nbsp;）号</div>
                                </div>
                            </td>
                            <td rowspan="1" colspan="2">
                                <div class="center-gongwen">
                                    <div style="float:left;">主办处室：</div>
                                    <div style="float:left;padding: 0;height: auto;width: 200px" class="gongwen-input zhubancs"
                                         placeholder="请输入名称" contenteditable="false"></div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td rowspan="1" colspan="1">
                                <div class="gongwen-head" style="height: 140px">标题（事由）</div>
                            </td>
                            <td rowspan="1" colspan="5">
                                <div class="gongwen-input gwtitle" placeholder="请输入标题（事由）" style="width: 830px"
                                     contenteditable="false"></div>
                            </td>
                        </tr>
                        <tr>
                            <td rowspan="1" colspan="1">
                                <div class="gongwen-head" style="height: 140px">主送机关</div>
                            </td>
                            <td rowspan="1" colspan="5">
                                <div class="gongwen-input zhusongjg" placeholder="请输入主送机关" style="width: 830px"
                                     contenteditable="false"></div>
                            </td>
                        </tr>
                        <tr>
                            <td rowspan="1" colspan="1">
                                <div class="gongwen-head" style="height: 120px">正文</div>
                            </td>
                            <td rowspan="1" colspan="5">
                                <div class="gongwen-fujians gwzw" style="width: 830px">

                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td rowspan="2" colspan="1">
                                <div class="gongwen-head" style="height: 120px">附件</div>
                            </td>
                            <td rowspan="2" colspan="3">
                                <div class="gongwen-fujians gwfj" style="width: 540px">
                                    <div class="gongwen-fujian-item">
                                        <img src="<%=request.getContextPath()%>/resources/icon/fujian.png">
                                        <span id="d35ce3adbdb04736a62049d80282fafb.apk">d35ce3adbdb04736a62049d80282fafb.apk</span>
                                        <%--href用taskPath+名字代替--%>
                                        <%--<span class="downloadGongwen"><a href="http://localhost:8090/hzjsResource/tasks/d35ce3adbdb04736a62049d80282fafb.apk" download="3d17492df8454e92a0b056cd52962ed2.apk">下载</a></span>--%>
                                    </div>
                                </div>
                            </td>
                            <td rowspan="1" colspan="2">
                                <div class="center-gongwen">
                                    <div style="float:left;">处长核签：</div>
                                    <div style="float:left;padding: 0;height: auto;width: 200px" class="gongwen-input chuzhanghq"
                                         placeholder="请输入姓名" contenteditable="false"></div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td rowspan="1" colspan="2">
                                <div class="center-gongwen">
                                    <div style="float:left;">拟<span style="margin: 0 7px">稿</span>人：</div>
                                    <div style="float:left;padding: 0;height: auto;width: 200px" class="gongwen-input nigaor"
                                         placeholder="请输入姓名" contenteditable="false"></div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td rowspan="3" colspan="1">
                                <div class="gongwen-head" style="height: 220px">抄送机关</div>
                            </td>
                            <td rowspan="3" colspan="3">
                                <div class="gongwen-input chaosongjg" style="width: 540px" placeholder="请输入抄送机关"
                                     contenteditable="false"></div>
                            </td>
                            <td rowspan="1" colspan="2">
                                <div class="center-gongwen">
                                    <div style="float:left;">校<span style="margin-left: 28px">对</span>：</div>
                                    <div style="float:left;padding-left: 0;height: auto;width: 200px"
                                         class="gongwen-input jiaodui" placeholder="请输入姓名" contenteditable="false"></div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td rowspan="1" colspan="2">
                                <div class="center-gongwen">
                                    <div style="float:left;">共<span style="margin-left: 28px">印</span>：</div>
                                    <div style="float:left;padding:0;height: auto;width: 160px" class="gongwen-input gongyin"
                                         placeholder="请输入数字" contenteditable="false"></div>
                                    <div style="float:left;padding-left: 14px">份</div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td rowspan="1" colspan="2">
                                <div class="center-gongwen">
                                    <div style="float:left;">印发时间：</div>
                                    <div style="float:left;padding: 0;height: auto;width: 160px" class="gongwen-input yinfasj"
                                         placeholder="请选择时间" contenteditable="false"></div>
                                    <img style="padding-left: 14px"
                                         src="<%=request.getContextPath()%>/resources/icon/4-rili.png">
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td rowspan="1" colspan="6" style="">
                                <div style="float:left;padding: 16px 0 16px 14px;">主&nbsp;题&nbsp;词：</div>
                                <div style="float:left;padding-left: 0;width: 800px" class="gongwen-input zhutic"
                                     placeholder="请输入主题词" contenteditable="false"></div>
                            </td>
                        </tr>
                    </table>
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
<input id="labelFor" class="hidden">
</body>
<script src="<%=request.getContextPath()%>/resources/laydate/laydate.js"></script>
<script src="<%=request.getContextPath()%>/resources/js/util/bootstrap.min.js" type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/resources/ace/js/bootbox.js"></script>
<script src="<%=request.getContextPath()%>/resources/js/util/staticUrl.js" type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/resources/js/util/util-common.js" type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/resources/ace/js/dataTables/jquery.dataTables.js"></script>
<script src="<%=request.getContextPath()%>/resources/ace/js/dataTables/jquery.dataTables.bootstrap.js"></script>
<script src="<%=request.getContextPath()%>/resources/js/util/sweetalert.min.js"></script>
<script src="<%=request.getContextPath()%>/resources/js/officialdocument.js"></script>
<script>
	laydate.render({
		elem: "#yinfaTime",
		type: 'date',
		format: 'yyyy-MM-dd',
	});

	laydate.render({
		elem: "#gwcxTime",
		type: 'date',
		format: 'yyyy-MM-dd',
	});

</script>
</html>
