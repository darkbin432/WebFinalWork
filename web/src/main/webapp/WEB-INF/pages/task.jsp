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
        <%--- 青春健康--%>
        <%--- 分子类：青少年、家长、师资的培训，高校同伴教育--%>
        <%--- 计生家庭帮扶--%>
        <%--- 分子类：帮扶救助、心理援助--%>
        <div class="left">
            <ul>
                <li><a class="selected-li">宣传教育</a></li>
                <li>
                    <a>业务培训</a>
                </li>
                <li>
                    <a>健康服务</a>
                </li>
                <li>
                    <a>计生家庭帮扶<img src="<%=request.getContextPath()%>/resources/icon/fanhui1.png"></a>
                    <ul>
                        <li><a>帮扶救助</a></li>
                        <li><a>心理援助</a></li>
                    </ul>
                </li>
                <li>
                    <a>青春健康<img src="<%=request.getContextPath()%>/resources/icon/fanhui1.png"></a>
                    <ul>
                        <li><a>青少年</a></li>
                        <li><a>家长</a></li>
                        <li><a>师资的培训</a></li>
                        <li><a>高校同伴教育</a></li>
                    </ul>
                </li>
                <li>
                    <a>流动人口服务</a>
                </li>
                <li>
                    <a>权益维护</a>
                </li>
                <li>
                    <a>其他</a>
                </li>
                <li><a id="guidang">已归档</a></li>
            </ul>
        </div>
        <div class="right">
            <%--介绍--%>
            <div class="task-title">
                <div class="l-title">项目介绍</div>
                <div class="s-title">工作管理/宣传教育</div>
                <div class="introduce">通过宣传教育的传播，希望大家都能了解到相关知识，参加相对应的活动，有更一步的理解。</div>
            </div>
            <div class="right-main">
                <div id="query-title" class="query-title">查询条件</div>
                <div class="query-terms">
                    <label>
                        <select id="area-select" class="unit-select select-query-area "
                                data-searchplaceholder="--地区名称--">
                            <option></option>
                        </select>
                    </label>
                    <label>
                        <select id="street-select" class="unit-selectjiedao select-query-area"
                                data-searchplaceholder="--街道名称--">
                            <option></option>
                        </select>
                    </label>
                    <label>
                        <select id="shequ-select" class="unit-selectshequ select-query-area"
                                data-searchplaceholder="--社区名称--">
                            <option></option>
                        </select>
                    </label>
                </div>
                <div class="query-terms" style="margin-top: 16px">
                    <label>
                        <input id="activity-query-title" class="normal-input" placeholder="请输入活动名称">
                    </label>
                    <div>
                        <button id="query" class="main-button">查&nbsp;询</button>
                    </div>
                </div>
                <div class="task-buttons">
                    <button id="addActivity" class="main-button hidden"><img
                            src="<%=request.getContextPath()%>/resources/icon/jia-2.png">添加
                    </button>
                    <button id="activity-refrush" class="normal-button">刷&nbsp;新</button>
                    <%--<button class="normal-button">全部归档</button>--%>
                </div>
                <div class="task-table">
                    <div class="row">
                        <div class="col-lg-12">
                            <table id="item-table" class="table table-striped table-bordered table-hover">
                                <thead>
                                <tr>
                                    <th>序号</th>
                                    <th>活动名称</th>
                                    <th>活动地区</th>
                                    <th>活动地址</th>
                                    <th>启动日期</th>
                                    <th>操作</th>
                                </tr>
                                </thead>
                                <tbody></tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <%--添加 编辑共用   --%>
            <div class="right-main hidden">
                <div class="l-title"><img src="<%=request.getContextPath()%>/resources/icon/fanhui.png">添加活动</div>
                <div class="s-title">工作管理/宣传教育</div>
                <div class="addActivity">
                    <div>
                        <label for="labelFor"><span>*</span><span>活动名称：</span><input id="add-title"
                                                                                     class="normal-input"></label>
                        <label for="labelFor"><span style="margin-left: 1rem">*</span><span>可见区域：</span>
                            <span id="add-search-area" class="normal-input">
                                <span>
                                </span>
                                <%--添加--%>
                                <img src="<%=request.getContextPath()%>/resources/icon/3-tianjiahuodong.png">
                                <%--编辑--%>
                                <%--<a>修改</a>--%>
                            </span>
                        </label>
                    </div>
                    <div>
                        <label style="visibility: hidden">请输入活动名称</label>
                        <label style="visibility: hidden">请选择可见区域</label>
                    </div>
                    <div>
                        <label for="labelFor"><span>*</span><span>开始日期：</span><input id="startDate" class="normal-input"
                                                                                     placeholder="开始日期"></label>
                        <label for="labelFor"><span style="margin-left: 1rem">*</span><span>活动地址：</span><input
                                id="add-activityArea"
                                class="normal-input"></label>
                    </div>
                    <div>
                        <label style="visibility: hidden">请选择活动开始日期</label>
                        <label style="visibility: hidden">请输入活动地址</label>
                    </div>
                    <div>
                        <label for="labelFor"><span>*</span><span>结束日期：</span><input id="activityTime"
                                                                                     class="normal-input"
                                                                                     placeholder="结束日期"></label>
                        <label for="labelFor"><span style="margin-left: 2rem">*</span><span>负责人：</span>
                            <select id="select-member" class="addFZR">
                                <option>请选择负责人</option>
                                <option>asd</option>
                                <option>asd</option>
                            </select>
                        </label>
                    </div>
                    <div>
                        <label style="visibility: hidden">请选择活动结束日期</label>
                        <label style="visibility: hidden">请选择负责人</label>
                    </div>
                    <div>
                        <label for="labelFor"><span>*</span><span>截止报名：</span><input placeholder="截止日期"
                                                                                     id="add-end-enroll"
                                                                                     class="normal-input"></label>
                        <label for="radio2"><span>*</span><span>招募志愿者：</span>
                            <label class="radio-label">
                                <input id="isRecruit2" value="1" type="radio" name="isRecruit">
                                <label for="isRecruit2">
                                    <span></span>
                                </label>
                                <span>是</span>
                            </label>
                            <label class="radio-label">
                                <input id="isRecruit1" value="0" type="radio" name="isRecruit">
                                <label for="isRecruit1">
                                    <span></span>
                                </label>
                                <span>否</span>
                            </label>
                            <input id="radio2" class="hidden">
                        </label>
                    </div>
                    <div>

                        <label style="visibility: hidden">请选择截止报名日期</label>

                        <label style="visibility: hidden">请选择是否招募志愿者</label>
                    </div>
                    <div>
                        <label for="labelFor"><span>*</span><span>限制人数：</span><input id="add-numberLimit"
                                                                                     class="normal-input"></label>

                    </div>
                    <div>
                        <label style="visibility: hidden">请输入限制人数</label>
                    </div>
                    <div>
                        <label for="labelFor"><span style="visibility: hidden">*</span><span>活动简介：</span>
                            <div id="writeSynopsis"></div>
                        </label>
                    </div>
                    <div>
                        <label><span style="visibility: hidden">*</span><span>活动图片：</span>
                            <div id="uploadImgsadd">
                                <div><img src="<%=request.getContextPath()%>/resources/icon/tianjiakaobei2.png"></div>
                                <div><span>上传（只需一张）</span></div>
                                <div><span>jpg png</span></div>
                            </div>
                            <div>
                                <div class="mask hidden"></div>
                                <%--<img src="<%=request.getContextPath()%>/resources/icon/area.png">--%>
                                <div class="delete hidden"><img
                                        src="<%=request.getContextPath()%>/resources/icon/shanchu.png">&nbsp;删除
                                </div>
                                <input class="hidden" value="">
                            </div>
                        </label>
                        <input class="hidden uploadImgsadd" type="file" accept="image/png,image/jpeg,image/gif">
                    </div>
                    <div>
                        <button id="add-button" class="main-button">提&nbsp;交</button>
                    </div>
                </div>
            </div>
            <%--管理活动--%>
            <div id="edit" class="right-main hidden">
                <div class="l-title"><img src="<%=request.getContextPath()%>/resources/icon/fanhui.png">编辑活动</div>
                <div class="s-title">工作管理/宣传教育</div>
                <div class="line"></div>
                <div class="top-buttons">
                    <div class="current-top-div">基本信息</div>
                    <div>报名情况</div>
                    <div>活动总结</div>
                </div>
                <%--基本信息--%>
                <div class="editActivity addActivity ">
                    <div>
                        <label for="labelFor"><span>*</span><span>活动名称：</span><input id="edit-title"
                                                                                     class="normal-input"></label>
                        <label><span style="margin-left: 1rem">*</span><span>可见区域：</span>
                            <span id="edit-search-area" class="normal-input">
                                <span id="edit-area">
                                </span>
                                <a>修改</a>
                            </span>

                        </label>
                    </div>
                    <div>
                        <label style="visibility: hidden">请输入活动名称</label>
                        <label style="visibility: hidden">请选择可见区域</label>
                    </div>
                    <div>
                        <label for="labelFor"><span>*</span><span>开始日期：</span><input id="startDate1"
                                                                                     class="normal-input"
                                                                                     placeholder="开始日期"></label>
                        <label for="labelFor"><span style="margin-left: 1rem">*</span><span>活动地址：</span><input
                                id="edit-activityArea"
                                class="normal-input"></label>
                    </div>
                    <div>
                        <label style="visibility: hidden">请选择活动开始日期</label>
                        <label style="visibility: hidden">请输入活动地址</label>
                    </div>
                    <div>
                        <label for="labelFor"><span>*</span><span>结束日期：</span><input id="activityTime1"
                                                                                     class="normal-input"
                                                                                     placeholder="结束日期"></label>
                        <label for="labelFor"><span style="margin-left: 2rem">*</span><span>负责人：</span>
                            <select class="editFZR" data-placeholder="请选择负责人">
                                <option></option>
                                <option>asd</option>
                                <option>asd</option>
                            </select>
                        </label>
                    </div>
                    <div>
                        <label style="visibility: hidden">请选择活动结束日期</label>
                        <label style="visibility: hidden">请选择负责人</label>
                    </div>
                    <div>
                        <label for="labelFor"><span>*</span><span>截止报名：</span><input placeholder="截止日期"
                                                                                     id="edit-end-enroll"
                                                                                     class="normal-input"></label>
                        <label for="radio1"><span>*</span><span>招募志愿者：</span>
                            <label class="radio-label">
                                <input id="isRecruit3" value="1" type="radio" name="isRecruit">
                                <label for="isRecruit3">
                                    <span></span>
                                </label>
                                <span>是</span>
                            </label>
                            <label class="radio-label">
                                <input id="isRecruit4" value="0" type="radio" name="isRecruit">
                                <label for="isRecruit4">
                                    <span></span>
                                </label>
                                <span>否</span>
                            </label>
                            <input class="hidden" id="radio1">
                        </label>
                    </div>
                    <div>
                        <label style="visibility: hidden">请选择截止报名日期</label>
                        <label style="visibility: hidden">请选择是否招募志愿者</label>
                    </div>
                    <div>
                        <label for="labelFor"><span>*</span><span>限制人数：</span><input id="edit-number-limit"
                                                                                     class="normal-input"></label>
                    </div>
                    <div>
                        <label style="visibility: hidden">请输入限制人数</label>
                    </div>
                    <div>
                        <label for="labelFor"><span style="visibility: hidden">*</span><span>活动简介：</span>
                            <div id="editSynopsis"></div>
                        </label>
                    </div>
                    <div>
                        <label><span style="visibility: hidden">*</span><span>活动图片：</span>
                            <div id="uploadImgsedit">
                                <div><img src="<%=request.getContextPath()%>/resources/icon/tianjiakaobei2.png"></div>
                                <div><span>上传（只需一张）</span></div>
                                <div><span>jpg png</span></div>
                            </div>
                            <div>
                                <div class="mask hidden"></div>
                                <%--<img src="<%=request.getContextPath()%>/resources/icon/area.png">--%>
                                <div class="delete hidden"><img
                                        src="<%=request.getContextPath()%>/resources/icon/shanchu.png">&nbsp;删除
                                </div>
                                <input class="hidden" value="">
                            </div>
                        </label>
                        <input class="hidden uploadImgsedit" type="file" accept="image/png,image/jpeg">
                    </div>
                    <div>
                        <button class="danger-button">删除活动</button>
                        <button id="edit-button" class="main-button">提&nbsp;交</button>
                    </div>

                </div>
                <%--报名情况--%>
                <div id="special-activity-edit" class="situation hidden">
                    <div class="situation-tables">
                        <ul>
                            <li>会员报名</li>
                            <li class="situation-table-selected-li">志愿者申请</li>
                        </ul>
                        <div class="line"></div>
                    </div>
                    <div class="task-table">
                        <div class="row">
                            <div class="col-lg-12">
                                <table id="volunteer-table" class="table table-striped table-bordered table-hover">
                                    <thead>
                                    <tr>
                                        <th>序号</th>
                                        <th>姓名</th>
                                        <th>电话</th>
                                        <th>身份证</th>
                                        <th>审批</th>
                                    </tr>
                                    </thead>
                                    <tbody></tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <%--活动总结--%>
                <div id="edit-summary-img" class="summarize hidden">
                    <div id="uploadImgs">
                        <div><img src="<%=request.getContextPath()%>/resources/icon/tianjiakaobei2.png"></div>
                        <div><span>上传图片</span></div>
                        <div><span>jpg png</span></div>
                    </div>
                    <input class="hidden" type="file" accept="image/png,image/jpeg">
                </div>
                <div class="query-title hidden">总结描述</div>
                <div class="describe hidden">
                    <div id="describe"></div>
                </div>
                <div class="bottom-buttons hidden">
                    <button id="edit-button2" class="main-button">保&nbsp;存</button>
                </div>
                <input name="id" hidden value="">
            </div>
            <%--已归档 如果可以和介绍共用--%>
            <div class="task-title hidden">
                <div class="l-title">已归档</div>
                <div class="s-title">归档列表/选择还原</div>
                <div class="introduce">通过对归档项目的整理，可根据需要进行选择性的查看、还原与删除</div>
            </div>
            <div class="right-main hidden">
                <div class="query-title">查询条件</div>
                <div class="query-terms">
                    <label>
                        <select id="area-select-gd" class="unit-select select-query-area "
                                data-searchplaceholder="--地区名称--">
                            <option></option>
                        </select>
                    </label>
                    <label>
                        <select id="street-select-gd" class="unit-selectjiedao select-query-area"
                                data-searchplaceholder="--街道名称--">
                            <option></option>
                        </select>
                    </label>
                    <label>
                        <select id="shequ-select-gd" class="unit-selectshequ select-query-area"
                                data-searchplaceholder="--社区名称--">
                            <option></option>
                        </select>
                    </label>
                </div>
                <div class="query-terms" style="margin-top: 16px">
                    <label>
                        <input id="guidang-select-title" class="normal-input" placeholder="请输入活动名称">
                    </label>
                    <div>
                        <button id="guidang-query" class="main-button">查&nbsp;询</button>
                    </div>
                </div>
                <div class="guidang-buttons">
                    <button class="all-reduction main-button"><img
                            src="<%=request.getContextPath()%>/resources/icon/14-huanyuan.png">全部还原
                    </button>
                    <button id="guidang-refush" class="normal-button">刷&nbsp;新</button>
                </div>
                <div class="task-table">
                    <div class="row">
                        <div class="col-lg-12">
                            <table id="guidang-table" class="table table-striped table-bordered table-hover">
                                <thead>
                                <tr>
                                    <th>序号</th>
                                    <th>活动名称</th>
                                    <th>活动地区</th>
                                    <th>活动地址</th>
                                    <th>启动日期</th>
                                    <th>操作</th>
                                </tr>
                                </thead>
                                <tbody></tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <%--详情--%>
            <div id="check" class="right-main hidden">
                <div class="l-title"><img src="<%=request.getContextPath()%>/resources/icon/fanhui.png">查看活动</div>
                <div class="s-title">工作管理/宣传教育</div>
                <div id="read-title" class="large-title">温暖人间</div>
                <div class="details">
                    <div>
                        <label><span>*</span><span>活动日期：</span><span id="startTime"></span></label>
                        <label id="read-huiyuanCount"><span>*</span><span>报名人数：</span><span></span></label>
                        <label id="read-headmember"><span style="margin-left: 1rem">*</span><span></span><span><img
                                src="<%=request.getContextPath()%>/resources/icon/chengyuan2.png"></span></label>
                    </div>
                    <div>
                        <label><span>*</span><span>活动时间：</span><span id="endTime"></span></label>
                        <label id="read-activityArea"><span>*</span><span>活动地址：</span><span></span></label>
                        <label><span>*</span><span>报名截止：</span><span id="end-enroll"></span></label>
                    </div>
                </div>
                <div class="query-title">活动简介<a class="download-jianjie-img">封面下载</a></div>
                <div id="read-description-image" class="zongjie-imgs">
                    <%--<div></div>--%>
                </div>
                <div id="read-description" class="jianjie"></div>
                <div class="query-title">活动总结<a class="download-zongjie-img">图片下载</a></div>
                <div id="read-zongjie-img" class="zongjie-imgs"></div>
                <div id="read-summary" class="zongjie"></div>
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
<div class="popBox" id="selectArea" style="display: none">
    <div class="popBox-mask"></div>
    <div class="popBox-content">
        <div class="selectRecipients-title">
            选择可见区域
            <div><img src="<%=request.getContextPath()%>/resources/icon/guanbi(1).png"></div>
        </div>
        <div class="search">
            <div>
                <span>可见区域：</span>
                <span id="visibility-region">

                </span>
            </div>
        </div>
        <div class="search-member">

        </div>
        <div id="select-area" class="pop-buttons">
            <button class="normal-button">取消</button>
            <button class="main-button">确认</button>
        </div>
    </div>
</div>
</body>
<script src="<%=request.getContextPath()%>/resources/laydate/laydate.js"></script>
<script src="<%=request.getContextPath()%>/resources/js/util/bootstrap.min.js" type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/resources/ace/js/bootbox.js"></script>
<script src="<%=request.getContextPath()%>/resources/js/util/staticUrl.js" type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/resources/js/util/util-common.js" type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/resources/ace/js/dataTables/jquery.dataTables.js"></script>
<script src="<%=request.getContextPath()%>/resources/ace/js/dataTables/jquery.dataTables.bootstrap.js"></script>
<script src="<%=request.getContextPath()%>/resources/js/util/sweetalert.min.js"></script>
<script src="<%=request.getContextPath()%>/resources/js/task.js"></script>
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
	laydate.render({
		elem: "#startDate",
		type: 'datetime',
		format: 'yyyy-MM-dd HH:mm',
		done: function (value, date, endDate) {
			if (value === "") {
				$("#startDate").addClass("danger-input");
				$("#startDate").parent().parent().next().children("label:nth-child(1)").css("visibility", "visible");
			} else {
				$("#startDate").removeClass("danger-input");
				$("#startDate").parent().parent().next().children("label:nth-child(1)").css("visibility", "hidden");
			}
		}
	});
	laydate.render({
		elem: "#activityTime",
		type: 'datetime',
		format: 'yyyy-MM-dd HH:mm',
		done: function (value, date, endDate) {
			if (value === "") {
				$("#activityTime").addClass("danger-input");
				$("#activityTime").parent().parent().next().children("label:nth-child(1)").css("visibility", "visible");
			} else {
				$("#activityTime").removeClass("danger-input");
				$("#activityTime").parent().parent().next().children("label:nth-child(1)").css("visibility", "hidden");
			}
		}
	});
	laydate.render({
		elem: "#startDate1",
		type: 'datetime',
		format: 'yyyy-MM-dd HH:mm',
		done: function (value, date, endDate) {
			if (value === "") {
				$("#startDate1").addClass("danger-input");
				$("#startDate1").parent().parent().next().children("label:nth-child(1)").css("visibility", "visible");
			} else {
				$("#startDate1").removeClass("danger-input");
				$("#startDate1").parent().parent().next().children("label:nth-child(1)").css("visibility", "hidden");
			}
		}
	});
	laydate.render({
		elem: "#activityTime1",
		type: 'datetime',
		format: 'yyyy-MM-dd HH:mm',
		done: function (value, date, endDate) {
			if (value === "") {
				$("#activityTime1").addClass("danger-input");
				$("#activityTime1").parent().parent().next().children("label:nth-child(1)").css("visibility", "visible");
			} else {
				$("#activityTime1").removeClass("danger-input");
				$("#activityTime1").parent().parent().next().children("label:nth-child(1)").css("visibility", "hidden");
			}
		}
	});
	laydate.render({
		elem: "#edit-end-enroll",
		type: 'datetime',
		format: 'yyyy-MM-dd HH:mm',
		done: function (value, date, endDate) {
			if (value === "") {
				$("#edit-end-enroll").addClass("danger-input");
				$("#edit-end-enroll").parent().parent().next().children("label:nth-child(1)").css("visibility", "visible");
			} else {
				$("#edit-end-enroll").removeClass("danger-input");
				$("#edit-end-enroll").parent().parent().next().children("label:nth-child(1)").css("visibility", "hidden");
			}
		}
	});
	laydate.render({
		elem: "#add-end-enroll",
		type: 'datetime',
		format: 'yyyy-MM-dd HH:mm',
		done: function (value, date, endDate) {
			if (value === "") {
				$("#add-end-enroll").addClass("danger-input");
				$("#add-end-enroll").parent().parent().next().children("label:nth-child(1)").css("visibility", "visible");
			} else {
				$("#add-end-enroll").removeClass("danger-input");
				$("#add-end-enroll").parent().parent().next().children("label:nth-child(1)").css("visibility", "hidden");
			}
		}
	});
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

	var writeSynopsis = new E('writeSynopsis');
	writeSynopsis.create()
	var editSynopsis = new E('editSynopsis');
	editSynopsis.create()
	var describe = new E('describe');
	describe.create()
</script>
</html>
