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
    <link href="<%=request.getContextPath()%>/resources/ace/css/ace.css" class="ace-main-stylesheet" id="main-ace-style"
          rel="stylesheet" type="text/css"/>
    <link href="<%=request.getContextPath()%>/resources/ace/css/select2.css" rel="stylesheet">
    <link href="<%=request.getContextPath()%>/resources/ace/css/jquery-ui.css" rel="stylesheet">
    <link href="<%=request.getContextPath()%>/resources/css/common.css" rel="stylesheet" type="text/css">
    <link href="<%=request.getContextPath()%>/resources/css/huiyuan.css" rel="stylesheet" type="text/css">
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
                <li><a class="selected-li">会员列表</a></li>
                <li><a>志愿者管理</a></li>
            </ul>
        </div>
        <div class="right">
            <%--列表--%>
            <div class="right-main ">
                <div class="l-title">会员列表</div>
                <div class="s-title">会员管理/会员列表</div>
                <div class="line"></div>
                <div class="query-title">查询条件</div>
                <div class="query-terms">
                    <label>
                        <select class="area-select" data-searchplaceholder="--地区名称--">
                            <option value="0">请选择查询区域</option>
                        </select>
                    </label>
                    <label>
                        <select class="street-select" data-searchplaceholder="--街道名称--">
                            <option value="0"></option>
                        </select>
                    </label>
                    <label>
                        <select class="shequ-select" data-searchplaceholder="--社区名称--">
                            <option value="0"></option>
                        </select>
                    </label>
                    <div class="wrap-div"></div>
                    <label>
                        <input class="normal-input" placeholder="请输入会员姓名">
                    </label>
                    <div class="queryConfirm">
                        <span style="float: left;">是否为志愿者</span>
                        <label class="radio-label">
                            <input id="isVolunteer1" type="radio" name="isVolunteer" value="1">
                            <label for="isVolunteer1">
                                <span></span>
                            </label>
                            <span>是</span>
                        </label>
                        <label class="radio-label">
                            <input id="isVolunteer2" type="radio" name="isVolunteer" value="0">
                            <label for="isVolunteer2">
                                <span></span>
                            </label>
                            <span>否</span>
                        </label>
                        <label class="radio-label">
                            <input id="isVolunteerall" type="radio" name="isVolunteer" value="">
                            <label for="isVolunteerall">
                                <span></span>
                            </label>
                            <span>全部</span>
                        </label>
                        <button class="main-button">查&nbsp;询</button>
                    </div>
                    <div class="high-search">高级搜索</div>
                    <div class="search hidden">
                        <div class="arrow"></div>
                        <div class="search-content">
                            <div id="birthday-search">
                                <span>会员生日：</span>
                                <button class="buxian search-select-button" value="0">不限</button>
                                <button value="1">近三日</button>
                                <button value="2">近七日</button>
                                <button value="3">近一月</button>
                            </div>
                            <div id="medical-search">
                                <span>会员就诊：</span>
                                <button class="buxian search-select-button" value="0">不限</button>
                                <button value="1">近三日</button>
                                <button value="2">近七日</button>
                                <button value="3">近一月</button>
                            </div>
                            <div>
                                <button class="main-button high">确认</button>
                                <button class="normal-button high">取消</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="huiyuan-buttons">
                    <button class="main-button hidden"><img src="<%=request.getContextPath()%>/resources/icon/jia-2.png">添加
                    </button>
                    <button class="normal-button">刷&nbsp;新</button>
                </div>
                <div class="huiyuan-table ">
                    <div class="row">
                        <div class="col-lg-12">
                            <table id="huiyuan-table" class="table table-striped table-bordered table-hover">
                                <thead>
                                <tr>
                                    <th>序号</th>
                                    <th>姓名</th>
                                    <th id="xb-sfzh">性别</th>
                                    <th id="sfzh-jzyy">身份证号</th>
                                    <th id="szqy-jzsj">所在区域</th>
                                    <th>联系电话</th>
                                    <th>操作</th>
                                </tr>
                                </thead>
                                <tbody></tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <%--审批--%>
            <div class="right-main hidden">
                <div class="l-title">志愿者管理</div>
                <div class="s-title">会员管理/志愿者管理</div>
                <div class="volunteer-tables hidden">
                    <ul>
                        <li class="huiyuan-table-selected-li">待审批</li>
                        <li>审批记录</li>
                    </ul>
                    <div class="line"></div>
                </div>
                <div class="line"></div>
                <div class="query-title">查询条件</div>
                <div class="query-terms">
                    <label>
                        <select class="volunteer-area-select" data-searchplaceholder="--地区名称--">
                            <option value="0">请选择查询区域</option>
                        </select>
                    </label>
                    <label>
                        <select class="volunteer-street-select" data-searchplaceholder="--街道名称--">
                            <option value="0"></option>
                        </select>
                    </label>
                    <label>
                        <select class="volunteer-shequ-select" data-searchplaceholder="--社区名称--">
                            <option value="0"></option>
                        </select>
                    </label>
                    <div class="wrap-div"></div>
                    <label>
                        <input class="normal-input" placeholder="请输入会员姓名">
                    </label>
                    <div class="queryConfirm">
                        <button class="main-button">查&nbsp;询</button>
                    </div>
                </div>
                <div class="huiyuan-table">
                    <div class="row">
                        <div class="col-lg-12">
                            <table id="volunteer-table" class="table table-striped table-bordered table-hover">
                                <thead>
                                <tr>
                                    <th>序号</th>
                                    <th>姓名</th>
                                    <th>性别</th>
                                    <th>联系电话</th>
                                    <th>身份证号</th>
                                    <th>所在区域</th>
                                </tr>
                                </thead>
                                <tbody></tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="huiyuan-table hidden">
                    <div class="row">
                        <div class="col-lg-12">
                            <table id="shenpi-table" class="table table-striped table-bordered table-hover">
                                <thead>
                                <tr>
                                    <th>序号</th>
                                    <th>姓名</th>
                                    <th>申请日期</th>
                                    <th>审批日期</th>
                                    <th>电话</th>
                                    <th>身份证</th>
                                    <th>结果</th>
                                </tr>
                                </thead>
                                <tbody></tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <%--添加编辑--%>
            <div class="right-main hidden">
                <div class="l-title"><img src="<%=request.getContextPath()%>/resources/icon/fanhui.png">编辑会员</div>
                <div class="s-title">会员管理/编辑会员</div>
                <div class="huiyuan-main">
                    <%--有头像--%>
                    <div class="hidden"></div>
                    <%--无头像--%>
                    <div class="head">
                        <label class="hidden"><input></label>
                        <label class="hidden"><input type="file" accept="image/png,image/jpeg"></label>
                        <div class="headimg" name="">
                            <img src="<%=request.getContextPath()%>/resources/icon/head.png">
                        </div>
                        <div class="uploadHead">上传</div>
                    </div>
                    <div>
                        <label><span>*</span>会员姓名：<input class="normal-input huiyuanName"></label>
                        <label class="tip">请输入会员姓名</label>
                        <label><span>*</span>会员性别：
                            <input class="hidden">
                            <div>
                                <label class="radio-label">
                                    <input id="isMan1" value="1" type="radio" name="isMan">
                                    <label for="isMan1">
                                        <span></span>
                                    </label>
                                    <span>男</span>
                                </label>
                                <label class="radio-label">
                                    <input id="isMan2" value="0" type="radio" name="isMan">
                                    <label for="isMan2">
                                        <span></span>
                                    </label>
                                    <span>女</span>
                                </label>
                            </div>
                        </label>
                        <label class="tip">请选择会员性别</label>
                        <label><span>*</span>联系电话：<input class="normal-input huiyuanPhone"></label>
                        <label class="tip">请输入联系电话</label>
                        <label><span>*</span>身份证号：<input class="normal-input huiyuanCardNo"></label>
                        <label class="tip">请输入身份证号</label>
                        <label><span style="visibility: hidden">*</span>现居地址：<input class="normal-input huiyuanAddress"></label>
                        <label class="tip">请输入现居地址</label>
                        <label><span>*</span>所在地区：<select class="location-qu"></select></label>
                        <label class="tip">请选择所在地区</label>
                        <label><span style="visibility: hidden">*</span><span style="visibility: hidden">所在地区：</span><select class="location-jiedao"></select></label>
                        <label class="tip">请选择所在地区</label>
                        <label><span style="visibility: hidden">*</span><span style="visibility: hidden">所在地区：</span><select class="location-shequ"></select></label>
                        <label class="tip">请选择所在地区</label>
                        <label><span>*</span>政治面貌：<select class="political">
                            <option value="0">群众</option>
                            <option value="1">党员</option>
                        </select></label>
                        <label class="tip">请选择政治面貌</label>
                        <label><span>*</span>会员结构：<select class="huiyuanType">
                            <option value="0">个体会员</option>
                            <option value="1">团体会员</option>
                            <option value="2">流动人口</option>
                            <option value="3">常住人口</option>
                        </select></label>
                        <label class="tip">请选择会员结构</label>
                        <label><span style="visibility: hidden">*</span>服务对象：<select class="serviceType">
                            <option value="0">失独人群</option>
                            <option value="1">育龄家庭</option>
                            <option value="2">青少年</option>
                        </select></label>
                        <label class="tip">请选择服务对象</label>
                    </div>
                </div>
                <div class="huiyuan-main-buttons">
                    <button class="normal-button">取消</button>
                    <button class="main-button">确认</button>
                </div>
            </div>
            <%--详情--%>
            <div class="right-main hidden">
                <div class="l-title"><img src="<%=request.getContextPath()%>/resources/icon/fanhui.png">会员信息</div>
                <div class="s-title">会员管理/会员信息</div>
                <div class="huiyuan-main ">
                    <%--有头像--%>
                    <div class="hidden"></div>
                    <%--无头像--%>
                    <div class="head">
                        <label class="hidden"><input></label>
                        <label class="hidden"><input type="file" accept="image/png,image/jpeg"></label>
                        <div class="headimg">
                            <img src="<%=request.getContextPath()%>/resources/icon/head.png">
                        </div>
                    </div>
                    <div class="huiyuan-infos">
                        <div>
                            <label>姓<span>名</span>：<label id="readname"></label></label>
                            <label>政治面貌：<label id="readpolitical"></label></label>
                            <label>现居地址：<label id="readaddress"></label></label>
                        </div>
                        <div>
                            <label>性<span>别</span>：<label id="readsex"></label></label>
                            <label>所在地区：<label id="readscope"></label></label>
                        </div>
                        <div>
                            <label>电<span>话</span>：<label id="readmobile"></label></label>
                            <label>会员结构：<label id="readtype"></label></label>
                        </div>
                        <div>
                            <label>身<span>份</span>证：<label id="readcardNo"></label></label>
                            <label>服务对象：
                                <label id="readservice">
                                </label>
                            </label>
                        </div>
                    </div>
                </div>
                <div class="huiyuan-tables">
                    <ul>
                        <li class="huiyuan-table-selected-li">活动记录</li>
                        <li>志愿者活动记录</li>
                    </ul>
                    <div class="line"></div>
                    <div class="huiyuan-table ">
                        <div class="row">
                            <div class="col-lg-12">
                                <table id="huiyuan-info-table" class="table table-striped table-bordered table-hover">
                                    <thead>
                                    <tr>
                                        <th>序号</th>
                                        <th>活动名称</th>
                                        <th>活动地区</th>
                                        <th>活动时间</th>
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
    </div>
    <div class="myContent loading">
        <div id="loading">
            <img src="<%=request.getContextPath()%>/resources/icon/loading.gif">
        </div>
    </div>
</div>
<div class="popBox" id="volunteer-info" style="display: none">
    <div class="popBox-mask"></div>
    <div class="popBox-content">
        <div class="volunteer-info-title">
            基本信息
            <div><img src="<%=request.getContextPath()%>/resources/icon/guanbi(1).png"></div>
        </div>
        <div class="volunteer-info-content">
            <label>姓<span>名</span>：<label id="viname"></label></label>
            <label>性<span>别</span>：<label id="visex"></label></label>
            <label>电<span>话</span>：<label id="vimobile"></label></label>
            <label>身份证：<label id="vicardNo"></label></label>
            <%--<label>日<span>期</span>：<label id="viapplyTime"></label></label>--%>
            <label>地<span>区</span>：<label id="viscope"></label></label>
            <label>感兴趣：<label id="viserviceType"></label></label>
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
<script src="<%=request.getContextPath()%>/resources/js/huiyuan.js"></script>

</html>

