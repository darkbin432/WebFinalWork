/**
 *    Overall version 1.6
 *    This version 1.6
 */

var jgList = [];
var jgMap = {};
var scopeList = [];
var allScope = {};
var selectedScope = [];

var tmpData = {};

var zzjsbbbjId = null;
var ndbbbjId = null;
var selectScopeId = -1;
var zzjsFiledStatus = 0;
var ndFiledStatus = 0;
var hyglYearIsFiled = 0;
var xmgzYearIsFiled = 0;
var ybScoped;
var ybType = 1;
var volunteerStatus = 0;
var isReportNxhd=0;
var floatReport="";
var heartReport="";

jQuery(function ($) {

    judge();
    listAlljgList();
    listAllScope();
    listYear();
    ybScoped = user.scopeId;

    //权限判断
    function judge() {
        if (user.type === 1) {
            if (user.scopeId === 0) {
                $(".statistics-buttons .main-button").removeClass("hidden");
            } else {
                $(".statistics-buttons .main-button").addClass("hidden");
            }
            $("#ZZJSSB").removeClass("hidden");
            $("#YBSB").removeClass("hidden");
            $("#TSLDSB").removeClass("hidden");
            $("#NDGZSB").removeClass("hidden");
            if (user.scopeId == 0) {
                $("#localReport").addClass("hidden");
                if($("#LDRKSFD").hasClass("selected-li")){
                    $("#xzsfd").removeClass("hidden");
                    $(".right-main:nth-child(2) .query-terms").removeClass("hidden");
                }
                if($("#NXHD").hasClass("selected-li")){
                    $("#xzsfd").removeClass("hidden");
                }
                if ($("#NDGZSB").hasClass("selected-li")){
                    $("#localReport").removeClass("hidden");
                }

            }else{
                $("#localReport").removeClass("hidden");
            }
            if($("#LDRKSFD").hasClass("selected-li")){
                $(".statistics-buttons .main-button").addClass("hidden");
            }
            if(user.scopeId%10000==0&&user.scopeId!=0){
                $(".monthInfo0").remove();
                $(".monthInfo1").remove();
                $(".monthInfo2").remove();
                $(".peopleButton").remove();
                $("#hd").remove();
                if($("#LDRKSFD").hasClass("selected-li")){
                    $("#xjsb").addClass("hidden");
                    $("#xzsbjl").removeClass("hidden");
                    $(".sfd").removeClass("hidden");
                    $("#monthTable").addClass("hidden");
                    $(".right-main:nth-child(4) .query-terms").removeClass("hidden");
                }
                if($("#NXHD").hasClass("selected-li")){
                    $("#localReport").addClass("hidden");
                    $("#xzsfd").removeClass("hidden");
                }

            }else if(user.scopeId%100==0&&user.scopeId!=0){
                $(".monthInfo0").remove();
                $(".monthInfo1").remove();
                $(".monthInfo2").remove();
                $(".peopleButton").remove();
                $("#ybZongjie").attr("contenteditable", "false");
                $(".FZRinput").attr("disabled", "disabled");
                $(".activityButton").remove();
                $("#hd").remove();
                $("#LDRKSFD").addClass("hidden");
                if($("#NXHD").hasClass("selected-li")){
                    $("#localReport").addClass("hidden");
                    $("#xzsfd").removeClass("hidden");
                }
            } else if (user.scopeId % 100 != 0){
                $("#hd").remove();
                $("#LDRKSFD").addClass("hidden");
                if($("#NXHD").hasClass("selected-li")){
                    $("#xjsb").addClass("hidden");
                    $("#xzsbjl").removeClass("hidden");
                    $(".nxhd").removeClass("hidden");
                    $("#monthTable").addClass("hidden");
                }
            }
            if ($("#TSLDSB").hasClass("selected-li")) {
                $(".statistics-buttons .main-button").html('<img src="' + rootPath + '/resources/icon/5-shangbao.png">活动上报');
                $(".statistics-buttons .main-button").removeAttr("disabled");
                $(".statistics-buttons .main-button").removeClass("isFiled");
                if (user.scopeId != 0){
                    $(".statistics-buttons .main-button").removeClass("hidden");
                }else{
                    $(".statistics-buttons .main-button").addClass("hidden");
                }
            }
            if($("#YBXQ").hasClass("selected-li")||$("#JTBFJL").hasClass("selected-li")||$("#NXHD").hasClass("selected-li")){
                $(".statistics-buttons .main-button").addClass("hidden");
            }
        } else {
            $("#ZZJSSB").addClass("hidden");
            $("#YBSB").addClass("hidden");
            $("#NDGZSB").addClass("hidden");
            $("#LDRKSFD").addClass("hidden");
            $("#NXHD").addClass("hidden");
            $(".statistics-buttons .main-button").addClass("hidden");
        }
        if ($("#TSLDSB").hasClass("selected-li")||$("#JTBFJL").hasClass("selected-li")) {
            $(".excel-button").addClass("hidden");
        }
    }

    //获得所有机构信息
    function listAlljgList() {
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
    }

    //顶部导航切换
    $(".myHeader ul li").eq(5).addClass("current-li");
    $(".myHeader ul li").eq(5).children("div").addClass("current-div");
    //左侧点击事件
    $(".left").on('click', 'li a', function () {
        if ($(this).children("img").length === 0)
            $(".left li a").removeClass("selected-li");
        if ($(this).children("img").length === 0)
            $(this).addClass("selected-li");
        if ($(this).children("img:nth-child(1)").css("transform") === "matrix(1, 0, 0, 1, 0, 0)") {
            $(this).children("img:nth-child(1)").css("transform", "rotate(90deg)");
        } else {
            $(this).children("img:nth-child(1)").css("transform", "rotate(0deg)");
        }
        if ($(this).next("ul").length) {
            if ($(this).next("ul").css("display") === "none")
                $(this).next("ul").css("display", "block");
            else
                $(this).next("ul").css("display", "none");
        }
        if ($("#JTBFJL").hasClass("selected-li")) {
            $(".right-main:nth-child(1) .query-terms label:nth-child(n+2)").removeClass("hidden");
            // $(".right-main:nth-child(1) .statistics-buttons").addClass("hidden");
        } else {
            $(".right-main:nth-child(1) .query-terms label:nth-child(n+2)").addClass("hidden");
            // $(".right-main:nth-child(1) .statistics-buttons").removeClass("hidden");
        }
        $("#xzsfd").addClass("hidden");
        $("#xzsbjl").addClass("hidden");
        $("#xjsb").removeClass("hidden");
        $("#monthTable").removeClass("hidden");
        $(".excel-button").removeClass("hidden");
        $(".sfd").addClass("hidden");
        $(".nxhd").addClass("hidden");
        $(".right-main:nth-child(4) .query-terms").addClass("hidden");
        $(".right-main:nth-child(2) .query-terms").addClass("hidden");
        judge();
    });
    $(".left li a").mouseover(function () {
        $(this).children("img").attr("src", rootPath + "/resources/icon/shubiaojingguo.png");
    });
    $(".left li a").mouseout(function () {
        $(this).children("img").attr("src", rootPath + "/resources/icon/fanhui1.png");
    });
    //顶部按钮切换
    $(".ndbjsbBtn div").click(function () {
        $(".ndbjsbBtn div").removeClass("current-top-div");
        $(".ndbjsbBtn div").removeClass("right-div");
        $(".ndbjsbBtn div").removeClass("left-div");
        if ($(this).index() === 0) {
            $(this).addClass("current-top-div");
        } else {
            $(".ndbjsbBtn div:nth-child(" + $(this).index() + ")").addClass("right-div");
            $(this).addClass("current-top-div");
        }
    });
    $(".zzbjsbBtn div").click(function () {
        $(".zzbjsbBtn div").removeClass("current-top-div");
        $(".zzbjsbBtn div").removeClass("right-div");
        $(".zzbjsbBtn div").removeClass("left-div");
        if ($(this).index() === 0) {
            $(this).addClass("current-top-div");
        } else {
            $(".zzbjsbBtn div:nth-child(" + $(this).index() + ")").addClass("right-div");
            $(this).addClass("current-top-div");
        }
    });
    $(".ybbjsbBtn div").click(function () {
        $(".ybbjsbBtn div").removeClass("current-top-div");
        $(".ybbjsbBtn div").removeClass("right-div");
        $(".ybbjsbBtn div").removeClass("left-div");
        if ($(this).index() === 0) {
            $(this).addClass("current-top-div");
        } else {
            $(".ybbjsbBtn div:nth-child(" + $(this).index() + ")").addClass("right-div");
            $(this).addClass("current-top-div");
        }
    });
    //选择框初始化
    $(".huiyuan-date-select").select2({
        minimumResultsForSearch: -1,
    });
    $("#add-special-activity-project").select2({
        minimumResultsForSearch: -1,
    });
    $(".ActivityYear-select").select2({
        minimumResultsForSearch: -1,
    });
    $("#area-select").select2({
        placeholder:"--地区名称--",
        minimumResultsForSearch: -1,
    });
    $("#street-select").select2({
        placeholder:"--街道名称--",
        minimumResultsForSearch: -1,
    });
    $("#shequ-select").select2({
        placeholder:"--社区名称--",
        minimumResultsForSearch: -1,
    });
    $(".ybjl-select").select2({
        minimumResultsForSearch: -1,
    });
    $(".ldrkjsx-select").select2({
        minimumResultsForSearch: -1,
    });
    $(".ldrkjsx1-select").select2({
        minimumResultsForSearch: -1,
    });
    var datTableInitbangfu = {
        "bServerSide": true,
        "processing": true,
        "sScrollX": "100%",
        //表格的宽度
        "sScrollY": "400px",
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
            "sInfo": "第 _START_ 到 _END_ 条记录，共 _TOTAL_ 条",
            "sZeroRecords": "没有相关记录"
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
    datTableInitbangfu["sAjaxSource"] = rootPath + '/api/getFamilyHelpRecord';
    // 设置字段数据源
    datTableInitbangfu["aoColumns"] = [
        {
            "data": "id"
        },
        {
            "data": "id"
        },
        {
            "data": "id"
        },
        {
            "data": "id"
        },
    ];
    // 渲染字段数据源
    datTableInitbangfu["aoColumnDefs"] = [
        {
            "aTargets": [0], "mRender": function (data, type, row, meta) {
                return "<div><div class='bangfuname'>" + row.huiyuanName + "</div></div>";
            }
        },
        {
            "aTargets": [1], "mRender": function (data, type, row, meta) {
                return row.huiyuanCardNo;
            }
        },
        {
            "aTargets": [2], "mRender": function (data, type, row, meta) {
                return row.createdTime;
            }
        },
        {
            "aTargets": [3], "mRender": function (data, type, row, meta) {
                return "<div><div class='bangfuaddress'>" + row.huiyuanAddress + "</div></div>"
            }
        },
    ];

    datTableInitbangfu["fnServerData"] = function (sSource, aoData, fnCallback) {
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
                year: $(".huiyuan-date-select").val(),
                huiyuanName: $(".fsdx").val(),
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
    var dataInfoTablebangfu = $("#bangfu-table").dataTable(datTableInitbangfu).api();

    var dataTableInitJilu = {
        "bServerSide": true,
        "processing": true,
        "sScrollX": "100%",
        //表格的宽度
        "sScrollY": "400px",
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
        "aLengthMenu": [100, 25, 50, 100],
        //设置选择每页的条目数
        "iDisplayLength": 100,
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
            "sInfo": "第 _START_ 到 _END_ 条记录，共 _TOTAL_ 条",
            "sZeroRecords": "没有相关记录"
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
    dataTableInitJilu["sAjaxSource"] = rootPath + '/api/getOrganizationConstructionReport';
    // 设置字段数据源
    dataTableInitJilu["aoColumns"] = [
        {
            "data": "id"
        },
        {
            "data": "title"
        },
        {
            "data": "createdTime"
        },
        {
            "data": "updatedTime"
        },
        {
            "data": "id"
        },
    ];
    // 渲染字段数据源
    dataTableInitJilu["aoColumnDefs"] = [
        {
            "aTargets": [0], "mRender": function (data, type, row, meta) {
                return meta.row + 1 + meta.settings._iDisplayStart;
            }
        },
        {
            "aTargets": [1], "mRender": function (data, type, row, meta) {
                return row.scopeName + "组织建设报表";
            }
        },
        {
            "aTargets": [2], "mRender": function (data, type, row, meta) {
                return row.createdTime.substring(0, 10);
            }
        },
        {
            "aTargets": [3], "mRender": function (data, type, row, meta) {
                return row.reportPersonName;
            }
        },
        {
            "aTargets": [4], "mRender": function (data, type, row, meta) {
                return "<div class='table-operate'><a id='" + row.scopeId + "'>查看</a></div>";
            }
        },
    ];

    dataTableInitJilu["fnServerData"] = function (sSource, aoData, fnCallback) {
        $.ajax({
            "type": 'get',
            "url": sSource,
            "dataType": "json",
            "data": {//查询条件写这里
                //dataTable固定参数
                aoData: JSON.stringify(aoData),
                // 选填参数
                // search: searchText
                scopeId: selectScopeId,
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
    var dataInfoTableJilu = $("#jilu-table").dataTable(dataTableInitJilu).api();

    var dataInfoTableSFD = {
        "bServerSide": true,
        "processing": true,
        "sScrollX": "100%",
        //表格的宽度
        "sScrollY": "400px",
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
        "aLengthMenu": [100, 25, 50, 100],
        //设置选择每页的条目数
        "iDisplayLength": 15,
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
            "sInfo": "第 _START_ 到 _END_ 条记录，共 _TOTAL_ 条",
            "sZeroRecords": "没有相关记录"
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
    dataInfoTableSFD["sAjaxSource"] = rootPath + '/api/getFloatingPopulationReport';
    // 设置字段数据源
    dataInfoTableSFD["aoColumns"] = [
        {
            "data": "id"
        },
        {
            "data": "title"
        },
        {
            "data": "createdTime"
        },
        {
            "data": "updatedTime"
        },
        {
            "data": "id"
        },
    ];
    // 渲染字段数据源
    dataInfoTableSFD["aoColumnDefs"] = [
        {
            "aTargets": [0], "mRender": function (data, type, row, meta) {
                return meta.row + 1 + meta.settings._iDisplayStart;
            }
        },
        {
            "aTargets": [1], "mRender": function (data, type, row, meta) {
                return row.name;
            }
        },
        {
            "aTargets": [2], "mRender": function (data, type, row, meta) {
                return row.createdTime.substring(0, 10);
            }
        },
        {
            "aTargets": [3], "mRender": function (data, type, row, meta) {
                return row.reportPersonName;
            }
        },
        {
            "aTargets": [4], "mRender": function (data, type, row, meta) {
                return "<div class='table-operate'><a id='" + row.id + "'>查看</a></div>";
            }
        },
    ];

    dataInfoTableSFD["fnServerData"] = function (sSource, aoData, fnCallback) {
        $.ajax({
            "type": 'get',
            "url": sSource,
            "dataType": "json",
            "data": {//查询条件写这里
                //dataTable固定参数
                aoData: JSON.stringify(aoData),
                // 选填参数
                // search: searchText
                scopeId: user.scopeId,
                year: $(".ldrkjsx-select").val(),
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
    var dataInfoTableSFD = $("#sfd-table").dataTable(dataInfoTableSFD).api();

    var dataInfoTableNXHD = {
        "bServerSide": true,
        "processing": true,
        "sScrollX": "100%",
        //表格的宽度
        "sScrollY": "400px",
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
        "aLengthMenu": [15, 25, 50, 100],
        //设置选择每页的条目数
        "iDisplayLength": 15,
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
            "sInfo": "第 _START_ 到 _END_ 条记录，共 _TOTAL_ 条",
            "sZeroRecords": "没有相关记录"
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
    dataInfoTableNXHD["sAjaxSource"] = rootPath + '/api/getWarmHeartReportLici';
    // 设置字段数据源
    dataInfoTableNXHD["aoColumns"] = [
        {
            "data": "id"
        },
        {
            "data": "id"
        },
        {
            "data": "createdTime"
        },
        {
            "data": "updatedTime"
        },
        {
            "data": "id"
        },
    ];
    // 渲染字段数据源
    dataInfoTableNXHD["aoColumnDefs"] = [
        {
            "aTargets": [0], "mRender": function (data, type, row, meta) {
                return meta.row + 1 + meta.settings._iDisplayStart;
            }
        },
        {
            "aTargets": [1], "mRender": function (data, type, row, meta) {
                return row.scopeName;
            }
        },
        {
            "aTargets": [2], "mRender": function (data, type, row, meta) {
                return row.createdTime.substring(0, 10);
            }
        },
        {
            "aTargets": [3], "mRender": function (data, type, row, meta) {
                return row.reportPersonName;
            }
        },
        {
            "aTargets": [4], "mRender": function (data, type, row, meta) {
                return "<div class='table-operate'><a id='" + row.id + "'>查看</a></div>";
            }
        },
    ];

    dataInfoTableNXHD["fnServerData"] = function (sSource, aoData, fnCallback) {
        $.ajax({
            "type": 'get',
            "url": sSource,
            "dataType": "json",
            "data": {//查询条件写这里
                //dataTable固定参数
                aoData: JSON.stringify(aoData),
                // 选填参数
                // search: searchText
                scopeId:user.scopeId
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
    var dataInfoTableNXHD = $("#nxhd-table").dataTable(dataInfoTableNXHD).api();

    var datTableInitHuiyuan = {
        "bServerSide": true,
        "processing": true,
        "sScrollX": "100%",
        //表格的宽度
        "sScrollY": "400px",
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
        "aLengthMenu": [100, 25, 50, 100],
        //设置选择每页的条目数
        "iDisplayLength": 100,
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
            "sInfo": "第 _START_ 到 _END_ 条记录，共 _TOTAL_ 条",
            "sZeroRecords": "没有相关记录"
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
    datTableInitHuiyuan["sAjaxSource"] = rootPath + '/api/getHuiyuanReport';
    // 设置字段数据源
    datTableInitHuiyuan["aoColumns"] = [
        {
            "data": "id"
        },
        {
            "data": "title"
        },
        {
            "data": "createdTime"
        },
        {
            "data": "updatedTime"
        },
        {
            "data": "createMemberName"
        },
    ];
    // 渲染字段数据源
    datTableInitHuiyuan["aoColumnDefs"] = [
        {
            "aTargets": [0], "mRender": function (data, type, row, meta) {
                if (row.scopeName != "杭州市"){
                    return row.scopeName + "计生协";
                }else{
                    return "合计";
                }
            }
        },
        {
            "aTargets": [1], "mRender": function (data, type, row, meta) {
                if (row.huiyuanCount == ""){
                    return "0";
                }else{
                    return row.huiyuanCount;
                }
            }
        },
        {
            "aTargets": [2], "mRender": function (data, type, row, meta) {
                var male = 0;
                var female = 0;
                if (row.huiyuanCount != "" && row.huiyuanCount != 0){
                    male = parseInt((row.male / row.huiyuanCount) * 100);
                    female = 100 - male;
                }
                return "<div>\n" +
                    "<div class=\"col-lg-6\">" + male + "%</div>\n" +
                    "<div class=\"col-lg-6\">" + female + "%</div>\n" +
                    "</div>";
            }
        },
        {
            "aTargets": [3], "mRender": function (data, type, row, meta) {
                var geti = 0;
                var tuanti = 0;
                var liudong = 0;
                var changzhu = 0;
                if (row.geti != ""){
                    geti = row.geti;
                }
                if (row.tuanti != ""){
                    tuanti = row.tuanti;
                }
                if (row.liudong != ""){
                    liudong = row.liudong;
                }
                if (row.changzhu != ""){
                    changzhu = row.changzhu;
                }
                return "<div>\n" +
                    "                                                <div class=\"col-lg-3\">" + geti + "</div>\n" +
                    "                                                <div class=\"col-lg-3\">" + tuanti + "</div>\n" +
                    "                                                <div class=\"col-lg-3\">" + liudong + "</div>\n" +
                    "                                                <div class=\"col-lg-3\">" + changzhu + "</div>\n" +
                    "                                            </div>";
            }
        },
        {
            "aTargets": [4], "mRender": function (data, type, row, meta) {
                var shidu = 0;
                var yuling = 0;
                var qingshaonian = 0;
                if (row.shidu != ""){
                    shidu = row.shidu;
                }
                if (row.yuling != ""){
                    yuling = row.yuling;
                }
                if (row.qingshaonian != ""){
                    qingshaonian= row.qingshaonian;
                }
                return "<div>\n" +
                    "                                                <div class=\"col-lg-4\">" + shidu + "</div>\n" +
                    "                                                <div class=\"col-lg-4\">" + yuling + "</div>\n" +
                    "                                                <div class=\"col-lg-4\">" + qingshaonian + "</div>\n" +
                    "                                            </div>";
            }
        },
    ];

    datTableInitHuiyuan["fnServerData"] = function (sSource, aoData, fnCallback) {
        $.ajax({
            "type": 'get',
            "url": sSource,
            "dataType": "json",
            "data": {//查询条件写这里
                //dataTable固定参数
                aoData: JSON.stringify(aoData),
                // 选填参数
                // search: searchText
                year: $(".huiyuan-date-select").val(),
                volunteerStatus: volunteerStatus,
            },
            "success": function (resp) {
                if (resp.status != 200) {
                    bootAlert(resp.msg);
                } else {
                    hyglYearIsFiled = 0;
                    for (var i = 0; i < resp.data.length; i++) {
                        if (resp.data[i].isFiled == 1) {
                            hyglYearIsFiled = 1;
                            break;
                        }
                    }
                    if (hyglYearIsFiled == 1) {
                        $(".statistics-buttons .main-button").html("已归档");
                        $(".statistics-buttons .main-button").attr("disabled", "disabled");
                        $(".statistics-buttons .main-button").addClass("isFiled");
                    } else {
                        $(".statistics-buttons .main-button").html('<img src=' + rootPath + '/resources/icon/3-guidang.png>归档');
                        $(".statistics-buttons .main-button").attr("disabled", false);
                        $(".statistics-buttons .main-button").removeClass("isFiled");
                    }
                    if ($("#TSLDSB").hasClass("selected-li")) {
                        $(".statistics-buttons .main-button").html('<img src="' + rootPath + '/resources/icon/5-shangbao.png">活动上报');
                        $(".statistics-buttons .main-button").removeAttr("disabled");
                        $(".statistics-buttons .main-button").removeClass("isFiled");
                    }
                    fnCallback(resp);
                }
            }
        });
    }
    // table初始化
    var dataInfoTableHuiyuan = $("#huiyuan-table").dataTable(datTableInitHuiyuan).api();

    var datTableInitTaskAnalysis = {
        "bServerSide": true,
        "processing": true,
        "sScrollX": "100%",
        //表格的宽度
        "sScrollY": "400px",
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
            "sInfo": "第 _START_ 到 _END_ 条记录，共 _TOTAL_ 条",
            "sZeroRecords": "没有相关记录"
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
    datTableInitTaskAnalysis["sAjaxSource"] = rootPath + '/api/getProjectWorkReport';
    // 设置字段数据源
    datTableInitTaskAnalysis["aoColumns"] = [
        {
            "data": null
        },
        {
            "data": "title"
        },
    ];
    // 渲染字段数据源
    datTableInitTaskAnalysis["aoColumnDefs"] = [
        {
            "aTargets": [0], "mRender": function (data, type, row, meta) {
                if (row.scopeId == 0){
                    return "合计";
                }
                return row.scopeName + "计生协";
            }
        },
        {
            "aTargets": [1], "mRender": function (data, type, row, meta) {
                return "<div class=\"eightTaskTable\">\n" +
                    "                                                <div>" + (row.xuanchuanjyhdcs == "" ? 0 : row.xuanchuanjyhdcs) + "</div>\n" +
                    "                                                <div>" + (row.xuanchuanjyfwrs == "" ? 0 : row.xuanchuanjyfwrs) + "</div>\n" +
                    "                                                <div>" + (row.yewupxhdcs == "" ? 0 : row.yewupxhdcs) + "</div>\n" +
                    "                                                <div>" + (row.yewupxfwrs == "" ? 0 : row.yewupxfwrs) + "</div>\n" +
                    "                                                <div>" + (row.jiankangfwhdcs == "" ? 0 : row.jiankangfwhdcs) + "</div>\n" +
                    "                                                <div>" + (row.jiankangfwfwrs == "" ? 0 : row.jiankangfwfwrs) + "</div>\n" +
                    "                                                <div>" + (row.jishengjtbfhdcs == "" ? 0 : row.jishengjtbfhdcs) + "</div>\n" +
                    "                                                <div>" + (row.jishengjtbffwrs == "" ? 0 : row.jishengjtbffwrs) + "</div>\n" +
                    "                                                <div>" + (row.qingchunjkhdcs == "" ? 0 : row.qingchunjkhdcs) + "</div>\n" +
                    "                                                <div>" + (row.qingchunjkfwrs == "" ? 0 : row.qingchunjkfwrs) + "</div>\n" +
                    "                                                <div>" + (row.liudongrkfwhdcs == "" ? 0 : row.liudongrkfwhdcs) + "</div>\n" +
                    "                                                <div>" + (row.liudongrkfwfwrs == "" ? 0 : row.liudongrkfwfwrs) + "</div>\n" +
                    "                                                <div>" + (row.quanyiwhhdcs == "" ? 0 : row.quanyiwhhdcs) + "</div>\n" +
                    "                                                <div>" + (row.qitahdcs == "" ? 0 : row.qitahdcs) + "</div>\n" +
                    "                                                <div>" + (row.qitafwrs == "" ? 0 : row.qitafwrs) + "</div>\n" +
                    "                                            </div>";

            }

        },
    ];

    datTableInitTaskAnalysis["fnServerData"] = function (sSource, aoData, fnCallback) {
        $.ajax({
            "type": 'get',
            "url": sSource,
            "dataType": "json",
            "data": {//查询条件写这里
                //dataTable固定参数
                aoData: JSON.stringify(aoData),
                // 选填参数
                // search: searchText
                year: $(".huiyuan-date-select").val()
            },
            "success": function (resp) {
                if (resp.status != 200) {
                    bootAlert(resp.msg);
                } else {
                    xmgzYearIsFiled = 0;
                    for (var i = 0; i < resp.data.length; i++) {
                        if (resp.data[i].isFiled == 1) {
                            xmgzYearIsFiled = 1;
                            break;
                        }
                    }
                    if (xmgzYearIsFiled == 1) {
                        $(".statistics-buttons .main-button").html("已归档");
                        $(".statistics-buttons .main-button").attr("disabled", "disabled");
                        $(".statistics-buttons .main-button").addClass("isFiled");
                    } else {
                        $(".statistics-buttons .main-button").html('<img src=' + rootPath + '/resources/icon/3-guidang.png>归档');
                        $(".statistics-buttons .main-button").attr("disabled", false);
                        $(".statistics-buttons .main-button").removeClass("isFiled");
                    }
                    if ($("#TSLDSB").hasClass("selected-li")) {
                        $(".statistics-buttons .main-button").html('<img src="' + rootPath + '/resources/icon/5-shangbao.png">活动上报');
                        $(".statistics-buttons .main-button").removeAttr("disabled");
                        $(".statistics-buttons .main-button").removeClass("isFiled");
                    }
                    fnCallback(resp);
                }
            }
        });
    }
    // table初始化
    var dataInfoTableTaskAnalysis = $("#taskAnalysis-table").dataTable(datTableInitTaskAnalysis).api();

    var dataInfoTableMonth = {
        "bServerSide": true,
        "processing": true,
        "sScrollX": "100%",
        //表格的宽度
        "sScrollY": "400px",
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
        "aLengthMenu": [20, 25, 50, 100],
        //设置选择每页的条目数
        "iDisplayLength": 20,
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
            "sInfo": "第 _START_ 到 _END_ 条记录，共 _TOTAL_ 条",
            "sZeroRecords": "没有相关记录"
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
    dataInfoTableMonth["sAjaxSource"] = rootPath + '/api/getProjectMonthlyReportTotalCount';
    // 设置字段数据源
    dataInfoTableMonth["aoColumns"] = [
        {
            "data": "organizationName"
        },
        {
            "data": "sumMonthlyAlonePerson"
        },
        {
            "data": "sumMonthlyMentalityPerson"
        },
        {
            "data": "sumMonthlyMigratePerson"
        },
        {
            "data": "sumMonthlyChangePerson"
        },
    ];
    // 渲染字段数据源
    dataInfoTableMonth["aoColumnDefs"] = [
		{
			"aTargets": [0], "mRender": function (data, type, row, meta) {
			    if (row.scopeId == 0){
			        return "&nbsp;&nbsp;&nbsp;&nbsp;合&nbsp;&nbsp;&nbsp;&nbsp;计&nbsp;";
                }
				return row.organizationName + "计生协";
			}
		},
    ];

    dataInfoTableMonth["fnServerData"] = function (sSource, aoData, fnCallback) {
        if($(".huiyuan-date-select").val()==null||$(".huiyuan-date-select").val().indexOf('-')==-1)
            var data=new Date().getFullYear()+'-'+(new Date().getMonth()+1);
        else
            var data=$(".huiyuan-date-select").val();
        $.ajax({
            "type": 'get',
            "url": sSource,
            "dataType": "json",
            "data": {//查询条件写这里
                //dataTable固定参数
                aoData: JSON.stringify(aoData),
                // 选填参数
                // search: searchText
                month:parseInt(data.split('-')[1]),
                year:parseInt(data.split('-')[0]),
                scopeId:0,
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
    var dataInfoTableMonth = $("#month-table").dataTable(dataInfoTableMonth).api();

    var dataInfoTableMonthReport = {
        "bServerSide": true,
        "processing": true,
        "sScrollX": "100%",
        //表格的宽度
        "sScrollY": "400px",
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
        "iDisplayLength": 100,
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
            "sInfo": "第 _START_ 到 _END_ 条记录，共 _TOTAL_ 条",
            "sZeroRecords": "没有相关记录"
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
            })
        },
    };
    // 设置请求url
    dataInfoTableMonthReport["sAjaxSource"] = rootPath + '/api/getOrganizationConstructionReportChildrenStatus';
    // 设置字段数据源
    dataInfoTableMonthReport["aoColumns"] = [
        {
            "data": ""
        },
        {
            "data": "organizationName"
        },
        {
            "data": "childStatus"
        },
        {
            "data": ""
        },
    ];
    // 渲染字段数据源
    dataInfoTableMonthReport["aoColumnDefs"] = [
        {
            "aTargets": [0], "mRender": function (data, type, row, meta) {
                return meta.row + 1 + meta.settings._iDisplayStart;
            }
        },
        {
            "aTargets": [1], "mRender": function (data, type, row, meta) {
                return row.organizationName+"计生协";
            }
        },
        {
            "aTargets": [2], "mRender": function (data, type, row, meta) {
                if (row.childStatus == 1) {
                    return "<span style='color: #222;'>已上报</span>";
                } else {
                    return "<span style='color: #fb2020;'>未上报</span>"
                }
            }
        },
        {
            "aTargets": [3], "mRender": function (data, type, row, meta) {
                if (user.type === 1) {
                    return "<a id='" + row.scopeId + "' style='color: #1890ff'>历次报表</a>"
                } else {
                    return "";
                }

            }
        },
    ];

    dataInfoTableMonthReport["fnServerData"] = function (sSource, aoData, fnCallback) {
        $.ajax({
            "type": 'get',
            "url": sSource,
            "dataType": "json",
            "data": {//查询条件写这里
                //dataTable固定参数
                aoData: JSON.stringify(aoData),
                // 选填参数
                // search: searchText
                year: (new Date()).getFullYear(),
                month:new Date().getMonth()+1,
                parentOrganizationId: user.organizationId,
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
    var dataInfoTableMonthReport = $("#monthReport-table").dataTable(dataInfoTableMonthReport).api();

    var dataInfoTableMonthReportInfo = {
        "bServerSide": true,
        "processing": true,
        "sScrollX": "100%",
        //表格的宽度
        "sScrollY": "400px",
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
            "sInfo": "第 _START_ 到 _END_ 条记录，共 _TOTAL_ 条",
            "sZeroRecords": "没有相关记录"
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
    dataInfoTableMonthReportInfo["sAjaxSource"] = rootPath + '/api/getAllProjectMonthlyReport';
    // 设置字段数据源
    dataInfoTableMonthReportInfo["aoColumns"] = [
        {"data":null},
        {
            "data": "informationCoding"
        },
        {
            "data": "fatherName"
        },
        {
            "data": "fatherIdCard"
        },
        {
            "data": "motherName"
        },
        {
            "data": "motherIdCard"
        },
        {
            "data": "address"
        },
        {
            "data": "aloneTime"
        },
        {
            "data": "reason"
        },
        {
            "data": "mobile"
        },
    ];
    // 渲染字段数据源
    dataInfoTableMonthReportInfo["aoColumnDefs"] = [
        {
            "aTargets": [0], "mRender": function (data, type, row, meta) {
                if(user.scopeId%100!=0)
                    return '<label>\n' +
                        '                                            <input id="'+row.id+'" class="" type="checkbox">\n' +
                        '                                            <span></span>\n' +
                        '                                        </label>'
                else
                    return "";
            }
        },
        {
            "aTargets": [6], "mRender": function (data, type, row, meta) {
                return "<div><div class='ybaddress'>"+row.address+"</div></div>"
            }
        },
        {
            "aTargets": [8], "mRender": function (data, type, row, meta) {
                return "<div class='reason1'><div>"+row.reason+"</div></div>"
            }
        },

    ];

    dataInfoTableMonthReportInfo["fnServerData"] = function (sSource, aoData, fnCallback) {
        if($(".ybjl-select").val()==null||$(".ybjl-select").val().indexOf('-')==-1)
            var date = new Date().getFullYear()+'-'+(new Date().getMonth()+1);
        else
            var date = $(".ybjl-select").val();
        $.ajax({
            "type": 'get',
            "url": sSource,
            "dataType": "json",
            "data": {//查询条件写这里
                //dataTable固定参数
                aoData: JSON.stringify(aoData),
                // 选填参数
                // search: searchText
                // title: $(".right-main:nth-child(1) .search-div>label>input").val()
                type: ybType,
                month: parseInt(date.split("-")[1]),
                year: parseInt(date.split("-")[0]),
                scopeId: ybScoped
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
    var dataInfoTableMonthReportInfo = $("#monthReportInfo-table").dataTable(dataInfoTableMonthReportInfo).api();

    var dataInfoTableMonthReportInfo1 = {
        "bServerSide": true,
        "processing": true,
        "sScrollX": "100%",
        //表格的宽度
        "sScrollY": "400px",
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
            "sInfo": "第 _START_ 到 _END_ 条记录，共 _TOTAL_ 条",
            "sZeroRecords": "没有相关记录"
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
    dataInfoTableMonthReportInfo1["sAjaxSource"] = rootPath + '/api/getAllProjectMonthlyReport';
    // 设置字段数据源
    dataInfoTableMonthReportInfo1["aoColumns"] = [
        {
            "data": null
        },
        {
            "data": "informationCoding"
        },
        {
            "data": "fatherName"
        },
        {
            "data": "fatherIdCard"
        },
        {
            "data": "motherName"
        },
        {
            "data": "motherIdCard"
        },
        {
            "data": "oldAddress"
        },
        {
            "data": "newAddress"
        },
        {
            "data": "reason"
        },
        {
            "data": "migrateTime"
        },
    ];
    // 渲染字段数据源
    dataInfoTableMonthReportInfo1["aoColumnDefs"] = [
        {
            "aTargets": [0], "mRender": function (data, type, row, meta) {
                if(user.scopeId%100!=0)
                    return '<label>\n' +
                        '                                            <input id="'+row.id+'" class="" type="checkbox">\n' +
                        '                                            <span></span>\n' +
                        '                                        </label>'
                else
                    return "";
            }
        },
        {
            "aTargets": [6], "mRender": function (data, type, row, meta) {
                return "<div><div class='yb1address'>"+row.oldAddress+"</div></div>"
            }
        },
        {
            "aTargets": [7], "mRender": function (data, type, row, meta) {
                return "<div><div class='yb1address'>"+row.newAddress+"</div></div>"
            }
        },
        {
            "aTargets": [8], "mRender": function (data, type, row, meta) {
                return "<div class='reason2'><div>"+row.reason+"</div></div>"
            }
        },
    ];

    dataInfoTableMonthReportInfo1["fnServerData"] = function (sSource, aoData, fnCallback) {
        if($(".ybjl-select").val()==null||$(".ybjl-select").val().indexOf('-')==-1)
            var date = new Date().getFullYear()+'-'+(new Date().getMonth()+1);
        else
            var date = $(".ybjl-select").val();
        $.ajax({
            "type": 'get',
            "url": sSource,
            "dataType": "json",
            "data": {//查询条件写这里
                //dataTable固定参数
                aoData: JSON.stringify(aoData),
                // 选填参数
                // search: searchText
                // title: $(".right-main:nth-child(1) .search-div>label>input").val()
                type: 3,
                month: parseInt(date.split("-")[1]),
                year: parseInt(date.split("-")[0]),
                scopeId: ybScoped
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
    var dataInfoTableMonthReportInfo1 = $("#monthReportInfo1-table").dataTable(dataInfoTableMonthReportInfo1).api();

    var dataInfoTableMonthReportInfo2 = {
        "bServerSide": true,
        "processing": true,
        "sScrollX": "100%",
        //表格的宽度
        "sScrollY": "400px",
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
            "sInfo": "第 _START_ 到 _END_ 条记录，共 _TOTAL_ 条",
            "sZeroRecords": "没有相关记录"
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
    dataInfoTableMonthReportInfo2["sAjaxSource"] = rootPath + '/api/getAllProjectMonthlyReport';
    // 设置字段数据源
    dataInfoTableMonthReportInfo2["aoColumns"] = [
        {
            "data": null
        },
        {
            "data": "informationCoding"
        },
        {
            "data": "fatherName"
        },
        {
            "data": "fatherIdCard"
        },
        {
            "data": "motherName"
        },
        {
            "data": "motherIdCard"
        },
        {
            "data": "reason"
        },
        {
            "data": "deleteTime"
        },
        {
            "data": "address"
        },
    ];
    // 渲染字段数据源
    dataInfoTableMonthReportInfo2["aoColumnDefs"] = [
        {
            "aTargets": [0], "mRender": function (data, type, row, meta) {
                if(user.scopeId%100!=0)
                    return '<label>\n' +
                        '                                            <input id="'+row.id+'" class="" type="checkbox">\n' +
                        '                                            <span></span>\n' +
                        '                                        </label>'
                else
                    return "";
            }
        },
        {
            "aTargets": [6], "mRender": function (data, type, row, meta) {
                return "<div class='reason3'><div>"+row.reason+"</div></div>"
            }
        },
        {
            "aTargets": [8], "mRender": function (data, type, row, meta) {
                return "<div><div class='yb2yuanyin'>"+row.address+"</div></div>"
            }
        },

    ];

    dataInfoTableMonthReportInfo2["fnServerData"] = function (sSource, aoData, fnCallback) {
        if($(".ybjl-select").val()==null||$(".ybjl-select").val().indexOf('-')==-1)
            var date = new Date().getFullYear()+'-'+(new Date().getMonth()+1);
        else
            var date = $(".ybjl-select").val();
        $.ajax({
            "type": 'get',
            "url": sSource,
            "dataType": "json",
            "data": {//查询条件写这里
                //dataTable固定参数
                aoData: JSON.stringify(aoData),
                // 选填参数
                // search: searchText
                // title: $(".right-main:nth-child(1) .search-div>label>input").val()
                type: 4,
                month: parseInt(date.split("-")[1]),
                year: parseInt(date.split("-")[0]),
                scopeId: ybScoped
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
    var dataInfoTableMonthReportInfo2 = $("#monthReportInfo2-table").dataTable(dataInfoTableMonthReportInfo2).api();

    var dataInfoTableActivity = {
        "bServerSide": true,
        "processing": true,
        "sScrollX": "100%",
        //表格的宽度
        "sScrollY": "400px",
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
        "aLengthMenu": [8, 25, 50, 100],
        //设置选择每页的条目数
        "iDisplayLength": 8,
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
            "sInfo": "第 _START_ 到 _END_ 条记录，共 _TOTAL_ 条",
            "sZeroRecords": "没有相关记录"
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
    dataInfoTableActivity["sAjaxSource"] = rootPath + '/api/getAllSpecialActivity';
    // 设置字段数据源
    dataInfoTableActivity["aoColumns"] = [
        {
            "data": "id"
        },
        {
            "data": null,
            "visible": false
        },
    ];
    // 渲染字段数据源
    dataInfoTableActivity["aoColumnDefs"] = [
        {
            "aTargets": [0], "mRender": function (data, type, row, meta) {
                var html = "";
                var pic = "";
                if (row.attachment !== "") {
                    pic = imgPath + row.attachment.split(';')[0];
                } else {
                    pic = baseImgPath;
                }
                html += '<div class="Activity" id="ck-' + row.id + '">\n';
                if (row.headMember == user.id) {
                    html += '<div class="mask hidden"></div>\n';
                }
                html += '<img type="' + row.createMemberScopeId + '" src="' + pic + '">';
                html += '                                <div class="title">' + row.name + '</div>\n';
                if (row.headMember == user.id) {
                    html += '<div id="special-activity-' + row.id + '" class="edit hidden special-activity-edit"><img src=' + rootPath + '/resources/icon/6-bianji.png>&nbsp;编辑</div>\n';
                }
                html += '</div>';
                return html;
            }
        },
    ];

    dataInfoTableActivity["fnServerData"] = function (sSource, aoData, fnCallback) {
        $.ajax({
            "type": 'get',
            "url": sSource,
            "dataType": "json",
            "data": {//查询条件写这里
                //dataTable固定参数
                aoData: JSON.stringify(aoData),
                // 选填参数
                // search: searchText
                // title: $(".right-main:nth-child(1) .search-div>label>input").val()
                area: $("#shequ-select").val(),
                year: $(".ActivityYear-select").val()
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
    var dataInfoTableActivity = $("#Activity-table").dataTable(dataInfoTableActivity).api();

    $("#HYGLFX").click(function () {
        $(".l-title").html('会员管理分析');
        $(".s-title").html('统计分析/会员管理分析');
        $(".right-button").html("杭州市会员管理分析报表");
        $("#hy-zyz-sl").html("会员数量");
        $(".right-main").addClass("hidden");
        $(".right-main:nth-child(1)").removeClass("hidden");
        $(".right-main:nth-child(1) .col-lg-12").addClass("hidden");
        $(".right-main:nth-child(1) .col-lg-12:nth-child(1)").removeClass("hidden");
        $(".statistics-buttons .main-button").html('<img src=' + rootPath + '/resources/icon/3-guidang.png>归档');
        $(".statistics-buttons .main-button").removeAttr("disabled");
        $(".statistics-buttons .main-button").removeClass("isFiled");
        $.ajax({
            type: "GET",
            url: rootPath + "/api/getHuiyuanReportYears",
            dataType: "json",
            async: false,
            data: {},
            success: function (data) {
                if (data.status === 200) {
                    var html = "";
                    for (var i = 0; i < data.data.length; i++) {
                        html += "<option value='" + data.data[i] + "'>" + data.data[i] + "</option>\n"
                    }
                    $(".huiyuan-date-select").html(html);
                    $(".huiyuan-date-select").val(data.data[0]).trigger("change")
                }
            },
            error: function () {
                bootAlert("服务器请求失败")
            }
        })
        volunteerStatus = 0;
        reloadAjax(dataInfoTableHuiyuan);
    });
    $("#ZYZTJFX").click(function () {
        $(".l-title").html('志愿者统计分析');
        $(".s-title").html('统计分析/志愿者统计分析');
        $(".right-button").html("杭州市志愿者统计分析报表");
        $("#hy-zyz-sl").html("志愿者数量");
        $(".right-main").addClass("hidden");
        $(".right-main:nth-child(1)").removeClass("hidden");
        $(".right-main:nth-child(1) .col-lg-12").addClass("hidden");
        $(".right-main:nth-child(1) .col-lg-12:nth-child(1)").removeClass("hidden");
        $(".statistics-buttons .main-button").html('<img src=' + rootPath + '/resources/icon/3-guidang.png>归档');
        $(".statistics-buttons .main-button").removeAttr("disabled");
        $(".statistics-buttons .main-button").removeClass("isFiled");
        $.ajax({
            type: "GET",
            url: rootPath + "/api/getVolunteerReportYears",
            dataType: "json",
            async: false,
            data: {},
            success: function (data) {
                if (data.status === 200) {
                    var html = "";
                    for (var i = 0; i < data.data.length; i++) {
                        html += "<option value='" + data.data[i] + "'>" + data.data[i] + "</option>\n"
                    }
                    $(".huiyuan-date-select").html(html);
                    $(".huiyuan-date-select").val(data.data[0]).trigger("change")
                }
            },
            error: function () {
                bootAlert("服务器请求失败")
            }
        })
        volunteerStatus = 1;
        reloadAjax(dataInfoTableHuiyuan);
    });
    // 详情
    $("#XMBBXQ").click(function () {
        $(".l-title").html('项目工作分析');
        $(".s-title").html('统计分析/项目工作分析/报表详情');
        $(".right-button").html("杭州市项目工作分析报表");
        $(".right-main").addClass("hidden");
        $(".right-main:nth-child(1)").removeClass("hidden");
        $(".right-main:nth-child(1) .col-lg-12").addClass("hidden");
        $(".right-main:nth-child(1) .col-lg-12:nth-child(2)").removeClass("hidden");
        $(".statistics-buttons .main-button").html('<img src=' + rootPath + '/resources/icon/3-guidang.png>归档');
        $(".statistics-buttons .main-button").removeAttr("disabled");
        $(".statistics-buttons .main-button").removeClass("isFiled");
        $.ajax({
            type: "GET",
            url: rootPath + "/api/getProjectWorkReportYears",
            dataType: "json",
            async: false,
            data: {},
            success: function (data) {
                if (data.status === 200) {
                    var html = "";
                    for (var i = 0; i < data.data.length; i++) {
                        html += "<option value='" + data.data[i] + "'>" + data.data[i] + "</option>\n"
                    }
                    $(".huiyuan-date-select").html(html);
                    $(".huiyuan-date-select").val(data.data[0]).trigger("change")
                }
            },
            error: function () {
                bootAlert("服务器请求失败")
            }
        })
        reloadAjax(dataInfoTableTaskAnalysis);
    });
    $("#YBXQ").click(function () {
        $(".l-title").html('月报详情');
        $(".s-title").html('统计分析/项目工作分析/月报详情');
        $(".right-button").html("杭州市特殊家庭帮扶月报");
        $(".right-main").addClass("hidden");
        $(".right-main:nth-child(1)").removeClass("hidden");
        $(".right-main:nth-child(1) .col-lg-12").addClass("hidden");
        $(".right-main:nth-child(1) .col-lg-12:nth-child(3)").removeClass("hidden");
        $(".statistics-buttons .main-button").html('<img src=' + rootPath + '/resources/icon/3-guidang.png>归档');
        $(".statistics-buttons .main-button").removeAttr("disabled");
        $(".statistics-buttons .main-button").removeClass("isFiled");
        var html="";
        $(".huiyuan-date-select").html(html);
        var todayM=new Date().getMonth()+1;
        var todayY=new Date().getFullYear();
        var day="";
        for(var i=0;i<6;i++){
            if(todayM-i<1){
                html += "<option value='" + (todayY-1)+'-'+(todayM-i+12) + "'>" + (todayY-1)+'-'+(todayM-i+12) + "</option>\n";
                if(i==0){
                    day=(todayY-1)+'-'+(todayM-i+12);
                }

            }else{
                html += "<option value='" + (todayY)+'-'+(todayM-i) + "'>"  + (todayY)+'-'+(todayM-i) + "</option>\n";
                if(i==0){
                    day=(todayY)+'-'+(todayM);
                }
            }
        }
        $(".huiyuan-date-select").html(html);
        $(".huiyuan-date-select").val(day).trigger("change")
        reloadAjax(dataInfoTableMonth);
    });
    $("#NDBBXQ").click(function () {
        $(".l-title").html('年度报表');
        $(".s-title").html('统计分析/年度报表/报表详情');
        $(".right-button").html("杭州市年度工作报表");
        $(".right-main").addClass("hidden");
        $(".right-main:nth-child(1)").removeClass("hidden");
        $(".right-main:nth-child(1) .col-lg-12").addClass("hidden");
        $(".right-main:nth-child(1) .col-lg-12:nth-child(4)").removeClass("hidden");
        $(".right-main:nth-child(1) .col-lg-12:nth-child(5)").removeClass("hidden");
        $(".statistics-buttons .main-button").html('<img src=' + rootPath + '/resources/icon/3-guidang.png>归档');
        $(".statistics-buttons .main-button").removeAttr("disabled");
        $(".statistics-buttons .main-button").removeClass("isFiled");
        $.ajax({
            type: "GET",
            url: rootPath + "/api/getYearReportYears",
            dataType: "json",
            data: {},
            success: function (data) {
                if (data.status === 200) {
                    var html = "";
                    for (var i = 0; i < data.data.length; i++) {
                        html += "<option value='" + data.data[i] + "'>" + data.data[i] + "</option>\n"
                    }
                    $(".huiyuan-date-select").html(html);
                    $(".huiyuan-date-select").val(data.data[0]).trigger("change")
                }
            },
            error: function () {
                bootAlert("服务器请求失败")
            }
        })
    });
    $("#ZZBBXQ").click(function () {
        if (user.scopeId === 0) {
            $(".statistics-buttons .main-button").removeClass("hidden");
        } else {
            $(".statistics-buttons .main-button").addClass("hidden");
        }
        $(".l-title").html('组织建设报表');
        $(".s-title").html('统计分析/组织建设报表/报表详情');
        $(".right-button").html("杭州市组织建设报表")
        $(".right-main").addClass("hidden");
        $(".right-main:nth-child(1)").removeClass("hidden");
        $(".right-main:nth-child(1) .col-lg-12").addClass("hidden");
        $(".right-main:nth-child(1) .col-lg-12:nth-child(6)").removeClass("hidden");
        $(".statistics-buttons .main-button").html('<img src=' + rootPath + '/resources/icon/3-guidang.png>归档');
        $(".statistics-buttons .main-button").removeAttr("disabled");
        $(".statistics-buttons .main-button").removeClass("isFiled");
        $.ajax({
            type: "GET",
            url: rootPath + "/api/getOrganizationConstructionReportYears",
            dataType: "json",
            data: {},
            success: function (data) {
                if (data.status === 200) {
                    var html = "";
                    for (var i = 0; i < data.data.length; i++) {
                        html += "<option value='" + data.data[i] + "'>" + data.data[i] + "</option>\n"
                    }
                    $(".huiyuan-date-select").html(html);
                    $(".huiyuan-date-select").val(data.data[0]).trigger("change")
                }
            },
            error: function () {
                bootAlert("服务器请求失败")
            }
        })

    });
    $("#JTBFJL").click(function () {
        $(".l-title").html('家庭帮扶记录');
        $(".s-title").html('统计分析/项目工作分析/家庭帮扶记录');
		$(".right-button").html("杭州市特殊家庭帮扶记录");
        $(".right-main").addClass("hidden");
        $(".right-main:nth-child(1)").removeClass("hidden");
        $(".right-main:nth-child(1) .col-lg-12").addClass("hidden");
        $(".right-main:nth-child(1) .col-lg-12:nth-child(7)").removeClass("hidden");
        $(".fsdx").val("");
        $.ajax({
            type: "GET",
            url: rootPath + "/api/getFamilyHelpRecordYears",
            dataType: "json",
            async: false,
            data: {},
            success: function (data) {
                if (data.status === 200) {
                    var html = "";
                    for (var i = 0; i < data.data.length; i++) {
                        html += "<option value='" + data.data[i] + "'>" + data.data[i] + "</option>\n"
                    }
                    $(".huiyuan-date-select").html(html);
                    $(".huiyuan-date-select").val(data.data[0]).trigger("change")
                }
            },
            error: function () {
                bootAlert("服务器请求失败")
            }
        })
        dataInfoTablebangfu.clear();
        reloadAjax(dataInfoTablebangfu);
    });

    $(".right-main .query-terms .main-button").click(function () {
        reloadAjax(dataInfoTablebangfu);
    })

    $("#HYGLFX").click()

    //查询select
    $(".huiyuan-date-select").change(function () {
        if ($(".selected-li").attr("id") == "HYGLFX" || $(".selected-li").attr("id") == "ZYZTJFX") {
            if($(".huiyuan-date-select").val().indexOf('-') != -1)
                return;
            reloadAjax(dataInfoTableHuiyuan);
        } else if ($(".selected-li").attr("id") == "NDBBXQ") {
            if($(".huiyuan-date-select").val().indexOf('-') != -1)
                return;
            for (var i = 0; i < year_report_total.length; i++) {
                $("#" + year_report_total[i]).html("");
            }
            var qu = 0;
            var scopeId = null;
            if (user.scopeId == 0){
                qu = 0;
                scopeId = null;
            }else{
                qu = 1;
                scopeId = user.scopeId;
            }
            $.ajax({
                type: "GET",
                url: rootPath + "/api/getYearReport",
                dataType: "json",
                data: {
                    year: $(".huiyuan-date-select").val().substring(0, 4),
                    qu: qu,
                    scopeId: scopeId,
                },
                success: function (data) {
                    if (data.status === 200) {
                        if (data.data[0] == ""){
                            for (var i = 0; i < year_report_total.length; i++) {
                                $("#" + year_report_total[i]).html(0);
                            }
                        }else{
                            for (var i = 0; i < year_report_total.length; i++) {
                                $("#" + year_report_total[i]).html(data.data[0][year_report_total[i]] == "" ? 0 : data.data[0][year_report_total[i]]);
                            }
                            if (data.data[0].isFiled > 0) {
                                $(".statistics-buttons .main-button").html("已归档");
                                $(".statistics-buttons .main-button").attr("disabled", "disabled");
                                $(".statistics-buttons .main-button").addClass("isFiled");
                            } else {
                                $(".statistics-buttons .main-button").html('<img src=' + rootPath + '/resources/icon/3-guidang.png>归档');
                                $(".statistics-buttons .main-button").attr("disabled", false);
                                $(".statistics-buttons .main-button").removeClass("isFiled");
                            }
                        }
                        clacTableWidth();
                    }
                },
                error: function () {
                    bootAlert("服务器请求失败")
                }
            })
        } else if ($(".selected-li").attr("id") == "ZZBBXQ") {
            if($(".huiyuan-date-select").val().indexOf('-') != -1)
                return;
            $("#ndbk").html($(".huiyuan-date-select").val() + "年财政拨款(万元)");
            for (var i = 0; i < organization_construction_report_total.length; i++) {
                $("#zzjsbbshiji ." + organization_construction_report_total[i]).html("");
                $("#zzjsbbquji ." + organization_construction_report_total[i]).html("");
                $("#zzjsbbjiedaoji ." + organization_construction_report_total[i]).html("");
                $("#zzjsbbshequji ." + organization_construction_report_total[i]).html("");
                $("#zzjsbbtotal ." + organization_construction_report_total[i]).html("");
            }
            $.ajax({
                type: "GET",
                url: rootPath + "/api/getOrganizationConstructionReport",
                dataType: "json",
                data: {
                    year: $(".huiyuan-date-select").val().substring(0,4),
                },
                success: function (data) {
                    if (data.status === 200) {
                        for (var i = 0; i < 5; i++) {
                            //社区级
                            for (var key in organization_construction_report_shequ[i]) {
                                $("#zzjsbbshequji ." + key).html(data.data[0][key])
                            }
                            // 街道级
                            for (var key in organization_construction_report_jiedao[i]) {
                                $("#zzjsbbjiedaoji ." + key).html(data.data[1][key])
                            }
                            // 区级
                            for (var key in organization_construction_report_qu[i]) {
                                $("#zzjsbbquji ." + key).html(data.data[2][key])
                            }
                            // 市级
                            for (var key in organization_construction_report_shi[i]) {
                                $("#zzjsbbshiji ." + key).html(data.data[3][key])
                            }
                        }
                        for (var i = 0; i < organization_construction_report_total.length; i++) {
                            var sum = 0;
                            //市级
                            if ($("#zzjsbbshiji ." + organization_construction_report_total[i]).html() != "") {
                                if (organization_construction_report_total[i] != "benniandczbke") {
                                    sum += parseInt($("#zzjsbbshiji ." + organization_construction_report_total[i]).html())
                                } else {
                                    sum += parseFloat($("#zzjsbbshiji ." + organization_construction_report_total[i]).html())
                                }
                            }
                            //区级
                            if ($("#zzjsbbquji ." + organization_construction_report_total[i]).html() != "") {
                                if (organization_construction_report_total[i] != "benniandczbke") {
                                    sum += parseInt($("#zzjsbbquji ." + organization_construction_report_total[i]).html())
                                } else {
                                    sum += parseFloat($("#zzjsbbquji ." + organization_construction_report_total[i]).html())
                                }
                            }
                            //街道级
                            if ($("#zzjsbbjiedaoji ." + organization_construction_report_total[i]).html() != "") {
                                if (organization_construction_report_total[i] != "benniandczbke") {
                                    sum += parseInt($("#zzjsbbjiedaoji ." + organization_construction_report_total[i]).html())
                                } else {
                                    sum += parseFloat($("#zzjsbbjiedaoji ." + organization_construction_report_total[i]).html())
                                }
                            }
                            //社区级
                            if ($("#zzjsbbshequji ." + organization_construction_report_total[i]).html() != "") {
                                if (organization_construction_report_total[i] != "benniandczbke") {
                                    sum += parseInt($("#zzjsbbshequji ." + organization_construction_report_total[i]).html())
                                } else {
                                    sum += parseFloat($("#zzjsbbshequji ." + organization_construction_report_total[i]).html())
                                }
                            }

                            if (organization_construction_report_total[i] != "benniandczbke") {
                                $("#zzjsbbtotal ." + organization_construction_report_total[i]).html(parseInt(sum));
                            } else {
                                $("#zzjsbbtotal ." + organization_construction_report_total[i]).html(parseFloat(sum).toFixed(1));
                            }

                        }
                        if (data.data[0].isFiled > 0 || data.data[1].isFiled > 0 || data.data[2].isFiled > 0 || data.data[3].isFiled > 0) {
                            $(".statistics-buttons .main-button").html("已归档");
                            $(".statistics-buttons .main-button").attr("disabled", "disabled");
                            $(".statistics-buttons .main-button").addClass("isFiled");
                        } else {
                            $(".statistics-buttons .main-button").html('<img src=' + rootPath + '/resources/icon/3-guidang.png>归档');
                            $(".statistics-buttons .main-button").attr("disabled", false);
                            $(".statistics-buttons .main-button").removeClass("isFiled");
                        }
                        clacTableWidth();
                    }
                },
                error: function () {
                    bootAlert("服务器请求失败")
                }
            })
        } else if ($(".selected-li").attr("id") == "JTBFJL") {
            if($(".huiyuan-date-select").val().indexOf('-') != -1)
                return;
            reloadAjax(dataInfoTablebangfu);
        } else if ($(".selected-li").attr("id") == "XMBBXQ"){
            reloadAjax(dataInfoTableTaskAnalysis);
        } else if($(".selected-li").attr("id") == "YBXQ"){
            reloadAjax(dataInfoTableMonth);
        }
        else if ($(".selected-li").attr("id") == "LDRKSFD"){
            if($(".huiyuan-date-select").val().indexOf('-') != -1)
                return;
            $.ajax({
                type: "GET",
                url: rootPath + "/api/getFloatingPopulationReport",
                dataType: "json",
                data: {
                    year: $(".huiyuan-date-select").val(),
                },
                success: function (data) {
                    if (data.status === 200) {
                        var html = "<tr>\n" +
                            "                                    <td style=\"font-weight: bold;font-size: 18px\" colspan=\"8\">流动人口计生协示范点信息统计表</td>\n" +
                            "                                </tr>\n" +
                            "                                <tr>\n" +
                            "                                    <td rowspan=\"4\">机构名称</td>\n" +
                            "                                    <td rowspan=\"4\">职工总数</td>\n" +
                            "                                    <td rowspan=\"4\">流动人口总数</td>\n" +
                            "                                    <td rowspan=\"4\">会员数</td>\n" +
                            "                                    <td rowspan=\"1\" colspan=\"4\">项目单位流动人口基本信息</td>\n" +
                            "                                </tr>\n" +
                            "                                <tr>\n" +
                            "                                    <td rowspan=\"1\" colspan=\"2\">流动人口数</td>\n" +
                            "                                    <td rowspan=\"1\" colspan=\"1\">未婚</td>\n" +
                            "                                    <td rowspan=\"1\" colspan=\"1\">已婚</td>\n" +
                            "                                </tr>\n" +
                            "                                <tr>\n" +
                            "\n" +
                            "                                    <td rowspan=\"1\" colspan=\"2\">（人）</td>\n" +
                            "                                    <td rowspan=\"2\">（人）</td>\n" +
                            "                                    <td rowspan=\"2\">（人）</td>\n" +
                            "                                </tr>\n" +
                            "                                <tr>\n" +
                            "                                    <td rowspan=\"1\">男</td>\n" +
                            "                                    <td rowspan=\"1\">女</td>\n" +
                            "                                </tr>\n";
                        for (var i = 0; i < data.data.length; i++){
                            if (data.data[i].scopeName == ""){
                                data.data[i].scopeName = "合计";
                            }else{
                                data.data[i].scopeName = data.data[i].scopeName+"计生协";
                            }
                            if (data.data[i].zhigongNumber == ""){
                                data.data[i].zhigongNumber = "0";
                            }
                            if (data.data[i].liudongrkNumber == ""){
                                data.data[i].liudongrkNumber = "0";
                            }
                            if (data.data[i].huiyuanNumber == ""){
                                data.data[i].huiyuanNumber = "0";
                            }
                            if (data.data[i].liudongMaleNumber == ""){
                                data.data[i].liudongMaleNumber = "0";
                            }
                            if (data.data[i].liudongFemaleNumber == ""){
                                data.data[i].liudongFemaleNumber = "0";
                            }
                            if (data.data[i].liudongUnmarriedNumber == ""){
                                data.data[i].liudongUnmarriedNumber = "0";
                            }
                            if (data.data[i].liudongMarriedNumber == ""){
                                data.data[i].liudongMarriedNumber = "0";
                            }
                            html += "                                <tr><td rowspan=\"1\" colspan=\"1\">" + data.data[i].scopeName+ "</td>\n" +
                                "                                    <td rowspan=\"1\" colspan=\"1\">" + data.data[i].zhigongNumber + "</td>\n" +
                                "                                    <td rowspan=\"1\" colspan=\"1\">" + data.data[i].liudongrkNumber + "</td>\n" +
                                "                                    <td rowspan=\"1\" colspan=\"1\">" + data.data[i].huiyuanNumber + "</td>\n" +
                                "                                    <td rowspan=\"1\" colspan=\"1\">" + data.data[i].liudongMaleNumber + "</td>\n" +
                                "                                    <td rowspan=\"1\" colspan=\"1\">" + data.data[i].liudongFemaleNumber + "</td>\n" +
                                "                                    <td rowspan=\"1\" colspan=\"1\">" + data.data[i].liudongUnmarriedNumber + "</td>\n" +
                                "                                    <td rowspan=\"1\" colspan=\"1\">" + data.data[i].liudongMarriedNumber + "</td></tr>\n";
                        }
                        $("#LDRKSFDXQ").html(html);
                    }
                },
                error: function () {
                    bootAlert("服务器请求失败")
                }
            })
        }
        else if ($(".selected-li").attr("id") == "NXHD"){
            $.ajax({
                type: "GET",
                url: rootPath + "/api/getWarmHeartReport",
                dataType: "json",
                data: {
                    year: $(".huiyuan-date-select").val().split('-')[0],
                    month: $(".huiyuan-date-select").val().split('-')[1],
                    scopeId:user.scopeId
                },
                success: function (data) {
                    if (data.status === 200) {
                        var html = '<tr>\n' +
                            '                                    <td rowspan="4" colspan="1">单位</td>\n' +
                            '                                    <td rowspan="1" colspan="20">主要内容</td>\n' +
                            '                                </tr>\n' +
                            '                                <tr>\n' +
                            '                                    <td rowspan="1" colspan="2">需求调查</td>\n' +
                            '                                    <td rowspan="1" colspan="2">保险理赔</td>\n' +
                            '                                    <td rowspan="1" colspan="4">心理健康服务</td>\n' +
                            '                                    <td rowspan="1" colspan="10">走访慰问落实</td>\n' +
                            '                                    <td rowspan="1" colspan="2">服务活动开展</td>\n' +
                            '                                </tr>\n' +
                            '                                <tr>\n' +
                            '                                    <td rowspan="2" colspan="1">户</td>\n' +
                            '                                    <td rowspan="2" colspan="1">人</td>\n' +
                            '                                    <td rowspan="2" colspan="1">例</td>\n' +
                            '                                    <td rowspan="2" colspan="1">金额(元)</td>\n' +
                            '                                    <td rowspan="2" colspan="1">户</td>\n' +
                            '                                    <td rowspan="2" colspan="1">人</td>\n' +
                            '                                    <td rowspan="2" colspan="1">建档(份)</td>\n' +
                            '                                    <td rowspan="2" colspan="1">测评(人)</td>\n' +
                            '                                    <td rowspan="1" colspan="2">日常走访</td>\n' +
                            '                                    <td rowspan="1" colspan="2">节日看望</td>\n' +
                            '                                    <td rowspan="1" colspan="2">生日陪伴</td>\n' +
                            '                                    <td rowspan="1" colspan="2">住院探望</td>\n' +
                            '                                    <td rowspan="1" colspan="2">突发事件</td>\n' +
                            '                                    <td rowspan="2" colspan="1">场</td>\n' +
                            '                                    <td rowspan="2" colspan="1">人</td>\n' +
                            '                                </tr>\n' +
                            '                                <tr>\n' +
                            '                                    <td rowspan="1" colspan="1">户</td>\n' +
                            '                                    <td rowspan="1" colspan="1">人</td>\n' +
                            '                                    <td rowspan="1" colspan="1">户</td>\n' +
                            '                                    <td rowspan="1" colspan="1">人</td>\n' +
                            '                                    <td rowspan="1" colspan="1">户</td>\n' +
                            '                                    <td rowspan="1" colspan="1">人</td>\n' +
                            '                                    <td rowspan="1" colspan="1">户</td>\n' +
                            '                                    <td rowspan="1" colspan="1">人</td>\n' +
                            '                                    <td rowspan="1" colspan="1">户</td>\n' +
                            '                                    <td rowspan="1" colspan="1">人</td>\n' +
                            '                                </tr>';
                        if(data.data.length ==0){
                            html+='<tr><td rowspan="1" colspan="21">没有相关记录</td></tr>'
                        }
                        for (var i = 0; i < data.data.length; i++){
                            if (data.data[i].scopeId == ""){
                                data.data[i].scopeName = "合计";
                            }else if (data.data[i].scopeId%10000==0){
                                data.data[i].scopeName = data.data[i].scopeName+"计生协";
                            }
                            if (data.data[i].xuqiudch == ""){
                                data.data[i].xuqiudch = "0";
                            }
                            if (data.data[i].xuqiudcr == ""){
                                data.data[i].xuqiudcr = "0";
                            }
                            if (data.data[i].baoxianlpl == ""){
                                data.data[i].baoxianlpl = "0";
                            }
                            if (data.data[i].baoxianlpje == ""){
                                data.data[i].baoxianlpje = "0";
                            }
                            if (data.data[i].xinlijkfwh == ""){
                                data.data[i].xinlijkfwh = "0";
                            }
                            if (data.data[i].xinlijkfwr == ""){
                                data.data[i].xinlijkfwr = "0";
                            }
                            if (data.data[i].xinlijkfwjd == ""){
                                data.data[i].xinlijkfwjd = "0";
                            }
                            if (data.data[i].xinlijkfwcp == ""){
                                data.data[i].xinlijkfwcp = "0";
                            }
                            if (data.data[i].richangzfh == ""){
                                data.data[i].richangzfh = "0";
                            }
                            if (data.data[i].richangzfr == ""){
                                data.data[i].richangzfr = "0";
                            }
                            if (data.data[i].jierikwh == ""){
                                data.data[i].jierikwh = "0";
                            }
                            if (data.data[i].jierikwr == ""){
                                data.data[i].jierikwr = "0";
                            }
                            if (data.data[i].shengripbh == ""){
                                data.data[i].shengripbh = "0";
                            }
                            if (data.data[i].shengripbr == ""){
                                data.data[i].shengripbr = "0";
                            }
                            if (data.data[i].zhuyuantwh == ""){
                                data.data[i].zhuyuantwh = "0";
                            }
                            if (data.data[i].zhuyuantwr == ""){
                                data.data[i].zhuyuantwr = "0";
                            }
                            if (data.data[i].tufasjh == ""){
                                data.data[i].tufasjh = "0";
                            }
                            if (data.data[i].tufasjr == ""){
                                data.data[i].tufasjr = "0";
                            }
                            if (data.data[i].fuwuhdkzc == ""){
                                data.data[i].fuwuhdkzc = "0";
                            }
                            if (data.data[i].fuwuhdkzr == ""){
                                data.data[i].fuwuhdkzr = "0";
                            }
                            html+='<tr>\n' +
                                '                                    <td rowspan="1" colspan="1">'+data.data[i].scopeName+'</td>\n' +
                                '                                    <td rowspan="1" colspan="1">'+data.data[i].xuqiudch+'</td>\n' +
                                '                                    <td rowspan="1" colspan="1">'+data.data[i].xuqiudcr+'</td>\n' +
                                '                                    <td rowspan="1" colspan="1">'+data.data[i].baoxianlpl+'</td>\n' +
                                '                                    <td rowspan="1" colspan="1">'+data.data[i].baoxianlpje+'</td>\n' +
                                '                                    <td rowspan="1" colspan="1">'+data.data[i].xinlijkfwh+'</td>\n' +
                                '                                    <td rowspan="1" colspan="1">'+data.data[i].xinlijkfwr+'</td>\n' +
                                '                                    <td rowspan="1" colspan="1">'+data.data[i].xinlijkfwjd+'</td>\n' +
                                '                                    <td rowspan="1" colspan="1">'+data.data[i].xinlijkfwcp+'</td>\n' +
                                '                                    <td rowspan="1" colspan="1">'+data.data[i].richangzfh+'</td>\n' +
                                '                                    <td rowspan="1" colspan="1">'+data.data[i].richangzfr+'</td>\n' +
                                '                                    <td rowspan="1" colspan="1">'+data.data[i].jierikwh+'</td>\n' +
                                '                                    <td rowspan="1" colspan="1">'+data.data[i].jierikwr+'</td>\n' +
                                '                                    <td rowspan="1" colspan="1">'+data.data[i].shengripbh+'</td>\n' +
                                '                                    <td rowspan="1" colspan="1">'+data.data[i].shengripbr+'</td>\n' +
                                '                                    <td rowspan="1" colspan="1">'+data.data[i].zhuyuantwh+'</td>\n' +
                                '                                    <td rowspan="1" colspan="1">'+data.data[i].zhuyuantwr+'</td>\n' +
                                '                                    <td rowspan="1" colspan="1">'+data.data[i].tufasjh+'</td>\n' +
                                '                                    <td rowspan="1" colspan="1">'+data.data[i].tufasjr+'</td>\n' +
                                '                                    <td rowspan="1" colspan="1">'+data.data[i].fuwuhdkzc+'</td>\n' +
                                '                                    <td rowspan="1" colspan="1">'+data.data[i].fuwuhdkzr+'</td>\n' +
                                '                                </tr>'
                        }
                        $("#NXHDXQ").html(html);
                    }
                },
                error: function () {
                    bootAlert("服务器请求失败")
                }
            })
        }
    })
    //月报记录select
    $(".ybjl-select").change(function () {
        if ($(".top-ul .month-table-selected-li").index() == 0){
            $("#ybsdxlTime").html("失独时间");
            $("#ybsdxlreason").html("失独原因");
            ybType=1;
            reloadAjax(dataInfoTableMonthReportInfo);
        }else if ($(".top-ul .month-table-selected-li").index() == 1){
            $("#ybsdxlTime").html("心理干预时间");
            $("#ybsdxlreason").html("心理干预原因");
            ybType=2;
            reloadAjax(dataInfoTableMonthReportInfo);
        }else if ($(".top-ul .month-table-selected-li").index() == 2){
            reloadAjax(dataInfoTableMonthReportInfo1);
        }else if ($(".top-ul .month-table-selected-li").index() == 3){
            reloadAjax(dataInfoTableMonthReportInfo2);
        }else{
            $(".right-main:nth-child(5) .top-ul li").eq(4).click();
        }
    })

    $(".ldrkjsx-select").change(function () {
        reloadAjax(dataInfoTableSFD);
    })
    $(".ldrkjsx1-select").change(function () {
        reloadAjax(dataInfoTableJilu);
    })

    //刷新按钮
    $(".statistics-buttons .normal-button").click(function () {
        if ($(".selected-li").attr("id") == "HYGLFX") {
            $("#HYGLFX").click()
        } else if ($(".selected-li").attr("id") == "ZYZTJFX"){
            $("#ZYZTJFX").click()
        } else if ($(".selected-li").attr("id") == "ZZBBXQ") {
            $("#ZZBBXQ").click()
        } else if ($(".selected-li").attr("id") == "NDBBXQ") {
            $("#NDBBXQ").click()
        } else if ($(".selected-li").attr("id") == "XMBBXQ") {
            $("#XMBBXQ").click()
        } else if ($(".selected-li").attr("id") == "JTBFJL") {
            $("#JTBFJL").click()
        }else if($(".selected-li").attr("id") == "TSLDSB"){
            $("#TSLDSB").click()
        }else if ($(".selected-li").attr("id") == "YBXQ") {
            $("#YBXQ").click()
        }
        else if ($(".selected-li").attr("id") == "LDRKSFD"){
            $.ajax({
                type: "GET",
                url: rootPath + "/api/getFloatingPopulationReportYears",
                dataType: "json",
                async: false,
                data: {},
                success: function (data) {
                    if (data.status === 200) {
                        var html = "";
                        for (var i = 0; i < data.data.length; i++) {
                            html += "<option value='" + data.data[i] + "'>" + data.data[i] + "</option>\n"
                        }
                        $(".huiyuan-date-select").html(html);
                        $(".huiyuan-date-select").val(data.data[0]).trigger("change")
                    }
                },
                error: function () {
                    bootAlert("服务器请求失败")
                }
            })
            $.ajax({
                type: "GET",
                url: rootPath + "/api/getFloatingPopulationReport",
                dataType: "json",
                data: {
                    year: $(".huiyuan-date-select").val(),
                },
                success: function (data) {
                    if (data.status === 200) {
                        var html = "<tr>\n" +
                            "                                    <td style=\"font-weight: bold;font-size: 18px\" colspan=\"8\">流动人口计生协示范点信息统计表</td>\n" +
                            "                                </tr>\n" +
                            "                                <tr>\n" +
                            "                                    <td rowspan=\"4\">机构名称</td>\n" +
                            "                                    <td rowspan=\"4\">职工总数</td>\n" +
                            "                                    <td rowspan=\"4\">流动人口总数</td>\n" +
                            "                                    <td rowspan=\"4\">会员数</td>\n" +
                            "                                    <td rowspan=\"1\" colspan=\"4\">项目单位流动人口基本信息</td>\n" +
                            "                                </tr>\n" +
                            "                                <tr>\n" +
                            "                                    <td rowspan=\"1\" colspan=\"2\">流动人口数</td>\n" +
                            "                                    <td rowspan=\"1\" colspan=\"1\">未婚</td>\n" +
                            "                                    <td rowspan=\"1\" colspan=\"1\">已婚</td>\n" +
                            "                                </tr>\n" +
                            "                                <tr>\n" +
                            "\n" +
                            "                                    <td rowspan=\"1\" colspan=\"2\">（人）</td>\n" +
                            "                                    <td rowspan=\"2\">（人）</td>\n" +
                            "                                    <td rowspan=\"2\">（人）</td>\n" +
                            "                                </tr>\n" +
                            "                                <tr>\n" +
                            "                                    <td rowspan=\"1\">男</td>\n" +
                            "                                    <td rowspan=\"1\">女</td>\n" +
                            "                                </tr>\n";
                        for (var i = 0; i < data.data.length; i++){
                            if (data.data[i].scopeName == ""){
                                data.data[i].scopeName = "合计";
                            }else{
                                data.data[i].scopeName = data.data[i].scopeName+"计生协";
                            }
                            if (data.data[i].zhigongNumber == ""){
                                data.data[i].zhigongNumber = "0";
                            }
                            if (data.data[i].liudongrkNumber == ""){
                                data.data[i].liudongrkNumber = "0";
                            }
                            if (data.data[i].huiyuanNumber == ""){
                                data.data[i].huiyuanNumber = "0";
                            }
                            if (data.data[i].liudongMaleNumber == ""){
                                data.data[i].liudongMaleNumber = "0";
                            }
                            if (data.data[i].liudongFemaleNumber == ""){
                                data.data[i].liudongFemaleNumber = "0";
                            }
                            if (data.data[i].liudongUnmarriedNumber == ""){
                                data.data[i].liudongUnmarriedNumber = "0";
                            }
                            if (data.data[i].liudongMarriedNumber == ""){
                                data.data[i].liudongMarriedNumber = "0";
                            }

                            html += "                                <tr><td rowspan=\"1\" colspan=\"1\">" + data.data[i].scopeName + "</td>\n" +
                                "                                    <td rowspan=\"1\" colspan=\"1\">" + data.data[i].zhigongNumber + "</td>\n" +
                                "                                    <td rowspan=\"1\" colspan=\"1\">" + data.data[i].liudongrkNumber + "</td>\n" +
                                "                                    <td rowspan=\"1\" colspan=\"1\">" + data.data[i].huiyuanNumber + "</td>\n" +
                                "                                    <td rowspan=\"1\" colspan=\"1\">" + data.data[i].liudongMaleNumber + "</td>\n" +
                                "                                    <td rowspan=\"1\" colspan=\"1\">" + data.data[i].liudongFemaleNumber + "</td>\n" +
                                "                                    <td rowspan=\"1\" colspan=\"1\">" + data.data[i].liudongUnmarriedNumber + "</td>\n" +
                                "                                    <td rowspan=\"1\" colspan=\"1\">" + data.data[i].liudongMarriedNumber + "</td></tr>\n";
                        }
                        $("#LDRKSFDXQ").html(html);
                    }
                },
                error: function () {
                    bootAlert("服务器请求失败")
                }
            })
        }
        else if ($(".selected-li").attr("id") == "NXHD"){
            var html="";
            var todayM=new Date().getMonth()+1;
            var todayY=new Date().getFullYear();
            var day="";
            for(var i=0;i<6;i++){
                if(todayM-i<1){
                    html += "<option value='" + (todayY-1)+'-'+(todayM-i+12) + "'>" + (todayY-1)+'-'+(todayM-i+12) + "</option>\n";
                    if(i==0){
                        day=(todayY-1)+'-'+(todayM-i+12);
                    }

                }else{
                    html += "<option value='" + (todayY)+'-'+(todayM-i) + "'>"  + (todayY)+'-'+(todayM-i) + "</option>\n";
                    if(i==0){
                        day=(todayY)+'-'+(todayM);
                    }

                }

            }
            $(".huiyuan-date-select").html(html);
            $(".huiyuan-date-select").val(day).trigger("change")
            $.ajax({
                type: "GET",
                url: rootPath + "/api/getWarmHeartReport",
                dataType: "json",
                data: {
                    year: $(".huiyuan-date-select").val().split('-')[0],
                    month: $(".huiyuan-date-select").val().split('-')[1],
                    scopeId:user.scopeId
                },
                success: function (data) {
                    if (data.status === 200) {
                        var html = '<tr>\n' +
                            '                                    <td rowspan="4" colspan="1">单位</td>\n' +
                            '                                    <td rowspan="1" colspan="20">主要内容</td>\n' +
                            '                                </tr>\n' +
                            '                                <tr>\n' +
                            '                                    <td rowspan="1" colspan="2">需求调查</td>\n' +
                            '                                    <td rowspan="1" colspan="2">保险理赔</td>\n' +
                            '                                    <td rowspan="1" colspan="4">心理健康服务</td>\n' +
                            '                                    <td rowspan="1" colspan="10">走访慰问落实</td>\n' +
                            '                                    <td rowspan="1" colspan="2">服务活动开展</td>\n' +
                            '                                </tr>\n' +
                            '                                <tr>\n' +
                            '                                    <td rowspan="2" colspan="1">户</td>\n' +
                            '                                    <td rowspan="2" colspan="1">人</td>\n' +
                            '                                    <td rowspan="2" colspan="1">例</td>\n' +
                            '                                    <td rowspan="2" colspan="1">金额(元)</td>\n' +
                            '                                    <td rowspan="2" colspan="1">户</td>\n' +
                            '                                    <td rowspan="2" colspan="1">人</td>\n' +
                            '                                    <td rowspan="2" colspan="1">建档(份)</td>\n' +
                            '                                    <td rowspan="2" colspan="1">测评(人)</td>\n' +
                            '                                    <td rowspan="1" colspan="2">日常走访</td>\n' +
                            '                                    <td rowspan="1" colspan="2">节日看望</td>\n' +
                            '                                    <td rowspan="1" colspan="2">生日陪伴</td>\n' +
                            '                                    <td rowspan="1" colspan="2">住院探望</td>\n' +
                            '                                    <td rowspan="1" colspan="2">突发事件</td>\n' +
                            '                                    <td rowspan="2" colspan="1">场</td>\n' +
                            '                                    <td rowspan="2" colspan="1">人</td>\n' +
                            '                                </tr>\n' +
                            '                                <tr>\n' +
                            '                                    <td rowspan="1" colspan="1">户</td>\n' +
                            '                                    <td rowspan="1" colspan="1">人</td>\n' +
                            '                                    <td rowspan="1" colspan="1">户</td>\n' +
                            '                                    <td rowspan="1" colspan="1">人</td>\n' +
                            '                                    <td rowspan="1" colspan="1">户</td>\n' +
                            '                                    <td rowspan="1" colspan="1">人</td>\n' +
                            '                                    <td rowspan="1" colspan="1">户</td>\n' +
                            '                                    <td rowspan="1" colspan="1">人</td>\n' +
                            '                                    <td rowspan="1" colspan="1">户</td>\n' +
                            '                                    <td rowspan="1" colspan="1">人</td>\n' +
                            '                                </tr>';
                        if(data.data.length ==0){
                            html+='<tr><td rowspan="1" colspan="21">没有相关记录</td></tr>'
                        }
                        for (var i = 0; i < data.data.length; i++){

                            if (data.data[i].scopeId == ""){
                                data.data[i].scopeName = "合计";
                            }else if (data.data[i].scopeId%10000==0){
                                data.data[i].scopeName = data.data[i].scopeName+"计生协";
                            }
                            if (data.data[i].xuqiudch == ""){
                                data.data[i].xuqiudch = "0";
                            }
                            if (data.data[i].xuqiudcr == ""){
                                data.data[i].xuqiudcr = "0";
                            }
                            if (data.data[i].baoxianlpl == ""){
                                data.data[i].baoxianlpl = "0";
                            }
                            if (data.data[i].baoxianlpje == ""){
                                data.data[i].baoxianlpje = "0";
                            }
                            if (data.data[i].xinlijkfwh == ""){
                                data.data[i].xinlijkfwh = "0";
                            }
                            if (data.data[i].xinlijkfwr == ""){
                                data.data[i].xinlijkfwr = "0";
                            }
                            if (data.data[i].xinlijkfwjd == ""){
                                data.data[i].xinlijkfwjd = "0";
                            }
                            if (data.data[i].xinlijkfwcp == ""){
                                data.data[i].xinlijkfwcp = "0";
                            }
                            if (data.data[i].richangzfh == ""){
                                data.data[i].richangzfh = "0";
                            }
                            if (data.data[i].richangzfr == ""){
                                data.data[i].richangzfr = "0";
                            }
                            if (data.data[i].jierikwh == ""){
                                data.data[i].jierikwh = "0";
                            }
                            if (data.data[i].jierikwr == ""){
                                data.data[i].jierikwr = "0";
                            }
                            if (data.data[i].shengripbh == ""){
                                data.data[i].shengripbh = "0";
                            }
                            if (data.data[i].shengripbr == ""){
                                data.data[i].shengripbr = "0";
                            }
                            if (data.data[i].zhuyuantwh == ""){
                                data.data[i].zhuyuantwh = "0";
                            }
                            if (data.data[i].zhuyuantwr == ""){
                                data.data[i].zhuyuantwr = "0";
                            }
                            if (data.data[i].tufasjh == ""){
                                data.data[i].tufasjh = "0";
                            }
                            if (data.data[i].tufasjr == ""){
                                data.data[i].tufasjr = "0";
                            }
                            if (data.data[i].fuwuhdkzc == ""){
                                data.data[i].fuwuhdkzc = "0";
                            }
                            if (data.data[i].fuwuhdkzr == ""){
                                data.data[i].fuwuhdkzr = "0";
                            }
                            html+='<tr>\n' +
                                '                                    <td rowspan="1" colspan="1">'+data.data[i].scopeName+'</td>\n' +
                                '                                    <td rowspan="1" colspan="1">'+data.data[i].xuqiudch+'</td>\n' +
                                '                                    <td rowspan="1" colspan="1">'+data.data[i].xuqiudcr+'</td>\n' +
                                '                                    <td rowspan="1" colspan="1">'+data.data[i].baoxianlpl+'</td>\n' +
                                '                                    <td rowspan="1" colspan="1">'+data.data[i].baoxianlpje+'</td>\n' +
                                '                                    <td rowspan="1" colspan="1">'+data.data[i].xinlijkfwh+'</td>\n' +
                                '                                    <td rowspan="1" colspan="1">'+data.data[i].xinlijkfwr+'</td>\n' +
                                '                                    <td rowspan="1" colspan="1">'+data.data[i].xinlijkfwjd+'</td>\n' +
                                '                                    <td rowspan="1" colspan="1">'+data.data[i].xinlijkfwcp+'</td>\n' +
                                '                                    <td rowspan="1" colspan="1">'+data.data[i].richangzfh+'</td>\n' +
                                '                                    <td rowspan="1" colspan="1">'+data.data[i].richangzfr+'</td>\n' +
                                '                                    <td rowspan="1" colspan="1">'+data.data[i].jierikwh+'</td>\n' +
                                '                                    <td rowspan="1" colspan="1">'+data.data[i].jierikwr+'</td>\n' +
                                '                                    <td rowspan="1" colspan="1">'+data.data[i].shengripbh+'</td>\n' +
                                '                                    <td rowspan="1" colspan="1">'+data.data[i].shengripbr+'</td>\n' +
                                '                                    <td rowspan="1" colspan="1">'+data.data[i].zhuyuantwh+'</td>\n' +
                                '                                    <td rowspan="1" colspan="1">'+data.data[i].zhuyuantwr+'</td>\n' +
                                '                                    <td rowspan="1" colspan="1">'+data.data[i].tufasjh+'</td>\n' +
                                '                                    <td rowspan="1" colspan="1">'+data.data[i].tufasjr+'</td>\n' +
                                '                                    <td rowspan="1" colspan="1">'+data.data[i].fuwuhdkzc+'</td>\n' +
                                '                                    <td rowspan="1" colspan="1">'+data.data[i].fuwuhdkzr+'</td>\n' +
                                '                                </tr>'
                        }
                        $("#NXHDXQ").html(html);
                    }
                },
                error: function () {
                    bootAlert("服务器请求失败")
                }
            })
        }
    })
    //归档按钮
    $(".statistics-buttons .main-button").click(function () {
        if ($(".selected-li").attr("id") == "HYGLFX") {
            $.ajax({
                type: "GET",
                url: rootPath + "/api/toFileHuiyuanReport",
                dataType: "json",
                data: {
                    year: $(".huiyuan-date-select").val(),
                },
                success: function (data) {
                    if (data.status === 200) {
                        bootAlert("归档成功")
                        $(".statistics-buttons .main-button").html("已归档")
                        $(".statistics-buttons .main-button").attr("disabled", "disabled");
                        $(".statistics-buttons .main-button").addClass("isFiled");
                    } else {
                        bootAlert("归档失败")
                    }
                }, error: function () {
                    bootAlert("服务器请求失败")
                }
            })
        } else if ($(".selected-li").attr("id") == "ZYZTJFX") {
            $.ajax({
                type: "GET",
                url: rootPath + "/api/toFileVolunteerReport",
                dataType: "json",
                data: {
                    year: $(".huiyuan-date-select").val(),
                },
                success: function (data) {
                    if (data.status === 200) {
                        bootAlert("归档成功")
                        $(".statistics-buttons .main-button").html("已归档")
                        $(".statistics-buttons .main-button").attr("disabled", "disabled");
                        $(".statistics-buttons .main-button").addClass("isFiled");
                    } else {
                        bootAlert("归档失败")
                    }
                }, error: function () {
                    bootAlert("服务器请求失败")
                }
            })
        } else if ($(".selected-li").attr("id") == "ZZBBXQ") {
            $.ajax({
                type: "GET",
                url: rootPath + "/api/toFileOrganizationConstructionReport",
                dataType: "json",
                data: {
                    year: $(".huiyuan-date-select").val(),
                },
                success: function (data) {
                    if (data.status === 200) {
                        bootAlert("归档成功")
                        $(".statistics-buttons .main-button").html("已归档")
                        $(".statistics-buttons .main-button").attr("disabled", "disabled");
                        $(".statistics-buttons .main-button").addClass("isFiled");
                    } else {
                        bootAlert("归档失败")
                    }
                }, error: function () {
                    bootAlert("服务器请求失败")
                }
            })
        } else if ($(".selected-li").attr("id") == "NDBBXQ") {
            $.ajax({
                type: "GET",
                url: rootPath + "/api/toFileYearReport",
                dataType: "json",
                data: {
                    year: $(".huiyuan-date-select").val(),
                },
                success: function (data) {
                    if (data.status === 200) {
                        bootAlert("归档成功")
                        $(".statistics-buttons .main-button").html("已归档")
                        $(".statistics-buttons .main-button").attr("disabled", "disabled");
                        $(".statistics-buttons .main-button").addClass("isFiled");
                    } else {
                        bootAlert("归档失败")
                    }
                }, error: function () {
                    bootAlert("服务器请求失败")
                }
            })
        }
        else if ($(".selected-li").attr("id") == "XMBBXQ") {
            $.ajax({
                type: "GET",
                url: rootPath + "/api/toFileProjectWorkReport",
                dataType: "json",
                data: {
                    year: $(".huiyuan-date-select").val(),
                },
                success: function (data) {
                    if (data.status === 200) {
                        bootAlert("归档成功")
                        $(".statistics-buttons .main-button").html("已归档")
                        $(".statistics-buttons .main-button").attr("disabled", "disabled");
                        $(".statistics-buttons .main-button").addClass("isFiled");
                    } else {
                        bootAlert("归档失败")
                    }
                }, error: function () {
                    bootAlert("服务器请求失败")
                }
            })
        }
        else if ($(".selected-li").attr("id") == "XMBBXQ") {
            $.ajax({
                type: "GET",
                url: rootPath + "/api/toFileProjectWorkReport",
                dataType: "json",
                data: {
                    year: $(".huiyuan-date-select").val(),
                },
                success: function (data) {
                    if (data.status === 200) {
                        bootAlert("归档成功")
                        $(".statistics-buttons .main-button").html("已归档")
                        $(".statistics-buttons .main-button").attr("disabled", "disabled");
                        $(".statistics-buttons .main-button").addClass("isFiled");
                    } else {
                        bootAlert("归档失败")
                    }
                }, error: function () {
                    bootAlert("服务器请求失败")
                }
            })
        }
    })

    // 上报
    $("#YBSB").click(function () {
        $(".l-title").html('月报上报');
        $(".s-title").html('统计分析/项目工作分析/月报上报');
        $(".right-main").addClass("hidden");
        $(".right-main:nth-child(4)").removeClass("hidden");
        $("#pageInput").val("月报上报");
        $("#sbzt").html("");
        dataInfoTableMonthReport.clear();
        dataInfoTableMonthReport.destroy();
        dataInfoTableMonthReport = {
            "bServerSide": true,
            "processing": true,
            "sScrollX": "100%",
            //表格的宽度
            "sScrollY": "400px",
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
            "iDisplayLength": 100,
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
                "sInfo": "第 _START_ 到 _END_ 条记录，共 _TOTAL_ 条",
                "sZeroRecords": "没有相关记录"
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
                })
            },
        };
        // 设置请求url
        dataInfoTableMonthReport["sAjaxSource"] = rootPath + '/api/getProjectMonthlyReportChildStatus';
        // 设置字段数据源
        dataInfoTableMonthReport["aoColumns"] = [
            {
                "data": null
            },
            {
                "data": "organizationName"
            },
            {
                "data": null
            },
            {
                "data": null
            },
        ];
        // 渲染字段数据源
        dataInfoTableMonthReport["aoColumnDefs"] = [
            {
                "aTargets": [0], "mRender": function (data, type, row, meta) {
                    return meta.row + 1 + meta.settings._iDisplayStart;
                }
            },
            {
                "aTargets": [1], "mRender": function (data, type, row, meta) {
                    var name="";
                    if(row.scopeId%10000==0){
                        name=row.organizationName+"计生协";
                    }else{
                        name=row.organizationName;
                    }
                    return name;
                }
            },
            {
                "aTargets": [2], "mRender": function (data, type, row, meta) {
                    // if (row.chileStatus == 1) {
                    //     return "<span style='color: #222;'>已上报</span>";
                    // } else {
                    //     return "<span style='color: #fb2020;'>未上报</span>"
                    // }
                    return "";
                }
            },
            {
                "aTargets": [3], "mRender": function (data, type, row, meta) {
                    if (user.type === 1) {
                        return "<a id='" + row.scopeId + "' style='color: #1890ff'>历月报表</a>"
                    } else {
                        return "";
                    }

                }
            },
        ];

        dataInfoTableMonthReport["fnServerData"] = function (sSource, aoData, fnCallback) {
            $.ajax({
                "type": 'get',
                "url": sSource,
                "dataType": "json",
                "data": {//查询条件写这里
                    //dataTable固定参数
                    aoData: JSON.stringify(aoData),
                    // 选填参数
                    // search: searchText
                    scopeId:parseInt(user.scopeId),
                    year:parseInt(new Date().getFullYear()),
                    month:parseInt(new Date().getMonth()+1)
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
        dataInfoTableMonthReport = $("#monthReport-table").dataTable(dataInfoTableMonthReport).api();
        if(user.scopeId%100!=0){
            $(".right-main:nth-child(4) ul>li:nth-child(1)").click();
        }
    });
    $("#TSLDSB").click(function () {
        $(".l-title").html('特色亮点活动上报');
        $(".s-title").html('统计分析/项目工作分析/特色亮点活动上报');
        $(".right-main").addClass("hidden");
        $(".right-main:nth-child(8)").removeClass("hidden");
        $(".right-main:nth-child(8)>div:nth-child(n+3)").removeClass("hidden");
        $(".ActivitySb,.ActivityCk").addClass("hidden");
        $(".statistics-buttons .main-button").html('<img src="' + rootPath + '/resources/icon/5-shangbao.png">活动上报');
        $(".statistics-buttons .main-button").removeAttr("disabled");
        $(".statistics-buttons .main-button").removeClass("isFiled");
        $("#add-special-activity-name").val("");
        $("#add-special-activity-project").val("");
        $("#ActivityZongjie").html("");
        $("#add-special-activity-area").html("<span>\n" +
            "                                </span>\n" +
            "                                <img src=" + rootPath + "/resources/icon/3-tianjiahuodong.png>");
        $("#selectArea .search-member .dept-members input").each(function () {
            if ($(this).is(":checked")) {
                $(this).attr("checked", false);
            }
        })
        $(".summarizeImg").remove();
        $("#add-special-activity-name").removeClass('danger-input');
        $(".add-special-activity-name").addClass('notShow');
        $("#add-special-activity-project").removeClass('danger-input');
        $(".add-special-activity-project").addClass('notShow');
        $("#add-special-activity-area").removeClass('danger-input');
        $(".add-special-activity-area").addClass('notShow');
        $("#area-select").val(0).trigger("change");
        reloadAjax(dataInfoTableActivity);
    });
    $("#NDGZSB").click(function () {
        $(".l-title").html('年度工作上报');
        $(".s-title").html('统计分析/年度报表/工作上报');
        $("#pageInput").val("年度工作上报");
        $(".right-main").addClass("hidden");
        $(".right-main:nth-child(4)").removeClass("hidden");
        $("#sbzt").html("上报状态");
        dataInfoTableMonthReport.clear();
        dataInfoTableMonthReport.destroy();
        dataInfoTableMonthReport = {
            "bServerSide": true,
            "processing": true,
            "sScrollX": "100%",
            //表格的宽度
            "sScrollY": "400px",
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
            "aLengthMenu": [100, 25, 50, 100],
            //设置选择每页的条目数
            "iDisplayLength": 100,
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
                "sInfo": "第 _START_ 到 _END_ 条记录，共 _TOTAL_ 条",
                "sZeroRecords": "没有相关记录"
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
                })
            },
        };
        // 设置请求url
        dataInfoTableMonthReport["sAjaxSource"] = rootPath + '/api/getYearReportChildrenStatus';
        // 设置字段数据源
        dataInfoTableMonthReport["aoColumns"] = [
            {
                "data": ""
            },
            {
                "data": "organizationName"
            },
            {
                "data": "childStatus"
            },
            {
                "data": ""
            },
        ];
        // 渲染字段数据源
        dataInfoTableMonthReport["aoColumnDefs"] = [
            {
                "aTargets": [0], "mRender": function (data, type, row, meta) {
                    return meta.row + 1 + meta.settings._iDisplayStart;
                }
            },
            {
                "aTargets": [1], "mRender": function (data, type, row, meta) {
                    return row.organizationName;
                }
            },
            {
                "aTargets": [2], "mRender": function (data, type, row, meta) {
                    if (row.childStatus == 1) {
                        return "<span style='color: #222;'>已上报</span>";
                    } else {
                        return "<span style='color: #fb2020;'>未上报</span>"
                    }
                }
            },
            {
                "aTargets": [3], "mRender": function (data, type, row, meta) {
                    if (user.type === 1) {
                        return "<a id='" + row.scopeId + "' style='color: #1890ff'>历次报表</a>"
                    } else {
                        return "";
                    }

                }
            },
        ];

        dataInfoTableMonthReport["fnServerData"] = function (sSource, aoData, fnCallback) {
            $.ajax({
                "type": 'get',
                "url": sSource,
                "dataType": "json",
                "data": {//查询条件写这里
                    //dataTable固定参数
                    aoData: JSON.stringify(aoData),
                    // 选填参数
                    // search: searchText
                    year: (new Date()).getFullYear(),
                    parentOrganizationId: user.organizationId,
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
        dataInfoTableMonthReport = $("#monthReport-table").dataTable(dataInfoTableMonthReport).api();
        if(user.scopeId%100!=0){
            $(".right-main:nth-child(4) ul>li:nth-child(1)").click();
        }else{
            reloadAjax(dataInfoTableMonthReport);
        }

    });
    $("#ZZJSSB").click(function () {
        $(".l-title").html('组织建设上报');
        $(".s-title").html('统计分析/组织建设报表/工作上报');
        $(".right-main").addClass("hidden");
        $(".right-main:nth-child(4)").removeClass("hidden");
        $("#pageInput").val("组织建设上报");
        $("#sbzt").html("上报状态");
        dataInfoTableMonthReport.clear();
        dataInfoTableMonthReport.destroy();
        dataInfoTableMonthReport = {
            "bServerSide": true,
            "processing": true,
            "sScrollX": "100%",
            //表格的宽度
            "sScrollY": "400px",
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
            "iDisplayLength": 100,
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
                "sInfo": "第 _START_ 到 _END_ 条记录，共 _TOTAL_ 条",
                "sZeroRecords": "没有相关记录"
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
                })
            },
        };
        // 设置请求url

        dataInfoTableMonthReport["sAjaxSource"] = rootPath + '/api/getOrganizationConstructionReportChildrenStatus';
        // 设置字段数据源
        dataInfoTableMonthReport["aoColumns"] = [
            {
                "data": ""
            },
            {
                "data": "organizationName"
            },
            {
                "data": "childStatus"
            },
            {
                "data": ""
            },
        ];
        // 渲染字段数据源
        dataInfoTableMonthReport["aoColumnDefs"] = [
            {
                "aTargets": [0], "mRender": function (data, type, row, meta) {
                    return meta.row + 1 + meta.settings._iDisplayStart;
                }
            },
            {
                "aTargets": [1], "mRender": function (data, type, row, meta) {
                    return row.organizationName;
                }
            },
            {
                "aTargets": [2], "mRender": function (data, type, row, meta) {
                    if (row.childStatus == 1) {
                        return "<span style='color: #222;'>已上报</span>";
                    } else {
                        return "<span style='color: #fb2020;'>未上报</span>"
                    }
                }
            },
            {
                "aTargets": [3], "mRender": function (data, type, row, meta) {
                    if (user.type === 1) {
                        return "<a id='" + row.scopeId + "' style='color: #1890ff'>历次报表</a>"
                    } else {
                        return "";
                    }

                }
            },
        ];

        dataInfoTableMonthReport["fnServerData"] = function (sSource, aoData, fnCallback) {
            $.ajax({
                "type": 'get',
                "url": sSource,
                "dataType": "json",
                "data": {//查询条件写这里
                    //dataTable固定参数
                    aoData: JSON.stringify(aoData),
                    // 选填参数
                    // search: searchText
                    year: (new Date()).getFullYear(),
                    parentOrganizationId: user.organizationId,
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
        dataInfoTableMonthReport = $("#monthReport-table").dataTable(dataInfoTableMonthReport).api();
        if (user.scopeId % 100 != 0) {
            $(".right-main:nth-child(4) ul>li:nth-child(1)").click();
        }else{
            reloadAjax(dataInfoTableMonthReport);
        }

    });
    $("#LDRKSFD").click(function () {
        $(".l-title").html('流动人口示范点');
        $(".s-title").html('统计分析/组织建设报表/流动人口示范点');
        $(".right-main").addClass("hidden");
        $(".right-main:nth-child(4)").removeClass("hidden");
        $("#pageInput").val("流动人口示范点");
        $("#sbzt").html("");
        $.ajax({
            type: "GET",
            url: rootPath + "/api/getFloatingPopulationReportYears",
            dataType: "json",
            async: false,
            data: {},
            success: function (data) {
                if (data.status === 200) {
                    var html = "";
                    for (var i = 0; i < data.data.length; i++) {
                        html += "<option value='" + data.data[i] + "'>" + data.data[i] + "</option>\n"
                    }
                    $(".ldrkjsx-select").html(html);
                    $(".ldrkjsx-select").val(data.data[0]).trigger("change")
                    $(".ldrkjsx1-select").html(html);
                    $(".ldrkjsx1-select").val(data.data[0]).trigger("change")
                }
            },
            error: function () {
                bootAlert("服务器请求失败")
            }
        })
        if(user.scopeId==0){

            dataInfoTableMonthReport.clear();
            dataInfoTableMonthReport.destroy();
            dataInfoTableMonthReport = {
                "bServerSide": true,
                "processing": true,
                "sScrollX": "100%",
                //表格的宽度
                "sScrollY": "400px",
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
                "iDisplayLength": 100,
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
                    "sInfo": "第 _START_ 到 _END_ 条记录，共 _TOTAL_ 条",
                    "sZeroRecords": "没有相关记录"
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
                    })
                },
            };
            // 设置请求url

            dataInfoTableMonthReport["sAjaxSource"] = rootPath + '/api/getFloatingPopulationReportChildrenStatus';
            // 设置字段数据源
            dataInfoTableMonthReport["aoColumns"] = [
                {
                    "data": ""
                },
                {
                    "data": "organizationName"
                },
                {
                    "data": "childStatus"
                },
                {
                    "data": ""
                },
            ];
            // 渲染字段数据源
            dataInfoTableMonthReport["aoColumnDefs"] = [
                {
                    "aTargets": [0], "mRender": function (data, type, row, meta) {
                        return meta.row + 1 + meta.settings._iDisplayStart;
                    }
                },
                {
                    "aTargets": [1], "mRender": function (data, type, row, meta) {
                        return row.organizationName;
                    }
                },
                {
                    "aTargets": [2], "mRender": function (data, type, row, meta) {
                        // if (row.childStatus == 1) {
                        //     return "<span style='color: #222;'>已上报</span>";
                        // } else {
                        //     return "<span style='color: #fb2020;'>未上报</span>"
                        // }
                        return null;
                    }
                },
                {
                    "aTargets": [3], "mRender": function (data, type, row, meta) {
                        if (user.type === 1) {
                            return "<a id='" + row.scopeId + "' style='color: #1890ff'>历次报表</a>"
                        } else {
                            return "";
                        }

                    }
                },
            ];

            dataInfoTableMonthReport["fnServerData"] = function (sSource, aoData, fnCallback) {
                $.ajax({
                    "type": 'get',
                    "url": sSource,
                    "dataType": "json",
                    "data": {//查询条件写这里
                        //dataTable固定参数
                        aoData: JSON.stringify(aoData),
                        // 选填参数
                        // search: searchText
                        year: (new Date()).getFullYear(),
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
            dataInfoTableMonthReport = $("#monthReport-table").dataTable(dataInfoTableMonthReport).api();
        }else{
            reloadAjax(dataInfoTableSFD);
        }

        // if (user.scopeId % 100 != 0) {
        //     $(".right-main:nth-child(4) ul>li:nth-child(1)").click();
        // }else{
        //     reloadAjax(dataInfoTableMonthReport);
        // }


    });
    $("#NXHD").click(function () {
        $(".l-title").html('暖心活动');
        $(".s-title").html('统计分析/项目工作分析/暖心活动');
        $(".right-main").addClass("hidden");
        $(".right-main:nth-child(4)").removeClass("hidden");
        $("#pageInput").val("暖心活动");
        $("#sbzt").html("");
        $.ajax({
            type: "GET",
            url: rootPath + "/api/getFloatingPopulationReportYears",
            dataType: "json",
            async: false,
            data: {},
            success: function (data) {
                if (data.status === 200) {
                    var html = "";
                    for (var i = 0; i < data.data.length; i++) {
                        html += "<option value='" + data.data[i] + "'>" + data.data[i] + "</option>\n"
                    }
                    $(".ldrkjsx-select").html(html);
                    $(".ldrkjsx-select").val(data.data[0]).trigger("change")
                    $(".ldrkjsx1-select").html(html);
                    $(".ldrkjsx1-select").val(data.data[0]).trigger("change")
                }
            },
            error: function () {
                bootAlert("服务器请求失败")
            }
        })
        if(user.scopeId%100==0){
            dataInfoTableMonthReport.clear();
            dataInfoTableMonthReport.destroy();
            dataInfoTableMonthReport = {
                "bServerSide": true,
                "processing": true,
                "sScrollX": "100%",
                //表格的宽度
                "sScrollY": "400px",
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
                "iDisplayLength": 100,
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
                    "sInfo": "第 _START_ 到 _END_ 条记录，共 _TOTAL_ 条",
                    "sZeroRecords": "没有相关记录"
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
                    })
                },
            };
            // 设置请求url

            dataInfoTableMonthReport["sAjaxSource"] = rootPath + '/api/getWarmHeartReportChildrenStatus';
            // 设置字段数据源
            dataInfoTableMonthReport["aoColumns"] = [
                {
                    "data": ""
                },
                {
                    "data": "organizationName"
                },
                {
                    "data": "childStatus"
                },
                {
                    "data": ""
                },
            ];
            // 渲染字段数据源
            dataInfoTableMonthReport["aoColumnDefs"] = [
                {
                    "aTargets": [0], "mRender": function (data, type, row, meta) {
                        return meta.row + 1 + meta.settings._iDisplayStart;
                    }
                },
                {
                    "aTargets": [1], "mRender": function (data, type, row, meta) {
                        return row.organizationName;
                    }
                },
                {
                    "aTargets": [2], "mRender": function (data, type, row, meta) {
                        // if (row.childStatus == 1) {
                        //     return "<span style='color: #222;'>已上报</span>";
                        // } else {
                        //     return "<span style='color: #fb2020;'>未上报</span>"
                        // }
                        return null;
                    }
                },
                {
                    "aTargets": [3], "mRender": function (data, type, row, meta) {
                        if (user.type === 1) {
                            return "<a id='" + row.scopeId + "' style='color: #1890ff'>历次报表</a>"
                        } else {
                            return "";
                        }

                    }
                },
            ];

            dataInfoTableMonthReport["fnServerData"] = function (sSource, aoData, fnCallback) {
                $.ajax({
                    "type": 'get',
                    "url": sSource,
                    "dataType": "json",
                    "data": {//查询条件写这里
                        //dataTable固定参数
                        aoData: JSON.stringify(aoData),
                        // 选填参数
                        // search: searchText
                        year: (new Date()).getFullYear(),
                        parentOrganizationId:user.organizationId,
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
            dataInfoTableMonthReport = $("#monthReport-table").dataTable(dataInfoTableMonthReport).api();

        }else{
            reloadAjax(dataInfoTableNXHD);
        }



    })
    // 本级上报
    $(".right-main:nth-child(4) ul>li:nth-child(1)").click(function () {

        if ($("#pageInput").val() === "月报上报") {
            if (user.scopeId % 100 != 0) {
                $(".l-title").html('月报上报');

            } else {
                $(".l-title").html('<img src="' + rootPath + '/resources/icon/fanhui.png">月报上报');
            }
            $(".s-title").html('统计分析/项目工作分析/上报报表');
            $(".right-main").addClass("hidden");
            $(".right-main:nth-child(5)").removeClass("hidden");
            $(".right-main:nth-child(5)>div:nth-child(n+3)").removeClass("hidden");
            $(".right-main:nth-child(5) .ActivityQK").addClass("hidden");
            $(".right-main:nth-child(5) .top-ul").addClass("hidden");
            $(".right-main:nth-child(5) .ckActivityQk").addClass("hidden");

            $(".right-main:nth-child(5) .ybbjsbBtn div:nth-child(1)").click();

        } else if ($("#pageInput").val() === "年度工作上报") {
            if (user.type === 0) {
                bootAlert("非管理员权限不能上报")
                return;
            }
            if (user.scopeId % 100 != 0) {
                $(".l-title").html('年度工作上报');
            } else {
                $(".l-title").html('<img src="' + rootPath + '/resources/icon/fanhui.png">年度工作上报');
            }
            $(".s-title").html('统计分析/年度报表/上报报表');
            $(".right-main").addClass("hidden");
            $(".right-main:nth-child(6)").removeClass("hidden");
            $(".ndbjsbBtns").removeClass("hidden");
            $(".ndbjsbBtns .main-button").html("下一步");
            ndbbbjId = null;
            tmpData = {};
            $.ajax({
                type: "GET",
                url: rootPath + "/api/getYearReport",
                dataType: "json",
                async: false,
                data: {
                    year: (new Date()).getFullYear(),
                    scopeId: user.scopeId,
                },
                success: function (data) {
                    if (data.status === 200) {
                        if (data.data[0] != "") {
                            tmpData = data.data[0];
                            ndbbbjId = data.data[0].id;
                            ndFiledStatus = data.data[0].isFiled;
                            if (data.data[0].isFiled === 1) {
                                $(".ndbjsbBtns .normal-button").html("已归档");
                                $(".ndbjsbBtns .normal-button").attr("disabled", "disabled");
                                $(".ndbjsbBtns .normal-button").addClass("blue-button");
                            } else {
                                $(".ndbjsbBtns .normal-button").html("保存");
                                $(".ndbjsbBtns .normal-button").removeAttr("disabled");
                                $(".ndbjsbBtns .normal-button").removeClass("blue-button");
                            }
                        }
                    }
                },
                error: function () {
                    bootAlert("服务器请求失败")
                }
            })
            $(".ndbjsbBtn div:nth-child(1)").click();
        } else if ($("#pageInput").val() === "组织建设上报"){
            if (user.type === 0) {
                bootAlert("非管理员权限不能上报")
                return;
            }
            if (user.scopeId % 100 != 0) {
                $(".l-title").html('组织建设上报');
            } else {
                $(".l-title").html('<img src="' + rootPath + '/resources/icon/fanhui.png">组织建设上报');
            }
            $(".s-title").html('统计分析/组织建设报表/上报报表');
            $(".right-main").addClass("hidden");
            $(".right-main:nth-child(7)").removeClass("hidden");
            $(".right-main:nth-child(7) .yearReportInfo").addClass("hidden");
            $(".right-main:nth-child(7) .yearReportInfo:nth-child(5)").removeClass("hidden");
            $(".zzbjsbBtns").removeClass("hidden");
            $(".zzbjsbBtns .main-button").html("下一步");
            zzjsbbbjId = null;
            tmpData = {};
            $.ajax({
                type: "GET",
                url: rootPath + "/api/getOrganizationConstructionReport",
                dataType: "json",
                async: false,
                data: {
                    year: (new Date()).getFullYear(),
                    scopeId: user.scopeId,
                },
                success: function (data) {
                    if (data.status === 200) {
                        if (data.data[0] != "") {
                            tmpData = data.data[0];
                            zzjsbbbjId = data.data[0].id;
                            zzjsFiledStatus = data.data[0].isFiled;
                            if (data.data[0].isFiled === 1) {
                                $(".zzbjsbBtns .normal-button").html("已归档");
                                $(".zzbjsbBtns .normal-button").attr("disabled", "disabled");
                                $(".zzbjsbBtns .normal-button").addClass("blue-button");
                            } else {
                                $(".zzbjsbBtns .normal-button").html("保存");
                                $(".zzbjsbBtns .normal-button").removeAttr("disabled");
                                $(".zzbjsbBtns .normal-button").removeClass("blue-button");
                            }
                        }
                    }
                },
                error: function () {
                    bootAlert("服务器请求失败")
                }
            })
            $(".zzbjsbBtn div:nth-child(1)").click();
        }
        else if ($("#pageInput").val() === "流动人口示范点"){
            $(".l-title").html('<img src="' + rootPath + '/resources/icon/fanhui.png">流动人口示范点上报');
            $(".right-main").addClass("hidden");
            $(".right-main:nth-child(11)").removeClass("hidden");
            $(".right-main:nth-child(11) .yearReportInfo").addClass("hidden");
            $(".right-main:nth-child(11) .yearReportInfo:nth-child(4)").removeClass("hidden");
            $(".xzldrkBtns").removeClass("hidden");
            $(".sfdInsert>label:nth-child(1) input").val("");
            $(".sfdInsert>label:nth-child(2) input").prop("checked",false);
            $(".sfdInsert>label:nth-child(3) input").prop("checked",false);
            $(".sfdInsert>label:nth-child(4) input").val("");
            $(".sfdInsert>label:nth-child(5) input").val("");
            $(".sfdInsert>label:nth-child(6) input").val("");
            $(".sfdInsert>label:nth-child(7) input").val("");
            $(".sfdInsert>label:nth-child(8) input").val("");
            $(".sfdInsert>label:nth-child(9) input").val("");
            $(".sfdInsert>label:nth-child(10) input").val("");
            $(".sfdInsert>label:nth-child(11) input").val("");
            $(".sfdInsert>label:nth-child(12) input").val("");
        }
        else if ($("#pageInput").val() === "暖心活动"){
            $(".l-title").html('<img src="' + rootPath + '/resources/icon/fanhui.png">暖心活动上报');
            $(".right-main").addClass("hidden");
            $(".right-main:nth-child(13)").removeClass("hidden");
            $(".right-main:nth-child(13) .yearReportInfo").addClass("hidden");
            $(".right-main:nth-child(13) .yearReportInfo:nth-child(4)").removeClass("hidden");
            $(".nxhuBtns").removeClass("hidden");
            $(".right-main:nth-child(13) .yearReportInfo input").val("");

            $(".nxInsert>label:nth-child(1) input").val(allScope[user.scopeId].name);
            $.ajax({
                type: "GET",
                url: rootPath + "/api/judgeWarmHeartReport",
                dataType: "json",
                async:false,
                data: {
                    year: new Date().getFullYear(),
                    month: new Date().getMonth()+1,
                    scopeId:user.scopeId
                },
                success: function (data) {
                    if (data.status === 200) {
                        if(data.data==""){
                            isReportNxhd="";
                        }else{
                            isReportNxhd=data.data.id;
                            var list=$(".nxInsert>label input")
                            $(list[1]).val(data.data.xuqiudch);
                            $(list[2]).val(data.data.xuqiudcr);
                            $(list[3]).val(data.data.baoxianlpl);
                            $(list[4]).val(data.data.baoxianlpje);
                            $(list[5]).val(data.data.xinlijkfwh);
                            $(list[6]).val(data.data.xinlijkfwr);
                            $(list[7]).val(data.data.xinlijkfwjd);
                            $(list[8]).val(data.data.xinlijkfwcp);
                            $(list[9]).val(data.data.richangzfh);
                            $(list[10]).val(data.data.richangzfr);
                            $(list[11]).val(data.data.jierikwh);
                            $(list[12]).val(data.data.jierikwr);
                            $(list[13]).val(data.data.shengripbh);
                            $(list[14]).val(data.data.shengripbr);
                            $(list[15]).val(data.data.zhuyuantwh);
                            $(list[16]).val(data.data.zhuyuantwr);
                            $(list[17]).val(data.data.tufasjh);
                            $(list[18]).val(data.data.tufasjr);
                            $(list[19]).val(data.data.fuwuhdkzc);
                            $(list[20]).val(data.data.fuwuhdkzr);
                        }

                    }
                },
                error: function () {
                    bootAlert("服务器请求失败")
                }
            })
        }
    });
    $(".right-main:nth-child(8) .statistics-buttons button:nth-child(1)").click(function () {
        //特色亮点
        $.ajax({
            type: "GET",
            url: rootPath + "/api/getProjectList",
            dataType: "json",
            data: {
            },
            success: function (data) {
                if (data.status === 200) {
                    var html = "";
                    for (var i = 0; i < data.data.length; i++){
                        html += "<option value='" + data.data[i].name + "'>" + data.data[i].name + "</option>\n"
                    }
                    $("#add-special-activity-project").html(html);
                    $("#add-special-activity-project").select2("val","");
                    $("#add-special-activity-project").val($(this).val()).trigger("change");
                }
            },
            error: function () {
                bootAlert("服务器请求失败")
            }
        })
        $(".l-title").html('<img src="' + rootPath + '/resources/icon/fanhui.png">活动上报');
        $(".s-title").html('统计分析/项目工作分析/活动上报');
        $(".right-main").addClass("hidden");
        $(".right-main:nth-child(8)").removeClass("hidden");
        $(".right-main:nth-child(8)>div:nth-child(n+3)").addClass("hidden");
        $(".ActivitySb").removeClass("hidden");
        $(".ActivitySb>input[name=id]").val("-1");
        $("#visibility-region").html("");
        $(".ActivitySb .main-button").addClass('hidden');
        $("#special-activity-reporting").removeClass('hidden');
        $(".ActivitySb .danger-button").addClass('hidden');
    });
    //报表详情
    $("#xzsfd").click(function () {
        if($("#LDRKSFD").hasClass("selected-li")){
            $(".l-title").html('<img src="' + rootPath + '/resources/icon/fanhui.png">报表详情');
            $(".s-title").html('统计分析/组织建设报表/流动人口示范点报表详情');
            $(".right-button").html("杭州市流动人口示范点报表");
            $(".right-main").addClass("hidden");
            $(".right-main:nth-child(1)").removeClass("hidden");
            $(".right-main:nth-child(1) .col-lg-12").addClass("hidden");
            $(".right-main:nth-child(1) .col-lg-12:nth-child(8)").removeClass("hidden");
            $.ajax({
                type: "GET",
                url: rootPath + "/api/getFloatingPopulationReportYears",
                dataType: "json",
                async: false,
                data: {},
                success: function (data) {
                    if (data.status === 200) {
                        var html = "";
                        for (var i = 0; i < data.data.length; i++) {
                            html += "<option value='" + data.data[i] + "'>" + data.data[i] + "</option>\n"
                        }
                        $(".huiyuan-date-select").html(html);
                        $(".huiyuan-date-select").val(data.data[0]).trigger("change")
                    }
                },
                error: function () {
                    bootAlert("服务器请求失败")
                }
            })
            $.ajax({
                type: "GET",
                url: rootPath + "/api/getFloatingPopulationReport",
                dataType: "json",
                data: {
                    year: $(".huiyuan-date-select").val(),
                },
                success: function (data) {
                    if (data.status === 200) {
                        var html = "<tr>\n" +
                            "                                    <td style=\"font-weight: bold;font-size: 18px\" colspan=\"8\">流动人口计生协示范点信息统计表</td>\n" +
                            "                                </tr>\n" +
                            "                                <tr>\n" +
                            "                                    <td rowspan=\"4\">机构名称</td>\n" +
                            "                                    <td rowspan=\"4\">职工总数</td>\n" +
                            "                                    <td rowspan=\"4\">流动人口总数</td>\n" +
                            "                                    <td rowspan=\"4\">会员数</td>\n" +
                            "                                    <td rowspan=\"1\" colspan=\"4\">项目单位流动人口基本信息</td>\n" +
                            "                                </tr>\n" +
                            "                                <tr>\n" +
                            "                                    <td rowspan=\"1\" colspan=\"2\">流动人口数</td>\n" +
                            "                                    <td rowspan=\"1\" colspan=\"1\">未婚</td>\n" +
                            "                                    <td rowspan=\"1\" colspan=\"1\">已婚</td>\n" +
                            "                                </tr>\n" +
                            "                                <tr>\n" +
                            "\n" +
                            "                                    <td rowspan=\"1\" colspan=\"2\">（人）</td>\n" +
                            "                                    <td rowspan=\"2\">（人）</td>\n" +
                            "                                    <td rowspan=\"2\">（人）</td>\n" +
                            "                                </tr>\n" +
                            "                                <tr>\n" +
                            "                                    <td rowspan=\"1\">男</td>\n" +
                            "                                    <td rowspan=\"1\">女</td>\n" +
                            "                                </tr>\n";
                        for (var i = 0; i < data.data.length; i++){
                            if (data.data[i].scopeName == ""){
                                data.data[i].scopeName = "合计";
                            }else{
                                data.data[i].scopeName = data.data[i].scopeName+"计生协";
                            }
                            if (data.data[i].zhigongNumber == ""){
                                data.data[i].zhigongNumber = "0";
                            }
                            if (data.data[i].liudongrkNumber == ""){
                                data.data[i].liudongrkNumber = "0";
                            }
                            if (data.data[i].huiyuanNumber == ""){
                                data.data[i].huiyuanNumber = "0";
                            }
                            if (data.data[i].liudongMaleNumber == ""){
                                data.data[i].liudongMaleNumber = "0";
                            }
                            if (data.data[i].liudongFemaleNumber == ""){
                                data.data[i].liudongFemaleNumber = "0";
                            }
                            if (data.data[i].liudongUnmarriedNumber == ""){
                                data.data[i].liudongUnmarriedNumber = "0";
                            }
                            if (data.data[i].liudongMarriedNumber == ""){
                                data.data[i].liudongMarriedNumber = "0";
                            }
                            html += "                                <tr><td rowspan=\"1\" colspan=\"1\">" + data.data[i].scopeName + "</td>\n" +
                                "                                    <td rowspan=\"1\" colspan=\"1\">" + data.data[i].zhigongNumber + "</td>\n" +
                                "                                    <td rowspan=\"1\" colspan=\"1\">" + data.data[i].liudongrkNumber + "</td>\n" +
                                "                                    <td rowspan=\"1\" colspan=\"1\">" + data.data[i].huiyuanNumber + "</td>\n" +
                                "                                    <td rowspan=\"1\" colspan=\"1\">" + data.data[i].liudongMaleNumber + "</td>\n" +
                                "                                    <td rowspan=\"1\" colspan=\"1\">" + data.data[i].liudongFemaleNumber + "</td>\n" +
                                "                                    <td rowspan=\"1\" colspan=\"1\">" + data.data[i].liudongUnmarriedNumber + "</td>\n" +
                                "                                    <td rowspan=\"1\" colspan=\"1\">" + data.data[i].liudongMarriedNumber + "</td></tr>\n";
                        }
                        $("#LDRKSFDXQ").html(html);
                    }
                },
                error: function () {
                    bootAlert("服务器请求失败")
                }
            })
        }else{
            $(".l-title").html('<img src="' + rootPath + '/resources/icon/fanhui.png">报表详情');
            $(".s-title").html('统计分析/项目工作分析/暖心活动报表详情');
            $(".right-button").html("杭州市计生特殊家庭暖心行动月报表");
            $(".right-main").addClass("hidden");
            $(".right-main:nth-child(1)").removeClass("hidden");
            $(".right-main:nth-child(1) .col-lg-12").addClass("hidden");
            $(".right-main:nth-child(1) .col-lg-12:nth-child(9)").removeClass("hidden");

            var html="";
            var todayM=new Date().getMonth()+1;
            var todayY=new Date().getFullYear();
            var day="";
            for(var i=0;i<6;i++){
                if(todayM-i<1){
                    html += "<option value='" + (todayY-1)+'-'+(todayM-i+12) + "'>" + (todayY-1)+'-'+(todayM-i+12) + "</option>\n";
                    if(i==0){
                        day=(todayY-1)+'-'+(todayM-i+12);
                    }

                }else{
                    html += "<option value='" + (todayY)+'-'+(todayM-i) + "'>"  + (todayY)+'-'+(todayM-i) + "</option>\n";
                    if(i==0){
                        day=(todayY)+'-'+(todayM);
                    }

                }

            }
            $(".huiyuan-date-select").html(html);
            $(".huiyuan-date-select").val(day).trigger("change")
            $.ajax({
                type: "GET",
                url: rootPath + "/api/getWarmHeartReport",
                dataType: "json",
                data: {
                    year: $(".huiyuan-date-select").val().split('-')[0],
                    month: $(".huiyuan-date-select").val().split('-')[1],
                    scopeId:user.scopeId
                },
                success: function (data) {
                    if (data.status === 200) {
                        var html = '<tr>\n' +
                            '                                    <td rowspan="4" colspan="1">单位</td>\n' +
                            '                                    <td rowspan="1" colspan="20">主要内容</td>\n' +
                            '                                </tr>\n' +
                            '                                <tr>\n' +
                            '                                    <td rowspan="1" colspan="2">需求调查</td>\n' +
                            '                                    <td rowspan="1" colspan="2">保险理赔</td>\n' +
                            '                                    <td rowspan="1" colspan="4">心理健康服务</td>\n' +
                            '                                    <td rowspan="1" colspan="10">走访慰问落实</td>\n' +
                            '                                    <td rowspan="1" colspan="2">服务活动开展</td>\n' +
                            '                                </tr>\n' +
                            '                                <tr>\n' +
                            '                                    <td rowspan="2" colspan="1">户</td>\n' +
                            '                                    <td rowspan="2" colspan="1">人</td>\n' +
                            '                                    <td rowspan="2" colspan="1">例</td>\n' +
                            '                                    <td rowspan="2" colspan="1">金额(元)</td>\n' +
                            '                                    <td rowspan="2" colspan="1">户</td>\n' +
                            '                                    <td rowspan="2" colspan="1">人</td>\n' +
                            '                                    <td rowspan="2" colspan="1">建档(份)</td>\n' +
                            '                                    <td rowspan="2" colspan="1">测评(人)</td>\n' +
                            '                                    <td rowspan="1" colspan="2">日常走访</td>\n' +
                            '                                    <td rowspan="1" colspan="2">节日看望</td>\n' +
                            '                                    <td rowspan="1" colspan="2">生日陪伴</td>\n' +
                            '                                    <td rowspan="1" colspan="2">住院探望</td>\n' +
                            '                                    <td rowspan="1" colspan="2">突发事件</td>\n' +
                            '                                    <td rowspan="2" colspan="1">场</td>\n' +
                            '                                    <td rowspan="2" colspan="1">人</td>\n' +
                            '                                </tr>\n' +
                            '                                <tr>\n' +
                            '                                    <td rowspan="1" colspan="1">户</td>\n' +
                            '                                    <td rowspan="1" colspan="1">人</td>\n' +
                            '                                    <td rowspan="1" colspan="1">户</td>\n' +
                            '                                    <td rowspan="1" colspan="1">人</td>\n' +
                            '                                    <td rowspan="1" colspan="1">户</td>\n' +
                            '                                    <td rowspan="1" colspan="1">人</td>\n' +
                            '                                    <td rowspan="1" colspan="1">户</td>\n' +
                            '                                    <td rowspan="1" colspan="1">人</td>\n' +
                            '                                    <td rowspan="1" colspan="1">户</td>\n' +
                            '                                    <td rowspan="1" colspan="1">人</td>\n' +
                            '                                </tr>';
                        if(data.data.length ==0){
                            html+='<tr><td rowspan="1" colspan="21">没有相关记录</td></tr>'
                        }
                        for (var i = 0; i < data.data.length; i++){

                            if (data.data[i].scopeId == ""){
                                data.data[i].scopeName = "合计";
                            }else if (data.data[i].scopeId%10000==0){
                                data.data[i].scopeName = data.data[i].scopeName+"计生协";
                            }
                            if (data.data[i].xuqiudch == ""){
                                data.data[i].xuqiudch = "0";
                            }
                            if (data.data[i].xuqiudcr == ""){
                                data.data[i].xuqiudcr = "0";
                            }
                            if (data.data[i].baoxianlpl == ""){
                                data.data[i].baoxianlpl = "0";
                            }
                            if (data.data[i].baoxianlpje == ""){
                                data.data[i].baoxianlpje = "0";
                            }
                            if (data.data[i].xinlijkfwh == ""){
                                data.data[i].xinlijkfwh = "0";
                            }
                            if (data.data[i].xinlijkfwr == ""){
                                data.data[i].xinlijkfwr = "0";
                            }
                            if (data.data[i].xinlijkfwjd == ""){
                                data.data[i].xinlijkfwjd = "0";
                            }
                            if (data.data[i].xinlijkfwcp == ""){
                                data.data[i].xinlijkfwcp = "0";
                            }
                            if (data.data[i].richangzfh == ""){
                                data.data[i].richangzfh = "0";
                            }
                            if (data.data[i].richangzfr == ""){
                                data.data[i].richangzfr = "0";
                            }
                            if (data.data[i].jierikwh == ""){
                                data.data[i].jierikwh = "0";
                            }
                            if (data.data[i].jierikwr == ""){
                                data.data[i].jierikwr = "0";
                            }
                            if (data.data[i].shengripbh == ""){
                                data.data[i].shengripbh = "0";
                            }
                            if (data.data[i].shengripbr == ""){
                                data.data[i].shengripbr = "0";
                            }
                            if (data.data[i].zhuyuantwh == ""){
                                data.data[i].zhuyuantwh = "0";
                            }
                            if (data.data[i].zhuyuantwr == ""){
                                data.data[i].zhuyuantwr = "0";
                            }
                            if (data.data[i].tufasjh == ""){
                                data.data[i].tufasjh = "0";
                            }
                            if (data.data[i].tufasjr == ""){
                                data.data[i].tufasjr = "0";
                            }
                            if (data.data[i].fuwuhdkzc == ""){
                                data.data[i].fuwuhdkzc = "0";
                            }
                            if (data.data[i].fuwuhdkzr == ""){
                                data.data[i].fuwuhdkzr = "0";
                            }
                            html+='<tr>\n' +
                                '                                    <td rowspan="1" colspan="1">'+data.data[i].scopeName+'</td>\n' +
                                '                                    <td rowspan="1" colspan="1">'+data.data[i].xuqiudch+'</td>\n' +
                                '                                    <td rowspan="1" colspan="1">'+data.data[i].xuqiudcr+'</td>\n' +
                                '                                    <td rowspan="1" colspan="1">'+data.data[i].baoxianlpl+'</td>\n' +
                                '                                    <td rowspan="1" colspan="1">'+data.data[i].baoxianlpje+'</td>\n' +
                                '                                    <td rowspan="1" colspan="1">'+data.data[i].xinlijkfwh+'</td>\n' +
                                '                                    <td rowspan="1" colspan="1">'+data.data[i].xinlijkfwr+'</td>\n' +
                                '                                    <td rowspan="1" colspan="1">'+data.data[i].xinlijkfwjd+'</td>\n' +
                                '                                    <td rowspan="1" colspan="1">'+data.data[i].xinlijkfwcp+'</td>\n' +
                                '                                    <td rowspan="1" colspan="1">'+data.data[i].richangzfh+'</td>\n' +
                                '                                    <td rowspan="1" colspan="1">'+data.data[i].richangzfr+'</td>\n' +
                                '                                    <td rowspan="1" colspan="1">'+data.data[i].jierikwh+'</td>\n' +
                                '                                    <td rowspan="1" colspan="1">'+data.data[i].jierikwr+'</td>\n' +
                                '                                    <td rowspan="1" colspan="1">'+data.data[i].shengripbh+'</td>\n' +
                                '                                    <td rowspan="1" colspan="1">'+data.data[i].shengripbr+'</td>\n' +
                                '                                    <td rowspan="1" colspan="1">'+data.data[i].zhuyuantwh+'</td>\n' +
                                '                                    <td rowspan="1" colspan="1">'+data.data[i].zhuyuantwr+'</td>\n' +
                                '                                    <td rowspan="1" colspan="1">'+data.data[i].tufasjh+'</td>\n' +
                                '                                    <td rowspan="1" colspan="1">'+data.data[i].tufasjr+'</td>\n' +
                                '                                    <td rowspan="1" colspan="1">'+data.data[i].fuwuhdkzc+'</td>\n' +
                                '                                    <td rowspan="1" colspan="1">'+data.data[i].fuwuhdkzr+'</td>\n' +
                                '                                </tr>'
                        }
                        $("#NXHDXQ").html(html);
                    }
                },
                error: function () {
                    bootAlert("服务器请求失败")
                }
            })
        }

    });
    // 上报返回
    $(".right-main:nth-child(1)").on('click', '.l-title img', function () {
        if($("#LDRKSFD").hasClass("selected-li"))
            $("#LDRKSFD").click();
        else
            $("#NXHD").click();
    });
    $(".right-main:nth-child(2)").on('click', '.l-title img', function () {
        if ($("#pageInput").val() === "月报上报") {
        } else if ($("#pageInput").val() === "年度工作上报") {
            $("#NDGZSB").click();
        } else if ($("#pageInput").val() === "组织建设上报"){
            $("#ZZJSSB").click();
        }
        else if ($("#pageInput").val() === "流动人口示范点"){
            $("#LDRKSFD").click();
        }
        else if ($("#pageInput").val() === "暖心活动"){
            $("#NXHD").click();
        }
    });
    $(".right-main:nth-child(5)").on('click', '.l-title img', function () {
        $("#YBSB").click();
    });
    $(".right-main:nth-child(6)").on('click', '.l-title img', function () {
        $("#NDGZSB").click();
    });
    $(".right-main:nth-child(7)").on('click', '.l-title img', function () {
        $("#ZZJSSB").click();
    });
    $(".right-main:nth-child(8)").on('click', '.l-title img', function () {
        $("#TSLDSB").click();
    });
    $(".right-main:nth-child(9)").on('click', '.l-title img', function () {
        $(".l-title").html('<img src="' + rootPath + '/resources/icon/fanhui.png">上报记录');
        $(".s-title").html('年度报表/上报记录');
        $(".right-main").addClass("hidden");
        $(".right-main:nth-child(2)").removeClass("hidden");
        reloadAjax(dataInfoTableJilu);
    });
    $(".right-main:nth-child(10)").on('click', '.l-title img', function () {
        $(".l-title").html('<img src="' + rootPath + '/resources/icon/fanhui.png">上报记录');
        $(".s-title").html('组织建设报表/上报记录');
        $(".right-main").addClass("hidden");
        $(".right-main:nth-child(2)").removeClass("hidden");
        reloadAjax(dataInfoTableJilu);
    });
    $(".right-main:nth-child(11)").on('click', '.l-title img', function () {
        $("#LDRKSFD").click();
    });
    $(".right-main:nth-child(12)").on('click', '.l-title img', function () {
        if(user.scopeId==0){
            $(".l-title").html('<img src="' + rootPath + '/resources/icon/fanhui.png">上报记录');
            $(".s-title").html('流动人口示范点/上报记录');
            $(".right-main").addClass("hidden");
            $(".right-main:nth-child(2)").removeClass("hidden");
        }else{
            $("#LDRKSFD").click();
            reloadAjax(dataInfoTableSFD);
        }

    });
    $(".right-main:nth-child(13)").on('click', '.l-title img', function () {
        $("#NXHD").click();

    });
    $(".right-main:nth-child(14)").on('click', '.l-title img', function () {
        if(user.scopeId%100==0){
            $(".l-title").html('<img src="' + rootPath + '/resources/icon/fanhui.png">上报记录');
            $(".s-title").html('暖心活动/上报记录');
            $(".right-main").addClass("hidden");
            $(".right-main:nth-child(2)").removeClass("hidden");
        }else{
            $("#NXHD").click();
            reloadAjax(dataInfoTableNXHD);
        }

    });
    // 历次报表
    $("#monthReport-table").delegate('td:last-child a', 'click', function () {
        if ($("#pageInput").val() === "月报上报") {
            $(".l-title").html('<img src="' + rootPath + '/resources/icon/fanhui.png">月报记录');
            $(".s-title").html('统计分析/项目工作分析/月报记录');
            $(".right-main").addClass("hidden");
            $(".right-main:nth-child(5)").removeClass("hidden");
            $(".right-main:nth-child(5)>div:nth-child(n+3)").addClass("hidden");
            $(".right-main:nth-child(5) .jl").removeClass("hidden");
            $(".right-main:nth-child(5) .top-ul").removeClass("hidden");
            $(".right-main:nth-child(5) .ckActivityQk").addClass("hidden");
            $(".right-main:nth-child(5) .top-ul").children().children().eq(0).click();
            $("#ldrksfdName").html("报表名称");
            ybScoped=$(this).attr("id");
            var html="";
            var todayM=new Date().getMonth()+1;
            var todayY=new Date().getFullYear();
            var day="";
            for(var i=0;i<6;i++){
                if(todayM-i<1){
                    html += "<option value='" + (todayY-1)+'-'+(todayM-i+12) + "'>" + (todayY-1)+'-'+(todayM-i+12) + "</option>\n";
                    if(i==0){
                        day=(todayY-1)+'-'+(todayM-i+12);
                    }

                }else{
                    html += "<option value='" + (todayY)+'-'+(todayM-i) + "'>"  + (todayY)+'-'+(todayM-i) + "</option>\n";
                    if(i==0){
                        day=(todayY)+'-'+(todayM);
                    }

                }

            }
            $(".ybjl-select").html(html);
            $(".ybjl-select").val(day).trigger("change")
            reloadAjax(dataInfoTableMonthReportInfo);
        } else if ($("#pageInput").val() === "年度工作上报") {
            $(".l-title").html('<img src="' + rootPath + '/resources/icon/fanhui.png">上报记录');
            $(".s-title").html('年度报表/上报记录');
            $(".right-main").addClass("hidden");
            $(".right-main:nth-child(2)").removeClass("hidden");
            selectScopeId = $(this).attr("id");
            $("#ldrksfdName").html("报表名称");
            dataInfoTableJilu.destroy();
            var dataTableInitJilu = {
                "bServerSide": true,
                "processing": true,
                "sScrollX": "100%",
                //表格的宽度
                "sScrollY": "400px",
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
                "aLengthMenu": [100, 25, 50, 100],
                //设置选择每页的条目数
                "iDisplayLength": 100,
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
                    "sInfo": "第 _START_ 到 _END_ 条记录，共 _TOTAL_ 条",
                    "sZeroRecords": "没有相关记录"
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
            dataTableInitJilu["sAjaxSource"] = rootPath + '/api/getYearReport';
            // 设置字段数据源
            dataTableInitJilu["aoColumns"] = [
                {
                    "data": "id"
                },
                {
                    "data": "title"
                },
                {
                    "data": "createdTime"
                },
                {
                    "data": "updatedTime"
                },
                {
                    "data": "id"
                },
            ];
            // 渲染字段数据源
            dataTableInitJilu["aoColumnDefs"] = [
                {
                    "aTargets": [0], "mRender": function (data, type, row, meta) {
                        return meta.row + 1 + meta.settings._iDisplayStart;
                    }
                },
                {
                    "aTargets": [1], "mRender": function (data, type, row, meta) {
                        return row.scopeName + "组织建设报表";
                    }
                },
                {
                    "aTargets": [2], "mRender": function (data, type, row, meta) {
                        return row.createdTime.substring(0, 10);
                    }
                },
                {
                    "aTargets": [3], "mRender": function (data, type, row, meta) {
                        return row.reportPersonName;
                    }
                },
                {
                    "aTargets": [4], "mRender": function (data, type, row, meta) {
                        return "<div class='table-operate'><a id='" + row.scopeId + "'>查看</a></div>";
                    }
                },
            ];

            dataTableInitJilu["fnServerData"] = function (sSource, aoData, fnCallback) {
                $.ajax({
                    "type": 'get',
                    "url": sSource,
                    "dataType": "json",
                    "data": {//查询条件写这里
                        //dataTable固定参数
                        aoData: JSON.stringify(aoData),
                        // 选填参数
                        // search: searchText
                        scopeId: selectScopeId,
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
            dataInfoTableJilu = $("#jilu-table").dataTable(dataTableInitJilu).api();
            // reloadAjax(dataInfoTableJilu);
        } else if ($("#pageInput").val() === "组织建设上报")  {
            $(".l-title").html('<img src="' + rootPath + '/resources/icon/fanhui.png">上报记录');
            $(".s-title").html('组织建设报表/上报记录');
            $(".right-main").addClass("hidden");
            $(".right-main:nth-child(2)").removeClass("hidden");
            selectScopeId = $(this).attr("id");
            $("#ldrksfdName").html("报表名称");
            dataInfoTableJilu.destroy();
            var dataTableInitJilu = {
                "bServerSide": true,
                "processing": true,
                "sScrollX": "100%",
                //表格的宽度
                "sScrollY": "400px",
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
                "aLengthMenu": [100, 25, 50, 100],
                //设置选择每页的条目数
                "iDisplayLength": 100,
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
                    "sInfo": "第 _START_ 到 _END_ 条记录，共 _TOTAL_ 条",
                    "sZeroRecords": "没有相关记录"
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
            dataTableInitJilu["sAjaxSource"] = rootPath + '/api/getOrganizationConstructionReport';
            // 设置字段数据源
            dataTableInitJilu["aoColumns"] = [
                {
                    "data": "id"
                },
                {
                    "data": "title"
                },
                {
                    "data": "createdTime"
                },
                {
                    "data": "updatedTime"
                },
                {
                    "data": "id"
                },
            ];
            // 渲染字段数据源
            dataTableInitJilu["aoColumnDefs"] = [
                {
                    "aTargets": [0], "mRender": function (data, type, row, meta) {
                        return meta.row + 1 + meta.settings._iDisplayStart;
                    }
                },
                {
                    "aTargets": [1], "mRender": function (data, type, row, meta) {
                        return row.scopeName + "组织建设报表";
                    }
                },
                {
                    "aTargets": [2], "mRender": function (data, type, row, meta) {
                        return row.createdTime.substring(0, 10);
                    }
                },
                {
                    "aTargets": [3], "mRender": function (data, type, row, meta) {
                        return row.reportPersonName;
                    }
                },
                {
                    "aTargets": [4], "mRender": function (data, type, row, meta) {
                        return "<div class='table-operate'><a id='" + row.scopeId + "'>查看</a></div>";
                    }
                },
            ];

            dataTableInitJilu["fnServerData"] = function (sSource, aoData, fnCallback) {
                $.ajax({
                    "type": 'get',
                    "url": sSource,
                    "dataType": "json",
                    "data": {//查询条件写这里
                        //dataTable固定参数
                        aoData: JSON.stringify(aoData),
                        // 选填参数
                        // search: searchText
                        scopeId: selectScopeId,
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
            dataInfoTableJilu = $("#jilu-table").dataTable(dataTableInitJilu).api();
            // reloadAjax(dataInfoTableJilu);
        }
        else if ($("#pageInput").val() === "流动人口示范点"){
            $(".l-title").html('<img src="' + rootPath + '/resources/icon/fanhui.png">上报记录');
            $(".s-title").html('流动人口示范点/上报记录');
            $(".right-main").addClass("hidden");
            $(".right-main:nth-child(2)").removeClass("hidden");
            selectScopeId = $(this).attr("id");
            $("#ldrksfdName").html("示范点名称");
            dataInfoTableJilu.destroy();
            var dataTableInitJilu = {
                "bServerSide": true,
                "processing": true,
                "sScrollX": "100%",
                //表格的宽度
                "sScrollY": "400px",
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
                "aLengthMenu": [100, 25, 50, 100],
                //设置选择每页的条目数
                "iDisplayLength": 100,
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
                    "sInfo": "第 _START_ 到 _END_ 条记录，共 _TOTAL_ 条",
                    "sZeroRecords": "没有相关记录"
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
            dataTableInitJilu["sAjaxSource"] = rootPath + '/api/getFloatingPopulationReport';
            // 设置字段数据源
            dataTableInitJilu["aoColumns"] = [
                {
                    "data": "id"
                },
                {
                    "data": "title"
                },
                {
                    "data": "createdTime"
                },
                {
                    "data": "updatedTime"
                },
                {
                    "data": "id"
                },
            ];
            // 渲染字段数据源
            dataTableInitJilu["aoColumnDefs"] = [
                {
                    "aTargets": [0], "mRender": function (data, type, row, meta) {
                        return meta.row + 1 + meta.settings._iDisplayStart;
                    }
                },
                {
                    "aTargets": [1], "mRender": function (data, type, row, meta) {
                        return row.name;
                    }
                },
                {
                    "aTargets": [2], "mRender": function (data, type, row, meta) {
                        return row.createdTime.substring(0, 10);
                    }
                },
                {
                    "aTargets": [3], "mRender": function (data, type, row, meta) {
                        return row.reportPersonName;
                    }
                },
                {
                    "aTargets": [4], "mRender": function (data, type, row, meta) {
                        return "<div class='table-operate'><a id='" + row.id + "'>查看</a></div>";
                    }
                },
            ];

            dataTableInitJilu["fnServerData"] = function (sSource, aoData, fnCallback) {
                $.ajax({
                    "type": 'get',
                    "url": sSource,
                    "dataType": "json",
                    "data": {//查询条件写这里
                        //dataTable固定参数
                        aoData: JSON.stringify(aoData),
                        // 选填参数
                        // search: searchText
                        scopeId: selectScopeId,
                        year: $(".ldrkjsx1-select").val(),
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
            dataInfoTableJilu = $("#jilu-table").dataTable(dataTableInitJilu).api();
        }
        else if ($("#pageInput").val() === "暖心活动"){
            $(".l-title").html('<img src="' + rootPath + '/resources/icon/fanhui.png">上报记录');
            $(".s-title").html('暖心活动/上报记录');
            $(".right-main").addClass("hidden");
            $(".right-main:nth-child(2)").removeClass("hidden");
            var id = $(this).attr("id");
            $("#ldrksfdName").html("单位名称");
            dataInfoTableJilu.destroy();
            var dataTableInitJilu = {
                "bServerSide": true,
                "processing": true,
                "sScrollX": "100%",
                //表格的宽度
                "sScrollY": "400px",
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
                "aLengthMenu": [15, 25, 50, 100],
                //设置选择每页的条目数
                "iDisplayLength": 15,
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
                    "sInfo": "第 _START_ 到 _END_ 条记录，共 _TOTAL_ 条",
                    "sZeroRecords": "没有相关记录"
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
            dataTableInitJilu["sAjaxSource"] = rootPath + '/api/getWarmHeartReportLici';
            // 设置字段数据源
            dataTableInitJilu["aoColumns"] = [
                {
                    "data": "id"
                },
                {
                    "data": "id"
                },
                {
                    "data": "createdTime"
                },
                {
                    "data": "updatedTime"
                },
                {
                    "data": "id"
                },
            ];
            // 渲染字段数据源
            dataTableInitJilu["aoColumnDefs"] = [
                {
                    "aTargets": [0], "mRender": function (data, type, row, meta) {
                        return meta.row + 1 + meta.settings._iDisplayStart;
                    }
                },
                {
                    "aTargets": [1], "mRender": function (data, type, row, meta) {
                        return row.scopeName;
                    }
                },
                {
                    "aTargets": [2], "mRender": function (data, type, row, meta) {
                        return row.createdTime.substring(0, 10);
                    }
                },
                {
                    "aTargets": [3], "mRender": function (data, type, row, meta) {
                        return row.reportPersonName;
                    }
                },
                {
                    "aTargets": [4], "mRender": function (data, type, row, meta) {
                        return "<div class='table-operate'><a id='" + row.id + "'>查看</a></div>";
                    }
                },
            ];

            dataTableInitJilu["fnServerData"] = function (sSource, aoData, fnCallback) {
                $.ajax({
                    "type": 'get',
                    "url": sSource,
                    "dataType": "json",
                    "data": {//查询条件写这里
                        //dataTable固定参数
                        aoData: JSON.stringify(aoData),
                        // 选填参数
                        // search: searchText
                        scopeId:id
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
            dataInfoTableJilu = $("#jilu-table").dataTable(dataTableInitJilu).api();
        }
    });
    // 报表查看
    $("#jilu-table").delegate('td:last-child a', 'click', function () {
        if ($("#pageInput").val() === "月报上报") {
        } else if ($("#pageInput").val() === "年度工作上报") {
            $(".l-title").html('<img src="' + rootPath + '/resources/icon/fanhui.png">报表查看');
            $(".s-title").html('统计分析/年度报表/报表查看');
            $(".right-main").addClass("hidden");
            $(".right-main:nth-child(9)").removeClass("hidden");
            var tmp = {};
            $.ajax({
                type: "GET",
                url: rootPath + "/api/getYearReport",
                dataType: "json",
                async: false,
                data: {
                    year: $(this).parent().parent().prev().prev().html().substring(0, 4),
                    scopeId: $(this).attr("id"),
                },
                success: function (data) {
                    if (data.status === 200) {
                        if (data.data[0] != null) {
                            tmp = data.data[0];
                        }
                    }
                },
                error: function () {
                    bootAlert("服务器请求失败")
                }
            })
            var title = ["青春健康教育", "计生特殊家庭帮扶", "健康服务", "慰问救助", "宣传教育", "流动人口", "业务培训", "志愿者队伍建设"];
            var html = "";
            for (var i = 0; i < 7; i++) {
                html += '<div class="readtitle">' + title[i] + '</div>';
                var index = 0;
                html += '<div>';
                if (tmp.scopeId % 100 !== 0) {
                    // 社区级
                    for (var key in year_report_shequ[i]) {
                        html += '<label><span><span>*</span>' + year_report_shequ[i][key] + '：</span><input id="read' + key + '" readonly disabled class="normal-input"></label>';
                        index += 1;
                        if (index % 2 === 0) {
                            html += '</div><div>'
                        }
                    }
                } else if (tmp.scopeId % 10000 !== 0) {
                    // 街道级
                    for (var key in year_report_jiedao[i]) {
                        html += '<label><span><span>*</span>' + year_report_jiedao[i][key] + '：</span><input id="read' + key + '" readonly disabled class="normal-input"></label>';
                        index += 1;
                        if (index % 2 === 0) {
                            html += '</div><div>'
                        }
                    }
                } else if (tmp.scopeId !== 0) {
                    // 区级
                    for (var key in year_report_qu[i]) {
                        html += '<label><span><span>*</span>' + year_report_qu[i][key] + '：</span><input id="read' + key + '" readonly disabled class="normal-input"></label>';
                        index += 1;
                        if (index % 2 === 0) {
                            html += '</div><div>'
                        }
                    }
                } else if (tmp.scopeId === 0) {
                    // 市级
                    for (var key in year_report_shi[i]) {
                        html += '<label><span><span>*</span>' + year_report_shi[i][key] + '：</span><input id="read' + key + '" readonly disabled class="normal-input"></label>';
                        index += 1;
                        if (index % 2 === 0) {
                            html += '</div><div>'
                        }
                    }
                }
                html += '</div>'
            }
            $(".right-main:nth-child(9) .readReport").html(html)
            $(".right-main:nth-child(9) .readReport>div").each(function () {
                if ($(this).html() === "") {
                    $(this).remove();
                }
            });
            for (var i = 0; i < 7; i++) {
                if (tmp.scopeId % 100 !== 0) {
                    //社区级
                    for (var key in year_report_shequ[i]) {
                        $("#read" + key).val(tmp[key])
                    }
                } else if (tmp.scopeId % 10000 !== 0) {
                    // 街道级
                    for (var key in year_report_jiedao[i]) {
                        $("#read" + key).val(tmp[key])
                    }
                } else if (tmp.scopeId !== 0) {
                    // 区级
                    for (var key in year_report_qu[i]) {
                        $("#read" + key).val(tmp[key])
                    }
                } else if (tmp.scopeId === 0) {
                    // 市级
                    for (var key in year_report_shi[i]) {
                        $("#read" + key).val(tmp[key])
                    }
                }
            }
        } else if ($("#pageInput").val() === "组织建设上报"){
            $(".l-title").html('<img src="' + rootPath + '/resources/icon/fanhui.png">报表查看');
            $(".s-title").html('统计分析/组织建设报表/报表查看');
            $(".right-main").addClass("hidden");
            $(".right-main:nth-child(10)").removeClass("hidden");
            var tmp = {};
            $.ajax({
                type: "GET",
                url: rootPath + "/api/getOrganizationConstructionReport",
                dataType: "json",
                async: false,
                data: {
                    year: $(this).parent().parent().prev().prev().html().substring(0, 4),
                    scopeId: $(this).attr("id"),
                },
                success: function (data) {
                    if (data.status === 200) {
                        if (data.data[0] != null) {
                            tmp = data.data[0];
                        }
                    }
                },
                error: function () {
                    bootAlert("服务器请求失败")
                }
            })
            var title = ["基本信息", "机构信息", "人员信息", "活动与资金", "其他"];
            var html = "";
            for (var i = 0; i < 5; i++) {
                html += '<div class="readtitle">' + title[i] + '</div>';
                var index = 0;
                html += '<div>';
                if (tmp.scopeId % 100 !== 0) {
                    // 社区级
                    for (var key in organization_construction_report_shequ[i]) {
                        html += '<label><span><span>*</span>' + organization_construction_report_shequ[i][key] + '：</span><input id="read' + key + '" readonly disabled class="normal-input"></label>';
                        index += 1;
                        if (index % 2 === 0) {
                            html += '</div><div>'
                        }
                    }
                } else if (tmp.scopeId % 10000 !== 0) {
                    // 街道级
                    for (var key in organization_construction_report_jiedao[i]) {
                        html += '<label><span><span>*</span>' + organization_construction_report_jiedao[i][key] + '：</span><input id="read' + key + '" readonly disabled class="normal-input"></label>';
                        index += 1;
                        if (index % 2 === 0) {
                            html += '</div><div>'
                        }
                    }
                } else if (tmp.scopeId !== 0) {
                    // 区级
                    for (var key in organization_construction_report_qu[i]) {
                        html += '<label><span><span>*</span>' + organization_construction_report_qu[i][key] + '：</span><input id="read' + key + '" readonly disabled class="normal-input"></label>';
                        index += 1;
                        if (index % 2 === 0) {
                            html += '</div><div>'
                        }
                    }
                } else if (tmp.scopeId === 0) {
                    // 市级
                    for (var key in organization_construction_report_shi[i]) {
                        html += '<label><span><span>*</span>' + organization_construction_report_shi[i][key] + '：</span><input id="read' + key + '" readonly disabled class="normal-input"></label>';
                        index += 1;
                        if (index % 2 === 0) {
                            html += '</div><div>'
                        }
                    }
                }
                html += '</div>'
            }
            $(".right-main:nth-child(10) .readReport").html(html)
            $(".right-main:nth-child(10) .readReport>div").each(function () {
                if ($(this).html() === "") {
                    $(this).remove();
                }
            });
            for (var i = 0; i < 5; i++) {
                if (tmp.scopeId % 100 !== 0) {
                    //社区级
                    for (var key in organization_construction_report_shequ[i]) {
                        $("#read" + key).val(tmp[key])
                    }
                } else if (tmp.scopeId % 10000 !== 0) {
                    // 街道级
                    for (var key in organization_construction_report_jiedao[i]) {
                        $("#read" + key).val(tmp[key])
                    }
                } else if (tmp.scopeId !== 0) {
                    // 区级
                    for (var key in organization_construction_report_qu[i]) {
                        $("#read" + key).val(tmp[key])
                    }
                } else if (tmp.scopeId === 0) {
                    // 市级
                    for (var key in organization_construction_report_shi[i]) {
                        $("#read" + key).val(tmp[key])
                    }
                }
            }
            $("#readdanweimc").val(tmp.scopeName + "计生协")
        }
        else if ($("#pageInput").val() === "流动人口示范点"){
            $(".l-title").html('<img src="' + rootPath + '/resources/icon/fanhui.png">报表查看');
            $(".s-title").html('统计分析/组织建设报表/流动人口计生协示范点详情');
            $(".right-main").addClass("hidden");
            $(".right-main:nth-child(12)").removeClass("hidden");
            floatReport= $(this).attr("id")
            $.ajax({
                type: "GET",
                url: rootPath + "/api/getOneFloatingPopulationReport",
                dataType: "json",
                async: false,
                data: {
                    id: $(this).attr("id"),
                },
                success: function (data) {
                    if (data.status === 200) {
                        $("#sfdName").html("示范点名称： " + data.data.name);
                        $("#ldrksfdLevel" + data.data.level).prop("checked", true).change();
                        $("#ldrksfdType" + data.data.type).prop("checked", true).change();
                        $("input[name='xqcj']").attr('disabled',true);
                        $("input[name='xqlx']").attr('disabled',true);
                        $("#ldrksfdAddress").html(data.data.address);
                        $("#ldrksfdZhiGong").html(data.data.zhigongNumber);
                        $("#ldrksfdLiuDong").html(data.data.liudongrkNumber);
                        $("#ldrksfdJianLiDate").html(data.data.liudongrkjsxjlDate.substring(0,4) + "年" + parseInt(data.data.liudongrkjsxjlDate.substring(5,7)) + "月");
                        $("#ldrksfdHuiyuan").html(data.data.huiyuanNumber);
                        $("#ldrksfdMale").html(data.data.liudongMaleNumber);
                        $("#ldrksfdFemale").html(data.data.liudongFemaleNumber);
                        $("#ldrksfdUnmarried").html(data.data.liudongUnmarriedNumber);
                        $("#ldrksfdMarried").html(data.data.liudongMarriedNumber);
                    }
                },
                error: function () {
                    bootAlert("服务器请求失败")
                }
            })
        }
        else if ($("#pageInput").val() === "暖心活动"){
            $(".l-title").html('<img src="' + rootPath + '/resources/icon/fanhui.png">报表查看');
            $(".s-title").html('统计分析/项目工作分析/暖心活动详情');
            $(".right-main").addClass("hidden");
            $(".right-main:nth-child(14)").removeClass("hidden");
            heartReport=$(this).attr("id")
            $.ajax({
                type: "GET",
                url: rootPath + "/api/getOneWarmHeartReport",
                dataType: "json",
                async: false,
                data: {
                    id: $(this).attr("id"),
                },
                success: function (data) {
                    if (data.status === 200) {
                        var list=$(".oneHeart td");
                        if(data.data.scopeId!=0&&data.data.scopeId%10000==0){
                            var name = allScope[data.data.scopeId].name+"计生协";
                        }else{
                            var name = allScope[data.data.scopeId].name;
                        }
                        if (data.data.xuqiudch == ""){
                            data.data.xuqiudch = "0";
                        }
                        if (data.data.xuqiudcr == ""){
                            data.data.xuqiudcr = "0";
                        }
                        if (data.data.baoxianlpl == ""){
                            data.data.baoxianlpl = "0";
                        }
                        if (data.data.baoxianlpje == ""){
                            data.data.baoxianlpje = "0";
                        }
                        if (data.data.xinlijkfwh == ""){
                            data.data.xinlijkfwh = "0";
                        }
                        if (data.data.xinlijkfwr == ""){
                            data.data.xinlijkfwr = "0";
                        }
                        if (data.data.xinlijkfwjd == ""){
                            data.data.xinlijkfwjd = "0";
                        }
                        if (data.data.xinlijkfwcp == ""){
                            data.data.xinlijkfwcp = "0";
                        }
                        if (data.data.richangzfh == ""){
                            data.data.richangzfh = "0";
                        }
                        if (data.data.richangzfr == ""){
                            data.data.richangzfr = "0";
                        }
                        if (data.data.jierikwh == ""){
                            data.data.jierikwh = "0";
                        }
                        if (data.data.jierikwr == ""){
                            data.data.jierikwr = "0";
                        }
                        if (data.data.shengripbh == ""){
                            data.data.shengripbh = "0";
                        }
                        if (data.data.shengripbr == ""){
                            data.data.shengripbr = "0";
                        }
                        if (data.data.zhuyuantwh == ""){
                            data.data.zhuyuantwh = "0";
                        }
                        if (data.data.zhuyuantwr == ""){
                            data.data.zhuyuantwr = "0";
                        }
                        if (data.data.tufasjh == ""){
                            data.data.tufasjh = "0";
                        }
                        if (data.data.tufasjr == ""){
                            data.data.tufasjr = "0";
                        }
                        if (data.data.fuwuhdkzc == ""){
                            data.data.fuwuhdkzc = "0";
                        }
                        if (data.data.fuwuhdkzr == ""){
                            data.data[i].fuwuhdkzr = "0";
                        }
                        $(list[0]).html(name);
                        $(list[1]).html(data.data.xuqiudch);
                        $(list[2]).html(data.data.xuqiudcr);
                        $(list[3]).html(data.data.baoxianlpl);
                        $(list[4]).html(data.data.baoxianlpje);
                        $(list[5]).html(data.data.xinlijkfwh);
                        $(list[6]).html(data.data.xinlijkfwr);
                        $(list[7]).html(data.data.xinlijkfwjd);
                        $(list[8]).html(data.data.xinlijkfwcp);
                        $(list[9]).html(data.data.richangzfh);
                        $(list[10]).html(data.data.richangzfr);
                        $(list[11]).html(data.data.jierikwh);
                        $(list[12]).html(data.data.jierikwr);
                        $(list[13]).html(data.data.shengripbh);
                        $(list[14]).html(data.data.shengripbr);
                        $(list[15]).html(data.data.zhuyuantwh);
                        $(list[16]).html(data.data.zhuyuantwr);
                        $(list[17]).html(data.data.tufasjh);
                        $(list[18]).html(data.data.tufasjr);
                        $(list[19]).html(data.data.fuwuhdkzc);
                        $(list[20]).html(data.data.fuwuhdkzr);

                    }
                },
                error: function () {
                    bootAlert("服务器请求失败")
                }
            })
        }
    });
    $("#sfd-table").delegate('td:last-child a', 'click', function () {
        $(".l-title").html('<img src="' + rootPath + '/resources/icon/fanhui.png">报表查看');
        $(".s-title").html('统计分析/组织建设报表/流动人口计生协示范点详情');
        $(".right-main").addClass("hidden");
        $(".right-main:nth-child(12)").removeClass("hidden");
        floatReport= $(this).attr("id")
        $.ajax({
            type: "GET",
            url: rootPath + "/api/getOneFloatingPopulationReport",
            dataType: "json",
            async: false,
            data: {
                id: $(this).attr("id"),
            },
            success: function (data) {
                if (data.status === 200) {
                    $("#sfdName").html("示范点名称： " + data.data.name);
                    $("#ldrksfdLevel" + data.data.level).prop("checked", true).change();
                    $("#ldrksfdType" + data.data.type).prop("checked", true).change();
                    $("input[name='xqcj']").attr('disabled',true);
                    $("input[name='xqlx']").attr('disabled',true);
                    $("#ldrksfdAddress").html(data.data.address);
                    $("#ldrksfdZhiGong").html(data.data.zhigongNumber);
                    $("#ldrksfdLiuDong").html(data.data.liudongrkNumber);
                    $("#ldrksfdJianLiDate").html(data.data.liudongrkjsxjlDate.substring(0,4) + "年" + parseInt(data.data.liudongrkjsxjlDate.substring(5,7)) + "月");
                    $("#ldrksfdHuiyuan").html(data.data.huiyuanNumber);
                    $("#ldrksfdMale").html(data.data.liudongMaleNumber);
                    $("#ldrksfdFemale").html(data.data.liudongFemaleNumber);
                    $("#ldrksfdUnmarried").html(data.data.liudongUnmarriedNumber);
                    $("#ldrksfdMarried").html(data.data.liudongMarriedNumber);
                }
            },
            error: function () {
                bootAlert("服务器请求失败")
            }
        })
    });
    $("#nxhd-table").delegate('td:last-child a', 'click', function () {
        $(".l-title").html('<img src="' + rootPath + '/resources/icon/fanhui.png">报表查看');
        $(".s-title").html('统计分析/项目工作分析/暖心活动详情');
        $(".right-main").addClass("hidden");
        $(".right-main:nth-child(14)").removeClass("hidden");
        heartReport=$(this).attr("id")
        $.ajax({
            type: "GET",
            url: rootPath + "/api/getOneWarmHeartReport",
            dataType: "json",
            async: false,
            data: {
                id: $(this).attr("id"),
            },
            success: function (data) {
                if (data.status === 200) {
                    var list=$(".oneHeart td");
                    if(data.data.scopeId!=0&&data.data.scopeId%10000==0){
                        var name = allScope[data.data.scopeId].name+"计生协";
                    }else{
                        var name = allScope[data.data.scopeId].name;
                    }
                    if (data.data.xuqiudch == ""){
                        data.data.xuqiudch = "0";
                    }
                    if (data.data.xuqiudcr == ""){
                        data.data.xuqiudcr = "0";
                    }
                    if (data.data.baoxianlpl == ""){
                        data.data.baoxianlpl = "0";
                    }
                    if (data.data.baoxianlpje == ""){
                        data.data.baoxianlpje = "0";
                    }
                    if (data.data.xinlijkfwh == ""){
                        data.data.xinlijkfwh = "0";
                    }
                    if (data.data.xinlijkfwr == ""){
                        data.data.xinlijkfwr = "0";
                    }
                    if (data.data.xinlijkfwjd == ""){
                        data.data.xinlijkfwjd = "0";
                    }
                    if (data.data.xinlijkfwcp == ""){
                        data.data.xinlijkfwcp = "0";
                    }
                    if (data.data.richangzfh == ""){
                        data.data.richangzfh = "0";
                    }
                    if (data.data.richangzfr == ""){
                        data.data.richangzfr = "0";
                    }
                    if (data.data.jierikwh == ""){
                        data.data.jierikwh = "0";
                    }
                    if (data.data.jierikwr == ""){
                        data.data.jierikwr = "0";
                    }
                    if (data.data.shengripbh == ""){
                        data.data.shengripbh = "0";
                    }
                    if (data.data.shengripbr == ""){
                        data.data.shengripbr = "0";
                    }
                    if (data.data.zhuyuantwh == ""){
                        data.data.zhuyuantwh = "0";
                    }
                    if (data.data.zhuyuantwr == ""){
                        data.data.zhuyuantwr = "0";
                    }
                    if (data.data.tufasjh == ""){
                        data.data.tufasjh = "0";
                    }
                    if (data.data.tufasjr == ""){
                        data.data.tufasjr = "0";
                    }
                    if (data.data.fuwuhdkzc == ""){
                        data.data.fuwuhdkzc = "0";
                    }
                    if (data.data.fuwuhdkzr == ""){
                        data.data[i].fuwuhdkzr = "0";
                    }
                    $(list[0]).html(name);
                    $(list[1]).html(data.data.xuqiudch);
                    $(list[2]).html(data.data.xuqiudcr);
                    $(list[3]).html(data.data.baoxianlpl);
                    $(list[4]).html(data.data.baoxianlpje);
                    $(list[5]).html(data.data.xinlijkfwh);
                    $(list[6]).html(data.data.xinlijkfwr);
                    $(list[7]).html(data.data.xinlijkfwjd);
                    $(list[8]).html(data.data.xinlijkfwcp);
                    $(list[9]).html(data.data.richangzfh);
                    $(list[10]).html(data.data.richangzfr);
                    $(list[11]).html(data.data.jierikwh);
                    $(list[12]).html(data.data.jierikwr);
                    $(list[13]).html(data.data.shengripbh);
                    $(list[14]).html(data.data.shengripbr);
                    $(list[15]).html(data.data.zhuyuantwh);
                    $(list[16]).html(data.data.zhuyuantwr);
                    $(list[17]).html(data.data.tufasjh);
                    $(list[18]).html(data.data.tufasjr);
                    $(list[19]).html(data.data.fuwuhdkzc);
                    $(list[20]).html(data.data.fuwuhdkzr);

                }
            },
            error: function () {
                bootAlert("服务器请求失败")
            }
        })
    });
    $(".right-main:nth-child(5) .top-ul li").click(function () {
        $(".right-main:nth-child(5) .top-ul li").removeClass("month-table-selected-li");
        $(this).addClass("month-table-selected-li");
        $(".ybbg>.row>div").addClass("hidden");
        if ($(this).index() == 0) {
            $(".ybbg>.row>div:nth-child(1)").removeClass("hidden");
            $(".right-main:nth-child(5)>div:nth-child(n+3)").addClass("hidden");
            $(".right-main:nth-child(5) .jl").removeClass("hidden");
            $(".right-main:nth-child(5) .top-ul").removeClass("hidden");
            $(".right-main:nth-child(5) .ckActivityQk").addClass("hidden");
            $("#ybsdxlTime").html("失独时间");
            $("#ybsdxlreason").html("失独原因");
            ybType = 1;
            reloadAjax(dataInfoTableMonthReportInfo);
        } else if ($(this).index() == 1) {
            $(".ybbg>.row>div:nth-child(1)").removeClass("hidden");
            $(".right-main:nth-child(5)>div:nth-child(n+3)").addClass("hidden");
            $(".right-main:nth-child(5) .jl").removeClass("hidden");
            $(".right-main:nth-child(5) .top-ul").removeClass("hidden");
            $(".right-main:nth-child(5) .ckActivityQk").addClass("hidden");
            $("#ybsdxlTime").html("心理干预时间");
            $("#ybsdxlreason").html("心理干预原因");
            ybType = 2;
            reloadAjax(dataInfoTableMonthReportInfo);
        } else if ($(this).index() == 2) {
            $(".ybbg>.row>div:nth-child(2)").removeClass("hidden");
            $(".right-main:nth-child(5)>div:nth-child(n+3)").addClass("hidden");
            $(".right-main:nth-child(5) .jl").removeClass("hidden");
            $(".right-main:nth-child(5) .top-ul").removeClass("hidden");
            $(".right-main:nth-child(5) .ckActivityQk").addClass("hidden");
            reloadAjax(dataInfoTableMonthReportInfo1);
        } else if ($(this).index() == 3) {
            $(".ybbg>.row>div:nth-child(3)").removeClass("hidden");
            $(".right-main:nth-child(5)>div:nth-child(n+3)").addClass("hidden");
            $(".right-main:nth-child(5) .jl").removeClass("hidden");
            $(".right-main:nth-child(5) .top-ul").removeClass("hidden");
            $(".right-main:nth-child(5) .ckActivityQk").addClass("hidden");
            reloadAjax(dataInfoTableMonthReportInfo2);
        } else {
            $(".right-main:nth-child(5)>div:nth-child(n+3)").addClass("hidden");
            $(".right-main:nth-child(5) .jl").addClass("hidden");
            $(".right-main:nth-child(5) .top-ul").removeClass("hidden");
            $(".right-main:nth-child(5) .ckActivityQk").removeClass("hidden");
            $(".ybzongjie").html("");
            $("#xiajifzr").html("");
            $(".ybjl-select").parent().parent().removeClass("hidden");
            $.ajax({
                type: "get",
                url: rootPath + "/api/getAllProjectMonthlyReport",
                dataType: "json",
                async: false,
                cache: false,
                data:{
                    month:$(".ybjl-select").val().split('-')[1],
                    year:$(".ybjl-select").val().split('-')[0],
                    scopeId:ybScoped,
                    type:5,
                },
                success: function (data1) {
                    if(data1.data!=""){
                        $(".ybzongjie").html(data1.data.description);
                        $("#xiajifzr").html('<img style="margin-right: 12px"\n' +
                            '                                src="'+rootPath+'/resources/icon/chengyuan2.png">'+data1.data.headMemberName);

                    }
                },
                error: function () {
                    bootAlert("服务器请求失败");
                }
            })
        }
    });
    // 月报上报
    $(".right-main:nth-child(5) .ybbjsbBtn div").click(function () {
        $(".ybbg>.row>div").addClass("hidden");

        $(".ybjl-select").val("")

        if ($(this).index() === 0) {
            $(".ybbg>.row>div:nth-child(1)").removeClass("hidden");
            $(".right-main:nth-child(5)>div:nth-child(n+3)").removeClass("hidden");
            $(".right-main:nth-child(5) .ActivityQK").addClass("hidden");
            $(".monthInfo0,.monthInfo1,.monthInfo2").addClass("hidden");
            $(".monthInfo0").removeClass("hidden");
            $(".monthInfo0 input").val("");
            $("#ybsdxlTime").html("失独时间");
            $("#ybsdxlreason").html("失独原因");
            $(".monthInfo0>label:nth-child(7) input").attr("placeholder","失独时间");
            $(".monthInfo0>label:nth-child(8) input").attr("placeholder","失独原因");
            ybScoped = user.scopeId;
            ybType = 1;
            reloadAjax(dataInfoTableMonthReportInfo);
        } else if ($(this).index() === 1) {
            $(".ybbg>.row>div:nth-child(1)").removeClass("hidden");
            $(".right-main:nth-child(5)>div:nth-child(n+3)").removeClass("hidden");
            $(".right-main:nth-child(5) .ActivityQK").addClass("hidden");
            $(".monthInfo0,.monthInfo1,.monthInfo2").addClass("hidden");
            $(".monthInfo0").removeClass("hidden");
            $(".monthInfo0 input").val("");
            $("#ybsdxlTime").html("心理干预时间");
            $("#ybsdxlreason").html("心理干预原因");
            $(".monthInfo0>label:nth-child(7) input").attr("placeholder","心理干预时间");
            $(".monthInfo0>label:nth-child(8) input").attr("placeholder","心理干预原因");
            ybScoped = user.scopeId;
            ybType = 2;
            reloadAjax(dataInfoTableMonthReportInfo);
        } else if ($(this).index() === 2) {
            $(".ybbg>.row>div:nth-child(2)").removeClass("hidden");
            $(".right-main:nth-child(5)>div:nth-child(n+3)").removeClass("hidden");
            $(".right-main:nth-child(5) .ActivityQK").addClass("hidden");
            $(".monthInfo0,.monthInfo1,.monthInfo2").addClass("hidden");
            $(".monthInfo1").removeClass("hidden");
            $(".monthInfo1 input").val("");
            ybScoped = user.scopeId;
            reloadAjax(dataInfoTableMonthReportInfo1);
        }else if ($(this).index() === 3) {
            $(".ybbg>.row>div:nth-child(3)").removeClass("hidden");
            $(".right-main:nth-child(5)>div:nth-child(n+3)").removeClass("hidden");
            $(".right-main:nth-child(5) .ActivityQK").addClass("hidden");
            $(".monthInfo0,.monthInfo1,.monthInfo2").addClass("hidden");
            $(".monthInfo2").removeClass("hidden");
            $(".monthInfo2 input").val("");
            ybScoped = user.scopeId;
            reloadAjax(dataInfoTableMonthReportInfo2);
        }  else {
            $(".right-main:nth-child(5)>div:nth-child(n+5)").addClass("hidden");
            $(".right-main:nth-child(5) .ActivityQK").removeClass("hidden");
            $(".monthInfo0,.monthInfo1,.monthInfo2").addClass("hidden");
            $(".FZRinput").val("");
            $("#ybZongjie").html("");
            //获取活动情况
            $.ajax({
                type: "get",
                url: rootPath + "/api/getAllProjectMonthlyReport",
                dataType: "json",
                async: false,
                data: {
                    month: new Date().getMonth() + 1,
                    year: new Date().getFullYear(),
                    scopeId: ybScoped,
                    type: 5,
                },
                success: function (data1) {
                    $(".FZRinput").val(data1.data.headMemberName);
                    $("#ybZongjie").html(data1.data.description);
                },
                error: function () {
                    bootAlert("服务器请求失败");
                }
            })
        }
        $(".ybjl-select").parent().parent().addClass("hidden");
        $(".top-ul").addClass("hidden");
        $(".ckActivityQk").addClass("hidden");
    });
    // 活动编辑
    $("#Activity-table").delegate('.Activity', 'mouseover', function () {
        $(this).children(".mask").removeClass("hidden");
        $(this).children(".edit").removeClass("hidden");
    });
    $("#Activity-table").delegate('.Activity', 'mouseout', function () {
        $(this).children(".mask").addClass("hidden");
        $(this).children(".edit").addClass("hidden");
    });
    // 图片上传
    $("#uploadImgs").click(function () {
        $("#uploadImg").click();
    });
    $("#uploadImg").change(function () {
        var allowType=["png","jpeg","jpg"]
        var name = $(this)[0].files[0].name;
        var fileType=name.split('.').pop();
        if(allowType.indexOf(fileType.toLowerCase())===-1){
            bootAlert("请上传以.png、.jpeg、.jpg结尾文件");
            $("#uploadImg").val('')
            return;
        }
        var formData = new FormData();
        formData.append('file_data', $(this)[0].files[0]);
        var input = $(this);
        $.ajax({
            type: "POST",
            url: rootPath + "/api/file/fileUpload?fileType=image",
            dataType: "json",
            data: formData,
            contentType: false,
            processData: false,
            beforeSend: function () {

            },
            success: function (data) {
                if (data.status == 200) {
                    $("#uploadImgs").before('<div class="summarizeImg">\n' +
                        '                        <div class="mask hidden"></div>\n' +
                        '                        <img src="' + imgPath + data.data.fileName + '">\n' +
                        '                        <div class="delete hidden"><img src="' + rootPath + '/resources/icon/shanchu.png">&nbsp;删除</div>\n' +
                        '                        <input class="hidden" value="' + data.data.fileName + '">\n' +
                        '                    </div>');
                }
                input.val("");
            },
            error: function () {
                input.val("");
            }
        })
    });

    $(".summarize").on('mouseover', '.summarizeImg', function () {
        $(this).children(".mask").removeClass("hidden");
        $(this).children(".delete").removeClass("hidden");
    });
    $(".summarize").on('mouseout', '.summarizeImg', function () {
        $(this).children(".mask").addClass("hidden");
        $(this).children(".delete").addClass("hidden");
    });
    $(".summarize").on('click', '.delete', function () {
        $(this).parent().remove();
    });

    $(".ndbjsbBtn div").click(function () {
        $(".right-main:nth-child(6) .yearReportInfo").addClass("hidden");
        $(".right-main:nth-child(6) .yearReportInfo").removeClass("hidden");
        var html = "";
        if (user.scopeId % 100 !== 0) {
            //社区级
            for (var key in year_report_shequ[$(this).index()]) {
                html += '<label><span><span>*</span>' + year_report_shequ[$(this).index()][key] + '：</span><input id="' + key + '" class="normal-input ndgzsbInput"></label>'
            }
        } else if (user.scopeId % 10000 !== 0) {
            // 街道级
            for (var key in year_report_jiedao[$(this).index()]) {
                html += '<label><span><span>*</span>' + year_report_jiedao[$(this).index()][key] + '：</span><input id="' + key + '" class="normal-input ndgzsbInput"></label>'
            }
        } else if (user.scopeId !== 0) {
            // 区级
            for (var key in year_report_qu[$(this).index()]) {
                html += '<label><span><span>*</span>' + year_report_qu[$(this).index()][key] + '：</span><input id="' + key + '" class="normal-input ndgzsbInput"></label>'
            }
        } else if (user.scopeId === 0) {
            // 市级
            for (var key in year_report_shi[$(this).index()]) {
                html += '<label><span><span>*</span>' + year_report_shi[$(this).index()][key] + '：</span><input id="' + key + '" class="normal-input ndgzsbInput"></label>'
            }
        }

        $(".right-main:nth-child(6) .yearReportInfo:nth-child(5)").html(html);
        $(".ndbjsbBtns").removeClass("hidden");

        if (user.scopeId % 100 !== 0) {
            //社区级
            for (var key in year_report_shequ[$(this).index()]) {
                $(".ndbbsb #" + key).val(tmpData[key])
                if (ndFiledStatus === 1) {
                    $(".ndbbsb #" + key).attr("readonly", "readonly")
                }
            }
        } else if (user.scopeId % 10000 !== 0) {
            // 街道级
            for (var key in year_report_jiedao[$(this).index()]) {
                $(".ndbbsb #" + key).val(tmpData[key])
                if (ndFiledStatus === 1) {
                    $(".ndbbsb #" + key).attr("readonly", "readonly")
                }
            }
        } else if (user.scopeId !== 0) {
            // 区级
            for (var key in year_report_qu[$(this).index()]) {
                $(".ndbbsb #" + key).val(tmpData[key])
                if (ndFiledStatus === 1) {
                    $(".ndbbsb #" + key).attr("readonly", "readonly")
                }
            }
        } else if (user.scopeId === 0) {
            // 市级
            for (var key in year_report_shi[$(this).index()]) {
                $(".ndbbsb #" + key).val(tmpData[key])
                if (ndFiledStatus === 1) {
                    $(".ndbbsb #" + key).attr("readonly", "readonly")
                }
            }
        }

        if ($(this).index() === 7) {
            $(".ndbjsbBtns .main-button").html("提交");
        } else {
            $(".ndbjsbBtns .main-button").html("下一步");
        }
    });

    $(".zzbjsbBtn div").click(function () {
        $(".right-main:nth-child(7) .yearReportInfo").addClass("hidden");
        $(".right-main:nth-child(7) .yearReportInfo").removeClass("hidden");
        var html = "";
        if (user.scopeId % 100 !== 0) {
            //社区级
            for (var key in organization_construction_report_shequ[$(this).index()]) {
                html += '<label><span><span>*</span>' + organization_construction_report_shequ[$(this).index()][key] + '：</span><input id="' + key + '" class="normal-input zzjssbInput"></label>'
            }
        } else if (user.scopeId % 10000 !== 0) {
            // 街道级
            for (var key in organization_construction_report_jiedao[$(this).index()]) {
                html += '<label><span><span>*</span>' + organization_construction_report_jiedao[$(this).index()][key] + '：</span><input id="' + key + '" class="normal-input zzjssbInput"></label>'
            }
        } else if (user.scopeId !== 0) {
            // 区级
            for (var key in organization_construction_report_qu[$(this).index()]) {
                html += '<label><span><span>*</span>' + organization_construction_report_qu[$(this).index()][key] + '：</span><input id="' + key + '" class="normal-input zzjssbInput"></label>'
            }
        } else if (user.scopeId === 0) {
            // 市级
            for (var key in organization_construction_report_shi[$(this).index()]) {
                html += '<label><span><span>*</span>' + organization_construction_report_shi[$(this).index()][key] + '：</span><input id="' + key + '" class="normal-input zzjssbInput"></label>'
            }
        }

        $(".right-main:nth-child(7) .yearReportInfo:nth-child(5)").html(html);
        $(".zzbjsbBtns").removeClass("hidden");

        if (user.scopeId % 100 !== 0) {
            //社区级
            for (var key in organization_construction_report_shequ[$(this).index()]) {
                $("#" + key).val(tmpData[key])
                if (zzjsFiledStatus === 1) {
                    $("#" + key).attr("readonly", "readonly")
                }
            }
        } else if (user.scopeId % 10000 !== 0) {
            // 街道级
            for (var key in organization_construction_report_jiedao[$(this).index()]) {
                $("#" + key).val(tmpData[key])
                if (zzjsFiledStatus === 1) {
                    $("#" + key).attr("readonly", "readonly")
                }
            }
        } else if (user.scopeId !== 0) {
            // 区级
            for (var key in organization_construction_report_qu[$(this).index()]) {
                $("#" + key).val(tmpData[key])
                if (zzjsFiledStatus === 1) {
                    $("#" + key).attr("readonly", "readonly")
                }
            }
        } else if (user.scopeId === 0) {
            // 市级
            for (var key in organization_construction_report_shi[$(this).index()]) {
                $("#" + key).val(tmpData[key])
                if (zzjsFiledStatus === 1) {
                    $("#" + key).attr("readonly", "readonly")
                }
            }
        }

        if (jgMap[user.organizationId].name.indexOf("计生协") !== -1) {
            $("#danweimc").val(jgMap[user.organizationId].name)
        } else {
            $("#danweimc").val(jgMap[user.organizationId].name + "计生协")
        }
        $("#danweimc").attr("readonly", "readonly")

        if ($(this).index() === 4) {
            $(".zzbjsbBtns .main-button").html("提交");
        } else {
            $(".zzbjsbBtns .main-button").html("下一步");
        }
    });

    //查询区域选择
    $("#area-select").on('change', function () {
        selectQueryScopeId = parseInt($(this).val());
        var html = "<option></option>\n";
        if (selectQueryScopeId !== 0) {
            html = "<option value='" + selectQueryScopeId + "'>&nbsp;</option>\n";
            for (var i = 0; i < scopeList.length; i++) {
                if (scopeList[i].scopeId !== selectQueryScopeId && scopeList[i].scopeId - (scopeList[i].scopeId % 10000) === selectQueryScopeId && scopeList[i].scopeId % 100 === 0) {
                    html += "<option value='" + scopeList[i].scopeId + "'>" + scopeList[i].name + "</option>\n";
                }
            }
        }
        $("#street-select").html(html);
        $("#street-select").select2("val", "");
        $("#street-select").val($(this).val()).trigger("change");
        if(selectQueryScopeId==0){
            $("#street-select").attr("disabled","disabled");
            $("#shequ-select").attr("disabled","disabled");
        }else{
            $("#street-select").removeAttr("disabled");
            $("#shequ-select").removeAttr("disabled");
        }
    });

    $("#street-select").on('change', function () {

        var html = "<option></option>\n";
        if($(this).val()!=null){
            selectQueryScopeId = parseInt($(this).val());
            if (selectQueryScopeId !== 0) {
                html = "<option value='" + selectQueryScopeId + "'>&nbsp;</option>\n";
                for (var i = 0; i < scopeList.length; i++) {
                    if (scopeList[i].scopeId !== selectQueryScopeId && scopeList[i].scopeId - (scopeList[i].scopeId % 100) === selectQueryScopeId) {
                        html += "<option value='" + scopeList[i].scopeId + "'>" + scopeList[i].name + "</option>\n";
                    }
                }
            }
        }
        $("#shequ-select").html(html);
        $("#shequ-select").select2("val", "");
        $("#shequ-select").val($(this).val()).trigger("change");
    })

    //年度工作报表上报保存
    $(".ndbjsbBtns .normal-button").click(function () {
        tmpData["reportPersonId"] = user.id;
        tmpData["scopeId"] = user.scopeId;
        delete tmpData["createdTime"];
        delete tmpData["updatedTime"];
        if (ndbbbjId != null && ndbbbjId != undefined) {
            tmpData["id"] = ndbbbjId;
            $.ajax({
                type: "POST",
                url: rootPath + "/api/updateYearReport",
                dataType: "json",
                data: tmpData,
                success: function (data) {
                    if (data.status === 200) {

                    } else if (data.status === 404 && data.msg == "本年度已归档") {
                        bootAlert("本年度报表已归档，不可修改")
                    }
                },
                error: function () {
                    bootAlert("服务器请求失败")
                }
            })
        } else {
            $.ajax({
                type: "POST",
                url: rootPath + "/api/insertYearReport",
                dataType: "json",
                data: tmpData,
                success: function (data) {
                    if (data.status === 200) {
                        ndbbbjId = data.data;

                    } else if (data.status === 404 && data.msg == "本年度已归档") {
                        bootAlert("本年度报表已归档，不可添加")
                    }
                },
                error: function () {
                    bootAlert("服务器请求失败")
                }
            })
        }
    })

    $(".ndbjsbBtns .main-button").click(function () {
        if ($(this).html() === "下一步") {
            $(".ndbjsbBtn div").eq($(".ndbjsbBtn .current-top-div").index() + 1).click();
        } else {
            //提交事件
            tmpData["reportPersonId"] = user.id;
            tmpData["scopeId"] = user.scopeId;
            delete tmpData["createdTime"];
            delete tmpData["updatedTime"];
            if (ndbbbjId != null && ndbbbjId != undefined) {
                tmpData["id"] = ndbbbjId;
                $.ajax({
                    type: "POST",
                    url: rootPath + "/api/updateYearReport",
                    dataType: "json",
                    data: tmpData,
                    success: function (data) {
                        if (data.status === 200) {
                            bootbox.alert({
                                message: "报表更新成功",
                                buttons: {
                                    ok: {
                                        label: '确认'
                                    }
                                },
                                callback: function () {
                                    $("#NDGZSB").click();
                                }
                            });
                        } else if (data.status === 404 && data.msg == "本年度已归档") {
                            bootAlert("本年度报表已归档，不可修改")
                        }
                    },
                    error: function () {
                        bootAlert("服务器请求失败")
                    }
                })
            } else {
                $.ajax({
                    type: "POST",
                    url: rootPath + "/api/insertYearReport",
                    dataType: "json",
                    data: tmpData,
                    success: function (data) {
                        if (data.status === 200) {
                            ndbbbjId = data.data;
                            bootbox.alert({
                                message: "报表添加成功",
                                buttons: {
                                    ok: {
                                        label: '确认'
                                    }
                                },
                                callback: function () {
                                    $("#NDGZSB").click();
                                }
                            });
                        } else if (data.status === 404 && data.msg == "本年度已归档") {
                            bootAlert("本年度报表已归档，不可添加")
                        }
                    },
                    error: function () {
                        bootAlert("服务器请求失败")
                    }
                })
            }

        }

    });

    //组织建设报表上报保存
    $(".zzbjsbBtns .normal-button").click(function () {
        tmpData["reportPersonId"] = user.id;
        tmpData["scopeId"] = user.scopeId;
        delete tmpData["createdTime"];
        delete tmpData["updatedTime"];
        if (zzjsbbbjId != null && zzjsbbbjId != undefined) {
            tmpData["id"] = zzjsbbbjId;
            $.ajax({
                type: "POST",
                url: rootPath + "/api/updateOrganizationConstructionReport",
                dataType: "json",
                data: tmpData,
                success: function (data) {
                    if (data.status === 200) {

                    } else if (data.status === 404 && data.msg == "本年度已归档") {
                        bootAlert("本年度报表已归档，不可修改")
                    }
                },
                error: function () {
                    bootAlert("服务器请求失败")
                }
            })
        } else {
            $.ajax({
                type: "POST",
                url: rootPath + "/api/insertOrganizationConstructionReport",
                dataType: "json",
                data: tmpData,
                success: function (data) {
                    if (data.status === 200) {
                        zzjsbbbjId = data.data;

                    } else if (data.status === 404 && data.msg == "本年度已归档") {
                        bootAlert("本年度报表已归档，不可添加")
                    }
                },
                error: function () {
                    bootAlert("服务器请求失败")
                }
            })
        }
    })

    $(".zzbjsbBtns .main-button").click(function () {
        if ($(this).html() === "下一步") {
            $(".zzbjsbBtn div").eq($(".zzbjsbBtn .current-top-div").index() + 1).click();
        } else {
            //提交事件
            tmpData["reportPersonId"] = user.id;
            tmpData["scopeId"] = user.scopeId;
            delete tmpData["createdTime"];
            delete tmpData["updatedTime"];
            if (zzjsbbbjId != null && zzjsbbbjId != undefined) {
                tmpData["id"] = zzjsbbbjId;
                $.ajax({
                    type: "POST",
                    url: rootPath + "/api/updateOrganizationConstructionReport",
                    dataType: "json",
                    data: tmpData,
                    success: function (data) {
                        if (data.status === 200) {
                            // tmpData = data.data[0];
                            bootbox.alert({
                                message: "报表更新成功",
                                buttons: {
                                    ok: {
                                        label: '确认'
                                    }
                                },
                                callback: function () {
                                    $("#ZZJSSB").click();
                                }
                            });
                        } else if (data.status === 404 && data.msg == "本年度已归档") {
                            bootAlert("本年度报表已归档，不可修改")
                        }
                    },
                    error: function () {
                        bootAlert("服务器请求失败")
                    }
                })
            } else {
                $.ajax({
                    type: "POST",
                    url: rootPath + "/api/insertOrganizationConstructionReport",
                    dataType: "json",
                    data: tmpData,
                    success: function (data) {
                        if (data.status === 200) {
                            zzjsbbbjId = data.data;
                            // tmpData = data.data[0];
                            bootbox.alert({
                                message: "报表添加成功",
                                buttons: {
                                    ok: {
                                        label: '确认'
                                    }
                                },
                                callback: function () {
                                    $("#ZZJSSB").click();
                                }
                            });
                        } else if (data.status === 404 && data.msg == "本年度已归档") {
                            bootAlert("本年度报表已归档，不可添加")
                        }
                    },
                    error: function () {
                        bootAlert("服务器请求失败")
                    }
                })
            }

        }

    });

    if (localStorage.getItem("readPage") !== null && localStorage.getItem("readPage").indexOf("tsld") !== -1) {
        $(".left>ul>li:nth-child(3)>a").click();
        $(".left>ul>li:nth-child(3)>a").children("img:nth-child(1)").css("transform", "rotate(90deg)");
        $("#TSLDSB").click();
        $(".statistics-buttons .main-button").html('<img src="' + rootPath + '/resources/icon/5-shangbao.png">活动上报');
        $(".statistics-buttons .main-button").removeAttr("disabled");
        $(".statistics-buttons .main-button").removeClass("isFiled");
        if (user.scopeId === 0){
            $(".statistics-buttons .main-button").addClass("hidden");
        }
        localStorage.removeItem("readPage");
    }
    document.addEventListener("error", function (e) {
        var elem = e.target;
        if (elem.tagName.toLowerCase() === 'img') {
            elem.src = imgBitmap;
        }
    }, true);
    $(".zzbjsb").on('blur', '.zzjssbInput', function () {
        console.log("1:" + $(this).attr("id") + "2:" + $(this).val())
        tmpData[$(this).attr("id")] = $(this).val()
    });
    $(".zzbjsb").on('input propertychange', '.zzjssbInput', function () {
        console.log("1:" + $(this).attr("id") + "2:" + $(this).val())
        tmpData[$(this).attr("id")] = $(this).val()
    });

    $(".ndbbsb").on('blur', '.ndgzsbInput', function () {
        console.log("1:" + $(this).attr("id") + "2:" + $(this).val())
        tmpData[$(this).attr("id")] = $(this).val()
    });
    $(".ndbbsb").on('input propertychange', '.ndgzsbInput', function () {
        console.log("1:" + $(this).attr("id") + "2:" + $(this).val())
        tmpData[$(this).attr("id")] = $(this).val()
    });

    $("#add-special-activity-project").parent().on("blur", '.select2-container', function () {
        if ($(this).prev().val() === "-1") {
            $(this).addClass("danger-select");
        } else {
            $(this).removeClass("danger-select");
        }
    });
    $("#add-special-activity-project").on("focus", function () {
        if ($(this).next().hasClass("select2-container--open")) {
            $(this).next().removeClass("danger-select");
        }
    });
    $("#add-special-activity-project").on("change", function () {
        if ($(this).val() === "-1") {
            $(this).next().addClass("danger-select");
        } else {
            $(this).next().removeClass("danger-select");
        }
    });

    //特色活动上报
    $("#special-activity-reporting").click(function () {
        var flag = true;
        if ($("#add-special-activity-name").val() === "") {
            $("#add-special-activity-name").addClass('danger-input');
            $(".add-special-activity-name").removeClass('notShow');
            flag = false;
        } else {
            $("#add-special-activity-name").removeClass('danger-input');
            $(".add-special-activity-name").addClass('notShow');
        }

        if ($("#add-special-activity-project").val() == null) {
            $("#add-special-activity-project").next().addClass('danger-select');
            $(".add-special-activity-project").removeClass('notShow');
            flag = false;
        } else {
            $("#add-special-activity-project").next().removeClass('danger-input');
            $(".add-special-activity-project").addClass('notShow');
        }
        selectedScope = [];
        $("#add-special-activity-area span").each(function () {
            if ($(this).attr("id")) {
                selectedScope.push($(this).attr("id").replace("select-area-", ""));
            }
        });
        if (selectedScope.length === 0) {
            $("#add-special-activity-area").addClass('danger-input');
            $(".add-special-activity-area").removeClass('notShow');
            flag = false;
        } else {
            $("#add-special-activity-area").removeClass('danger-input');
            $(".add-special-activity-area").addClass('notShow');
        }
        if (flag === true) {
            bootbox.confirm({
                title: "特色活动上报",
                message: "是否进行特色活动上报",
                callback: function (result) {
                    if (result) {
                        insertSpecialActivity();
                    } else {
                        return;
                    }
                }
            });
        }

    })

    //特色活动编辑
    $("#Activity-table").delegate('.special-activity-edit', 'click', function () {
        $.ajax({
            type: "GET",
            url: rootPath + "/api/getProjectList",
            dataType: "json",
            data: {
            },
            success: function (data) {
                if (data.status === 200) {
                    var html = "";
                    for (var i = 0; i < data.data.length; i++){
                        html += "<option value='" + data.data[i].name + "'>" + data.data[i].name + "</option>\n"
                    }
                    $("#add-special-activity-project").html(html);
                    $("#add-special-activity-project").select2("val","");
                    $("#add-special-activity-project").val($(this).val()).trigger("change");
                }
            },
            error: function () {
                bootAlert("服务器请求失败")
            }
        })
        $(".l-title").html('<img src="' + rootPath + '/resources/icon/fanhui.png">活动上报');
        $(".s-title").html('统计分析/项目工作分析/活动上报');
        $(".right-main").addClass("hidden");
        $(".right-main:nth-child(8)").removeClass("hidden");
        $(".right-main:nth-child(8)>div:nth-child(n+3)").addClass("hidden");
        $(".ActivitySb").removeClass("hidden");
        var id = $(this).attr("id").replace("special-activity-", "");
        $(".ActivitySb>input[name=id]").val(id);
        $(".ActivitySb .main-button").removeClass('hidden');
        $("#special-activity-reporting").addClass('hidden');
        $(".ActivitySb .danger-button").removeClass('hidden');
        $(".summarize>div").each(function () {
            if ($(this).attr("id") == undefined) {
                $(this).remove();
            }
        });
        $("#visibility-region").html("");
        $(".search-member input").prop("checked", false).change();
        toSpecialActivityEditPage(id);
    });
    $("#special-activity-edit").click(function () {
        var id = $(".ActivitySb>input[name=id]").val();
        var flag = true;
        if ($("#add-special-activity-name").val() === "") {
            $("#add-special-activity-name").addClass('danger-input');
            $(".add-special-activity-name").removeClass('notShow');
            flag = false;
        } else {
            $("#add-special-activity-name").removeClass('danger-input');
            $(".add-special-activity-name").addClass('notShow');
        }

        if ($("#add-special-activity-project").val() === "") {
            $("#add-special-activity-project").addClass('danger-input');
            $(".add-special-activity-project").removeClass('notShow');
            flag = false;
        } else {
            $("#add-special-activity-project").removeClass('danger-input');
            $(".add-special-activity-project").addClass('notShow');
        }
        selectedScope = [];
        $("#add-special-activity-area span").each(function () {
            if ($(this).attr("id")) {
                selectedScope.push($(this).attr("id").replace("select-area-", ""));
            }
        });
        if (selectedScope.length === 0) {
            $("#add-special-activity-area").addClass('danger-input');
            $(".add-special-activity-area").removeClass('notShow');
            flag = false;
        } else {
            $("#add-special-activity-area").removeClass('danger-input');
            $(".add-special-activity-area").addClass('notShow');
        }
        if (flag === true) {
            bootbox.confirm({
                title: "特色活动修改",
                message: "是否进行特色活动修改",
                callback: function (result) {
                    if (result) {
                        updateSpecialActivity(id);
                    } else {
                        return;
                    }
                }
            });
        }

    });
    //特色活动查看
    $("#Activity-table").delegate('.Activity img,.Activity .title', 'click', function () {
        $(".l-title").html('<img src="' + rootPath + '/resources/icon/fanhui.png">活动查看');
        $(".s-title").html('统计分析/项目工作分析/活动查看');
        $(".right-main").addClass("hidden");
        $(".right-main:nth-child(8)").removeClass("hidden");
        $(".right-main:nth-child(8)>div:nth-child(n+3)").addClass("hidden");
        $(".ActivityCk").removeClass("hidden");
        var id = $(this).parent().attr("id").replace("ck-", "");
        toReadSpecialActivity(id);
    });
    //特色活动删除
    $(".ActivitySb .danger-button").click(function () {
        var id = $(".ActivitySb>input[name=id]").val();
        bootbox.confirm({
            title: "特色活动删除",
            message: "请确认是否删除特色活动",
            callback: function (result) {
                if (result) {
                    deleteSpecialActivity(id);
                } else {
                    return;
                }
            }
        });

    });

    $("#add-special-activity-area").on('click', '>img', function () {
        $("#selectArea").css("display", "block");
        $("body").addClass("body-hidden");
    });

    $("#add-special-activity-area").on('click', '>a', function () {
        $("#selectArea").css("display", "block");

        $("body").addClass("body-hidden");
    });

    $("#add-special-activity-area").on('click', '.removeArea', function () {
        var id = $(this).parent().attr("id").replace("select-area-", "");
        $("#selectArea .search-member .dept-members input").each(function () {
            if ($(this).is(":checked")) {
                if ($(this).attr("id").replace("dept-", "") === id) {
                    $(this).prop("checked", false).change();
                }
            }
        });
        $("#visibility-region #" + $(this).parent().attr("id")).remove();
        $(this).parent().remove();
    })
    $("#visibility-region").on("click", ".removeArea", function () {
        var id = $(this).parent().attr("id").replace("select-area-", "");
        $("#selectArea .search-member .dept-members input").each(function () {
            if ($(this).is(":checked")) {
                if ($(this).attr("id").replace("dept-", "") === id) {
                    $(this).prop("checked", false).change();
                }
            }
        });
        $(this).parent().remove();
    });

    $("#selectArea .selectRecipients-title img,#selectArea .pop-buttons .normal-button,#selectArea .pop-buttons .main-button").click(function () {
        $("#selectArea").css("display", "none");
        $("body").removeClass("body-hidden");
    })
    //区域勾选处理
    $("#selectArea .search-member .dept-members").on("change", "input", function () {
        var id = $(this).attr("id").replace("dept-", "");
        if (parseInt(id) === 0) {//杭州市
            var flag = $(this).is(":checked");
            $("#selectArea .search-member .dept-members input").each(function () {
                if ($(this).is(":checked") != flag) {
                    $(this).prop("checked", flag).change();
                }

            })
        } else if (id % 100 !== 0) {//社区
            var flag = true;
            $(this).parent().parent().parent().children("a").each(function () {
                if (!$(this).children("label").children("input").is(":checked")) {
                    flag = false;
                }
            })
            if ($(this).parent().parent().parent().parent().prev().children("label").children("input").is(":checked") != flag) {
                $(this).parent().parent().parent().parent().prev().children("label").children("input").prop("checked", flag);
            }
        } else if (id % 10000 !== 0) {//街道
            var flag = $(this).is(":checked");
            $(this).parent().parent().next().children("li").children("a").each(function () {
                if ($(this).children("label").children("input").is(":checked") != flag) {
                    $(this).children("label").children("input").prop("checked", flag).change()
                }
            })
            flag = true;
            $(this).parent().parent().parent().children("a").each(function () {
                if (!$(this).children("label").children("input").is(":checked")) {
                    flag = false;
                }
            })
            if ($(this).parent().parent().parent().parent().prev().children("label").children("input").is(":checked") != flag) {
                $(this).parent().parent().parent().parent().prev().children("label").children("input").prop("checked", flag);
            }
        } else {//区
            var flag = $(this).is(":checked");
            $(this).parent().parent().next().children("li").children("a").each(function () {
                if ($(this).children("label").children("input").is(":checked") != flag) {
                    $(this).children("label").children("input").prop("checked", flag).change()
                }
            })
            var flag = true;
            $("#selectArea .search-member .dept-members input").each(function () {
                var id = $(this).attr("id").replace("dept-", "");
                if (parseInt(id) !== 0) {
                    if (!$(this).is(":checked")) {
                        flag = false;
                    }
                }
            })
            if ($("#dept-0").is(":checked") != flag) {
                $("#dept-0").prop("checked", flag);
            }
        }
        var selected = "";
        var scope = {};
        if ($("#dept-0").is(":checked")) {
            scope[0] = 1;
        } else {
            selectedScope = [];

            $("#selectArea .search-member .dept-members input").each(function () {
                if ($(this).is(":checked")) {
                    var id = $(this).attr("id").replace("dept-", "");
                    selectedScope.push(id);
                }
            })
            selectedScope.sort();
            for (var i = 0; i < selectedScope.length; ++i) {
                var id = selectedScope[i];
                if (scope[id] === 1) {//已经被选择

                } else if (id % 100 !== 0 && scope[id - id % 100] === 1) {//本身为社区 街道被选择

                } else if (id % 100 !== 0 && scope[id - id % 10000] === 1) {//本身为社区 区被选择

                } else if (id % 10000 !== 0 && scope[id - id % 10000] === 1) {//本身为街道  区被选择

                } else {
                    scope[id] = 1;
                }
            }
        }
        selectedScope = [];
        for (var id in scope) {
            selectedScope.push(id);
            var s = "<span id='select-area-" + id + "'>";
            s += allScope[id].name + '<span class="removeArea">×</span>' + "</span>\n";
            selected += s;
        }
        $("#visibility-region").html(selected);
    })
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

    //区域确认按钮点击事件
    $("#select-area .main-button").click(function () {
        var selected = ""
        selected += "<span>";
        var scope = {};
        if ($("#dept-0").is(":checked")) {
            scope[0] = 1;
        } else {
            selectedScope = [];

            $("#selectArea .search-member .dept-members input").each(function () {
                if ($(this).is(":checked")) {
                    var id = $(this).attr("id").replace("dept-", "");
                    selectedScope.push(id);
                }
            })
            for (var i = 0; i < selectedScope.length; ++i) {
                var id = selectedScope[i];
                if (scope[id] === 1) {//已经被选择

                } else if (id % 100 !== 0 && scope[id - id % 100] === 1) {//本身为社区 街道被选择

                } else if (id % 100 !== 0 && scope[id - id % 10000] === 1) {//本身为社区 区被选择

                } else if (id % 10000 !== 0 && scope[id - id % 10000] === 1) {//本身为街道  区被选择

                } else {
                    scope[id] = 1;
                }
            }
        }
        selectedScope = [];
        for (var id in scope) {
            selectedScope.push(id);
            var s = "<span id='select-area-" + id + "'>";
            s += allScope[id].name + '<span class="removeArea">×</span>' + "</span>\n";
            selected += s;
        }
        selected += "</span>"
        selected += '<img src=' + rootPath + '/resources/icon/3-tianjiahuodong.png>';
        $("#add-special-activity-area").html(selected);
        if (selectedScope.length === 0) {
            $("#add-special-activity-area").addClass("danger-input");
            $(".add-special-activity-area").removeClass("notShow");
        } else {
            $("#add-special-activity-area").removeClass("danger-input");
            $(".add-special-activity-area").addClass("notShow");
        }
    })

    $("#special-activity-query").click(function () {
        reloadAjax(dataInfoTableActivity);
    })

    //特色活动提示
    $("#add-special-activity-name,#add-special-activity-project").blur(function () {
        if ($(this).val() === "") {
            $(this).addClass("danger-input")
            $("." + $(this).attr("id")).removeClass("notShow");
        } else {
            $(this).removeClass("danger-input")
            $("." + $(this).attr("id")).addClass("notShow");
        }
    });
    $("#add-special-activity-name,#add-special-activity-project").bind('input propertychange', function () {
        if ($(this).val() === "") {
            $(this).addClass("danger-input")
            $("." + $(this).attr("id")).removeClass("notShow");
        } else {
            $(this).removeClass("danger-input")
            $("." + $(this).attr("id")).addClass("notShow");
        }
    });
    //图片下载
    $(".download-zongjie-img").click(function () {
        packageImages();
    });
    //月报上报
    $(".saveButton").click(function () {
        if ($(".current-top-div").index() == 0) {
            insertIndependence(dataInfoTableMonthReportInfo);
        } else if ($(".current-top-div").index() == 1) {
            insertMentality(dataInfoTableMonthReportInfo);
        } else if ($(".current-top-div").index() ==2) {
            insertMigration(dataInfoTableMonthReportInfo1);
        } else {
            insertChange(dataInfoTableMonthReportInfo2)
        }
    });
    $(".activityButton").click(function () {
        insertActivityQK();
    })
    $(".deleteButton").click(function () {
        if($(".current-top-div").index()==0){
            var ids="";
            $("#monthReportInfo-table_wrapper input").each(function () {
                if ($(this).is(":checked")){
                    ids+=$(this).attr("id")+';';
                }
            });
            if (ids != ""){
                if (ids.length != 0)
                    ids = ids.substring(0, ids.length - 1);
                deleteIndependence(ids,dataInfoTableMonthReportInfo);
            }
        }else if($(".current-top-div").index()==1){
            var ids="";
            $("#monthReportInfo-table_wrapper input").each(function () {
                if ($(this).is(":checked")){
                    ids+=$(this).attr("id")+';';
                }
            })
            if (ids != ""){
                if (ids.length != 0)
                    ids = ids.substring(0, ids.length - 1);
                deleteMentality(ids,dataInfoTableMonthReportInfo)
            }
        }else if($(".current-top-div").index()==2){
            var ids="";
            $("#monthReportInfo1-table_wrapper input").each(function () {
                if ($(this).is(":checked")){
                    ids+=$(this).attr("id")+';';
                }
            })
            if (ids != ""){
                if (ids.length != 0)
                    ids = ids.substring(0, ids.length - 1);
                deleteMigration(ids,dataInfoTableMonthReportInfo1);
            }
        }else{
            var ids="";
            $("#monthReportInfo2-table_wrapper input").each(function () {
                if ($(this).is(":checked")){
                    ids+=$(this).attr("id")+';';
                }
            })
            if (ids != "") {
                if (ids.length != 0)
                    ids = ids.substring(0, ids.length - 1);
                deleteChange(ids, dataInfoTableMonthReportInfo2);
            }

        }

    });
    //添加流动人口
    $(".right-main:nth-child(11) .main-button").click(function () {
        insertSelective();
    })
    //添加暖心活动
    $(".right-main:nth-child(13) .main-button").click(function () {
        if(isReportNxhd=="")
            insertHeart();
        else
            updateHeart();

    })
    //导出excel
    $(".right-main:nth-child(1) .excel-button").click(function () {
        var src=excelPath;
        var realName="";
        if($(".selected-li").attr("id")=="HYGLFX"){
            $.ajax({
                type: "GET",
                url: rootPath + "/api/exportHuiyuanReport",
                dataType: "json",
                async: false,
                data: {
                    aoData:"",
                    year:$(".huiyuan-date-select").val(),
                    volunteerStatus:volunteerStatus
                },
                success: function (data1) {
                    if (data1.status === 200) {
                        src+=data1.data.fileName;
                        realName=data1.data.realName;
                    } else {
                        bootAlert("导出失败");
                    }
                },
                error: function () {
                    bootAlert("服务器请求失败");
                }
            })
        }
        else if($(".selected-li").attr("id")=="ZYZTJFX"){
            $.ajax({
                type: "GET",
                url: rootPath + "/api/exportHuiyuanReport",
                dataType: "json",
                async: false,
                data: {
                    aoData:"",
                    year:$(".huiyuan-date-select").val(),
                    volunteerStatus:volunteerStatus
                },
                success: function (data1) {
                    if (data1.status === 200) {
                        src+=data1.data.fileName;
                        realName=data1.data.realName;
                    } else {
                        bootAlert("导出失败");
                    }
                },
                error: function () {
                    bootAlert("服务器请求失败");
                }
            })
        }
		else if($(".selected-li").attr("id")=="XMBBXQ"){
			$.ajax({
				type: "GET",
				url: rootPath + "/api/exportProjectWorkReport",
				dataType: "json",
				async: false,
				data: {
					aoData:"",
					year:$(".huiyuan-date-select").val(),
				},
				success: function (data1) {
					if (data1.status === 200) {
						src+=data1.data.fileName;
						realName=data1.data.realName;
					} else {
						bootAlert("导出失败");
					}
				},
				error: function () {
					bootAlert("服务器请求失败");
				}
			})
		}
		else if($(".selected-li").attr("id")=="YBXQ"){
			$.ajax({
				type: "GET",
				url: rootPath + "/api/exportProjectMonthlyReport",
				dataType: "json",
				async: false,
				data: {
					aoData:"",
					year:$(".huiyuan-date-select").val().split('-')[0],
					month:$(".huiyuan-date-select").val().split('-')[1],
					scopeId:0
				},
				success: function (data1) {
					if (data1.status === 200) {
						src+=data1.data.fileName;
						realName=data1.data.realName;
					} else {
						bootAlert("导出失败");
					}
				},
				error: function () {
					bootAlert("服务器请求失败");
				}
			})
		}
        else if($(".selected-li").attr("id")=="LDRKSFD"){
            $.ajax({
                type: "GET",
                url: rootPath + "/api/exportFloatingPopulationReportTotal",
                dataType: "json",
                async: false,
                data: {
                    aoData:"",
                    year:$(".huiyuan-date-select").val(),
                },
                success: function (data1) {
                    if (data1.status === 200) {
                        src+=data1.data.fileName;
                        realName=data1.data.realName;
                    } else {
                        bootAlert("导出失败");
                    }
                },
                error: function () {
                    bootAlert("服务器请求失败");
                }
            })
        }
		else if($(".selected-li").attr("id")=="NXHD"){
            $.ajax({
                type: "GET",
                url: rootPath + "/api/exportWarmHeartReport",
                dataType: "json",
                async: false,
                data: {
                    aoData:"",
                    year: $(".huiyuan-date-select").val().split('-')[0],
                    month: $(".huiyuan-date-select").val().split('-')[1],
                    scopeId:user.scopeId
                },
                success: function (data1) {
                    if (data1.status === 200) {
                        src+=data1.data.fileName;
                        realName=data1.data.realName;
                    } else {
                        bootAlert("导出失败");
                    }
                },
                error: function () {
                    bootAlert("服务器请求失败");
                }
            })
		}
		else if($(".selected-li").attr("id")=="NDBBXQ"){
		    if(user.scopeId==0){
                $.ajax({
                    type: "GET",
                    url: rootPath + "/api/exportYearReport",
                    dataType: "json",
                    async: false,
                    data: {
                        aoData:"",
                        year:$(".huiyuan-date-select").val(),
                    },
                    success: function (data1) {
                        if (data1.status === 200) {
                            src+=data1.data.fileName;
                            realName=data1.data.realName;
                        } else {
                            bootAlert("导出失败");
                        }
                    },
                    error: function () {
                        bootAlert("服务器请求失败");
                    }
                })
            }else{
                $.ajax({
                    type: "GET",
                    url: rootPath + "/api/exportYearReport",
                    dataType: "json",
                    async: false,
                    data: {
                        aoData:"",
                        year:$(".huiyuan-date-select").val(),
                        qu:1,
                        scopeId:user.scopeId
                    },
                    success: function (data1) {
                        if (data1.status === 200) {
                            src+=data1.data.fileName;
                            realName=data1.data.realName;
                        } else {
                            bootAlert("导出失败");
                        }
                    },
                    error: function () {
                        bootAlert("服务器请求失败");
                    }
                })
            }

		}
        else if($(".selected-li").attr("id")=="ZZBBXQ"){
            $.ajax({
                type: "GET",
                url: rootPath + "/api/exportOrganizationConstructionReport",
                dataType: "json",
                async: false,
                data: {
                    aoData:"",
                    year:$(".huiyuan-date-select").val(),
                },
                success: function (data1) {
                    if (data1.status === 200) {
                        src+=data1.data.fileName;
                        realName=data1.data.realName;
                    } else {
                        bootAlert("导出失败");
                    }
                },
                error: function () {
                    bootAlert("服务器请求失败");
                }
            })

        }
        var $a = $("<a></a>").attr("href", src).attr("download", realName);
		if(src.replace(excelPath,"")!=""){
			$a[0].click();
		}else{
			bootAlert("导出失败");
		}
    })
	$(".right-main:nth-child(5) .excel-button").click(function (){
		var src=excelPath;
		var realName="";
		if($(".right-main:nth-child(5) .l-title").text()=="月报上报"){
			$.ajax({
				type: "GET",
				url: rootPath + "/api/exportProjectMonthlyReportXQ",
				dataType: "json",
				async: false,
				data: {
					aoData:"",
					year:new Date().getFullYear(),
					month:new Date().getMonth()+1,
					scopeId:ybScoped,
					scopeName:allScope[ybScoped].name
				},
				success: function (data1) {
					if (data1.status === 200) {
						src+=data1.data.fileName;
						realName=data1.data.realName;
					} else {
						bootAlert("导出失败");
					}
				},
				error: function () {
					bootAlert("服务器请求失败");
				}
			})
		}else{
			$.ajax({
				type: "GET",
				url: rootPath + "/api/exportProjectMonthlyReportXQ",
				dataType: "json",
				async: false,
				data: {
					aoData:"",
					year:$(".ybjl-select").val().split('-')[0],
					month:$(".ybjl-select").val().split('-')[1],
					scopeId:ybScoped,
					scopeName:allScope[ybScoped].name
				},
				success: function (data1) {
					if (data1.status === 200) {
						src+=data1.data.fileName;
						realName=data1.data.realName;
					} else {
						bootAlert("导出失败");
					}
				},
				error: function () {
					bootAlert("服务器请求失败");
				}
			})
		}
		var $a = $("<a></a>").attr("href", src).attr("download", realName);
		if(src.replace(excelPath,"")!=""){
			$a[0].click();
		}else{
			bootAlert("导出失败");
		}
	});
    $(".right-main:nth-child(12) .excel-button").click(function (){
        var src=excelPath;
        var realName="";
        $.ajax({
            type: "GET",
            url: rootPath + "/api/exportFloatingPopulationReport",
            dataType: "json",
            async: false,
            data: {
                aoData:"",
                id:floatReport,
            },
            success: function (data1) {
                if (data1.status === 200) {
                    src+=data1.data.fileName;
                    realName=data1.data.realName;
                } else {
                    bootAlert("导出失败");
                }
            },
            error: function () {
                bootAlert("服务器请求失败");
            }
        })
        var $a = $("<a></a>").attr("href", src).attr("download", realName);
        if(src.replace(excelPath,"")!=""){
            $a[0].click();
        }else{
            bootAlert("导出失败");
        }
    });
    $(".right-main:nth-child(14) .excel-button").click(function (){
        var src=excelPath;
        var realName="";
        $.ajax({
            type: "GET",
            url: rootPath + "/api/exportOneWarmHeartReport",
            dataType: "json",
            async: false,
            data: {
                aoData:"",
                id:heartReport,
            },
            success: function (data1) {
                if (data1.status === 200) {
                    src+=data1.data.fileName;
                    realName=data1.data.realName;
                } else {
                    bootAlert("导出失败");
                }
            },
            error: function () {
                bootAlert("服务器请求失败");
            }
        })
        var $a = $("<a></a>").attr("href", src).attr("download", realName);
        if(src.replace(excelPath,"")!=""){
            $a[0].click();
        }else{
            bootAlert("导出失败");
        }
    });
    window.onresize = function () {
        clacTableWidth();
    }
});

function reloadAjax(ajaxTable) {
    ajaxTable.ajax.reload(false);
}

function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;

}

function bootAlert(message) {
    bootbox.alert({
        message: message,
        buttons: {
            ok: {
                label: '确认'
            }
        }
    });
}

function insertSpecialActivity() {
    selectedScope = [];
    $("#add-special-activity-area span").each(function () {
        if ($(this).attr("id")) {
            selectedScope.push($(this).attr("id").replace("select-area-", ""));
        }
    });
    var selected = "";
    for (var i = 0; i < selectedScope.length; ++i) {
        selected += selectedScope[i] + ";";
    }
    var attachment = "";
    $(".summarize>div").each(function () {
        if ($(this).children("input").val() !== undefined) {
            attachment += $(this).children("input").val() + ";";
        }
    })
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: rootPath + "/api/insertSpecialActivity",
        dataType: "json",
        async: false,
        data: JSON.stringify({
            name: $("#add-special-activity-name").val(),
            project: $("#add-special-activity-project").val(),
            area: selected,
            summarize: $("#ActivityZongjie").html(),
            attachment: attachment,
            headMember: user.id,
            version: 1,
            status: 1
        }),
        success: function (data1) {
            if (data1.status === 200) {
                bootAlert("添加成功");
                $("#TSLDSB").click();
            } else {
                bootAlert("添加失败");
            }
        },
        error: function () {
            bootAlert("服务器请求失败");
        }
    })
}

function toSpecialActivityEditPage(id) {
    if (id.indexOf("special-activity-") != -1){
        id = id.replace("special-activity-", "");
    }
    $.ajax({
        type: "GET",
        url: rootPath + "/api/getOneSpecialActivity",
        dataType: "json",
        data: {
            id: id
        },
        success: function (data) {
            if (data.status === 200) {
                $("#add-special-activity-name").val(data.data.name);
                $("#add-special-activity-project").val(data.data.project).trigger('change');
                var selected = "";
                selected += "<span>";
                selectedScope = data.data.area.split(";");
                for (var i = 0; i < selectedScope.length - 1; i++) {
                    var id = selectedScope[i];
                    var s = "<span id='select-area-" + id + "'>";
                    s += allScope[id].name + '<span class="removeArea">×</span>' + "</span>\n";
                    selected += s;
                    $("#visibility-region").append(s);
                    $("#dept-" + id).prop("checked", true);
                }
                selected += "</span>"
                selected += '<img src=' + rootPath + '/resources/icon/3-tianjiahuodong.png>';
                $("#add-special-activity-area").html(selected);

                $("#ActivityZongjie").html(data.data.summarize);
                var summaryImage = data.data.attachment.split(";");
                for (var i = 0; i < summaryImage.length; ++i) {
                    if (summaryImage[i] === "") continue;

                    var html = "<div class='summarizeImg'>\n" +
                        "                        <div class=\"mask hidden\"></div>\n" +
                        "                        <img src='" + imgPath + summaryImage[i] + "'>\n" +
                        "                        <div class=\"delete hidden\"><img src=\"" + rootPath + "/resources/icon/shanchu.png\">&nbsp;删除</div>\n" +
                        "                        <input class=\"hidden\" value='" + summaryImage[i] + "'>\n" +
                        "                    </div>";
                    $("#uploadImgs").before(html)
                }
            }
        },
        error: function () {
            alert("服务器请求失败")
        }
    })
}

function updateSpecialActivity(id) {
    selectedScope = [];
    $("#add-special-activity-area span").each(function () {
        if ($(this).attr("id")) {
            selectedScope.push($(this).attr("id").replace("select-area-", ""));
        }
    });
    var selected = "";
    for (var i = 0; i < selectedScope.length; ++i) {
        selected += selectedScope[i] + ";";
    }
    var attachment = "";
    $(".summarize>div").each(function () {
        if ($(this).children("input").val() !== undefined) {
            attachment += $(this).children("input").val() + ";";
        }
    })
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: rootPath + "/api/updateSpecialActivity",
        dataType: "json",
        async: false,
        data: JSON.stringify({
            id: id,
            name: $("#add-special-activity-name").val(),
            project: $("#add-special-activity-project").val(),
            area: selected,
            summarize: $("#ActivityZongjie").html(),
            attachment: attachment,
        }),
        success: function (data1) {
            if (data1.status === 200) {
                bootAlert("修改成功");
            } else {
                bootAlert("修改失败");
            }
        },
        error: function () {
            bootAlert("服务器请求失败");
        }
    })
}

function deleteSpecialActivity(id) {
    $.ajax({
        type: "POST",
        url: rootPath + "/api/deleteSpecialActivity",
        dataType: "json",
        data: {
            id: id
        },
        success: function (data1) {
            if (data1.status === 200) {
                bootAlert("删除成功");
                $("#TSLDSB").click();
            } else {
                bootAlert("删除失败");
            }
        },
        error: function () {
            bootAlert("服务器请求失败");
        }
    })
}

function toReadSpecialActivity(id) {
    $.ajax({
        type: "GET",
        url: rootPath + "/api/getOneSpecialActivity",
        dataType: "json",
        data: {
            id: id
        },
        success: function (data) {
            if (data.status === 200) {
                $(".ActivityCk .large-title").html(data.data.name);
                $(".ActivityCk .xmming").html(data.data.project);
                $(".ActivityCk .hdqu").html(data.data.name);
                selectedScope = data.data.area.split(";");
                var selected = "";
                for (var i = 0; i < selectedScope.length - 1; i++) {
                    var id = selectedScope[i];
                    selected += allScope[id].name + "、";
                }
                selected = selected.substring(0, selected.length - 1);
                $(".ActivityCk .hdqu").html(selected);
                var summaryImage = data.data.attachment.split(";");
                $(".zongjie-imgs").html("")
                for (var i = 0; i < summaryImage.length; ++i) {
                    if (summaryImage[i] === "") continue;
                    var html = "<div>";
                    html += '<img src="' + imgPath + summaryImage[i] + '">'
                    html += "</div>";
                    $(".zongjie-imgs").append(html);
                }
                $(".ActivityCk .zongjie").html(data.data.summarize);
            }
        },
        error: function () {
            alert("服务器请求失败")
        }
    })
}

function listScope() {
    //杭州市
    var html = "<ul>\n" +
        "                        <li>" +
        "<a class=\"dept-members\" >\n" +
        "                        <img src='" + rootPath + "/resources/icon/iconse.png'>\n" +
        "                        <img src='" + rootPath + "/resources/icon/wenjian.png'>\n" +
        "                        杭州市\n" +
        "                        <label>\n" +
        "                            <input id='dept-0' type=\"checkbox\">\n" +
        "                            <span></span>\n" +
        "                        </label>\n" +
        "                    </a>";
    html += '<ul>';
    for (var i = 0; i < scopeList.length; ++i) {
        if (scopeList[i] === "") continue;
        if (scopeList[i].scopeId === 0) continue;
        //区


        if (scopeList[i].scopeId % 10000 === 0) {
            html += '<li>';
            html += "<a class='dept-members'>\n" +
                "                                <img src='" + rootPath + "/resources/icon/iconse.png'>\n" +
                "                                <img src='" + rootPath + "/resources/icon/wenjian.png'>\n" +
                "                                " + scopeList[i].name + "\n" +
                "                                <label>\n" +
                "                                    <input  id='dept-" + scopeList[i].scopeId + "' type=\"checkbox\">\n" +
                "                                    <span></span>\n" +
                "                                </label>\n" +
                "                            </a>"
            //街道
            html += "<ul>\n";
            for (var j = 0; j < scopeList.length; ++j) {
                if (scopeList[j] === "") continue;
                if (scopeList[j].scopeId % 10000 === 0 || scopeList[j].scopeId % 100 !== 0) continue;
                if (parseInt(scopeList[j].scopeId / 10000) !== parseInt(scopeList[i].scopeId / 10000)) continue;
                html += '<li>';
                html += "<a class='dept-members'>\n" +
                    "                                        <img src='" + rootPath + "/resources/icon/iconse.png'>\n" +
                    "                                        <img src='" + rootPath + "/resources/icon/wenjian.png'>\n" +
                    "                                        " + scopeList[j].name + "\n" +
                    "                                        <label>\n" +
                    "                                            <input  id='dept-" + scopeList[j].scopeId + "' type=\"checkbox\">\n" +
                    "                                            <span></span>\n" +
                    "                                        </label>\n" +
                    "                                    </a>";
                //社区
                html += "<ul>";
                for (var k = 0; k < scopeList.length; ++k) {
                    if (scopeList[k] === "") continue;
                    if (scopeList[k].scopeId % 100 === 0) continue;
                    if (parseInt(scopeList[j].scopeId / 100) !== parseInt(scopeList[k].scopeId / 100)) continue;
                    html += '<li>';
                    html += "<a class=\"dept-members\" >\n" +
                        "                                                " + scopeList[k].name + "\n" +
                        "                                                <label>\n" +
                        "                                                    <input id='dept-" + scopeList[k].scopeId + "' type=\"checkbox\">\n" +
                        "                                                    <span></span>\n" +
                        "                                                </label>\n" +
                        "                                            </a>"
                    html += '</li>';
                }
                html += "</ul>";
                html += "</li>";
            }
            html += "</ul>\n";
            html += "</li>";
        }

    }
    html += '</ul>';
    html += "</li>";
    html += '</ul>';
    $("#selectArea .search-member").html(html);
}

function listAllScope() {
    $.ajax({
        type: "GET",
        url: rootPath + "/api/listScope",
        dataType: "json",
        cache: false,
        async: false,
        data: {},
        success: function (data) {
            if (data.status === 200) {
                for (var i in data.data) {
                    allScope[data.data[i].name] = data.data[i];
                    allScope[data.data[i].scopeId] = data.data[i];
                }
                for (var i = 0; i < data.data.length; ++i) {
                    scopeList.push(data.data[i]);
                }
                setQueryLocation();
                listScope();
            }
        },
        error: function () {
            bootAlert("服务器请求失败")
        }
    })
}

function setQueryLocation() {
    var html = "<option></option><option value='0'>全部</option>\n";
    for (var i = 0; i < scopeList.length; i++) {
        if (scopeList[i].scopeId % 10000 === 0 && scopeList[i].scopeId !== 0) {
            html += "<option value='" + scopeList[i].scopeId + "'>" + scopeList[i].name + "</option>\n";
        }
    }
    $("#area-select").html(html);
    $("#area-select").select("val", "");
    $("#area-select").val(0).trigger("change");
    $("#street-select").attr("disabled","disabled");
    $("#shequ-select").attr("disabled","disabled");
}

function listYear() {
    $.ajax({
        type: "GET",
        url: rootPath + "/api/getAllYear",
        dataType: "json",
        cache: false,
        async: false,
        data: {},
        success: function (data) {
            if (data.status === 200) {
                var AllYear = [];
                for (var i = 0; i < data.data.length; ++i) {
                    if (AllYear.indexOf(data.data[i].year) === -1) {
                        AllYear.push(data.data[i].year);
                    }
                }
                var html = "<option></option><option value='0'>全部</option>\n";
                for (var i = 0; i < AllYear.length; i++) {
                    html += "<option value='" + AllYear[i] + "'>" + AllYear[i] + "年</option>\n";
                }
                $(".ActivityYear-select").html(html);
                $(".ActivityYear-select").select("val", "");
                $(".ActivityYear-select").val(0).trigger("change");
            }
        },
        error: function () {
            bootAlert("服务器请求失败")
        }
    })
}

function clacTableWidth() {
    $("#zzReport tbody td").each(function () {
        $(this).children("div").children("div").each(function () {
            $(this).removeAttr("style")
        })
    });
    var wTable=[];
    for(var i=0;i<42;i++){
        wTable[i]=0;
    }
    $("#zzReport tbody td").each(function () {
        $(this).children("div").children("div").each(function () {
            wTable[$(this).index()] = parseFloat($(this).css("min-width").replace("px", ''))
            if (parseFloat($(this).css("width").replace("px", '')) > wTable[$(this).index()])
                wTable[$(this).index()] = parseFloat($(this).css("width").replace("px", ''))
        })
    });
    $("#zzReport tbody td").each(function () {
        $(this).children("div").children("div").each(function () {
            $(this).css("width", wTable[$(this).index()] + "px");
        })
    });
    $(".zzReport>div:nth-child(7),.zzReport>div:nth-child(8),.zzReport>div:nth-child(9),.jibie,.zzReport>div:nth-child(9)>div:nth-child(2)>div:nth-child(1),.zzReport>div:nth-child(10),.zzReport>div:nth-child(11),.zzReport>div:nth-child(12),.zzReport>div:nth-child(13),.zzReport>div:nth-child(14)").css("width", "auto")

    for (i = 1; i <= 6; i++) {
        $(".zzReport>div:nth-child(" + i + ")").css("width", wTable[i - 1] + "px");
    }
    for (i = 1; i <= 5; i++) {
        $(".zzReport>div:nth-child(7)>div:nth-child(2)>div:nth-child(" + i + ")").css("width", wTable[6 + i - 1] + "px");
    }
    for (i = 1; i <= 3; i++) {
        $(".zzReport>div:nth-child(8)>div:nth-child(3)>div:nth-child(" + i + ")").css("width", wTable[11 + i - 1] + "px");
    }
    for (i = 1; i <= 3; i++) {
        $(".zzReport>div:nth-child(9)>div:nth-child(2)>div:nth-child(1)>div:nth-child(2)>div:nth-child(1)>div:nth-child(" + i + ")").css("width", wTable[14 + i - 1] + "px");
    }
    $(".zzReport>div:nth-child(9)>div:nth-child(2)>div:nth-child(1)>div:nth-child(2)>div:nth-child(1)").css("width", (wTable[14] + wTable[15] + wTable[16]) + "px");
    for (i = 1; i <= 2; i++) {
        $(".jibie:nth-child(1)>div:nth-child(2)>div:nth-child(" + i + ")").css("width", wTable[17 + i - 1] + "px");
    }
    for (i = 1; i <= 2; i++) {
        $(".jibie:nth-child(2)>div:nth-child(2)>div:nth-child(" + i + ")").css("width", wTable[19 + i - 1] + "px");
    }
    for (i = 1; i <= 2; i++) {
        $(".jibie:nth-child(3)>div:nth-child(2)>div:nth-child(" + i + ")").css("width", wTable[21 + i - 1] + "px");
    }
    $(".zzReport>div:nth-child(9)>div:nth-child(2)>div:nth-child(1)>div:nth-child(2)>div:nth-child(2)>div:nth-child(2)>div:last-child").css("width", wTable[23] + "px");
    $(".zzReport>div:nth-child(9)>div:nth-child(2)>div:nth-child(2)").css("width", wTable[24] + "px");
    for (i = 1; i <= 2; i++) {
        $(".zzReport>div:nth-child(10)>div:nth-child(2)>div:nth-child(" + i + ")").css("width", wTable[25 + i - 1] + "px");
    }
    $(".zzReport>div:nth-child(10)>div:nth-child(2)").css("width", (wTable[25] + wTable[26]) + "px");
    for (i = 1; i <= 3; i++) {
        $(".zzReport>div:nth-child(11)>div:nth-child(2)>div:nth-child(" + i + ")").css("width", wTable[27 + i - 1] + "px");
    }
    $(".zzReport>div:nth-child(11)>div:nth-child(2)").css("width", (wTable[27] + wTable[28] + wTable[29]) + "px");
    for (i = 1; i <= 2; i++) {
        $(".zzReport>div:nth-child(12)>div:nth-child(2)>div:nth-child(" + i + ")").css("width", wTable[30 + i - 1] + "px");
    }
    for (i = 1; i <= 4; i++) {
        $(".zzReport>div:nth-child(13)>div:nth-child(2)>div:nth-child(" + i + ")").css("width", wTable[32 + i - 1] + "px");
    }
    for (i = 1; i <= 4; i++) {
        $(".zzReport>div:nth-child(13)>div:nth-child(2)>div:nth-child(" + i + ")").css("width", wTable[32 + i - 1] + "px");
    }
    $(".zzReport>div:nth-child(13)>div:nth-child(1)").css("width", (wTable[32] + wTable[33] + wTable[34] + wTable[35]) + "px");
    for (i = 1; i <= 3; i++) {
        $(".zzReport>div:nth-child(14)>div:nth-child(2)>div:nth-child(" + i + ")").css("width", wTable[36 + i - 1] + "px");
    }
    for (i = 1; i <= 3; i++) {
        $(".zzReport>div:nth-child(" + (i + 14) + ")").css("width", wTable[39 + i - 1] + "px");
    }
    var s = 0.0;
    wTable.forEach(function (val, idx, arr) {
        s += val;
    }, 0);
    $(".zzReport").css("width", (s + 1) + "px")
}

function packageImages() {

    var imgs = $(".zongjie-imgs>div>img");

    var imgsSrc = [];
    var imgsName = [];
    var imgBase64 = [];
    var imageSuffix = [];//图片后缀
    var zip = new JSZip();
    var img = zip.folder($(".ActivityCk .large-title").html());

    for (var i = 0; i < imgs.length; i++) {
        var src = imgs[i].getAttribute("src");
        var suffix = src.substring(src.lastIndexOf("."));
        var name = src.replace(imgPath, '').replace(suffix, '');
        imgsName.push(name)
        imageSuffix.push(suffix);

        getBase64(imgs[i].getAttribute("src"))
            .then(function (base64) {
                imgBase64.push(base64.substring(22));

            }, function (err) {
                console.log(err);
            });

    }

    function tt() {
        setTimeout(function () {
            if (imgs.length == imgBase64.length) {
                for (var i = 0; i < imgs.length; i++) {
                    img.file(imgsName[i] + imageSuffix[i], imgBase64[i], {base64: true});
                }
                zip.generateAsync({type: "blob"}).then(function (content) {
                    saveAs(content, $(".ActivityCk .large-title").html() + ".zip");
                });

            } else {
                tt();
            }
        }, 100);

    }

    tt();

}

function getBase64(img) {
    function getBase64Image(img, width, height) {
        var canvas = document.createElement("canvas");
        canvas.width = width ? width : img.width;
        canvas.height = height ? height : img.height;

        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        var dataURL = canvas.toDataURL();
        return dataURL;
    }

    var image = new Image();
    image.crossOrigin = 'Anonymous';
    image.src = img;
    var deferred = $.Deferred();
    if (img) {
        image.onload = function () {
            deferred.resolve(getBase64Image(image));
        }
        return deferred.promise();
    }
}

function insertIndependence(table) {
    var id=$(".monthInfo0").children().eq(0).children().val();
    var fatherName=$(".monthInfo0").children().eq(1).children().val();
    var fatherCardNo=$(".monthInfo0").children().eq(2).children().val();
    var motherName=$(".monthInfo0").children().eq(3).children().val();
    var motherCardNo=$(".monthInfo0").children().eq(4).children().val();
    var address=$(".monthInfo0").children().eq(5).children().val();
    var happenTime=$(".monthInfo0").children().eq(6).children().val();
    var reason=$(".monthInfo0").children().eq(7).children().val();
    var phone=$(".monthInfo0").children().eq(8).children().val();
    if(fatherName==""){
        bootAlert("请正确填写父亲姓名");
        return;
    }
    if(fatherCardNo!=""&&!isCardNo(fatherCardNo)){
        bootAlert("请正确填写父亲身份证");
        return;
    }
    if(motherName==""){
        bootAlert("请正确填写母亲姓名");
        return;
    }
    if(motherCardNo!=""&&!isCardNo(motherCardNo)){
        bootAlert("请正确填写母亲身份证");
        return;
    }
    if(address==""){
        bootAlert("请正确填写地址");
        return;
    }
    if(happenTime==""){
        bootAlert("请正确填写失独时间");
        return;
    }
    if(reason==""){
        bootAlert("请正确填写失独原因");
        return;
    }
    if(phone==""||(!isPhone(phone)&&!isMobile(phone))){
        bootAlert("请正确填写联系电话");
        return;
    }
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: rootPath + "/api/insertProjectMonthlyReport",
        dataType: "json",
        async: false,
        data: JSON.stringify({
            informationCoding: id,
            fatherName: fatherName,
            fatherIdCard: fatherCardNo,
            motherName: motherName,
            motherIdCard: motherCardNo,
            address: address,
            aloneTime: happenTime,
            reason: reason,
            mobile: phone,
            version: 1,
            status: 1,
            type: 1,
            scopeId: user.scopeId,
        }),
        success: function (data1) {
            if (data1.status === 200) {
                reloadAjax(table);
                $(".monthInfo0 input").val("");
            } else {
                bootAlert("添加失败");
            }
        },
        error: function () {
            bootAlert("服务器请求失败");
        }
    })
}

function insertMentality(table) {
    var id=$(".monthInfo0").children().eq(0).children().val();
    var fatherName=$(".monthInfo0").children().eq(1).children().val();
    var fatherCardNo=$(".monthInfo0").children().eq(2).children().val();
    var motherName=$(".monthInfo0").children().eq(3).children().val();
    var motherCardNo=$(".monthInfo0").children().eq(4).children().val();
    var address=$(".monthInfo0").children().eq(5).children().val();
    var happenTime=$(".monthInfo0").children().eq(6).children().val();
    var reason=$(".monthInfo0").children().eq(7).children().val();
    var phone=$(".monthInfo0").children().eq(8).children().val();
    if(fatherName==""){
        bootAlert("请正确填写父亲姓名");
        return;
    }
    if(fatherCardNo!=""&&!isCardNo(fatherCardNo)){
        bootAlert("请正确填写父亲身份证");
        return;
    }
    if(motherName==""){
        bootAlert("请正确填写母亲姓名");
        return;
    }
    if(motherCardNo!=""&&!isCardNo(motherCardNo)){
        bootAlert("请正确填写母亲身份证");
        return;
    }
    if(address==""){
        bootAlert("请正确填写地址");
        return;
    }
    if(happenTime==""){
        bootAlert("请正确填写失独时间");
        return;
    }
    if(reason==""){
        bootAlert("请正确填写失独原因");
        return;
    }
    if(phone==""||(!isPhone(phone)&&!isMobile(phone))){
        bootAlert("请正确填写联系电话");
        return;
    }
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: rootPath + "/api/insertProjectMonthlyReport",
        dataType: "json",
        async: false,
        data: JSON.stringify({
            informationCoding: id,
            fatherName: fatherName,
            fatherIdCard: fatherCardNo,
            motherName: motherName,
            motherIdCard: motherCardNo,
            address: address,
            aloneTime: happenTime,
            reason: reason,
            mobile: phone,
            version: 1,
            status: 1,
            type: 2,
            scopeId: user.scopeId,
        }),
        success: function (data1) {
            if (data1.status === 200) {
                reloadAjax(table);
                $(".monthInfo0 input").val("");
            } else {
                bootAlert("添加失败");
            }
        },
        error: function () {
            bootAlert("服务器请求失败");
        }
    })
}

function insertMigration(table) {
    var id=$(".monthInfo1").children().eq(0).children().val();
    var fatherName=$(".monthInfo1").children().eq(1).children().val();
    var fatherCardNo=$(".monthInfo1").children().eq(2).children().val();
    var motherName=$(".monthInfo1").children().eq(3).children().val();
    var motherCardNo=$(".monthInfo1").children().eq(4).children().val();
    var qianru=$(".monthInfo1").children().eq(5).children().val();
    var qianchu=$(".monthInfo1").children().eq(6).children().val();
    var reason=$(".monthInfo1").children().eq(7).children().val();
    var happenTime=$(".monthInfo1").children().eq(8).children().val();
    if(fatherName==""){
        bootAlert("请正确填写父亲姓名");
        return;
    }
    if(fatherCardNo!=""&&!isCardNo(fatherCardNo)){
        bootAlert("请正确填写父亲身份证");
        return;
    }
    if(motherName==""){
        bootAlert("请正确填写母亲姓名");
        return;
    }
    if(motherCardNo!=""&&!isCardNo(motherCardNo)){
        bootAlert("请正确填写母亲身份证");
        return;
    }
    if(qianru==""){
        bootAlert("请正确填写迁入地址");
        return;
    }
    if(qianchu==""){
        bootAlert("请正确填写迁出地址");
        return;
    }
    if(reason==""){
        bootAlert("请正确填写迁移原因");
        return;
    }
    if(happenTime==""){
        bootAlert("请正确填写迁移时间");
        return;
    }

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: rootPath + "/api/insertProjectMonthlyReport",
        dataType: "json",
        async: false,
        data: JSON.stringify({
            informationCoding: id,
            fatherName: fatherName,
            fatherIdCard: fatherCardNo,
            motherName: motherName,
            motherIdCard: motherCardNo,
            oldAddress: qianchu,
            newAddress: qianru,
            reason: reason,
            migrateTime: happenTime,
            version: 1,
            status: 1,
            type: 3,
            scopeId: user.scopeId,
        }),
        success: function (data1) {
            if (data1.status === 200) {
                reloadAjax(table);
                $(".monthInfo1 input").val("");
            } else {
                bootAlert("添加失败");
            }
        },
        error: function () {
            bootAlert("服务器请求失败");
        }
    })
}

function insertChange(table) {
    var id=$(".monthInfo2").children().eq(0).children().val();
    var fatherName=$(".monthInfo2").children().eq(1).children().val();
    var fatherCardNo=$(".monthInfo2").children().eq(2).children().val();
    var motherName=$(".monthInfo2").children().eq(3).children().val();
    var motherCardNo=$(".monthInfo2").children().eq(4).children().val();
    var reason=$(".monthInfo2").children().eq(5).children().val();
    var happenTime=$(".monthInfo2").children().eq(6).children().val();
    var address=$(".monthInfo2").children().eq(7).children().val();
    if(fatherName==""){
        bootAlert("请正确填写父亲姓名");
        return;
    }
    if(fatherCardNo!=""&&!isCardNo(fatherCardNo)){
        bootAlert("请正确填写父亲身份证");
        return;
    }
    if(motherName==""){
        bootAlert("请正确填写母亲姓名");
        return;
    }
    if(motherCardNo!=""&&!isCardNo(motherCardNo)){
        bootAlert("请正确填写母亲身份证");
        return;
    }
    if(reason==""){
        bootAlert("请正确填写删除或注销原因");
        return;
    }
    if(happenTime==""){
        bootAlert("请正确填写删除或注销时间");
        return;
    }
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: rootPath + "/api/insertProjectMonthlyReport",
        dataType: "json",
        async: false,
        data: JSON.stringify({
            informationCoding: id,
            fatherName: fatherName,
            fatherIdCard: fatherCardNo,
            motherName: motherName,
            motherIdCard: motherCardNo,
            reason: reason,
            deleteTime: happenTime,
            address: address,
            version: 1,
            status: 1,
            type: 4,
            scopeId: user.scopeId,
        }),
        success: function (data1) {
            if (data1.status === 200) {
                reloadAjax(table);
                $(".monthInfo2 input").val("");
            } else {
                bootAlert("添加失败");
            }
        },
        error: function () {
            bootAlert("服务器请求失败");
        }
    })
}

function insertActivityQK() {
    var fzr = $(".FZRinput").val();
    var content = $("#ybZongjie").html();
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: rootPath + "/api/insertProjectMonthlyReport",
        dataType: "json",
        async: false,
        data: JSON.stringify({
            headMemberName: fzr,
            description: content,
            version: 1,
            scopeId: user.scopeId,
            status: 1,
            type: 5,
            year: new Date().getFullYear(),
            month: new Date().getMonth() + 1
        }),
        success: function (data1) {
            if (data1.status === 200) {
                bootAlert("提交成功");
                $("#YBSB").click();
            } else {
                bootAlert("提交失败");
            }
        },
        error: function () {
            bootAlert("服务器请求失败");
        }
    })
}

function deleteIndependence(ids,table) {
    $.ajax({
        type: "POST",
        url: rootPath + "/api/deleteProjectMonthlyReport",
        dataType: "json",
        async: false,
        data:{
            type:1,
            ids:ids
        },
        success: function (data1) {
            if (data1.status === 200) {
                reloadAjax(table);
            } else {
                bootAlert("删除失败");
            }
        },
        error: function () {
            bootAlert("服务器请求失败");
        }
    })
}

function deleteMentality(ids,table) {
    $.ajax({
        type: "POST",
        url: rootPath + "/api/deleteProjectMonthlyReport",
        dataType: "json",
        async: false,
        data:{
            type:2,
            ids:ids
        },
        success: function (data1) {
            if (data1.status === 200) {
                reloadAjax(table);
            } else {
                bootAlert("删除失败");
            }
        },
        error: function () {
            bootAlert("服务器请求失败");
        }
    })
}

function deleteMigration(ids,table) {
    $.ajax({
        type: "POST",
        url: rootPath + "/api/deleteProjectMonthlyReport",
        dataType: "json",
        async: false,
        data: {
            type:3,
            ids:ids
        },
        success: function (data1) {
            if (data1.status === 200) {
                reloadAjax(table);
            } else {
                bootAlert("删除失败");
            }
        },
        error: function () {
            bootAlert("服务器请求失败");
        }
    })
}

function deleteChange(ids,table) {
    $.ajax({
        type: "POST",
        url: rootPath + "/api/deleteProjectMonthlyReport",
        dataType: "json",
        async: false,
        data: {
            type:4,
            ids:ids
        },
        success: function (data1) {
            if (data1.status === 200) {
                reloadAjax(table);
            } else {
                bootAlert("删除失败");
            }
        },
        error: function () {
            bootAlert("服务器请求失败");
        }
    })
}

function insertSelective() {
    var name=$(".sfdInsert>label:nth-child(1) input").val();
    var level=$(".sfdInsert>label:nth-child(2) input:checked").val();
    var type=$(".sfdInsert>label:nth-child(3) input:checked").val();
    var address=$(".sfdInsert>label:nth-child(4) input").val();
    var zhigongNumber=$(".sfdInsert>label:nth-child(5) input").val();
    var liudongrkNumber=$(".sfdInsert>label:nth-child(6) input").val();
    var liudongrkjsxjlDate=$(".sfdInsert>label:nth-child(7) input").val();
    var huiyuanNumber=$(".sfdInsert>label:nth-child(8) input").val();
    var liudongMaleNumber=$(".sfdInsert>label:nth-child(9) input").val();
    var liudongFemaleNumber=$(".sfdInsert>label:nth-child(10) input").val();
    var liudongUnmarriedNumber=$(".sfdInsert>label:nth-child(11) input").val();
    var liudongMarriedNumber=$(".sfdInsert>label:nth-child(12) input").val();
    if(name==""||level==undefined||type==undefined||address==""||zhigongNumber==""||liudongrkNumber==""||
        liudongrkjsxjlDate==""||huiyuanNumber==""||liudongMaleNumber==""||liudongFemaleNumber==""||
        liudongUnmarriedNumber==""||liudongMarriedNumber==""||
        isNaN(zhigongNumber)||isNaN(liudongrkNumber)||isNaN(huiyuanNumber)||isNaN(liudongMaleNumber)||
        isNaN(liudongFemaleNumber)||isNaN(liudongUnmarriedNumber)||isNaN(liudongMarriedNumber)||liudongrkjsxjlDate.indexOf("-")==-1){
        bootAlert("有信息未填写或信息填写有误");
        return;
    }

    var date = new Date();
    date.setFullYear(parseInt(liudongrkjsxjlDate.substring(0,4)),parseInt(liudongrkjsxjlDate.substring(5,7)) - 1,1);
    liudongrkjsxjlDate = date;
    $.ajax({
        type: "POST",
        url: rootPath + "/api/insertFloatingPopulationReport",
        dataType: "json",
        async: false,
        data: {
            scopeId:user.scopeId,
            reportPersonId: user.id,
            name:name,
            level:level,
            type:type,
            address:address,
            zhigongNumber:zhigongNumber,
            liudongrkNumber:liudongrkNumber,
            liudongrkjsxjlDate:liudongrkjsxjlDate,
            huiyuanNumber:huiyuanNumber,
            liudongMaleNumber:liudongMaleNumber,
            liudongFemaleNumber:liudongFemaleNumber,
            liudongUnmarriedNumber:liudongUnmarriedNumber,
            liudongMarriedNumber:liudongMarriedNumber
        },
        success: function (data1) {
            if (data1.status === 200) {
                $("#LDRKSFD").click();
                bootAlert("上报成功");
            } else {
                bootAlert("上报失败");
            }
        },
        error: function () {
            bootAlert("服务器请求失败");
        }
    })
}

function insertHeart() {
    var list=$(".nxInsert>label input")

    for(var i=1;i<21;i++){
        if(isNaN($(list[i]).val())||$(list[i]).val()=="") {
            bootAlert("有信息未填写或信息填写有误");
            return;
        }
    }
    $.ajax({
        type: "POST",
        url: rootPath + "/api/insertWarmHeartReport",
        dataType: "json",
        async: false,
        data: {
            scopeId:user.scopeId,
            reportPersonId: user.id,
            xuqiudch:$(list[1]).val(),
            xuqiudcr:$(list[2]).val(),
            baoxianlpl:$(list[3]).val(),
            baoxianlpje:$(list[4]).val(),
            xinlijkfwh:$(list[5]).val(),
            xinlijkfwr:$(list[6]).val(),
            xinlijkfwjd:$(list[7]).val(),
            xinlijkfwcp:$(list[8]).val(),
            richangzfh:$(list[9]).val(),
            richangzfr:$(list[10]).val(),
            jierikwh:$(list[11]).val(),
            jierikwr:$(list[12]).val(),
            shengripbh:$(list[13]).val(),
            shengripbr:$(list[14]).val(),
            zhuyuantwh:$(list[15]).val(),
            zhuyuantwr:$(list[16]).val(),
            tufasjh:$(list[17]).val(),
            tufasjr:$(list[18]).val(),
            fuwuhdkzc:$(list[19]).val(),
            fuwuhdkzr:$(list[20]).val(),
            version:1
        },
        success: function (data1) {
            if (data1.status === 200) {
                $("#NXHD").click();
                bootAlert("上报成功");
            } else {
                bootAlert("上报失败");
            }
        },
        error: function () {
            bootAlert("服务器请求失败");
        }
    })
}
function updateHeart(){
    var list=$(".nxInsert>label input")

    for(var i=1;i<21;i++){
        if(isNaN($(list[i]).val())||$(list[i]).val()=="") {
            bootAlert("有信息未填写或信息填写有误");
            return;
        }
    }
    $.ajax({
        type: "POST",
        url: rootPath + "/api/updateWarmHeartReport",
        dataType: "json",
        async: false,
        data: {
            id:isReportNxhd,
            scopeId:user.scopeId,
            reportPersonId: user.id,
            xuqiudch:$(list[1]).val(),
            xuqiudcr:$(list[2]).val(),
            baoxianlpl:$(list[3]).val(),
            baoxianlpje:$(list[4]).val(),
            xinlijkfwh:$(list[5]).val(),
            xinlijkfwr:$(list[6]).val(),
            xinlijkfwjd:$(list[7]).val(),
            xinlijkfwcp:$(list[8]).val(),
            richangzfh:$(list[9]).val(),
            richangzfr:$(list[10]).val(),
            jierikwh:$(list[11]).val(),
            jierikwr:$(list[12]).val(),
            shengripbh:$(list[13]).val(),
            shengripbr:$(list[14]).val(),
            zhuyuantwh:$(list[15]).val(),
            zhuyuantwr:$(list[16]).val(),
            tufasjh:$(list[17]).val(),
            tufasjr:$(list[18]).val(),
            fuwuhdkzc:$(list[19]).val(),
            fuwuhdkzr:$(list[20]).val(),
            version:1
        },
        success: function (data1) {
            if (data1.status === 200) {
                $("#NXHD").click();
                bootAlert("修改成功");
            } else {
                bootAlert("修改失败");
            }
        },
        error: function () {
            bootAlert("服务器请求失败");
        }
    })
}