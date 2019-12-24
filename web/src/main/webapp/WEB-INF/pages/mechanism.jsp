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
    <title>机构设置</title>
    <link rel="shortcut icon" href="<%=request.getContextPath()%>/resources/images/favicon.png" />
    <link href="<%=request.getContextPath()%>/resources/css/manage/min.css" rel="stylesheet" type="text/css">
    <link href="<%=request.getContextPath()%>/resources/css/manage/sans.css" rel="stylesheet" type="text/css">
    <link href="<%=request.getContextPath()%>/resources/css/manage/font-awesome.css" rel="stylesheet" type="text/css">
    <link href="<%=request.getContextPath()%>/resources/css/manage/icons.css" rel="stylesheet" type="text/css">
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
                    机构<span>设置</span>
                </a>
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
                </ul>
            </div>
        </div>
    </nav>
</header>
<div class="clear"></div>
<div id="page-content">
    <section class="breadcrumb">
        <div class="container">
            <h2>机关部处</h2>
            <ul>
                <li><a href="index.html">首页</a> &gt;</li>
                <li><a href="#">机构设置</a> &gt;</li>
                <li><a href="#">机关部处</a></li>
            </ul>
        </div>
    </section>
    <section class="blog-page">
        <div class="container">
            <div class="row">
                <div class="col-sm-8">
                    <div class="single-post">
                        <i class="fa fa-2x fa-user"></i>
                        <h2 class="blog-title in">学校办公室</h2>
                        <br>
                        <i class="fa fa-2x fa-user"></i>
                        <h2 class="blog-title in">党委组织部</h2>
                        <br>
                        <i class="fa fa-2x fa-user"></i>
                        <h2 class="blog-title in">党委宣传部（新闻中心）</h2>
                        <br>
                        <i class="fa fa-2x fa-user"></i>
                        <h2 class="blog-title in">党委统战部</h2>
                        <br>
                        <i class="fa fa-2x fa-user"></i>
                        <h2 class="blog-title in">纪检监察室</h2>
                        <br>
                        <i class="fa fa-2x fa-user"></i>
                        <h2 class="blog-title in">发展与改革处</h2>
                        <br>
                        <i class="fa fa-2x fa-user"></i>
                        <h2 class="blog-title in">人事处（人才工作办公室）</h2>
                        <br>
                        <i class="fa fa-2x fa-user"></i>
                        <h2 class="blog-title in">教务处</h2>
                        <br>
                        <i class="fa fa-2x fa-user"></i>
                        <h2 class="blog-title in">科学研究院</h2>
                        <br>
                        <i class="fa fa-2x fa-user"></i>
                        <h2 class="blog-title in">党委学生工作处</h2>
                        <br>
                        <i class="fa fa-2x fa-user"></i>
                        <h2 class="blog-title in">研究生院</h2>
                    </div>
                </div>
                <div class="col-sm-4">
                    <div class="blog-post">
                        <!-- Categories -->
                        <h2>机构设置</h2>
                        <ul class="category-post">
                            <li>
                                <a href="#">
                                    <div class="inline-text">
                                        <i class="fa fa-circle"></i>
                                        <h4>机关部处</h4>
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <div class="inline-text">
                                        <i class="fa fa-circle-thin"></i>
                                        <h4>群团组织</h4>
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <div class="inline-text">
                                        <i class="fa fa-circle-thin"></i>
                                        <h4>直属单位</h4>
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <div class="inline-text">
                                        <i class="fa fa-circle-thin"></i>
                                        <h4>教学科研单位</h4>
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <div class="inline-text">
                                        <i class="fa fa-circle-thin"></i>
                                        <h4>附属单位</h4>
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <div class="inline-text">
                                        <i class="fa fa-circle-thin"></i>
                                        <h4>研究机构</h4>
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
