<%--
  Created by IntelliJ IDEA.
  User: kzn
  Date: 2019-04-17
  Time: 22:19
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
    <link href="<%=request.getContextPath()%>/resources/css/statistics.css" rel="stylesheet" type="text/css">
    <script src="<%=request.getContextPath()%>/resources/ace/js/jquery.js"></script>
    <script src="<%=request.getContextPath()%>/resources/ace/js/select2.js"></script>
    <script src="<%=request.getContextPath()%>/resources/wangeditor/js/wangEditor.js"></script>
    <script src="<%=request.getContextPath()%>/resources/ace/js/jquery-ui.js"></script>
    <script src="<%=request.getContextPath()%>/resources/js/validate.js"></script>
    <script src="<%=request.getContextPath()%>/resources/js/organization_construction_report.js"></script>
    <script src="<%=request.getContextPath()%>/resources/js/year_report.js"></script>
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
                <li><a id="HYGLFX" class="selected-li">会员管理分析</a></li>
                <li><a id="ZYZTJFX" class="selected-li">志愿者统计分析</a></li>
                <li>
                    <a>项目工作分析<img src="<%=request.getContextPath()%>/resources/icon/fanhui1.png"></a>
                    <ul>
                        <li>
                            <a id="XMBBXQ">报表详情</a>
                        </li>
                        <li>
                            <a>特殊家庭帮扶月报<img src="<%=request.getContextPath()%>/resources/icon/fanhui1.png"></a>
                            <ul>
                                <li><a id="JTBFJL">家庭帮扶记录</a></li>
                                <li><a id="YBXQ">月报详情</a></li>
                                <li><a id="YBSB">月报上报</a></li>
                                <li><a id="NXHD">暖心活动</a></li>
                            </ul>
                        </li>
                        <li>
                            <a id="TSLDSB">特色活动亮点上报</a>
                        </li>
                    </ul>
                </li>
                <li>
                    <a>年度报表<img src="<%=request.getContextPath()%>/resources/icon/fanhui1.png"></a>
                    <ul>
                        <li><a id="NDBBXQ">报表详情</a></li>
                        <li><a id="NDGZSB">年度工作上报</a></li>
                    </ul>
                </li>
                <li>
                    <a>组织建设报表<img src="<%=request.getContextPath()%>/resources/icon/fanhui1.png"></a>
                    <ul>
                        <li><a id="ZZBBXQ">报表详情</a></li>
                        <li><a id="ZZJSSB">组织建设上报</a></li>
                        <li><a id="LDRKSFD">流动人口示范点</a></li>
                    </ul>
                </li>
            </ul>
        </div>
        <div class="right">
            <%--报表详情--%>
            <div class="right-main ">
                <div class="l-title">会员管理分析</div>
                <div class="s-title">统计分析/会员管理分析</div>
                <div class="line"></div>
                <div class="query-title">查询条件</div>
                <div class="query-terms">
                    <label>
                        <select class="huiyuan-date-select">

                        </select>
                    </label>
                    <label>
                        <input class="normal-input fsdx" placeholder="请选择访视对象">
                    </label>
                    <label>
                        <button class="main-button">查&nbsp;&nbsp;询</button>
                    </label>
                </div>
                <div class="statistics-buttons">
                    <button class="main-button hidden"><img
                            src="<%=request.getContextPath()%>/resources/icon/3-guidang.png">归档
                    </button>
                    <button class="normal-button">刷&nbsp;新</button>
                    <button class="excel-button">导&nbsp;出</button>
                    <button disabled class="right-button normal-button">杭州市会员管理分析表</button>
                </div>
                <div class="statistics-table">
                    <div class="row">
                        <%--会员管理分析--%>
                        <div class="col-lg-12 ">
                            <table id="huiyuan-table" class="table table-striped table-bordered table-hover">
                                <thead>
                                <tr>
                                    <th style="text-align: center">机构名称</th>
                                    <th style="text-align: center" id="hy-zyz-sl">会员数量</th>
                                    <th>
                                        <div class="huiyuan-sex">
                                            <div>性别比例</div>
                                            <div>
                                                <div class="col-lg-6">男</div>
                                                <div class="col-lg-6">女</div>
                                            </div>
                                        </div>
                                    </th>
                                    <th>
                                        <div class="huiyuan-jiegou">
                                            <div>会员结构</div>
                                            <div>
                                                <div class="col-lg-3">个体会员</div>
                                                <div class="col-lg-3">团体会员</div>
                                                <div class="col-lg-3">流动人口</div>
                                                <div class="col-lg-3">常住人口</div>
                                            </div>
                                        </div>
                                    </th>
                                    <th>
                                        <div class="huiyuan-service">
                                            <div>重点服务对象</div>
                                            <div>
                                                <div class="col-lg-4">失独人口</div>
                                                <div class="col-lg-4">育龄人口</div>
                                                <div class="col-lg-4">青少年</div>
                                            </div>
                                        </div>
                                    </th>
                                </tr>
                                </thead>
                                <tbody class="xuanjiaoList"></tbody>
                            </table>
                        </div>
                        <%--工作分析报表详情    --%>
                        <div class="col-lg-12 hidden taskAnalysis-table">
                            <table id="taskAnalysis-table" class="table table-striped table-bordered table-hover">
                                <thead>
                                <tr>
                                    <th style="text-align: center">机构名称</th>
                                    <th style="text-align: center">
                                        <div class="eightTask">
                                            <div>八大项目</div>
                                            <div>
                                                <div>
                                                    <div>宣传教育</div>
                                                    <div>
                                                        <div class="col-lg-6">活动次数</div>
                                                        <div class="col-lg-6">服务人数</div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div>业务培训</div>
                                                    <div>
                                                        <div class="col-lg-6">活动次数</div>
                                                        <div class="col-lg-6">服务人数</div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div>健康服务</div>
                                                    <div>
                                                        <div class="col-lg-6">活动次数</div>
                                                        <div class="col-lg-6">服务人数</div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div>计生家庭帮扶</div>
                                                    <div>
                                                        <div class="col-lg-6">活动次数</div>
                                                        <div class="col-lg-6">服务人数</div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div>青春健康</div>
                                                    <div>
                                                        <div class="col-lg-6">活动次数</div>
                                                        <div class="col-lg-6">服务人数</div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div>流动人口服务</div>
                                                    <div>
                                                        <div class="col-lg-6">活动次数</div>
                                                        <div class="col-lg-6">服务人数</div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div>权益维护</div>
                                                    <div class="col-lg-12" style="font-size: 12px">活动次数</div>
                                                </div>
                                                <div>
                                                    <div>其他</div>
                                                    <div>
                                                        <div class="col-lg-6">活动次数</div>
                                                        <div class="col-lg-6">服务人数</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </th>
                                </tr>
                                </thead>
                                <tbody class="xuanjiaoList"></tbody>
                            </table>
                        </div>
                        <%--月报详情    --%>
                        <div class="col-lg-12 hidden">
                            <table id="month-table" class="table table-striped table-bordered table-hover">
                                <thead>
                                <tr>
                                    <th>机构名称</th>
                                    <th>新增失独人员</th>
                                    <th>新增心理干预人员</th>
                                    <th>需信息迁移人员</th>
                                    <th>需信息变更人员</th>
                                </tr>
                                </thead>
                                <tbody></tbody>
                            </table>
                        </div>
                        <%--年度报表详情--%>
                        <div class="col-lg-12 hidden yearReport">
                            <table id="yearReport1" class="table table-striped table-bordered table-hover">
                                <thead>
                                <tr>
                                    <th>青春健康教育</th>
                                    <th>计生特殊家庭帮扶</th>
                                    <th>健康服务</th>
                                </tr>
                                </thead>
                                <tbody>
                                <td>
                                    <div>
                                        <div>面对青少年的讲座和培训</div>
                                        <div>
                                            <div class="col-lg-6">
                                                <div>场次</div>
                                                <div id="mianduiqsndjzhpxcc">123</div>
                                            </div>
                                            <div class="col-lg-6">
                                                <div>人数</div>
                                                <div id="mianduiqsndjzhpxrs">123</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div>面对家长的讲座和培训</div>
                                        <div>
                                            <div class="col-lg-6">
                                                <div>场次</div>
                                                <div id="mianduijzdjzhpxcc">123</div>
                                            </div>
                                            <div class="col-lg-6">
                                                <div>人数</div>
                                                <div id="mianduijzdjzhpxrs">123</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div>现有师资人数</div>
                                        <div>
                                            <div class="col-lg-6">
                                                <div>市级</div>
                                                <div id="xianyouszrssj">123</div>
                                            </div>
                                            <div class="col-lg-6">
                                                <div>县级</div>
                                                <div id="xianyouszrsxj">123</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div>现有基地个数</div>
                                        <div>
                                            <div class="col-lg-6">
                                                <div>市级</div>
                                                <div id="xianyoujdgssj">123</div>
                                            </div>
                                            <div class="col-lg-6">
                                                <div>县级</div>
                                                <div id="xianyoujdgsxj">123</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div>现有青春健康同伴社的高校数量</div>
                                        <div id="xianyouqcjktbsdgxsl">59</div>
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        <div>计生协组织开展的各类帮扶和服务活动</div>
                                        <div>
                                            <div class="col-lg-6">
                                                <div>场次</div>
                                                <div id="jishengxzzkzdglbfhfwhdcc">123</div>
                                            </div>
                                            <div class="col-lg-6">
                                                <div>对象人次</div>
                                                <div id="jishengxzzkzdglbfhfwhddxrc">123</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div>现有会员、志愿者与特殊家庭结对帮扶的对数</div>
                                        <div id="xianyouhyzyzytsjtjdbfdds">2135</div>
                                    </div>
                                    <div>
                                        <div>现有相关民非组织数 （与计生协建立联系的）</div>
                                        <div id="xianyouxgmfzzs">2135</div>
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        <div>举办生殖健康和优生优育等各类培训讲座场次</div>
                                        <div id="jubanszjkhysyydglpxjzcc">2135</div>
                                    </div>
                                    <div>
                                        <div>参加培训和听讲人次</div>
                                        <div id="canjiapxhtjrc">2135</div>
                                    </div>
                                </td>
                                </tbody>
                            </table>
                        </div>
                        <div class="col-lg-12 hidden yearReport">
                            <table id="yearReport2" class="table table-striped table-bordered table-hover">
                                <thead>
                                <tr>
                                    <th>慰问救助</th>
                                    <th>宣传教育</th>
                                    <th>流动人口</th>
                                    <th>业务培训</th>
                                    <th>志愿者队伍建设</th>
                                </tr>
                                </thead>
                                <tbody>
                                <td>
                                    <div>
                                        <div>受助对象户数（人数）</div>
                                        <div id="shouzhudxhs">2135</div>
                                    </div>
                                    <div>
                                        <div>
                                            <div>其中</div>
                                            <div>
                                                <div class="col-lg-6">圆梦微心愿个数</div>
                                                <div class="col-lg-6">圆梦微心愿资金</div>
                                            </div>
                                        </div>
                                        <div>
                                            <div class="col-lg-6" id="shouzhudxhsqzymwxygs">1098</div>
                                            <div class="col-lg-6" id="shouzhudxhsqzymwxyzj"> 1098</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        <div>
                                            <div>各类主题宣传活动</div>
                                            <div>
                                                <div class="col-lg-4">场次</div>
                                                <div class="col-lg-4">群众参与人数</div>
                                                <div class="col-lg-4">宣传资料发放数量</div>
                                            </div>
                                        </div>
                                        <div>
                                            <div class="col-lg-4" id="geleiztxchdcc">1098</div>
                                            <div class="col-lg-4" id="geleiztxchdqzcyrs"> 1098</div>
                                            <div class="col-lg-4" id="geleiztxchdxczlffsl"> 1098</div>
                                        </div>
                                    </div>
                                    <div>
                                        <div>
                                            <div>新闻宣传</div>
                                            <div>
                                                <div class="col-lg-6">县以上广播电视报告数量</div>
                                                <div class="col-lg-6">县以上纸媒体报告数量</div>
                                            </div>
                                        </div>
                                        <div>
                                            <div class="col-lg-6" id="xinwenxcxysgbdsbgsl">1098</div>
                                            <div class="col-lg-6" id="xinwenxcxyszmtbgsl"> 1098</div>
                                        </div>
                                    </div>
                                    <div>
                                        <div>
                                            <div>新媒体</div>
                                            <div>
                                                <div class="col-lg-6">市一级是否有建有官微</div>
                                                <div class="col-lg-6">市一级官微数量</div>
                                            </div>
                                        </div>
                                        <div>
                                            <div class="col-lg-6" id="xinmeitsyjsfyjygw">1098</div>
                                            <div class="col-lg-6" id="xinmeitsyjgwsl"> 1098</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        <div>
                                            <div>现有企业和流动人口计生协</div>
                                            <div>
                                                <div class="col-lg-6">组织个数</div>
                                                <div class="col-lg-6">会员个数</div>
                                            </div>
                                        </div>
                                        <div>
                                            <div class="col-lg-6" id="xianyouqyhldrkjsxzzgs">1098</div>
                                            <div class="col-lg-6" id="xianyouqyhldrkjsxhygs"> 1098</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        <div>
                                            <div>市、县计生协举办培训</div>
                                            <div>
                                                <div class="col-lg-6">场次</div>
                                                <div class="col-lg-6">人数</div>
                                            </div>
                                        </div>
                                        <div>
                                            <div class="col-lg-6" id="shixianjsxjbpxcc">1098</div>
                                            <div class="col-lg-6" id="shixianjsxjbpxrs"> 1098</div>
                                        </div>
                                    </div>
                                    <div>
                                        <div>
                                            <div>其中</div>
                                            <div>
                                                <div class="col-lg-6">
                                                    <div>青春健康师资培训</div>
                                                    <div>
                                                        <div class="col-lg-6" style="border-right: 1px solid #d9d9d9;">
                                                            场次
                                                        </div>
                                                        <div class="col-lg-6">人数</div>
                                                    </div>
                                                </div>
                                                <div class="col-lg-6">
                                                    <div>计生特殊家庭帮扶骨干培训</div>
                                                    <div>
                                                        <div class="col-lg-6" style="border-right: 1px solid #d9d9d9;">
                                                            场次
                                                        </div>
                                                        <div class="col-lg-6">人数</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <div class="col-lg-3" id="qingchunjkszpxcc">1098</div>
                                            <div class="col-lg-3" id="qingchunjkszpxrs"> 1098</div>
                                            <div class="col-lg-3" id="jishengtsjtbfggpxcc">1098</div>
                                            <div class="col-lg-3" id="jishengtsjtbfggpxrs"> 1098</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        <div>现有队伍数（支）</div>
                                        <div id="zhiyuanzdwjsxydws">2135</div>
                                    </div>
                                    <div>
                                        <div>人数</div>
                                        <div id="zhiyuanzdwjsrs">2135</div>
                                    </div>
                                </td>
                                </tbody>
                            </table>
                        </div>
                        <%--组织建设报表详情    --%>
                        <div class="col-lg-12 hidden" style="overflow-x: auto;overflow-y: hidden">
                            <table id="zzReport" class="table table-striped table-bordered table-hover">
                                <thead>
                                <tr>
                                    <th>
                                        <div class="zzReport">
                                            <div style="writing-mode: tb-lr;writing-mode: vertical-lr;">单位</div>
                                            <div style="writing-mode: tb-lr;writing-mode: vertical-lr;">汇总性质</div>
                                            <div style="writing-mode: tb-lr;writing-mode: vertical-lr;">行政区数量</div>
                                            <div style="writing-mode: tb-lr;writing-mode: vertical-lr;">机构数量</div>
                                            <div style="writing-mode: tb-lr;writing-mode: vertical-lr;">党组数量</div>
                                            <div style="writing-mode: tb-lr;writing-mode: vertical-lr;">党支部数量</div>
                                            <div>
                                                <div>机构建设</div>
                                                <div>
                                                    <div>入序</div>
                                                    <div>参公</div>
                                                    <div>三定</div>
                                                    <div>内设机构数量</div>
                                                    <div>数量</div>
                                                </div>
                                            </div>
                                            <div>
                                                <div>编制</div>
                                                <div>类别</div>
                                                <div>
                                                    <div>行政编制</div>
                                                    <div>事业编制</div>
                                                    <div>其他编制</div>
                                                </div>
                                            </div>
                                            <div>
                                                <div>实际工作人员</div>
                                                <div>
                                                    <div>
                                                        <div>在编人数</div>
                                                        <div>
                                                            <div>
                                                                <div>人数</div>
                                                                <div>女性数量</div>
                                                                <div>党员数量</div>
                                                            </div>
                                                            <div>
                                                                <div>级别</div>
                                                                <div>
                                                                    <div class="jibie">
                                                                        <div>厅局级</div>
                                                                        <div>
                                                                            <div>正厅</div>
                                                                            <div>副厅</div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="jibie">
                                                                        <div>处级</div>
                                                                        <div>
                                                                            <div>正处</div>
                                                                            <div>副处</div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="jibie">
                                                                        <div>科级</div>
                                                                        <div>
                                                                            <div>正科</div>
                                                                            <div>副科</div>
                                                                        </div>
                                                                    </div>
                                                                    <div>科员及以下</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div>兼职聘用等其他人员数</div>
                                                </div>
                                            </div>
                                            <div>
                                                <div>理事</div>
                                                <div>
                                                    <div>人数</div>
                                                    <div>
                                                        <div>其中女性</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <div>会员</div>
                                                <div>
                                                    <div>团体会员</div>
                                                    <div>个人会员</div>
                                                    <div>
                                                        <div>其中女性</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <div>志愿者</div>
                                                <div>
                                                    <div>人数</div>
                                                    <div>队伍数</div>
                                                </div>
                                            </div>
                                            <div>
                                                <div>活动阵地、社团</div>
                                                <div>
                                                    <div>会员小组</div>
                                                    <div>会员之家</div>
                                                    <div>文化社区</div>
                                                    <div>其他</div>
                                                </div>
                                            </div>
                                            <div>
                                                <div>资金保障</div>
                                                <div>
                                                    <div>独立财务预算机构</div>
                                                    <div id="ndbk">2018年财政拨款(万元)</div>
                                                    <div>基金会</div>
                                                </div>
                                            </div>
                                            <div style="writing-mode: tb-lr;writing-mode: vertical-lr;">机关企事业计生协</div>
                                            <div style="writing-mode: tb-lr;writing-mode: vertical-lr;">流动人口计生协</div>
                                            <div style="writing-mode: tb-lr;writing-mode: vertical-lr;">备注</div>
                                        </div>
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>
                                        <div>
                                            <div style="writing-mode: tb-lr;writing-mode: vertical-lr;">省(自治区、直辖市)计生协
                                            </div>
                                            <div style="writing-mode: tb-lr;writing-mode: vertical-lr;">本级</div>
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div id="zzjsbbshiji">
                                            <div style="writing-mode: tb-lr;writing-mode: vertical-lr;">市(地)计生协</div>
                                            <div style="writing-mode: tb-lr;writing-mode: vertical-lr;">汇总</div>
                                            <div class="xingzhengqsl"></div>
                                            <div class="jigousl"></div>
                                            <div class="dangzusl"></div>
                                            <div class="dangzhibsl"></div>
                                            <div class="ruxu"></div>
                                            <div class="cangong"></div>
                                            <div class="sanding"></div>
                                            <div class="neishejgsl"></div>
                                            <div class="jigoujssl"></div>
                                            <div class="xingzhengbz"></div>
                                            <div class="shiyebz"></div>
                                            <div class="qitabz"></div>
                                            <div class="zaibianryrs"></div>
                                            <div class="zaibianrynxsl"></div>
                                            <div class="zaibianrydysl"></div>
                                            <div class="zhengting"></div>
                                            <div class="futing"></div>
                                            <div class="zhengchu"></div>
                                            <div class="fuchu"></div>
                                            <div class="zhengke"></div>
                                            <div class="fuke"></div>
                                            <div class="keyuanjyx"></div>
                                            <div class="jianzhipydqtrys"></div>
                                            <div class="lishirs"></div>
                                            <div class="lishinx"></div>
                                            <div class="tuantihy"></div>
                                            <div class="gerenhy"></div>
                                            <div class="gerenhynx"></div>
                                            <div class="zhiyuanzrs"></div>
                                            <div class="zhiyuanzdws"></div>
                                            <div class="huiyuanxz"></div>
                                            <div class="huiyuanzj"></div>
                                            <div class="wenhuast"></div>
                                            <div class="huodongzdstqt"></div>
                                            <div class="dulicwysjg"></div>
                                            <div class="benniandczbke"></div>
                                            <div class="jijinh"></div>
                                            <div class="jiguanqsyjsx"></div>
                                            <div class="liudongrkjsx"></div>
                                            <div class="beizhu"></div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div id="zzjsbbquji">
                                            <div style="writing-mode: tb-lr;writing-mode: vertical-lr;">区县计生协</div>
                                            <div style="writing-mode: tb-lr;writing-mode: vertical-lr;">汇总</div>
                                            <div class="xingzhengqsl"></div>
                                            <div class="jigousl"></div>
                                            <div class="dangzusl"></div>
                                            <div class="dangzhibsl"></div>
                                            <div class="ruxu"></div>
                                            <div class="cangong"></div>
                                            <div class="sanding"></div>
                                            <div class="neishejgsl"></div>
                                            <div class="jigoujssl"></div>
                                            <div class="xingzhengbz"></div>
                                            <div class="shiyebz"></div>
                                            <div class="qitabz"></div>
                                            <div class="zaibianryrs"></div>
                                            <div class="zaibianrynxsl"></div>
                                            <div class="zaibianrydysl"></div>
                                            <div class="zhengting"></div>
                                            <div class="futing"></div>
                                            <div class="zhengchu"></div>
                                            <div class="fuchu"></div>
                                            <div class="zhengke"></div>
                                            <div class="fuke"></div>
                                            <div class="keyuanjyx"></div>
                                            <div class="jianzhipydqtrys"></div>
                                            <div class="lishirs"></div>
                                            <div class="lishinx"></div>
                                            <div class="tuantihy"></div>
                                            <div class="gerenhy"></div>
                                            <div class="gerenhynx"></div>
                                            <div class="zhiyuanzrs"></div>
                                            <div class="zhiyuanzdws"></div>
                                            <div class="huiyuanxz"></div>
                                            <div class="huiyuanzj"></div>
                                            <div class="wenhuast"></div>
                                            <div class="huodongzdstqt"></div>
                                            <div class="dulicwysjg"></div>
                                            <div class="benniandczbke"></div>
                                            <div class="jijinh"></div>
                                            <div class="jiguanqsyjsx"></div>
                                            <div class="liudongrkjsx"></div>
                                            <div class="beizhu"></div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div id="zzjsbbjiedaoji">
                                            <div style="writing-mode: tb-lr;writing-mode: vertical-lr;">乡(镇、街道)计生协</div>
                                            <div style="writing-mode: tb-lr;writing-mode: vertical-lr;">汇总</div>
                                            <div class="xingzhengqsl"></div>
                                            <div class="jigousl"></div>
                                            <div class="dangzusl"></div>
                                            <div class="dangzhibsl"></div>
                                            <div class="ruxu"></div>
                                            <div class="cangong"></div>
                                            <div class="sanding"></div>
                                            <div class="neishejgsl"></div>
                                            <div class="jigoujssl"></div>
                                            <div class="xingzhengbz"></div>
                                            <div class="shiyebz"></div>
                                            <div class="qitabz"></div>
                                            <div class="zaibianryrs"></div>
                                            <div class="zaibianrynxsl"></div>
                                            <div class="zaibianrydysl"></div>
                                            <div class="zhengting"></div>
                                            <div class="futing"></div>
                                            <div class="zhengchu"></div>
                                            <div class="fuchu"></div>
                                            <div class="zhengke"></div>
                                            <div class="fuke"></div>
                                            <div class="keyuanjyx"></div>
                                            <div class="jianzhipydqtrys"></div>
                                            <div class="lishirs"></div>
                                            <div class="lishinx"></div>
                                            <div class="tuantihy"></div>
                                            <div class="gerenhy"></div>
                                            <div class="gerenhynx"></div>
                                            <div class="zhiyuanzrs"></div>
                                            <div class="zhiyuanzdws"></div>
                                            <div class="huiyuanxz"></div>
                                            <div class="huiyuanzj"></div>
                                            <div class="wenhuast"></div>
                                            <div class="huodongzdstqt"></div>
                                            <div class="dulicwysjg"></div>
                                            <div class="benniandczbke"></div>
                                            <div class="jijinh"></div>
                                            <div class="jiguanqsyjsx"></div>
                                            <div class="liudongrkjsx"></div>
                                            <div class="beizhu"></div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div id="zzjsbbshequji">
                                            <div style="writing-mode: tb-lr;writing-mode: vertical-lr;">村(居)计生协</div>
                                            <div style="writing-mode: tb-lr;writing-mode: vertical-lr;">汇总</div>
                                            <div class="xingzhengqsl"></div>
                                            <div class="jigousl"></div>
                                            <div class="dangzusl"></div>
                                            <div class="dangzhibsl"></div>
                                            <div class="ruxu"></div>
                                            <div class="cangong"></div>
                                            <div class="sanding"></div>
                                            <div class="neishejgsl"></div>
                                            <div class="jigoujssl"></div>
                                            <div class="xingzhengbz"></div>
                                            <div class="shiyebz"></div>
                                            <div class="qitabz"></div>
                                            <div class="zaibianryrs"></div>
                                            <div class="zaibianrynxsl"></div>
                                            <div class="zaibianrydysl"></div>
                                            <div class="zhengting"></div>
                                            <div class="futing"></div>
                                            <div class="zhengchu"></div>
                                            <div class="fuchu"></div>
                                            <div class="zhengke"></div>
                                            <div class="fuke"></div>
                                            <div class="keyuanjyx"></div>
                                            <div class="jianzhipydqtrys"></div>
                                            <div class="lishirs"></div>
                                            <div class="lishinx"></div>
                                            <div class="tuantihy"></div>
                                            <div class="gerenhy"></div>
                                            <div class="gerenhynx"></div>
                                            <div class="zhiyuanzrs"></div>
                                            <div class="zhiyuanzdws"></div>
                                            <div class="huiyuanxz"></div>
                                            <div class="huiyuanzj"></div>
                                            <div class="wenhuast"></div>
                                            <div class="huodongzdstqt"></div>
                                            <div class="dulicwysjg"></div>
                                            <div class="benniandczbke"></div>
                                            <div class="jijinh"></div>
                                            <div class="jiguanqsyjsx"></div>
                                            <div class="liudongrkjsx"></div>
                                            <div class="beizhu"></div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div id="zzjsbbtotal">
                                            <div style="writing-mode: tb-lr;writing-mode: vertical-lr;">合计</div>
                                            <div style="writing-mode: tb-lr;writing-mode: vertical-lr;">汇总</div>
                                            <div class="xingzhengqsl"></div>
                                            <div class="jigousl"></div>
                                            <div class="dangzusl"></div>
                                            <div class="dangzhibsl"></div>
                                            <div class="ruxu"></div>
                                            <div class="cangong"></div>
                                            <div class="sanding"></div>
                                            <div class="neishejgsl"></div>
                                            <div class="jigoujssl"></div>
                                            <div class="xingzhengbz"></div>
                                            <div class="shiyebz"></div>
                                            <div class="qitabz"></div>
                                            <div class="zaibianryrs"></div>
                                            <div class="zaibianrynxsl"></div>
                                            <div class="zaibianrydysl"></div>
                                            <div class="zhengting"></div>
                                            <div class="futing"></div>
                                            <div class="zhengchu"></div>
                                            <div class="fuchu"></div>
                                            <div class="zhengke"></div>
                                            <div class="fuke"></div>
                                            <div class="keyuanjyx"></div>
                                            <div class="jianzhipydqtrys"></div>
                                            <div class="lishirs"></div>
                                            <div class="lishinx"></div>
                                            <div class="tuantihy"></div>
                                            <div class="gerenhy"></div>
                                            <div class="gerenhynx"></div>
                                            <div class="zhiyuanzrs"></div>
                                            <div class="zhiyuanzdws"></div>
                                            <div class="huiyuanxz"></div>
                                            <div class="huiyuanzj"></div>
                                            <div class="wenhuast"></div>
                                            <div class="huodongzdstqt"></div>
                                            <div class="dulicwysjg"></div>
                                            <div class="benniandczbke"></div>
                                            <div class="jijinh"></div>
                                            <div class="jiguanqsyjsx"></div>
                                            <div class="liudongrkjsx"></div>
                                            <div class="beizhu"></div>
                                        </div>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <%--帮扶记录--%>
                        <div class="col-lg-12 ">
                            <table id="bangfu-table" class="table table-striped table-bordered table-hover">
                                <thead>
                                <tr>
                                    <th>访视对象</th>
                                    <th>身份证号</th>
                                    <th>访视时间</th>
                                    <th>访视地址</th>
                                </tr>
                                </thead>
                                <tbody></tbody>
                            </table>
                        </div>
                        <%--流动人口示范点--%>
                        <div class="col-lg-12 " style="overflow-x: auto">
                            <table id="LDRKSFDXQ">
                                <tr>
                                    <td style="font-weight: bold;font-size: 18px" colspan="8">流动人口计生协示范点信息统计表</td>
                                </tr>
                                <tr>
                                    <td rowspan="4">机构名称</td>
                                    <td rowspan="4">职工总数</td>
                                    <td rowspan="4">流动人口总数</td>
                                    <td rowspan="4">会员数</td>
                                    <td rowspan="1" colspan="4">项目单位流动人口基本信息</td>
                                </tr>
                                <tr>
                                    <td rowspan="1" colspan="2">流动人口数</td>
                                    <td rowspan="1" colspan="1">未婚</td>
                                    <td rowspan="1" colspan="1">已婚</td>
                                </tr>
                                <tr>

                                    <td rowspan="1" colspan="2">（人）</td>
                                    <td rowspan="2">（人）</td>
                                    <td rowspan="2">（人）</td>
                                </tr>
                                <tr>
                                    <td rowspan="1">男</td>
                                    <td rowspan="1">女</td>
                                </tr>
                                <tr>
                                    <td rowspan="1" colspan="1">23</td>
                                    <td rowspan="1" colspan="1">32</td>
                                    <td rowspan="1" colspan="1">23</td>
                                    <td rowspan="1" colspan="1">23</td>
                                    <td rowspan="1" colspan="1">23</td>
                                    <td rowspan="1" colspan="1">23</td>
                                    <td rowspan="1" colspan="1">23</td>
                                    <td rowspan="1" colspan="1">23</td>
                                </tr>

                            </table>
                        </div>
                        <%--暖心活动--%>
                        <div class="col-lg-12 " style="overflow-x: auto">
                            <table id="NXHDXQ">
                                <tr>
                                    <td rowspan="4" colspan="1">单位</td>
                                    <td rowspan="1" colspan="20">主要内容</td>
                                </tr>
                                <tr>
                                    <td rowspan="1" colspan="2">需求调查</td>
                                    <td rowspan="1" colspan="2">保险理赔</td>
                                    <td rowspan="1" colspan="4">心理健康服务</td>
                                    <td rowspan="1" colspan="10">走访慰问落实</td>
                                    <td rowspan="1" colspan="2">服务活动开展</td>
                                </tr>
                                <tr>
                                    <td rowspan="2" colspan="1">户</td>
                                    <td rowspan="2" colspan="1">人</td>
                                    <td rowspan="2" colspan="1">例</td>
                                    <td rowspan="2" colspan="1">金额(元)</td>
                                    <td rowspan="2" colspan="1">户</td>
                                    <td rowspan="2" colspan="1">人</td>
                                    <td rowspan="2" colspan="1">建档(份)</td>
                                    <td rowspan="2" colspan="1">测评(人)</td>
                                    <td rowspan="1" colspan="2">日常走访</td>
                                    <td rowspan="1" colspan="2">节日看望</td>
                                    <td rowspan="1" colspan="2">生日陪伴</td>
                                    <td rowspan="1" colspan="2">住院探望</td>
                                    <td rowspan="1" colspan="2">突发事件</td>
                                    <td rowspan="2" colspan="1">场</td>
                                    <td rowspan="2" colspan="1">人</td>
                                </tr>
                                <tr>
                                    <td rowspan="1" colspan="1">户</td>
                                    <td rowspan="1" colspan="1">人</td>
                                    <td rowspan="1" colspan="1">户</td>
                                    <td rowspan="1" colspan="1">人</td>
                                    <td rowspan="1" colspan="1">户</td>
                                    <td rowspan="1" colspan="1">人</td>
                                    <td rowspan="1" colspan="1">户</td>
                                    <td rowspan="1" colspan="1">人</td>
                                    <td rowspan="1" colspan="1">户</td>
                                    <td rowspan="1" colspan="1">人</td>
                                </tr>

                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <%--上报记录    --%>
            <div class="right-main hidden">
                <div class="l-title">会员管理分析</div>
                <div class="s-title">统计分析/会员管理分析</div>
                <div class="query-terms hidden">
                    <label>
                        <select class="ldrkjsx1-select" data-searchplaceholder="--年份--">
                            <option value="0">test</option>
                        </select>
                    </label>
                </div>
                <div class="statistics-table">
                    <div class="row">
                        <div class="col-lg-12 ">
                            <table id="jilu-table" class="table table-striped table-bordered table-hover">
                                <thead>
                                <tr>
                                    <th>序号</th>
                                    <th id="ldrksfdName">报表名称</th>
                                    <th>上报时间</th>
                                    <th>上报人员</th>
                                    <th>操作</th>
                                </tr>
                                </thead>
                                <tbody></tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <%--报表详情--%>
            <div class="right-main hidden">
                <div class="l-title">会员管理分析</div>
                <div class="s-title">统计分析/会员管理分析</div>
            </div>
            <%--报表上报（主）--%>
            <div class="right-main hidden">
                <div class="l-title">月报上报</div>
                <div class="s-title">统计分析/项目工作分析/月报上报</div>
                <div class="query-terms hidden">
                    <label>
                        <select class="ldrkjsx-select" data-searchplaceholder="--年份--">
                            <option value="0">test</option>
                        </select>
                    </label>
                </div>
                <div class="month-tables ">
                    <input class="hidden" id="pageInput">
                    <ul>
                        <li id="localReport">本级上报</li>
                        <li id="xzsfd">报表详情</li>
                        <li id="xjsb" class="month-table-selected-li">下级上报</li>
                        <li class="month-table-selected-li" id="xzsbjl">上报记录</li>
                    </ul>
                    <div class="line"></div>
                </div>
                <div class="statistics-table ">
                    <div class="row">
                        <div class="col-lg-12" id="monthTable">
                            <table id="monthReport-table" class="table table-striped table-bordered table-hover">
                                <thead>
                                <tr>
                                    <th>序号</th>
                                    <th>上报方</th>
                                    <th id="sbzt">上报状态</th>
                                    <th>查看</th>
                                </tr>
                                </thead>
                                <tbody></tbody>
                            </table>
                        </div>
                        <div class="col-lg-12 hidden sfd">
                            <table id="sfd-table" class="table table-striped table-bordered table-hover">
                                <thead>
                                <tr>
                                    <th>序号</th>
                                    <th>示范点名称</th>
                                    <th>上报时间</th>
                                    <th>上报人员</th>
                                    <th>操作</th>
                                </tr>
                                </thead>
                                <tbody></tbody>
                            </table>
                        </div>
                        <div class="col-lg-12 hidden nxhd">
                            <table id="nxhd-table" class="table table-striped table-bordered table-hover">
                                <thead>
                                <tr>
                                    <th>序号</th>
                                    <th>单位名称</th>
                                    <th>上报时间</th>
                                    <th>上报人员</th>
                                    <th>操作</th>
                                </tr>
                                </thead>
                                <tbody></tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <%--月报上报与记录--%>
            <div class="right-main hidden">
                <div class="l-title">月报上报</div>
                <div class="s-title">统计分析/项目工作分析/月报上报</div>
                <div class="line"></div>
                <div class="top-buttons ybbjsbBtn query-terms">
                    <div class="current-top-div">新增失独人员</div>
                    <div>新增心理干预人员</div>
                    <div>需信息迁移人员</div>
                    <div>需信息变更人员</div>
                    <div id="hd">活动情况</div>
                    <button class="excel-button" style="margin-left: 32px">导&nbsp;出</button>
                </div>
                <div class="query-terms jl">
                    <label>
                        <select class="ybjl-select">

                        </select>
                    </label>
                    <button class="excel-button">导&nbsp;出</button>
                </div>
                <div class="month-tables top-ul">
                    <ul>
                        <li class="month-table-selected-li">新增失独人员</li>
                        <li>新增心理干预人员</li>
                        <li>需信息迁移人员</li>
                        <li>需信息变更人员</li>
                        <li>活动情况</li>
                    </ul>
                    <div class="line"></div>
                </div>
                <div class="statistics-table  jl ybbg">
                    <div class="row">
                        <div class="col-lg-12">
                            <table id="monthReportInfo-table"
                                   class="table table-striped table-bordered table-hover">
                                <thead>
                                <tr>
                                    <th></th>
                                    <th>信息编码</th>
                                    <th>父亲姓名</th>
                                    <th>父亲身份证</th>
                                    <th>母亲姓名</th>
                                    <th>母亲身份证</th>
                                    <th>现居住详细地址</th>
                                    <th id="ybsdxlTime">失独时间</th>
                                    <th id="ybsdxlreason">失独原因</th>
                                    <th>联系电话</th>
                                </tr>
                                </thead>
                                <tbody></tbody>
                            </table>
                        </div>
                        <div class="col-lg-12 hidden">
                            <table id="monthReportInfo1-table"
                                   class="table table-striped table-bordered table-hover">
                                <thead>
                                <tr>
                                    <th></th>
                                    <th>信息编码</th>
                                    <th>父亲姓名</th>
                                    <th>父亲身份证</th>
                                    <th>母亲姓名</th>
                                    <th>母亲身份证</th>
                                    <th>迁出地址</th>
                                    <th>迁入地址</th>
                                    <th>迁移原因</th>
                                    <th>迁移时间</th>
                                </tr>
                                </thead>
                                <tbody></tbody>
                            </table>
                        </div>
                        <div class="col-lg-12 hidden">
                            <table id="monthReportInfo2-table"
                                   class="table table-striped table-bordered table-hover">
                                <thead>
                                <tr>
                                    <th></th>
                                    <th>信息编码</th>
                                    <th>父亲姓名</th>
                                    <th>父亲身份证</th>
                                    <th>母亲姓名</th>
                                    <th>母亲身份证</th>
                                    <th>删除或注销原因</th>
                                    <th>删除或注销时间</th>
                                    <th>地址</th>
                                </tr>
                                </thead>
                                <tbody></tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="statistics-table  ckActivityQk hidden ">
                    <div>
                        <label><span style="margin-left: 14px">*</span><span>负责人：</span><span id="xiajifzr"><img
                                style="margin-right: 12px"
                                src="<%=request.getContextPath()%>/resources/icon/chengyuan2.png"></span></label>
                    </div>
                    <div class="query-title">活动总结</div>
                    <div class="ybzongjie"></div>
                </div>
                <div class="statistics-table  monthInfo0 hidden">
                    <label><input class="normal-input" placeholder="信息编码(选填)"></label>
                    <label><input class="normal-input" placeholder="父亲姓名"></label>
                    <label><input class="normal-input" placeholder="父亲身份证(选填)"></label>
                    <label><input class="normal-input" placeholder="母亲姓名"></label>
                    <label><input class="normal-input" placeholder="母亲身份证(选填)"></label>
                    <label><input class="normal-input" placeholder="现居住详细地址"></label>
                    <label><input class="normal-input aloneTime" placeholder="失独时间"></label>
                    <label><input class="normal-input" placeholder="失独原因"></label>
                    <label><input class="normal-input" placeholder="联系电话"></label>
                </div>
                <div class="statistics-table monthInfo1 hidden">
                    <label><input class="normal-input" placeholder="信息编码(选填)"></label>
                    <label><input class="normal-input" placeholder="父亲姓名"></label>
                    <label><input class="normal-input" placeholder="父亲身份证(选填)"></label>
                    <label><input class="normal-input" placeholder="母亲姓名"></label>
                    <label><input class="normal-input" placeholder="母亲身份证(选填)"></label>
                    <label><input class="normal-input" placeholder="迁出地址"></label>
                    <label><input class="normal-input" placeholder="迁入地址"></label>
                    <label><input class="normal-input" placeholder="迁移原因"></label>
                    <label><input class="normal-input qianyiTime" placeholder="迁移时间"></label>
                </div>
                <div class="statistics-table  monthInfo2 hidden">
                    <label><input class="normal-input" placeholder="信息编码(选填)"></label>
                    <label><input class="normal-input" placeholder="父亲姓名"></label>
                    <label><input class="normal-input" placeholder="父亲身份证(选填)"></label>
                    <label><input class="normal-input" placeholder="母亲姓名"></label>
                    <label><input class="normal-input" placeholder="母亲身份证(选填)"></label>
                    <label><input class="normal-input" placeholder="删除或注销原因"></label>
                    <label><input class="normal-input deleteTime" placeholder="删除或注销时间"></label>
                    <label><input class="normal-input" placeholder="地址"></label>
                </div>
                <div class="bottom-buttons  peopleButton">
                    <button class="danger-button deleteButton">删&nbsp;&nbsp;除</button>
                    <button class="main-button saveButton">保&nbsp;&nbsp;存</button>
                </div>
                <div class="ActivityQK  ">
                    <label><span style="margin-left: 14px">*</span><span>负责人：</span><input
                            class="normal-input FZRinput"></label>
                    <label><span style="visibility: hidden">*</span><span>活动总结：</span>
                        <div id="ybZongjie"></div>
                    </label>
                </div>
                <div class="ActivityQK bottom-buttons">
                    <button class="main-button activityButton">提&nbsp;&nbsp;交</button>
                </div>
            </div>
            <%--年度报表上报--%>
            <div class="right-main hidden">
                <div class="l-title">月报上报</div>
                <div class="s-title">统计分析/项目工作分析/月报上报</div>
                <div class="line"></div>
                <div class="top-buttons  ndbjsbBtn">
                    <div class="current-top-div">青春健康教育</div>
                    <div>计生特殊家庭帮扶</div>
                    <div>健康服务</div>
                    <div>慰问救助</div>
                    <div>宣传教育</div>
                    <div>流动人口</div>
                    <div>业务培训</div>
                    <div>志愿者队伍建设</div>
                </div>
                <div class="yearReportInfo ndbbsb">
                    <label><span><span>*</span>面对青少年的讲座和培训场次：</span><input class="normal-input"></label>
                    <label><span><span>*</span>面对家长的讲座和培训场次：</span><input class="normal-input"></label>
                    <label><span><span>*</span>面对青少年的讲座和培训人数：</span><input class="normal-input"></label>
                    <label><span><span>*</span>面对家长的讲座和培训人数：</span><input class="normal-input"></label>
                    <label><span><span>*</span>计生协会组织开展的各类帮扶和服务活动场次：</span><input class="normal-input"></label>
                    <label><span><span>*</span>现有会员、志愿者与特殊家庭结对帮扶的对数：</span><input class="normal-input"></label>
                    <label><span><span>*</span>计生协会组织开展的各类帮扶和服务活动人数：</span><input class="normal-input"></label>
                    <label><span><span>*</span>现有相关民非组织：</span><input class="normal-input"></label>
                </div>
                <div class="yearReportInfo bottom-buttons ndbjsbBtns">
                    <button class="normal-button">保存</button>
                    <button class="main-button">下一步</button>
                </div>
            </div>
            <%--组织建设上报--%>
            <div class="right-main hidden">
                <div class="l-title">月报上报</div>
                <div class="s-title">统计分析/项目工作分析/月报上报</div>
                <div class="line"></div>
                <div class="top-buttons  zzbjsbBtn">
                    <div class="current-top-div">基本信息</div>
                    <div>机构信息</div>
                    <div>人员信息</div>
                    <div>活动与资金</div>
                    <div>其他</div>
                </div>
                <div class="yearReportInfo zzbjsb"></div>
                <div class="yearReportInfo bottom-buttons zzbjsbBtns">
                    <button class="normal-button">保存</button>
                    <button class="main-button">下一步</button>
                </div>
            </div>
            <%--特色活动--%>
            <div class="right-main hidden">
                <div class="l-title">特色亮点活动上报</div>
                <div class="s-title">统计分析/项目工作分析/活动上报</div>
                <%--主页--%>
                <div class="line"></div>
                <div class="query-title  ">查询条件</div>
                <div class="query-terms ">
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
                <div class="query-terms">
                    <label>
                        <select class="ActivityYear-select" data-searchplaceholder="--年份--">
                            <option value="0">test</option>
                        </select>
                    </label>
                    <div>
                        <button id="special-activity-query" class="main-button">查&nbsp;询</button>
                    </div>
                </div>
                <div class="statistics-buttons ">
                    <button class="main-button"><img src="<%=request.getContextPath()%>/resources/icon/5-shangbao.png">活动上报
                    </button>
                    <button class="normal-button">刷&nbsp;新</button>
                </div>
                <div class="row ">
                    <div class="col-lg-12">
                        <table id="Activity-table" class="table table-striped table-bordered table-hover">
                            <tbody></tbody>
                        </table>
                    </div>
                </div>
                <%--上报--%>
                <div class="ActivitySb">
                    <input name="id" hidden value="">
                    <label><span>*</span><span>活动名称：</span><input id="add-special-activity-name"
                                                                  class="normal-input"></label>
                    <label><span>*</span><span>所属项目：</span><select id="add-special-activity-project"></select></label>
                    <label class="notShow add-special-activity-name"><span>请输入活动名称</span></label>
                    <label class="notShow add-special-activity-project"><span>请输入所属项目</span></label>
                    <label><span>*</span><span>活动地区：</span>
                        <span id="add-special-activity-area" class="normal-input">
                                <span>
                                </span>
                                <%--添加--%>
                                <img src="<%=request.getContextPath()%>/resources/icon/3-tianjiahuodong.png">
                                <%--编辑--%>
                                <%--<a>修改</a>--%>
                            </span>
                    </label>
                    <label class="notShow add-special-activity-area"><span>请选择活动地区</span></label>
                    <div>
                        <label style="visibility: hidden">请选择活动地区</label>
                    </div>
                    <label><span>*</span><span>活动总结：</span>
                        <div id="ActivityZongjie"></div>
                    </label>
                    <label for="123"><span>*</span><span>活动图片：</span>
                        <div class="summarize">
                            <div id="uploadImgs">
                                <div><img src="<%=request.getContextPath()%>/resources/icon/tianjiakaobei2.png"></div>
                                <div><span>上传图片</span></div>
                                <div><span>jpg png</span></div>
                            </div>
                            <label for="uploadImg"><input id="uploadImg" class="hidden" type="file"
                                                          accept="image/png,image/jpeg"></label>
                        </div>
                        <input id="123" class="hidden">
                    </label>
                </div>
                <div class="ActivitySb bottom-buttons ">
                    <button id="special-activity-reporting" class="main-button">上&nbsp;&nbsp;报</button>
                    <button class="danger-button">删除活动</button>
                    <button id="special-activity-edit" class="main-button">保&nbsp;&nbsp;存</button>

                </div>
                <%--查看--%>
                <div class="ActivityCk">
                    <div class="large-title"></div>
                    <div class="details">
                        <div>
                            <label><span>*</span><span>所属项目：</span><span class="xmming"></span></label>
                            <label><span>*</span><span>活动地区：</span><span class="hdqu"></span></label>
                        </div>
                    </div>
                    <div class="query-title">活动总结<a class="download-zongjie-img">图片下载</a></div>
                    <div class="zongjie-imgs">

                    </div>
                    <div class="zongjie">

                    </div>

                </div>
            </div>
            <%--年度报表查看--%>
            <div class="right-main hidden">
                <div class="l-title"><img src="<%=request.getContextPath()%>/resources/icon/fanhui.png">报表查看</div>
                <div class="s-title">统计分析/年度报表/报表查看</div>
                <div class="line"></div>
                <div class="readReport">
                    <div class="readtitle">青春健康教育</div>
                    <div>
                        <label><span><span>*</span>面对青少年的讲座和培训场次：</span><input readonly disabled
                                                                               class="normal-input"></label>
                        <label><span><span>*</span>面对青少年的讲座和培训人数：</span><input readonly disabled
                                                                               class="normal-input"></label>
                    </div>
                    <div>
                        <label><span><span>*</span>面对家长的讲座和培训场次：</span><input readonly disabled
                                                                              class="normal-input"></label>
                        <label><span><span>*</span>面对家长的讲座和培训人数：</span><input readonly disabled
                                                                              class="normal-input"></label>
                    </div>
                    <div class="readtitle">计生特殊家庭帮扶</div>
                    <div>
                        <label><span><span>*</span>计生协组织开展的各类帮扶和服务活动场次：</span><input readonly disabled
                                                                                     class="normal-input"></label>
                        <label><span><span>*</span>计生协组织开展的各类帮扶和服务活动人数：</span><input readonly disabled
                                                                                     class="normal-input"></label>
                    </div>
                    <div>
                        <label><span><span>*</span>现有会员、志愿者与特殊家庭结对帮扶的对数：</span><input readonly disabled
                                                                                      class="normal-input"></label>
                        <label><span><span>*</span>现有相关民非组织：</span><input readonly disabled
                                                                          class="normal-input"></label>
                    </div>
                    <div class="readtitle">健康服务</div>
                    <div>
                        <label><span><span>*</span>举办生殖健康和优生优育等各类培训讲座场次：</span><input readonly disabled
                                                                                      class="normal-input"></label>
                        <label><span><span>*</span>参加培训和听讲人次：</span><input readonly disabled
                                                                           class="normal-input"></label>
                    </div>
                    <div class="readtitle">慰问救助</div>
                    <div>
                        <label><span><span>*</span>受助对象户数（人数）：</span><input readonly disabled
                                                                            class="normal-input"></label>
                        <label><span><span>*</span>慰问救助资金：</span><input readonly disabled
                                                                        class="normal-input"></label>
                    </div>
                    <div>
                        <label><span><span>*</span>圆梦微心愿个数：</span><input readonly disabled
                                                                         class="normal-input"></label>
                        <label><span><span>*</span>圆梦微心愿资金：</span><input readonly disabled
                                                                         class="normal-input"></label>
                    </div>
                    <div class="readtitle">宣传教育</div>
                    <div>
                        <label><span><span>*</span>各类主题宣传活动场次：</span><input readonly disabled
                                                                            class="normal-input"></label>
                        <label><span><span>*</span>各类主题宣传活动群众参与人数：</span><input readonly disabled
                                                                                class="normal-input"></label>
                    </div>
                    <div>
                        <label><span><span>*</span>各类主题宣传活动宣传资料发放数量：</span><input readonly disabled
                                                                                  class="normal-input"></label>
                    </div>
                </div>
            </div>
            <%--组织建设报表查看--%>
            <div class="right-main hidden">
                <div class="l-title"><img src="<%=request.getContextPath()%>/resources/icon/fanhui.png">报表查看</div>
                <div class="s-title">统计分析/组织建设报表/报表查看</div>
                <div class="line"></div>
                <div class="readReport"></div>
            </div>
            <%--人口示范点--%>
            <div class="right-main hidden">
                <div class="l-title">流动人口示范点上报</div>
                <div class="s-title">统计分析/组织建设报表/流动人口示范点上报</div>
                <div class="line"></div>
                <div class="yearReportInfo sfdInsert">
                    <label><span><span>*</span>示范点名称：</span><input class="normal-input"></label>
                    <label><span><span>*</span>示范层级：</span>
                        <label class="radio-label">
                            <input id="guojiaji" type="radio" name="cengci" value="0">
                            <label for="guojiaji">
                                <span></span>
                            </label>
                            <span>国家级</span>
                        </label>
                        <label class="radio-label">
                            <input id="shenji" type="radio" name="cengci" value="1">
                            <label for="shenji">
                                <span></span>
                            </label>
                            <span>省级</span>
                        </label>
                        <label class="radio-label">
                            <input id="dishiji" type="radio" name="cengci" value="2">
                            <label for="dishiji">
                                <span></span>
                            </label>
                            <span>地市级</span>
                        </label>
                        <label class="radio-label">
                            <input id="xianquji" type="radio" name="cengci" value="3">
                            <label for="xianquji">
                                <span></span>
                            </label>
                            <span>县区级</span>
                        </label>
                    </label>
                    <label><span style="width: 200px;text-align: right"><span>*</span>类型：</span>
                        <label class="radio-label">
                            <input id="qiye" type="radio" name="leixing" value="0">
                            <label for="qiye">
                                <span></span>
                            </label>
                            <span>企业</span>
                        </label>
                        <label class="radio-label">
                            <input id="jishi" type="radio" name="leixing" value="1">
                            <label for="jishi">
                                <span></span>
                            </label>
                            <span>集市</span>
                        </label>
                        <label class="radio-label">
                            <input id="shangquan" type="radio" name="leixing" value="2">
                            <label for="shangquan">
                                <span></span>
                            </label>
                            <span>商圈</span>
                        </label>
                        <label class="radio-label">
                            <input id="shichang" type="radio" name="leixing" value="3">
                            <label for="shichang">
                                <span></span>
                            </label>
                            <span>市场</span>
                        </label>
                        <label class="radio-label">
                            <input id="waizhu" type="radio" name="leixing" value="4">
                            <label for="waizhu">
                                <span></span>
                            </label>
                            <span>外驻</span>
                        </label>
                        <label class="radio-label">
                            <input id="shanghui" type="radio" name="leixing" value="5">
                            <label for="shanghui">
                                <span></span>
                            </label>
                            <span>商会</span>
                        </label>
                        <label class="radio-label">
                            <input id="shangchang" type="radio" name="leixing" value="6">
                            <label for="shangchang">
                                <span></span>
                            </label>
                            <span>商场</span>
                        </label>
                        <label class="radio-label">
                            <input id="qita" type="radio" name="leixing" value="7">
                            <label for="qita">
                                <span></span>
                            </label>
                            <span>其他</span>
                        </label>
                    </label>
                    <label><span><span>*</span>地址：</span><input class="normal-input"></label>
                    <label><span><span>*</span>职工总数：</span><input class="normal-input"></label>
                    <label><span><span>*</span>流动人口总数：</span><input class="normal-input"></label>
                    <label><span><span>*</span>流动人口计生协建立时间：</span><input id="ldrkTime" class="normal-input"></label>
                    <label><span><span>*</span>会员数：</span><input class="normal-input"></label>
                    <label><span><span>*</span>流动人口数（男）：</span><input class="normal-input"></label>
                    <label><span><span>*</span>流动人口数（女）：</span><input class="normal-input"></label>
                    <label><span><span>*</span>流动人口数（未婚）：</span><input class="normal-input"></label>
                    <label><span><span>*</span>流动人口数（已婚）：</span><input class="normal-input"></label>
                </div>
                <div class="yearReportInfo bottom-buttons xzldrkBtns">
                    <button class="main-button">提交</button>
                </div>
            </div>
            <div class="right-main hidden">
                <div class="l-title">流动人口示范点详情</div>
                <div class="s-title">统计分析/组织建设报表/流动人口示范点详情</div>
                <div class="line"></div>
                <div class="statistics-buttons">
                    <button class="excel-button">导&nbsp;出</button>
                </div>
                <div class="statistics-table">
                    <div class="row">
                        <div class="col-lg-12 " style="overflow-x: auto;">
                            <table id="XZLDRKREPORT">
                                <tr>
                                    <td style="font-weight: bold;font-size: 14px;" colspan="14">流动人口计生协示范点信息统计表</td>
                                </tr>
                                <tr>
                                    <td colspan="14" id="sfdName">示范点名称:</td>
                                </tr>
                                <tr>
                                    <td colspan="4" rowspan="4">示范层级</td>
                                    <td rowspan="4">类型</td>
                                    <td rowspan="4">地址</td>
                                    <td rowspan="4">职工总数</td>
                                    <td rowspan="4">流动人口总数</td>
                                    <td rowspan="4">流动人口计生协建立时间</td>
                                    <td rowspan="4">会员数</td>
                                    <td rowspan="1" colspan="4">项目单位流动人口基本信息</td>
                                </tr>
                                <tr>
                                    <td rowspan="1" colspan="2">流动人口数</td>
                                    <td rowspan="1" colspan="1">未婚</td>
                                    <td rowspan="1" colspan="1">已婚</td>
                                </tr>
                                <tr>

                                    <td rowspan="1" colspan="2">（人）</td>
                                    <td rowspan="2">（人）</td>
                                    <td rowspan="2">（人）</td>
                                </tr>
                                <tr>
                                    <td rowspan="1">男</td>
                                    <td rowspan="1">女</td>
                                </tr>
                                <tr>
                                    <td rowspan="2" colspan="1">
                                        <label>
                                            国家级
                                            <input type="radio" name="xqcj" id="ldrksfdLevel0">
                                            <span></span>
                                        </label>
                                    </td>
                                    <td rowspan="2" colspan="1">
                                        <label>
                                            省级
                                            <input type="radio" name="xqcj" id="ldrksfdLevel1">
                                            <span></span>
                                        </label>
                                    </td>
                                    <td rowspan="2" colspan="1">
                                        <label>
                                            地市级
                                            <input type="radio" name="xqcj" id="ldrksfdLevel2">
                                            <span></span>
                                        </label>
                                    </td>
                                    <td rowspan="2" colspan="1">
                                        <label>
                                            县区级
                                            <input type="radio" name="xqcj" id="ldrksfdLevel3">
                                            <span></span>
                                        </label>
                                    </td>
                                    <td rowspan="2" colspan="1">
                                        <label>企业
                                            <input type="radio" name="xqlx" id="ldrksfdType0">
                                            <span></span>
                                        </label>
                                        <label>集市
                                            <input type="radio" name="xqlx" id="ldrksfdType1">
                                            <span></span>
                                        </label>
                                        <label>商圈
                                            <input type="radio" name="xqlx" id="ldrksfdType2">
                                            <span></span>
                                        </label>
                                        <label>市场
                                            <input type="radio" name="xqlx" id="ldrksfdType3">
                                            <span></span>
                                        </label>
                                        <label>外驻
                                            <input type="radio" name="xqlx" id="ldrksfdType4">
                                            <span></span>
                                        </label>
                                        <label>商会
                                            <input type="radio" name="xqlx" id="ldrksfdType5">
                                            <span></span>
                                        </label>
                                        <label>商场
                                            <input type="radio" name="xqlx" id="ldrksfdType6">
                                            <span></span>
                                        </label>
                                        <label>其他
                                            <input type="radio" name="xqlx" id="ldrksfdType7">
                                            <span></span>
                                        </label>
                                    </td>
                                    <td rowspan="2" colspan="1" id="ldrksfdAddress">地址</td>
                                    <td rowspan="2" colspan="1" id="ldrksfdZhiGong">23</td>
                                    <td rowspan="2" colspan="1" id="ldrksfdLiuDong">32</td>
                                    <td style="white-space: nowrap" rowspan="2" colspan="1" id="ldrksfdJianLiDate">23
                                    </td>
                                    <td rowspan="2" colspan="1" id="ldrksfdHuiyuan">23</td>
                                    <td rowspan="2" colspan="1" id="ldrksfdMale">23</td>
                                    <td rowspan="2" colspan="1" id="ldrksfdFemale">23</td>
                                    <td rowspan="2" colspan="1" id="ldrksfdUnmarried">23</td>
                                    <td rowspan="2" colspan="1" id="ldrksfdMarried">23</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>


            </div>
            <%--暖心活动--%>
            <div class="right-main hidden">
                <div class="l-title">暖心活动上报</div>
                <div class="s-title">统计分析/项目工作分析/暖心活动上报</div>
                <div class="line"></div>
                <div class="yearReportInfo nxInsert">
                    <label><span><span>*</span>单位：</span><input readonly="readonly" class="normal-input"></label>
                    <label><span><span>*</span>需求调查(户)：</span><input class="normal-input"></label>
                    <label><span><span>*</span>需求调查(人)：</span><input class="normal-input"></label>
                    <label><span><span>*</span>保险理赔(例)：</span><input class="normal-input"></label>
                    <label><span><span>*</span>保险理赔金额(元)：</span><input class="normal-input"></label>
                    <label><span><span>*</span>心理健康服务(户)：</span><input class="normal-input"></label>
                    <label><span><span>*</span>心理健康服务(人)：</span><input class="normal-input"></label>
                    <label><span><span>*</span>心理健康服务建档(份)：</span><input class="normal-input"></label>
                    <label><span><span>*</span>心理健康服务评测(人)：</span><input class="normal-input"></label>
                    <label><span><span>*</span>走访慰问落实-日常走访(户)：</span><input class="normal-input"></label>
                    <label><span><span>*</span>走访慰问落实-日常走访(人)：</span><input class="normal-input"></label>
                    <label><span><span>*</span>走访慰问落实-节日看望(户)：</span><input class="normal-input"></label>
                    <label><span><span>*</span>走访慰问落实-节日看望(人)：</span><input class="normal-input"></label>
                    <label><span><span>*</span>走访慰问落实-生日陪伴(户)：</span><input class="normal-input"></label>
                    <label><span><span>*</span>走访慰问落实-生日陪伴(人)：</span><input class="normal-input"></label>
                    <label><span><span>*</span>走访慰问落实-住院探望(户)：</span><input class="normal-input"></label>
                    <label><span><span>*</span>走访慰问落实-住院探望(人)：</span><input class="normal-input"></label>
                    <label><span><span>*</span>走访慰问落实-突发事件(户)：</span><input class="normal-input"></label>
                    <label><span><span>*</span>走访慰问落实-突发事件(人)：</span><input class="normal-input"></label>
                    <label><span><span>*</span>服务活动开展(场)：</span><input class="normal-input"></label>
                    <label><span><span>*</span>服务活动开展(人)：</span><input class="normal-input"></label>
                </div>
                <div class="yearReportInfo bottom-buttons nxhuBtns">
                    <button class="main-button">提交</button>
                </div>
            </div>
            <div class="right-main hidden">
                <div class="l-title">暖心活动详情</div>
                <div class="s-title">统计分析/项目工作分析/暖心活动详情</div>
                <div class="line"></div>
                <div class="statistics-buttons">
                    <button class="excel-button">导&nbsp;出</button>
                </div>
                <div class="statistics-table">
                    <div class="row">
                        <div class="col-lg-12 " style="overflow-x: auto;">
                            <table id="NXHDREPORT">
                                <tr>
                                    <td rowspan="4" colspan="1">单位</td>
                                    <td rowspan="1" colspan="20">主要内容</td>
                                </tr>
                                <tr>
                                    <td rowspan="1" colspan="2">需求调查</td>
                                    <td rowspan="1" colspan="2">保险理赔</td>
                                    <td rowspan="1" colspan="4">心理健康服务</td>
                                    <td rowspan="1" colspan="10">走访慰问落实</td>
                                    <td rowspan="1" colspan="2">服务活动开展</td>
                                </tr>
                                <tr>
                                    <td rowspan="2" colspan="1">户</td>
                                    <td rowspan="2" colspan="1">人</td>
                                    <td rowspan="2" colspan="1">例</td>
                                    <td rowspan="2" colspan="1">金额(元)</td>
                                    <td rowspan="2" colspan="1">户</td>
                                    <td rowspan="2" colspan="1">人</td>
                                    <td rowspan="2" colspan="1">建档(份)</td>
                                    <td rowspan="2" colspan="1">测评(人)</td>
                                    <td rowspan="1" colspan="2">日常走访</td>
                                    <td rowspan="1" colspan="2">节日看望</td>
                                    <td rowspan="1" colspan="2">生日陪伴</td>
                                    <td rowspan="1" colspan="2">住院探望</td>
                                    <td rowspan="1" colspan="2">突发事件</td>
                                    <td rowspan="2" colspan="1">场</td>
                                    <td rowspan="2" colspan="1">人</td>
                                </tr>
                                <tr>
                                    <td rowspan="1" colspan="1">户</td>
                                    <td rowspan="1" colspan="1">人</td>
                                    <td rowspan="1" colspan="1">户</td>
                                    <td rowspan="1" colspan="1">人</td>
                                    <td rowspan="1" colspan="1">户</td>
                                    <td rowspan="1" colspan="1">人</td>
                                    <td rowspan="1" colspan="1">户</td>
                                    <td rowspan="1" colspan="1">人</td>
                                    <td rowspan="1" colspan="1">户</td>
                                    <td rowspan="1" colspan="1">人</td>
                                </tr>
                                <tr class="oneHeart">
                                    <td rowspan="1" colspan="1"></td>
                                    <td rowspan="1" colspan="1"></td>
                                    <td rowspan="1" colspan="1"></td>
                                    <td rowspan="1" colspan="1"></td>
                                    <td rowspan="1" colspan="1"></td>
                                    <td rowspan="1" colspan="1"></td>
                                    <td rowspan="1" colspan="1"></td>
                                    <td rowspan="1" colspan="1"></td>
                                    <td rowspan="1" colspan="1"></td>
                                    <td rowspan="1" colspan="1"></td>
                                    <td rowspan="1" colspan="1"></td>
                                    <td rowspan="1" colspan="1"></td>
                                    <td rowspan="1" colspan="1"></td>
                                    <td rowspan="1" colspan="1"></td>
                                    <td rowspan="1" colspan="1"></td>
                                    <td rowspan="1" colspan="1"></td>
                                    <td rowspan="1" colspan="1"></td>
                                    <td rowspan="1" colspan="1"></td>
                                    <td rowspan="1" colspan="1"></td>
                                    <td rowspan="1" colspan="1"></td>
                                    <td rowspan="1" colspan="1"></td>
                                </tr>
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
<div class="popBox" id="selectArea" style="display: none">
    <div class="popBox-mask"></div>
    <div class="popBox-content">
        <div class="selectRecipients-title">
            选择活动地区
            <div><img src="<%=request.getContextPath()%>/resources/icon/guanbi(1).png"></div>
        </div>
        <div class="search">
            <div>
                <span>活动地区：</span>
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
<script src="<%=request.getContextPath()%>/resources/js/statistics.js"></script>
<script>
	function buquan(num, length) {
		var numstr = num.toString();
		var l = numstr.length;
		if (numstr.length >= length) {
			return numstr;
		}

		for (var i = 0; i < length - l; i++) {
			numstr = "0" + numstr;
		}
		return numstr;
	}

	laydate.render({
		elem: "#ybTime"
	});
	laydate.render({
		elem: "#ldrkTime",
		type: "month",
		format: 'yyyy-MM',
		max: new Date().getFullYear() + '-' + buquan(new Date().getMonth() + 1, 2)
	});
	laydate.render({
		elem: ".aloneTime",
		format: 'yyyy-MM-dd',
		max: new Date().getFullYear() + '-' + buquan(new Date().getMonth() + 1, 2) + '-' + buquan(new Date().getDate(), 2)
	});
	laydate.render({
		elem: ".qianyiTime",
		format: 'yyyy-MM-dd',
		max: new Date().getFullYear() + '-' + buquan(new Date().getMonth() + 1, 2) + '-' + buquan(new Date().getDate(), 2)
	});
	laydate.render({
		elem: ".deleteTime",
		format: 'yyyy-MM-dd',
		max: new Date().getFullYear() + '-' + buquan(new Date().getMonth() + 1, 2) + '-' + buquan(new Date().getDate(), 2)
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
	var ybZongjie = new E('ybZongjie');
	ybZongjie.create()
	// var ybChenxiao = new E('ybChenxiao');
	// ybChenxiao.create()
	var ActivityZongjie = new E('ActivityZongjie');
	ActivityZongjie.create()

</script>
</html>
