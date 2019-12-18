<%--
  Created by IntelliJ IDEA.
  User： kzn
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
    <link href="<%=request.getContextPath()%>/resources/ace/css/ace.css" class="ace-main-stylesheet" id="main-ace-style" rel="stylesheet" type="text/css"/>
    <link href="<%=request.getContextPath()%>/resources/ace/css/select2.css" rel="stylesheet">
    <link href="<%=request.getContextPath()%>/resources/ace/css/jquery-ui.css" rel="stylesheet">
    <link href="<%=request.getContextPath()%>/resources/css/common.css" rel="stylesheet" type="text/css">
    <link href="<%=request.getContextPath()%>/resources/css/member.css" rel="stylesheet" type="text/css">
    <script src="<%=request.getContextPath()%>/resources/ace/js/jquery.js"></script>
    <script src="<%=request.getContextPath()%>/resources/ace/js/select2.js"></script>
    <script src="<%=request.getContextPath()%>/resources/ace/js/jquery-ui.js"></script>
    <script src="<%=request.getContextPath()%>/resources/js/validate.js"></script>
    <script src="<%=request.getContextPath()%>/resources/js/member.js"></script>
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
<div class="mask"></div>
<div class="myContainer">
    <div class="myContent hidden">
        <div class="left">
            <ul>
                <li id="main">
                    <a>
                        <%--<img src="<%=request.getContextPath()%>/resources/icon/xuanzhong.png">--%>
                        <img src="<%=request.getContextPath()%>/resources/icon/iconse.png">
                        <img src="<%=request.getContextPath()%>/resources/icon/zuocechouti.png">
                        杭州市计生协
                    </a>
                    <%--<ul>--%>
                        <%--<li>--%>
                            <%--<a>--%>
                                <%--<img src="<%=request.getContextPath()%>/resources/icon/iconse.png">--%>
                                <%--<img src="<%=request.getContextPath()%>/resources/icon/wenjian.png">--%>
                                <%--上城区计生协--%>
                            <%--</a>--%>
                            <%--<ul>--%>
                                <%--<li>--%>
                                    <%--<a>--%>
                                        <%--<img src="<%=request.getContextPath()%>/resources/icon/iconse.png">--%>
                                        <%--<img src="<%=request.getContextPath()%>/resources/icon/wenjian.png">--%>
                                        <%--湖滨街道--%>
                                    <%--</a>--%>
                                    <%--<ul>--%>
                                        <%--<li>--%>
                                            <%--<a class="selected-li">某某社区</a>--%>
                                            <%--<a>某某社区</a>--%>
                                            <%--<a>某某社区</a>--%>
                                            <%--<a>某某社区</a>--%>
                                            <%--<a>某某社区</a>--%>
                                        <%--</li>--%>
                                    <%--</ul>--%>
                                <%--</li>--%>
                            <%--</ul>--%>
                        <%--</li>--%>
                        <%--<li>--%>
                            <%--<a>--%>
                                <%--<img src="<%=request.getContextPath()%>/resources/icon/iconse.png">--%>
                                <%--<img src="<%=request.getContextPath()%>/resources/icon/wenjian.png">--%>
                                <%--上城区计生协--%>
                            <%--</a>--%>
                            <%--<ul>--%>
                                <%--<li>--%>
                                    <%--<a>--%>
                                        <%--<img src="<%=request.getContextPath()%>/resources/icon/iconse.png">--%>
                                        <%--<img src="<%=request.getContextPath()%>/resources/icon/wenjian.png">--%>
                                        <%--湖滨街道--%>
                                    <%--</a>--%>
                                    <%--<ul>--%>
                                        <%--<li>--%>
                                            <%--<a>某某社区</a>--%>
                                            <%--<a>某某社区</a>--%>
                                            <%--<a>某某社区</a>--%>
                                            <%--<a>某某社区</a>--%>
                                            <%--<a>某某社区</a>--%>
                                        <%--</li>--%>
                                    <%--</ul>--%>
                                <%--</li>--%>
                            <%--</ul>--%>
                        <%--</li>--%>
                        <%--<li>--%>
                            <%--<a>--%>
                                <%--<img src="<%=request.getContextPath()%>/resources/icon/iconse.png">--%>
                                <%--<img src="<%=request.getContextPath()%>/resources/icon/wenjian.png">--%>
                                <%--上城区计生协--%>
                            <%--</a>--%>
                            <%--<ul>--%>
                                <%--<li>--%>
                                    <%--<a>--%>
                                        <%--<img src="<%=request.getContextPath()%>/resources/icon/iconse.png">--%>
                                        <%--<img src="<%=request.getContextPath()%>/resources/icon/wenjian.png">--%>
                                        <%--湖滨街道--%>
                                    <%--</a>--%>
                                    <%--<ul>--%>
                                        <%--<li>--%>
                                            <%--<a>某某社区</a>--%>
                                            <%--<a>某某社区</a>--%>
                                            <%--<a>某某社区</a>--%>
                                            <%--<a>某某社区</a>--%>
                                            <%--<a>某某社区</a>--%>
                                        <%--</li>--%>
                                    <%--</ul>--%>
                                <%--</li>--%>
                            <%--</ul>--%>
                        <%--</li>--%>
                    <%--</ul>--%>
                </li>

            </ul>
        </div>
        <div class="right">
            <div class="organization-info">
                <div class="organization-title">
                    <div class="organization-info-title">某某社区</div>
                    <button id="edit-info" class="normal-button power hidden">编辑</button>
                    <input id="search" placeholder="搜索" contenteditable="true" class="normal-input">
                    <img id="searchButton" src="<%=request.getContextPath()%>/resources/icon/search.png">
                </div>
                <div id="name">上城区计生协会/湖滨街道/某某社区</div>
                <div class="organization-infos">
                    <label>
                        联系电话：13666666666
                    </label>
                    <label>
                        值班电话：87028147
                    </label>
                    <label>
                        邮政编码：310009
                    </label>
                    <label>
                        传真：87028147
                    </label>
                </div>
                <label>
                    地址：华藏寺巷21幢西单元
                </label>
            </div>
            <div class="organization-detail">
                <div class="member-title detail-title"><img src="<%=request.getContextPath()%>/resources/icon/chengyuan.png">部门成员</div>
                <div class="detail-buttons">
                    <button id="" class="main-button power hidden">添加成员</button>
                    <button class="normal-button power hidden">调整排序</button>
                    <button class="danger-button deleteMany power hidden">批量删除</button>
                </div>
                <div id="members">
                    <div class="hidden adjust-position">
                        上下移动调整成员位置
                        <a>保存</a>
                        <a>撤销</a>
                    </div>
                    <div class="members-row-header">
                        <div>姓名</div>
                        <div>职位</div>
                        <div>联系电话</div>
                    </div>
                    <div class="members">
                        <%--<div id="1" class="members-row">--%>
                            <%--<div>--%>
                                <%--<label>--%>
                                    <%--<input type="checkbox">--%>
                                    <%--<span></span>--%>
                                <%--</label>--%>
                            <%--</div>--%>
                            <%--<div>姓名1</div>--%>
                            <%--<div>职位1</div>--%>
                        <%--</div>--%>
                        <%--<div id="2" class="members-row">--%>
                            <%--<div>--%>
                                <%--<label>--%>
                                    <%--<input type="checkbox">--%>
                                    <%--<span></span>--%>
                                <%--</label>--%>
                            <%--</div>--%>
                            <%--<div>姓名2</div>--%>
                            <%--<div>职位2</div>--%>
                        <%--</div>--%>
                        <%--<div id="3" class="members-row">--%>
                            <%--<div>--%>
                                <%--<label>--%>
                                    <%--<input type="checkbox">--%>
                                    <%--<span></span>--%>
                                <%--</label>--%>
                            <%--</div>--%>
                            <%--<div>姓名3</div>--%>
                            <%--<div>职位3</div>--%>
                        <%--</div>--%>
                        <%--<div id="4" class="members-row">--%>
                            <%--<div>--%>
                                <%--<label>--%>
                                    <%--<input type="checkbox">--%>
                                    <%--<span></span>--%>
                                <%--</label>--%>
                            <%--</div>--%>
                            <%--<div>姓名4</div>--%>
                            <%--<div>职位4</div>--%>
                        <%--</div>--%>
                    </div>
                </div>
                <div class="department-title detail-title depts"><img src="<%=request.getContextPath()%>/resources/icon/xiaji.png">下级部门</div>
                <div class="detail-buttons depts">
                    <button class="main-button power hidden">添加子部门</button>
                    <button class="normal-button power hidden">调整排序</button>
                </div>
                <div id="departments" class="depts">
                    <div class="hidden adjust-position">
                        上下移动调整部门位置
                        <a>保存</a>
                        <a>撤销</a>
                    </div>
                    <ul class="departments">
                        <li id="child11" class="moveLi dept">
                            <a><img src="<%=request.getContextPath()%>/resources/icon/tiaoz.png">湖滨街道（4）</a>
                        </li>
                        <li id="child22" class="moveLi dept">
                            <a><img src="<%=request.getContextPath()%>/resources/icon/tiaoz.png">湖滨街道（4）</a>
                        </li>
                    </ul>
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
<div class="edit-info pop hidden">
    <div class="pop-title"><img src="<%=request.getContextPath()%>/resources/icon/bianji.png">某某社区</div>
    <div class="pop-tip">修改社区信息</div>
    <div class="pop-lines">
        <div></div>
        <div></div>
    </div>
    <label>
        <span>*</span>机构名称：<br/>
        <input class="normal-input jgName">
    </label>
    <label>
        <span>*</span>联系电话：<br/>
        <input class="normal-input jgMobile">
    </label>
    <label>
        <span>*</span>值班电话：<br/>
        <input class="normal-input jgHotline">
    </label>
    <label>
        <span>*</span>邮政编码：<br/>
        <input class="normal-input jgPostalcode">
    </label>
    <label>
        <span>*</span>传真：<br/>
        <input class="normal-input jgFax">
    </label>
    <label>
        <span>*</span>地址：<br/>
        <input class="normal-input jgAddress">
    </label>
    <div class="edit-info-buttons">
        <button class="normal-button">取消</button>
        <button class="danger-button jgDelete">删除机构</button>
        <button class="main-button">确认</button>
    </div>
</div>
<div class="add-member pop hidden">
    <div class="pop-title"><img src="<%=request.getContextPath()%>/resources/icon/tianjiacy.png">添加成员</div>
    <div class="pop-tip">填写信息</div>
    <div class="pop-lines">
        <div></div>
        <div></div>
    </div>
    <label>
        <span>*</span>用<span>户</span>名：<input class="normal-input username">
    </label>
    <label>
        <span>*</span>姓<span>名</span>：<input class="normal-input realname">
    </label>
    <label>
        <span>*</span>移动电话：<input class="normal-input mobile">
    </label>
    <label>
        <span style="visibility: hidden">*</span>办公电话：<input class="normal-input telephone">
    </label>
    <label>
        <span style="visibility: hidden">*</span>职<span>位</span>：<input class="normal-input position">
    </label>
    <label class="hidden" for="password">
       <input id="password" type="password" class="hidden normal-input">
    </label>
    <label>
        <span>*</span>职<span>能</span>：<select class="type"><option value="0">普通用户</option><option value="1">管理员</option></select>
    </label>
    <div class="pop-tip">账号密码</div>
    <div class="pop-lines">
        <div></div>
        <div></div>
    </div>
    <label>
        <span>*</span>密<span>码</span>：<input type="password"  autocomplete="off" class="normal-input password">
    </label>
    <div class="add-member-buttons">
        <button class="normal-button">取消</button>
        <button class="main-button">确认</button>
    </div>
</div>
<div class="edit-member pop hidden">
    <div class="pop-title"><img src="<%=request.getContextPath()%>/resources/icon/ren.png">杜玉芳<span>某某社区</span></div>
    <div class="pop-tip">成员信息</div>
    <div class="pop-lines">
        <div></div>
        <div></div>
    </div>
    <label>
        <span style="visibility: hidden">*</span>用<span>户</span>名：<span class="username">admin</span>
    </label>
    <label>
        <span>*</span>姓<span>名</span>：<input class="normal-input realname">
    </label>
    <label>
        <span>*</span>移动电话：<input class="normal-input mobile">
    </label>
    <label>
        <span style="visibility: hidden">*</span>办公电话：<input class="normal-input telephone">
    </label>
    <label>
        <span style="visibility: hidden">*</span>职<span>位</span>：<input class="normal-input position">
    </label>
    <label class="" for="password1">
        <input id="password1" type="password" class=" normal-input ">
    </label>
    <label class="" for="password2">
        <input id="password2" type="password" class=" normal-input ">
    </label>
    <label>
        <span>*</span>职<span>能</span>：<select class="type"><option value="1">管理员</option><option value="0">普通用户</option></select>
    </label>
    <div class="pop-tip power">账号密码</div>
    <div class="pop-lines power">
        <div></div>
        <div></div>
    </div>
    <label class="power">
        <span>*</span>密<span>码</span>：<input type="password" class="normal-input password">
    </label>
    <div class="edit-member-buttons">
        <button class="normal-button">取消</button>
        <button class="danger-button power">删除离职</button>
        <button class="main-button power">确认</button>
    </div>
</div>
<div class="add-department pop hidden">
    <div class="pop-title"><img src="<%=request.getContextPath()%>/resources/icon/tianjiazibumen.png">添加子部门</div>
    <div class="pop-tip">填写机构信息</div>
    <div class="pop-lines">
        <div></div>
        <div></div>
    </div>
    <label>

        <span>*</span>机构名称：<%--<span>必填</span>--%><br/>
        <input class="normal-input jgName">
    </label>
    <label>
        <span>*</span>联系电话：<br/>
        <input class="normal-input jgMobile">
    </label>
    <label>
        <span>*</span>值班电话：<br/>
        <input class="normal-input jgHotline">
    </label>
    <label>
        <span>*</span>邮政编码：<br/>
        <input class="normal-input jgPostalcode">
    </label>
    <label>
        <span>*</span>传真：<br/>
        <input class="normal-input jgFax">
    </label>
    <label>
        <span>*</span>地址：<br/>
        <input class="normal-input jgAddress">
    </label>
    <div class="add-department-buttons">
        <button class="normal-button">取消</button>
        <button class="main-button">确认</button>
    </div>
</div>
</body>
<script src="<%=request.getContextPath()%>/resources/js/util/bootstrap.min.js" type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/resources/ace/js/bootbox.js"></script>
<script src="<%=request.getContextPath()%>/resources/js/util/staticUrl.js" type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/resources/js/util/util-common.js" type="text/javascript"></script>
</html>
