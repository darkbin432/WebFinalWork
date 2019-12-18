/**
 * 	Overall version 1.6
 * 	This version 1.6
 */

var version = 1.1;
var jgMap = {};
var scopeMap = {};

jQuery(function ($) {

    listScope();
    listAlljgList();

	var datTableInitApproval = {
		"bServerSide": true,
		"processing": true,
		"sScrollX": "100%",
		//表格的宽度
		"sScrollY": "auto",
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
	datTableInitApproval["sAjaxSource"] = rootPath + '/api/selectApproval';
	// 设置字段数据源
	datTableInitApproval["aoColumns"] = [
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
	datTableInitApproval["aoColumnDefs"] = [
		{
			"aTargets": [0], "mRender": function (data, type, row, meta) {
				return "<div class='table-name' id='" + row.createMemberId + "' name='" + row.createMemberUsername + "'><div>" + row.createMemberName + "</div></div>";
			}
		},
		{
			"aTargets": [1], "mRender": function (data, type, row, meta) {
				return "<div class='table-title'><div>" + row.title + "</div></div>"
			}
		},
		{
			"aTargets": [2], "mRender": function (data, type, row, meta) {
				return "<div class='table-data'><div>" + row.createdTime + "</div></div>"
			}
		},
		{
			"aTargets": [3], "mRender": function (data, type, row, meta) {
				var html = '<div class="table-operate" id="' + row.id + '"><a class="toPass">通过</a><div></div><a style="color: #fb2020;" class="toRefuse">拒绝</a></div>';
				return html;
			}
		},

	];

	datTableInitApproval["fnServerData"] = function (sSource, aoData, fnCallback) {
		$.ajax({
			"type": 'get',
			"url": sSource,
			"dataType": "json",
			"data": {//查询条件写这里
				//dataTable固定参数
				aoData: JSON.stringify(aoData),
				// 选填参数
				// search: searchText
				approvalId: user.organizationId,
				userType: user.type,
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
	var dataInfoTableApproval= $("#approval-table").dataTable(datTableInitApproval).api();

	var datTableInitHasApproval = {
		"bServerSide": true,
		"processing": true,
		"sScrollX": "100%",
		//表格的宽度
		"sScrollY": "auto",
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
	datTableInitHasApproval["sAjaxSource"] = rootPath + '/api/getActivityApprovalRecord';
	// 设置字段数据源
	datTableInitHasApproval["aoColumns"] = [
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
	datTableInitHasApproval["aoColumnDefs"] = [
		{
			"aTargets": [0], "mRender": function (data, type, row, meta) {
				return "<div class='table-name' id='" + row.createMemberId + "'><div>" + row.createMemberName + "</div></div>";
			}
		},
		{
			"aTargets": [1], "mRender": function (data, type, row, meta) {
				return "<div class='table-title'><div>" + row.title + "</div></div>"
			}
		},
		{
			"aTargets": [2], "mRender": function (data, type, row, meta) {
				return "<div class='table-data'><div>" + row.createdTime + "</div></div>"
			}
		},
		{
			"aTargets": [3], "mRender": function (data, type, row, meta) {
				var html = "";
				if (row.result === 1){
					html = '<div class="table-tip" style="color: #1890ff;"><span style="background: #1890ff"></span>已通过</div>';
				}else{
					html = '<div class="table-tip" style="color: #fb2020;"><span style="background: #fb2020"></span>已拒绝</div>'
				}
				return html;
			}
		},

	];

	datTableInitHasApproval["fnServerData"] = function (sSource, aoData, fnCallback) {
		$.ajax({
			"type": 'get',
			"url": sSource,
			"dataType": "json",
			"data": {//查询条件写这里
				//dataTable固定参数
				aoData: JSON.stringify(aoData),
				// 选填参数
				// search: searchText
				approvalId: user.id,
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
	var dataInfoTableHasApproval= $("#shenpi-table").dataTable(datTableInitHasApproval).api();

	function reloadAjax(ajaxTable) {
		ajaxTable.ajax.reload(false);
	}

	//活动审批表切换
	$(".right-main .approval-tables ul li").click(function () {
		if ($(this).index() == 0){
			reloadAjax(dataInfoTableApproval);
			$(".right-main .s-title").html("我的审批/待审批")
			$(this).addClass("approval-table-selected-li");
			$(".right-main .approval-tables ul li:nth-child(2)").removeClass("approval-table-selected-li");
			$(".right-main .approval-table").eq(0).removeClass("hidden");
			$(".right-main .approval-table").eq(1).addClass("hidden");
		}else{
			reloadAjax(dataInfoTableHasApproval);
			$(".right-main .s-title").html("我的审批/审批记录")
			$(this).addClass("approval-table-selected-li");
			$(".right-main .approval-tables ul li:nth-child(1)").removeClass("approval-table-selected-li");
			$(".right-main .approval-table").eq(1).removeClass("hidden");
			$(".right-main .approval-table").eq(0).addClass("hidden");
		}
	})

    //活动审批操作
    $(".right-main .approval-table tbody").on('click','tr td a',function () {
        var id = $(this).parent().attr("id");
        var username = $(this).parent().parent().parent().children("td:nth-child(1)").children("div").attr("name");
        var title = $(this).parent().parent().parent().children("td:nth-child(2)").children("div").children().html();
        var date = $(this).parent().parent().parent().children("td:nth-child(3)").children("div").children().html();
        var a = $(this);
        if ($(this).attr("class") === "toPass"){
            $.ajax({
                type: "POST",
                url: rootPath + "/api/updateActivityCheckStatus",
                dataType: "json",
                async: false,
                data: {
                    id: id,
                    checkStatus: 1,
                },
                success: function (data) {
                    if (data.status === 200) {
                        a.parent().parent().html('<div class="table-tip" id="' + id + '" style="color: #1890ff;"><span style="background: #1890ff"></span>已通过</div>');
                        addApprovalRecord(id,1);
                        var mailContent = "您于" + date + "申请审批的主题：" + title + " 的活动，经过" + jgMap[user.organizationId].name
                            + "的管理员" + user.name + "审批，审批结果为： 通过";
                        sendMail(username + ";","活动审批结果通知",mailContent,null,null,null);
                    }
                },
                error: function () {
                    bootAlert("服务器请求失败");
                }
            })
        }else if ($(this).attr("class") === "toRefuse"){
            bootbox.prompt({
                title:"拒绝理由",
                inputType:"textarea",
                callback: function (result) {
                    if(result) {
                        $.ajax({
                            type: "POST",
                            url: rootPath + "/api/updateActivityCheckStatus",
                            dataType: "json",
                            async: false,
                            data: {
                                id: id,
                                checkStatus: 2,
                            },
                            success: function (data) {
                                if (data.status === 200) {
                                    a.parent().parent().html('<div class="table-tip" id="' + id + '" style="color: #fb2020;"><span style="background: #fb2020"></span>已拒绝</div>');
                                    addApprovalRecord(id,0);
                                    var mailContent = "您于" + date + "申请审批的主题：" + title + " 的活动，经过" + jgMap[user.organizationId].name
                                        + "的管理员" + user.name + "审批，审批结果为： 未通过。\n拒绝理由：" + result;
                                    sendMail(username + ";","活动审批结果通知",mailContent,null,null,null);
                                    $("#approval-info").css("display","none")
                                }
                            },
                            error: function () {
                                bootAlert("服务器请求失败");
                            }
                        })
                    } else {
                    }
                }
            });
        }
    })

    //活动信息弹窗
    $("#approval-table tbody").on('click','tr td',function () {
        var id = $(this).parent().children("td:nth-child(4)").children("div").attr("id");
        if ($(this).index() != 3) {
            if ($(this).parent().children("td:nth-child(4)").children("div").children("a").length === 0){
                $("#approval-info .main-button").addClass("hidden")
                $("#approval-info .danger-button").addClass("hidden")
            }else{
                $("#approval-info .main-button").removeClass("hidden")
                $("#approval-info .danger-button").removeClass("hidden")
            }
            $("#approval-info .pop-buttons").attr("id",$(this).parent().index());
            $.ajax({
                type: "GET",
                url: rootPath + "/api/getActivity",
                dataType: "json",
                async: false,
                data: {
                    id: id,
                },
                success: function (data) {
                    if (data.status === 200) {
                        $("#aititle").html(data.data.title)
						if (data.data.scopeId != null){
							var html = "";
							for (var i = 0; i < data.data.scopeId.length; i++){
								html += scopeMap[data.data.scopeId[i]] + " ";
							}
							$("#aiscope").html(html)
						}
						$("#aiaddress").html(data.data.activityArea)
                        $("#aistartTime").html(data.data.startTime)
						$("#aiendTime").html(data.data.endTime)
						$("#aiendEnroll").html(data.data.enrollTime)
                        $("#aiheadmember").html(data.data.headMemberName)
                        $("#aihuiyuanlimit").html(data.data.huiyuanLimit)
						if (data.data.volunteerLimit == 0){
							$("#aivolunteerlimit").html("否")
						}else{
							$("#aivolunteerlimit").html("是")
						}
                        $("#aidescription").html(getSimpleText(data.data.description))
                        $("#approval-info").css("display","block")
                    }
                },
                error: function () {

                }
            })
        }
    })

    //申请弹窗通过
    $("#approval-info .main-button").click(function () {
        $("#approval-table tbody tr").eq($(this).parent().attr("id")).children("td:nth-child(4)").children("div").children(".toPass").click();
        $("#approval-info").css("display","none")
    })

    //申请弹窗拒绝
    $("#approval-info .danger-button").click(function () {
        $("#approval-table tbody tr").eq($(this).parent().attr("id")).children("td:nth-child(4)").children("div").children(".toRefuse").click();
    })

    //关闭活动信息弹窗
    $(".approval-info-title img").click(function () {
        $("#approval-info").css("display","none")
    })

});
//提取文字
function getSimpleText(html) {
	var re1 = new RegExp("<.+?>", "g");
	var msg = html.replace(re1, '');
	return msg;
}

function addApprovalRecord(id,result) {
    $.ajax({
        type: "POST",
        url: rootPath + "/api/insertActivityRecord",
        dataType: "json",
        data: {
            activityId: id,
            approvalId: user.id,
            approvalName: user.name,
            result: result,
            version: version,
        },
        success: function (data) {

        },
        error: function () {
            bootAlert("服务器请求失败");
        }
    })
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
        },
        error: function () {
            bootAlert("服务器请求失败", 0);
        }
    })
}

//获得所有机构信息
function listAlljgList() {
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
                for (var i = 0; i < data.data.length; i++){
                    jgMap[data.data[i].id] = data.data[i];
                }
            }
        },
        error: function () {
            bootAlert("服务器请求失败")
        }
    })
}

function listScope(){
    $.ajax({
        type: "GET",
        url: rootPath + "/api/listScope",
        dataType: "json",
        async: false,
        data: {},
        success: function (data) {
            for (var i = 0; i < data.data.length; i++) {
                scopeMap[data.data[i].scopeId] = data.data[i].name;
            }
        },
        error: function () {
            bootAlert("服务器请求失败");
        }
    })
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
