<%--
  Created by IntelliJ IDEA.
  User: 斌
  Date: 2019/12/23
  Time: 21:37
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>学校概况</title>
    <link rel="shortcut icon" href="<%=request.getContextPath()%>/resources/images/favicon.png" />
    <link href="<%=request.getContextPath()%>/resources/css/manage/min.css" rel="stylesheet" type="text/css">
    <link href="<%=request.getContextPath()%>/resources/css/manage/sans.css" rel="stylesheet" type="text/css">
    <link href="<%=request.getContextPath()%>/resources/css/manage/font-awesome.css" rel="stylesheet" type="text/css">
    <link href="<%=request.getContextPath()%>/resources/css/manage/icons.css" rel="stylesheet" type="text/css">
    <!--[if lt IE 8]><!-->
    <link rel="stylesheet" href="ie7/ie7.css">
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
                    师资<span>队伍</span>
                </a>
            </div>
            <div class="collapse navbar-collapse navbar-main-collapse">
                <ul class="nav navbar-nav navbar-right">
                    <li>
                        <a href="<%=request.getContextPath()%>/">首页</a>
                    </li>
                    <li>
                        <a href="<%=request.getContextPath()%>/general">学校概况</a>
                    </li>
                    <li>
                        <a href="<%=request.getContextPath()%>/mechanism">机构设置</a>
                    </li>
                    <li>
                        <a href="<%=request.getContextPath()%>/teachers">师资队伍</a>
                    </li>
                    <li>
                        <a href="<%=request.getContextPath()%>/discipline">学科建设</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</header>
<div class="clear"></div>
<div id="page-content">
    <section class="breadcrumb">
        <div class="container">
            <h2>名师访谈</h2>
            <ul>
                <li><a href="index.html">首页</a> &gt;</li>
                <li><a href="#">师资队伍</a> &gt;</li>
                <li><a href="#">名师访谈</a></li>
            </ul>
        </div>
    </section>
    <section class="blog-page">
        <div class="container">
            <div class="row">
                <div class="col-sm-8">
                    <div class="single-post">
                        <h2 class="blog-title">师大名师系列报道(二十)：刘志培</h2>
                        <div class="blog-meta">2010-11-30 <a href="">刘禹婷、褚燕清</a></div>
                        <p>听，青春的交响——记华裔指挥家、我校交响乐团艺术总监和首席指挥刘志培教授</p>
                        <div class="blog-btn">
                            <a href="#" class="btn-default">阅读更多</a>
                        </div>
                    </div>
                    <div class="single-post">
                        <h2 class="blog-title">师大名师系列报道(十九)：颜钟祜</h2>
                        <div class="blog-meta">2010-11-19 <a href="">学通社记者 刘禹婷 曹馨月</a></div>
                        <p>用包容的眼光探寻文明——记我校外籍专家颜钟祜博士</p>
                        <div class="blog-btn">
                            <a href="#" class="btn-default">阅读更多</a>
                        </div>
                    </div>
                    <div class="single-post">
                        <h2 class="blog-title">师大名师系列报道(十七)：蔡大生</h2>
                        <div class="blog-meta">2010-06-23  <a href="">宣宗 刘禹婷</a></div>
                        <p>用音乐书写人生 ——记华人歌唱家、我校特聘教授蔡大生</p>
                        <div class="blog-btn">
                            <a href="#" class="btn-default">阅读更多</a>
                        </div>
                    </div>
                    <div class="single-post">
                        <h2 class="blog-title">师大名师系列报道(十五)：匡廷云</h2>
                        <div class="blog-meta">2010-05-31 <a href="">姚婧雯</a></div>
                        <p>无论是一株不起眼的小草还是一棵参天古木，它们总要通过光合作用获得成长。</p>
                        <div class="blog-btn">
                            <a href="#" class="btn-default">阅读更多</a>
                        </div>
                    </div>
                </div>
                <div class="col-sm-4">
                    <div class="blog-post">
                        <!-- Categories -->
                        <h2>名师队伍</h2>
                        <ul class="category-post">
                            <li>
                                <a href="#">
                                    <div class="inline-text">
                                        <i class="fa fa-circle"></i>
                                        <h4>名师访谈</h4>
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <div class="inline-text">
                                        <i class="fa fa-circle-thin"></i>
                                        <h4>师资队伍</h4>
                                    </div>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </section>
</div>
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
<script src="<%=request.getContextPath()%>/resources/js/jquery.min.js"></script>
<script src="<%=request.getContextPath()%>/resources/js/bootstrap.min.js"></script>
<script src="<%=request.getContextPath()%>/resources/js/content/bootstrap-hover-dropdown.min.js"></script>
<script src="<%=request.getContextPath()%>/resources/js/manage/custom.js"></script>
</body>

</html>
