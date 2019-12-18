/**
 * @author kzn
 */

/**
 * 	Overall version 1.6
 * 	This version 1.6
 */

var jgList = [];
var jgMap = {};
var isGarbage = 0;
var toStar;
var inStar;
var sendStatus;
var mailType = "recieve";
var selectType = "recieve";
var selfType = 0;
var allMember = {};

jQuery(
    function ($) {
        listContacs();
        listAllMember();
        if (localStorage.getItem("readMail") !== null){
            indexToRead();
        }


        function bootAlert(message) {
            bootbox.alert({
                message: message,
                buttons: {
                    ok: {
                        label: '确认',
                    }
                }
            });
        }

        //提取文字
        function getSimpleText(html) {
            var re1 = new RegExp("<.+?>", "g");
            var msg = html.replace(re1, '');
            return msg;
        }

        function indexToRead() {
            readMail(localStorage.getItem("readMail"),"toStar","recieve");
            localStorage.removeItem("readMail");
        }

        function listAllMember() {
            $.ajax({
                type: "GET",
                url: rootPath + "/api/listAllMember",
                dataType: "json",
                data: {},
                success: function (data) {
                    if (data.status === 200) {
                        for (var i in data.data) {
                            allMember[data.data[i].username] = data.data[i];
                            allMember[data.data[i].id] = data.data[i];
                        }
                    }
                },
                error: function () {
                    bootAlert("服务器请求失败", 0);
                }
            })
        }

        function updateByAddressee(ids, isRead, toStar, isGarbage, status) {
            for (var i = 0; i < ids.length; i++) {
                $.ajax({
                    type: "POST",
                    url: rootPath + "/api/updateByAddressee",
                    dataType: "json",
                    data: {
                        id: ids[i],
                        organizationMemberId: user.id,
                        isRead: isRead,
                        toStar: toStar,
                        isGarbage: isGarbage,
                        status: status,
                    },
                    success: function (data) {

                    },
                    error: function () {
                        bootAlert("服务器请求失败", 0);
                    }
                })
            }
        }

        function updateBySender(ids, inStar, isGarbage, status) {
            for (var i = 0; i < ids.length; i++) {
                $.ajax({
                    type: "POST",
                    url: rootPath + "/api/updateBySender",
                    dataType: "json",
                    data: {
                        id: ids[i],
                        inStar: inStar,
                        isGarbage: isGarbage,
                        status: status,
                    },
                    success: function (data) {

                    },
                    error: function () {
                        bootAlert("服务器请求失败", 0);
                    }
                })
            }
        }

        function sendMail(toMail, subject, content, attachments,attachmentsName,attachmentsSize) {
            if (subject === "") subject = "（无主题）";
            $.ajax({
                type: "POST",
                url: rootPath + "/api/sendMail",
                dataType: "json",
                data: {
                    inMail: user.id,
                    toUserName: toMail,
                    subject: subject,
                    content: content,
                    attachment: attachments,
                    attachmentName: attachmentsName,
                    attachmentSize: attachmentsSize,
                },
                success: function (data) {
                    if (data.status === 200) {
                        bootAlert("发送成功", 1);
                        $(".left ul:nth-child(1) li:nth-child(2) a").click()
                        $("#write-mail").html("<p><br></p>");
                    } else {
                        bootAlert("发送失败", 0);
                    }
                },
                error: function () {
                    bootAlert("服务器请求失败", 0);
                }
            })
        }

        function saveAsDraft(toMail, subject, content, attachments,attachmentsName,attachmentsSize) {
            $.ajax({
                type: "POST",
                url: rootPath + "/api/saveAsDraft",
                dataType: "json",
                data: {
                    inMail: user.id,
                    toMail: toMail,
                    subject: subject,
                    content: content,
                    attachment: attachments,
                    attachmentName: attachmentsName,
                    attachmentSize: attachmentsSize,
                },
                success: function (data) {
                    if (data.status === 200) {
                        bootAlert("保存成功", 1);
                        $(".left ul:nth-child(1) li:nth-child(2) a").click()
                    } else {
                        bootAlert("保存失败", 0);
                    }
                },
                error: function () {
                    bootAlert("服务器请求失败", 0);
                }
            })
        }

        function readMail(id,starType,selectType) {
            $(".readContent").html("")
            var ids = [];
            ids.push(id);
            if (selectType === "draft") {
                $("#read-page .toGarbage").addClass("hidden")
                $("#read-page .reply").addClass("hidden")
                $("#read-page .transmit").addClass("hidden")
                $("#read-page .completeDelete").html("删除草稿")
            } else if (selectType === "havesend") {
                $("#read-page .reply").addClass("hidden")
                $("#read-page .completeDelete").html("彻底删除")
            }else if (selectType === "trash"){
                $("#read-page .completeDelete").html("彻底删除")
                $("#read-page .reply").addClass("hidden")
                $("#read-page .transmit").addClass("hidden")
                $("#read-page .reEdit").addClass("hidden")
                $("#read-page .toGarbage").addClass("hidden")
            }else{
                $("#read-page .completeDelete").html("彻底删除")
            }
            if (starType === "toStar"){
                updateByAddressee(ids,1,null,null,null);
                $("#read-page .reEdit").addClass("hidden")
            }else{
                $("#read-page .reply").addClass("hidden")
            }
            console.log(starType);
            mailType = "read";
            $.ajax({
                type: "GET",
                url: rootPath + "/api/getMail",
                dataType: "json",
                data: {
                    id: id,
                    organizationMemberId: user.id,
                },
                success: function (data) {
                    if (data.status === 200) {
                        $(".readSubject").attr("id", "read" + id);
                        var html = data.data.subject;
                        if (starType === "inStar") {
                            if (data.data.inStar === 1) {
                                html += "<img name='1' class='inStar' src='" + rootPath + "/resources/icon/xingbiaoda.png'>";
                            } else {
                                html += "<img name='0' class='inStar' src='" + rootPath + "/resources/icon/xingbiaoa.png'>";
                            }
                        } else {
                            if (data.data.toStar === 1) {
                                html += "<img name='1' class='toStar' src='" + rootPath + "/resources/icon/xingbiaoda.png'>";
                            } else {
                                html += "<img name='0' class='toStar' src='" + rootPath + "/resources/icon/xingbiaoa.png'>";
                            }
                        }
                        $(".readSubject").html(html)
                        $(".readInMail").html(data.data.inName + " " + data.data.inMobile + " " + " " + data.data.inUserName);
                        var toMailNames = "";
                        if (data.data.toMail !== ""){
                            var toMailIds = data.data.toMail.substring(0, data.data.toMail.length - 1).split(";");
                            for (var i = 0; i < toMailIds.length; i++) {
                                toMailNames += allMember[toMailIds[i]].name + " " + allMember[toMailIds[i]].mobile + " " + allMember[toMailIds[i]].username + ";";
                            }
                        }
                        $(".readToMail").html(toMailNames);
                        $(".readDate").html(data.data.date);
                        if (data.data.attachmentName != null && data.data.attachmentName != "") {
                            var tmp = data.data.attachment.substring(0, data.data.attachment.length - 1).split(";");
                            var tmpName = data.data.attachmentName.substring(0, data.data.attachmentName.length - 1).split(";");
                            var tmpSize = data.data.attachmentSize.substring(0, data.data.attachmentSize.length - 1).split(";");
                            $("#read-page .readAttachment").html(tmp.length + "个<span>（<img src=" + rootPath + "/resources/icon/juxing21.png>" + data.data.date + " " + tmpName[0] + "等)</span>\n<a class='lookAttachment'>查看附件</a>")
                            $("#attachment-count").html("(" + tmp.length + ")")
                            //插入附件
                            var html = "";
                            for (var i = 0; i < tmp.length; i++){
                                html += "<div class=\"attachment\">\n" +
                                    "                        <div>\n" +
                                    "                            <img src=" + rootPath + "/resources/icon/juxing21.png>\n" +
                                    "                        </div>\n" +
                                    "                        <div>\n" +
                                    "                            <div>" + tmpName[i] + "<span>（" + tmpSize[i] + "）</span></div>\n" +
                                    "                            <div><a download='" + tmpName[i] + "' href='" + mailAttachmentPath + tmp[i] + "'>下载</a></div>\n" +
                                    "                        </div>\n" +
                                    "                    </div>\n";
                            }
                            $("#read-page .attachments").html(html)
                        }else{
                            $("#read-page .readAttachment").html("0个")
                            $("#attachment-count").html("(0)")
                            $("#read-page .attachments").html("")
                        }
                        $(".readContent").html(data.data.content)
                        $(".mail-buttons").removeClass("hidden");
                        $("#mails-page").addClass("hidden");
                        $("#read-page").removeClass("hidden");
                    }
                },
                error: function () {
                    alert("服务器请求失败")
                }
            })
        }

        var datTableInitMailType1 = {
            "bServerSide": true,
            "processing": true,
            "sScrollX": "100%",
            //表格的宽度
            "sScrollY": "520px",
            "sScrollXInner": "100%",
            //表格的内容宽度
            "bScrollCollapse": false,
            //当显示的数据不足以支撑表格的默认的高度时，依然显示纵向的滚动条。(默认是false)
            "bPaginate": true,
            //是否显示分页
            "bLengthChange": false,
            //每页显示的记录数
            "bFilter": false,
            //搜索栏
            "bSort": false,
            //是否支持排序功能
            "bInfo": true,
            //显示表格信息
            "bAutoWidth": false,
            //自适应宽度
            "aLengthMenu": [10, 25, 50, 100],
            //设置选择每页的条目数
            "iDisplayLength": 10,
            //默认显示条数
            "aaSorting": [[1, "asc"]],
            //给列表排序 ，第一个参数表示数组 (由0开始)。1 表示Browser列。第二个参数为 desc或是asc
            "bStateSave": false,
            //保存状态到cookie *************** 很重要 ， 当搜索的时候页面一刷新会导致搜索的消失。使用这个属性就可避免了
            "sPaginationType": "full_numbers",
            //分页，一共两种样式，full_numbers和two_button(默认)
            "oLanguage": {
                "oPaginate": {
                    "sFirst": null,
                    "sLast": null,
                    "sNext": '<img src="' + rootPath + '/resources/icon/fanye.png">',
                    "sPrevious": '<img src="' + rootPath + '/resources/icon/fanye.png">'
                },
                "sEmptyTable": "没有相关记录",
                "sInfoEmpty": "无记录",
            },
            "bJQueryUI": false,
            //可以添加 jqury的ui theme  需要添加css
            "fnServerData": function (sSource, aoData, fnCallback) {
                $.ajax({
                    "type": 'get',
                    "url": sSource,
                    "dataType": "json",
                    "data": {
                        aoData: JSON.stringify(aoData)
                    },
                    "success": function (resp) {
                        if (resp.status != 200) {
                            bootAlert(resp.msg);
                        } else {
                            fnCallback(resp);
                        }
                    }
                });
            }
        };
        // 设置请求url
        datTableInitMailType1["sAjaxSource"] = rootPath + '/api/listRecieveMail';
        // 设置字段数据源
        datTableInitMailType1["aoColumns"] = [
            {
                "data": "id"
            },
            {
                "data": "inName"
            },
            {
                "data": "subject"
            },
            {
                "data": "content"
            },
            {
                "data": "date"
            },
            {
                "data": "toStar"
            },
        ];
        // 渲染字段数据源
        datTableInitMailType1["aoColumnDefs"] = [
            {
                "aTargets": [0], "mRender": function (data, type, row, meta) {
                    var html = "";
                    html += '<label>\n' +
                        '                                            <input class="mailRow" id=' + mailType + row.id + ' type="checkbox">\n' +
                        '                                            <span></span>\n' +
                        '                                        </label>'
                    return html;
                }
            },
            {
                "aTargets": [1], "mRender": function (data, type, row, meta) {
                    var html = "";
                    if (mailType == "star" && row.inMail === user.id){
                        html += '<img src="' + rootPath + '/resources/icon/dufasongde.png">'
                    }else if (mailType == "trash"){
                        html += '<img src="' + rootPath + '/resources/icon/youjianheide.png">'
                    }else if (row.isRead === 1) {
                        html += '<img src="' + rootPath + '/resources/icon/youjianheide.png">'
                    }else{
                        html += '<img src="' + rootPath + '/resources/icon/youjian@2x.png">'
                    }
                    return html;
                }
            },
            {
                "aTargets": [2], "mRender": function (data, type, row, meta) {
                    var html = "";
                    html += '<div class="mail-table-name" name="' + row.inMail + '" type="' + row.toMail + '"><div>' + row.inName + '</div></div>'
                    return html;
                }
            },
            {
                "aTargets": [3], "mRender": function (data, type, row, meta) {
                    // console.log(row)
                    var html = "";
                    html += '<div class="mail-table-theme"><div><span>' + row.subject + '</span><span>' + getSimpleText(row.content) + '</span></div></div>'
                    return html;
                }
            },
            {
                "aTargets": [4], "mRender": function (data, type, row, meta) {
                    var html = "";
                    if (row.attachment != ""){
                        html += '<div class="mail-table-data"><img src="' + rootPath + '/resources/icon/fujianda.png">' + row.date + '</div>'
                    }else{
                        html += '<div class="mail-table-data">' + row.date + '</div>'
                    }
                    return html;
                }
            },
            {
                "aTargets": [5], "mRender": function (data, type, row, meta) {
                    var html = "";
                    var flag = true;
                    var tmp = row.toMail.substring(0,row.toMail.length - 1).split(";");
                    for (var i = 0; i < tmp.length; i++){
                        if (tmp[i] == user.id && row.sendStatus === 1){
                            flag = false;
                            break;
                        }
                    }
                    if (row.inMail === user.id && flag) {
                        if (row.inStar === 1) {
                            html += '<div class="mail-table-star"><img name="1" class="inStar" src="' + rootPath + '/resources/icon/xingbiaoda.png"></div>'
                        } else {
                            html += '<div class="mail-table-star"><img name="0" class="inStar" src="' + rootPath + '/resources/icon/xingbiaoa.png"></div>'
                        }
                    } else {
                        if (row.toStar === 1 || (row.inMail === user.id && !flag && row.inStar === 1)) {
                            html += '<div class="mail-table-star"><img name="1" class="toStar" src="' + rootPath + '/resources/icon/xingbiaoda.png"></div>'
                        } else {
                            html += '<div class="mail-table-star"><img name="0" class="toStar" src="' + rootPath + '/resources/icon/xingbiaoa.png"></div>'
                        }
                    }
                    return html;
                }
            },
        ];

        datTableInitMailType1["fnServerData"] = function (sSource, aoData, fnCallback) {
            $.ajax({
                "type": 'get',
                "url": sSource,
                "dataType": "json",
                "data": {//查询条件写这里
                    //dataTable固定参数
                    aoData: JSON.stringify(aoData),
                    // 选填参数
                    // search: searchText
                    organizationMemberId: user.id,
                    isGarbage: isGarbage,
                    toStar: toStar,
                    inStar: inStar,

                },
                "success": function (resp) {
                    if (resp.status != 200) {
                        bootAlert(resp.msg);
                    } else {
                        if (mailType === "recieve"){
                            var num = 0;
                            for (var i = 0; i < resp.data.length; i++){
                                if (resp.data[i].isRead == 0){
                                    num++;
                                }
                            }
                            $("#recieveMail2").html("收信箱（" + num + "）");
                        }
                        fnCallback(resp);
                    }
                }
            });
        }
        // table初始化
        if (localStorage.getItem("readMail") === null){
            var dataInfoTableMailType1 = $("#mails-type1").dataTable(datTableInitMailType1).api();
        }

        var datTableInitMailType2 = {
            "bServerSide": true,
            "processing": true,
            "sScrollX": "100%",
            //表格的宽度
            "sScrollY": "520px",
            "sScrollXInner": "100%",
            //表格的内容宽度
            "bScrollCollapse": false,
            //当显示的数据不足以支撑表格的默认的高度时，依然显示纵向的滚动条。(默认是false)
            "bPaginate": true,
            //是否显示分页
            "bLengthChange": false,
            //每页显示的记录数
            "bFilter": false,
            //搜索栏
            "bSort": false,
            //是否支持排序功能
            "bInfo": true,
            //显示表格信息
            "bAutoWidth": false,
            //自适应宽度
            "aLengthMenu": [10, 25, 50, 100],
            //设置选择每页的条目数
            "iDisplayLength": 10,
            //默认显示条数
            "aaSorting": [[1, "asc"]],
            //给列表排序 ，第一个参数表示数组 (由0开始)。1 表示Browser列。第二个参数为 desc或是asc
            "bStateSave": false,
            //保存状态到cookie *************** 很重要 ， 当搜索的时候页面一刷新会导致搜索的消失。使用这个属性就可避免了
            "sPaginationType": "full_numbers",
            //分页，一共两种样式，full_numbers和two_button(默认)
            "oLanguage": {
                "oPaginate": {
                    "sFirst": null,
                    "sLast": null,
                    "sNext": '<img src="' + rootPath + '/resources/icon/fanye.png">',
                    "sPrevious": '<img src="' + rootPath + '/resources/icon/fanye.png">'
                },
                "sEmptyTable": "没有相关记录",
                "sInfoEmpty": "无记录",
            },
            "bJQueryUI": false,
            //可以添加 jqury的ui theme  需要添加css
            "fnServerData": function (sSource, aoData, fnCallback) {
                $.ajax({
                    "type": 'get',
                    "url": sSource,
                    "dataType": "json",
                    "data": {
                        aoData: JSON.stringify(aoData)
                    },
                    "success": function (resp) {
                        if (resp.status != 200) {
                            bootAlert(resp.msg);
                        } else {
                            fnCallback(resp);
                        }
                    }
                });
            }
        };
        // 设置请求url
        datTableInitMailType2["sAjaxSource"] = rootPath + '/api/listSendMail';
        // 设置字段数据源
        datTableInitMailType2["aoColumns"] = [
            {
                "data": "id"
            },
            {
                "data": "inName"
            },
            {
                "data": "subject"
            },
            {
                "data": "content"
            },
            {
                "data": "date"
            },
            {
                "data": "toStar"
            },
        ];
        // 渲染字段数据源
        datTableInitMailType2["aoColumnDefs"] = [
            {
                "aTargets": [0], "mRender": function (data, type, row, meta) {
                    var html = "";
                    html += '<label>\n' +
                        '                                            <input class="mailRow" id=' + mailType + row.id + ' type="checkbox">\n' +
                        '                                            <span></span>\n' +
                        '                                        </label>'
                    return html;
                }
            },
            {
                "aTargets": [1], "mRender": function (data, type, row, meta) {
                    var html = "";
                    if (row.sendStatus === 1) {
                        html += '<img style="width: 26px;height: 16px" src="' + rootPath + '/resources/icon/dufasongde.png">'
                    } else {
                        html += '<img src="' + rootPath + '/resources/icon/youjianheide.png">'
                    }
                    return html;
                }
            },
            {
                "aTargets": [2], "mRender": function (data, type, row, meta) {
                    var html = "";
                    html += '<div class="mail-table-name" name="' + user.id + '" type="' + row.toMail + '"><div>' + user.name + '</div></div>'
                    return html;
                }
            },
            {
                "aTargets": [3], "mRender": function (data, type, row, meta) {
                    var html = "";
                    html += '<div class="mail-table-theme"><div><span>' + row.subject + '</span><span>' + getSimpleText(row.content) + '</span></div></div>'
                    return html;
                }
            },
            {
                "aTargets": [4], "mRender": function (data, type, row, meta) {
                    var html = "";
                    if (row.attachment != ""){
                        html += '<div class="mail-table-data"><img src="' + rootPath + '/resources/icon/fujianda.png">' + row.date + '</div>'
                    }else{
                        html += '<div class="mail-table-data">' + row.date + '</div>'
                    }
                    return html;
                }
            },
            {
                "aTargets": [5], "mRender": function (data, type, row, meta) {
                    var html = "";
                    var flag = true;
                    var tmp = row.toMail.substring(0,row.toMail.length - 1).split(";");
                    for (var i = 0; i < tmp.length; i++){
                        if (tmp[i] == user.id && row.sendStatus === 1){
                            flag = false;
                            break;
                        }
                    }
                    if (row.sendStatus === 1) {
                        if (!flag){
                            if (row.inStar === 1 || row.toStar === 1) {
                                html += '<div class="mail-table-star"><img name="1" class="inStar" src="' + rootPath + '/resources/icon/xingbiaoda.png"></div>'
                            } else {
                                html += '<div class="mail-table-star"><img name="0" class="inStar" src="' + rootPath + '/resources/icon/xingbiaoa.png"></div>'
                            }
                        }else{
                            if (row.inStar === 1) {
                                html += '<div class="mail-table-star"><img name="1" class="inStar" src="' + rootPath + '/resources/icon/xingbiaoda.png"></div>'
                            } else {
                                html += '<div class="mail-table-star"><img name="0" class="inStar" src="' + rootPath + '/resources/icon/xingbiaoa.png"></div>'
                            }
                        }
                    }else{
                        if (row.inStar === 1) {
                            html += '<div class="mail-table-star"><img name="1" class="inStar" src="' + rootPath + '/resources/icon/xingbiaoda.png"></div>'
                        } else {
                            html += '<div class="mail-table-star"><img name="0" class="inStar" src="' + rootPath + '/resources/icon/xingbiaoa.png"></div>'
                        }
                    }
                    return html;
                }
            },
        ];

        datTableInitMailType2["fnServerData"] = function (sSource, aoData, fnCallback) {
            $.ajax({
                "type": 'get',
                "url": sSource,
                "dataType": "json",
                "data": {//查询条件写这里
                    //dataTable固定参数
                    aoData: JSON.stringify(aoData),
                    // 选填参数
                    // search: searchText
                    inMail: user.id,
                    sendStatus: sendStatus,
                    inStar: inStar,

                },
                "success": function (resp) {
                    if (resp.status != 200) {
                        bootAlert(resp.msg);
                    } else {
                        fnCallback(resp);
                    }
                }
            });
        }
        // table初始化
        if (localStorage.getItem("readMail") === null){
            var dataInfoTableMailType2 = $("#mails-type2").dataTable(datTableInitMailType2).api();
        }

        function reloadAjax(ajaxTable) {
            ajaxTable.ajax.reload(false);
        }

        //联系人弹窗选中展开
        $(".search-member").on('click', 'li a', function () {
            $(".search-member li a").children("img:nth-child(1)").attr("src", rootPath + "/resources/icon/iconse.png");
            $(this).children("img:nth-child(1)").attr("src", rootPath + "/resources/icon/xuanzhong.png");
            $(".search-member li a").removeClass("selected-search-li");
            $(this).addClass("selected-search-li");
            if ($(this).children("img:nth-child(1)").css("transform") === "matrix(1, 0, 0, 1, 0, 0)") {
                $(this).children("img:nth-child(1)").css("transform", "rotate(-90deg)");
            } else {
                $(this).children("img:nth-child(1)").css("transform", "rotate(0deg)");
            }
            if ($(this).next("ul").length) {
                if ($(this).next("ul").css("display") === "none")
                    $(this).next("ul").css("display", "block");
                else
                    $(this).next("ul").css("display", "none");
            }
        });
        //联系人勾选处理
        $(".search-member").on('change', 'input', function () {
            if ($(this).parent().parent().attr("class").indexOf("member") !== -1 && $(this).parent().parent().attr("class").indexOf("dept-members") === -1){
                flag = true;
                $(this).parent().parent().parent().children("a").each(function () {
                    if (!$(this).children("label").children("input").is(":checked")) {
                        flag = false;
                    }
                })
                $(this).parent().parent().parent().parent().parent().children("a").children("label").children("input").prop("checked",flag);
            }else if ($(this).parent().parent().attr("class").indexOf("dept-members") !== -1){
                var flag = $(this).is(":checked");
                $(this).parent().parent().next().children("li").children("a").each(function () {
                    $(this).children("label").children("input").prop("checked",flag)
                })
                flag = true;
                $(this).parent().parent().parent().parent().children("li").each(function () {
                    if (!$(this).children("a").children("label").children("input").is(":checked")) {
                        flag = false;
                    }
                })
                $(this).parent().parent().parent().parent().parent().children("a").children("label").children("input").prop("checked",flag);
            }else if ($(this).parent().parent().attr("class").indexOf("dept") !== -1 && $(this).parent().parent().attr("class").indexOf("dept-members") === -1){
                var flag = $(this).is(":checked");
                $(this).parent().parent().next().children("li").each(function () {
                    $(this).find("input").each(function () {
                        $(this).prop("checked",flag);
                    })
                })
                var flag = true;
                $(this).parent().parent().parent().parent().children("li").each(function () {
                    if (!$(this).children("a").children("label").children("input").is(":checked")){
                        flag = false;
                    }
                })
                $(this).parent().parent().parent().parent().prev().children("label").children("input").prop("checked",flag);
            }
        })
        //联系人确认按钮点击事件
        $("#selectRecipients .main-button").click(function () {
            var toMails = "";
            var memberMap = {};
            $(".search-member .member input").each(function () {
                if ($(this).is(":checked")){
                    memberMap[$(this).attr("id").replace("member","")] = 1;
                }
            })
            var tmp = $("#mail-search").val();
            for (var id in memberMap){
                var s = "<" + allMember[id].username + ">";
                if (tmp.indexOf(s) === -1){
                    toMails += allMember[id].name + "<" + allMember[id].username + ">;";
                }
            }
            $("#mail-search").val(tmp + toMails);
        })
        //左侧导航点击事件
        $(".left ul:nth-child(1) li a").click(function () {
            $(".readContent").html("");
            $(".left li a").removeClass("selected-bottom-li");
            $(".left li a").removeClass("selected-top-li");
            $(this).addClass("selected-top-li");
            $("#read-page .completeDelete").removeClass("hidden")
            $("#read-page .transmit").removeClass("hidden")
            $("#read-page .reEdit").removeClass("hidden")
            $("#read-page .toGarbage").removeClass("hidden")
            $("#read-page .reply").removeClass("hidden")
        });
        $(".left ul:nth-child(3) li a").click(function () {
            $("#write-mail").html("<p><br></p>");
            $(".readContent").html("");
            $(".left li a").removeClass("selected-bottom-li");
            $(".left li a").removeClass("selected-top-li");
            $(this).addClass("selected-bottom-li");
            $("#read-page .completeDelete").removeClass("hidden")
            $("#read-page .transmit").removeClass("hidden")
            $("#read-page .reEdit").removeClass("hidden")
            $("#read-page .toGarbage").removeClass("hidden")
            $("#read-page .reply").removeClass("hidden")
        });
        $(".left ul:nth-child(1) li:nth-child(1) a").click(function () {
            if ($("#write-page").attr("class").indexOf("hidden") !== -1){
                $("#mail-search").val("");
                $("#writeSubject").html("");
                $("#write-mail").html("<p><br></p>");
                $(".upload-attachment").html("")
            }
            $(".right-main").addClass("hidden");
            $(".mail-buttons").addClass("hidden");
            $("#write-page").removeClass("hidden");
            $("#write-page .mail-buttons").removeClass("hidden");
        });
        $(".left ul:nth-child(1) li:nth-child(2) a").click(function () {
            $("#mails-page .mail-title").html("收信箱")
            $("#write-mail").html("<p><br></p>");
            mailType = "recieve";
            toStar = null;
            inStar = null;
            isGarbage = 0;
            $(".right-main").addClass("hidden");
            $(".mail-buttons").addClass("hidden");
            $("#mails-page > div:nth-child(2)").removeClass("hidden");
            $("#mails-page").removeClass("hidden");
            $(".mails-type1").removeClass("hidden");
            $(".mails-type2").addClass("hidden");
            reloadAjax(dataInfoTableMailType1);
        });
        $(".left ul:nth-child(3) li a").click(function () {
            $(".right-main").addClass("hidden");
            $(".mail-buttons").addClass("hidden");
            $("#mails-page").removeClass("hidden");
            var title = ["收信箱", "星标邮件", "草稿箱", "已发送", "回收站"];
            $("#mails-page .mail-title").html(title[$(".left ul:nth-child(3) li").index($(this).parent())]);
            $("#mails-page > div:nth-child(" + ($(".left ul:nth-child(3) li").index($(this).parent()) + 2) + ")").removeClass("hidden");
            var type = $(".left ul:nth-child(3) li").index($(this).parent());
            if (type === 0) {
                mailType = "recieve";
                selectType = "recieve";
                toStar = null;
                inStar = null;
                isGarbage = 0;
            } else if (type === 1) {
                mailType = "star";
                selectType = "star";
                inStar = 1;
                toStar = 1;
                isGarbage = 0;
            } else if (type === 2) {
                mailType = "draft";
                selectType = "draft";
                inStar = null;
                sendStatus = 0;
            } else if (type === 3) {
                mailType = "havesend";
                selectType = "havesend";
                inStar = null;
                sendStatus = 1;
            } else if (type === 4) {
                mailType = "trash";
                selectType = "trash";
                isGarbage = 1;
                toStar = null;
            }
            if (localStorage.getItem("readMail") === null){
                if (type === 3 || type === 2) {
                    $(".mails-type1").addClass("hidden");
                    $(".mails-type2").removeClass("hidden");
                    reloadAjax(dataInfoTableMailType2);
                } else {
                    $(".mails-type1").removeClass("hidden");
                    $(".mails-type2").addClass("hidden");
                    reloadAjax(dataInfoTableMailType1);
                }
            }

        });
        //出现选择联系人弹窗
        $(".mail-recipients div:nth-child(3)").click(function () {
            $("#selectRecipients").css("display", "block");
            $("body").addClass("body-hidden");
        });
        //关闭选择联系人弹窗
        $("#selectRecipients .pop-buttons .normal-button,#selectRecipients .pop-buttons .main-button,#selectRecipients .selectRecipients-title div").click(function () {
            $("#selectRecipients").css("display", "none");
            $("body").removeClass("body-hidden");
            $(".search-member .selected-search-li").removeClass("selected-search-li");
            $(".search-member input").each(function () {
                $(this).prop("checked",false);
            })
        });
        //切换邮件详情页
        $(".mailList").on('click', 'td:nth-child(3),td:nth-child(4),td:nth-child(5)', function () {
            var id = $(this).parent().children().children().children("input").attr("id").replace(mailType, "");
            var starType = $(this).parent().children("td").eq(5).children().children("img").attr("class");
            if ($(this).parent().children("td:nth-child(3)").children("div").attr("name") == user.id){
                selfType = 1;
            }else{
                selfType = 0;
            }
            readMail(id,starType,selectType);
        })
        //邮件详情返回按钮
        $(".goBack").click(function () {
            mailType = selectType;
            $(".readContent").html("")
            $(".selected-top-li").click();
            $(".selected-bottom-li").click();
        })
        //星标按钮操作
        $(".mailList").on('click', 'td:nth-child(6) img', function () {
            var id = $(this).parent().parent().parent().children().children().children("input").attr("id").replace(mailType, "");
            var ids = [];
            ids.push(id);
            var flag = true;
            var s = $(this).parent().parent().parent().children("td:nth-child(3)").children("div").attr("type");
            var tmp = s.substring(0,s.length - 1).split(";");
            var inmail = $(this).parent().parent().parent().children("td:nth-child(3)").children("div").attr("name");
            for (var i = 0; i < tmp.length; i++){
                if (tmp[i] == user.id && parseInt(inmail) == user.id){
                    flag = false;
                    break;
                }
            }
            if ($(this).attr("name") == 1) {
                if (!flag){
                    updateByAddressee(ids, null, 0, null, null);
                    updateBySender(ids, 0, null);
                } else if ($(this).attr("class") === "toStar") {
                    updateByAddressee(ids, null, 0, null, null);
                } else {
                    updateBySender(ids, 0, null);
                }
                $(this).attr("name", 0);
                $(this).attr("src", rootPath + "/resources/icon/xingbiaoa.png");
            } else {
                if (!flag){
                    updateByAddressee(ids, null, 1, null, null);
                    updateBySender(ids, 1, null);
                } else if ($(this).attr("class") === "toStar") {
                    updateByAddressee(ids, null, 1, null, null);
                } else {
                    updateBySender(ids, 1, null);
                }
                $(this).attr("name", 1);
                $(this).attr("src", rootPath + "/resources/icon/xingbiaoda.png");
            }
        })
        //邮件详情页星标操作
        $(".readSubject").on('click', 'img', function () {
            var id = $(this).parent().attr("id").replace(mailType, "");
            var ids = [];
            ids.push(id);
            if ($(this).attr("name") == 1) {
                if ($(".readToMail").html().indexOf($(".readInMail").html()) != -1){
                    updateByAddressee(ids, null, 0, null, null);
                    updateBySender(ids, 0, null);
                } else if ($(this).attr("class") === "toStar") {
                    updateByAddressee(ids, null, 0, null, null);
                } else {
                    updateBySender(ids, 0, null);
                }
                $(this).attr("name", 0);
                $(this).attr("src", rootPath + "/resources/icon/xingbiaoa.png");
            } else {
                if ($(".readToMail").html().indexOf($(".readInMail").html()) != -1){
                    updateByAddressee(ids, null, 1, null, null);
                    updateBySender(ids, 1, null);
                } else if ($(this).attr("class") === "toStar") {
                    updateByAddressee(ids, null, 1, null, null);
                } else {
                    updateBySender(ids, 1, null);
                }
                $(this).attr("name", 1);
                $(this).attr("src", rootPath + "/resources/icon/xingbiaoda.png");
            }
        })
        //邮件全选
        $(".dataTables_scrollHead thead tr th:nth-child(1) input").change(function () {
            var tableId;
            if (selectType === "recieve" || selectType === "star" || selectType === "trash") {
                tableId = "recieveTable";
            } else {
                tableId = "sendTable";
            }
            $("#" + tableId + " tbody tr td:nth-child(1) input").prop('checked', $(this).is(':checked') ? true : false);
        })
        //标记已读
        $("#mails-page .readIt").click(function () {
            var ids = [];
            $("#recieveTable tbody tr td:nth-child(1) input").each(function () {
                if ($(this).is(":checked")) {
                    ids.push($(this).attr("id").replace(mailType, ""));
                }
            })
            updateByAddressee(ids, 1, null, null, null);
            $(".selected-top-li").click();
            $(".selected-bottom-li").click();
            $(".dataTables_scrollHead thead tr th:nth-child(1) input").prop("checked",false);
        })
        //批量删除邮件
        $("#mails-page .toGarbage").click(function () {
            var tableId;
            if (selectType === "recieve" || selectType === "star" || selectType === "trash") {
                tableId = "recieveTable";
            } else {
                tableId = "sendTable";
            }
            var ids1 = [];
            var ids2 = [];
            $("#" + tableId + " tbody tr td:nth-child(1) input").each(function () {
                if ($(this).is(":checked")) {
                    console.log($(this).parent().parent().parent().children("td:nth-child(6)").children().children("img").attr("class"))
                    if ($(this).parent().parent().parent().children("td:nth-child(6)").children().children("img").attr("class") === "toStar"){
                        ids1.push($(this).attr("id").replace(mailType, ""));
                        if (user.id == $(this).parent().parent().parent().children("td:nth-child(3)").children("div").attr("name")){
                            ids2.push($(this).attr("id").replace(mailType, ""));
                        }
                    }else{
                        ids2.push($(this).attr("id").replace(mailType, ""));
                    }
                }
            })
            if (ids1.length > 0 || ids2.length > 0){
                bootbox.confirm({
                    title: "确认删除",
                    message: "确认将选中邮件放入回收站？",
                    callback: function(result) {
                        if (result) {
                            updateByAddressee(ids1, null, null, 1, null);
                            updateBySender(ids2, null, 1, null);
                            $(".selected-top-li").click();
                            $(".selected-bottom-li").click();
                            $(".dataTables_scrollHead thead tr th:nth-child(1) input").prop("checked",false);
                        } else {
                        }
                    }
                })
            }
        })
        //邮件详情页删除邮件
        $("#read-page .toGarbage").click(function () {
            var tableId;
            if (selectType === "recieve" || selectType === "star" || selectType === "trash") {
                tableId = "recieveTable";
            } else {
                tableId = "sendTable";
            }
            var id = $(this).parent().next().attr("id").replace(mailType, "");
            var ids = [];
            ids.push(id);
            bootbox.confirm({
                title: "确认删除",
                message: "确认将该邮件放入回收站？",
                callback: function(result) {
                    if (result) {
                        if (selfType === 1){
                            updateByAddressee(ids, null, null, 1, null);
                            updateBySender(ids, null, 1, null);
                        }else{
                            if (tableId === "recieveTable") {
                                updateByAddressee(ids, null, null, 1, null);
                            } else {
                                updateBySender(ids, null, 1, null);
                            }
                        }

                        $(".readContent").html("")
                        $(".selected-top-li").click();
                        $(".selected-bottom-li").click();
                    } else {
                    }
                }
            })
        })
        //批量彻底删除邮件
        $("#mails-page .completeDelete").click(function () {
            var tableId;
            if (selectType === "recieve" || selectType === "star" || selectType === "trash") {
                tableId = "recieveTable";
            } else {
                tableId = "sendTable";
            }
            var ids1 = [];
            var ids2 = [];
            $("#" + tableId + " tbody tr td:nth-child(1) input").each(function () {
                if ($(this).is(":checked")) {
                    console.log($(this).parent().parent().parent().children("td:nth-child(6)").children().children("img").attr("class"))
                    if ($(this).parent().parent().parent().children("td:nth-child(6)").children().children("img").attr("class") === "toStar"){
                        ids1.push($(this).attr("id").replace(mailType, ""));
                        if (user.id == $(this).parent().parent().parent().children("td:nth-child(3)").children("div").attr("name")){
                            ids2.push($(this).attr("id").replace(mailType, ""));
                        }
                    }else{
                        ids2.push($(this).attr("id").replace(mailType, ""));
                    }
                }
            })
            if (ids1.length > 0 || ids2.length > 0) {
                bootbox.confirm({
                    title: "确认删除",
                    message: "确认将选中邮件彻底删除？",
                    callback: function(result) {
                        if (result) {
                            updateByAddressee(ids1, null, null, null, 0);
                            updateBySender(ids2, null, null, 0);
                            $(".selected-top-li").click();
                            $(".selected-bottom-li").click();
                            $(".dataTables_scrollHead thead tr th:nth-child(1) input").prop("checked",false);
                        } else {
                        }
                    }
                })
            }
        })
        //邮件详情页彻底删除邮件
        $("#read-page .completeDelete").click(function () {
            var tableId;
            if (selectType === "recieve" || selectType === "star" || selectType === "trash") {
                tableId = "recieveTable";
            } else {
                tableId = "sendTable";
            }
            var id = $(this).parent().next().attr("id").replace(mailType, "");
            var ids = [];
            ids.push(id);
            bootbox.confirm({
                title: "确认删除",
                message: "确认将该邮件彻底删除？",
                callback: function(result) {
                    if (result) {
                        if (selfType === 1){
                            updateByAddressee(ids, null, null, null, 0);
                            updateBySender(ids, null, null, 0);
                        }else{
                            if (tableId === "recieveTable") {
                                updateByAddressee(ids, null, null, null, 0);
                            } else {
                                updateBySender(ids, null, null, 0);
                            }
                        }
                        $(".readContent").html("")
                        $(".selected-top-li").click();
                        $(".selected-bottom-li").click();
                    } else {
                    }
                }
            })
        })
        //恢复邮件
        $("#mails-page .recover").click(function () {
            var tableId;
            if (selectType === "recieve" || selectType === "star" || selectType === "trash") {
                tableId = "recieveTable";
            } else {
                tableId = "sendTable";
            }
            var ids1 = [];
            var ids2 = [];
            $("#" + tableId + " tbody tr td:nth-child(1) input").each(function () {
                if ($(this).is(":checked")) {
                    console.log($(this).parent().parent().parent().children("td:nth-child(6)").children().children("img").attr("class"))
                    if ($(this).parent().parent().parent().children("td:nth-child(6)").children().children("img").attr("class") === "toStar"){
                        ids1.push($(this).attr("id").replace(mailType, ""));
                        if (user.id == $(this).parent().parent().parent().children("td:nth-child(3)").children("div").attr("name")){
                            ids2.push($(this).attr("id").replace(mailType, ""));
                        }
                    }else{
                        ids2.push($(this).attr("id").replace(mailType, ""));
                    }
                }
            })
            if (ids1.length > 0 || ids2.length > 0){
                bootbox.confirm({
                    title: "确认恢复",
                    message: "确认将选中邮件恢复？",
                    callback: function(result) {
                        if (result) {
                            updateByAddressee(ids1, null, null, 0, null);
                            updateBySender(ids2, null, 0, null);
                            $(".selected-top-li").click();
                            $(".selected-bottom-li").click();
                            $(".dataTables_scrollHead thead tr th:nth-child(1) input").prop("checked",false);
                        } else {
                        }
                    }
                })
            }
        })
        //关闭写信界面
        $("#write-page .toClose").click(function () {
            var tmp = $("#mail-search").val();
            var subject = $("#writeSubject").html();
            var content = $("#write-mail").html();
            var attachments = "";
            var attachmentsName = "";
            var attachmentsSize = "";
            $(".upload-attachment").children().each(function () {
                attachments += $(this).children().attr("href").replace(mailAttachmentPath,"") + ";";
                attachmentsName += $(this).children().attr("download") + ";";
                var size;
                if (parseInt($(this).children().attr("name")) < 1024 * 1024){
                    size = parseFloat(parseInt($(this).children().attr("name")) / 1024).toFixed(1) + "K";
                }else{
                    size = parseFloat(parseInt($(this).children().attr("name")) / 1024 / 1024).toFixed(1) + "M";
                }
                attachmentsSize += size + ";";
            })
            if (tmp != "" || subject != "" || content != "" || attachments != "" || attachmentsName != "" || attachmentsSize != ""){
                bootbox.confirm({
                	title: "确认关闭",
                	message: "您有内容正在编辑，确认关闭？",
                	callback: function(result) {
                		if (result) {
                            $("#write-mail").html("<p><br></p>");
                            $(".left ul:nth-child(1) li:nth-child(2) a").click()
                		} else {
                		}
                	}
                })
            }else{
                $(".left ul:nth-child(1) li:nth-child(2) a").click()
            }

        })
        //发送邮件
        $("#write-page .toSend").click(function () {
            var tmp = $("#mail-search").val();
            tmp = tmp.substring(0, tmp.length - 1);
            var tmps = tmp.split(";");
            var toMail = "";
            var tmpMap = {};
            for (var i = 0; i < tmps.length; i++) {
                if (tmps[i] != null) {
                    if (tmpMap[tmps[i]] !== 1){
                        tmpMap[tmps[i]] = 1;
                        toMail += tmps[i].substring(tmps[i].indexOf("<") + 1, tmps[i].indexOf(">")) + ";";
                    }

                }
            }
            var subject = $("#writeSubject").html();
            var content = $("#write-mail").html();
            var attachments = "";
            var attachmentsName = "";
            var attachmentsSize = "";
            $(".upload-attachment").children().each(function () {
                if ($(this).children().attr("href") !== ""){
                    attachments += $(this).children().attr("href").replace(mailAttachmentPath,"") + ";";
                    attachmentsName += $(this).children().attr("download") + ";";
                    var size;
                    if (parseInt($(this).children().attr("name")) < 1024 * 1024){
                        size = parseFloat(parseInt($(this).children().attr("name")) / 1024).toFixed(1) + "K";
                    }else{
                        size = parseFloat(parseInt($(this).children().attr("name")) / 1024 / 1024).toFixed(1) + "M";
                    }
                    attachmentsSize += size + ";";
                }
            })
            if (tmp != null && tmp != ""){
                sendMail(toMail,subject,content,attachments,attachmentsName,attachmentsSize);
            }else{
                bootAlert("请选择收件人");
            }

        })
        //保存草稿
        $("#write-page .toSave").click(function () {
            var tmp = $("#mail-search").val();
            var toMail = new String();
            if (tmp != "" && tmp != null) {
                tmp = tmp.substring(0, tmp.length - 1);
                var tmps = tmp.split(";");
                for (var i = 0; i < tmps.length; i++) {
                    if (tmps[i] != null) {
                        toMail += allMember[tmps[i].substring(tmps[i].indexOf("<") + 1, tmps[i].indexOf(">"))].id + ";";
                    }
                }
            }
            var subject = $("#writeSubject").html();
            var content = $("#write-mail").html();
            var attachments = "";
            var attachmentsName = "";
            var attachmentsSize = "";
            $(".upload-attachment").children().each(function () {
                attachments += $(this).children().attr("href").replace(mailAttachmentPath,"") + ";";
                attachmentsName += $(this).children().attr("download") + ";";
                var size;
                if (parseInt($(this).children().attr("name")) < 1024 * 1024){
                    size = parseFloat(parseInt($(this).children().attr("name")) / 1024).toFixed(1) + "K";
                }else{
                    size = parseFloat(parseInt($(this).children().attr("name")) / 1024 / 1024).toFixed(1) + "M";
                }
                attachmentsSize += size + ";";
            })
            if (toMail == "" && subject == "" && content == "" && attachments == "" && attachmentsName == "" && attachmentsSize == ""){
                bootAlert("您还没有输入任何信息")
            }else{
                saveAsDraft(toMail,subject,content,attachments,attachmentsName,attachmentsSize);
            }

        })
        //重新编辑
        $("#read-page .reEdit").click(function () {
            $(".left ul:nth-child(1) li:nth-child(1) a").click()
            var id = $(this).parent().next().attr("id").replace(mailType, "");
            $.ajax({
                type: "GET",
                url: rootPath + "/api/getMail",
                dataType: "json",
                data: {
                    id: id,
                    organizationMemberId: user.id,
                },
                success: function (data) {
                    if (data.status === 200) {
                        var toMails = "";
                        if (data.data.toMail !== ""){
                            var toMailIds = data.data.toMail.substring(0, data.data.toMail.length - 1).split(";");
                            for (var i = 0; i < toMailIds.length; i++) {
                                toMails += allMember[toMailIds[i]].name + "<" +allMember[toMailIds[i]].username + ">" + ";";
                            }
                            $("#mail-search").val(toMails);
                        }
                        $("#write-page #writeSubject").html(data.data.subject)
                        $("#write-page #write-mail").html(data.data.content)
                        var tmpName = data.data.attachmentName.substring(0, data.data.attachmentName.length - 1).split(";");
                        if (data.data.attachment !== ""){
                            var tmp = data.data.attachment.substring(0, data.data.attachment.length - 1).split(";");
                            for (var i = 0; i < tmp.length; i++){
                                $(".upload-attachment").append('<div><a download="'+tmpName[i]+'"  href="'+mailAttachmentPath+tmp[i]+'">'+tmpName[i]+'</a><a>删除</a></div>')
                            }
                        }
                    }
                },
                error: function () {
                    alert("服务器请求失败")
                }
            })
        })
        //转发
        $("#read-page .transmit").click(function () {
            $(".left ul:nth-child(1) li:nth-child(1) a").click()
            var id = $(this).parent().next().attr("id").replace(mailType, "");
            $.ajax({
                type: "GET",
                url: rootPath + "/api/getMail",
                dataType: "json",
                data: {
                    id: id,
                    organizationMemberId: user.id,
                },
                success: function (data) {
                    if (data.status === 200) {
                        $("#write-page #writeSubject").html("转发 : " + data.data.subject)
                        var tmp = data.data.inName + "<" + data.data.inUserName + ">;";
                        var toMailNames = "";
                        if (data.data.toMail !== ""){
                            var toMailIds = data.data.toMail.substring(0, data.data.toMail.length - 1).split(";");
                            for (var i = 0; i < toMailIds.length; i++) {
                                toMailNames += allMember[toMailIds[i]].name + ";";
                            }
                        }
                        var html = "<p>&nbsp;</p><p>--------------------原始邮件-------------------</p>" +
                            "<p><strong>发件人：" + tmp + "</strong></p>" +
                            "<p><strong>发送时间：" + data.data.date + "</strong></p>" +
                            "<p><strong>收件人：" + toMailNames + "</strong></p>" +
                            "<p><strong>主题：" + data.data.subject + "</strong></p>" +
                            "<p>&nbsp;</p>" +
                            "<p>" + data.data.content + "</p>";
                        $("#write-page #write-mail").html(html)
                        if (data.data.attachment !== ""){
                            var tmpName = data.data.attachmentName.substring(0, data.data.attachmentName.length - 1).split(";");
                            var tmp = data.data.attachment.substring(0, data.data.attachment.length - 1).split(";");
                            for (var i = 0; i < tmp.length; i++){
                                $(".upload-attachment").append('<div><a download="'+tmpName[i]+'"  href="'+mailAttachmentPath+tmp[i]+'">'+tmpName[i]+'</a><a>删除</a></div>')
                            }
                        }
                    }
                },
                error: function () {
                    alert("服务器请求失败")
                }
            })
        })
        //回复
        $("#read-page .reply").click(function () {
            $(".left ul:nth-child(1) li:nth-child(1) a").click()
            var id = $(this).parent().next().attr("id").replace(mailType, "");
            $.ajax({
                type: "GET",
                url: rootPath + "/api/getMail",
                dataType: "json",
                data: {
                    id: id,
                    organizationMemberId: user.id,
                },
                success: function (data) {
                    if (data.status === 200) {
                        $("#write-page #writeSubject").html("回复 : " + data.data.subject)
                        var tmp = data.data.inName + "<" + data.data.inUserName + ">;";
                        $("#write-page #mail-search").val(tmp)
                        var toMailIds = data.data.toMail.substring(0, data.data.toMail.length - 1).split(";");
                        var toMailNames = new String();
                        for (var i = 0; i < toMailIds.length; i++) {
                            toMailNames += allMember[toMailIds[i]].name + ";";
                        }
                        var html = "<p>&nbsp;</p><p>--------------------原始邮件-------------------</p>" +
                            "<p><strong>发件人：" + tmp + "</strong></p>" +
                            "<p><strong>发送时间：" + data.data.date + "</strong></p>" +
                            "<p><strong>收件人：" + toMailNames + "</strong></p>" +
                            "<p><strong>主题：" + data.data.subject + "</strong></p>" +
                            "<p>&nbsp;</p>" +
                            "<p>" + data.data.content + "</p>";
                        $("#write-page #write-mail").html(html)
                    }
                }
            })
        });
        $(".mail-attachments").on("click",".lookAttachment",function () {
            $('html, body').animate({
                scrollTop: $(".attachments").offset().top
            }, 1000);
        });
        // bootbox.confirm({
        // 	title: "确认删除",
        // 	message: "是否将选中邮件放入垃圾箱？",
        // 	callback: function(result) {
        // 		if (result) {
        //
        // 		} else {
        // 		}
        // 	}
        // })
        function split(val) {
            return val.split(/;\s*/);
        }

        function extractLast(term) {
            return split(term).pop();
        }
        $("#mail-search")
            .bind("keydown", function (event) {
                if (event.keyCode === $.ui.keyCode.TAB &&
                    $(this).data("ui-autocomplete").menu.active) {
                    event.preventDefault();
                }
            })
            .autocomplete({
                source: function (request, response) {
                    $.getJSON("api/selectMember", {
                        term: extractLast(request.term)
                    }, function (data) {
                        response($.map(data.data, function (item) {
                            return {
                                label: item.name + " " + item.mobile + " " + item.organizationName,
                                value: item.name + "<" + item.username + ">",
                            }
                        }));
                    });
                },
                search: function () {
                    // 自定义最小长度
                    var term = extractLast(this.value);
                    if (term.length < 1) {
                        return false;
                    }
                },
                focus: function () {
                    // 防止在获得焦点时插入值
                    return false;
                },
                select: function (event, ui) {
                    var terms = split(this.value);
                    // 移除当前输入
                    terms.pop();
                    // 添加被选项
                    terms.push(ui.item.value);
                    // 添加占位符，在结尾添加逗号+空格
                    terms.push("");
                    this.value = terms.join(";");
                    return false;
                }
            });
        //附件上传
        $(".addAttachment").click(function () {
            $(this).next().click()
        })
        $(".addAttachment").next().change(function () {
            var formData = new FormData();
            formData.append('file_data', $(this)[0].files[0]);
            var name = $(this)[0].files[0].name;
            var size = $(this)[0].files[0].size;
            $.ajax({
                type: "POST",
                url: rootPath + "/api/file/fileUpload?fileType=mail",
                dataType: "json",
                data: formData,
                contentType: false,
                processData: false,
                beforeSend:function(){
                    $(".upload-attachment").append('<div><a href="">'+name+'</a><a>上传中</a></div>');
                },
                xhr:xhrOnProgress(function(e){
                    var percent=e.loaded/e.total;
                    $(".upload-attachment>div:last-child>a:last-child").html("上传中&nbsp;&nbsp;进度"+parseInt(percent*100)+"%")
                }),
                success: function (data) {
                    if (data.status == 200) {
                        $(".upload-attachment>div:last-child").remove();
                        $(".upload-attachment").append('<div><a download="'+name+'"  href="'+mailAttachmentPath+data.data.fileName+'" name="' + size + '">'+name+'</a><a>删除</a></div>')
                        $(".addAttachment").next().val('')
                    }else{
                        $(".upload-attachment>div:last-child").remove();
                        $(".upload-attachment").append('<div><a href="">'+name+'</a><a>上传失败点击删除</a></div>');
                        $(".addAttachment").next().val('')
                    }
                },
                error: function () {
                    $(".upload-attachment>div:last-child").remove();
                    $(".upload-attachment").append('<div><a href="">'+name+'</a><a>上传失败点击删除</a></div>');
                    $(".addAttachment").next().val('')
                }
            })
        })
        $(".addPicture").click(function () {
            $(this).next().click()
        })
        $(".addPicture").next().change(function () {
            var allowType=["png","jpeg","jpg"]
            var name = $(this)[0].files[0].name;
            var fileType=name.split('.').pop();
            if(allowType.indexOf(fileType.toLowerCase())===-1){
                bootAlert("请上传以.png、.jpeg、.jpg结尾文件");
                $(".addPicture").next().val('')
                return;
            }
            var formData = new FormData();
            formData.append('file_data', $(this)[0].files[0]);
            var size = $(this)[0].files[0].size;
            $.ajax({
                type: "POST",
                url: rootPath + "/api/file/fileUpload?fileType=mail",
                dataType: "json",
                data: formData,
                contentType: false,
                processData: false,
                beforeSend:function(){
                    $(".upload-attachment").append('<div><a href="">'+name+'</a><a>上传中</a></div>');
                },
                xhr:xhrOnProgress(function(e){
                    var percent=e.loaded/e.total;
                    $(".upload-attachment>div:last-child>a:last-child").html("上传中&nbsp;&nbsp;进度"+parseInt(percent*100)+"%")
                }),
                success: function (data) {
                    if (data.status == 200) {
                        $(".upload-attachment>div:last-child").remove();
                        $(".upload-attachment").append('<div><a download="'+name+'"  href="'+mailAttachmentPath+data.data.fileName+'" name="' + size + '">'+name+'</a><a>删除</a></div>')
                        $(".addPicture").next().val('')
                    }else{
                        $(".upload-attachment>div:last-child").remove();
                        $(".upload-attachment").append('<div><a href="">'+name+'</a><a>上传失败点击删除</a></div>');
                        $(".addPicture").next().val('')
                    }
                },
                error: function () {
                    $(".upload-attachment>div:last-child").remove();
                    $(".upload-attachment").append('<div><a href="">'+name+'</a><a>上传失败点击删除</a></div>');
                    $(".addPicture").next().val('')
                }
            })
        })
        $(".addText").click(function () {
            $(this).next().click()
        })
        $(".addText").next().change(function () {
            //.csv,.xlsx,.doc,.pdf,.ppt,.txt,.xlm,.xls,.wps,.xlc
            var allowType=["csv","xlsx","doc","pdf","ppt","txt","xlm","xls","wps","xlc"]
            var name = $(this)[0].files[0].name;
            var fileType=name.split('.').pop();
            if(allowType.indexOf(fileType.toLowerCase())===-1){
                bootAlert("请上传以.csv、.xlsx、.doc、.pdf、.ppt、.txt、.xlm、.xls、.wps、.xlc结尾文件");
                $(".addText").next().val('')
                return;
            }
            var formData = new FormData();
            formData.append('file_data', $(this)[0].files[0]);
            var size = $(this)[0].files[0].size;
            $.ajax({
                type: "POST",
                url: rootPath + "/api/file/fileUpload?fileType=mail",
                dataType: "json",
                data: formData,
                contentType: false,
                processData: false,
                beforeSend:function(){
                    $(".upload-attachment").append('<div><a href="">'+name+'</a><a>上传中</a></div>');
                },
                xhr:xhrOnProgress(function(e){
                    var percent=e.loaded/e.total;
                    $(".upload-attachment>div:last-child>a:last-child").html("上传中&nbsp;&nbsp;进度"+parseInt(percent*100)+"%")
                }),
                success: function (data) {
                    if (data.status == 200) {
                        $(".upload-attachment>div:last-child").remove();
                        $(".upload-attachment").append('<div><a download="'+name+'"  href="'+mailAttachmentPath+data.data.fileName+'" name="' + size + '">'+name+'</a><a>删除</a></div>')
                        $(".addText").next().val('')
                    }else{
                        $(".upload-attachment>div:last-child").remove();
                        $(".upload-attachment").append('<div><a href="">'+name+'</a><a>上传失败点击删除</a></div>');
                        $(".addText").next().val('')
                    }
                },
                error: function () {
                    $(".upload-attachment>div:last-child").remove();
                    $(".upload-attachment").append('<div><a href="">'+name+'</a><a>上传失败点击删除</a></div>');
                    $(".addText").next().val('')
                }
            })
        })
        $(".upload-attachment").on("click","div>a:nth-child(2)",function () {
            $(this).parent().remove();
        })
    }
);

var xhrOnProgress=function(fun) {
    xhrOnProgress.onprogress = fun;
    return function() {
        var xhr = $.ajaxSettings.xhr();
        if (typeof xhrOnProgress.onprogress !== 'function')
            return xhr;
        if (xhrOnProgress.onprogress && xhr.upload) {
            xhr.upload.onprogress = xhrOnProgress.onprogress;
        }
        return xhr;
    }
}

function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

function listContacs() {
    jgList = [];
    jgMap = {};
    $.ajax({
        type: "GET",
        url: rootPath + "/api/listAllOrganization",
        dataType: "json",
        cache: false,
        async: false,
        data: {},
        success: function (data) {
            if (data.status === 200) {
                for (var i = 0; i < data.data.length; i++) {
                    jgList[i] = data.data[i];
                    jgMap[data.data[i].id] = data.data[i];
                }
            }
        },
        error: function () {
            bootAlert("服务器请求失败")
        }
    })
    var html = "<ul><li><a class='dept' id='jg32'>\n" +
        "                        <img src='" + rootPath + "/resources/icon/iconse.png'>\n" +
        "                        <img src=" + rootPath + "/resources/icon/zuocechouti.png>\n" +
        "                        杭州市计生协\n" +
        "                        <label>\n" +
        "                            <input type=\"checkbox\">\n" +
        "                            <span></span>\n" +
        "                        </label>\n" +
        "                    </a>\n";
    html += "<ul><li>\n" +
        "                            <a id='jgmember0' class='dept-members'>\n" +
        "                                <img src='" + rootPath + "/resources/icon/iconse.png'>\n" +
        "                                <img src='" + rootPath + "/resources/icon/wenjian.png'>\n" +
        "                                部门成员\n" +
        "                                <label>\n" +
        "                                    <input type=\"checkbox\">\n" +
        "                                    <span></span>\n" +
        "                                </label>\n" +
        "                            </a>\n" +
        "                            <ul>\n" +
        "                                <li>\n";
    for (var i = 0; i < jgList.length; i++) {
        if (jgList[i].parentOrganizationId === -1) {
            $.ajax({
                type: "GET",
                url: rootPath + "/api/getMembers",
                dataType: "json",
                cache: false,
                async: false,
                data: {
                    organizationId: jgList[i].id,
                },
                success: function (data) {
                    if (data.status === 200) {
                        for (var i = 0; i < data.data.length; i++) {
                            html += "<a id='member" + data.data[i].id + "' class=\"member\">\n" +
                                "                                        <div></div>\n" +
                                "                                        <img src='" + rootPath + "/resources/icon/";
                            if (data.data[i].type === 1) html += "chengyuankaobei.png";
                            else html += "chengyuan2.png";
                            html +="'>" + data.data[i].name + "\n" +
                                "                                        <label>\n" +
                                "                                            <input id='member" + data.data[i].id + "' type=\"checkbox\">\n" +
                                "                                            <span></span>\n" +
                                "                                        </label>\n" +
                                "                                    </a>\n";
                        }
                    }
                }
            })
            html += "</li></ul></li>";
        }
    }
    for (var i = 0; i < jgList.length; i++) {
        if (jgList[i].parentOrganizationId === 32) {
            html += "<li>\n" +
                "                            <a class='dept' id='jg" + jgList[i].id + "'>\n" +
                "                                <img src='" + rootPath + "/resources/icon/iconse.png'>\n" +
                "                                <img src='" + rootPath + "/resources/icon/wenjian.png'>\n" +
                "                                " + jgList[i].name + "\n" +
                "                                <label>\n" +
                "                                    <input type=\"checkbox\">\n" +
                "                                    <span></span>\n" +
                "                                </label>\n" +
                "                            </a>\n"
            html += "<ul><li>\n" +
                "                            <a id='jgmember" + jgList[i].id + "' class='dept-members'>\n" +
                "                                <img src='" + rootPath + "/resources/icon/iconse.png'>\n" +
                "                                <img src='" + rootPath + "/resources/icon/wenjian.png'>\n" +
                "                                部门成员\n" +
                "                                <label>\n" +
                "                                    <input type=\"checkbox\">\n" +
                "                                    <span></span>\n" +
                "                                </label>\n" +
                "                            </a>\n" +
                "                            <ul>\n" +
                "                                <li>\n";
            $.ajax({
                type: "GET",
                url: rootPath + "/api/getMembers",
                dataType: "json",
                cache: false,
                async: false,
                data: {
                    organizationId: jgList[i].id,
                },
                success: function (data) {
                    if (data.status === 200) {
                        for (var i = 0; i < data.data.length; i++) {
                            html += "<a id='member" + data.data[i].id + "' class=\"member\">\n" +
                                "                                        <div></div>\n" +
                                "                                        <img src='" + rootPath + "/resources/icon/";
                            if (data.data[i].type === 1) html += "chengyuankaobei.png";
                            else html += "chengyuan2.png";
                            html +="'>" + data.data[i].name + "\n" +
                                "                                        <label>\n" +
                                "                                            <input id='member" + data.data[i].id + "' type=\"checkbox\">\n" +
                                "                                            <span></span>\n" +
                                "                                        </label>\n" +
                                "                                    </a>\n";
                        }
                    }
                }
            })
            html += "</li></ul></li>";
            for (var j = 0; j < jgList.length; j++) {
                if (jgList[j].parentOrganizationId === jgList[i].id) {
                    html += "<li>\n" +
                        "                                    <a class='dept' id='jg" + jgList[j].id + "'>\n" +
                        "                                        <img src='" + rootPath + "/resources/icon/iconse.png'>\n" +
                        "                                        <img src='" + rootPath + "/resources/icon/wenjian.png'>\n" +
                        "                                        " + jgList[j].name + "\n" +
                        "                                        <label>\n" +
                        "                                            <input type=\"checkbox\">\n" +
                        "                                            <span></span>\n" +
                        "                                        </label>\n" +
                        "                                    </a>\n";
                    html += "<ul><li>\n" +
                        "                            <a id='jgmember" + jgList[j].id + "' class='dept-members'>\n" +
                        "                                <img src='" + rootPath + "/resources/icon/iconse.png'>\n" +
                        "                                <img src='" + rootPath + "/resources/icon/wenjian.png'>\n" +
                        "                                部门成员\n" +
                        "                                <label>\n" +
                        "                                    <input type=\"checkbox\">\n" +
                        "                                    <span></span>\n" +
                        "                                </label>\n" +
                        "                            </a>\n" +
                        "                            <ul>\n" +
                        "                                <li>\n";
                    $.ajax({
                        type: "GET",
                        url: rootPath + "/api/getMembers",
                        dataType: "json",
                        cache: false,
                        async: false,
                        data: {
                            organizationId: jgList[j].id,
                        },
                        success: function (data) {
                            if (data.status === 200) {
                                for (var i = 0; i < data.data.length; i++) {
                                    html += "<a id='member" + data.data[i].id + "' class=\"member\">\n" +
                                        "                                        <div></div>\n" +
                                        "                                        <img src='" + rootPath + "/resources/icon/";
                                    if (data.data[i].type === 1) html += "chengyuankaobei.png";
                                    else html += "chengyuan2.png";
                                    html +="'>" + data.data[i].name + "\n" +
                                        "                                        <label>\n" +
                                        "                                            <input id='member" + data.data[i].id + "' type=\"checkbox\">\n" +
                                        "                                            <span></span>\n" +
                                        "                                        </label>\n" +
                                        "                                    </a>\n";
                                }
                            }
                        }
                    })
                    html += "</li></ul></li>";
                    for (var k = 0; k < jgList.length; k++) {
                        if (jgList[k].parentOrganizationId === jgList[j].id) {
                            html += "<li>\n" +
                                "                                            <a class='dept-members' id='jg" + jgList[k].id + "'>\n" +
                                "                                                <img src='" + rootPath + "/resources/icon/iconse.png'>\n" +
                                "                                                <img src='" + rootPath + "/resources/icon/wenjian.png'>\n" +
                                "                                                " + jgList[k].name + "\n" +
                                "                                                <label>\n" +
                                "                                                    <input type=\"checkbox\">\n" +
                                "                                                    <span></span>\n" +
                                "                                                </label>\n" +
                                "                                            </a>\n";
                            html += "<ul><li>";
                            $.ajax({
                                type: "GET",
                                url: rootPath + "/api/getMembers",
                                dataType: "json",
                                cache: false,
                                async: false,
                                data: {
                                    organizationId: jgList[k].id,
                                },
                                success: function (data) {
                                    if (data.status === 200) {
                                        for (var i = 0; i < data.data.length; i++) {
                                            html += "<a id='member" + data.data[i].id + "' class=\"member\">\n" +
                                                "                                        <div></div>\n" +
                                                "                                        <img src='" + rootPath + "/resources/icon/";
                                            if (data.data[i].type === 1) html += "chengyuankaobei.png";
                                            else html += "chengyuan2.png";
                                            html +="'>" + data.data[i].name + "\n" +
                                                "                                        <label>\n" +
                                                "                                            <input id='member" + data.data[i].id + "' type=\"checkbox\">\n" +
                                                "                                            <span></span>\n" +
                                                "                                        </label>\n" +
                                                "                                    </a>\n";
                                        }
                                    }
                                }
                            })
                            html += "</li></ul>";
                        }
                    }
                    html += "</li></ul></li>";
                }
            }
            html += "</ul></li>";
        }
    }
    html += "</ul></li></ul>";
    $("#selectRecipients .search-member").html(html);
}