// /**
//  * 	Overall version 1.6
//  * 	This version 1.6
//  */
//
// var huiyuan;
// var volunteer;
// var activity;
// var isVolunteer = null;
// var scope = null;
// var serviceType=["失独人群","育龄家庭","青少年"];
// var scopeName = {};
// var datTableInit = {
// 	"bServerSide": true,
// 	"processing": true,
// 	"sScrollX": "100%",
// 	//表格的宽度
// 	"sScrollY": "400px",
// 	"sScrollXInner": "100%",
// 	//表格的内容宽度
// 	"bScrollCollapse": false,
// 	//当显示的数据不足以支撑表格的默认的高度时，依然显示纵向的滚动条。(默认是false)
// 	"bPaginate": true,
// 	//是否显示分页
// 	"bLengthChange": true,
// 	//每页显示的记录数
// 	"bFilter": false,
// 	//搜索栏
// 	"bSort": false,
// 	//是否支持排序功能
// 	"bInfo": true,
// 	//显示表格信息
// 	"bAutoWidth": false,
// 	//自适应宽度
// 	"aLengthMenu": [10, 25, 50, 100],
// 	//设置选择每页的条目数
// 	"iDisplayLength": 10,
// 	//默认显示条数
// 	"aaSorting": [[1, "asc"]],
// 	//给列表排序 ，第一个参数表示数组 (由0开始)。1 表示Browser列。第二个参数为 desc或是asc
// 	"bStateSave": false,
// 	//保存状态到cookie *************** 很重要 ， 当搜索的时候页面一刷新会导致搜索的消失。使用这个属性就可避免了
// 	"sPaginationType": "full_numbers",
// 	//分页，一共两种样式，full_numbers和two_button(默认)
// 	"oLanguage": {
// 		"sUrl": server_context + contextPath + "/resources/ace/js/dataTables/de_DE.txt",
// 		//多语言配置文件，可将oLanguage的设置放在一个txt文件中，例：Javascript/datatable/dtCH.txt
// 	},
// 	"bJQueryUI": false,
// 	//可以添加 jqury的ui theme  需要添加css
// 	"fnServerData": function (sSource, aoData, fnCallback) {
// 		$.ajax({
// 			"type": 'get',
// 			"url": sSource,
// 			"dataType": "json",
// 			"data": {
// 				aoData: JSON.stringify(aoData)
// 			},
// 			"success": function (resp) {
// 				if (resp.status != 200) {
// 					bootAlert(resp.msg);
// 				} else {
// 					fnCallback(resp);
// 				}
// 			}
// 		});
// 	}
// };
// var datTableInitSp = {
// 	"bServerSide": true,
// 	"processing": true,
// 	"sScrollX": "100%",
// 	//表格的宽度
// 	"sScrollY": "500px",
// 	"sScrollXInner": "100%",
// 	//表格的内容宽度
// 	"bScrollCollapse": false,
// 	//当显示的数据不足以支撑表格的默认的高度时，依然显示纵向的滚动条。(默认是false)
// 	"bPaginate": true,
// 	//是否显示分页
// 	"bLengthChange": true,
// 	//每页显示的记录数
// 	"bFilter": false,
// 	//搜索栏
// 	"bSort": false,
// 	//是否支持排序功能
// 	"bInfo": true,
// 	//显示表格信息
// 	"bAutoWidth": false,
// 	//自适应宽度
// 	"aLengthMenu": [12, 25, 50, 100],
// 	//设置选择每页的条目数
// 	"iDisplayLength": 12,
// 	//默认显示条数
// 	"aaSorting": [[1, "asc"]],
// 	//给列表排序 ，第一个参数表示数组 (由0开始)。1 表示Browser列。第二个参数为 desc或是asc
// 	"bStateSave": false,
// 	//保存状态到cookie *************** 很重要 ， 当搜索的时候页面一刷新会导致搜索的消失。使用这个属性就可避免了
// 	"sPaginationType": "full_numbers",
// 	//分页，一共两种样式，full_numbers和two_button(默认)
// 	"oLanguage": {
// 		"sUrl": server_context + contextPath + "/resources/ace/js/dataTables/de_DE.txt",
// 		//多语言配置文件，可将oLanguage的设置放在一个txt文件中，例：Javascript/datatable/dtCH.txt
// 	},
// 	"bJQueryUI": false,
// 	//可以添加 jqury的ui theme  需要添加css
// 	"fnServerData": function (sSource, aoData, fnCallback) {
// 		$.ajax({
// 			"type": 'get',
// 			"url": sSource,
// 			"dataType": "json",
// 			"data": {
// 				aoData: JSON.stringify(aoData)
// 			},
// 			"success": function (resp) {
// 				if (resp.status != 200) {
// 					bootAlert(resp.msg);
// 				} else {
// 					fnCallback(resp);
// 				}
// 			}
// 		});
// 	}
// };
// jQuery(
// 	function ($) {
// 		bootbox.setDefaults("locale","zh_CN");
// 		$("#editSelectService").select2({
// 			placeholder: '请选择',
// 			multiple:true,
// 			language: "zh-CN",
// 			allowClear:true,
// 			closeOnSelect:false
// 		});
// 		$("#addSelectService").select2({
// 			placeholder: '请选择',
// 			multiple:true,
// 			language: "zh-CN",
// 			allowClear:true,
// 			closeOnSelect:false
// 		});
// 		listScope();
// 		listStreet();
//
// 		$(".header-navbar ul li:nth-child(3)").addClass("current")
// 		datTableInit["sAjaxSource"] = rootPath + '/api/selectAllHuiyuan';
// 		// 设置请求url
// 		datTableInit["sAjaxSource"] = rootPath + '/api/selectAllHuiyuan';
// 		// 设置字段数据源
// 		datTableInit["aoColumns"] = [
// 			{
// 				"data": null
// 			},
// 			{
// 				"data": "name"
// 			},
// 			{
// 				"data": "sex"
// 			},
// 			{
// 				"data": "cardNo"
// 			},
// 			{
// 				"data": "scopeId"
// 			},
// 			{
// 				"data": "mobile"
// 			},
// 			{
// 				"data": "id"
// 			}
// 		];
// 		// 渲染字段数据源
// 		datTableInit["aoColumnDefs"] = [
// 			{
// 				"aTargets": [0], "mRender": function (data, type, row, meta) {
// 					return meta.row + 1 + meta.settings._iDisplayStart;
// 				}
// 			},
// 			{
// 				"aTargets": [2], "mRender": function (data, type, row, meta) {
// 					if (data) {
// 						return "女";
// 					}
// 					return "男";
// 				}
// 			},
// 			{
// 				"aTargets": [3], "mRender": function (data, type, row, meta) {
// 					return data.substr(0, 6) + "********" + data.substr(14, 4);
// 				}
// 			},
// 			{
// 				"aTargets": [4], "mRender": function (data, type, row, meta) {
// 					if (data % 100 == 0){
// 						return scopeName[data];
// 					}else{
// 						return scopeName[parseInt(data / 100) * 100] + scopeName[data];
// 					}
// 				}
// 			},
// 			{
// 				"aTargets": [6], "mRender": function (data, type, full) {
// 					var colDef =
// 						"<input class='hidden' value='" + data + "'>"
// 						+ "<div class='action-buttons'>"
// 						+ "<a class='blue' id='view'><i class='ace-icon fa fa-search-plus bigger-130'></i></a>"
//
// 					if (full.status != 0) {
// 						colDef +=
// 							"  <a class='delTopic'><i class='ace-icon fa fa-remove bigger-130'></i></a>";
// 					}
// 					colDef += "</div>";
//
// 					return colDef;
// 				}
// 			},
// 		];
//
// 		datTableInit["fnServerData"] = function (sSource, aoData, fnCallback) {
// 			$.ajax({
// 				"type": 'get',
// 				"url": sSource,
// 				"dataType": "json",
// 				"data": {//查询条件写这里
// 					//dataTable固定参数
// 					aoData: JSON.stringify(aoData),
// 					// 选填参数
// 					// search: searchText
// 					scopeId: $("#road").val(),
// 					userScope:userScope,
// 					volunteerStatus: $("input[name='volunteer']:checked").val(),
// 				},
// 				"success": function (resp) {
// 					if (resp.status != 200) {
// 						bootAlert(resp.msg);
// 					} else {
// 						fnCallback(resp);
// 					}
// 				}
// 			});
// 		}
//
// 		// table初始化
// 		var dataInfoTable = $('#data_table').dataTable(datTableInit).api();
//
// 		dataInfoTable["fnDrawCallback"] = function () {
// 			var search = $('#data_table_wrapper').find('input[type=search]');
// 			search.attr("placeholder", "");
// 			search.css("width", "200px");
// 		};
//
// 		datTableInitSp["sAjaxSource"] = rootPath + '/api/selectAllHuiyuan';
// 		// 设置请求url
// 		datTableInitSp["sAjaxSource"] = rootPath + '/api/selectAllHuiyuan';
// 		// 设置字段数据源
// 		datTableInitSp["aoColumns"] = [
// 			{
// 				"data": null
// 			},
// 			{
// 				"data": "applyTime"
// 			},
// 			{
// 				"data": "name"
// 			},
// 			{
// 				"data": "mobile"
// 			},
// 			{
// 				"data": "cardNo"
// 			},
// 			{
// 				"data": "id"
// 			}
// 		];
// 		// 渲染字段数据源
// 		datTableInitSp["aoColumnDefs"] = [
// 			{
// 				"aTargets": [0], "mRender": function (data, type, row, meta) {
// 					return meta.row + 1 + meta.settings._iDisplayStart;
// 				}
// 			},
// 			{
// 				"aTargets": [4], "mRender": function (data, type, row, meta) {
// 					return data.substr(0, 6) + "********" + data.substr(14, 4);
// 				}
// 			},
// 			{
// 				"aTargets": [5], "mRender": function (data, type, full) {
// 					var colDef = "<input class='hidden' value='" + data + "'>"
// 						+ "<div class='action-buttons' style='text-align: center'>"
// 						+ '<button class="pass">通过</button>'
// 						+ '<button class="refuse">拒绝</button>'
// 						+ '</div>'
//
//
// 					return colDef;
// 				}
// 			},
// 		];
//
// 		datTableInitSp["fnServerData"] = function (sSource, aoData, fnCallback) {
// 			$.ajax({
// 				"type": 'get',
// 				"url": sSource,
// 				"dataType": "json",
// 				"data": {//查询条件写这里
// 					//dataTable固定参数
// 					aoData: JSON.stringify(aoData),
// 					// 选填参数
// 					// search: searchText
// 					volunteerStatus: 2,
// 				},
// 				"success": function (resp) {
// 					if (resp.status != 200) {
// 						bootAlert(resp.msg);
// 					} else {
// 						fnCallback(resp);
// 					}
// 				}
// 			});
// 		}
//
// 		// table初始化
// 		var dataTableSp = $('#data_table_sp').dataTable(datTableInitSp).api();
// 		dataTableSp["fnDrawCallback"] = function () {
// 			var search = $('#data_table_wrapper').find('input[type=search]');
// 			search.attr("placeholder", "");
// 			search.css("width", "200px");
// 		};
//
// 		$("#volunteerList").click(function () {
// 			reloadAjax(dataTableSp)
// 		})
//
// 		$("#vipList").click(function () {
// 			reloadAjax(dataInfoTable);
// 		})
//
// 		$("#queryVip").click(function () {
// 			reloadAjax(dataInfoTable);
// 		})
//
// 		$("#add").click(function () {
// 			ToAddPage();
// 		});
//
// 		$('#refresh').click(function () {
// 			reloadAjax(dataInfoTable)
// 		});
//
// 		$("#data_table").delegate("tbody td:nth-child(2)", "click", function () {
// 			var id = $(this).parent().children("td:last-child").children("input").val();
// 			//console.log(id);
// 			ToReadPage(id);
// 		});
//
// 		$("#data_table").delegate(".blue", "click", function () {
// 			var id = $(this).parent().prev().val();
// 			ToEditPage(id);
// 		});
//
// 		$("#data_table").delegate(".delTopic", "click", function () {
// 			var id = $(this).parent().prev().val();
// 			bootbox.confirm({
// 				title: "删除用户",
// 				message: "是否删除该用户？",
// 				callback: function(result) {
// 					if (result) {
// 						deleteVip(id);
// 					} else {
// 						return;
// 					}
// 				}
// 			});
// 			$(".modal-header").css("background-color","#F44336")
// 		});
//
// 		$("#data_table_sp").delegate(".pass", "click", function () {
//
// 			var id = $(this).parent().prev().val();
// 			var button=$(this);
// 			$.ajax({
// 				type: "POST",
// 				url: rootPath + "/api/approvalVolunteer",
// 				dataType: "json",
// 				async: false,
// 				data: {
// 					id: id,
// 					volunteerStatus: 1,
// 				},
// 				success: function (data) {
// 					if (data.status == 200) {
// 						button.parent().html('<button class="haspass">已通过</button>')
// 						// dataTableSp.ajax.reload(false)
// 					}
// 				},
// 				error: function () {
// 					bootAlert("服务器请求失败");
// 				}
// 			})
//
// 		});
//
// 		$("#data_table_sp").delegate(".refuse", "click", function () {
// 			var id = $(this).parent().prev().val();
// 			var button=$(this);
// 			$.ajax({
// 				type: "POST",
// 				url: rootPath + "/api/approvalVolunteer",
// 				dataType: "json",
// 				async: false,
// 				data: {
// 					id: id,
// 					volunteerStatus: 0,
// 				},
// 				success: function (data) {
// 					if (data.status == 200) {
// 						button.parent().html('<button class="hasrefuse">已拒绝</button>')
// 						// reloadAjax(dataTableSp)
// 					}
// 				},
// 				error: function () {
// 					bootAlert("服务器请求失败");
// 				}
// 			})
//
// 		});
//
// 		$("#addPage .backimg").click(function () {
// 			ClearAddPage();
// 			var scope = $("#road").val();
// 			var isVolunteer = $("input[name='volunteer']:checked").val();
// 			if (scope == undefined) scope = null;
// 			if (isVolunteer == undefined) isVolunteer = null;
// 		})
//
// 		$("#readPage .backimg").click(function () {
// 			ClearReadPage();
// 			var scope = $("#road").val();
// 			var isVolunteer = $("input[name='volunteer']:checked").val();
// 			if (scope == undefined) scope = null;
// 			if (isVolunteer == undefined) isVolunteer = null;
// 		})
//
// 		$("#editPage .backimg").click(function () {
// 			ClearEditPage();
// 			var scope = $("#road").val();
// 			var isVolunteer = $("input[name='volunteer']:checked").val();
// 			if (scope == undefined) scope = null;
// 			if (isVolunteer == undefined) isVolunteer = null;
// 		});
//
// 		$(".side-btn").click(function () {
// 			$(".side-btn").removeClass("side-selected");
// 			$(".side-btn").addClass("side-unselected");
// 			$(this).addClass("side-selected");
// 			$(this).removeClass("side-unselected");
// 			$(".right-content").addClass("hidden");
// 			$(".right-content").eq($(".side-btn").index(this)).removeClass("hidden");
// 		});
//
// 		$("#addPage .head").click(function () {
// 			$("#addviphead").click()
// 		})
//
// 		$("#editPage .head").click(function () {
// 			$("#editviphead").click()
// 		})
//
// 		$("#addviphead").change(function () {
// 			var formData = new FormData();
// 			formData.append('file_data', $("#addviphead")[0].files[0]);
// 			$.ajax({
// 				type: "POST",
// 				url: rootPath + "/api/file/fileUpload?fileType=image",
// 				dataType: "json",
// 				data: formData,
// 				contentType: false,
// 				processData: false,
// 				success: function (data) {
// 					if (data.status == 200) {
// 						$("#addPage .head").html('<img alt="' + data.data.fileName + '" src="' + imgPath + data.data.fileName + '" style="width: 100%;height: 100%;">')
// 					}
// 				},
// 				error: function () {
// 				}
// 			})
// 		})
//
// 		$("#editviphead").change(function () {
// 			var formData = new FormData();
// 			formData.append('file_data', $("#editviphead")[0].files[0]);
// 			$.ajax({
// 				type: "POST",
// 				url: rootPath + "/api/file/fileUpload?fileType=image",
// 				dataType: "json",
// 				data: formData,
// 				contentType: false,
// 				processData: false,
// 				success: function (data) {
// 					if (data.status == 200) {
// 						$("#editPage .head").html('<img alt="' + data.data.fileName + '" src="' + imgPath + data.data.fileName + '" style="width: 100%;height: 100%;">')
// 					}
// 				},
// 				error: function () {
// 				}
// 			})
// 		})
//
// 		$("#addPage .confirm").click(function () {
// 			var name = $("#addPage .VipName").val()
// 			var sex = $("#addPage .VipSex option:selected").val()
// 			var yearold = $("#addPage .VipAge").val()
// 			var phone = $("#addPage .VipMobile").val()
// 			var idcard = $("#addPage .VipCardNo").val()
// 			var scope = $("#addPage .VipLocation option:selected").val()
// 			var localarea = $("#addPage .VipAddress").val()
// 			var political = $("#addPage .VipPolitical option:selected").val()
// 			var type = $("#addPage .VipType option:selected").val()
// 			var serviceType = $("#addPage .VipService").select2().val().join(';')
//
// 			var attachment = $("#addPage .head img").attr("alt");
// 			if (attachment == "" || attachment == undefined) attachment = null;
// 			if (name == "" || sex == -1 || scope == -1) {
// 				bootAlert("请填写必填项")
// 			} else {
// 				bootbox.confirm({
// 					title: "添加会员",
// 					message: "请确认是否添加会员？",
// 					callback: function(result) {
// 						if (result) {
// 							addVip(name, sex, localarea, idcard, phone, scope, political, type, serviceType, attachment);
// 						} else {
// 							return;
// 						}
// 					}
// 				});
// 				$(".modal-header").css("background-color","#5cb2ff")
// 			}
// 		});
//
// 		$("#editPage .confirm").click(function () {
// 			var id = $("#editPage input[name='id']").val();
// 			var name = $("#editPage .VipName").val()
// 			var sex = $("#editPage .VipSex option:selected").val()
// 			var yearold = $("#editPage .VipAge").val()
// 			var phone = $("#editPage .VipMobile").val()
// 			var idcard = $("#editPage .VipCardNo").val()
// 			var scope = $("#editPage .VipLocation option:selected").val()
// 			var localarea = $("#editPage .VipAddress").val()
// 			var political = $("#editPage .VipPolitical option:selected").val()
// 			var type = $("#editPage .VipType option:selected").val()
// 			var serviceType = $("#editPage .VipService").select2().val().join(';')
// 			var attachment = $("#editPage .head img").attr("alt");
// 			if (name == "" || sex == -1 || scope == -1) {
// 				bootAlert("请填写必填项")
// 			} else {
// 				bootbox.confirm({
// 					title: "编辑会员信息",
// 					message: "请确认是否修改会员信息？",
// 					callback: function(result) {
// 						if (result) {
// 							editVip(id, name, sex, localarea, idcard, phone, scope, political, type, serviceType, attachment);
// 						} else {
// 							return;
// 						}
// 					}
// 				});
// 				$(".modal-header").css("background-color","#F44336")
// 			}
// 		})
//
// 		function reloadAjax(ajaxTable) {
// 			ajaxTable.ajax.reload(false);
// 		}
//
// 		function ToAddPage() {
// 			$(".right-content").addClass("hidden");
// 			$("#addPage").removeClass("hidden");
// 			$("#addPage input").val("")
// 			$("#addPage select").val("")
// 			$(".head").html('<img src="resources/icon/addpicture.png" style="margin-top: 2rem; width: 2rem;height: 2rem;">\n' +
// 				'                    <div>暂无图片</div>');
// 			$("#addPage .VipService").select2("val", "");
// 		}
//
// 		function ToReadPage(id) {
// 			$(".right-content").addClass("hidden");
// 			$("#readPage").removeClass("hidden");
// 			$("#readPage input").val("");
// 			$("#readPage select").val("");
// 			$(".head").html('<img src="resources/icon/addpicture.png" style="margin-top: 2rem; width: 2rem;height: 2rem;">\n' +
// 				'                    <div>暂无图片</div>');
// 			$("#AA").html("");
// 			$("#VA").html("");
// 			$("#services").html("")
// 			$.ajax({
// 				type: "POST",
// 				url: rootPath + "/api/getHuiyuan",
// 				dataType: "json",
// 				async: false,
// 				data: {
// 					id: id,
// 				},
// 				success: function (data) {
// 					if (data.status === 200) {
// 						// alert("获取成功")
// 						$("#readPage .VipName").val(data.data.name);
// 						if (data.data.sex) {
// 							$("#readPage .VipSex").val("女");
// 						} else {
// 							$("#readPage .VipSex").val("男");
// 						}
// 						now = new Date();
// 						birth = data.data.cardNo.substr(6, 8);
// 						age = now.getFullYear() - parseInt(birth.substr(0, 4));
// 						if (now.getMonth() < parseInt(birth.substr(4, 2))) {
// 							age = age - 1;
// 						} else if (now.getMonth() == parseInt(birth.substr(4, 2))) {
// 							if (now.getDate() < parseInt(birth.substr(6, 2))) {
// 								age = age - 1;
// 							}
// 						}
// 						$("#readPage .VipAge").val(age);
// 						$("#readPage .VipMobile").val(data.data.mobile);
// 						$("#readPage .VipCardNo").val(data.data.cardNo);
// 						// if (parseInt(data.data.scopeId / 100) * 100 == 100) {
// 						// 	$("#readPage .VipLocation").val("上城区");
// 						// }
// 						$("#readPage .VipLocation").val(scopeName[parseInt(data.data.scopeId)]);
// 						// $("#readPage .VipLocation").val(data.data.scopeId);
// 						$("#readPage .VipAddress").val(data.data.address);
// 						if (data.data.political == 1) {
// 							$("#readPage .VipPolitical").val("党员");
// 						} else if (data.data.political == 0) {
// 							$("#readPage .VipPolitical").val("群众");
// 						}
// 						// $("#readPage .VipPolitical").val(data.data.political);
// 						if (data.data.huiyuanType) {
// 							$("#readPage .VipType").val("个体会员");
// 						} else {
// 							$("#readPage .VipType").val("团体会员");
// 						}
// 						$(".VipOrganization").val(scopeName[parseInt(data.data.scopeId)]+"计生协");
//
// 						if (data.data.attachment != "") {
// 							$("#readPage .head").html('<img alt="' + data.data.attachment + '" src="' + imgPath + data.data.attachment + '" style="width: 100%;height: 100%;">')
// 						}
// 						var services=String(data.data.serviceType).split(';')
// 						for(var i=0;i<services.length;i++){
// 							$("#services").append('<span class="service">'+serviceType[parseInt(services[i])]+'</span>')
// 						}
//
// 					} else {
// 						bootAlert("获取会员信息失败");
// 					}
// 				},
// 				error: function () {
// 					bootAlert("服务器请求失败");
// 				}
//
// 			})
// 			html = "<div class=\"activity-row activity-head\">\n" +
// 				"                    <div class=\"activity-col1\">序号</div>\n" +
// 				"                    <div class=\"activity-col2\">活动名称</div>\n" +
// 				"                    <div class=\"activity-col3\">活动地区</div>\n" +
// 				"                    <div class=\"activity-col4\">日期</div>\n" +
// 				"                    </div>";
// 			getActivities(id, null, 1);
// 			$("#AA").html(html);
// 			html = "<div class=\"activity-row activity-head\">\n" +
// 				"                    <div class=\"activity-col1\">序号</div>\n" +
// 				"                    <div class=\"activity-col2\">活动名称</div>\n" +
// 				"                    <div class=\"activity-col3\">活动地区</div>\n" +
// 				"                    <div class=\"activity-col4\">日期</div>\n" +
// 				"                    </div>";
// 			getActivities(id, 1, 1);
// 			$("#VA").html(html);
// 			$("#setting").click(function () {
// 				$(".right-content").addClass("hidden");
// 				$("#readPage").addClass("hidden");
// 				$("#editPage").removeClass("hidden");
// 				ToEditPage(id);
// 			});
// 		}
//
// 		function ToEditPage(id) {
// 			$(".right-content").addClass("hidden");
// 			$("#editPage").removeClass("hidden");
// 			$("#editPage input").val("")
// 			$("#editPage select").val("")
// 			$("#editPage input[name='id']").val(id);
// 			$("#editPage .VipService").select2("val", "");
// 			$(".head").html('<img src="resources/icon/addpicture.png" style="margin-top: 2rem; width: 2rem;height: 2rem;">\n' +
// 				'                    <div>暂无图片</div>');
// 			$.ajax({
// 				type: "POST",
// 				url: rootPath + "/api/getHuiyuan",
// 				data: {
// 					id: id,
// 				},
// 				success: function (data) {
// 					if (data.status === 200) {
// 						$("#editPage .VipName").val(data.data.name);
// 						if (data.data.sex) {
// 							$("#editPage .VipSex").val(1);
// 						} else {
// 							$("#editPage .VipSex").val(0);
// 						}
//
// 						now = new Date();
// 						birth = data.data.cardNo.substr(6, 8);
// 						age = now.getFullYear() - parseInt(birth.substr(0, 4));
// 						if (now.getMonth() < parseInt(birth.substr(4, 2))) {
// 							age = age - 1;
// 						} else if (now.getMonth() == parseInt(birth.substr(4, 2))) {
// 							if (now.getDate() < parseInt(birth.substr(6, 2))) {
// 								age = age - 1;
// 							}
// 						}
// 						$("#editPage .VipAge").val(age);
// 						$("#editPage .VipMobile").val(data.data.mobile);
// 						$("#editPage .VipCardNo").val(data.data.cardNo);
// 						$("#editPage .VipLocation").val(data.data.scopeId);
// 						$("#editPage .VipAddress").val(data.data.address);
// 						$("#editPage .VipPolitical").val(data.data.political);
//
// 						var services=data.data.serviceType.split(';');
// 						$("#editPage .VipService").select2().val(services).trigger("change")
// 						if (data.data.huiyuanType) {
// 							$("#editPage .VipType").val(1);
// 						} else {
// 							$("#editPage .VipType").val(0);
// 						}
// 						if (data.data.attachment != "") {
// 							$("#editPage .head").html('<img alt="' + data.data.attachment + '" src="' + imgPath + data.data.attachment + '" style="width: 100%;height: 100%;">')
// 						}
//
// 					}
// 				},
// 				error: function () {
// 					bootAlert("服务器请求失败");
// 				}
// 			})
// 		}
//
// 		function ClearAddPage() {
// 			$("#addPage input").val("")
// 			$("#addPage select").val("")
// 			$(".right-content").addClass("hidden");
// 			$(".right-content").eq(0).removeClass("hidden");
// 			$(".head").html('<img src="resources/icon/addpicture.png" style="margin-top: 2rem; width: 2rem;height: 2rem;">\n' +
// 				'                    <div>暂无图片</div>');
// 			reloadAjax(dataInfoTable);
// 		}
//
// 		function ClearReadPage() {
// 			$("#readPage input").val("")
// 			$("#readPage select").val("")
// 			$(".right-content").addClass("hidden");
// 			$(".right-content").eq(0).removeClass("hidden");
// 			$(".head").html('<img src="resources/icon/addpicture.png" style="margin-top: 2rem; width: 2rem;height: 2rem;">\n' +
// 				'                    <div>暂无图片</div>');
// 			$("#AA").html("");
// 			$("#VA").html("");
// 			$("#services").html("");
// 		}
// 		}
//
// 		function ClearEditPage() {
// 			$("#editPage input").val("")
// 			$("#editPage select").val("")
// 			$(".right-content").addClass("hidden");
// 			$(".right-content").eq(0).removeClass("hidden");
// 			$(".head").html('<img src="resources/icon/addpicture.png" style="margin-top: 2rem; width: 2rem;height: 2rem;">\n' +
// 				'                    <div>暂无图片</div>');
// 			reloadAjax(dataInfoTable);
// 		}
//
// 		function getActivities(id, isVolunteer, page) {
// 			$.ajax({
// 				type: "POST",
// 				url: rootPath + "/api/getActivitiesByHuiyuan",
// 				dataType: "json",
// 				async: false,
// 				data: {
// 					id: id,
// 					volunteerStatus: isVolunteer,
// 					pageNow: parseInt(page),
// 				},
// 				success: function (data) {
// 					activity = data;
// 					activity.totalCount = data.totalCount;
// 					activity.totalPage = Math.ceil(data.totalCount / 4);
//
// 					for (i = 0; i < 4; ++i) {
// 						if (data.data[i] == undefined) {
// 							break;
// 						}
// 						if (data.data[i].activityScope == 1) {
// 							activity.data[i].activityScope = "西湖区";
// 						}
// 						html += '<div class="activity-row activity-row' + ((page - 1) * 4 + i + 1) + '">\n' +
// 							'                        <div class="activity-col1">' + ((page - 1) * 4 + i + 1) + '</div>\n' +
// 							'                        <div class="activity-col2">' + activity.data[i].activityName + '</div>\n' +
// 							'                        <div class="activity-col3">' + activity.data[i].activityScope + '</div>\n' +
// 							'                        <div class="activity-col4">' + activity.data[i].activityTime + '</div>\n' +
// 							'                    </div>';
// 					}
// 				},
// 				error: function () {
// 					bootAlert("服务器请求失败");
// 				}
// 			})
// 		}
//
// 		function deleteVip(id) {
// 			$.ajax({
// 				type: "POST",
// 				url: rootPath + "/api/deleteHuiyuan",
// 				dataType: "json",
// 				data: {
// 					id: id,
// 				},
// 				success: function (data) {
// 					if (data.status === 200) {
// 						reloadAjax(dataInfoTable);
// 					}
// 				},
// 				error: function () {
// 					bootAlert("服务器请求失败");
// 				}
//
// 			})
// 		}
//
// 		function listScope() {
// 			$("#area").html('<option value="0">请选择地区</option>\n');
// 			$("#road").html('<option value="0">请选择街道</option>\n');
// 			htmlarea = '<option value="0">请选择地区</option>\n';
// 			htmlroad = '<option value="0">请选择街道</option>\n';
// 			$.ajax({
// 				type: "GET",
// 				url: rootPath + "/api/getLocation",
// 				dataType: "json",
// 				async: false,
// 				data: {},
// 				success: function (data) {
// 					for (i = 0; i < data.data.length; i++) {
// 						if (data.data[i].scopeId / 100 == 0) {
// 							htmlarea += '<option value="' + data.data[i].scopeId + '">不限</option>\n';
// 						} else {
// 							htmlarea += '<option value="' + data.data[i].scopeId + '">' + data.data[i].name + '</option>\n';
// 						}
// 						scopeName[data.data[i].scopeId] = data.data[i].name;
// 					}
// 					$("#area").html(htmlarea);
// 				},
// 				error: function () {
// 					bootAlert("服务器请求失败");
// 				}
// 			})
// 			$("#area").change(function () {
// 				htmlroad = "";
// 				if ($("#area").val() == 0) {
// 					htmlroad += '<option value="0">不限</option>\n';
// 					$("#road").html(htmlroad);
// 				} else {
// 					$.ajax({
// 						type: "GET",
// 						url: rootPath + "/api/getStreet",
// 						dataType: "json",
// 						data: {
// 							scopeId: $("#area").val(),
// 						},
// 						success: function (data) {
// 							for (i = 0; i < data.data.length; i++) {
// 								if (data.data[i].scopeId % 100 == 0) {
// 									htmlroad += '<option value="' + data.data[i].scopeId + '">不限</option>\n';
// 								} else {
// 									htmlroad += '<option value="' + data.data[i].scopeId + '">' + data.data[i].name + '</option>\n';
// 								}
// 								scopeName[data.data[i].scopeId] = data.data[i].name;
// 							}
// 							$("#road").html(htmlroad);
// 						},
// 						error: function () {
// 							bootAlert("服务器请求失败");
// 						}
// 					})
// 				}
// 			})
// 		}
//
// 		function listStreet() {
// 			for (var i in scopeName) {
// 				$.ajax({
// 					type: "GET",
// 					url: rootPath + "/api/getStreet",
// 					dataType: "json",
// 					async: false,
// 					data: {
// 						scopeId: i,
// 					},
// 					success: function (data) {
// 						for (i = 0; i < data.data.length; i++) {
// 							scopeName[data.data[i].scopeId] = data.data[i].name;
// 						}
// 					}
// 				})
// 			}
// 			var html=""
// 			html+='<option value="-1">请选择地区</option>'
// 			for (var i in scopeName){
// 				html+='<option value="'+i+'">'+scopeName[i]+'</option>'
// 			}
// 			$(".VipLocation").html(html)
// 		}
//
// 		function addVip(name, sex, localarea, idcard, phone, scope, political, type, serviceType, attachment) {
// 			$.ajax({
// 				type: "POST",
// 				url: rootPath + "/api/insertHuiyuan",
// 				dataType: "json",
// 				data: {
// 					name: name,
// 					sex: sex,
// 					address: localarea,
// 					cardNo: idcard,
// 					mobile: phone,
// 					scopeId: scope,
// 					political: political,
// 					huiyuanType: type,
// 					serviceType: serviceType,
// 					attachment: attachment,
// 				},
// 				success: function (data) {
// 					if (data.status === 200) {
// 						bootAlert("新增会员成功");
// 						$("#addPage .backimg").click();
// 					} else {
// 						bootAlert("新增会员失败")
// 					}
// 				},
// 				error: function () {
// 					bootAlert("新增会员失败")
// 				}
// 			})
// 		}
//
// 		function editVip(id, name, sex, localarea, idcard, phone, scope, political, type, serviceType, attachment) {
// 			$.ajax({
// 				type: "POST",
// 				url: rootPath + "/api/updateHuiyuan",
// 				dataType: "json",
// 				data: {
// 					id: id,
// 					name: name,
// 					sex: sex,
// 					address: localarea,
// 					cardNo: idcard,
// 					mobile: phone,
// 					scopeId: scope,
// 					political: political,
// 					huiyuanType: type,
// 					serviceType: serviceType,
// 					attachment: attachment
// 				},
// 				success: function (data) {
// 					if (data.status === 200) {
// 						bootAlert("更新成功");
// 						$("#editPage .backimg").click();
// 					} else {
// 						bootAlert("更新失败");
// 					}
// 				},
// 				error: function () {
// 					bootAlert("服务器请求失败");
// 				}
// 			})
// 		}
//
//
// 		function bootAlert(message) {
// 			bootbox.alert({
// 				message:message,
// 				buttons:{
// 					ok: {
// 						label: '确认',
// 					}
// 				}
// 			});
// 		}
// 	}
// );
//
//
//
