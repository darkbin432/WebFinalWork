/**
 * @author kzn
 */

/**
 *    Overall version 1.6
 *    This version 1.6
 */

var scopeList = [];
var selectQueryScopeId = null;
var gwzw = [];
var gwzwReal = [];
var gwzwSize = [];
var gwfj = [];
var gwfjReal = [];
var gwfjSize = [];

jQuery(function ($) {

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
		if ($(this).attr("id") == "gongwenliebiao")
			return;
		
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

	//表格
	var datTableInitGongWen = {
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
	datTableInitGongWen["sAjaxSource"] = rootPath + '/api/selectAllOfficialDocument';
	// 设置字段数据源
	datTableInitGongWen["aoColumns"] = [
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
		}
	];
	// 渲染字段数据源
	datTableInitGongWen["aoColumnDefs"] = [
		{
			"aTargets": [0], "mRender": function (data, type, row, meta) {
				return meta.row + 1 + meta.settings._iDisplayStart;
			}
		},
		{
			"aTargets": [1], "mRender": function (data, type, row, meta) {
				return row.createdTime.substring(0, 10);
			}
		},
		{
			"aTargets": [2], "mRender": function (data, type, row, meta) {
				return "<div class='gongwenList-title'>《" + row.title + "》</div>";
			}
		},
		{
			"aTargets": [3], "mRender": function (data, type, row, meta) {
				return "<div class='gongwenList-name'>" + row.zhubancs + "</div>";
			}
		},
		{
			"aTargets": [4], "mRender": function (data, type, row, meta) {
				return row.nigaor;
			}
		},
		{
			"aTargets": [5], "mRender": function (data, type, row, meta) {
				var html = "";
				if (user.id === row.reportPersonId) {
					html += '<div class="table-operate"><a id="gongwen-edit-' + row.id + '" class="gongwen-operation-1">编辑</a>';
					// html += '<div></div><a id="gongwen-read-' + row.id + '" class="gongwen-operation-2">查看</a>';
					html += '<div></div><a style="color: #1890ff;" id="gongwen-delete-' + row.id + '"class="gongwen-operation-3">删除</a>';
				} else {
					html += '<div class="table-operate2"><a id="gongwen-read-' + row.id + '" class="gongwen-operation-2">查看</a>';
				}
				return html;
			}
		},
	];

	datTableInitGongWen["fnServerData"] = function (sSource, aoData, fnCallback) {
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
				name: $(".gwcxtj").val(),
				date: $("#gwcxTime").val()
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
	var dataInfoTableGongWen = $("#gongwen-table").dataTable(datTableInitGongWen).api();

	//返回
	$(".l-title").on('click', 'img', function () {
		$("#gongwenliebiao").click();
	})

	//公文列表
	$("#gongwenliebiao").click(function () {
		reloadAjax(dataInfoTableGongWen);
	})
	$(".gwcx").click(function () {
		reloadAjax(dataInfoTableGongWen);
	})

	//新增公文
	$("#addGongWen").click(function () {
		gwzw = [];
		gwzwReal = [];
		gwzwSize = [];
		gwfj = [];
		gwfjReal = [];
		gwfjSize = [];
		$(".right-main:nth-child(9) .l-title").html('写公文');
		$(".right-main:nth-child(9) .s-title").html("公文管理/写公文");
		$(".gongwen-buttons button:nth-child(3)").removeClass("hidden");
		$(".gongwen-buttons button:nth-child(4)").removeClass("hidden");
		$(".gongwen-buttons button:nth-child(1)").addClass("hidden");
		$(".gongwen-buttons button:nth-child(2)").addClass("hidden");
		$(".right>div").addClass("hidden");
		$(".gongwen-buttons").attr("name","");
		$(".zhusongjg").html("");
		$(".danweiyj").html("");
		$(".shenheyj").html("");
		$(".fawenh").html("");
		$(".zhubancs").html("");
		$(".gwtitle").html("");
		$(".gongwen-fujians").html("");
		$(".chaosongjg").html("");
		$(".chuzhanghq").html("");
		$(".nigaor").html("");
		$(".jiaodui").html("");
		$(".gongyin").html("");
		$(".yinfasj").html("");
		$(".zhutic").html("");
		$(".right-main:nth-child(9)").removeClass("hidden");
	})
	//公文正文
	$("#gongwen-zhengwen").click(function () {
		$("#gongwen-zhengwen").next().click();
	});
	$("#gongwen-zhengwen").next().change(function () {
		var name = $(this)[0].files[0].name;
		var size = $(this)[0].files[0].size;
		var formData = new FormData();
		formData.append('file_data', $(this)[0].files[0]);
		var input = $(this);
		$.ajax({
			type: "POST",
			url: rootPath + "/api/file/fileUpload?fileType=task",
			dataType: "json",
			data: formData,
			contentType: false,
			processData: false,
			success: function (data) {
				if (data.status == 200) {
					gwzw.push(data.data.fileName);
					gwzwReal.push(name);
					if (size < 1024 * 1024){
						size = (parseFloat(parseInt(size)) / 1024).toFixed(1) + "K";
					}else{
						size = (parseFloat(parseInt(size)) / 1024 / 1024).toFixed(1) + "M";
					}
					gwzwSize.push(size);
					var html = "";
					html += '<div class="gongwen-fujian-item">';
					html += '<img src="' + rootPath + '/resources/icon/fujian.png">';
					html += '<span id="' + data.data.fileName + '">' + name + ' (' + size + ')' + '</span>';
					html += '<span class="deleteGongwenzw">删除</span>';
					html += '</div>';
					$("#gongwen-zhengwen").prev().append(html);
				} else {
					bootAlert("上传失败")
				}
				input.val("");
			},
			error: function () {
				bootAlert("上传失败")
				input.val("");
			}
		})
	});
	//公文文稿
	$("#gongwen-fujian").click(function () {
		$("#gongwen-fujian").next().click();
	});
	$("#gongwen-fujian").next().change(function () {
		var name = $(this)[0].files[0].name;
		var size = $(this)[0].files[0].size;
		var formData = new FormData();
		formData.append('file_data', $(this)[0].files[0]);
		var input = $(this);
		$.ajax({
			type: "POST",
			url: rootPath + "/api/file/fileUpload?fileType=task",
			dataType: "json",
			data: formData,
			contentType: false,
			processData: false,
			success: function (data) {
				if (data.status == 200) {
					gwfj.push(data.data.fileName);
					gwfjReal.push(name);
					if (size < 1024 * 1024){
						size = (parseFloat(parseInt(size)) / 1024).toFixed(1) + "K";
					}else{
						size = (parseFloat(parseInt(size)) / 1024 / 1024).toFixed(1) + "M";
					}
					gwfjSize.push(size);
					var html = "";
					html += '<div class="gongwen-fujian-item">';
					html += '<img src="' + rootPath + '/resources/icon/fujian.png">';
					html += '<span id="' + data.data.fileName + '">' + name + ' (' + size + ')' + '</span>';
					html += '<span class="deleteGongwenfj">删除</span>';
					html += '</div>';
					$("#gongwen-fujian").prev().append(html);
				} else {
					bootAlert("上传失败")
				}
				input.val("");
			},
			error: function () {
				bootAlert("上传失败")
				input.val("");
			}
		})
	});
	//公文文稿附件删除
	$(".gongwen-fujians").on("click", ".deleteGongwenzw", function () {
		var val = $(this).prev().attr("id");
		var index = -1;
		for (var i = 0; i < gwzw.length; i++) {
			if (gwzw[i] == val) {
				index = i;
				break;
			}
		}
		gwzw.splice(index, 1);
		gwzwReal.splice(index, 1);
		gwzwSize.splice(index, 1);
		$(this).parent().remove();
	})
	$(".gongwen-fujians").on("click", ".deleteGongwenfj", function () {
		var val = $(this).prev().attr("id");
		var index = -1;
		for (var i = 0; i < gwfj.length; i++) {
			if (gwfj[i] == val) {
				index = i;
				break;
			}
		}
		gwfj.splice(index, 1);
		gwfjReal.splice(index, 1);
		gwfjSize.splice(index, 1);
		$(this).parent().remove();
	})
	//公文编辑
	$("#gongwen-table").delegate('.gongwen-operation-1', 'click', function () {
		gwzw = [];
		gwzwReal = [];
		gwfj = [];
		gwfjReal = [];
		var id = $(this).attr("id").replace("gongwen-edit-", "");
		$(".gongwen-buttons").attr("name", id);
		$(".right-main:nth-child(9) .l-title").html('<img src="' + rootPath + '/resources/icon/fanhui.png">编辑公文');
		$(".right-main:nth-child(9) .s-title").html("公文管理/公文列表/公文编辑");
		$(".gongwen-buttons button:nth-child(1)").removeClass("hidden");
		$(".gongwen-buttons button:nth-child(2)").removeClass("hidden");
		$(".gongwen-buttons button:nth-child(3)").addClass("hidden");
		$(".gongwen-buttons button:nth-child(4)").addClass("hidden");
		$(".right>div").addClass("hidden");
		$(".zhusongjg").html("");
		$(".danweiyj").html("");
		$(".shenheyj").html("");
		$(".fawenh").html("");
		$(".zhubancs").html("");
		$(".gwtitle").html("");
		$(".gongwen-fujians").html("");
		$(".chaosongjg").html("");
		$(".chuzhanghq").html("");
		$(".nigaor").html("");
		$(".jiaodui").html("");
		$(".gongyin").html("");
		$(".yinfasj").html("");
		$(".zhutic").html("");
		$(".right-main:nth-child(9)").removeClass("hidden");

		$.ajax({
			type: "GET",
			url: rootPath + "/api/selectOneOfficialDocument",
			dataType: "json",
			data: {
				id: id
			},
			success: function (data) {
				if (data.status === 200) {
					$(".zhusongjg").html(data.data.zhusongjg);
					$(".danweiyj").html(data.data.danweiyj);
					$(".shenheyj").html(data.data.shenheyj);
					$(".fawenh").html(data.data.fawenh);
					$(".zhubancs").html(data.data.zhubancs);
					$(".gwtitle").html(data.data.title);
					if (data.data.contentReal != "") {
						gwzw = data.data.content.split(";");
						gwzwReal = data.data.contentReal.split(";");
						gwzwSize = data.data.contentSize.split(";");
						for (var i = 0; i < gwzw.length; i++) {
							var html = "";
							html += '<div class="gongwen-fujian-item">';
							html += '<img src="' + rootPath + '/resources/icon/fujian.png">';
							html += '<span id="' + gwzw[i] + '">' + gwzwReal[i] + ' (' + gwzwSize[i] + ')' + '</span>';
							html += '<span class="deleteGongwenzw">删除</span>';
							html += '</div>';
							$("#gongwen-zhengwen").prev().append(html);
						}
					}
					if (data.data.fileReal != "") {
						gwfj = data.data.file.split(";");
						gwfjReal = data.data.fileReal.split(";");
						gwfjSize = data.data.fileSize.split(";");
						for (var i = 0; i < gwfj.length; i++) {
							var html = "";
							html += '<div class="gongwen-fujian-item">';
							html += '<img src="' + rootPath + '/resources/icon/fujian.png">';
							html += '<span id="' + gwfj[i] + '">' + gwfjReal[i] + ' (' + gwfjSize[i] + ')' + '</span>';
							html += '<span class="deleteGongwenfj">删除</span>';
							html += '</div>';
							$("#gongwen-fujian").prev().append(html);
						}
					}
					$(".chaosongjg").html(data.data.chaosongjg);
					$(".chuzhanghq").html(data.data.chuzhanghq);
					$(".nigaor").html(data.data.nigaor);
					$(".jiaodui").html(data.data.jiaodui);
					$(".gongyin").html(data.data.gongyin);
					var date = new Date(data.data.yinfasj);
					var y = date.getFullYear();
					var m = date.getMonth() + 1;
					var d = date.getDate();
					$(".yinfasj").html(y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d));
					$(".zhutic").html(data.data.zhutic);
				} else {
					bootAlert("获取失败");
				}
			},
			error: function () {
				alert("服务器请求失败")
			}
		})
	});

	//公文删除
	$("#gongwen-table").delegate('.gongwen-operation-3', 'click', function () {
		var id = $(this).attr("id").replace("gongwen-delete-", "");
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
	})
	//公文查看
	$("#gongwen-table").delegate('.gongwen-operation-2', 'click', function () {
		var id = $(this).attr("id").replace("gongwen-read-", "");
		$(".right>div").addClass("hidden");
		$(".right>div").addClass("hidden");
		$(".right-main:nth-child(10)").removeClass("hidden");
		$(".zhusongjg").html("");
		$(".danweiyj").html("");
		$(".shenheyj").html("");
		$(".fawenh").html("");
		$(".zhubancs").html("");
		$(".gwtitle").html("");
		$(".gongwen-fujians").html("");
		$(".chaosongjg").html("");
		$(".chuzhanghq").html("");
		$(".nigaor").html("");
		$(".jiaodui").html("");
		$(".gongyin").html("");
		$(".yinfasj").html("");
		$(".zhutic").html("");

		$.ajax({
			type: "GET",
			url: rootPath + "/api/selectOneOfficialDocument",
			dataType: "json",
			data: {
				id: id
			},
			success: function (data) {
				if (data.status === 200) {
					$(".zhusongjg").html(data.data.zhusongjg);
					$(".danweiyj").html(data.data.danweiyj);
					$(".shenheyj").html(data.data.shenheyj);
					$(".fawenh").html(data.data.fawenh);
					$(".zhubancs").html(data.data.zhubancs);
					$(".gwtitle").html(data.data.title);
					if (data.data.contentReal != "") {
						gwzw = data.data.content.split(";");
						gwzwReal = data.data.contentReal.split(";");
						gwzwSize = data.data.contentSize.split(";");
						for (var i = 0; i < gwzw.length; i++) {
							var html = "";
							html += '<div class="gongwen-fujian-item">';
							html += '<img src="' + rootPath + '/resources/icon/fujian.png">';
							html += '<span id="' + gwzw[i] + '">' + gwzwReal[i] + ' (' + gwzwSize[i] + ')' + '</span>';
							html += '<span class="downloadGongwen"><a href="' + taskPath + gwzw[i] + '" download="' + gwzwReal[i] + '">下载</a></span>';
							html += '</div>';
							$("#GongWenRead .gwzw").append(html);
						}
					}
					if (data.data.fileReal != "") {
						gwfj = data.data.file.split(";");
						gwfjReal = data.data.fileReal.split(";");
						gwfjSize = data.data.fileSize.split(";");
						for (var i = 0; i < gwfj.length; i++) {
							var html = "";
							html += '<div class="gongwen-fujian-item">';
							html += '<img src="' + rootPath + '/resources/icon/fujian.png">';
							html += '<span id="' + gwfj[i] + '">' + gwfjReal[i] + ' (' + gwfjSize[i] + ')' + '</span>';
							html += '<span class="downloadGongwen"><a href="' + taskPath + gwfj[i] + '" download="' + gwfjReal[i] + '">下载</a></span>';
							html += '</div>';
							$("#GongWenRead .gwfj").append(html);
						}
					}
					$(".chaosongjg").html(data.data.chaosongjg);
					$(".chuzhanghq").html(data.data.chuzhanghq);
					$(".nigaor").html(data.data.nigaor);
					$(".jiaodui").html(data.data.jiaodui);
					$(".gongyin").html(data.data.gongyin);
					var date = new Date(data.data.yinfasj);
					var y = date.getFullYear();
					var m = date.getMonth() + 1;
					var d = date.getDate();
					$(".yinfasj").html(y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d));
					$(".zhutic").html(data.data.zhutic);
				} else {
					bootAlert("获取失败");
				}
			},
			error: function () {
				alert("服务器请求失败")
			}
		})
	});

	//公文按钮
	$(".gongwen-buttons .xzbc").click(function () {
		var zhusongjg = $(".zhusongjg").html();
		var danweiyj = $(".danweiyj").html();
		var shenheyj = $(".shenheyj").html();
		var fawenh = $(".fawenh").html();
		var zhubancs = $(".zhubancs").html();
		var title = $(".gwtitle").html();
		var chuzhanghq = $(".chuzhanghq").html();
		var nigaor = $(".nigaor").html();
		var chaosongjg = $(".chaosongjg").html();
		var jiaodui = $(".jiaodui").html();
		var gongyin = $(".gongyin").html();
		var yinfasj = $(".yinfasj").html();
		var zhutic = $(".zhutic").html();

		if (zhusongjg === "" || danweiyj === "" || shenheyj === "" || fawenh === "" || zhubancs === "" || title === ""
			|| chuzhanghq === "" || nigaor === "" || chaosongjg === "" || jiaodui === "" || gongyin === "" || yinfasj === ""
			|| zhutic === "" || gwzw === "") {
			bootAlert("有信息尚未填写");
		} else {
			if ($(".gongwen-buttons").attr("name") != "") {
				//update
				$.ajax({
					type: "POST",
					url: rootPath + "/api/updateOfficialDocument",
					dataType: "json",
					data: {
						id: $(".gongwen-buttons").attr("name"),
						zhusongjg: zhusongjg,
						danweiyj: danweiyj,
						shenheyj: shenheyj,
						fawenh: fawenh,
						zhubancs: zhubancs,
						title: title,
						content: gwzw.join(";"),
						contentReal: gwzwReal.join(";"),
						contentSize: gwzwSize.join(";"),
						file: gwfj.join(";"),
						fileReal: gwfjReal.join(";"),
						fileSize: gwfjSize.join(";"),
						chuzhanghq: chuzhanghq,
						nigaor: nigaor,
						jiaodui: jiaodui,
						gongyin: gongyin,
						yinfasj: yinfasj,
						chaosongjg: chaosongjg,
						zhutic: zhutic
					},
					success: function (data) {
						if (data.status === 200) {
							bootAlert("保存成功");
						} else {
							bootAlert("保存失败");
						}
					},
					error: function () {
						alert("服务器请求失败")
					}
				})
			} else {
				//insert
				$.ajax({
					type: "POST",
					url: rootPath + "/api/insertOfficialDocument",
					dataType: "json",
					data: {
						reportPersonId: user.id,
						zhusongjg: zhusongjg,
						danweiyj: danweiyj,
						shenheyj: shenheyj,
						fawenh: fawenh,
						zhubancs: zhubancs,
						title: title,
						content: gwzw.join(";"),
						contentReal: gwzwReal.join(";"),
						contentSize: gwzwSize.join(";"),
						file: gwfj.join(";"),
						fileReal: gwfjReal.join(";"),
						fileSize: gwfjSize.join(";"),
						chuzhanghq: chuzhanghq,
						nigaor: nigaor,
						jiaodui: jiaodui,
						gongyin: gongyin,
						yinfasj: yinfasj,
						chaosongjg: chaosongjg,
						zhutic: zhutic
					},
					success: function (data) {
						if (data.status === 200) {
							$(".gongwen-buttons").attr("name", data.data);
							bootAlert("保存成功");
						} else {
							bootAlert("保存失败");
						}
					},
					error: function () {
						alert("服务器请求失败")
					}
				})
			}
		}
	})

	$(".gongwen-buttons .xztj").click(function () {
		var zhusongjg = $(".zhusongjg").html();
		var danweiyj = $(".danweiyj").html();
		var shenheyj = $(".shenheyj").html();
		var fawenh = $(".fawenh").html();
		var zhubancs = $(".zhubancs").html();
		var title = $(".gwtitle").html();
		var chuzhanghq = $(".chuzhanghq").html();
		var nigaor = $(".nigaor").html();
		var chaosongjg = $(".chaosongjg").html();
		var jiaodui = $(".jiaodui").html();
		var gongyin = $(".gongyin").html();
		var yinfasj = $(".yinfasj").html();
		var zhutic = $(".zhutic").html();

		if (zhusongjg === "" || danweiyj === "" || shenheyj === "" || fawenh === "" || zhubancs === "" || title === ""
			|| chuzhanghq === "" || nigaor === "" || chaosongjg === "" || jiaodui === "" || gongyin === "" || yinfasj === ""
			|| zhutic === "" || gwzw === "") {
			bootAlert("有信息尚未填写");
		} else {
			if ($(".gongwen-buttons").attr("name") != "") {
				//update
				$.ajax({
					type: "POST",
					url: rootPath + "/api/updateOfficialDocument",
					dataType: "json",
					data: {
						id: $(".gongwen-buttons").attr("name"),
						zhusongjg: zhusongjg,
						danweiyj: danweiyj,
						shenheyj: shenheyj,
						fawenh: fawenh,
						zhubancs: zhubancs,
						title: title,
						content: gwzw.join(";"),
						contentReal: gwzwReal.join(";"),
						contentSize: gwzwSize.join(";"),
						file: gwfj.join(";"),
						fileReal: gwfjReal.join(";"),
						fileSize: gwfjSize.join(";"),
						chuzhanghq: chuzhanghq,
						nigaor: nigaor,
						jiaodui: jiaodui,
						gongyin: gongyin,
						yinfasj: yinfasj,
						chaosongjg: chaosongjg,
						zhutic: zhutic
					},
					success: function (data) {
						if (data.status === 200) {
							bootAlert("提交成功");
							$("#gongwenliebiao").click();
						} else {
							bootAlert("提交失败");
						}
					},
					error: function () {
						alert("服务器请求失败")
					}
				})
			} else {
				//insert
				$.ajax({
					type: "POST",
					url: rootPath + "/api/insertOfficialDocument",
					dataType: "json",
					data: {
						reportPersonId: user.id,
						zhusongjg: zhusongjg,
						danweiyj: danweiyj,
						shenheyj: shenheyj,
						fawenh: fawenh,
						zhubancs: zhubancs,
						title: title,
						content: gwzw.join(";"),
						contentReal: gwzwReal.join(";"),
						contentSize: gwzwSize.join(";"),
						file: gwfj.join(";"),
						fileReal: gwfjReal.join(";"),
						fileSize: gwfjSize.join(";"),
						chuzhanghq: chuzhanghq,
						nigaor: nigaor,
						jiaodui: jiaodui,
						gongyin: gongyin,
						yinfasj: yinfasj,
						chaosongjg: chaosongjg,
						zhutic: zhutic
					},
					success: function (data) {
						if (data.status === 200) {
							$(".gongwen-buttons").attr("name", data.data);
							bootAlert("提交成功");
							$("#gongwenliebiao").click();
						} else {
							bootAlert("提交失败");
						}
					},
					error: function () {
						alert("服务器请求失败")
					}
				})
			}
		}
	})

	$(".gongwen-buttons .bjbc").click(function () {
		var zhusongjg = $(".zhusongjg").html();
		var danweiyj = $(".danweiyj").html();
		var shenheyj = $(".shenheyj").html();
		var fawenh = $(".fawenh").html();
		var zhubancs = $(".zhubancs").html();
		var title = $(".gwtitle").html();
		var chuzhanghq = $(".chuzhanghq").html();
		var nigaor = $(".nigaor").html();
		var chaosongjg = $(".chaosongjg").html();
		var jiaodui = $(".jiaodui").html();
		var gongyin = $(".gongyin").html();
		var yinfasj = $(".yinfasj").html();
		var zhutic = $(".zhutic").html();

		if (zhusongjg === "" || danweiyj === "" || shenheyj === "" || fawenh === "" || zhubancs === "" || title === ""
			|| chuzhanghq === "" || nigaor === "" || chaosongjg === "" || jiaodui === "" || gongyin === "" || yinfasj === ""
			|| zhutic === "" || gwzw === "") {
			bootAlert("有信息尚未填写");
		} else {
			//update
			$.ajax({
				type: "POST",
				url: rootPath + "/api/updateOfficialDocument",
				dataType: "json",
				data: {
					id: $(".gongwen-buttons").attr("name"),
					zhusongjg: zhusongjg,
					danweiyj: danweiyj,
					shenheyj: shenheyj,
					fawenh: fawenh,
					zhubancs: zhubancs,
					title: title,
					content: gwzw.join(";"),
					contentReal: gwzwReal.join(";"),
					contentSize: gwzwSize.join(";"),
					file: gwfj.join(";"),
					fileReal: gwfjReal.join(";"),
					fileSize: gwfjSize.join(";"),
					chuzhanghq: chuzhanghq,
					nigaor: nigaor,
					jiaodui: jiaodui,
					gongyin: gongyin,
					yinfasj: yinfasj,
					chaosongjg: chaosongjg,
					zhutic: zhutic
				},
				success: function (data) {
					if (data.status === 200) {
						bootAlert("保存成功");
						$("#gongwenliebiao").click();
					} else {
						bootAlert("保存失败");
					}
				},
				error: function () {
					alert("服务器请求失败")
				}
			})
		}
	})



	//主送机关
	$("#zhusongjg-1").bind("keyup", function () {
		var txt = $(this).html();
		$("#zhusongjg-copy").html(txt)
	});
	$("#zhusongjg-1").on("paste", function (e){
		e.preventDefault();
		var text;
		var clp = (e.originalEvent || e).clipboardData;
		if (clp === undefined || clp === null) {
			text = window.clipboardData.getData("text") || "";
			if (text !== "") {
				if (window.getSelection) {
					var newNode = document.createElement("span");
					newNode.innerHTML = text;
					window.getSelection().getRangeAt(0).insertNode(newNode);
				} else {
					document.selection.createRange().pasteHTML(text);
				}
			}
		} else {
			text = clp.getData('text/plain') || "";
			if (text !== "") {
				document.execCommand('insertText', false, text);

			}
		}
		var txt = $(this).html();
		$("#zhusongjg-copy").html(txt)
	});
	$("#zhusongjg-copy").bind("keyup", function () {
		var txt = $(this).html();
		$("#zhusongjg-1").html(txt)
	});
	$("#zhusongjg-copy").on("paste", function (e){
		e.preventDefault();
		var text;
		var clp = (e.originalEvent || e).clipboardData;
		if (clp === undefined || clp === null) {
			text = window.clipboardData.getData("text") || "";
			if (text !== "") {
				if (window.getSelection) {
					var newNode = document.createElement("span");
					newNode.innerHTML = text;
					window.getSelection().getRangeAt(0).insertNode(newNode);
				} else {
					document.selection.createRange().pasteHTML(text);
				}
			}
		} else {
			text = clp.getData('text/plain') || "";
			if (text !== "") {
				document.execCommand('insertText', false, text);
			}
		}
		var txt = $(this).html();
		$("#zhusongjg-1").html(txt)
	});
	//粘贴样式
	$(".danweiyj,.shenheyj,.fawenh,.zhubancs,.gwtitle,.chuzhanghq,.nigaor,.chaosongjg,.jiaodui,.gongyin,.yinfasj,.zhutic").on("paste", function (e){
		e.preventDefault();
		var text;
		var clp = (e.originalEvent || e).clipboardData;
		if (clp === undefined || clp === null) {
			text = window.clipboardData.getData("text") || "";
			if (text !== "") {
				if (window.getSelection) {
					var newNode = document.createElement("span");
					newNode.innerHTML = text;
					window.getSelection().getRangeAt(0).insertNode(newNode);
				} else {
					document.selection.createRange().pasteHTML(text);
				}
			}
		} else {
			text = clp.getData('text/plain') || "";
			if (text !== "") {
				document.execCommand('insertText', false, text);
			}
		}
	});
});


function reloadAjax(ajaxTable) {
	ajaxTable.ajax.reload(false);
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
