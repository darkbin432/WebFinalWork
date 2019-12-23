<%--
  Created by IntelliJ IDEA.
  User: 斌
  Date: 2019/12/23
  Time: 11:12
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">
    <title>Home</title>
    <link rel="shortcut icon" href="<%=request.getContextPath()%>/resources/images/favicon.png" />
    <link href="<%=request.getContextPath()%>/resources/css/manage/min.css" rel="stylesheet" type="text/css">
    <link href="<%=request.getContextPath()%>/resources/css/manage/sans.css" rel="stylesheet" type="text/css">
    <link href="<%=request.getContextPath()%>/resources/css/manage/font-awesome.css" rel="stylesheet" type="text/css">
    <link href="<%=request.getContextPath()%>/resources/css/manage/icons.css" rel="stylesheet" type="text/css">

    <link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/resources/css/easy-responsive-tabs.css " />
    <link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/resources/css/flexslider.css " />
    <link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/resources/css/owl.carousel.css">
    <!--[if lt IE 8]><!-->
    <link rel="stylesheet" href="<%=request.getContextPath()%>/resources/ie7/ie7.css">
    <!--<![endif]-->
    <link href="<%=request.getContextPath()%>/resources/css/manage/style-m.css" rel="stylesheet" type="text/css">
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
    <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
</head>

<body data-spy="scroll" data-target=".navbar-fixed-top">
<header>
    <div class="top-bar">
        <div class="container">
            <div class="row">
                <div class="col-sm-6 address">
                    <img src="<%=request.getContextPath()%>/resources/images/hznu.png" alt="" class="tb">
                </div>
                <div class="col-sm-6 social">
                    <ul>
                        <li><a href="#"><i class="fa fa-weixin"></i></a></li>
                        <li><a href="#"><i class="fa fa-weibo"></i></a></li>
                        <li><a href="#"><i class="fa fa-qq"></i></a></li>
                        <li><a href="#"><i class="fa  fa-share-alt"></i></a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <nav class="navbar navbar-custom navbar-fixed-top" role="navigation">
        <div class="container">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-main-collapse">
                    <i class="fa fa-bars"></i>
                </button>
                <a class="navbar-brand" href="index.html">
                    师大<span>要闻</span>
                </a>
                <p>首页<b>&gt师大要闻</b></p>
            </div>
            <div class="collapse navbar-collapse navbar-main-collapse">
                <ul class="nav navbar-nav navbar-right">
                    <li>
                        <a href="default.html">首页</a>
                    </li>
                    <li>
                        <a href="gaik.html">学校概况</a>
                    </li>
                    <li>
                        <a href="jigou.html">机构设置</a>
                    </li>
                    <li>
                        <a href="shizi.html">师资队伍</a>
                    </li>
                    <li>
                        <a href="xueke.html">学科建设</a>
                    </li>
                    <li>
                        <a href="#" class="btn-default">新闻首页</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</header>
<div class="clear"></div>
<div id="page-content">
    <section class="flexslider">
        <img src="<%=request.getContextPath()%>/resources/images/content--bg.png" />
    </section>
</div>
<section class="blog-page">
    <div class="container">
        <div class="row">
            <div class="col-sm-8">
                <div class="single-post">
                    <div class="blog-img">
                        <a href="">
                            <img src="<%=request.getContextPath()%>/resources/images/4.jpg" class="img-responsive">
                        </a>
                    </div>
                    <h2 class="blog-title">张杭君教授获“2019年浙江省突出贡献青年科技人才”称号</h2>
                    <div class="blog-meta">
                        <a href="" class="ml-0"><i class="blue-text fa fa-calendar"></i>2019-12-17 </a>
                        <a href=""><i class="blue-text fa fa-user"></i>曾红月</a>
                        <a href=""><i class="blue-text fa fa-eye"></i>2204</a>
                    </div>
                    <p>近日，浙江省科学技术协会公布2019年浙江省有突出贡献青年科技人才名单，我校生命与环境科学学院张杭君教授入选。</p>

                    <p>张杭君现任生命与环境科学学院执行院长，浙江省生态学会湿地专业委员会主任，浙江省环境科学学会城市生态专业委员会主任，浙江省生态学会常务理事，浙江省环境科学学会副理事长。主要研究方向为典型环境污染物生态风险和生态修复技术。曾入选浙江省中青年学科带头人，杭州市“131”人才重点资助层次。以第一完成人获2017年浙江省科技进步二等奖1项，以第一作者和通讯作者在Environmental Pollution、Aquatic Toxicology等期刊上发表SCI论文40篇，以第一完成人授权国家发明专利20项。</p>

                    <p>据悉，浙江省有突出贡献青年科技人才选拨工作每两年开展一次，在“重实绩、重成果、重贡献”的原则下，旨在激发广大青年科技工作者的创新创造热情，表扬为我省经济建设、社会发展和科技进步做出突出贡献的青年科技人才。此次全省共20位优秀专业技术人才和高技能人才获得该荣誉。</p>
                </div>
            </div>
            <div class="col-sm-4">
                <div class="blog-post">
                    <h2>相关新闻</h2>
                    <ul class="recent-post">
                        <li class="border-bottom">
                            <a href="#"><h5>陈春雷率团访问南非、坦桑尼亚高校</h5></a>
                            <h6>2019-12-16 </h6>
                        </li>
                        <li class="border-bottom">
                            <a href="#"><h5>【星耀师大】聚焦“美”，一直在路上</h5></a>
                            <h6>2019-12-11 </h6>
                        </li>
                        <li class="border-bottom">
                            <a href="#"><h5>周江勇来校宣讲党的十九届四中全会精神</h5></a>
                            <h6>2019-11-29 </h6>
                        </li>
                    </ul>
                    <!-- Tags -->
                    <h2>类型</h2>
                    <div class="tags">
                        <a href="">师大要闻</a>
                        <a href="">通知公告</a>
                        <a href="">党建文化</a>
                        <a href="">媒体师大</a>
                        <a href="">教学科研</a>
                        <a href="">学术预告</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
<div class="clear"></div>
<footer>
    <div class="container">
        <div class="row contact-sec">
            <div class="col-md-5 col-lg-5">
                <h2><span>HZNU</span></h2>
                <div class="row">
                    <div class="col-sm-6">
                        <p>地址：浙江省杭州市余杭区仓前街道余杭塘路2318号<br/>联系电话：0571-28865012</p>
                    </div>
                    <div class="col-sm-6">
                        <ul>
                            <li>邮编：311121</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="col-md-5 col-lg-5 col-md-offset-2 col-lg-offset-2">
                <h2><span>招生热线</span></h2>
                <div class="row">
                    <div class="col-sm-6">
                        <p>本科招生热线: 0571-28865193
                            <br/>研究生招生热线：0571-28865143</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="copyright">
        <div class="container">
            <div class="row">
                <div class="col-sm-6 col-md-6 col-lg-6">
                    Copyright &copy; 2019 杭州师范大学
                </div>
            </div>
        </div>
    </div>
</footer>
<div class="clear"></div>
<script src="<%=request.getContextPath()%>/resources/js/jquery.min.js"></script>
<script src="<%=request.getContextPath()%>/resources/js/bootstrap.min.js"></script>
<script src="<%=request.getContextPath()%>/resources/js/content/bootstrap-hover-dropdown.min.js"></script>
<script src="<%=request.getContextPath()%>/resources/js/manage/custom.js"></script>

<script src="<%=request.getContextPath()%>/resources/js/content/jquery.easing.min.js"></script>
<script src="<%=request.getContextPath()%>/resources/js/content/jquery.validate.min.js"></script>
<script src="<%=request.getContextPath()%>/resources/js/content/jquery.flexslider-min.js"></script>
<script src="<%=request.getContextPath()%>/resources/js/content/easyResponsiveTabs.js"></script>
<script src="<%=request.getContextPath()%>/resources/js/content/owl.carousel.js"></script>
</body>

</html>

