<%--
  Created by IntelliJ IDEA.
  User: 斌
  Date: 2019/12/23
  Time: 14:46
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <title>杭州师范大学·师大要闻</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="keywords" content="" />
    <script>
        addEventListener("load", function () {
            setTimeout(hideURLbar, 0);
        }, false);

        function hideURLbar() {
            window.scrollTo(0, 1);
        }
    </script>

    <!-- css文件 -->
    <link href="<%=request.getContextPath()%>/resources/css/bootstrap.css" rel='stylesheet' type='text/css' />
    <link href="<%=request.getContextPath()%>/resources/css/style.css" rel='stylesheet' type='text/css' /><!-- custom css -->
    <link href="<%=request.getContextPath()%>/resources/css/font-awesome.min.css" rel="stylesheet">
</head>


<body>
<header>
    <div class="container">
        <!-- 导航栏 -->
        <nav class="pt-2">
            <div id="logo">
                <a href="<%=request.getContextPath()%>/"><img src="<%=request.getContextPath()%>/resources/images/hznu.png"></a>
            </div>
            <ul class="menu mt-md-2 ml-auto">
                <li class="mr-lg-4 mr-2 active"><a href="<%=request.getContextPath()%>/">首页</a></li>
                <li class="mr-lg-4 mr-2"><a href="<%=request.getContextPath()%>/general">学校概况</a></li>
                <li class="mr-lg-4 mr-2"><a href="<%=request.getContextPath()%>/mechanism">机构设置</a></li>
                <li class="mr-lg-4 mr-2"><a href="<%=request.getContextPath()%>/teachers">师资队伍</a></li>
                <li class="mr-lg-4 mr-2"><a href="<%=request.getContextPath()%>/discipline">学科建设</a></li>
            </ul>
        </nav>
        <!-- //导航栏 -->
    </div>
</header>
<!-- //导航 -->

<!-- 图片滚动 -->
<section class="banner position-relative" id="home">
    <div class="container">
        <div class="banner-text">
            <div class="slider-info">
                <div class="agileinfo-logo mt-lg-5">
                    <h2>师大要闻</h2>
                </div>
            </div>
        </div>
        <div class="choose text-center position-absolute d-lg-flex">
            <div class="choose-icon">
                <img src="<%=request.getContextPath()%>/resources/images/11.png">
                <div class=" choose-grid">
                    <h3 class="mt-4">2019.12.19</h3>
                    <p class="">《Science Translational...</p>
                </div>
            </div>
            <div class="choose-icon">
                <img src="<%=request.getContextPath()%>/resources/images/2.jpg">
                <div class="choose-grid">
                    <h3 class="mt-4">2019.12.18</h3>
                    <p class="">学校召开2019年招生就业工作会议</p>
                </div>
            </div>
            <div class="choose-icon">
                <img src="<%=request.getContextPath()%>/resources/images/4.jpg">
                <div class="choose-grid">
                    <a href="content.html">
                        <h3 class="mt-4">2019.12.17</h3>
                        <p class="">张杭君教授获“2019年浙江省有突出贡献青年科...</p></a>
                </div>
            </div>
            <div class="choose-icon">
                <img src="<%=request.getContextPath()%>/resources/images/3.jpg">
                <div class="choose-grid">
                    <h3 class="mt-4">2019.12.16</h3>
                    <p class="">学校召开2019年情况通报会</p>
                </div>
            </div>
            <div class="choose-icon mr-0">
                <img src="<%=request.getContextPath()%>/resources/images/5.jpg">
                <div class="choose-grid">
                    <h3 class="mt-4">2019.12.16</h3>
                    <p class="">陈春雷率团访问南非、坦桑尼亚高校</p>
                </div>
            </div>
            <div class="clearfix"></div>
        </div>
    </div>
</section>
<div class="clearfix"></div>
<!-- //图片滚动 -->
<!-- 第一块 -->
<section class="services py-5 bg-clr" id="services">
    <div class="container py-lg-5">
        <div class="row mt-lg-5">
            <div class="col-xl-4 col-lg-4 col-md-6 col-sm-12 mb-md-0 mb-4">
                <h4 class="heading mt-3 ml-3"><br>2019.12<br>新闻</h4>
            </div>
            <div class="col-xl-4 col-lg-4 col-md-6 col-sm-12">
                <div class="our-services-wrapper mb-60">
                    <div class="services-inner">
                        <div class="our-services-text">
                            <h4>2019.12.19</h4>
                            <p>《Science Translational Medicine》发表医学院谢恬教授国际合作研究成果...</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xl-4 col-lg-4 col-md-6 col-sm-12">
                <div class="our-services-wrapper mb-60">
                    <div class="services-inner">
                        <div class="our-services-text">
                            <h4>2019.12.18</h4>
                            <p>学校召开2019年招生就业工作会议<br>12月17日下午，学校召开2019年招生就业工作会议，就招生就业工作进行...</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xl-4 col-lg-4 col-md-6 col-sm-12">
                <div class="our-services-wrapper mb-60">
                    <div class="services-inner">
                        <div class="our-services-text">
                            <a href="content.html">
                                <h4>2019.12.17</h4>
                                <p>张杭君教授获“2019年浙江省有突出贡献青年科技人才”称号<br>近日，浙江省科学技术协会公布2019...</p>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xl-4 col-lg-4 col-md-6 col-sm-12">
                <div class="our-services-wrapper mb-60">
                    <div class="services-inner">
                        <div class="our-services-text">
                            <h4>2019.12.16</h4>
                            <p>学校召开2019年情况通报会<br>12月16日上午，2019年学校情况通报会在玉皇山校区举行。校党委书记...</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xl-4 col-lg-4 col-md-6 col-sm-12">
                <div class="our-services-wrapper mb-60">
                    <div class="services-inner">
                        <div class="our-services-text">
                            <h4>2019.12.16</h4>
                            <p>陈春雷率团访问南非、坦桑尼亚高校<br>12月4日至11日，校党委书记陈春雷受邀率团访问南非、坦桑尼亚合作高校...</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xl-4 col-lg-4 col-md-6 col-sm-12">
                <div class="our-services-wrapper mb-60">
                    <div class="services-inner">
                        <div class="our-services-text">
                            <h4>2019.12.12</h4>
                            <p>人文学院学生“老字号立法”调研项目获省委常委、市委书记周江勇批示<br>近日，由我校学生撰写的《大学生...</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xl-4 col-lg-4 col-md-6 col-sm-12">
                <div class="our-services-wrapper mb-60">
                    <div class="services-inner">
                        <div class="our-services-text">
                            <h4>2019.12.11</h4>
                            <p>【星耀师大】聚焦“美”，一直在路上<br>编者按：总有一种力量让我们热泪盈眶，总有一种感动让我们深刻铭记...</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xl-4 col-lg-4 col-md-6 col-sm-12">
                <div class="our-services-wrapper mb-60">
                    <div class="services-inner">
                        <div class="our-services-text">
                            <h4>2019.12.10</h4>
                            <p>我校师范生在首届长三角师范生教学基本功大赛中获佳绩<br>12月8日，由安徽省教育厅、浙江省教...</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
<!-- //第一块 -->
<!--内容-->
<section class="banner-bottom-w3layouts py-5" id="blog">
    <div class="container">
        <div class="inner-sec-w3ls py-lg-5 py-md-3">
            <div class="row blog-sec">
                <div class="col-lg-4 manager-img mb-lg-0 mb-4">
                    <h4 class="heading"><br>2019.11<br>新闻</h4>
                </div>
                <div class="col-lg-4 col-md-6 about-in blog-grid-info text-left">
                    <div class="card img">
                        <div class="card-body img">
                            <img src="<%=request.getContextPath()%>/resources/images/11.png" alt="" class="img-fluid">
                            <div class="blog-des mt-3">
                                <h5 class="card-title mt-4">2019.12.19</h5>
                                <p class="card-text">《Science Translational Medicine》发表医学院谢恬教授国际合作研究成果...
                                </p>
                                <a href="#">更多详情</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6 about-in blog-grid-info text-left mt-md-0 mt-5">
                    <div class="card img">
                        <div class="card-body img">
                            <img src="<%=request.getContextPath()%>/resources/images/2.jpg" alt="" class="img-fluid">
                            <div class="blog-des mt-3">
                                <h5 class="card-title mt-4">2019.12.18</h5>
                                <p class="card-text">学校召开2019年招生就业工作会议<br>12月17日下午，学校召开2019年招生就业...
                                </p>
                                <a href="#">更多详情</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6 about-in blog-grid-info text-left mt-md-0 mt-5">
                    <div class="card img">
                        <div class="card-body img">
                            <img src="<%=request.getContextPath()%>/resources/images/4.jpg" alt="" class="img-fluid">
                            <div class="blog-des mt-3">
                                <h5 class="card-title mt-4">2019.12.17</h5>
                                <p class="card-text">张杭君教授获“2019年浙江省有突出贡献青年科技人才”称号...
                                </p>
                                <a href="content.html">更多详情</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6 about-in blog-grid-info text-left mt-md-0 mt-5">
                    <div class="card img">
                        <div class="card-body img">
                            <img src="<%=request.getContextPath()%>/resources/images/3.jpg" alt="" class="img-fluid">
                            <div class="blog-des mt-3">
                                <h5 class="card-title mt-4">2019.12.16</h5>
                                <p class="card-text">学校召开2019年情况通报会<br>12月16日上午，2019年学校情况通报会在...
                                </p>
                                <a href="#">更多详情</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6 about-in blog-grid-info text-left mt-md-0 mt-5">
                    <div class="card img">
                        <div class="card-body img">
                            <img src="<%=request.getContextPath()%>/resources/images/5.jpg" alt="" class="img-fluid">
                            <div class="blog-des mt-3">
                                <h5 class="card-title mt-4">2019.12.16</h5>
                                <p class="card-text">陈春雷率团访问南非、坦桑尼亚高校<br>12月4日至11日，校党委书记陈春雷受邀率...
                                </p>
                                <a href="#">更多详情</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
<!--//内容-->

<!-- 页脚 -->
<div class="footer footer_w3layouts_section_1its py-5" id="subscribe">
    <div class="container pt-sm-4">
        <div class="row footer-grid">
            <div class="col-md-5 footer-grid_section_1its_w3">
                <div class="footer-title">
                    <h3>HZNU</h3>
                </div>
                <div class="footer-text">
                    <p>地址：浙江省杭州市余杭区仓前街道余杭塘路2318号</p>
                    <p>联系电话：0571-28865012</p>
                    <p>邮编：311121</p>
                </div>
            </div>
            <div class="col-md-3 col-sm-5 footer-grid_section_1its_w3 mt-md-0 mt-4">
                <ul class="links">
                    <li><a href="#">师大要闻</a></li>
                    <li><a href="#">通知公告</a></li>
                    <li><a href="#">教学科研</a></li>
                    <li><a href="#">党建文化</a></li>
                    <li><a href="#">媒体师大</a></li>
                    <li><a href="#">学术预告</a></li>
                </ul>
            </div>
            <div class="col-md-4 col-sm-7 footer-grid_section_1its_w3 mt-md-0 mt-4">
                <div class="footer-title">
                    <h3>招生热线</h3>
                </div>
                <div class="footer-text">
                    <p>本科招生热线: 0571-28865193</p>
                    <p>研究生招生热线：0571-28865143</p>
                    <form action="#" method="post">
                        <input type="email" placeholder="搜索" required="">
                        <button class="btn1"><i class="fa fa-paper-plane" aria-hidden="true"></i></button>
                        <div class="clearfix"> </div>
                    </form>
                </div>
            </div>
            <div class="clearfix"></div>
        </div>
        <!-- 回到顶部 -->
        <div class="move-to-top text-center">
            <a href="#home" class="move-top"><span class="fa fa-angle-double-up" aria-hidden="true"></span></a>
        </div>
        <!-- //回到顶部 -->
        <div class="copyright">
            <p>Copyright &copy;杭州师范大学2019</p>
        </div>
    </div>
</div>
<!-- //页脚 -->

</body>
</html>