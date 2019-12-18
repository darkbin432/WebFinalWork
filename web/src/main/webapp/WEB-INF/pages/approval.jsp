<%--
  Created by IntelliJ IDEA.
  User: kzn
  Date: 2019-04-20
  Time: 10:34
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title></title>
    <link href="<%=request.getContextPath()%>/resources/css/bootstrap.min.css" rel="stylesheet" type="text/css">
    <link href="<%=request.getContextPath()%>/resources/ace/css/ace.css" class="ace-main-stylesheet" id="main-ace-style"
          rel="stylesheet" type="text/css"/>
    <link href="<%=request.getContextPath()%>/resources/ace/css/select2.css" rel="stylesheet">
    <link href="<%=request.getContextPath()%>/resources/ace/css/jquery-ui.css" rel="stylesheet">
    <link href="<%=request.getContextPath()%>/resources/css/common.css" rel="stylesheet" type="text/css">
    <link href="<%=request.getContextPath()%>/resources/css/approval.css" rel="stylesheet" type="text/css">
    <script src="<%=request.getContextPath()%>/resources/ace/js/jquery.js"></script>
    <script src="<%=request.getContextPath()%>/resources/ace/js/select2.js"></script>
    <script src="<%=request.getContextPath()%>/resources/ace/js/jquery-ui.js"></script>
    <script src="<%=request.getContextPath()%>/resources/js/validate.js"></script>
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
                <li><a class="selected-li">我的审批</a></li>
            </ul>
        </div>
        <div class="right">
            <div class="right-main">
                <div class="l-title">我的审批</div>
                <div class="s-title">我的审批/待审批</div>
                <div class="approval-tables">
                    <ul>
                        <li class="approval-table-selected-li">待审批</li>
                        <li>审批记录</li>
                    </ul>
                    <div class="line"></div>
                </div>
                <div class="approval-table ">
                    <div class="row">
                        <div class="col-lg-12">
                            <table id="approval-table" class="table table-striped table-bordered table-hover">
                                <thead>
                                <tr>
                                    <th>发起人</th>
                                    <th>主题</th>
                                    <th>申请日期</th>
                                    <th>操作</th>
                                </tr>
                                </thead>
                                <tbody></tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="approval-table hidden">
                    <div class="row">
                        <div class="col-lg-12">
                            <table id="shenpi-table" class="table table-striped table-bordered table-hover">
                                <thead>
                                <tr>
                                    <th>发起人</th>
                                    <th>主题</th>
                                    <th>审批日期</th>
                                    <th>结果</th>
                                </tr>
                                </thead>
                                <tbody></tbody>
                            </table>
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
<div class="popBox" id="approval-info" style="display: none">
    <div class="popBox-mask"></div>
    <div class="popBox-content">
        <div class="approval-info-title">
            申请信息
            <div><img src="<%=request.getContextPath()%>/resources/icon/guanbi(1).png"></div>
        </div>
        <div class="approval-info-content">
            <label><span style="margin-left: 1rem"></span>活动名称：<label id="aititle"></label></label>
            <label><span style="margin-left: 1rem"></span>可见区域：<label id="aiscope"></label></label>
            <label><span style="margin-left: 1rem"></span>活动地址：<label id="aiaddress"></label></label>
            <label><span style="margin-left: 1rem"></span>开始时间：<label id="aistartTime"></label></label>
            <label><span style="margin-left: 1rem"></span>结束时间：<label id="aiendTime"></label></label>
            <label><span style="margin-left: 1rem"></span>报名截止：<label id="aiendEnroll"></label></label>
            <label><span style="margin-left: 2rem"></span>负责人：<label id="aiheadmember"></label></label>
            <label><span style="margin-left: 1rem"></span>限制人数：<label id="aihuiyuanlimit"></label></label>
            <label>招募志愿者：<label id="aivolunteerlimit"></label></label>
            <label><span style="margin-left: 1rem"></span>活动简介：<div id="aidescription"></div></label>
        </div>
        <div class="pop-buttons">
            <button class="danger-button">拒绝</button>
            <button class="main-button">通过</button>
        </div>
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
<script src="<%=request.getContextPath()%>/resources/js/approval.js"></script>

</html>


