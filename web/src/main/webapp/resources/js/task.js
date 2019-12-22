/**
 * @author kzn
 */

/**
 *    Overall version 1.6
 *    This version 1.6
 */

var volunteerType = 0;
var projectId = 1;
var allScope = {};
var scopeList = [];
var selectedScope = [];
var organizationList = [];
var memberList = [];
var projects = ["宣传教育", "业务培训", "健康服务", "计生家庭帮扶", "帮扶救助", "心理援助", "青春健康", "青少年", "家长", "师资的培训", "高校同伴教育", "流动人口服务", "权益维护", "其他"];
var allProjectMap = {};
var organizationParent = -1;
var volunteerApplyStatus;
var selectQueryScopeId = null;

jQuery(function ($) {



    $("#all-reduction").addClass('hidden');
    if (user.type === 0) {
        $("#addActivity").addClass('hidden');
    } else {
        $("#addActivity").removeClass('hidden');
    }

    getAllProject();
    listOrganization();
    listMember();
    listAllScope();

    $(".task-title .introduce").html(allProjectMap["宣传教育"])

    //顶部导航切换
    $(".myHeader ul li").eq(3).addClass("current-li");
    $(".myHeader ul li").eq(3).children("div").addClass("current-div");
    //左侧点击事件
    $(".left").on('click', 'li a', function () {
        projectId = $("li a").index(this) + 1;
        if ($(this).html() !== "已归档") {
            $(".task-title .introduce").html(allProjectMap[$(this).html()])
            if ($(this).html() === "帮扶救助" || $(this).html() === "心理援助") {
                $(".task-title .s-title").html("工作管理/计生家庭帮扶/" + $(this).html())
            } else if ($(this).html() === "青少年" || $(this).html() === "家长" || $(this).html() === "师资的培训" || $(this).html() === "高校同伴教育") {
                $(".task-title .s-title").html("工作管理/青春教育/" + $(this).html())
            } else if ($(this).html().indexOf("计生家庭帮扶") !== -1) {
                $(".task-title .s-title").html("工作管理/计生家庭帮扶")
                $(".task-title .introduce").html(allProjectMap["计生家庭帮扶"])
            } else if ($(this).html().indexOf("青春健康") !== -1) {
                $(".task-title .s-title").html("工作管理/青春教育")
                $(".task-title .introduce").html(allProjectMap["青春教育"])
            } else {
                $(".task-title .s-title").html("工作管理/" + $(this).html())
            }
        } else {
            $(".task-title .s-title").html("工作管理/已归档")
            $(".task-title .introduce").html("通过对归档项目的整理，可根据需要进行选择性的查看、还原与删除")
        }
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
        if ($(this).attr("id") == "gongwenliebiao")
            return;
        if (projectId !== 4 && projectId !== 7) {
            $("#activity-query-title").val("");
            $("#guidang-select-title").val("");
            $("#query-scopeId").val(-1).trigger('change');
            $("#query-scopeId option[value='-1']").attr("selected", true);
            $("#guidang-query-scopeId").val(-1).trigger('change');
            $("#guidang-query-scopeId option[value='-1']").attr("selected", true);
            $("#area-select,#area-select-gd").select("val", "");
            $("#area-select,#area-select-gd").val(0).trigger("change");
            reloadAjax(dataInfoTableItem)
        }
        if (projectId === 15) {
            $(".task-title:nth-child(5),.right-main:nth-child(6)").removeClass("hidden");
            $(".task-title:nth-child(5),.right-main:nth-child(6) .task-table").removeClass("hidden");
        } else {
            $(".task-title:nth-child(1),.right-main:nth-child(2)").removeClass("hidden");
            $(".task-title:nth-child(5),.right-main:nth-child(2) .task-table").removeClass("hidden");
            $(".task-title:nth-child(5)").addClass("hidden");
        }
    });
    $(".left").on('click', 'li a', function () {
        if ($(this).children("img").length !== 0)
            return;
        $(".right>div").addClass("hidden");
        $(".task-title:nth-child(1),.right-main:nth-child(2)").removeClass("hidden");
    });
    $(".left").on('click', '#guidang', function () {
        $(".right>div").addClass("hidden");
        $(".task-title:nth-child(5),.right-main:nth-child(6)").removeClass("hidden");
        reloadAjax(dataInfoTableGuidang);
    });
    $(".left").on('click', '#gongwenliebiao', function () {
        $(".right>div").addClass("hidden");
        $(".right-main:nth-child(8)").removeClass("hidden");
        $(".right-main:nth-child(8)>div").removeClass("hidden");
        // reloadAjax(dataInfoTableGongWen);
    });
    $(".left li a").mouseover(function () {
        $(this).children("img").attr("src", rootPath + "/resources/icon/shubiaojingguo.png");
    });
    $(".left li a").mouseout(function () {
        $(this).children("img").attr("src", rootPath + "/resources/icon/fanhui1.png");
    });
    //选择框初始化
    $(".unit-select").select2({
        placeholder: "--地区名称--",
        minimumResultsForSearch: -1
    });
    $(".unit-selectjiedao").select2({
        placeholder: "--街道名称--",
        minimumResultsForSearch: -1
    });
    $(".unit-selectshequ").select2({
        placeholder: "--社区名称--",
        minimumResultsForSearch: -1
    });
    $(".guidang-select").select2({
        minimumResultsForSearch: -1
    });
    $(".addFZR").select2({
        minimumResultsForSearch: -1
    });
    $(".editFZR").select2({
        minimumResultsForSearch: -1
    });

    //查询区域选择
    $("#area-select,#area-select-gd").on('change', function () {
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
        $("#street-select,#street-select-gd").html(html);
        $("#street-select,#street-select-gd").select2("val", "");
        $("#street-select,#street-select-gd").val($(this).val()).trigger("change");
        if (selectQueryScopeId == 0) {
            $("#street-select,#street-select-gd").attr("disabled", "disabled");
            $("#shequ-select,#shequ-select-gd").attr("disabled", "disabled");
        } else {
            $("#street-select,#street-select-gd").removeAttr("disabled");
            $("#shequ-select,#shequ-select-gd").removeAttr("disabled");
        }
    });

    $("#street-select,#street-select-gd").on('change', function () {

        var html = "<option></option>\n";
        if ($(this).val() != null) {
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
        $("#shequ-select,#shequ-select-gd").html(html);
        $("#shequ-select,#shequ-select-gd").select2("val", "");
        $("#shequ-select,#shequ-select-gd").val($(this).val()).trigger("change");
    })



    var datTableInitItem = {
        "bServerSide": true,
        "processing": true,
        "sScrollX": "100%",
        //表格的宽度
        "sScrollY": "460px",
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
                "sNext": '<img src="' + rootPath + '/resources/icon/fanye.png" alt="">',
                "sPrevious": '<img src="' + rootPath + '/resources/icon/fanye.png" alt="">'
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
                    if (resp.status !== 200) {
                        bootAlert(resp.msg);
                    } else {
                        fnCallback(resp);
                    }
                }
            });
        }
    };
    // 设置请求url
    datTableInitItem["sAjaxSource"] = rootPath + '/api/getAllActivities';
    // 设置字段数据源
    datTableInitItem["aoColumns"] = [
        {
            "data": "id"
        },
        {
            "data": "title"
        },
        {
            "data": "oneOrganizationName"
        },
        {
            "data": "activityArea"
        },
        {
            "data": "startTime"
        },
        {
            "data": "id"
        }
    ];
    // 渲染字段数据源
    datTableInitItem["aoColumnDefs"] = [
        {
            "aTargets": [0], "mRender": function (data, type, row, meta) {
                return meta.row + 1 + meta.settings._iDisplayStart;
            }
        },
        {
            "aTargets": [1], "mRender": function (data, type, row, meta) {
                if (row.checkStatus === 1 || row.checkStatus === 3) {
                    return "<div class='item-name'><div>" + row.title + "</div><div style='color: #1890ff;'>(已通过)</div></div>";
                } else if (row.checkStatus === 2) {
                    return "<div class='item-name'><div>" + row.title + "</div><div style='color: #fb2020;'>(未通过)</div></div>";
                } else if (row.checkStatus === 0) {
                    return "<div class='item-name'><div>" + row.title + "</div><div style='color: #fb2020;'>(审批中)</div></div>";
                }
            }
        },
        {
            "aTargets": [2], "mRender": function (data, type, row, meta) {
                return "<div class='item-area'>" + row.oneOrganizationName + "..." + "</div>";
            }
        },
        {
            "aTargets": [3], "mRender": function (data, type, row, meta) {
                return "<div class='item-location'>" + row.activityArea + "</div>";
            }
        },
        {
            "aTargets": [4], "mRender": function (data, type, row, meta) {
                return row.startTime;
            }
        },
        {
            "aTargets": [5], "mRender": function (data, type, row, meta) {
                var html = "";
                if (user.id === row.initiatorId) {
                    html += '<div class="table-operate"><a id="activity-edit-' + row.id + '" class="activity-operation-1">管理</a>';
                    html += '<div></div><a style="color: #1890ff;" class="activity-operation-3">归档</a>';
                    html += '<div></div><a name="' + row.title + '" id="activity-ewm-' + row.id + '" style="color: #1890ff;" class="activity-operation-4">二维码</a></div></div>';
                } else {
                    html += '<div class="table-operate2"><a id="activity-edit-' + row.id + '" class="activity-operation-2">查看</a>';
                    html += '<div></div><a name="' + row.title + '" id="activity-ewm-' + row.id + '" style="color: #1890ff;" class="activity-operation-4">二维码</a></div></div>';
                }
                return html;
            }
        },
    ];

    datTableInitItem["fnServerData"] = function (sSource, aoData, fnCallback) {
        var scopeId = $("#shequ-select").val();
        if (scopeId === "") {
            scopeId = null;
        }
        $.ajax({
            "type": 'get',
            "url": sSource,
            "dataType": "json",
            "data": {//查询条件写这里
                //dataTable固定参数
                aoData: JSON.stringify(aoData),
                // 选填参数
                // search: searchText
                projectId: projectId,
                title: $("#activity-query-title").val(),
                scopeId: scopeId,
                isFiled: 0,
                userId: user.id
            },
            "success": function (resp) {
                if (resp.status !== 200) {
                    bootAlert(resp.msg);
                } else {
                    fnCallback(resp);
                }
            }
        });
    }
    // table初始化
    var dataInfoTableItem = $("#item-table").dataTable(datTableInitItem).api();
    //表格
    var datTableInitVolunteer = {
        "bServerSide": true,
        "processing": true,
        "sScrollX": "100%",
        //表格的宽度
        "sScrollY": "460px",
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
    datTableInitVolunteer["sAjaxSource"] = rootPath + '/api/getAcitvityVolunteer';
    // 设置字段数据源
    datTableInitVolunteer["aoColumns"] = [
        {
            "data": "id"
        },
        {
            "data": "name"
        },
        {
            "data": "mobile"
        },
        {
            "data": "cardNo"
        },
        {
            "data": "id"
        },
    ];
    // 渲染字段数据源
    datTableInitVolunteer["aoColumnDefs"] = [
        {
            "aTargets": [0], "mRender": function (data, type, row, meta) {
                return meta.row + 1 + meta.settings._iDisplayStart;
            }
        },
        {
            "aTargets": [1], "mRender": function (data, type, row, meta) {
                return "<div class='item-volunteer-name'>" + row.name + "</div>";
            }
        },
        {
            "aTargets": [2], "mRender": function (data, type, row, meta) {
                return "<div class='item-phone'>" + row.mobile + "</div>";
            }
        },
        {
            "aTargets": [3], "mRender": function (data, type, row, meta) {
                return "<div class='item-card'>" + row.cardNo + "</div>";
            }
        },
        {
            "aTargets": [4], "mRender": function (data, type, row, meta) {
                var html = "";
                if (row.volunteerApplyStatus === 0) {
                    html += '<div class="table-operate"><a id="activity-volunteer-' + row.id + '" class="activity-volunteer-operation-1">通过</a><div></div><a style="color: #fb2020;" id="activity-volunteer-' + row.id + '" class="activity-volunteer-operation-2">拒绝</a></div>';
                } else if (row.volunteerApplyStatus === 1) {
                    html += '<div class="table-tip" style="color: #1890ff;"><span style="background: #1890ff"></span>已通过</div>';
                } else if (row.volunteerApplyStatus === 2) {
                    html += '<div class="table-tip" style="color: #fb2020;"><span style="background: #fb2020"></span>已拒绝</div>';
                }
                if (volunteerType === 0) {
                    return html;
                } else {
                    return null;
                }
            }
        },
    ];

    datTableInitVolunteer["fnServerData"] = function (sSource, aoData, fnCallback) {
        $.ajax({
            "type": 'get',
            "url": sSource,
            "dataType": "json",
            "data": {//查询条件写这里
                //dataTable固定参数
                aoData: JSON.stringify(aoData),
                // 选填参数
                // search: searchText
                activityId: $("#edit>input[name=id]").val(),
                volunteerApplyStatus: volunteerApplyStatus
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
    var dataInfoTableVolunteer = $("#volunteer-table").dataTable(datTableInitVolunteer).api();

    ///表格
    var datTableInitGuidang = {
        "bServerSide": true,
        "processing": true,
        "sScrollX": "100%",
        //表格的宽度
        "sScrollY": "460px",
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
    datTableInitGuidang["sAjaxSource"] = rootPath + '/api/getAllActivities';
    // 设置字段数据源
    datTableInitGuidang["aoColumns"] = [
        {
            "data": "id"
        },
        {
            "data": "title"
        },
        {
            "data": "oneOrganizationName"
        },
        {
            "data": "activityArea"
        },
        {
            "data": "startTime"
        },
        {
            "data": "id"
        }
    ];
    // 渲染字段数据源
    datTableInitGuidang["aoColumnDefs"] = [
        {
            "aTargets": [0], "mRender": function (data, type, row, meta) {
                return meta.row + 1 + meta.settings._iDisplayStart;
            }
        },
        {
            "aTargets": [1], "mRender": function (data, type, row, meta) {
                return "<div class='item-name' id='guidang-" + row.id + "'>" + row.title + "</div>";
            }
        },
        {
            "aTargets": [2], "mRender": function (data, type, row, meta) {
                return "<div class='item-area'>" + row.oneOrganizationName + "..." + "</div>";
            }
        },
        {
            "aTargets": [3], "mRender": function (data, type, row, meta) {
                return "<div class='item-location'>" + row.activityArea + "</div>";
            }
        },
        {
            "aTargets": [4], "mRender": function (data, type, row, meta) {
                return row.startTime;
            }
        },
        {
            "aTargets": [5], "mRender": function (data, type, row, meta) {
                var html = '<div class="table-operate"><a id="guidang-edit-' + row.id + '" class="guidang-operation-1">还原</a></div>';
                return html;
            }
        },
    ];

    datTableInitGuidang["fnServerData"] = function (sSource, aoData, fnCallback) {
        var scopeId = $("#shequ-select-gd").val();
        if (scopeId === "") {
            scopeId = null;
        }
        $.ajax({
            "type": 'get',
            "url": sSource,
            "dataType": "json",
            "data": {//查询条件写这里
                //dataTable固定参数
                aoData: JSON.stringify(aoData),
                // 选填参数
                // search: searchText
                title: $("#guidang-select-title").val(),
                scopeId: scopeId,
                isFiled: 1
            },
            "success": function (resp) {
                if (resp.status != 200) {
                    bootAlert(resp.msg);
                } else {
                    fnCallback(resp);
                }
            }
        });
    };
    // table初始化
    var dataInfoTableGuidang = $("#guidang-table").dataTable(datTableInitGuidang).api();

    if (localStorage.getItem("readPage") === "gwgl") {
        $("#gongwenliebiao").click();
        localStorage.removeItem("readPage");
    }

    //负责人选择
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

    //返回
    $(".l-title").on('click', 'img', function () {
        // $(".right-main:nth-child(4)").addClass("hidden");
        if ($(".selected-li").attr("id") == "gongwenliebiao") {
            $("#gongwenliebiao").click();
            return;
        }
        if (projectId === 15) {
            $(".task-title:nth-child(5),.right-main:nth-child(6)").removeClass("hidden");
            $(".task-title:nth-child(5),.right-main:nth-child(6) .task-table").removeClass("hidden");
        } else {
            $(".task-title:nth-child(1),.right-main:nth-child(2)").removeClass("hidden");
            $(".task-title:nth-child(5),.right-main:nth-child(2) .task-table").removeClass("hidden");
            $(".task-title:nth-child(5)").addClass("hidden");
        }
        $("#check").addClass("hidden");
    })
    // 图片删除
    $(".summarize").on("mouseover", ">div", function () {
        if ($(this).children("img").length !== 0) {
            $(this).children(".mask").removeClass("hidden");
            $(this).children(".delete").removeClass("hidden");
        }
    });
    $(".summarize").on("mouseout", ">div", function () {
        $(this).children(".mask").addClass("hidden");
        $(this).children(".delete").addClass("hidden");
    });
    $(".summarize").on("click", ".delete", function () {
        $(this).parent().remove();
    });
    // 图片上传
    $("#edit-summary-img").on('click', '#uploadImgs', function () {
        $(".summarize>input").click();
    });

    $(".summarize").on('change', 'input', function () {
        var allowType = ["png", "jpeg", "jpg", "gif"]
        var name = $(this)[0].files[0].name;
        var fileType = name.split('.').pop();
        if (allowType.indexOf(fileType.toLowerCase()) === -1) {
            bootAlert("请上传以.png、.jpeg、.jpg结尾文件");
            $(".summarize>input").next().val('')
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
            xhr: xhrOnProgress(function (e) {
                var percent = e.loaded / e.total;
            }),
            success: function (data) {
                if (data.status == 200) {
                    input.prev().before('<div>\n' +
                        '                        <div class="mask hidden"></div>\n' +
                        '                        <img src="' + imgPath + data.data.fileName + '">\n' +
                        '                        <div class="delete hidden"><img src="' + rootPath + '/resources/icon/shanchu.png">&nbsp;删除</div>\n' +
                        '                        <input class="hidden" value="' + data.data.fileName + '">\n' +
                        '                    </div>')
                }
                input.val("");
            },
            error: function () {
                input.val("");
            }
        })
    });
    $("#uploadImgsadd").click(function () {
        $(".uploadImgsadd").click();
    });
    $(".uploadImgsadd").change(function () {
        var allowType = ["png", "jpeg", "jpg"]
        var name = $(this)[0].files[0].name;
        var fileType = name.split('.').pop();
        if (allowType.indexOf(fileType.toLowerCase()) === -1) {
            bootAlert("请上传以.png、.jpeg、.jpg结尾文件");
            $(".uploadImgsadd>input").val('')
            return;
        }
        var formData = new FormData();
        formData.append('file_data', $(this)[0].files[0]);
        var input = $(this);
        var src = $("#uploadImgsadd").next().children("img").attr("src")
        $.ajax({
            type: "POST",
            url: rootPath + "/api/file/fileUpload?fileType=image",
            dataType: "json",
            data: formData,
            contentType: false,
            processData: false,
            beforeSend: function () {
                if ($("#uploadImgsadd").next().children("img").length === 0) {
                    $("#uploadImgsadd").next().append('<img src="' + imgBitmap + '">')
                } else {
                    $("#uploadImgsadd").next().children("img").attr("src", imgBitmap);
                }
            },
            xhr: xhrOnProgress(function (e) {
                var percent = e.loaded / e.total;
            }),
            success: function (data) {
                if (data.status == 200) {
                    $("#uploadImgsadd").next().children("input").val(data.data.fileName);
                    if ($("#uploadImgsadd").next().children("img").length === 0) {
                        $("#uploadImgsadd").next().append('<img src="' + imgPath + data.data.fileName + '">')
                    } else {
                        $("#uploadImgsadd").next().children("img").attr("src", imgPath + data.data.fileName);
                    }
                } else {
                    if (src !== "" || src != undefined) {
                        $("#uploadImgsadd").next().children("input").val(src.replace(imgPath, ""));
                        if ($("#uploadImgsadd").next().children("img").length === 0) {
                            $("#uploadImgsadd").next().append('<img src="' + src + '">')
                        } else {
                            $("#uploadImgsadd").next().children("img").attr("src", src);
                        }
                    }
                }
                input.val("");
            },
            error: function () {
                if (src !== "" || src != undefined) {
                    $("#uploadImgsadd").next().children("input").val(src.replace(imgPath, ""));
                    if ($("#uploadImgsadd").next().children("img").length === 0) {
                        $("#uploadImgsadd").next().append('<img src="' + src + '">')
                    } else {
                        $("#uploadImgsadd").next().children("img").attr("src", src);
                    }
                }
                input.val("");
            }
        })
    });
    $("#uploadImgsedit").click(function () {
        $(".uploadImgsedit").click();
    });
    $(".uploadImgsedit").change(function () {
        var allowType = ["png", "jpeg", "jpg"]
        var name = $(this)[0].files[0].name;
        var fileType = name.split('.').pop();
        if (allowType.indexOf(fileType.toLowerCase()) === -1) {
            bootAlert("请上传以.png、.jpeg、.jpg结尾文件");
            $(".uploadImgsedit>input").val('')
            return;
        }
        var formData = new FormData();
        formData.append('file_data', $(this)[0].files[0]);
        var input = $(this);
        var src = $("#uploadImgsedit").next().children("img").attr("src")
        $.ajax({
            type: "POST",
            url: rootPath + "/api/file/fileUpload?fileType=image",
            dataType: "json",
            data: formData,
            contentType: false,
            processData: false,
            beforeSend: function () {
                if ($("#uploadImgsedit").next().children("img").length === 0) {
                    $("#uploadImgsedit").next().append('<img src="' + imgBitmap + '">')
                } else {
                    $("#uploadImgsedit").next().children("img").attr("src", imgBitmap);
                }
            },
            xhr: xhrOnProgress(function (e) {
                var percent = e.loaded / e.total;
            }),
            success: function (data) {
                if (data.status == 200) {
                    $("#uploadImgsedit").next().children("input").val(data.data.fileName);
                    if ($("#uploadImgsedit").next().children("img").length === 0) {
                        $("#uploadImgsedit").next().append('<img src="' + imgPath + data.data.fileName + '">')
                    } else {
                        $("#uploadImgsedit").next().children("img").attr("src", imgPath + data.data.fileName);
                    }
                } else {
                    if (src !== "" || src != undefined) {
                        $("#uploadImgsedit").next().children("input").val(src.replace(imgPath, ""));
                        if ($("#uploadImgsedit").next().children("img").length === 0) {
                            $("#uploadImgsedit").next().append('<img src="' + src + '">')
                        } else {
                            $("#uploadImgsedit").next().children("img").attr("src", src);
                        }
                    }
                }
                input.val("");
            },
            error: function () {
                if (src !== "" || src != undefined) {
                    $("#uploadImgsedit").next().children("input").val(src.replace(imgPath, ""));
                    if ($("#uploadImgsedit").next().children("img").length === 0) {
                        $("#uploadImgsedit").next().append('<img src="' + src + '">')
                    } else {
                        $("#uploadImgsedit").next().children("img").attr("src", src);
                    }
                }
                input.val("");
            }
        })
    });
    //图片删除
    $("#uploadImgsadd").next().mouseover(function () {
        if ($(this).children("img").length > 0) {
            $(this).children(".mask").removeClass("hidden");
            $(this).children(".delete").removeClass("hidden");
        }
    });
    $("#uploadImgsadd").next().mouseout(function () {
        $(this).children(".mask").addClass("hidden");
        $(this).children(".delete").addClass("hidden");
    });
    $("#uploadImgsadd").next().children(".delete").click(function () {
        $("#uploadImgsadd").next().children(".mask").addClass("hidden");
        $("#uploadImgsadd").next().children(".delete").addClass("hidden");
        $("#uploadImgsadd").next().children("img").remove();
        $("#uploadImgsadd").next().children("input").val("");
    });
    $("#uploadImgsedit").next().mouseover(function () {
        if ($(this).children("img").length > 0) {
            $(this).children(".mask").removeClass("hidden");
            $(this).children(".delete").removeClass("hidden");
        }
    });
    $("#uploadImgsedit").next().mouseout(function () {
        $(this).children(".mask").addClass("hidden");
        $(this).children(".delete").addClass("hidden");
    });
    $("#uploadImgsedit").next().children(".delete").click(function () {
        $("#uploadImgsedit").next().children(".mask").addClass("hidden");
        $("#uploadImgsedit").next().children(".delete").addClass("hidden");
        $("#uploadImgsedit").next().children("img").remove();
        $("#uploadImgsedit").next().children("input").val("");
    });
    // 添加活动
    $("#addActivity").click(function () {
        addPageInit();
        $(".task-title:nth-child(1),.right-main:nth-child(2)").addClass("hidden");
        $(".right-main:nth-child(3)").removeClass("hidden");
    })
    $(".right-main:nth-child(3) .l-title img,.right-main:nth-child(4) .l-title img").click(function () {
        reloadAjax(dataInfoTableItem);
        $(".task-title:nth-child(1),.right-main:nth-child(2)").removeClass("hidden");
        $(".right-main:nth-child(3)").addClass("hidden");
        $(".right-main:nth-child(4)").addClass("hidden");
    });
    // 管理活动
    $("#item-table").delegate(".activity-operation-1", "click", function () {
        $(".top-buttons div:nth-child(1)").click();
        editPageInit();
        var id = $(this).attr("id").replace("activity-edit-", "");
        $("#edit>input[name=id]").val(id);
        $.ajax({
            type: "GET",
            url: rootPath + "/api/getActivity",
            dataType: "json",
            data: {
                id: id,
            },
            success: function (data) {
                if (data.status === 200) {
                    $("#edit-title").val(data.data.title);
                    $("#startDate1").val(data.data.startTime);
                    $("#activityTime1").val(data.data.endTime);
                    $("#edit-end-enroll").val(data.data.enrollTime);
                    $("#edit-activityArea").val(data.data.activityArea);
                    $("#editSynopsis").html(data.data.description);
                    $("#edit-number-limit").val(data.data.huiyuanLimit);
                    $("#describe").html(data.data.summary);
                    if (data.data.volunteerLimit === 1) {
                        $("#isRecruit3").prop("checked", true)
                    } else {
                        $("#isRecruit4").prop("checked", true)
                    }
                    $(".editFZR").val(data.data.headMemberId).trigger('change');
                    $(".editFZR option[value='" + data.data.headMemberId + "']").attr("selected", true);
                    html = "";
                    for (var i = 0; i < data.data.scopeId.length; ++i) {
                        var s = "<span id='select-area-" + data.data.scopeId[i] + "'>";
                        s += allScope[data.data.scopeId[i]].name + '<span class="removeArea">×</span></span>\n';
                        html += s;
                    }

                    $("#edit-area").html(html);
                    $("#visibility-region").html(html);
                    $("#selectArea .search-member .dept-members input").each(function () {
                        if ($(this).is(":checked")) {
                            $(this).attr("checked", false);
                        }
                        for (var i = 0; i < data.data.scopeId.length; ++i) {
                            if (parseInt($(this).attr("id").replace("dept-", "")) === data.data.scopeId[i]) {
                                $(this).attr("checked", true);
                                break;
                            }
                        }
                    })
                    editPageInit();
                    if (data.data.attachment != "" && data.data.attachment != undefined) {
                        $("#uploadImgsedit").next().append('<img src="' + imgPath + data.data.attachment + '">');
                        $("#uploadImgsedit").next().children("input").val(data.data.attachment);
                    }
                    $("#edit>input[name=id]").val(id);
                    html = "";
                    var summmaryImage = data.data.summaryImage.split(";");
                    for (var i = 0; i < summmaryImage.length; ++i) {
                        if (summmaryImage[i] === "") continue;
                        html += "<div>\n" +
                            "                        <div class=\"mask hidden\"></div>\n" +
                            "                        <img src='" + imgPath + summmaryImage[i] + "'>\n" +
                            "                        <div class=\"delete hidden\"><img src=\"" + rootPath + "/resources/icon/shanchu.png\">&nbsp;删除</div>\n" +
                            "                        <input class=\"hidden\" value='" + summmaryImage[i] + "'>\n" +
                            "                    </div>";
                    }
                    html += "<div id=\"uploadImgs\">\n" +
                        "                        <div><img src=\"/WebFinalWork/resources/icon/tianjiakaobei2.png\"></div>\n" +
                        "                        <div><span>上传图片</span></div>\n" +
                        "                        <div><span>jpg png</span></div>\n" +
                        "                    </div>";
                    html += "<input class=\"hidden\" type=\"file\" accept=\"image/png,image/jpeg\">";
                    $("#edit-summary-img").html(html);
                }
            },
            error: function () {
                alert("服务器请求失败")
            }
        })
    })
    $(".right-main:nth-child(4) .top-buttons>div:nth-child(1)").click(function () {
        $(".right-main>div:nth-child(n+5)").addClass("hidden");
        $(".right-main .editActivity").removeClass("hidden");
    })
    $(".right-main:nth-child(4) .top-buttons>div:nth-child(2)").click(function () {
        $(".right-main>div:nth-child(n+5)").addClass("hidden");
        $(".right-main .situation").removeClass("hidden");
    })
    $(".right-main:nth-child(4) .top-buttons>div:nth-child(3)").click(function () {
        $(".right-main>div:nth-child(n+5)").addClass("hidden");
        $(".right-main>div:nth-child(n+7)").removeClass("hidden");
    });

// 会员报名志愿者审批切换
    $(".top-buttons div").click(function () {
        $(".top-buttons div").removeClass("current-top-div");
        if ($(this).index() === 0 || $(this).index() === 2) {
            $(".top-buttons div").removeClass("right-div");
            $(".top-buttons div").removeClass("left-div");
            $(this).addClass("current-top-div");
        } else {
            $(".top-buttons div:nth-child(1)").addClass("right-div");
            $(".top-buttons div:nth-child(3)").addClass("left-div");
            $(this).addClass("current-top-div");
        }
        reloadAjax(dataInfoTableVolunteer);
    });
    $(".situation-tables ul li:nth-child(1)").click(function () {
        $(".situation-tables ul li").removeClass("situation-table-selected-li");
        $(this).addClass("situation-table-selected-li");
        volunteerApplyStatus = 3;
        reloadAjax(dataInfoTableVolunteer);
        $("#volunteer-table_wrapper > div.dataTables_scroll > div.dataTables_scrollHead > div > table > thead > tr > th:nth-child(5)").html("");
    })
    $(".situation-tables ul li:nth-child(2)").click(function () {
        $(".situation-tables ul li").removeClass("situation-table-selected-li");
        $(this).addClass("situation-table-selected-li");
        volunteerApplyStatus = null;
        reloadAjax(dataInfoTableVolunteer);
        $("#volunteer-table_wrapper > div.dataTables_scroll > div.dataTables_scrollHead > div > table > thead > tr > th:nth-child(5)").html("审批")
    })

    $(".addActivity>div:nth-child(1)>label:nth-child(2) .normal-input").on("click", '>img', function () {
        $("#selectArea").css("display", "block");
        $("body").addClass("body-hidden");
    });
    $(".addActivity>div:nth-child(1)>label:nth-child(2) .normal-input").on("click", '>a', function () {
        $("#selectArea").css("display", "block");
        $("body").addClass("body-hidden");
    });
    $(".addActivity>div:nth-child(1)>label:nth-child(2) .normal-input").on("click", '.removeArea', function () {
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

    });
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
    $("#selectRecipients .selectRecipients-title img,#selectRecipients .pop-buttons .normal-button, #selectRecipients .pop-buttons .main-button").click(function () {
        $("#selectRecipients").css("display", "none");
        $("body").removeClass("body-hidden");
    })
    $(".addActivity>div:nth-child(3)>label:nth-child(2) .normal-input").on("click", ">img", function () {
        $("#selectRecipients").css("display", "block");
        $("body").addClass("body-hidden");
    });
    $(".addActivity>div:nth-child(3)>label:nth-child(2) .normal-input").on("click", ">a", function () {
        $("#selectRecipients").css("display", "block");
        $("body").addClass("body-hidden");
    });
    $("#selectArea .selectRecipients-title img,#selectArea .pop-buttons .normal-button,#selectArea .pop-buttons .main-button").click(function () {
        $("#selectArea").css("display", "none");
        $("body").removeClass("body-hidden");
    })

//编辑活动
    $("#edit-button").click(function () {
        var id = $("#edit>input[name=id]").val();
        var flag = true;
        if ($("#edit-title").val() === "") {
            $("#edit-title").addClass("danger-input");
            $("#edit-title").parent().parent().next().children("label:nth-child(1)").css("visibility", "visible");
            flag = false;
        } else {
            $("#edit-title").removeClass("danger-input");
            $("#edit-title").parent().parent().next().children("label:nth-child(1)").css("visibility", "hidden");
        }
        selectedScope = [];
        $("#edit-search-area span>span").each(function () {
            selectedScope = [];
            $("#edit-search-area span>span").each(function () {
                if ($(this).attr("id")) {
                    selectedScope.push($(this).attr("id").replace("select-area-", ""));
                }
            })
            if ($(this).attr("id") != undefined) {
                selectedScope.push($(this).attr("id").replace("select-area-", ""));
            }
        })
        if (selectedScope.length === 0) {
            $("#edit-search-area").addClass("danger-input");
            $("#edit-search-area").parent().parent().next().children("label:nth-child(2)").css("visibility", "visible");
            flag = false;
        } else {
            $("#edit-search-area").removeClass("danger-input");
            $("#edit-search-area").parent().parent().next().children("label:nth-child(2)").css("visibility", "hidden");
        }

        if ($("#startDate1").val() === "") {
            $("#startDate1").addClass("danger-input");
            $("#startDate1").parent().parent().next().children("label:nth-child(1)").css("visibility", "visible");
            flag = false;
        } else {
            $("#startDate1").removeClass("danger-input");
            $("#startDate1").parent().parent().next().children("label:nth-child(1)").css("visibility", "hidden");
        }
        if ($("#edit-activityArea").val() === "") {
            $("#edit-activityArea").addClass("danger-input");
            $("#edit-activityArea").parent().parent().next().children("label:nth-child(2)").css("visibility", "visible");
            flag = false;
        } else {
            $("#edit-activityArea").removeClass("danger-input");
            $("#edit-activityArea").parent().parent().next().children("label:nth-child(2)").css("visibility", "hidden");
        }

        if ($("#activityTime1").val() === "") {
            $("#activityTime1").addClass("danger-input");
            $("#activityTime1").parent().parent().next().children("label:nth-child(1)").css("visibility", "visible");
            flag = false;
        } else {
            $("#activityTime1").removeClass("danger-input");
            $("#activityTime1").parent().parent().next().children("label:nth-child(1)").css("visibility", "hidden");
        }
        if ($("#edit-end-enroll").val() === "") {
            $("#edit-end-enroll").addClass("danger-input");
            $("#edit-end-enroll").parent().parent().next().children("label:nth-child(1)").css("visibility", "visible");
            flag = false;
        } else {
            $("#edit-end-enroll").removeClass("danger-input");
            $("#edit-end-enroll").parent().parent().next().children("label:nth-child(1)").css("visibility", "hidden");
        }


        if ($("#edit-number-limit").val() === "") {
            $("#edit-number-limit").addClass("danger-input");
            $("#edit-number-limit").parent().parent().next().children("label:nth-child(1)").css("visibility", "visible");
            flag = false;
        } else {
            $("#edit-number-limit").removeClass("danger-input");
            $("#edit-number-limit").parent().parent().next().children("label:nth-child(1)").css("visibility", "hidden");
        }
        if ($("input[name=isRecruit]:checked").val() === undefined) {
            $("#isRecruit3").parent().parent().parent().next().children("label:nth-child(2)").css("visibility", "visible");
        } else {
            $("#isRecruit3").parent().parent().parent().next().children("label:nth-child(2)").css("visibility", "hidden");
        }
        if ($(".editFZR").val() == "-1") {
            flag = false;
            $(".editFZR").next().addClass("danger-select");
            $(".editFZR").parent().parent().next().children("label:nth-child(2)").css("visibility", "visible");
        } else {
            $(".editFZR").next().removeClass("danger-select");
            $(".editFZR").parent().parent().next().children("label:nth-child(2)").css("visibility", "hidden");
        }
        if (!isDigital($("#edit-number-limit").val())) {
            bootAlert("限制人数请输入整数")
            return;
        }
        if (flag === true) {
            var isOutOfBounds = false;
            var scopeId = user.scopeId;
            var checkStatus = 3;
            if (scopeId === 0) {
                checkStatus = 3;
            } else if (scopeId % 100 !== 0) {//社区
                for (var i = 0; i < selectedScope.length; ++i) {
                    if (selectedScope[i] === "") continue;
                    if (parseInt(scopeId) !== parseInt(selectedScope[i])) {
                        if (selectedScope[i] - selectedScope[i] % 100 !== scopeId - scopeId % 100) {
                            //可见范围不在一个街道
                            isOutOfBounds = true;
                            break;
                        }
                        checkStatus = 0;
                    }
                }
            } else if (scopeId % 10000 !== 0) {//街道
                for (var i = 0; i < selectedScope.length; ++i) {
                    if (selectedScope[i] === "") continue;
                    if (scopeId - scopeId % 100 !== selectedScope[i] - selectedScope[i] % 100) {
                        if (scopeId - scopeId % 10000 !== selectedScope[i] - selectedScope[i] % 10000) {
                            isOutOfBounds = true;
                            break;
                        }
                        checkStatus = 0;
                    }
                }
            } else if (scopeId % 10000 === 0) {//区
                for (var i = 0; i < selectedScope.length; ++i) {
                    if (selectedScope[i] === "") continue;
                    if (scopeId - scopeId % 10000 !== selectedScope[i] - selectedScope[i] % 10000) {
                        checkStatus = 0;

                        break;
                    }
                }
            }
            if (!isDigital($("#add-numberLimit").val())) {
                bootAlert("限制人数请输入整数")
                return;
            }
            if (isOutOfBounds) {
                bootAlert("您选择的可见范围超区您的权限");
            } else {
                if (checkStatus === 3) {
                    updateActivity1(id, checkStatus, null);
                } else {
                    bootbox.confirm({
                        title: "申请审批",
                        message: "您选择的地区超出您的权限，是否向上审批？",
                        callback: function (result) {
                            if (result) {
                                updateActivity1(id, checkStatus, organizationParent);
                            } else {
                                return;
                            }
                        }
                    });
                }
            }
        }
    })
    $("#edit-button2").click(function () {
        var id = $("#edit>input[name=id]").val();
        updateActivity2(id);
    })

//删除
    $(".danger-button").click(function () {
        if ($(this).parent().prev().attr("id") == "GongWen"){
            var id = $(this).parent().attr("name");
            bootbox.confirm({
                title: "删除公文",
                message: "请确认是否删除公文？",
                callback: function (result) {
                    if (result) {
                        $.ajax({
                            type: "POST",
                            url: rootPath + "/api/deleteOfficialDocument",
                            dataType: "json",
                            data: {
                                id: id
                            },
                            success: function (data1) {
                                if (data1.status === 200) {
                                    bootAlert("删除成功");
                                    $("#gongwenliebiao").click();
                                } else {
                                    bootAlert("删除失败");
                                }
                            },
                            error: function () {
                                bootAlert("服务器请求失败");
                            }
                        })
                    } else {
                        return;
                    }
                }
            });
        }else{
            var id = $("#edit>input[name=id]").val();
            bootbox.confirm({
                title: "删除活动",
                message: "请确认是否删除活动？",
                callback: function (result) {
                    if (result) {
                        deleteActivity(id);
                    } else {
                        return;
                    }
                }
            });
        }

    })

//志愿者状态更改
    $("#volunteer-table").delegate('.activity-volunteer-operation-1', 'click', function () {
        var huiyuanId = $(this).attr("id").replace("activity-volunteer-", "");
        var activityId = $("#edit>input[name=id]").val();
        updateVolunteer(huiyuanId, activityId, 1);
        reloadAjax(dataInfoTableVolunteer);
    })
    $("#volunteer-table").delegate('.activity-volunteer-operation-2', 'click', function () {
        var huiyuanId = parseInt($(this).attr("id").replace("activity-volunteer-", ""));
        var activityId = parseInt($("#edit>input[name=id]").val());
        updateVolunteer(huiyuanId, activityId, 2);
        reloadAjax(dataInfoTableVolunteer);
    })

//添加活动
    $("#add-button").click(function () {
        var flag = true;
        if ($("#add-title").val() === "") {
            $("#add-title").addClass("danger-input");
            $("#add-title").parent().parent().next().children("label:nth-child(1)").css("visibility", "visible");
            flag = false;
        } else {
            $("#add-title").removeClass("danger-input");
            $("#add-title").parent().parent().next().children("label:nth-child(1)").css("visibility", "hidden");
        }
        selectedScope = [];
        $("#add-search-area span>span").each(function () {
            selectedScope = [];
            $("#add-search-area span>span").each(function () {
                if ($(this).attr("id")) {
                    selectedScope.push($(this).attr("id").replace("select-area-", ""));
                }
            })
            if ($(this).attr("id") != undefined) {
                selectedScope.push($(this).attr("id").replace("select-area-", ""));
            }
        })
        if (selectedScope.length === 0) {
            $("#add-search-area").addClass("danger-input");
            $("#add-search-area").parent().parent().next().children("label:nth-child(2)").css("visibility", "visible");
            flag = false;
        } else {
            $("#add-search-area").removeClass("danger-input");
            $("#add-search-area").parent().parent().next().children("label:nth-child(2)").css("visibility", "hidden");
        }

        if ($("#startDate").val() === "") {
            $("#startDate").addClass("danger-input");
            $("#startDate").parent().parent().next().children("label:nth-child(1)").css("visibility", "visible");
            flag = false;
        } else {
            $("#startDate").removeClass("danger-input");
            $("#startDate").parent().parent().next().children("label:nth-child(1)").css("visibility", "hidden");
        }
        if ($("#add-activityArea").val() === "") {
            $("#add-activityArea").addClass("danger-input");
            $("#add-activityArea").parent().parent().next().children("label:nth-child(2)").css("visibility", "visible");
            flag = false;
        } else {
            $("#add-activityArea").removeClass("danger-input");
            $("#add-activityArea").parent().parent().next().children("label:nth-child(2)").css("visibility", "hidden");
        }

        if ($("#activityTime").val() === "") {
            $("#activityTime").addClass("danger-input");
            $("#activityTime").parent().parent().next().children("label:nth-child(1)").css("visibility", "visible");
            flag = false;
        } else {
            $("#activityTime").removeClass("danger-input");
            $("#activityTime").parent().parent().next().children("label:nth-child(1)").css("visibility", "hidden");
        }
        if ($("#add-end-enroll").val() === "") {
            $("#add-end-enroll").addClass("danger-input");
            $("#add-end-enroll").parent().parent().next().children("label:nth-child(1)").css("visibility", "visible");
            flag = false;
        } else {
            $("#add-end-enroll").removeClass("danger-input");
            $("#add-end-enroll").parent().parent().next().children("label:nth-child(1)").css("visibility", "hidden");
        }
        if ($("#select-member option:selected").val() === "-1") {
            $("#select-member").parent().parent().next().children("label:nth-child(2)").css("visibility", "visible");
            flag = false;
        } else {
            $("#select-member").parent().parent().next().children("label:nth-child(2)").css("visibility", "hidden");
        }

        if ($("#add-numberLimit").val() === "") {
            $("#add-numberLimit").addClass("danger-input");
            $("#add-numberLimit").parent().parent().next().children("label:nth-child(1)").css("visibility", "visible");
            flag = false;
        } else {
            $("#add-numberLimit").removeClass("danger-input");
            $("#add-numberLimit").parent().parent().next().children("label:nth-child(1)").css("visibility", "hidden");
        }
        if ($("input[name=isRecruit]:checked").val() === undefined) {
            $("#isRecruit2").parent().parent().parent().next().children("label:nth-child(2)").css("visibility", "visible");
        } else {
            $("#isRecruit2").parent().parent().parent().next().children("label:nth-child(2)").css("visibility", "hidden");
        }
        if ($(".addFZR").val() == "-1") {
            $(".addFZR").next().addClass("danger-select");
            $(".addFZR").parent().parent().next().children("label:nth-child(2)").css("visibility", "visible");
        } else {
            $(".addFZR").next().removeClass("danger-select");
            $(".addFZR").parent().parent().next().children("label:nth-child(2)").css("visibility", "hidden");
        }
        if (flag === true) {
            var isOutOfBounds = false;
            var scopeId = user.scopeId;
            var checkStatus = 3;
            if (scopeId === 0) {
                checkStatus = 3;
            } else if (scopeId % 100 !== 0) {//社区
                for (var i = 0; i < selectedScope.length; ++i) {
                    if (selectedScope[i] === "") continue;
                    if (scopeId !== selectedScope[i]) {
                        if (selectedScope[i] - selectedScope[i] % 100 !== scopeId - scopeId % 100) {
                            //可见范围不在一个街道
                            isOutOfBounds = true;
                            break;
                        }
                        checkStatus = 0;
                    }
                }
            } else if (scopeId % 10000 !== 0) {//街道
                for (var i = 0; i < selectedScope.length; ++i) {
                    if (selectedScope[i] === "") continue;
                    if (scopeId - scopeId % 100 !== selectedScope[i] - selectedScope[i] % 100) {
                        if (scopeId - scopeId % 10000 !== selectedScope[i] - selectedScope[i] % 10000) {
                            isOutOfBounds = true;
                            break;
                        }
                        checkStatus = 0;
                    }
                }
            } else if (scopeId % 10000 === 0) {//区
                for (var i = 0; i < selectedScope.length; ++i) {
                    if (selectedScope[i] === "") continue;
                    if (scopeId - scopeId % 10000 !== selectedScope[i] - selectedScope[i] % 10000) {
                        checkStatus = 0;
                        break;
                    }
                }
            }
            if (!isDigital($("#add-numberLimit").val())) {
                bootAlert("限制人数请输入整数")
                return;
            }
            if (isOutOfBounds) {
                bootAlert("您选择的可见范围超区您的权限");
            } else {
                if (checkStatus === 3) {
                    insertActivity(checkStatus, null);
                } else {
                    bootbox.confirm({
                        title: "申请审批",
                        message: "您选择的地区超出您的权限，是否向上审批？",
                        callback: function (result) {
                            if (result) {
                                insertActivity(checkStatus, organizationParent);
                            } else {
                                return;
                            }
                        }
                    });
                }
            }
        }
    })
    $("input[name=isRecruit]").change(function () {
        $("#isRecruit2").parent().parent().parent().next().children("label:nth-child(2)").css("visibility", "hidden");
    });
    $("#item-table").delegate('.activity-operation-2', 'click', function () {
        var id = $(this).attr("id").replace("activity-edit-", "");
        toActivityReadPage(id);
    });
    $("#item-table").delegate('.activity-operation-3', 'click', function () {
        var id = $(this).prev().prev().attr("id").replace("activity-edit-", "");
        bootbox.confirm({
            title: "确认归档",
            message: "请确认是否归档该活动？",
            callback: function (result) {
                if (result) {
                    updateAcitivityIsFiled(id, 1, dataInfoTableItem);
                } else {
                    return;
                }
            }
        });
    });
    $("#item-table").delegate('.activity-operation-4', 'click', function () {
        var id = $(this).attr("id").replace("activity-ewm-", "");
        var title = $(this).attr("name");
        $.ajax({
            type: "GET",
            url: rootPath + "/api/test/getActivityQR/" + id,
            dataType: "json",
            success: function (data) {
                if (data.status === 200) {
                    swal({
                            title: title,
                            imageUrl: data.data,
                            imageSize: "400x400",
                            showCancelButton: false,
                            confirmButtonText: "关闭",
                            closeOnConfirm: true
                        }
                    );
                }
            },
            error: function () {
                alert("服务器请求失败")
            }
        })

    });

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
//区域确认按钮点击事件
    $("#select-area .main-button").click(function () {
        var selected = ""
        if ($("#edit").hasClass('hidden')) {
            selected += "<span>";
        }
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
        if ($("#edit").hasClass('hidden')) {
            selected += "</span>"
            selected += '<img src=' + rootPath + '/resources/icon/3-tianjiahuodong.png>';
            $("#add-search-area").html(selected);
            if (selectedScope.length === 0) {
                $("#add-search-area").addClass("danger-input");
                $("#add-search-area").parent().parent().next().children("label:nth-child(2)").css("visibility", "visible");
            } else {
                $("#add-search-area").removeClass("danger-input");
                $("#add-search-area").parent().parent().next().children("label:nth-child(2)").css("visibility", "hidden");
            }
        } else {
            $("#edit-area").html(selected);
            if (selectedScope.length === 0) {
                $("#edit-search-area").addClass("danger-input");
                $("#edit-search-area").parent().parent().next().children("label:nth-child(2)").css("visibility", "visible");
            } else {
                $("#edit-search-area").removeClass("danger-input");
                $("#edit-search-area").parent().parent().next().children("label:nth-child(2)").css("visibility", "hidden");
            }
        }
    })
//红色提示
    $("#add-title,#add-activityArea,#add-numberLimit,#edit-title,#edit-activityArea,#edit-number-limit").blur(function () {
        if ($(this).val() === "") {
            $(this).addClass("danger-input")
            $(this).parent().parent().next().children().eq($(this).parent().index()).css("visibility", "visible")
        } else {
            $(this).removeClass("danger-input")
            $(this).parent().parent().next().children().eq($(this).parent().index()).css("visibility", "hidden")
        }
    });
    $("#add-title,#add-activityArea,#add-numberLimit,#edit-title,#edit-activityArea,#edit-number-limit").bind('input propertychange', function () {
        if ($(this).val() !== "") {
            $(this).removeClass("danger-input")
            $(this).parent().parent().next().children().eq($(this).parent().index()).css("visibility", "hidden")
        } else {
            $(this).addClass("danger-input")
            $(this).parent().parent().next().children().eq($(this).parent().index()).css("visibility", "visible")
        }
    })
    $(".addFZR,.editFZR").parent().on("blur", '.select2-container', function () {
        if ($(this).prev().val() === "-1") {
            $(this).addClass("danger-select");
            $(this).parent().parent().next().children().eq($(this).parent().index()).css("visibility", "visible")
        } else {
            $(this).removeClass("danger-select");
            $(this).parent().parent().next().children().eq($(this).parent().index()).css("visibility", "hidden")
        }
    });
    $(".addFZR,.editFZR").on("focus", function () {
        if ($(this).next().hasClass("select2-container--open")) {
            $(this).next().removeClass("danger-select");
        }
    });
    $(".addFZR,.editFZR").on("change", function () {
        if ($(this).val() === "-1") {
            $(this).next().addClass("danger-select");
            $(this).parent().parent().next().children().eq($(this).parent().index()).css("visibility", "visible")
        } else {
            $(this).next().removeClass("danger-select");
            $(this).parent().parent().next().children().eq($(this).parent().index()).css("visibility", "hidden")
        }
    });
    $("#startDate,#activityTime,#startDate1,#activityTime1,#add-end-enroll,#edit-end-enroll").bind('input propertychange', function () {
        if ($(this).val() === "") {
            $(this).addClass("danger-input");
            $(this).parent().parent().next().children("label:nth-child(1)").css("visibility", "visible");
        } else {
            $(this).removeClass("danger-input");
            $(this).parent().parent().next().children("label:nth-child(1)").css("visibility", "hidden");
        }
    });
    $("#startDate,#activityTime,#startDate1,#activityTime1,#add-end-enroll,#edit-end-enroll").blur(function () {
        if ($(this).val() === "") {
            $(this).addClass("danger-input");
            $(this).parent().parent().next().children("label:nth-child(1)").css("visibility", "visible");
        } else {
            $(this).removeClass("danger-input");
            $(this).parent().parent().next().children("label:nth-child(1)").css("visibility", "hidden");
        }
    });
//归档查看
    $("#guidang-table").delegate("tbody td:nth-child(2)", "click", function () {
        var id = $(this).children().attr("id").replace("guidang-", "");
        readPageInit();
        toActivityReadPage(id);
    })

//归档还原
    $("#guidang-table").delegate(".guidang-operation-1", "click", function () {
        var id = $(this).attr("id").replace("guidang-edit-", "");
        bootbox.confirm({
            title: "确认还原",
            message: "请确认是否还原该活动？",
            callback: function (result) {
                if (result) {
                    updateAcitivityIsFiled(id, 0, dataInfoTableGuidang);
                } else {
                    return;
                }
            }
        });

    })

    $("#query").click(function () {
        reloadAjax(dataInfoTableItem)
    })
    $("#guidang-query").click(function () {
        reloadAjax(dataInfoTableGuidang)
    })

//刷新
    $("#activity-refrush").click(function () {
        reloadAjax(dataInfoTableItem);
    })
    $("#guidang-refush").click(function () {
        reloadAjax(dataInfoTableGuidang);
    });

//批量下载
    $(".download-jianjie-img").click(function () {

        var src = $("#read-description-image>div:nth-child(1)>img").attr("src");
        var suffix = src.substring(src.lastIndexOf("."));
        var name = src.replace(imgPath, '').replace(suffix, '');
        var $a = $("<a></a>").attr("href", src).attr("download", $("#read-title").html() + suffix);
        $a[0].click();
    });
    $(".download-zongjie-img").click(function () {
        packageImages();
    });

    document.addEventListener("error", function (e) {
        var elem = e.target;
        if (elem.tagName.toLowerCase() === 'img') {
            elem.src = imgBitmap;
        }
    }, true);

});


function reloadAjax(ajaxTable) {
    ajaxTable.ajax.reload(false);
}

var xhrOnProgress = function (fun) {
    xhrOnProgress.onprogress = fun;
    return function () {
        var xhr = $.ajaxSettings.xhr();
        if (typeof xhrOnProgress.onprogress !== 'function')
            return xhr;
        if (xhrOnProgress.onprogress && xhr.upload) {
            xhr.upload.onprogress = xhrOnProgress.onprogress;
        }
        return xhr;
    }
}

//界面初始化
function addPageInit() {
    selectedScope = [];
    $("#add-title").val("");
    $("#add-search-area").html("<span>\n" +
        "                                </span>\n" +
        "                                <img src=" + rootPath + "/resources/icon/3-tianjiahuodong.png>");
    $("#startDate").val("");
    $("#uploadImgsadd").next().children("img").remove();
    $("#uploadImgsadd").next().children("input").val("");
    $("#add-activityArea").val("");
    $("#activityTime").val("");
    $("#add-numberLimit").val("");
    $("#writeSynopsis").html("");
    $("input[name=isRecruit]").attr("checked", false);
    $("#visibility-region").html("");
    var html = "<span> </span>";
    html += '<img src=' + rootPath + '/resources/icon/3-tianjiahuodong.png>';
    $("#add-search-area").html(html);
    $("#selectArea .search-member .dept-members input").each(function () {
        if ($(this).is(":checked")) {
            $(this).attr("checked", false);
        }
    })
    $(".addFZR").val("-1").trigger('change');
    $(".addFZR option[value='-1']").attr("selected", true);

    $("#add-title").removeClass("danger-input");
    $("#add-title").parent().parent().next().children("label:nth-child(1)").css("visibility", "hidden");
    $("#add-search-area").removeClass("danger-input");
    $("#add-search-area").parent().parent().next().children("label:nth-child(2)").css("visibility", "hidden");
    $("#startDate").removeClass("danger-input");
    $("#startDate").parent().parent().next().children("label:nth-child(1)").css("visibility", "hidden");
    $("#add-activityArea").removeClass("danger-input");
    $("#add-activityArea").parent().parent().next().children("label:nth-child(2)").css("visibility", "hidden");
    $("#activityTime").removeClass("danger-input");
    $("#activityTime").parent().parent().next().children("label:nth-child(1)").css("visibility", "hidden");
    $("#select-member").parent().parent().next().children("label:nth-child(2)").css("visibility", "hidden");
    $("#add-numberLimit").removeClass("danger-input");
    $("#add-numberLimit").parent().parent().next().children("label:nth-child(1)").css("visibility", "hidden");
    $("#isRecruit2").parent().parent().parent().next().children("label:nth-child(2)").css("visibility", "hidden");
    $(".addFZR").next().removeClass("danger-select");
    $(".addFZR").parent().parent().next().children("label:nth-child(2)").css("visibility", "hidden");
}

function editPageInit() {
    $(".task-title:nth-child(1),.right-main:nth-child(2)").addClass("hidden");
    $("#edit").removeClass("hidden");
    $("#uploadImgsedit").next().children("img").remove();
    $("#uploadImgsedit").next().children("input").val("");
    $("#edit-title").removeClass("danger-input");
    $("#edit-title").parent().parent().next().children("label:nth-child(1)").css("visibility", "hidden");
    $("#edit-search-area").removeClass("danger-input");
    $("#edit-search-area").parent().parent().next().children("label:nth-child(2)").css("visibility", "hidden");
    $("#startDate1").removeClass("danger-input");
    $("#startDate1").parent().parent().next().children("label:nth-child(1)").css("visibility", "hidden");
    $("#edit-activityArea").removeClass("danger-input");
    $("#edit-activityArea").parent().parent().next().children("label:nth-child(2)").css("visibility", "hidden");
    $("#activityTime1").removeClass("danger-input");
    $("#activityTime1").parent().parent().next().children("label:nth-child(1)").css("visibility", "hidden");
    $("#edit-number-limit").removeClass("danger-input");
    $("#edit-number-limit").parent().parent().next().children("label:nth-child(1)").css("visibility", "hidden");
    $("#isRecruit3").parent().parent().parent().next().children("label:nth-child(2)").css("visibility", "hidden");
    $(".editFZR").next().removeClass("danger-select");
    $(".editFZR").parent().parent().next().children("label:nth-child(2)").css("visibility", "hidden");
}

function readPageInit() {
    $(".task-title:nth-child(1),.right-main:nth-child(2)").addClass("hidden");
    $(".task-title:nth-child(5),.right-main:nth-child(6)").addClass("hidden");
    $("#check").removeClass("hidden");
}

function toActivityReadPage(id) {
    $.ajax({
        type: "GET",
        url: rootPath + "/api/getActivity",
        dataType: "json",
        data: {
            id: id
        },
        success: function (data) {
            if (data.status === 200) {
                readPageInit();
                $("#check *").removeClass("hidden");
                $("#startTime").html(data.data.startTime);
                $("#endTime").html(data.data.endTime);
                $("#end-enroll").html(data.data.endTime);
                $("#read-title").html(data.data.enrollTime);
                $("#read-huiyuanCount").html("<span>*</span><span>报名人数：</span><span>" + data.data.huiyuanCount + "人</span>");
                $("#read-activityArea").html("<span>*</span><span>活动地址：</span><span>" + data.data.activityArea + "</span>");
                $("#read-description").html(data.data.description);
                $("#read-summary").html(data.data.summary);
                var html = "<span style=\"margin-left: 1rem\">*</span><span>负责人：</span><span><img src='" + rootPath + "/resources/icon/";
                if (data.data.headMemberType === 1) {
                    html += "chengyuankaobei.png";
                } else {
                    html += "chengyuan2.png";
                }
                html += "'>" + data.data.headMemberName + "</span></span>";
                $("#read-headmember").html(html);
                if (data.data.attachment != "" && data.data.attachment != undefined) {
                    html = "<div>\n" +
                        "                        <img src=\'" + imgPath + data.data.attachment + "'>\n" +
                        "                    </div>"
                    $("#read-description-image").html(html);
                }
                $("#read-zongjie-img").html("");
                html = "";
                var summaryImage = data.data.summaryImage.split(";");
                for (var i = 0; i < summaryImage.length; ++i) {
                    if (summaryImage[i] === "") continue;
                    html += "<div>\n" +
                        "                        <img src=\'" + imgPath + summaryImage[i] + "'>\n" +
                        "                    </div>"
                }
                $("#read-zongjie-img").html(html);
            }
        },
        error: function () {
            alert("服务器请求失败")
        }
    })
}

//添加活动
function insertActivity(checkStatus, approvalId) {
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: rootPath + "/api/insertActivity",
        dataType: "json",
        async: false,
        data: JSON.stringify({
            attachment: $("#uploadImgsadd").next().children("input").val(),
            title: $("#add-title").val(),
            startTime: $("#startDate").val(),
            endTime: $("#activityTime").val(),
            enrollTime: $("#add-end-enroll").val(),
            activityArea: $("#add-activityArea").val(),
            huiyuanLimit: $("#add-numberLimit").val(),
            description: $("#writeSynopsis").html(),
            summary: "",
            projectId: projectId,
            initiatorId: user.id,
            createMemberScopeId: user.scopeId,
            approvalId: approvalId,
            checkStatus: checkStatus,
            scopeId: selectedScope,
            headMemberId: $("#select-member option:selected").val(),
            volunteerLimit: $("input[name='isRecruit']:checked").val(),
            version: 1,
            status: 1
        }),
        success: function (data1) {
            if (data1.status === 200) {
                bootAlert("添加成功");
                $(".right-main:nth-child(4) .l-title img").click();
            } else {
                bootAlert("添加失败");
            }
        },
        error: function () {
            bootAlert("服务器请求失败");
        }
    })
}

//编辑活动
function updateActivity1(id, checkStatus, approvalId) {
    selectedScope = [];
    $("#edit-area span").each(function () {
        if ($(this).attr("id")) {
            selectedScope.push($(this).attr("id").replace("select-area-", ""));
        }
    });
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: rootPath + "/api/updateActivity",
        dataType: "json",
        async: false,
        data: JSON.stringify({
            id: id,
            title: $("#edit-title").val(),
            attachment: $("#uploadImgsedit").next().children("input").val(),
            startTime: $("#startDate1").val(),
            endTime: $("#activityTime1").val(),
            enrollTime: $("#edit-end-enroll").val(),
            headMemberId: $(".editFZR").val(),
            activityArea: $("#edit-activityArea").val(),
            description: $("#editSynopsis").html(),
            huiyuanLimit: $("#edit-number-limit").val(),
            volunteerLimit: $("#edit input[name='isRecruit']:checked").val(),
            scopeId: selectedScope,
            approvalId: approvalId,
            checkStatus: checkStatus,
        }),
        success: function (data1) {
            if (data1.status === 200) {
                bootAlert("修改成功");
                $("#edit .l-title img").click();
            } else {
                bootAlert("修改失败");
            }
        },
        error: function () {
            bootAlert("服务器请求失败");
        }
    })
}

function updateActivity2(id) {
    var summaryImage = "";
    $(".summarize>div").each(function () {
        if ($(this).attr(id) !== "uploadImgs" && $(this).children("input").val() !== undefined) {
            summaryImage += $(this).children("input").val() + ";";
        }
    })
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: rootPath + "/api/updateActivity",
        dataType: "json",
        async: false,
        data: JSON.stringify({
            id: id,
            summary: $("#describe").html(),
            summaryImage: summaryImage
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

//删除活动
function deleteActivity(id) {
    $.ajax({
        type: "POST",
        url: rootPath + "/api/deleteActivity",
        dataType: "json",
        data: {
            id: id
        },
        success: function (data1) {
            if (data1.status === 200) {
                bootAlert("删除成功");
                $("#edit .l-title img").click();
            } else {
                bootAlert("删除失败");
            }
        },
        error: function () {
            bootAlert("服务器请求失败");
        }
    })
}

//编辑志愿者状态
function updateVolunteer(huiyuanId, activityId, volunteerStatus) {
    $.ajax({
        type: "POST",
        url: rootPath + "/api/updateActivityVolunteer",
        dataType: "json",
        data: {
            huiyuanId: parseInt(huiyuanId),
            activityId: parseInt(activityId),
            volunteerStatus: volunteerStatus
        },
        success: function (data1) {
            if (data1.status === 200) {
            } else {
                bootAlert("修改失败");
            }
        },
        error: function () {
            bootAlert("服务器请求失败");
        }
    })
}

function updateAcitivityIsFiled(id, isFiled, dataTable) {
    $.ajax({
        type: "POST",
        url: rootPath + "/api/updateActivityFiled",
        dataType: "json",
        data: {
            id: id,
            isFiled: isFiled
        },
        success: function (data1) {
            if (data1.status === 200) {
                // bootAlert("修改成功");
                reloadAjax(dataTable);
            } else {
                bootAlert("修改失败");
            }
        },
        error: function () {
            bootAlert("服务器请求失败");
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

function listOrganization() {
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
                    organizationList.push(data.data[i]);
                    if (data.data[i].id === user.organizationId) {
                        organizationParent = data.data[i].parentOrganizationId;
                    }
                }
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
    $("#area-select,#area-select-gd").html(html);
    $("#area-select,#area-select-gd").select("val", "");
    $("#area-select,#area-select-gd").val(0).trigger("change");
    $("#street-select,#street-select-gd").attr("disabled", "disabled");
    $("#shequ-select,#shequ-select-gd").attr("disabled", "disabled");
}

function listMember() {
    $.ajax({
        type: "GET",
        url: rootPath + "/api/listAllMember",
        dataType: "json",
        data: {},
        success: function (data) {
            if (data.status === 200) {
                for (var i = 0; i < data.data.length; i++) {
                    if (data.data[i].organizationId === user.organizationId)
                        memberList.push(data.data[i]);
                }
                listQueryMember();
            }
        },
        error: function () {
            bootAlert("服务器请求失败", 0);
        }
    })
}

function listQueryMember() {
    var html = "<option value='-1'>请选择负责人</option>";
    for (var i = 0; i < memberList.length; ++i) {
        html += "<option value='" + memberList[i].id + "'>" + memberList[i].name + "</option>\n";
    }
    $(".editFZR").html(html);
    $("#select-member").html(html)
}

function getAllProject() {
    $.ajax({
        type: "GET",
        url: rootPath + "/api/getAllProject",
        dataType: "json",
        async: false,
        data: {},
        success: function (data) {
            if (data.status === 200) {
                for (var i = 0; i < data.data.length; i++) {
                    allProjectMap[data.data[i].name] = data.data[i].description;
                    $(".left li:nth-child(1) a").click()
                }
            }
        },
        error: function () {
            bootAlert("服务器请求失败")
        }
    })
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

function packageImages() {

    var imgs = $("#read-zongjie-img>div>img");

    var imgsSrc = [];
    var imgsName = [];
    var imgBase64 = [];
    var imageSuffix = [];//图片后缀
    var zip = new JSZip();
    var img = zip.folder($("#read-title").html());

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
                    saveAs(content, $("#read-title").html() + ".zip");
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