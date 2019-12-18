/**
 * @author kzn
 */

/**
 * 	Overall version 1.6
 * 	This version 1.6
*/

var version = "1.0";
var scopeMap = {};
var scopeList = [];
var politicals = ["群众","党员"];
var serviceTypes = ["失独人群","育龄家庭","青少年"];
var hobbys = ["宣传教育","业务培训","健康服务","青春健康","权益服务","计生家庭帮扶","流动人口服务","其他"];
var selectHuiyuanId;
var selectAsVolunteer;
var isVolunteer = null;
var selectQueryScopeId;
var selectEditScopeId;
var birthday = 0;
var medical = 0;

jQuery(
	function ($) {

		if (user.type === 0){
			$(".right-main:nth-child(1) .huiyuan-buttons .main-button").addClass("hidden")
		}else{
			$(".right-main:nth-child(1) .huiyuan-buttons .main-button").removeClass("hidden")
		}

		listScope();
		setQueryLocation();
		setEditLocation()

		function reloadAjax(ajaxTable) {
			ajaxTable.ajax.reload(false);
		}

		//顶部导航切换
		$(".myHeader ul li").eq(2).addClass("current-li");
		$(".myHeader ul li").eq(2).children("div").addClass("current-div");
		//左侧点击
		$(".left").on('click', 'li a', function () {
			$(".left li a").removeClass("selected-li");
			$(this).addClass("selected-li");
			$(".right-main").addClass("hidden");
			$(".right-main").eq($(this).parent().index()).removeClass("hidden");
			if ($(this).parent().index() === 0) {
				reloadAjax(dataInfoTableHuiyuan);
			} else {
				reloadAjax(dataInfoTableVolunteer);
			}
		});
		//选择框初始化
		$(".area-select").select2({
			placeholder:"--地区名称--",
			minimumResultsForSearch: -1,
		});
		$(".street-select").select2({
			placeholder:"--街道名称--",
			minimumResultsForSearch: -1,
		});
		$(".shequ-select").select2({
			placeholder:"--社区名称--",
			minimumResultsForSearch: -1,
		});
		$(".volunteer-area-select").select2({
			placeholder:"--地区名称--",
			minimumResultsForSearch: -1,
		});
		$(".volunteer-street-select").select2({
			placeholder:"--街道名称--",
			minimumResultsForSearch: -1,
		});
		$(".volunteer-shequ-select").select2({
			placeholder:"--社区名称--",
			minimumResultsForSearch: -1,
		});
		$(".location-qu").select2({
			minimumResultsForSearch: -1,
		});
		$(".location-jiedao").select2({
			minimumResultsForSearch: -1,
		});
		$(".location-shequ").select2({
			minimumResultsForSearch: -1,
		});
		$(".political").select2({
			minimumResultsForSearch: -1,
		});
		$(".huiyuanType").select2({
			minimumResultsForSearch: -1,
		});
		$(".serviceType").select2({
			minimumResultsForSearch: -1,
			multiple: true,
		});
		//表格
		var datTableInitHuiyuan = {
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
		datTableInitHuiyuan["sAjaxSource"] = rootPath + '/api/selectAllHuiyuan';
		// 设置字段数据源
		datTableInitHuiyuan["aoColumns"] = [
			{
				"data": "id"
			},
			{
				"data": "name"
			},
			{
				"data": "sex"
			},
			{
				"data": "cardNo"
			},
			{
				"data": "scopeId"
			},
			{
				"data": "mobile"
			},
			{
				"data": "id"
			},
		];
		// 渲染字段数据源
		datTableInitHuiyuan["aoColumnDefs"] = [
			{
				"aTargets": [0], "mRender": function (data, type, row, meta) {
					return "<div id='" + row.id + "'>" + (meta.row + 1 + meta.settings._iDisplayStart) + "</div>";
				}
			},
			{
				"aTargets": [1], "mRender": function (data, type, row, meta) {
					return "<div class='table-title1'><div>" + row.name + "</div></div>";
				}
			},
			{
				"aTargets": [2], "mRender": function (data, type, row, meta) {
					if (medical == 0){
						if (row.sex === 1){
							return "<div class='table-data'>男</div>";
						}else{
							return "<div class='table-data'>女</div>";
						}
					}else{
						var cardNo = row.cardNo;
						if (user.scopeId == 0){
							cardNo = row.cardNo;
						}else if (user.scopeId % 10000 == 0){
							if (parseInt(row.scopeId / 10000) != parseInt(user.scopeId / 10000)){
								cardNo = hideCardNo(row.cardNo);
							}
						}else if (user.scopeId % 100 == 0){
							if (parseInt(row.scopeId / 100) != parseInt(user.scopeId / 100)){
								cardNo = hideCardNo(row.cardNo);
							}
						}else{
							if (user.scopeId != row.scopeId){
								cardNo = hideCardNo(row.cardNo);
							}
						}
						return cardNo;  //为观察高级搜索效果，暂时不隐藏身份证号
					}
				}
			},
			{
				"aTargets": [3], "mRender": function (data, type, row, meta) {
					if (medical == 0){
						var cardNo = row.cardNo;
						if (user.scopeId == 0){
							cardNo = row.cardNo;
						}else if (user.scopeId % 10000 == 0){
							if (parseInt(row.scopeId / 10000) != parseInt(user.scopeId / 10000)){
								cardNo = hideCardNo(row.cardNo);
							}
						}else if (user.scopeId % 100 == 0){
							if (parseInt(row.scopeId / 100) != parseInt(user.scopeId / 100)){
								cardNo = hideCardNo(row.cardNo);
							}
						}else{
							if (user.scopeId != row.scopeId){
								cardNo = hideCardNo(row.cardNo);
							}
						}
						return "<div class='table-data'>" + cardNo + "</div>";
					}else{
						return  "<div class='hospital-name'><div>" + row.insititutionName + "</div></div>" ;
					}
				}
			},
			{
				"aTargets": [4], "mRender": function (data, type, row, meta) {
					if (medical == 0){
						return "<div class='table-name'><div>" + scopeMap[row.scopeId - row.scopeId % 10000] + scopeMap[row.scopeId - row.scopeId % 100] + scopeMap[row.scopeId] + "</div></div>";
					}else{
						return row.jiuzhenDate;
					}
				}
			},
			{
				"aTargets": [5], "mRender": function (data, type, row, meta) {
					return row.mobile;
				}
			},
			{
				"aTargets": [6], "mRender": function (data, type, row, meta) {
					var html = "";
					if (user.type === 1){
						html = '<div class="table-operate"><a class="toEdit">编辑</a><div></div><a style="color: #fb2020;" class="toDelete">删除</a></div>'
					}else{
						html = '<div class="table-operate"><a class="toRead">查看</a>'
					}
					return html;
				}
			},
		];

		datTableInitHuiyuan["fnServerData"] = function (sSource, aoData, fnCallback) {
			var scopeId=0;
			if($(".right-main:nth-child(1) .query-terms .shequ-select").val()!="")
				scopeId=$(".right-main:nth-child(1) .query-terms .shequ-select").val();
			if (medical != 0){
				$("#xb-sfzh").html("身份证号")
				$("#sfzh-jzyy").html("就诊医院")
				$("#szqy-jzsj").html("最近一次就诊时间")
			}else{
				$("#xb-sfzh").html("性别")
				$("#sfzh-jzyy").html("身份证号")
				$("#szqy-jzsj").html("所在区域")
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
					scopeId: scopeId,
					userScope: user.scopeId,
					huiyuanName: $(".right-main:nth-child(1) .query-terms .normal-input").val(),
					volunteerStatus: isVolunteer,
					birthday: birthday,
					medical: medical,
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
		var dataInfoTableHuiyuan = $("#huiyuan-table").dataTable(datTableInitHuiyuan).api();

		var datTableInitHuiyuanInfo = {
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
		datTableInitHuiyuanInfo["sAjaxSource"] = rootPath + '/api/getActivitiesByHuiyuan';
		// 设置字段数据源
		datTableInitHuiyuanInfo["aoColumns"] = [
			{
				"data": "id"
			},
			{
				"data": "title"
			},
			{
				"data": "activityScope"
			},
			{
				"data": "startTime"
			},
		];
		// 渲染字段数据源
		datTableInitHuiyuanInfo["aoColumnDefs"] = [
			{
				"aTargets": [0], "mRender": function (data, type, row, meta) {
					return meta.row + 1 + meta.settings._iDisplayStart;
				}
			},
			{
				"aTargets": [1], "mRender": function (data, type, row, meta) {
					return "<div class='table-title'>" + row.title + "</div>";
				}
			},
			{
				"aTargets": [2], "mRender": function (data, type, row, meta) {
					return "<div class='table-name'>" + row.activityScope + "...</div>";
				}
			},
			{
				"aTargets": [3], "mRender": function (data, type, row, meta) {
					return "<div class='table-data'>" + row.startTime + " - " + row.endTime + "</div>";
				}
			},
		];

		datTableInitHuiyuanInfo["fnServerData"] = function (sSource, aoData, fnCallback) {
			$.ajax({
				"type": 'post',
				"url": sSource,
				"dataType": "json",
				"data": {//查询条件写这里
					//dataTable固定参数
					aoData: JSON.stringify(aoData),
					// 选填参数
					// search: searchText
					id: selectHuiyuanId,
					volunteerStatus: selectAsVolunteer,
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
		var dataInfoTableHuiyuanInfo = $("#huiyuan-info-table").dataTable(datTableInitHuiyuanInfo).api();

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
		datTableInitVolunteer["sAjaxSource"] = rootPath + '/api/selectAllHuiyuan';
		// 设置字段数据源
		datTableInitVolunteer["aoColumns"] = [
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
			{
				"data": "id"
			},
			{
				"data": "id"
			},
		];
		// 渲染字段数据源
		datTableInitVolunteer["aoColumnDefs"] = [
			{
				"aTargets": [0], "mRender": function (data, type, row, meta) {
					return "<div id='" + row.id + "'>" + (meta.row + 1 + meta.settings._iDisplayStart) + "</div>";
				}
			},
			{
				"aTargets": [1], "mRender": function (data, type, row, meta) {
					return "<div class='table-title'><div>" + row.name + "</div></div>";
				}
			},
			{
				"aTargets": [2], "mRender": function (data, type, row, meta) {
					if (row.sex === 1){
						return "<div class='table-data'>男</div>";
					}else{
						return "<div class='table-data'>女</div>";
					}
				}
			},
			{
				"aTargets": [3], "mRender": function (data, type, row, meta) {
					return "<div class='table-data'>" + row.mobile + "</div>";
				}
			},
			{
				"aTargets": [4], "mRender": function (data, type, row, meta) {
					var cardNo = row.cardNo;
					if (user.scopeId == 0){
						cardNo = row.cardNo;
					}else if (user.scopeId % 10000 == 0){
						if (parseInt(row.scopeId / 10000) != parseInt(user.scopeId / 10000)){
							cardNo = hideCardNo(row.cardNo);
						}
					}else if (user.scopeId % 100 == 0){
						if (parseInt(row.scopeId / 100) != parseInt(user.scopeId / 100)){
							cardNo = hideCardNo(row.cardNo);
						}
					}else{
						if (user.scopeId != row.scopeId){
							cardNo = hideCardNo(row.cardNo);
						}
					}
					return "<div class='table-data'>" + cardNo + "</div>";
				}
			},
			{
				"aTargets": [5], "mRender": function (data, type, row, meta) {
					return "<div class='table-name'><div>" + scopeMap[row.scopeId - row.scopeId % 10000] + scopeMap[row.scopeId - row.scopeId % 100] + scopeMap[row.scopeId] + "</div></div>";
				}
			},
		];

		datTableInitVolunteer["fnServerData"] = function (sSource, aoData, fnCallback) {
			var scopeId=0;
			if($(".right-main:nth-child(2) .query-terms .volunteer-shequ-select").val()!="")
				scopeId=$(".right-main:nth-child(2) .query-terms .volunteer-shequ-select").val();
			$.ajax({
				"type": 'get',
				"url": sSource,
				"dataType": "json",
				"data": {//查询条件写这里
					//dataTable固定参数
					aoData: JSON.stringify(aoData),
					// 选填参数
					// search: searchText
					scopeId: scopeId,
					userScope: user.scopeId,
					huiyuanName: $(".right-main:nth-child(2) .query-terms .normal-input").val(),
					volunteerStatus: 1,
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

		var datTableInitShenpi = {
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
		datTableInitShenpi["sAjaxSource"] = rootPath + '/api/getVolunteerApprovalRecord';
		// 设置字段数据源
		datTableInitShenpi["aoColumns"] = [
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
			{
				"data": "id"
			},
			{
				"data": "id"
			},
		];
		// 渲染字段数据源
		datTableInitShenpi["aoColumnDefs"] = [
			{
				"aTargets": [0], "mRender": function (data, type, row, meta) {
					return "<div id='" + row.id + "'>" + (meta.row + 1 + meta.settings._iDisplayStart) + "</div>";
				}
			},
			{
				"aTargets": [1], "mRender": function (data, type, row, meta) {
					return "<div class='table-title'><div>" + row.name + "</div></div>";
				}
			},
			{
				"aTargets": [2], "mRender": function (data, type, row, meta) {
					return "<div class='table-data'>" + row.createdTime + "</div>";
				}
			},
			{
				"aTargets": [3], "mRender": function (data, type, row, meta) {
					return "<div class='table-data'>" + row.updatedTime + "</div>";
				}
			},
			{
				"aTargets": [4], "mRender": function (data, type, row, meta) {
					return "<div class='table-data'>" + row.mobile + "</div>";
				}
			},
			{
				"aTargets": [5], "mRender": function (data, type, row, meta) {
					var cardNo = row.cardNo;
					if (user.scopeId == 0){
						cardNo = row.cardNo;
					}else if (user.scopeId % 10000 == 0){
						if (parseInt(row.scopeId / 10000) != parseInt(user.scopeId / 10000)){
							cardNo = hideCardNo(row.cardNo);
						}
					}else if (user.scopeId % 100 == 0){
						if (parseInt(row.scopeId / 100) != parseInt(user.scopeId / 100)){
							cardNo = hideCardNo(row.cardNo);
						}
					}else{
						if (user.scopeId != row.scopeId){
							cardNo = hideCardNo(row.cardNo);
						}
					}
					return "<div class='table-data'>" + cardNo + "</div>";
				}
			},
			{
				"aTargets": [6], "mRender": function (data, type, row, meta) {
					var html = "";
					if (row.result === 1){
						html = '<div class="table-tip" style="color: #1890ff;"><span style="background: #1890ff"></span>已通过</div>';
					}else{
						html = '<div class="table-tip" style="color: #fb2020;"><span style="background: #fb2020"></span>已拒绝</div>';
					}
					return html;
				}
			},
		];

		datTableInitShenpi["fnServerData"] = function (sSource, aoData, fnCallback) {
			$.ajax({
				"type": 'get',
				"url": sSource,
				"dataType": "json",
				"data": {//查询条件写这里
					//dataTable固定参数
					aoData: JSON.stringify(aoData),
					// 选填参数
					// search: searchText
					id: user.id,
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
		var dataInfoTableShenpi = $("#shenpi-table").dataTable(datTableInitShenpi).api();

		//会员列表查询条件select操作
		$(".right-main:nth-child(1) .query-terms .area-select").on('change',function () {
			selectQueryScopeId = parseInt($(this).val());
			var html = "<option></option>\n";
			if (selectQueryScopeId !== 0){
				html = "<option value='" + selectQueryScopeId + "'>&nbsp;</option>\n";
				for (var i = 0; i < scopeList.length; i++){
					if (scopeList[i].scopeId !== selectQueryScopeId && scopeList[i].scopeId - (scopeList[i].scopeId % 10000) === selectQueryScopeId  && scopeList[i].scopeId % 100 === 0){
						html += "<option value='" + scopeList[i].scopeId + "'>" + scopeList[i].name + "</option>\n";
					}
				}
			}
			$(".right-main:nth-child(1) .query-terms .street-select").html(html);
			$(".right-main:nth-child(1) .query-terms .street-select").select2("val","");
			$(".right-main:nth-child(1) .query-terms .street-select").val($(this).val()).trigger("change");
			if(selectQueryScopeId==0){
				$(".right-main:nth-child(1) .query-terms .street-select").attr("disabled","disabled");
				$(".right-main:nth-child(1) .query-terms .shequ-select").attr("disabled","disabled");
			}else{
				$(".right-main:nth-child(1) .query-terms .street-select").removeAttr("disabled");
				$(".right-main:nth-child(1) .query-terms .shequ-select").removeAttr("disabled");
			}
		})
		$(".right-main:nth-child(1) .query-terms .street-select").on('change',function () {
			var html = "<option></option>\n";
			if($(this).val()!=null){
				selectQueryScopeId = parseInt($(this).val());
				if (selectQueryScopeId != 0){
					html = "<option value='" + selectQueryScopeId + "'>&nbsp;</option>\n";
					for (var i = 0; i < scopeList.length; i++){
						if (scopeList[i].scopeId !== selectQueryScopeId && scopeList[i].scopeId - (scopeList[i].scopeId % 100) === selectQueryScopeId){
							html += "<option value='" + scopeList[i].scopeId + "'>" + scopeList[i].name + "</option>\n";
						}
					}
				}
			}

			$(".right-main:nth-child(1) .query-terms .shequ-select").html(html)
			$(".right-main:nth-child(1) .query-terms .shequ-select").select2("val","");
			$(".right-main:nth-child(1) .query-terms .shequ-select").val($(this).val()).trigger("change")
		})
		$(".right-main:nth-child(2) .query-terms .volunteer-area-select").on('change',function () {
			selectQueryScopeId = parseInt($(this).val());
			var html = "<option></option>\n";
			if (selectQueryScopeId !== 0){
				html = "<option value='" + selectQueryScopeId + "'>&nbsp;</option>\n";
				for (var i = 0; i < scopeList.length; i++){
					if (scopeList[i].scopeId !== selectQueryScopeId && scopeList[i].scopeId - (scopeList[i].scopeId % 10000) === selectQueryScopeId  && scopeList[i].scopeId % 100 === 0){
						html += "<option value='" + scopeList[i].scopeId + "'>" + scopeList[i].name + "</option>\n";
					}
				}
			}
			$(".right-main:nth-child(2) .query-terms .volunteer-street-select").html(html);
			$(".right-main:nth-child(2) .query-terms .volunteer-street-select").select2("val","");
			$(".right-main:nth-child(2) .query-terms .volunteer-street-select").val($(this).val()).trigger("change");
			if(selectQueryScopeId==0){
				$(".right-main:nth-child(2) .query-terms .volunteer-street-select").attr("disabled","disabled");
				$(".right-main:nth-child(2) .query-terms .volunteer-shequ-select").attr("disabled","disabled");
			}else{
				$(".right-main:nth-child(2) .query-terms .volunteer-street-select").removeAttr("disabled");
				$(".right-main:nth-child(2) .query-terms .volunteer-shequ-select").removeAttr("disabled");
			}
		})
		$(".right-main:nth-child(2) .query-terms .volunteer-street-select").on('change',function () {
			var html = "<option></option>\n";
			if($(this).val()!=null){
				selectQueryScopeId = parseInt($(this).val());
				if (selectQueryScopeId != 0){
					html = "<option value='" + selectQueryScopeId + "'>&nbsp;</option>\n";
					for (var i = 0; i < scopeList.length; i++){
						if (scopeList[i].scopeId !== selectQueryScopeId && scopeList[i].scopeId - (scopeList[i].scopeId % 100) === selectQueryScopeId){
							html += "<option value='" + scopeList[i].scopeId + "'>" + scopeList[i].name + "</option>\n";
						}
					}
				}
			}

			$(".right-main:nth-child(2) .query-terms .volunteer-shequ-select").html(html)
			$(".right-main:nth-child(2) .query-terms .volunteer-shequ-select").select2("val","");
			$(".right-main:nth-child(2) .query-terms .volunteer-shequ-select").val($(this).val()).trigger("change")
		})

		//会员查询按钮
		$(".right-main:nth-child(1) .query-terms .main-button").click(function () {
			isVolunteer = $(".right-main:nth-child(1) input[name='isVolunteer']:checked").val();
			if ($(this).attr("class").indexOf("high") != -1){
				birthday = $("#birthday-search .search-select-button").val();
				medical = $("#medical-search .search-select-button").val();
			}else{
				birthday = 0;
				medical = 0;
			}
			reloadAjax(dataInfoTableHuiyuan);
		})

		//志愿者查询按钮
		$(".right-main:nth-child(2) .query-terms .main-button").click(function () {
			reloadAjax(dataInfoTableVolunteer);
		})

		//会员添加编辑页select操作
		$(".location-qu").on('change',function () {
			selectEditScopeId = parseInt($(this).val());
			var html = "";
			if (selectEditScopeId !== 0){
				for (var i = 0; i < scopeList.length; i++){
					if (scopeList[i].scopeId !== selectEditScopeId && scopeList[i].scopeId - (scopeList[i].scopeId % 10000) === selectEditScopeId && scopeList[i].scopeId % 100 === 0){
						html += "<option value='" + scopeList[i].scopeId + "'>" + scopeList[i].name + "</option>\n";
					}
				}
			}
			$(".location-jiedao").html(html)
			$(".location-jiedao").select2("val","");
			$(".location-jiedao").val("").trigger("change");
			$(".location-jiedao").next().removeClass("danger-select");
			$(".location-jiedao").parent().next().css("visibility", "hidden");
		})
		$(".location-jiedao").on('change',function () {
			selectEditScopeId = parseInt($(this).val());
			var html = "";
			if (selectEditScopeId !== 0){
				for (var i = 0; i < scopeList.length; i++){
					if (scopeList[i].scopeId !== selectEditScopeId && scopeList[i].scopeId - (scopeList[i].scopeId % 100) === selectEditScopeId){
						html += "<option value='" + scopeList[i].scopeId + "'>" + scopeList[i].name + "</option>\n";
					}
				}
			}
			$(".location-shequ").html(html)
			$(".location-shequ").select2("val","");
			$(".location-shequ").val("").trigger("change");
			$(".location-shequ").next().removeClass("danger-select");
			$(".location-shequ").parent().next().css("visibility", "hidden");
		})

		//添加按钮
		$(".right-main:nth-child(1) .huiyuan-buttons .main-button").click(function () {
			selectHuiyuanId = null;
			$(".right-main:nth-child(3) .l-title").html("<img src='" + rootPath + "/resources/icon/fanhui.png'>添加会员")
			$(".right-main:nth-child(3) .s-title").html("会员管理/添加会员")
			$(".right-main:nth-child(3) .huiyuan-main .headimg").html("<img src='" + rootPath + "/resources/icon/head.png'>\n")
			$(".uploadHead").html("上传")
			$(".huiyuanName").val("")
			$(".huiyuanName").removeClass("danger-input");
			$(".huiyuanName").parent().next().css("visibility", "hidden");
			$("#isMan1").prop("checked",false);
			$("#isMan2").prop("checked",false);
			$("#isMan1").parent().parent().parent().next().css("visibility", "hidden");
			$(".huiyuanPhone").val("")
			$(".huiyuanPhone").removeClass("danger-input");
			$(".huiyuanPhone").parent().next().css("visibility", "hidden");
			$(".huiyuanCardNo").val("")
			$(".huiyuanCardNo").removeClass("danger-input");
			$(".huiyuanCardNo").parent().next().css("visibility", "hidden");
			$(".huiyuanAddress").val("")
			$(".location-qu").select2("val","")
			$(".location-qu").next().removeClass("danger-select");
			$(".location-qu").parent().next().css("visibility", "hidden");
			$(".location-jiedao").select2("val","")
			$(".location-jiedao").next().removeClass("danger-select");
			$(".location-jiedao").parent().next().css("visibility", "hidden");
			$(".location-shequ").select2("val","")
			$(".location-shequ").next().removeClass("danger-select");
			$(".location-shequ").parent().next().css("visibility", "hidden");
			$(".political").select2("val","")
			$(".political").next().removeClass("danger-select");
			$(".political").parent().next().css("visibility", "hidden");
			$(".huiyuanType").select2("val","")
			$(".huiyuanType").next().removeClass("danger-select");
			$(".huiyuanType").parent().next().css("visibility", "hidden");
			$(".serviceType").select2("val","")
			$(".serviceType").next().removeClass("danger-select");
			$(".serviceType").parent().next().css("visibility", "hidden");
			$(".right-main").addClass("hidden");
			$(".right-main:nth-child(3)").removeClass("hidden");
		});

		//添加/更新会员
		$(".right-main:nth-child(3) .main-button").click(function () {
			var name = $(".huiyuanName").val()
			if (name === ""){
				$(".huiyuanName").addClass("danger-input");
				$(".huiyuanName").parent().next().css("visibility", "unset");
			}
			var sex = null;
			if ($("#isMan1").is(":checked")){
				sex = 1;
			}else if ($("#isMan2").is(":checked")){
				sex = 0;
			}
			if (sex === null){
				$("#isMan1").parent().parent().parent().next().css("visibility", "unset");
			}
			var mobile = $(".huiyuanPhone").val();
			if (mobile === ""){
				$(".huiyuanPhone").addClass("danger-input");
				$(".huiyuanPhone").parent().next().css("visibility", "unset");
			}
			var cardNo = $(".huiyuanCardNo").val();
			if (cardNo === ""){
				$(".huiyuanCardNo").addClass("danger-input");
				$(".huiyuanCardNo").parent().next().css("visibility", "unset");
			}
			var address = $(".huiyuanAddress").val();
			var scope = $(".location-shequ").val();
			if (scope === null){
				if ($(".location-qu").val() === null){
					$(".location-qu").next().addClass("danger-select");
					$(".location-qu").parent().next().css("visibility", "unset");
				}
				if ($(".location-jiedao").val() === null){
					$(".location-jiedao").next().addClass("danger-select");
					$(".location-jiedao").parent().next().css("visibility", "unset");
				}
				if ($(".location-shequ").val() === null){
					$(".location-shequ").next().addClass("danger-select");
					$(".location-shequ").parent().next().css("visibility", "unset");
				}
			}
			var political = $(".political").val();
			if (political === null){
				$(".political").next().addClass("danger-select");
				$(".political").parent().next().css("visibility", "unset");
			}
			var huiyuanType = $(".huiyuanType").val();
			if (huiyuanType === null){
				$(".huiyuanType").next().addClass("danger-select");
				$(".huiyuanType").parent().next().css("visibility", "unset");
			}
			var serviceType = "";
			var tmp = $(".serviceType").val();
			if (tmp !== null){
				for (var i = 0; i < tmp.length; i++){
					serviceType += tmp[i] + ";";
				}
			}
			var attachment = $(".headimg").attr("name");
			if (name !== "" && sex !== null && mobile!== "" && cardNo !== "" && scope !== null && political !== null && huiyuanType !== null){
				if (!isRealName(name)){
					bootAlert("姓名格式错误")
				}else if (!isPhone(mobile) && !isMobile(mobile)){
					bootAlert("联系电话格式错误")
				}else if (!isCardNo(cardNo)){
					bootAlert("身份证号码格式错误")
				}else if (address.length > 40){
					bootAlert("现居住址长度超出限制")
				}else{
					if (selectHuiyuanId === null){
						$.ajax({
							type: "POST",
							url: rootPath + "/api/insertHuiyuan",
							dataType: "json",
							data: {
								name: name,
								sex: sex,
								address: address,
								cardNo: cardNo,
								mobile: mobile,
								scopeId: scope,
								political: political,
								huiyuanType: huiyuanType,
								serviceType: serviceType,
								attachment: attachment,
							},
							success: function (data) {
								if (data.status === 200) {
									bootAlert("添加成功");
									reloadAjax(dataInfoTableHuiyuan);
									$(".right-main:nth-child(3) .normal-button").click();
								} else {
									bootAlert("添加失败");
								}
							},
							error: function () {
								bootAlert("服务器请求失败");
							}
						})
					}else{
						$.ajax({
							type: "POST",
							url: rootPath + "/api/updateHuiyuan",
							dataType: "json",
							data: {
								id: selectHuiyuanId,
								name: name,
								sex: sex,
								address: address,
								cardNo: cardNo,
								mobile: mobile,
								scopeId: scope,
								political: political,
								huiyuanType: huiyuanType,
								serviceType: serviceType,
								attachment: attachment,
							},
							success: function (data) {
								if (data.status === 200) {
									bootAlert("更新成功");
									reloadAjax(dataInfoTableHuiyuan);
									$(".right-main:nth-child(3) .normal-button").click();
								} else {
									bootAlert("更新失败");
								}
							},
							error: function () {
								bootAlert("服务器请求失败");
							}
						})
					}
				}
			}else{
				if (name === ""){
					$(".huiyuanName").focus();
				}else if (sex === null){
					$("#isMan1").focus();
					$('html,body').animate({scrollTop:100},'fast');
				}else if (mobile === ""){
					$(".huiyuanPhone").focus();
				}else if (cardNo === ""){
					$(".huiyuanCardNo").focus();
				}else if ($(".location-qu").val() === null){
					$(".location-qu").focus();
					$('html,body').animate({scrollTop:350},'fast');
				}else if ($(".location-jiedao").val() === null){
					$(".location-jiedao").focus();
					$('html,body').animate({scrollTop:400},'fast');
				}else if ($(".location-shequ").val() === null){
					$(".location-shequ").focus();
					$('html,body').animate({scrollTop:450},'fast');
				}else if (political === null){
					$(".political").focus();
					$('html,body').animate({scrollTop:550},'fast');
				}else if (huiyuanType === null){
					$(".huiyuanType").focus();
					$('html,body').animate({scrollTop:600},'fast');
				}
			}
		})

		//刷新按钮
		$(".right-main:nth-child(1) .huiyuan-buttons .normal-button").click(function () {
			reloadAjax(dataInfoTableHuiyuan);
		});
		//判断信息
		$(".huiyuanName,.huiyuanCardNo,.huiyuanPhone").blur(function () {
			if ($(this).val() === "") {
				$(this).addClass("danger-input");
				$(this).parent().next().css("visibility", "unset");
			}
		});
		$(".huiyuanName,.huiyuanCardNo,.huiyuanPhone").bind('input propertychange', function () {
			if ($(this).val() === "") {
				$(this).addClass("danger-input");
				$(this).parent().next().css("visibility", "unset");
			} else {
				$(this).removeClass("danger-input");
				$(this).parent().next().css("visibility", "hidden");
			}
		});
		$("#isMan1, #isMan2").click(function () {
			$(this).removeClass("danger-input");
			$(this).parent().parent().parent().next().css("visibility", "hidden");
		})
		$(".location-qu,.location-jiedao,.location-shequ,.political,.huiyuanType").parent().on("blur",'.select2-container', function () {
			if ($(this).prev().val() === null) {
				$(this).addClass("danger-select");
				$(this).parent().next().css("visibility", "unset");
			} else {
				$(this).removeClass("danger-select");
				$(this).parent().next().css("visibility", "hidden");
			}
		});
		$(".location-qu,.location-jiedao,.location-shequ,.political,.huiyuanType").on("focus", function () {
			if ($(this).next().hasClass("select2-container--open")) {
				$(this).next().removeClass("danger-select");
			}
		});
		$(".location-qu,.location-jiedao,.location-shequ,.political,.huiyuanType").on("change", function () {
			if ($(this).val() === null) {
				$(this).next().addClass("danger-select");
				$(this).parent().next().css("visibility", "unset");
			} else {
				$(this).next().removeClass("danger-select");
				$(this).parent().next().css("visibility", "hidden");
			}
		});
		//关闭添加编辑信息
		$(".right-main:nth-child(3) .l-title, .right-main:nth-child(4) .l-title").on('click','img',function () {
			$(".right-main").addClass("hidden");
			$(".right-main:nth-child(1)").removeClass("hidden");
		});
		$(".right-main:nth-child(3) .huiyuan-main-buttons .normal-button").click(function () {
			$(".right-main").addClass("hidden");
			$(".right-main:nth-child(1)").removeClass("hidden");
		})

		//编辑、查看和删除按钮
		$(".right-main:nth-child(1) #huiyuan-table tbody").on('click','tr td a',function () {
			var id = $(this).parent().parent().parent().children("td:nth-child(1)").children("div").attr("id");
			selectHuiyuanId = id;
			if ($(this).attr("class") === "toEdit"){
				$(".right-main:nth-child(3) .l-title").html("<img src='" + rootPath + "/resources/icon/fanhui.png'>编辑会员")
				$(".right-main:nth-child(3) .s-title").html("会员管理/编辑会员")
				$(".huiyuanName").val("")
				$(".huiyuanName").removeClass("danger-input");
				$(".huiyuanName").parent().next().css("visibility", "hidden");
				$("#isMan1").prop("checked",false);
				$("#isMan2").prop("checked",false);
				$("#isMan1").parent().parent().parent().next().css("visibility", "hidden");
				$(".huiyuanPhone").val("")
				$(".huiyuanPhone").removeClass("danger-input");
				$(".huiyuanPhone").parent().next().css("visibility", "hidden");
				$(".huiyuanCardNo").val("")
				$(".huiyuanCardNo").removeClass("danger-input");
				$(".huiyuanCardNo").parent().next().css("visibility", "hidden");
				$(".huiyuanAddress").val("")
				$(".location-qu").select2("val","")
				$(".location-qu").next().removeClass("danger-select");
				$(".location-qu").parent().next().css("visibility", "hidden");
				$(".location-jiedao").select2("val","")
				$(".location-jiedao").next().removeClass("danger-select");
				$(".location-jiedao").parent().next().css("visibility", "hidden");
				$(".location-shequ").select2("val","")
				$(".location-shequ").next().removeClass("danger-select");
				$(".location-shequ").parent().next().css("visibility", "hidden");
				$(".political").select2("val","")
				$(".political").next().removeClass("danger-select");
				$(".political").parent().next().css("visibility", "hidden");
				$(".huiyuanType").select2("val","")
				$(".huiyuanType").next().removeClass("danger-select");
				$(".huiyuanType").parent().next().css("visibility", "hidden");
				$(".serviceType").select2("val","")
				$(".serviceType").next().removeClass("danger-select");
				$(".serviceType").parent().next().css("visibility", "hidden");
				$.ajax({
					type: "POST",
					url: rootPath + "/api/getHuiyuan",
					dataType: "json",
					async: false,
					data: {
						id: id,
					},
					success: function (data) {
						if (data.status === 200) {
							$(".huiyuanName").val(data.data.name)
							if (data.data.sex === 1){
								$("#isMan1").prop("checked",true);
							}else{
								$("#isMan2").prop("checked",true);
							}
							$(".huiyuanPhone").val(data.data.mobile)
							var cardNo = data.data.cardNo;
							// if (user.scopeId == 0){
							// 	cardNo = data.data.cardNo;
							// }else if (user.scopeId % 10000 == 0){
							// 	if (parseInt(data.data.scopeId / 10000) != parseInt(user.scopeId / 10000)){
							// 		cardNo = hideCardNo(cardNo);
							// 	}
							// }else if (user.scopeId % 100 == 0){
							// 	if (parseInt(data.data.scopeId / 100) != parseInt(user.scopeId / 100)){
							// 		cardNo = hideCardNo(cardNo);
							// 	}
							// }else{
							// 	if (user.scopeId != data.data.scopeId){
							// 		cardNo = hideCardNo(cardNo);
							// 	}
							// }
							$(".huiyuanCardNo").val(cardNo)
							$(".huiyuanAddress").val(data.data.address)
							$(".location-qu").val(data.data.scopeId - data.data.scopeId % 10000).trigger("change")
							$(".location-jiedao").val(data.data.scopeId - data.data.scopeId % 100).trigger("change")
							$(".location-shequ").val(data.data.scopeId).trigger("change")
							$(".political").val(data.data.political).trigger("change")
							$(".huiyuanType").val(data.data.huiyuanType).trigger("change")
							if (data.data.serviceType !== ""){
								var tmp = data.data.serviceType.substring(0,data.data.serviceType.length - 1).split(";");
								$(".serviceType").val(tmp).trigger("change");
							}
							if (data.data.attachment !== ""){
								$(".right-main:nth-child(3) .huiyuan-main .headimg").html("<img style='width: 100%;height: 100%;' src='" + imgPath + data.data.attachment + "'>\n")
								$(".right-main:nth-child(3) .huiyuan-main .headimg").attr("name",data.data.attachment)
								$(".uploadHead").html("修改")
							}else{
								$(".right-main:nth-child(3) .huiyuan-main .headimg").html("<img src='" + rootPath + "/resources/icon/head.png'>\n")
								$(".right-main:nth-child(3) .huiyuan-main .headimg").attr("name","")
								$(".uploadHead").html("上传")
							}
							$(".right-main").addClass("hidden");
							$(".right-main:nth-child(3)").removeClass("hidden");
						} else {
							bootAlert("获取会员信息失败");
						}
					},
					error: function () {
						bootAlert("服务器请求失败");
					}
				})
			}else if ($(this).attr("class") === "toDelete"){
				bootbox.confirm({
					title: "删除会员",
					message: "确认删除该会员？",
					callback: function (result) {
						if (result) {
							$.ajax({
								type: "POST",
								url: rootPath + "/api/deleteHuiyuan",
								dataType: "json",
								data: {
									id: id,
								},
								success: function (data) {
									if (data.status === 200) {
										reloadAjax(dataInfoTableHuiyuan);
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
			}else if ($(this).attr("class") === "toRead"){
				$(this).parent().parent().parent().children("td:nth-child(2)").click();
			}
		});

		$(".uploadHead").click(function () {
			$(this).prev().prev().children("input").click()
		})
		$(".uploadHead").prev().prev().children("input").change(function () {
			var allowType = ["png", "jpeg", "jpg"]
			var name = $(this)[0].files[0].name;
			var fileType = name.split('.').pop();
			if (allowType.indexOf(fileType.toLowerCase()) === -1) {
				bootAlert("请上传以.png、.jpeg、.jpg结尾文件");
				$(".uploadHead").prev().prev().children("input").val('')
				return;
			}
			var formData = new FormData();
			formData.append('file_data', $(this)[0].files[0]);
			var size = $(this)[0].files[0].size;
			var imgSrcBeforeSend;
			$.ajax({
				type: "POST",
				url: rootPath + "/api/file/fileUpload?fileType=image",
				dataType: "json",
				data: formData,
				contentType: false,
				processData: false,
				beforeSend: function () {
					imgSrcBeforeSend = $(".right-main:nth-child(3) .huiyuan-main .headimg img").attr("src");
					$(".right-main:nth-child(3) .huiyuan-main .headimg").html("<img style='width: 100%;height: 100%;' src='" + imgBitmap + "'>\n")
				},
				success: function (data) {
					if (data.status == 200) {
						$(".right-main:nth-child(3) .huiyuan-main .headimg").html("<img style='width: 100%;height: 100%;' src='" + imgPath + data.data.fileName + "'>\n")
						$(".right-main:nth-child(3) .huiyuan-main .headimg").attr("name", data.data.fileName);
						$(".uploadHead").prev().prev().children("input").val('')
						$(".uploadHead").html("修改")
					} else {
						$(".right-main:nth-child(3) .huiyuan-main .headimg").html("<img style='width: 100%;height: 100%;' src='" + imgSrcBeforeSend + "'>\n")
						$(".uploadHead").prev().prev().children("input").val('')
						if (imgSrcBeforeSend.indexOf("head.png") !== -1) {
							$(".uploadHead").html("修改")
						} else {
							$(".uploadHead").html("上传")
						}

					}
				},
				error: function () {
					$(".upload-attachment>div:last-child").remove();
					$(".upload-attachment").append('<div><a href="">' + name + '</a><a>上传失败点击删除</a></div>');
					$(".addPicture").next().val('')
				}
			})
		})

		//查看会员详情
		$("#huiyuan-table tbody").on('click','tr td',function () {
			if ($(this).index() != 6){
				var id = $(this).parent().children("td:nth-child(1)").children("div").attr("id");
				selectHuiyuanId = id;
				selectAsVolunteer = 3;
				reloadAjax(dataInfoTableHuiyuanInfo);
				$.ajax({
					type: "POST",
					url: rootPath + "/api/getHuiyuan",
					dataType: "json",
					async: false,
					data: {
						id: id,
					},
					success: function (data) {
						if (data.status === 200) {
							if (data.data.attachment !== ""){
								$(".right-main:nth-child(4) .huiyuan-main .headimg").html("<img style='width: 100%;height: 100%; ' src='" + imgPath + data.data.attachment + "'>\n")
							}else{
								$(".right-main:nth-child(4) .huiyuan-main .headimg").html("<img src='" + rootPath + "/resources/icon/head.png'>\n")
							}
							$("#readname").html(data.data.name)
							$("#readpolitical").html(politicals[data.data.political])
							$("#readaddress").html(data.data.address)
							if (data.data.sex === 1){
								$("#readsex").html("男")
							}else{
								$("#readsex").html("女")
							}
							$("#readscope").html(scopeMap[data.data.scopeId - data.data.scopeId % 10000] + scopeMap[data.data.scopeId - data.data.scopeId % 100] + scopeMap[data.data.scopeId])
							$("#readmobile").html(data.data.mobile)
							if (data.data.huiyuanType === 1){
								$("#readtype").html("团体会员")
							}else{
								$("#readtype").html("个体会员")
							}
							$("#readmobile").html(data.data.mobile)
							var cardNo = data.data.cardNo;
							if (user.scopeId == 0){
								cardNo = data.data.cardNo;
							}else if (user.scopeId % 10000 == 0){
								if (parseInt(data.data.scopeId / 10000) != parseInt(user.scopeId / 10000)){
									cardNo = hideCardNo(cardNo);
								}
							}else if (user.scopeId % 100 == 0){
								if (parseInt(data.data.scopeId / 100) != parseInt(user.scopeId / 100)){
									cardNo = hideCardNo(cardNo);
								}
							}else{
								if (user.scopeId != data.data.scopeId){
									cardNo = hideCardNo(cardNo);
								}
							}
							$("#readcardNo").html(cardNo)
							var html = "";
							if (data.data.serviceType !== ""){
								var tmp = data.data.serviceType.substring(0,data.data.serviceType.length - 1).split(";");
								for (var i = 0; i < tmp.length; i++){
									html += "<span>" + serviceTypes[tmp[i]] + "</span>\n";
								}
							}
							$("#readservice").html(html)

						} else {
							bootAlert("获取会员信息失败");
						}
					},
					error: function () {
						bootAlert("服务器请求失败");
					}
				})
				$(".right-main").addClass("hidden");
				$(".right-main:nth-child(4)").removeClass("hidden");
			}
		})
		//会员详情活动表切换
		$(".right-main:nth-child(4) .huiyuan-tables ul li").click(function () {
			if ($(this).index() == 0){
				selectAsVolunteer = 3;
				reloadAjax(dataInfoTableHuiyuanInfo);
				$(this).addClass("huiyuan-table-selected-li");
				$(".right-main:nth-child(4) .huiyuan-tables ul li:nth-child(2)").removeClass("huiyuan-table-selected-li");
			}else{
				selectAsVolunteer = 1;
				reloadAjax(dataInfoTableHuiyuanInfo);
				$(this).addClass("huiyuan-table-selected-li");
				$(".right-main:nth-child(4) .huiyuan-tables ul li:nth-child(1)").removeClass("huiyuan-table-selected-li");
			}
		})
		//志愿者审批表切换
		$(".right-main:nth-child(2) .volunteer-tables ul li").click(function () {
			if ($(this).index() == 0){
				reloadAjax(dataInfoTableVolunteer);
				$(this).addClass("huiyuan-table-selected-li");
				$(".right-main:nth-child(2) .volunteer-tables ul li:nth-child(2)").removeClass("huiyuan-table-selected-li");
				$(".right-main:nth-child(2) .huiyuan-table").eq(0).removeClass("hidden");
				$(".right-main:nth-child(2) .huiyuan-table").eq(1).addClass("hidden");
			}else{
				reloadAjax(dataInfoTableShenpi);
				$(this).addClass("huiyuan-table-selected-li");
				$(".right-main:nth-child(2) .volunteer-tables ul li:nth-child(1)").removeClass("huiyuan-table-selected-li");
				$(".right-main:nth-child(2) .huiyuan-table").eq(1).removeClass("hidden");
				$(".right-main:nth-child(2) .huiyuan-table").eq(0).addClass("hidden");
			}
		})
		//志愿者审批操作
		$(".right-main:nth-child(2) .huiyuan-table tbody").on('click','tr td a',function () {
			var id = $(this).parent().parent().parent().children("td:nth-child(1)").children("div").attr("id");
			var a = $(this);
			if ($(this).attr("class") === "toPass"){
				$.ajax({
					type: "POST",
					url: rootPath + "/api/approvalVolunteer",
					dataType: "json",
					async: false,
					data: {
						id: id,
						volunteerStatus: 1,
					},
					success: function (data) {
						if (data.status === 200) {
							a.parent().parent().html('<div class="table-tip" style="color: #1890ff;"><span style="background: #1890ff"></span>已通过</div>');
							updateApprovalRecord(id,1);
						}
					},
					error: function () {
						bootAlert("服务器请求失败");
					}
				})
			}else if ($(this).attr("class") === "toRefuse"){
				$.ajax({
					type: "POST",
					url: rootPath + "/api/approvalVolunteer",
					dataType: "json",
					async: false,
					data: {
						id: id,
						volunteerStatus: 0,
					},
					success: function (data) {
						if (data.status === 200) {
							a.parent().parent().html('<div class="table-tip" style="color: #fb2020;"><span style="background: #fb2020"></span>已拒绝</div>');
							updateApprovalRecord(id,0);
						}
					},
					error: function () {
						bootAlert("服务器请求失败");
					}
				})
			}
		})
		//志愿者申请信息弹窗
		$("#volunteer-table tbody").on('click','tr td',function () {
			var id = $(this).parent().children("td:nth-child(1)").children("div").attr("id");
			if ($(this).index() != 5) {
				if ($(this).parent().children("td:nth-child(6)").children("div").children("a").length === 0){
					$("#volunteer-info .main-button").addClass("hidden")
					$("#volunteer-info .danger-button").addClass("hidden")
				}else{
					$("#volunteer-info .main-button").removeClass("hidden")
					$("#volunteer-info .danger-button").removeClass("hidden")
				}
				$("#volunteer-info .pop-buttons").attr("id",$(this).parent().index());
				$("#viname").html("")
				$("#vimobile").html("")
				$("#vicardNo").html("")
				$("#visex").html("")
				// $("#viapplyTime").html("")
				$("#viscope").html("")
				$("#viserviceType").html("")
				$.ajax({
					type: "POST",
					url: rootPath + "/api/getHuiyuan",
					dataType: "json",
					async: false,
					data: {
						id: id,
					},
					success: function (data) {
						if (data.status === 200) {
							$("#viname").html(data.data.name)
							$("#vimobile").html(data.data.mobile)
							var cardNo = data.data.cardNo;
							if (user.scopeId == 0){
								cardNo = data.data.cardNo;
							}else if (user.scopeId % 10000 == 0){
								if (parseInt(data.data.scopeId / 10000) != parseInt(user.scopeId / 10000)){
									cardNo = hideCardNo(cardNo);
								}
							}else if (user.scopeId % 100 == 0){
								if (parseInt(data.data.scopeId / 100) != parseInt(user.scopeId / 100)){
									cardNo = hideCardNo(cardNo);
								}
							}else{
								if (user.scopeId != data.data.scopeId){
									cardNo = hideCardNo(cardNo);
								}
							}
							$("#vicardNo").html(cardNo)
							if (data.data.sex == 1){
								$("#visex").html("男")
							}else {
								$("#visex").html("女")
							}
							// $("#viapplyTime").html(data.data.applyTime)
							$("#viscope").html(scopeMap[data.data.scopeId - data.data.scopeId % 10000] + scopeMap[data.data.scopeId - data.data.scopeId % 100] + scopeMap[data.data.scopeId])
							var html = "";
							if (data.data.hobby !== ""){
								var tmp = data.data.hobby.substring(0,data.data.hobby.length - 1).split(";");
								for (var i = 0; i < tmp.length; i++){
									html += "<span style=\"background: #1890ff\">" + hobbys[tmp[i]] + "</span>";
								}
							}
							$("#viserviceType").html(html)
							$("#volunteer-info").css("display","block")
						}
					},
					error: function () {

					}
				})
			}
		})
		//申请弹窗通过
		$("#volunteer-info .main-button").click(function () {
			$("#volunteer-table tbody tr").eq($(this).parent().attr("id")).children("td:nth-child(6)").children("div").children(".toPass").click();
			$("#volunteer-info").css("display","none")
		})
		//申请弹窗拒绝
		$("#volunteer-info .danger-button").click(function () {
			$("#volunteer-table tbody tr").eq($(this).parent().attr("id")).children("td:nth-child(6)").children("div").children(".toRefuse").click();
			$("#volunteer-info").css("display","none")
		})
		//高级搜索
		$(".high-search").click(function () {
			//点击高级搜索按钮重置选中
			// $(".search-content>div:nth-child(1)>button").removeClass("search-select-button");
			// $(".search-content .buxian").addClass("search-select-button");
			$(".search").removeClass("hidden");
		});
		$(".search-content>div:nth-child(1)>button").click(function () {
			$(".search-content>div:nth-child(1)>button").removeClass("search-select-button");
			$(this).addClass("search-select-button");
		});
		$(".search-content>div:nth-child(2)>button").click(function () {
			$(".search-content>div:nth-child(2)>button").removeClass("search-select-button");
			$(this).addClass("search-select-button");
		});
		$(".search-content>div:nth-child(3)>.main-button").click(function () {
			//高级搜索确认
			$(".search").addClass("hidden");
		});

		$(".search-content>div:nth-child(3)>.normal-button").click(function () {
			//高级搜索取消
			$(".search").addClass("hidden");
		});
		//关闭申请信息弹窗
		$("#volunteer-info img").click(function () {
			$("#volunteer-info").css("display","none");
		})
		document.addEventListener("error", function (e) {
			var elem = e.target;
			if (elem.tagName.toLowerCase() === 'img') {
				elem.src = headBitmap;
			}
		}, true);



	}
);
//设置会员范围查询条件
function setQueryLocation() {
	var html = "<option></option><option value='0'>全部</option>\n";
	for (var i = 0; i < scopeList.length; i++){
		if (scopeList[i].scopeId % 10000 === 0 && scopeList[i].scopeId !== 0){
			html += "<option value='" + scopeList[i].scopeId + "'>" + scopeList[i].name + "</option>\n";
		}
	}
	$(".right-main:nth-child(1) .query-terms .area-select").html(html)
	$(".right-main:nth-child(2) .query-terms .volunteer-area-select").html(html)
}

//设置会员添加编辑条件
function setEditLocation() {
	var html = "";
	for (var i = 0; i < scopeList.length; i++){
		if (scopeList[i].scopeId % 10000 === 0 && scopeList[i].scopeId !== 0){
			html += "<option value='" + scopeList[i].scopeId + "'>" + scopeList[i].name + "</option>\n";
		}
	}
	$(".location-qu").html(html)
	$(".location-jiedao").html("")
	$(".location-shequ").html("")
}

//获取机构范围信息
function listScope(){
	$.ajax({
		type: "GET",
		url: rootPath + "/api/listScope",
		dataType: "json",
		async: false,
		data: {},
		success: function (data) {
			for (var i = 0; i < data.data.length; i++) {
				scopeList.push(data.data[i]);
				scopeMap[data.data[i].scopeId] = data.data[i].name;
			}
		},
		error: function () {
			bootAlert("服务器请求失败");
		}
	})
}

function updateApprovalRecord(id,result) {
	$.ajax({
		type: "POST",
		url: rootPath + "/api/updateVolunteerRecord",
		dataType: "json",
		data: {
			huiyuanId: id,
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

function hideCardNo(cardNo) {
	if (cardNo.length === 18){
		return cardNo.substring(0,12) + "******";
	}else{
		return cardNo.substring(0,9) + "******";
	}
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