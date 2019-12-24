/**
 * @author 斌
 */

jQuery(
    function ($) {
        //获取公告
        function getNotice() {
            $.ajax({
                type: "POST",
                url: rootPath + "/api/listNews",
                dataType: "json",
                data: {
                    type: 2,
                    offset: 0,
                    size: 7
                },
                success: function (response) {
                    if (response.status === 200) {
                        var html = "<h3 class=\"xs-font20\">通知公告</h3>";
                        for (var i = 0; i < response.data.length; i++) {
                            html += "<p id='" + response.data[i].id + "'>" + response.data[i].title + "</p>";
                        }
                        $("#notice").html(html);
                    }
                },
                error: function () {

                }
            })
        }
        getNotice();

        $("#notice").on('click', 'p', function () {
            var id = $(this).attr('id');
            localStorage.setItem("noticeId", id);
            window.open("notice");
        })

        //
        // //获取邮件
        // function getMail() {
        //     $.ajax({
        //         type: "GET",
        //         url: rootPath + "/api/listMail",
        //         dataType: "json",
        //         data: {
        //             organizationMemberId: user.id,
        //             isGarbage: 0,
        //             size: 5,
        //             pageNow: 1,
        //         },
        //         success: function (response) {
        //             if (response.status === 200) {
        //                 for (var i = 0; i < response.data.length; i++) {
        //                     if (response.data[i] === "")
        //                         break;
        //                     $("#mail .mail-row").eq(i).attr("id", response.data[i].id);
        //                     if(response.data[i].isRead===1){
        //                         $("#mail .mail-row").eq(i).children("div:nth-child(1)").html('<img src="' + rootPath + '/resources/icon/youjianheide.png' + '">');
        //                     }else{
        //                         $("#mail .mail-row").eq(i).children("div:nth-child(1)").html('<img src="' + rootPath + '/resources/icon/youjian@2x.png' + '">');
        //                     }
        //                     $("#mail .mail-row").eq(i).children("span:nth-child(2)").html(response.data[i].inName);
        //                     $("#mail .mail-row").eq(i).children("span:nth-child(3)").html(response.data[i].subject);
        //                     $("#mail .mail-row").eq(i).children("span:nth-child(4)").html(getSimpleText(response.data[i].content));
        //                     $("#mail .mail-row").eq(i).children("div:nth-child(5)").html(response.data[i].createdTime.substr(0, 10));
        //                 }
        //             }
        //         },
        //         error: function () {
        //
        //         }
        //     });
        // }
        // //获取资讯
        // function getZixun() {
        //     $.ajax({
        //         type: "GET",
        //         url: rootPath + "/api/listZixun",
        //         dataType: "json",
        //         data: {},
        //         success: function (response) {
        //             if (response.status === 200) {
        //                 for (var i = 0; i < response.data.length; i++) {
        //                     $("#zixun .information-row").eq(i).attr("id", response.data[i].id);
        //                     $("#zixun .information-row").eq(i).children("div:nth-child(1)").html('<img src="' + imgPath + response.data[i].attachment + '">');
        //                     $("#zixun .information-content").eq(i).children("div:nth-child(1)").html(response.data[i].title);
        //                     $("#zixun .information-main").eq(i).children("div:nth-child(1)").html(getSimpleText(response.data[i].content));
        //                     $("#zixun .information-main").eq(i).children("div:nth-child(2)").html(response.data[i].createdTime.substr(0, 10));
        //                 }
        //             }
        //         },
        //         error: function () {
        //
        //         }
        //     })
        // }
        // //获取宣教
        // function getXuanjiao() {
        //     $.ajax({
        //         type: "GET",
        //         url: rootPath + "/api/listXuanjiaoIndex",
        //         dataType: "json",
        //         data: {},
        //         success: function (response) {
        //             if (response.status === 200) {
        //                 for (var i = 0; i < response.data.length; i++) {
        //                     $("#xuanjiao .information-row").eq(i).attr("id", response.data[i].id);
        //                     $("#xuanjiao .information-row").eq(i).children("div:nth-child(1)").html('<img src="' + imgPath + response.data[i].attachment + '">');
        //                     $("#xuanjiao .information-content").eq(i).children("div:nth-child(1)").html(response.data[i].name);
        //                     $("#xuanjiao .information-main").eq(i).children("div:nth-child(1)").html(getSimpleText(response.data[i].content));
        //                     $("#xuanjiao .information-main").eq(i).children("div:nth-child(2)").html(response.data[i].createdTime.substr(0, 10));
        //                     $("#xuanjiao .information-main").eq(i).children("input").val(response.data[i].type);
        //                     console.log($("#xuanjiao .information-main").eq(i).children("input").val(),response.data[i].type);
        //                 }
        //             }
        //         },
        //         error: function () {
        //
        //         }
        //     })
        // }
        // //提取文字
        // function getSimpleText(html) {
        //     var re1 = new RegExp("<.+?>", "g");
        //     var msg = html.replace(re1, '');
        //     return msg;
        // }
        // //获取未审批数量
        // function getUnsolvedApproval() {
        //     $.ajax({
        //         type: "GET",
        //         url: rootPath + "/api/getUnsolvedApproval",
        //         dataType: "json",
        //         data: {
        //             approvalId: user.organizationId,
        //         },
        //         success: function (response) {
        //             if (response.status === 200) {
        //                 if (parseInt(response.data) !== 0) {
        //                     if (parseInt(response.data) > 99) {
        //                         response.data = "99+";
        //                     }
        //                     $(".myButtons>div:nth-child(3)>div").removeClass("hidden");
        //                     $(".myButtons>div:nth-child(3)>div").html(response.data);
        //                 }
        //             }
        //         },
        //         error: function () {
        //
        //         }
        //     })
        // }
        // //获取未读邮件数量
        // function getUnsolvedMail() {
        //     $.ajax({
        //         type: "GET",
        //         url: rootPath + "/api/getUnsolvedMail",
        //         dataType: "json",
        //         data: {
        //             id: user.id
        //         },
        //         success: function (response) {
        //             if (response.status === 200) {
        //                 if (parseInt(response.data) !== 0) {
        //                     if (parseInt(response.data) > 99) {
        //                         response.data = "99+";
        //                     }
        //                     $(".myButtons>div:nth-child(4)>div").removeClass("hidden");
        //                     $(".myButtons>div:nth-child(4)>div").html(response.data);
        //                 }
        //             }
        //         },
        //         error: function () {
        //
        //         }
        //     })
        // }
        // //顶部导航切换
        // $(".myHeader ul li").eq(0).addClass("current-li");
        // $(".myHeader ul li").eq(0).children("div").addClass("current-div");
        // //公告查看
        // $("#announcement .announcement-row").click(function () {
        //     var id = $(this).attr("id");
        //     if (id != "" && id != null){
        //         localStorage.setItem("readPage","gg" + id);
        //         window.open( rootPath + '/information');
        //     }
        // });
        // //邮件查看
        // $("#mail .mail-row").click(function () {
        //     var id = $(this).attr("id");
        //     if (id != "" && id != null) {
        //         localStorage.setItem("readMail",id)
        //         window.open(rootPath + '/mail');
        //     }
        // });
        // //资讯查看
        // $("#zixun .information-row").click(function () {
        //     var id = $(this).attr("id");
        //     if (id != "" && id != null) {
        //         localStorage.setItem("readPage","zx" + id);
        //         window.open( rootPath + '/information');
        //     }
        // });
        // //宣教查看
        // $("#xuanjiao .information-row").click(function () {
        //     var id = $(this).attr("id");
        //     if (id != "" && id != null) {
        //         var type = $(this).children().children(".information-main").children("input").val();
        //         if (type === "2"){
        //             localStorage.setItem("readPage","zd" + id);
        //         }else if (type === "3"){
        //             localStorage.setItem("readPage","zc" + id);
        //         }else if (type === "4"){
        //             localStorage.setItem("readPage","ys" + id);
        //         }
        //         window.open(rootPath + '/information');
        //     }
        // });
        // $(".mail-row").mouseover(function () {
        //     if($(this).children().children("img").length!=0){
        //         $(this).css("cursor","pointer");
        //     }
        //     $(this).children().addClass("mail-row-hover");
        // });
        // $(".mail-row").mouseout(function () {
        //     $(this).css("cursor","default");
        //     $(this).children().removeClass("mail-row-hover");
        // });
        // $(".announcement-row").mouseover(function () {
        //     if($(this).children().children("a").html()!=""){
        //         $(this).children().css("cursor","pointer");
        //         $(this).children().children().css("cursor","pointer");
        //     }
        //     $(this).children().addClass("announcement-row-hover");
        //     $(this).children().children().addClass("announcement-row-hover");
        // });
        // $(".announcement-row").mouseout(function () {
        //     $(this).children().css("cursor","default");
        //     $(this).children().children().css("cursor","default");
        //     $(this).children().removeClass("announcement-row-hover");
        //     $(this).children().children().removeClass("announcement-row-hover");
        // });
        // $(".information-row").mouseover(function () {
        //     if($(this).children().children("img").length!=0){
        //         $(this).children().css("cursor","pointer");
        //         $(this).children().children().css("cursor","pointer");
        //     }
        //     $(this).children().addClass("information-row-hover");
        //     $(this).children().children().addClass("information-row-hover");
        //     $(this).children().children().children().addClass("information-row-hover");
        // });
        // $(".information-row").mouseout(function () {
        //     $(this).children().css("cursor","default");
        //     $(this).children().children().css("cursor","default");
        //     $(this).children().removeClass("information-row-hover");
        //     $(this).children().children().removeClass("information-row-hover");
        //     $(this).children().children().children().removeClass("information-row-hover");
        // });
        // //健康宣教快捷入口
        // $("#education").click(function () {
        //     localStorage.setItem("readPage","qc");
        //     window.open(rootPath + '/information');
        // })
        // //特色亮点快捷入口
        // $("#tsld").click(function () {
        //     localStorage.setItem("readPage","tsld");
        //     window.open(rootPath + '/statistics');
        // })
        // //公文管理快捷入口
        // $("#gwgl").click(function () {
        //     localStorage.setItem("readPage","gwgl");
        //     window.open(rootPath + '/task');
        // })
        // //查看更多-公告
        // $("#moreGg").click(function () {
        //     localStorage.setItem("readPage","gg");
        //     window.open(rootPath + '/information');
        // })
        // //查看更多-资讯
        // $("#moreZx").click(function () {
        //     localStorage.setItem("readPage","zx");
        //     window.open(rootPath + '/information');
        // })
        // //查看更多-宣教
        // $("#moreXj").click(function () {
        //     localStorage.setItem("readPage","qc");
        //     window.open(rootPath + '/information');
        // })
        // document.addEventListener("error", function (e) {
        //     var elem = e.target;
        //     if (elem.tagName.toLowerCase() === 'img') {
        //         elem.src = imgBitmap;
        //     }
        // }, true);
        // getAnnouncement();
        // getMail();
        // getZixun();
        // getXuanjiao();
        // if (user.type === 1){
        //     getUnsolvedApproval();
        // }
        // getUnsolvedMail();
    }
);