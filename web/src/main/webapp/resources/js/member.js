/**
 * @author kzn
 */
/**
 *    Overall version 1.6
 *    This version 1.6
 */

var member = {};
var jgList = [];
var jgMap = {};
var scope = {};
var selectJgId;
var selectMemberId;
var selectMemberType;
var memberIdWhenPlsc = [];
var user;
var searchFlag = false;
var searchMember = {};

jQuery(
	function ($) {
		//获取当前用户
		$.ajax({
			type: "GET",
			url: rootPath + "/getCurrentUser",
			dataType: "json",
			async: false,
			data: {},
			success: function (data) {
				if (data.status == 200) {
					user = data.data;
					$(".user-realName").html(user.name)
				} else {
				}
			},
			error: function () {
			}
		});

		function split(val) {
			return val.split(/;\s*/);
		}
		function extractLast(term) {
			return split(term).pop();
		}
		//搜索
		$("#search")
			.bind("keydown", function (event) {
				if (event.keyCode === $.ui.keyCode.TAB &&
					$(this).data("ui-autocomplete").menu.active) {
					event.preventDefault();
				}
			})
			.autocomplete({
				source: function (request, response) {
					$.getJSON("api/selectMember2", {
						term: extractLast(request.term)
					}, function (data) {
						response($.map(data.data, function (item) {
							searchMember = {};
							return {
								label: item.name + " " + item.organizationName,
								value: {"name":item.name,"id":item.id,"organizationId":item.organizationId},
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
					// var terms = split(this.value);
					// 移除当前输入
					// terms.pop();
					// 添加被选项
					// terms.push(ui.item.value);
					// 添加占位符，在结尾添加逗号+空格
					// terms.push("");
					searchMember = ui.item.value;
					 this.value = ui.item.value["name"];
					return false;
				}
			});

		$("#searchButton").click(function () {
		    if ($("#search").val() == ""){
		        searchMember = {};
		        return;
            }
			var list = [];
			var jgId = searchMember["organizationId"]
			while (jgId != 32 && jgMap[jgId].parentOrganizationId != 32){
				list.push(jgMap[jgId].parentOrganizationId);
				jgId = jgMap[jgId].parentOrganizationId;
			}
			for (var i = list.length - 1; i >= 0; i--){
				$("#jg" + list[i]).click();
				$("#jg" + list[i]).children("img:nth-child(1)").css("transform","rotate(0deg)");
				$("#jg" + list[i]).next("ul").css("display", "block");
			}
			searchFlag = true;
			$("#jg" + searchMember["organizationId"]).click();
			$("#jg" + searchMember["organizationId"]).children("img:nth-child(1)").css("transform","rotate(0deg)");
			$("#jg" + searchMember["organizationId"]).next("ul").css("display", "block");
			if (searchFlag){
				$("#member" + searchMember["id"]).children().next().click();
				searchFlag = false;
			}
		});

		//权限控制
		function powerControl() {
			if (user.type === 0) {
				$(".power").addClass("hidden");
				$(":input").attr("readonly", true);
				$(".type").attr("disabled", true);
			} else {
				if (user.scopeId === 0) {
					$(".power").removeClass("hidden");
					$(":input").attr("readonly", false);
					$(".type").attr("disabled", false);
				} else if (user.scopeId % 10000 === 0) {
					if (jgMap[selectJgId].scopeId < user.scopeId || jgMap[selectJgId].scopeId > user.scopeId + 9999) {
						$(".power").addClass("hidden");
						$(":input").attr("readonly",true);
						$(".type").attr("disabled",true);
					}else{
						$(".power").removeClass("hidden");
						$(":input").attr("readonly",false);
						$(".type").attr("disabled",false);
					}
				}else if (user.scopeId % 100 === 0){
					if (jgMap[selectJgId].scopeId < user.scopeId || jgMap[selectJgId].scopeId > user.scopeId + 99){
						$(".power").addClass("hidden");
						$(":input").attr("readonly",true);
						$(".type").attr("disabled",true);
					}else{
						$(".power").removeClass("hidden");
						$(":input").attr("readonly",false);
						$(".type").attr("disabled",false);
					}
				}else{
					if (jgMap[selectJgId].scopeId !== user.scopeId){
						$(".power").addClass("hidden");
						$(":input").attr("readonly",true);
						$(".type").attr("disabled",true);
					}else{
						$(".power").removeClass("hidden");
						$(":input").attr("readonly",false);
						$(".type").attr("disabled",false);
					}
				}
			}
			if (jgMap[selectJgId].scopeId === user.scopeId){
				$(".jgDelete").addClass("hidden");
			}else{
				$(".jgDelete").removeClass("hidden");
			}
			$("#search").removeAttr("readonly");
		}
		//获取scope信息
	    function listScope() {
            $.ajax({
                type: "GET",
                url: rootPath + "/api/listScope",
                dataType: "json",
                cache:false,
                data: {},
                success: function (data) {
                    for (var i = 0; i < data.data.length; i++) {
                        scope[data.data[i].scopeId] = data.data[i].organizationId;
                    }
                }
            })
        }
		function bootAlert(message) {
			bootbox.alert({
				message:message,
				buttons:{
					ok: {
						label: '确认',
					}
				}
			});
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
                        for (var i = 0; i < data.data.length; i++){
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
		//生成机构导航
        function setOrganizationList() {
            var html0 = "";
	        var html1 = "<ul>\n";
            for (var i = 0; i < jgList.length; i++) {
                if (jgList[i].parentOrganizationId === -1){
                    html0 += "<a id='jg" + jgList[i].id + "'>\n<img src='" + rootPath + "/resources/icon/iconse.png'>\n" +
                        "<img src=" + rootPath + "/resources/icon/zuocechouti.png>\n" +
                        "杭州市计生协\n</a>";
                }
                if (jgList[i].parentOrganizationId === 32) {
                    html1 += "<li>\n<a id='jg" + jgList[i].id + "'>" +
                        "<img src='" + rootPath + "/resources/icon/iconse.png'>\n" +
                        "<img src='" + rootPath + "/resources/icon/wenjian.png'>" + jgList[i].name + "</a>\n";
                    var html2 = "<ul>\n";
                    for (var j = 0; j < jgList.length; j++) {
                        if (jgList[j].parentOrganizationId === jgList[i].id) {
                            html2 += "<li>\n<a id='jg" + jgList[j].id + "'>" +
                                "<img src='" + rootPath + "/resources/icon/iconse.png'>\n" +
                                "<img src='" + rootPath + "/resources/icon/wenjian.png'>" + jgList[j].name + "</a>\n";
                            var html3 = "<ul>\n<li>\n";
                            for (var k = 0; k < jgList.length; k++) {
                                if (jgList[k].parentOrganizationId === jgList[j].id) {
                                    html3 += "<a id='jg" + jgList[k].id + "'>" + jgList[k].name + "</a>\n";
                                }
                            }
                            html3 += "</li>\n</ul>\n</li>\n";
                            html2 += html3;
                        }
                    }
                    html2 += "</ul>\n</li>\n";
                    html1 += html2;
                }
            }
            html1 += "</ul>\n";
            html1 = html0 + html1;
            $("#main").html(html1);
        }

        function setChildList(id) {
			if (jgMap[selectJgId].scopeId % 10000 === 0){
				var html1 = "";
				for (var i = 0; i < jgList.length; i++) {
					if (jgList[i].parentOrganizationId === id) {
						html1 += "<li>\n<a id='jg" + jgList[i].id + "'>" +
							"<img src='" + rootPath + "/resources/icon/iconse.png'>\n" +
							"<img src='" + rootPath + "/resources/icon/wenjian.png'>" + jgList[i].name + "</a>\n";
						var html2 = "<ul>\n<li>\n";
						for (var j = 0; j < jgList.length; j++) {
							if (jgList[j].parentOrganizationId === jgList[i].id) {
								html2 += "<a id='jg" + jgList[j].id + "'>" + jgList[j].name + "</a>\n";
							}
						}
						html2 += "</li>\n</ul>\n</li>\n";
						html1 += html2;
					}
				}
				html1 += "</ul>\n</li>\n";
				$("#jg"+id).next().html(html1);
			}else{
				var html1 = "<li>\n";
				var html2 = "";
				for (var i = 0; i < jgList.length; i++) {
					if (jgList[i].parentOrganizationId === id) {
						html2 += "<a id='jg" + jgList[i].id + "'>" + jgList[i].name + "</a>\n";
					}
				}
				html1 += html2;
				html1 += "</li>\n";
				$("#jg"+id).next().html(html1);
			}
		}
        //填充机构信息
        function setInfo(id) {
            $(".organization-info-title").html(jgMap[id].name);
            if (jgMap[id].scopeId%10000==0){
                $("#name").html(jgMap[id].name);
            }else if (jgMap[id].scopeId%100==0){
                $("#name").html(jgMap[scope[jgMap[id].scopeId - jgMap[id].scopeId % 10000]].name + "/" + jgMap[id].name);
            }else{
                $("#name").html(jgMap[scope[jgMap[id].scopeId - jgMap[id].scopeId % 10000]].name + "/" + jgMap[scope[jgMap[id].scopeId-jgMap[id].scopeId%100]].name + "/" + jgMap[id].name);
            }
            $(".organization-infos").children("label").eq(0).html("联系电话：" + jgMap[id].mobile);
            $(".organization-infos").children("label").eq(1).html("值班电话：" + jgMap[id].hotline);
            $(".organization-infos").children("label").eq(2).html("邮政编码：" + jgMap[id].postalcode);
            $(".organization-infos").children("label").eq(3).html("传真：" + jgMap[id].fax);
            $(".organization-infos").next().html("地址：" + jgMap[id].address);
        }
		//填充机构成员
        function setMembers(id) {
	        selectMemberId = null;
			$.ajax({
				type: "GET",
				url: rootPath + "/api/getMembers",
				dataType: "json",
				cache: false,
				async: false,
				data: {
					organizationId:id,
				},
				success: function (data) {
					if (data.status === 200) {
						var html = "";
						for (var i = 0; i < data.data.length; i++){
							member[data.data[i].id] = data.data[i];
							html += "<div id='member"+ data.data[i].id +"' name='type" + data.data[i].type + "' class='members-row'>\n" +
								"                            <div>\n" +
								"                                <label>\n" +
								"                                    <input type='checkbox'>\n" +
								"                                    <span class='power'></span>\n" +
								"                                </label>\n" +
								"                            </div>\n" +
								"                            <div>" + data.data[i].name + "</div>\n" +
								"                            <div>" + data.data[i].position + "</div>\n" +
								"                            <div>" + data.data[i].mobile + "</div>\n" +
								"                        </div>\n";
						}
						$(".members").html(html);
						// $(".mask").css("display","none");
						powerControl();
					}
				},
				error: function () {
					bootAlert("服务器请求失败")
				}
			})

		}
		//填充下级机构
		function setChildren(id) {
			$.ajax({
				type: "GET",
				url: rootPath + "/api/listChildren",
				dataType: "json",
				cache: false,
				async: false,
				data: {
					organizationId: id,
				},
				success: function (data) {
					if (data.status === 200) {
						var html ="";
						for (var i = 0; i < data.data.length; i++){
							html += "<li id='child" + data.data[i].id + "' class='moveLi dept'>\n" +
								"<a><img src='" + rootPath + "/resources/icon/tiaoz.png'>" + data.data[i].name +
								"(" + data.data[i].memberCount + ")" + "</a>\n" +
								"</li>";
						}
						$("#departments .departments").html(html);
					}
				},
				error: function () {
					bootAlert("服务器请求失败")
				}
			})
		}
		// //通过成员id获取成员信息
		// function getMember(id) {
        //     $.ajax({
        //         type: "GET",
        //         url: rootPath + "/api/getMember",
        //         dataType: "json",
        //         data: {
        //             id: id,
        //         },
        //         success: function (data) {
        //             if (data.status === 200) {
        //
        //             }
        //         },
        //         error: function () {
        //             alert("服务器请求失败")
        //         }
        //     })
        // }

		//删除成员
		function deleteMembers(ids) {
			$.ajax({
				type: "POST",
				url: rootPath + "/api/deleteMembers",
				dataType: "json",
				async: false,
				data: {
					ids: ids,
				},
				success: function (data) {
					if (data.status === 200){
						bootAlert("删除成功")
					}else{
						bootAlert("删除失败")
					}
				},
				error: function () {
					bootAlert("服务器请求失败")
				}
			})
		}

		$(".add-member label select").select2({
			minimumResultsForSearch: -1,
		});
		$(".edit-member label select").select2({
			minimumResultsForSearch: -1,
		});
		//顶部导航切换
		$(".myHeader ul li").eq(1).addClass("current-li");
		$(".myHeader ul li").eq(1).children("div").addClass("current-div");
		//左侧点击事件
		$(".left").on('click', 'li a', function () {
            $(".pop").addClass("hidden");
            if(!$("#members .adjust-position").hasClass("hidden")||!$("#departments .adjust-position").hasClass("hidden")){
                bootAlert("正在进行排序，请先保存在进行其他操作");
                return;
            }
			var id = parseInt($(this).attr("id").replace("jg",""));
			selectJgId = id;
			powerControl();
		    setInfo(id);
			setMembers(id);
			if (id != 32){
				setChildren(id);
			}else{
				$("#departments .departments").html("");
			}
			if (jgMap[id].scopeId % 100 != 0){
				$(".depts").addClass("hidden");
			}else{
				$(".depts").removeClass("hidden");
			}
			if(!$("#departments .adjust-position").hasClass("hidden")){
				bootAlert("正在进行排序，请先保存在进行其他操作");
				return;
			}
			if(!$("#members .adjust-position").hasClass("hidden")){
				bootAlert("正在进行排序，请先保存在进行其他操作");
				return;
			}
			$(".left li a").children("img:nth-child(1)").attr("src", rootPath + "/resources/icon/iconse.png");
			$(this).children("img:nth-child(1)").attr("src", rootPath + "/resources/icon/xuanzhong.png");
			$(".left li a").removeClass("selected-li");
			$(this).addClass("selected-li");
			if($(this).parent().attr("id")==="main")
				return;
			if($(this).children("img:nth-child(1)").css("transform")==="matrix(1, 0, 0, 1, 0, 0)"){
				$(this).children("img:nth-child(1)").css("transform","rotate(-90deg)");
			}else{
				$(this).children("img:nth-child(1)").css("transform","rotate(0deg)");
			}

			if ($(this).next("ul").length) {
				if ($(this).next("ul").css("display") === "none")
					$(this).next("ul").css("display", "block");
				else
					$(this).next("ul").css("display", "none");
			}
		});
		//允许调整成员位置
		$("#members").prev().children().eq(1).click(function () {
			var flag=0;
			$(".pop").each(function () {
				if(!$(this).hasClass("hidden")){
					flag=1;
				}
			});
			if(flag){
				$(".pop").addClass("hidden");
			}
			if(!$("#departments .adjust-position").hasClass("hidden")){
				bootAlert("请先保存部门位置");
				return;
			}
			if(!$("#members .adjust-position").hasClass("hidden")){
				bootAlert("正在进行排序，请先保存在进行其他操作");
				return;
			}
			$("#members .adjust-position").removeClass("hidden");
			$(".members").sortable({
				revert:true
			});
			var memberArr = $( ".members" ).sortable('toArray');
			localStorage.setItem("memberArr",memberArr);
		});
		//保存成员位置
		$("#members .adjust-position a:nth-child(1)").click(function () {
			$("#members .adjust-position").addClass("hidden");
			var memberArr = $( ".members" ).sortable('toArray');
			$(".members").sortable('destroy');
			localStorage.removeItem("memberArr");
			var memberStr = "";
			for (var i = 0; i < memberArr.length; i++){
				memberStr += memberArr[i].replace("member","") + ":" + (i + 1) + ";";
			}
			$.ajax({
				type: "POST",
				url: rootPath + "/api/changeMemberSequence",
				dataType: "json",
				data: {
					newSequence:memberStr,
				},
				success: function (data) {
					if (data.status === 200){
						bootAlert("修改排序成功")
					}else{
						bootAlert("修改排序失败")
					}
				},
				error: function () {
					bootAlert("服务器请求失败")
				}
			})
		});
		//撤销调整成员位置并返回之前位置
		$("#members .adjust-position a:nth-child(2)").click(function () {
			$("#members .adjust-position").addClass("hidden");
			if(localStorage.getItem("memberArr")){
				var resArr = localStorage.getItem("memberArr").split(',');
				for(var i = 0;i < resArr.length;i++){
					$('.members').append($("#" + resArr[i]));
				}
				localStorage.removeItem("memberArr");
			}
			$(".members").sortable('destroy');
		});
		//允许调整部门位置
		$("#departments").prev().children().eq(1).click(function () {
			var flag=0;
			$(".pop").each(function () {
				if(!$(this).hasClass("hidden")){
					flag=1;
				}
			});
			if(flag){
				$(".pop").addClass("hidden");
			}
			if(!$("#members .adjust-position").hasClass("hidden")){
				bootAlert("请先保存人员位置");
				return;
			}
			if(!$("#departments .adjust-position").hasClass("hidden")){
				bootAlert("正在进行排序，请先保存在进行其他操作");
				return;
			}
			$("#departments .adjust-position").removeClass("hidden");
			$(".departments").sortable({
				items:'.moveLi',
				revert:true
			});
			var departmentArr = $( ".departments" ).sortable('toArray');
			localStorage.setItem("departmentArr",departmentArr);
		});
		//保存部门位置
		$("#departments .adjust-position a:nth-child(1)").click(function () {
			$("#departments .adjust-position").addClass("hidden");
			var departmentArr = $( ".departments" ).sortable('toArray');
			$(".departments").sortable('destroy');
			localStorage.removeItem("departmentArr");
			var departmentStr = "";
			for (var i = 0; i < departmentArr.length; i++){
				departmentStr += departmentArr[i].replace("child","") + ":" + (i + 1) + ";";
			}
			$.ajax({
				type: "POST",
				url: rootPath + "/api/changeOrganizationSequence",
				dataType: "json",
				data: {
					newSequence:departmentStr,
				},
				success: function (data) {
					if (data.status === 200){
						bootAlert("修改排序成功")
						listAlljgList();
						listScope();
						setChildList(selectJgId);
					}else{
						bootAlert("修改排序失败")
					}
				},
				error: function () {
					bootAlert("服务器请求失败")
				}
			})
		});
		//撤销调整部门位置并返回之前位置
		$("#departments .adjust-position a:nth-child(2)").click(function () {
			$("#departments .adjust-position").addClass("hidden");
			if(localStorage.getItem("departmentArr")){
				var resArr = localStorage.getItem("departmentArr").split(',');
				for(var i = 0;i < resArr.length;i++){
					$('.departments').append($("#" + resArr[i]));
				}
				localStorage.removeItem("departmentArr");
			}
			$(".departments").sortable('destroy');
		});
		//弹出修改机构信息界面
		$("#edit-info").click(function () {

			if(!$("#members .adjust-position").hasClass("hidden")||!$("#departments .adjust-position").hasClass("hidden")){
				bootAlert("正在进行排序，请先保存在进行其他操作，请先保存在进行其他操作");
				return;
			}
			// $(".mask").css("display","block");
            $(".edit-info .pop-title").html("<img src='" + rootPath + "/resources/icon/bianji.png'>" +
                jgMap[selectJgId].name);
            $(".edit-info .jgName").val(jgMap[selectJgId].name);
            $(".edit-info .jgMobile").val(jgMap[selectJgId].mobile);
            $(".edit-info .jgHotline").val(jgMap[selectJgId].hotline);
            $(".edit-info .jgPostalcode").val(jgMap[selectJgId].postalcode);
            $(".edit-info .jgFax").val(jgMap[selectJgId].fax);
            $(".edit-info .jgAddress").val(jgMap[selectJgId].address);
			$(".pop").addClass("hidden");
			$(".edit-info").removeClass("hidden");
		});
		//更新机构信息
		$(".edit-info-buttons .main-button").click(function () {
		    var name = $(".edit-info .jgName").val();
		    var address = $(".edit-info .jgAddress").val();
            var fax = $(".edit-info .jgFax").val()
            var mobile = $(".edit-info .jgMobile").val();
            var hotline = $(".edit-info .jgHotline").val();
            var postalcode = $(".edit-info .jgPostalcode").val();
            if (name === "" || address === "" || fax === "" || mobile === "" || hotline === "" || postalcode === ""){
				bootAlert("必填项不能为空");
			}else if (name.length > 10){
                bootAlert("机构名称长度超出限制")
            }else if (!isPhone(mobile) && !isMobile(mobile)){
				bootAlert("联系电话格式有误");
			}else if (!isPhone(hotline) && !isMobile(hotline)){
				bootAlert("值班电话格式有误");
			}else if (!isPostalcode(postalcode)){
				bootAlert("邮政编码格式有误");
			}else if (!isFax(fax)){
				bootAlert("传真格式有误");
			}else if (address.length > 40){
                bootAlert("机构地址长度超出限制")
            }else{
				$.ajax({
					type: "POST",
					url: rootPath + "/api/updateInfo",
					dataType: "json",
					data: {
						id: selectJgId,
						name: name,
						address: address,
						fax: fax,
						mobile: mobile,
						hotline: hotline,
						postalcode: postalcode,
					},
					success :function (data) {
						if (data.status === 200){
							bootAlert("修改成功")
							$(".edit-info").addClass("hidden");
							jgMap[selectJgId].name = name;
							jgMap[selectJgId].address = address;
							jgMap[selectJgId].fax = fax;
							jgMap[selectJgId].mobile = mobile;
							jgMap[selectJgId].hotline = hotline;
							jgMap[selectJgId].postalcode = postalcode;
							setOrganizationList();
							setInfo(selectJgId);
						}else{
							bootAlert("修改失败")
						}
					},
					error :function () {
						bootAlert("服务器请求失败");
					}
				})
			}

        })
        //删除机构
        $(".edit-info-buttons .danger-button").click(function () {
            bootbox.confirm({
                title: "删除机构",
                message: "请确认是否删除该机构？",
                callback: function (result) {
                    if (result) {
                        var flag = true;
                        for (var i = 0; i < jgList.length; i++){
                            if (jgList[i].parentOrganizationId === selectJgId){
                                flag = false;
                                break;
                            }
                        }
                        if (flag){
                            $.ajax({
                                type: "POST",
                                url: rootPath + "/api/deleteOrganization",
                                dataType: "json",
                                data: {
                                    id: selectJgId,
                                },
                                success: function (data) {
                                    if (data.status === 200) {
                                        $(".edit-info").addClass("hidden");
                                        bootAlert("删除机构成功");
                                        listAlljgList();
										listScope();
                                        setOrganizationList();
                                        $("#main").children("a").click();
                                       // $(".mask").css("display","none");
                                    }
                                },
                                error :function () {
                                    bootAlert("服务器请求失败")
                                }
                            })
                        }else{
                            bootAlert("该机构存在下级机构，请先删除下级机构")
                        }
                    } else {
                        return;
                    }
                }
            });

        })
		//弹出添加成员界面
		$("#members").prev().children().eq(0).click(function () {

			if(!$("#members .adjust-position").hasClass("hidden")||!$("#departments .adjust-position").hasClass("hidden")){
				bootAlert("正在进行排序，请先保存在进行其他操作");
				return;
			}
			// $(".mask").css("display","block");
            $(".add-member .realname").val("");
            $(".add-member .type").select2().val(0).trigger("change");
            $(".add-member .mobile").val("");
            $(".add-member .telephone").val("");
            $(".add-member .username").val("");
            $(".add-member .password").val("");
            $(".add-member .position").val("");
			$(".pop").addClass("hidden");
			$(".add-member").removeClass("hidden");
		});
		//添加成员
		$(".add-member-buttons .main-button").click(function () {
		    selectMemberId = null;
		    var name = $(".add-member .realname").val();
		    var type = $(".add-member .type").val();
		    var mobile = $(".add-member .mobile").val();
		    var telephone = $(".add-member .telephone").val();
		    var username = $(".add-member .username").val();
		    var password = $(".add-member .password").val();
		    var position = $(".add-member .position").val();
			if (name === "" || type === "" || mobile === "" || username === "" || password === ""){
				bootAlert("必填项不能为空");
			}else if (!isUsername(username)){
				bootAlert("用户名由5-15位大小写英文字符、数字、下划线组成，不可重复");
			}else if (!isRealName(name)){
			    bootAlert("成员姓名格式错误")
            }else if (!isMobile(mobile)){
				bootAlert("移动电话格式有误");
			}else if (telephone !== "" && !isPhone(telephone)){
				bootAlert("办公电话格式有误");
			}else if (position.length > 30){
                bootAlert("成员职位信息长度超出限制")
            }else{
				$.ajax({
					type: "POST",
					url: rootPath + "/api/updateMember",
					dataType: "json",
					data: {
						organizationId: selectJgId,
						id: selectMemberId,
						name: name,
						type: type,
						mobile: mobile,
						telephone: telephone,
						username: username,
						password: password,
						position: position,
					},
					success: function (data) {
						if (data.status === 200) {
							bootAlert("添加成功")
							$(".add-member").addClass("hidden");
							setMembers(selectJgId);
						}else{
							if (data.msg === "该用户名已存在"){
								bootAlert(data.msg)
							}else if (data.msg.indexOf("该成员已存在") !== -1){
								bootAlert(data.msg)
							}else{
								bootAlert("添加失败")
							}
						}
					},
					error :function () {
						bootAlert("服务器请求失败")
					}
				})
			}


        })
		//弹出修改成员信息界面
		$(".members").on('click','.members-row div:nth-child(2)',function () {

			if(!$("#members .adjust-position").hasClass("hidden")||!$("#departments .adjust-position").hasClass("hidden")){
				return;
			}
			//$(".mask").css("display","block");
		    var id = $(this).parent().attr("id").replace("member","");
		    selectMemberId = id;
            $.ajax({
                type: "GET",
                url: rootPath + "/api/getMember",
                dataType: "json",
				async: false,
                data: {
                    id: id,
                },
                success: function (data) {
                    if (data.status === 200) {
                        $(".edit-member .pop-title").html("<img src='" + rootPath + "/resources/icon/ren.png'>" +
                            data.data.name + "<span>" + jgMap[data.data.organizationId].name + "</span>");
                        $(".edit-member .username").html(data.data.username);
                        $(".edit-member .realname").val(data.data.name);
                        $(".edit-member .mobile").val(data.data.mobile);
                        $(".edit-member .telephone").val(data.data.telephone);
                        $(".edit-member .position").val(data.data.position);
                        $(".edit-member .type").select2().val(data.data.type).trigger("change");
                        selectMemberType = data.data.type;
                        $(".edit-member .password").val(data.data.password);
                    }
                },
                error: function () {
					bootAlert("服务器请求失败")
                }
            })
			$(".pop").addClass("hidden");
			$(".edit-member").removeClass("hidden");
		});
		$(".members").on('click','.members-row div:nth-child(3)',function () {

			if(!$("#members .adjust-position").hasClass("hidden")||!$("#departments .adjust-position").hasClass("hidden")){
				return;
			}
			//$(".mask").css("display","block");

			var id = $(this).parent().attr("id").replace("member","");
			selectMemberId = id;
			$.ajax({
				type: "GET",
				url: rootPath + "/api/getMember",
				dataType: "json",
				async: false,
				data: {
					id: id,
				},
				success: function (data) {
					if (data.status === 200) {
						$(".edit-member .pop-title").html("<img src='" + rootPath + "/resources/icon/ren.png'>" +
							data.data.name + "<span>" + jgMap[data.data.organizationId].name + "</span>");
						$(".edit-member .username").html(data.data.username);
						$(".edit-member .realname").val(data.data.name);
						$(".edit-member .mobile").val(data.data.mobile);
						$(".edit-member .telephone").val(data.data.telephone);
						$(".edit-member .position").val(data.data.position);
						$(".edit-member .type").select2().val(data.data.type).trigger("change");
						selectMemberType = data.data.type;
						$(".edit-member .password").val(data.data.password);
					}
				},
				error: function () {
					bootAlert("服务器请求失败")
				}
			})
			$(".pop").addClass("hidden");
			$(".edit-member").removeClass("hidden");
		});
		$(".members").on('click','.members-row div:nth-child(4)',function () {

			if(!$("#members .adjust-position").hasClass("hidden")||!$("#departments .adjust-position").hasClass("hidden")){
				return;
			}
			//$(".mask").css("display","block");

			var id = $(this).parent().attr("id").replace("member","");
			selectMemberId = id;
			$.ajax({
				type: "GET",
				url: rootPath + "/api/getMember",
				dataType: "json",
				async: false,
				data: {
					id: id,
				},
				success: function (data) {
					if (data.status === 200) {
						$(".edit-member .pop-title").html("<img src='" + rootPath + "/resources/icon/ren.png'>" +
							data.data.name + "<span>" + jgMap[data.data.organizationId].name + "</span>");
						$(".edit-member .username").html(data.data.username);
						$(".edit-member .realname").val(data.data.name);
						$(".edit-member .mobile").val(data.data.mobile);
						$(".edit-member .telephone").val(data.data.telephone);
						$(".edit-member .position").val(data.data.position);
						$(".edit-member .type").select2().val(data.data.type).trigger("change");
						selectMemberType = data.data.type;
						$(".edit-member .password").val(data.data.password);
					}
				},
				error: function () {
					bootAlert("服务器请求失败")
				}
			})
			$(".pop").addClass("hidden");
			$(".edit-member").removeClass("hidden");
		});
		//更新成员信息
        $(".edit-member-buttons .main-button").click(function () {
			var name = $(".edit-member .realname").val();
			var type = $(".edit-member .type").val();
			var mobile = $(".edit-member .mobile").val();
			var telephone = $(".edit-member .telephone").val();
			var username = $(".edit-member .username").html();
			var password = $(".edit-member .password").val();
			var position = $(".edit-member .position").val();
			if (name === "" || type === "" || mobile === "" || password === ""){
				bootAlert("必填项不能为空");
			}else if (!isRealName(name)){
			    bootAlert("成员姓名格式错误")
            }else if (!isMobile(mobile)){
				bootAlert("移动电话格式有误");
			}else if (telephone !== "" && !isPhone(telephone)){
				bootAlert("办公电话格式有误");
			}else if (position.length > 30){
                bootAlert("成员职位信息长度超出限制")
            }else{
				if (password == member[selectMemberId].password) password = null;
				$.ajax({
					type: "POST",
					url: rootPath + "/api/updateMember",
					dataType: "json",
                    async:false,
					data: {
						organizationId: selectJgId,
						id: selectMemberId,
						name: name,
						type: type,
						mobile: mobile,
						telephone: telephone,
                        username: username,
						password: password,
						position: position,
					},
					success: function (data) {
						if (data.status === 200) {
							bootAlert("更新成功")
                            if (username === user.username){
                                $.ajax({
                                    type: "GET",
                                    url: rootPath+"/getCurrentUser",
                                    dataType: "json",
                                    async:false,
                                    cache:false,
                                    data: {
                                    },
                                    success: function (data) {
                                        if(data.status==200){
                                            user=data.data;
                                            $(".user-realName").html(user.name)
                                        }else {
                                        }
                                    },
                                    error: function () {
                                    }
                                });
                            }
							$(".edit-member").addClass("hidden");
							setMembers(selectJgId);
							// $(".mask").css("display","none");
						}else{
							bootAlert("更新失败")
						}
					},
					error :function () {
						bootAlert("服务器请求失败")
					}
				})
			}
        })
		//弹出添加下级部门界面
		$("#departments").prev().children().eq(0).click(function () {

			if(!$("#members .adjust-position").hasClass("hidden")||!$("#departments .adjust-position").hasClass("hidden")){
				bootAlert("正在进行排序，请先保存在进行其他操作");
				return;
			}
			// $(".mask").css("display","block");
		    $(".add-department .jgName").val("");
            $(".add-department .jgMobile").val("");
            $(".add-department .jgHotline").val("");
            $(".add-department .jgFax").val("");
            $(".add-department .jgPostalcode").val("");
            $(".add-department .jgAddress").val("");
			$(".pop").addClass("hidden");
			$(".add-department").removeClass("hidden");
		});
        //添加子机构
        $(".add-department-buttons .main-button").click(function () {
			var name = $(".add-department .jgName").val();
			var address = $(".add-department .jgAddress").val();
			var fax = $(".add-department .jgFax").val()
			var mobile = $(".add-department .jgMobile").val();
			var hotline = $(".add-department .jgHotline").val();
			var postalcode = $(".add-department .jgPostalcode").val();
			if (name === "" || address === "" || fax === "" || mobile === "" || hotline === "" || postalcode === ""){
				bootAlert("必填项不能为空");
			}else if (name.length > 10) {
			    bootAlert("机构名称长度超出限制")
            }else if (!isPhone(mobile) && !isMobile(mobile)){
				bootAlert("联系电话格式有误");
			}else if (!isPhone(hotline) && !isMobile(hotline)){
				bootAlert("值班电话格式有误");
			}else if (!isPostalcode(postalcode)){
				bootAlert("邮政编码格式有误");
			}else if (!isFax(fax)){
				bootAlert("传真格式有误");
			}else if (address.length > 40){
			    bootAlert("机构地址长度超出限制")
            }else{
				$.ajax({
					type: "POST",
					url: rootPath + "/api/insertOrganization",
					dataType: "json",
					data: {
						name: name,
						parentOrganizationId: selectJgId,
						scopeId: jgMap[selectJgId].scopeId,
						fax: fax,
						address: address,
						mobile: mobile,
						hotline: hotline,
						postalcode: postalcode,
					},
					success: function (data) {
						if (data.status === 200) {
							bootAlert("添加子部门成功")
							listAlljgList();
							listScope();
							// if (jgMap[selectJgId].scopeId % 10000 === 0){
							// 	var html = "<li>\n<a id='jg" + data.data + "'>" +
							// 		"<img src='" + rootPath + "/resources/icon/iconse.png'>\n" +
							// 		"<img src='" + rootPath + "/resources/icon/wenjian.png'>" +
							// 		$(".add-department .jgName").val() + "</a>\n<ul>\n</ul>";
							// 	$("#jg" + selectJgId).next().append(html);
							// }else{
							// 	var html = "<a id='jg" + data.data + "'>" + $(".add-department .jgName").val().toString() + "</a>\n";
							// 	$("#jg" + selectJgId).next().children().append(html);
							// }
							setOrganizationList();
							setChildren(selectJgId);
							$(".add-department").addClass("hidden");
						}else{
							bootAlert("添加子部门失败")
						}
					},
					error: function () {
						bootAlert("服务器请求失败")
					}
				})
			}

        })
        //下级机构跳转
        $("#departments .departments").on('click','.dept',function () {
			if(!$("#departments .adjust-position").hasClass("hidden")){
				return;
			}
            var id = $(this).attr("id").replace("child","");
            $("#jg" + id).parent().parent().prev().children("img:nth-child(1)").css("transform","rotate(0deg)");
            $("#jg" + id).parent().parent().css("display", "block");
            $("#jg" + id).click();
        })
		//单击取消缩进弹框
        $(".edit-info-buttons .normal-button").click(function () {
            $(".edit-info").addClass("hidden");
			// $(".mask").css("display","none");
        })
        $(".edit-member-buttons .normal-button").click(function () {
            $(".edit-member").addClass("hidden");
            selectMemberId = null;
			// $(".mask").css("display","none");
        })
        $(".add-member-buttons .normal-button").click(function () {
            $(".add-member").addClass("hidden");
			// $(".mask").css("display","none");
        })
        $(".add-department-buttons .normal-button").click(function () {
            $(".add-department").addClass("hidden");
            // $(".mask").css("display","none");
        })
        //删除离职
        $(".edit-member .danger-button").click(function () {
        	if (selectMemberId != user.id){
				bootbox.confirm({
					title: "删除成员",
					message: "请确认是否删除该成员？",
					callback: function (result) {
						if (result) {
							if (selectMemberType === 1){
								bootbox.confirm({
									title: "确认删除",
									message: "该成员为管理员权限用户，请确认该部门拥有管理员权限的用户，确认删除该成员？",
									callback: function (result) {
										if (result) {
											deleteMembers(selectMemberId + ";");
											$(".edit-member").addClass("hidden");
											setMembers(selectJgId);
										} else {
											return;
										}
									}
								});
							}else{
								deleteMembers(selectMemberId + ";");
								$(".edit-member").addClass("hidden");
								setMembers(selectJgId);
							}
						} else {
							return;
						}
					}
				});
			}else{
        		bootAlert("用户本人账号不可删除，请联系上级管理员进行操作");
			}
        })
		//批量删除选中成员
		$(".deleteMany").click(function () {
			var flag = true;
			if(!$("#members .adjust-position").hasClass("hidden")||!$("#departments .adjust-position").hasClass("hidden")){
				alert("正在进行排序，请先保存在进行其他操作");
				return;
			}
			var ids = "";
            memberIdWhenPlsc = [];
			$(".members-row").each(function () {
				if($(this).children("div:nth-child(1)").children("label").children("input").is(':checked')){
				    if ($(this).attr("name") === "type1"){
                        memberIdWhenPlsc.push($(this).attr("id").replace("member",""));
                        if ($(this).attr("id").replace("member","") == user.id){
                        	flag = false;
						}
                    }
					ids += $(this).attr("id").replace("member","") + ";";
				}
			});
			if (ids !== ""){
				if (flag) {
					bootbox.confirm({
						title: "删除成员",
						message: "请确认是否删除选中成员？",
						callback: function (result) {
							if (result) {
								var memberNames = "";
								if (memberIdWhenPlsc.length > 0) {
									for (var i = 0; i < memberIdWhenPlsc.length - 1; i++) {
										memberNames += member[memberIdWhenPlsc[i]].name + "、";
									}
									memberNames += member[memberIdWhenPlsc[memberIdWhenPlsc.length - 1]].name;
									bootbox.confirm({
										title: "确认删除",
										message: "选中成员中（" + memberNames + "）为管理员权限用户，请确认该部门存在至少一位拥有管理员权限的用户，确认删除选中成员？",
										callback: function (result) {
											if (result) {
												deleteMembers(ids);
												setMembers(selectJgId);
											} else {
												return;
											}
										}
									});
								} else {
									deleteMembers(ids);
									setMembers(selectJgId);
								}
							} else {
								return;
							}
						}
					});
				}else{
					bootAlert("批量删除用户中包含您本人账号，请重新选择");
				}
			}
		})
		// $(".mask").click(function () {
		// 	$(".pop").addClass("hidden");
		// 	$(this).css("display","none");
		// });
		$(".myContainer").click(function (event) {
			event.preventDefault();
			if( $(event.target).is($("#members").prev().children().eq(0))){

			}else if( $(event.target).is($(".members .members-row div:nth-child(n+2)"))){

			}else if($(event.target).is($("#departments").prev().children().eq(0))){

			}else if($(event.target).is($("#edit-info"))){

			}else if ($(event.target).is($("#searchButton"))){

			}else{
				$(".pop").addClass("hidden");
			}
		});
        listScope();
        listAlljgList();
        setOrganizationList();
        $("#main").children("a").click();

        $(".right").on('click',".power",function () {
        	if($(this).prev().is(':checked')){
				$(this).prev().prop("checked",false)
			}else{
				$(this).prev().prop("checked",true)
			}

		})
	}
);