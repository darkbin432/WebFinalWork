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
    <link href="<%=request.getContextPath()%>/resources/ace/css/ace.css" class="ace-main-stylesheet" id="main-ace-style" rel="stylesheet" type="text/css"/>
    <link href="<%=request.getContextPath()%>/resources/css/common.css" rel="stylesheet" type="text/css">
    <link href="<%=request.getContextPath()%>/resources/css/index.css" rel="stylesheet" type="text/css">
    <script src="<%=request.getContextPath()%>/resources/ace/js/jquery.js"></script>
    <script>
		document.onreadystatechange=function(){
			if(document.readyState=="complete"){
				$(".myContainer>div").removeClass("hidden");
				$(".loading").css("display","none");
			}
		}
    </script>
</head>
<body>
<%@ include file="include/header.jsp" %>
<div class="myContainer">
    <div class="hidden">
        <div class="myButtons">
            <div class="myButton" onclick="window.open('task')">
                <img src="<%=request.getContextPath()%>/resources/icon/icona.png">
                <span>我的工作</span>
            </div>
            <div class="myButton" onclick="window.open('officialdocument')">
                <img style="width: 56px" src="<%=request.getContextPath()%>/resources/icon/gongwenicon.png">
                <span>公文管理</span>
            </div>
            <div class="myButton" onclick="window.open('approval')">
                <img src="<%=request.getContextPath()%>/resources/icon/iconb.png">
                <span>我的审批</span>
                <div class="tip hidden"></div>
            </div>
            <div class="myButton" onclick="window.open('mail')">
                <img src="<%=request.getContextPath()%>/resources/icon/iconc.png">
                <span>收发邮件</span>
                <div class="tip hidden"></div>
            </div>
            <div class="myButton" id="education">
                <img src="<%=request.getContextPath()%>/resources/icon/icond.png">
                <span>健康宣教</span>
            </div>
            <div class="myButton"  id="tsld">
                <img src="<%=request.getContextPath()%>/resources/icon/icone.png">
                <span>特色亮点</span>
            </div>
        </div>
    </div>
    <div class="myInfos hidden">
        <div class="infos">
            <div class="info" id="announcement">
                <div class="info-top">
                    <span class="info-title">通知公告</span>
                    <div>
                        <span class="info-more" id="moreGg">查看更多</span>
                        <img src="<%=request.getContextPath()%>/resources/icon/zuohua.png">
                    </div>
                </div>
                <div class="announcement-row">
                    <div><a></a></div>
                    <div></div>
                </div>
                <div class="info-line"></div>
                <div class="announcement-row">
                    <div><a></a></div>
                    <div></div>
                </div>
                <div class="info-line"></div>
                <div class="announcement-row">
                    <div><a></a></div>
                    <div></div>
                </div>
                <div class="info-line"></div>
                <div class="announcement-row">
                    <div><a></a></div>
                    <div></div>
                </div>
                <div class="info-line"></div>
                <div class="announcement-row">
                    <div><a></a></div>
                    <div></div>
                </div>
            </div>
            <div class="info" id="mail">
                <div class="info-top">
                    <span class="info-title">我的邮件</span>
                    <div>
                        <span class="info-more" onclick="window.open('mail')">查看更多</span>
                        <img src="<%=request.getContextPath()%>/resources/icon/zuohua.png">
                    </div>
                </div>
                <div class="mail-row">
                    <div></div>
                    <span></span>
                    <span></span>
                    <span></span>
                    <div></div>
                </div>
                <div class="info-line"></div>
                <div class="mail-row">
                    <div></div>
                    <span></span>
                    <span></span>
                    <span></span>
                    <div></div>
                </div>
                <div class="info-line"></div>
                <div class="mail-row">
                    <div></div>
                    <span></span>
                    <span></span>
                    <span></span>
                    <div></div>
                </div>
                <div class="info-line"></div>
                <div class="mail-row">
                    <div></div>
                    <span></span>
                    <span></span>
                    <span></span>
                    <div></div>
                </div>
                <div class="info-line"></div>
                <div class="mail-row">
                    <div></div>
                    <span></span>
                    <span></span>
                    <span></span>
                    <div></div>
                </div>
            </div>
        </div>
        <div class="infos">
            <div class="info" id="zixun">
                <div class="info-top">
                    <span class="info-title">信息资讯</span>
                    <div>
                        <span class="info-more" id="moreZx">查看更多</span>
                        <img src="<%=request.getContextPath()%>/resources/icon/zuohua.png">
                    </div>
                </div>
                <div class="information-row">
                    <div></div>
                    <div class="information-content">
                        <div></div>
                        <div class="information-main">
                            <div></div>
                            <div></div>
                        </div>
                    </div>
                </div>
                <div class="info-line"></div>
                <div class="information-row">
                    <div></div>
                    <div class="information-content">
                        <div></div>
                        <div class="information-main">
                            <div></div>
                            <div></div>
                        </div>
                    </div>
                </div>
                <div class="info-line"></div>
                <div class="information-row">
                    <div></div>
                    <div class="information-content">
                        <div></div>
                        <div class="information-main">
                            <div></div>
                            <div></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="info" id="xuanjiao">
                <div class="info-top">
                    <span class="info-title">健康宣教</span>
                    <div>
                        <span class="info-more" id="moreXj" >查看更多</span>
                        <img src="<%=request.getContextPath()%>/resources/icon/zuohua.png">
                    </div>
                </div>
                <div class="information-row">
                    <div></div>
                    <div class="information-content">
                        <div></div>
                        <div class="information-main">
                            <div></div>
                            <div></div>
                            <input type="id" hidden value="">
                        </div>
                    </div>
                </div>
                <div class="info-line"></div>
                <div class="information-row">
                    <div></div>
                    <div class="information-content">
                        <div></div>
                        <div class="information-main">
                            <div></div>
                            <div></div>
                            <input type="id" hidden value="">
                        </div>
                    </div>
                </div>
                <div class="info-line"></div>
                <div class="information-row">
                    <div></div>
                    <div class="information-content">
                        <div></div>
                        <div class="information-main">
                            <div></div>
                            <div></div>
                            <input type="id" hidden value="">
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
</body>
<script src="<%=request.getContextPath()%>/resources/js/util/bootstrap.min.js" type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/resources/ace/js/bootbox.js"></script>
<script src="<%=request.getContextPath()%>/resources/js/util/staticUrl.js" type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/resources/js/util/util-common.js" type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/resources/js/index.js"></script>
</html>
