<%--
  Created by IntelliJ IDEA.
  User: 斌
  Date: 2019/12/23
  Time: 21:36
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
                    学校<span>概况</span>
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
            <h2>学校简介</h2>
            <ul>
                <li><a href="index.html">首页</a> &gt;</li>
                <li><a href="#">学校概况</a> &gt;</li>
                <li><a href="#">学校简介</a></li>
            </ul>
        </div>
    </section>
    <section class="blog-page">
        <div class="container">
            <div class="row">
                <div class="col-sm-8">
                    <div class="single-post">
                        <div class="blog-img">
                            <a href="">
                                <img src="<%=request.getContextPath()%>/resources/images/gaik/jianj.jpg" class="img-responsive">
                            </a>
                            <h2 class="blog-title">杭师大精神：包容开放、学与俱进、追求卓越</h2>
                            <p>杭州师范大学是一所以教师教育、艺术教育为特色，文理基础学科为主，新兴应用学科迅速发展，多学科协调并进的地方综合性大学，是浙江省重点建设高校。学校前身可追溯至创建于1908年的全国六大高等师范学堂之一的浙江官立两级师范学堂。1978年建立杭州师范学院，2000年前后杭州教育学院等五校相继并入，2007年更名为杭州师范大学。</p>

                            <p>百十年办学历程中，杭师大人秉承首任校长经亨颐倡导的“与时俱进”办学方针，坚持“勤慎诚恕、博雅精进”校训传承，弘扬“包容开放、学与俱进、追求卓越”师大精神，始终与时代同呼吸、与民族共命运，弘文励教、青蓝相继，自强不息、弦歌不辍，形成“人文学堂，艺术校园”办学特色。李叔同、夏丏尊、朱自清、叶圣陶等名师大家曾在校任教，培养出了丰子恺、潘天寿、陈建功等各领域成绩斐然的杰出校友，成为当时浙江新文化运动策源地、最早传播民主科学思想主阵地，是中国现代教育、近代中国艺术教育及中国共产党早期活动的发祥地之一。沐浴着改革开放春风，学校紧跟时代发展步伐，办学能力水平不断提升，新时代涌现出了中国科学院院士蔡荣根、数字经济创新者马云等一大批优秀人才。</p>

                            <p>学校环境优美、风光秀丽，现有仓前、玉皇山、下沙三个校区，分别位于杭州未来科技城、西湖之滨和钱塘江畔，占地面积198.9万平方米。学校下设19个学院、1个公共教学单位、1个直属附属医院（杭州市第二人民医院），有全日制在校生20280人（不含独立学院），全日制硕士生2724人、博士生40人，留学生495人。现有教职工2271人，专任教师1558人（高级职称占比近56%），共享院士、教育部长江学者、国家杰出青年科学基金获得者等国家和省级高层次人才近80人，享受国务院津贴者21人，全国优秀教师3人，学校入选首批省海外高层次人才创新创业基地。</p>

                            <p>2008年，杭州市委、市政府出台了《关于支持杭州师范大学建设一流综合性大学的若干意见》（市委〔2008〕12号），大力支持学校建设和发展，学校迎来了事业发展黄金期。通过全校师生勠力同心，各界鼎力支持，学校被认为是近十年来全国发展最快的地方高校之一。现有服务国家特殊需求博士人才培养项目1个，一级学科硕士点24个，硕士专业学位授权类别16个，获得优秀应届本科毕业生推荐免试攻读研究生普通高等学校资格。化学、临床医学、植物学与动物学、神经与行为科学4个学科进入ESI全球前1%，ESI综合排名连续多年进入全国百强，有省一流学科14个（A类8个、B类6个）。国家自然科学基金和国家社会科学基金立项数位居省内高校前列，2012年以来更是获得了国家重大科学研究计划项目、国家重点研发计划项目各1项。高水平论文数逐年上升，论文自然指数（NI）连续三年进入中国内地高校百强。</p>
                        </div>
                    </div>
                </div>
                <div class="col-sm-4">
                    <div class="blog-post">
                        <!-- Categories -->
                        <h2>学校概况</h2>
                        <ul class="category-post">
                            <li>
                                <a href="#">
                                    <div class="inline-text">
                                        <i class="fa fa-circle"></i>
                                        <h4>学校简介</h4>
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <div class="inline-text">
                                        <i class="fa fa-circle-thin"></i>
                                        <h4>学校领导</h4>
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <div class="inline-text">
                                        <i class="fa fa-circle-thin"></i>
                                        <h4>校园风光</h4>
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <div class="inline-text">
                                        <i class="fa fa-circle-thin"></i>
                                        <h4>师大精神</h4>
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <div class="inline-text">
                                        <i class="fa fa-circle-thin"></i>
                                        <h4>校训校歌</h4>
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
