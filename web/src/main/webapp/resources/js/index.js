/**
 * @author 斌
 */


var currentPage = 1;
var pageLimit = 1;

jQuery(
	function ($) {


		
		function getTypeText(type) {
			switch (type) {
				case 1:
					return "师大要闻";
				case 2:
					return "通知公告";
				case 3:
					return "党建文化";
				case 4:
					return "媒体师大";
				case 5:
					return "教学科研";
				case 6:
					return "学术报告";
			}
		}
		
		function getNewsList(page) {
			$.ajax({
				type: "POST",
				url: rootPath + "/api/selectList",
				dataType: "json",
				data: {
					pageNow: page
				},
				success: function (response) {
					if (response.status === 200) {
						var pageNum = parseInt(parseInt(response.recordsTotal) / 10);
						if (response.recordsTotal % 10 != 0){
							pageNum += 1;
						}
						pageLimit = pageNum;
						var html = "<li><a id='pagedown'>上一页</a></li>\n";
						for (var i = 0; i < pageNum; i++){
							html += "<li><a>" + (i + 1) + "</a></li>\n";
						}
						html += "<li><a id='pageup'>下一页</a></li>";
						$("#pageList").html(html);
						html = "";
						for (var i = 0; i < response.data.length; i++) {
							html += "<tr>\n" +
								"                        <td>" + response.data[i].createdTime.substring(0,10) + "</td>\n" +
								"                        <td>" + response.data[i].title + "</td>\n" +
								"                        <td>" + getTypeText(response.data[i].type) + "</td>\n" +
								"                        <td>" + response.data[i].author + "</td>\n" +
								"                        <td>" + (response.data[i].publishStatus == 1 ? "<div style='color: green'>已发布</div>" : "<div style='color: red'>未发布</div>") + "</td>\n" +
								"                        <td>\n" +
								"                            <a id='" + response.data[i].id + "' class='edit' href=\"" + rootPath + "/manage/edit" + "\"><i class=\"icon-pencil\"></i></a>\n" +
								"                            <a href=\"#myModal\" role=\"button\" data-toggle=\"modal\"><i class=\"icon-remove\"></i></a>\n" +
								"                        </td>\n" +
								"                    </tr>";
						}
						$("#newsList").html(html);

						$("#pageList").children('li').next().children('a').eq(page - 1).css('background-color','#90bfef');
					}
				},
				error: function () {

				}
			})
		}

		function getCurrentUser() {
			$.ajax({
				type: "POST",
				url: rootPath + "/getCurrentUser",
				dataType: "json",
				data: {},
				success: function (response) {
					if (response.status === 200) {
						$("#currentUser").html("<i class=\"icon-user\"></i>" + response.data.name + "\n" +
							"                    <i class=\"icon-caret-down\"></i>")
					}
				},
				error: function () {

				}
			})
		}

		getNewsList(currentPage);
		getCurrentUser();

		$("#newsList").on('click','.edit',function () {
			localStorage.setItem("editId", $(this).attr("id"))
		})

		function clear(){
			$("#pageList li a").each(function () {
				$(this).css('background-color', '#ffffff');
			})
		}


		$("#pageList").on('click','li a',function () {
			if ($(this).attr('id') == "pageup"){
				currentPage += 1;
				if (currentPage > pageLimit){
					currentPage = pageLimit;
				}
			}else if ($(this).attr('id') == "pagedown"){
				currentPage -= 1;
				if (currentPage < 1){
					currentPage = 1;
				}
			}else{
				currentPage = $("#pageList li a").index(this);
			}
			clear();
			if ($(this).attr('id') != "pageup" && $(this).attr('id') != "pagedown"){
				$(this).css('background-color','#90bfef');
			}

			getNewsList(currentPage);
		})

		$("#insertNews").click(function () {
			localStorage.removeItem("editId");
			window.location=rootPath + "/manage/edit";
		})

		$("#newsList").on('click','.icon-remove',function () {
			localStorage.setItem("deleteId", $(this).parent().prev().attr("id"));
		})

		$("#indexToDelete").click(function () {
			$.ajax({
				type: "POST",
				url: rootPath + "/api/deleteNews",
				dataType: "json",
				data: {
					id: localStorage.getItem("deleteId")
				},
				success: function (response) {
					if (response.status === 200) {
						getNewsList();
					}
				},
				error: function () {

				}
			})
		})
	}
);
