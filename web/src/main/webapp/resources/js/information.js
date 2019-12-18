/**
 * @author kzn
 */

/**
 *    Overall version 1.6
 *    This version 1.6
 */

var xjType = 1;

jQuery(
    function ($) {

        if (user.type === 0) {
            $(".add-button").addClass("hidden")
            $(".video-delete-button").addClass("hidden")
        } else {
            $(".add-button").removeClass("hidden")
            $(".video-delete-button").removeClass("hidden")
        }

        var datTableInitVideo = {
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
        datTableInitVideo["sAjaxSource"] = rootPath + '/api/getAllXuanjiao';
        // 设置字段数据源
        datTableInitVideo["aoColumns"] = [
            {
                "data": "id"
            },
            {
                "data": null,
                "visible": false
            },
        ];
        // 渲染字段数据源
        datTableInitVideo["aoColumnDefs"] = [
            {
                "aTargets": [0], "mRender": function (data, type, row, meta) {
                    var pic = "";
                    if (row.attachment !== "") {
                        pic = imgPath + row.attachment;
                    }
                    var name = row.name;
                    for (var i = 0; i < name.length; i++) {
                        $("#textDiv1").html(name.substr(0, i));
                        if ($("#textDiv1").height() > $("#textDiv").height()) {
                            $("#textDiv1").html("");
                            name = name.substr(0, i - 3) + "...";
                            break;
                        }
                        $("#textDiv1").html("");
                    }
                    var html = '<div class="video">\n' +
                        '<div class="mask hidden"></div>\n' +
                        '<div class="play hidden"><img src=' + rootPath + '/resources/icon/bofang.png></div>\n';
                    if (pic !== "") {
                        if (row.video == "") {
                            html += '<img type="' + row.createMemberScopeId + '" src="' + pic + '" class="' + row.pdf + '">'
                        } else {
                            html += '<video type="' + row.createMemberScopeId + '" poster="' + pic + '" src="' + videoPath + row.video + '" ></video>\n';
                        }
                    } else {
                        if (row.video == "") {
                            html += '<img type="' + row.createMemberScopeId + '"src="' + baseImgPath + '" class="' + row.pdf + '">'
                        } else {
                            html += '<video type="' + row.createMemberScopeId + '" src="' + videoPath + row.video + '" ></video>\n';
                        }
                    }
                    html += '<div class="title">' + name + '</div>\n';
                    if (row.video == "") {//pdf
                        html += '<div id="video-' + row.id + '" class="videoEdit hidden video-1"><img src="' + rootPath + '/resources/icon/6-bianji.png">&nbsp;编辑</div>\n';
                    } else {//视频
                        html += '<div id="video-' + row.id + '" class="videoEdit hidden video-2"><img src="' + rootPath + '/resources/icon/6-bianji.png">&nbsp;编辑</div>\n'
                    }
                    html += '<div id="video-' + row.id + '" class="delete hidden"><img src="' + rootPath + '/resources/icon/shanchu.png">&nbsp;删除</div>\n' +
                        '<input class="hidden" value="' + row.video + '">\n';
                        if(row.video==""){
                            html+= '<div class="tipPDF" style="border: 50px solid transparent !important;\n' +
                                '    border-top-width: 0 !important;\n' +
                                '    border-bottom-color: #d9d9d9 !important;"></div>';
                            html+='<div class="PDF">PDF</div>'
                        }
                     html+= '</div>\n';
                    return html;

                }
            },

        ];

        datTableInitVideo["fnServerData"] = function (sSource, aoData, fnCallback) {
            $.ajax({
                "type": 'get',
                "url": sSource,
                "dataType": "json",
                "data": {//查询条件写这里
                    //dataTable固定参数
                    aoData: JSON.stringify(aoData),
                    // 选填参数
                    // search: searchText
                    type: xjType,
                    name: $("#xuanjiao-search-title").val()
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
        if (!GetQueryString("id")) {
            var dataInfoTableVideo = $("#Videos-table").dataTable(datTableInitVideo).api();
        }

        var datTableInitGg = {
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
        datTableInitGg["sAjaxSource"] = rootPath + '/api/getAllAnnouncement';
        // 设置字段数据源
        datTableInitGg["aoColumns"] = [
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
            {
                "data": "readCount"
            },
            {
                "data": "id"
            },
        ];
        // 渲染字段数据源
        datTableInitGg["aoColumnDefs"] = [
            {
                "aTargets": [0], "mRender": function (data, type, row, meta) {
                    return meta.row + 1 + meta.settings._iDisplayStart;
                }
            },
            {
                "aTargets": [1], "mRender": function (data, type, row, meta) {
                    var content = "";
                    if (row.importance == 3) {
                        content += "<span style='color: #fb2020'>【紧急】</span>"
                    } else if (row.importance == 2) {
                        content += "<span style='color: #ffb30c'>【重要】</span>"
                    } else {
                        content += "<span style='color: #1890ff'>【普通】</span>"
                    }
                    content += row.title;
                    return "<div class='table-title' id='gonggao-read-" + row.id + "'><div>" + content + "</div></div>";
                }
            },
            {
                "aTargets": [2], "mRender": function (data, type, row, meta) {
                    return "<div class='table-data'><div>" + row.createdTime + "</div></div>";
                }
            },
            {
                "aTargets": [3], "mRender": function (data, type, row, meta) {
                    return "<div class='table-data'>" + row.updatedTime + "</div>";
                }
            },
            {
                "aTargets": [4], "mRender": function (data, type, row, meta) {
                    return "<div class='table-name'><div>" + row.createMemberName + "</div></div>";
                }
            },
            {
                "aTargets": [5], "mRender": function (data, type, row, meta) {
                    return row.readCount;
                }
            },
            {
                "aTargets": [6], "mRender": function (data, type, row, meta) {
                    var scopeId = user.scopeId;
                    var createMemberScopeId = row.createMemberScopeId;
                    var canOperator = 0;//能否编辑删除
                    //当前用户是杭州市
                    if (scopeId === 0) {
                        canOperator = 1;
                    } else if (scopeId === createMemberScopeId) { //创建者和当前用户同一级别
                        canOperator = 1;
                    } else {
                        //创建者为社区
                        if (createMemberScopeId % 100 !== 0) {
                            if (scopeId % 100 !== 0 && createMemberScopeId / 100 === scopeId / 100) {
                                canOperator = 1;
                            }
                        } else if (createMemberScopeId % 10000 !== 0) {//创建者为街道
                            if (scopeId % 10000 !== 0 && createMemberScopeId / 10000 === scopeId / 10000) {
                                canOperator = 1;
                            }
                        } else if (createMemberScopeId % 1000000 !== 0) {//创建者为区
                            if (scopeId % 1000000 !== 0 && createMemberScopeId / 1000000 === scopeId / 1000000) {
                                canOperator = 1;
                            }
                        }
                    }
                    if (user.type !== 1) canOperator = 0;
                    if (canOperator === 1) {
                        return "<div class='table-operate'><a class='information-operator1' id='gonggao-edit-" + row.id + "'>编辑</a><div></div><a style='color: #fb2020;' class='information-operator2' id='gonggao-edit-" + row.id + "'>删除</a></div>";
                    } else {
                        return "<div class='table-operate'><a class='information-operator3' id='gonggao-edit-" + row.id + "'>查看</a></div>";
                    }
                }
            },
        ];

        datTableInitGg["fnServerData"] = function (sSource, aoData, fnCallback) {
            $.ajax({
                "type": 'get',
                "url": sSource,
                "dataType": "json",
                "data": {//查询条件写这里
                    //dataTable固定参数
                    aoData: JSON.stringify(aoData),
                    // 选填参数
                    // search: searchText
                    title: "" + $(".right-main:nth-child(1) .search-div>label>input").val()
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
        if (!GetQueryString("id")) {
            var dataInfoTableGg = $("#gg-table").dataTable(datTableInitGg).api();
        }
        var datTableInitZx = {
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
        datTableInitZx["sAjaxSource"] = rootPath + '/api/getAllZixun';
        // 设置字段数据源
        datTableInitZx["aoColumns"] = [
            {
                "data": "id"
            },
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
            {
                "data": "readCount"
            },
            {
                "data": "id"
            },
        ];
        // 渲染字段数据源
        datTableInitZx["aoColumnDefs"] = [
            {
                "aTargets": [0], "mRender": function (data, type, row, meta) {
                    return meta.row + 1 + meta.settings._iDisplayStart;
                }
            },
            {
                "aTargets": [1], "mRender": function (data, type, row, meta) {
                    if (row.attachment != null && row.attachment !== "") {
                        return '<div class="table-cover"><img src="' + imgPath + row.attachment + '"></div>';
                    } else {
                        return '<div class="table-cover"><img src="' + baseImgPath + '"></div>';
                    }
                }
            },
            {
                "aTargets": [2], "mRender": function (data, type, row, meta) {
                    return "<div class='table-title' id='zixun-read-" + row.id + "'><div>" + row.title + "</div></div>";
                }
            },
            {
                "aTargets": [3], "mRender": function (data, type, row, meta) {
                    var html = "";
                    html += "<div class='table-data'><div>" + row.createdTime + "</div></div>";
                    return html;
                }
            },
            {
                "aTargets": [4], "mRender": function (data, type, row, meta) {
                    return "<div class='table-data'>" + row.updatedTime + "</div>";
                }
            },
            {
                "aTargets": [5], "mRender": function (data, type, row, meta) {
                    return "<div class='table-name'><div>" + row.createMemberName + "</div></div>";
                }
            },
            {
                "aTargets": [6], "mRender": function (data, type, row, meta) {
                    return row.readCount;
                }
            },
            {
                "aTargets": [7], "mRender": function (data, type, row, meta) {
                    var scopeId = user.scopeId;
                    var createMemberScopeId = row.createMemberScopeId;
                    var canOperator = 0;//能否编辑删除
                    //当前用户是杭州市
                    if (scopeId === 0) {
                        canOperator = 1;
                    } else if (scopeId === createMemberScopeId) { //创建者和当前用户同一级别
                        canOperator = 1;
                    } else {
                        //创建者为社区
                        if (createMemberScopeId % 100 !== 0) {
                            if (scopeId % 100 !== 0 && createMemberScopeId / 100 === scopeId / 100) {
                                canOperator = 1;
                            }
                        } else if (createMemberScopeId % 10000 !== 0) {//创建者为街道
                            if (scopeId % 10000 !== 0 && createMemberScopeId / 10000 === scopeId / 10000) {
                                canOperator = 1;
                            }
                        } else if (createMemberScopeId % 1000000 !== 0) {//创建者为区
                            if (scopeId % 1000000 !== 0 && createMemberScopeId / 1000000 === scopeId / 1000000) {
                                canOperator = 1;
                            }
                        }
                    }
                    if (user.type !== 1) canOperator = 0;
                    if (canOperator === 1) {
                        return "<div class='table-operate'><a class='information-operator1' id='zixun-edit-" + row.id + "'>编辑</a><div></div><a style='color:#fb2020;' class='information-operator2' id='zixun-edit-" + row.id + "'>删除</a></div>";
                    } else {
                        return "<div class='table-operate'><a class='information-operator3' id='zixun-edit-" + row.id + "'>查看</a></div>";
                    }
                }
            },
        ];

        datTableInitZx["fnServerData"] = function (sSource, aoData, fnCallback) {
            $.ajax({
                "type": 'get',
                "url": sSource,
                "dataType": "json",
                "data": {//查询条件写这里
                    //dataTable固定参数
                    aoData: JSON.stringify(aoData),
                    // 选填参数
                    // search: searchText
                    title: "" + $(".right-main:nth-child(1) .search-div>label>input").val()

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
        if (!GetQueryString("id")) {
            var dataInfoTableZx = $("#zx-table").dataTable(datTableInitZx).api();
        }
        var datTableInitXj = {
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
        datTableInitXj["sAjaxSource"] = rootPath + '/api/getAllXuanjiao';
        // 设置字段数据源
        datTableInitXj["aoColumns"] = [
            {
                "data": "id"
            },
            {
                "data": "id"
            },
            {
                "data": "name"
            },
            {
                "data": "id"
            },
        ];
        // 渲染字段数据源
        datTableInitXj["aoColumnDefs"] = [
            {
                "aTargets": [0], "mRender": function (data, type, row, meta) {
                    return meta.row + 1 + meta.settings._iDisplayStart;
                }
            },
            {
                "aTargets": [1], "mRender": function (data, type, row, meta) {
                    if (row.attachment != null && row.attachment !== "") {
                        return '<div class="table-cover"><img src="' + imgPath + row.attachment + '"></div>';
                    } else {
                        return '<div class="table-cover"><img src="' + baseImgPath + '"></div>';
                    }
                }
            },
            {
                "aTargets": [2], "mRender": function (data, type, row, meta) {
                    return "<div class='table-title' id='xuanjiao-read-" + row.id + "'><div>" + row.name + "</div></div>";
                }
            },
            {
                "aTargets": [3], "mRender": function (data, type, row, meta) {
                    var scopeId = user.scopeId;
                    var createMemberScopeId = row.createMemberScopeId;
                    var canOperator = 0;//能否编辑删除
                    //当前用户是杭州市
                    if (scopeId === 0) {
                        canOperator = 1;
                    } else if (scopeId === createMemberScopeId) { //创建者和当前用户同一级别
                        canOperator = 1;
                    } else {
                        //创建者为社区
                        if (createMemberScopeId % 100 !== 0) {
                            if (scopeId % 100 !== 0 && createMemberScopeId / 100 === scopeId / 100) {
                                canOperator = 1;
                            }
                        } else if (createMemberScopeId % 10000 !== 0) {//创建者为街道
                            if (scopeId % 10000 !== 0 && createMemberScopeId / 10000 === scopeId / 10000) {
                                canOperator = 1;
                            }
                        } else if (createMemberScopeId % 1000000 !== 0) {//创建者为区
                            if (scopeId % 1000000 !== 0 && createMemberScopeId / 1000000 === scopeId / 1000000) {
                                canOperator = 1;
                            }
                        }
                    }
                    if (user.type !== 1) canOperator = 0;
                    if (canOperator === 1) {
                        return "<div class='table-operate'><a class='information-operator1' id='xuanjiao-edit-" + row.id + "'>编辑</a><div></div><a style='color: #fb2020;' class='information-operator2' id='xuanjiao-edit-" + row.id + "'>删除</a></div>";
                    } else {
                        return "<div class='table-operate'><a class='information-operator3' id='xuanjiao-edit-" + row.id + "'>查看</a></div>";
                    }
                }
            },
        ];

        datTableInitXj["fnServerData"] = function (sSource, aoData, fnCallback) {
            $.ajax({
                "type": 'get',
                "url": sSource,
                "dataType": "json",
                "data": {//查询条件写这里
                    //dataTable固定参数
                    aoData: JSON.stringify(aoData),
                    // 选填参数
                    // search: searchText
                    Type: xjType,
                    name: $("#xuanjiao-query-name").val()
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
        if (!GetQueryString("id")) {
            var dataInfoTableXj = $("#xj-table").dataTable(datTableInitXj).api();
        }

        function reloadAjax(ajaxTable) {
            ajaxTable.ajax.reload(false);
        }

        $("#edit-imporance").select2({
            minimumResultsForSearch: -1,
        });
        //顶部导航切换
        $(".myHeader ul li").eq(4).addClass("current-li");
        $(".myHeader ul li").eq(4).children("div").addClass("current-div");
        //左侧点击事件
        $(".left").on('click', 'li a', function () {
            if ($(this).children("img").length === 0) {
                $(".left li a").removeClass("selected-li");
            }
            if ($(this).children("img").length === 0) {
                $(this).addClass("selected-li");
            }
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
            $(".right-main:nth-child(4) .information-buttons .normal-button:nth-child(3)").removeClass("delete-button");
            $(".right-main:nth-child(4) .information-buttons .normal-button:nth-child(3)").html("编&nbsp;辑")
            $(".right-main:nth-child(4) .video").children(".mask").addClass("hidden");
            $(".right-main:nth-child(4) .video").children(".mask").css("opacity", "0.2");
            $(".right-main:nth-child(4) .video>div:nth-child(5)").addClass("hidden");
        });
        $(".left li a").mouseover(function () {
            $(this).children("img").attr("src", rootPath + "/resources/icon/shubiaojingguo.png");
        });
        $(".left li a").mouseout(function () {
            $(this).children("img").attr("src", rootPath + "/resources/icon/fanhui1.png");
        });
        $("#gg").click(function () {
            $(".right-main").addClass("hidden");
            $(".right-main").eq(0).removeClass("hidden");
            $(".right-main:nth-child(1) .l-title").html("对内公告");
            $(".right-main:nth-child(1) .s-title").html("公告与资讯/对内公告");
            $(".right-main:nth-child(1) .search-div input").attr("placeholder", "输入公告标题");
            $(".right-main:nth-child(1) .information-table").addClass("hidden");
            $(".right-main:nth-child(1)>div:nth-child(5)").removeClass("hidden");
            $(".right-main:nth-child(1)>input").val(0);
            $(".right-main:nth-child(1) .search-div>label>input").val("");
            if (localStorage.getItem("readPage") === null) {
                reloadAjax(dataInfoTableGg);
            }
        });
        $("#zx").click(function () {
            $(".right-main").addClass("hidden");
            $(".right-main").eq(0).removeClass("hidden");
            $(".right-main:nth-child(1) .l-title").html("对外资讯");
            $(".right-main:nth-child(1) .s-title").html("公告与资讯/对外资讯");
            $(".right-main:nth-child(1) .search-div input").attr("placeholder", "输入资讯标题");
            $(".right-main:nth-child(1) .information-table").addClass("hidden");
            $(".right-main:nth-child(1)>div:nth-child(6)").removeClass("hidden");
            $(".right-main:nth-child(1)>input").val(1);
            $(".right-main:nth-child(1) .search-div>label>input").val("");
            if (localStorage.getItem("readPage") === null) {
                reloadAjax(dataInfoTableZx);
            }
        });
        $("#qc,#zd,#ys").click(function () {
            $("#xuanjiao-search-title").val("");
            $(".right-main").addClass("hidden");
            $(".right-main").eq(3).removeClass("hidden");
            $(".right-main:nth-child(1)>input").val($(this).parent().index() + 2);
            $("#xuanjiao-search-title").attr("placeholder", "输入宣教标题");
            xjType = $(this).parent().index() + 1;
            var l_titles = ["青春教育", "计生指导", "政策法规", "优生优育"];
            $(".right-main:nth-child(4) .l-title").html(l_titles[xjType - 1]);
            $(".right-main:nth-child(4) .s-title").html("公告与资讯/健康宣教/" + l_titles[xjType - 1]);
            reloadAjax(dataInfoTableVideo);
        });
        $("#zc").click(function () {
            var l_titles = ["计生指导", "政策法规", "优生优育"];
            $(".right-main").addClass("hidden");
            $(".right-main").eq(0).removeClass("hidden");
            $(".right-main:nth-child(1) .l-title").html(l_titles[$(this).parent().index() - 1]);
            $(".right-main:nth-child(1) .s-title").html("公告与资讯/健康宣教/" + l_titles[$(this).parent().index() - 1]);
            $(".right-main:nth-child(1) .search-div input").attr("placeholder", "输入宣教标题");
            $(".right-main:nth-child(1) .information-table").addClass("hidden");
            $(".right-main:nth-child(1)>div:nth-child(7)").removeClass("hidden");
            $(".right-main:nth-child(1)>input").val($(this).parent().index() + 2);
            $(".right-main:nth-child(1) .search-div>label>input").val("");
            if (localStorage.getItem("readPage") === null) {
                xjType = $(this).parent().index() + 1;
                reloadAjax(dataInfoTableXj);
            }
        });

        //添加按钮
        $(".right-main:nth-child(1) .information-buttons .main-button").click(function () {
            $("#edit-title").val("");
            $("#inputArea").html("");
            $("#addCover1>img").remove();
            $("#image-src").val("");
            $("#edit>input[name=id]").val(-1);
            var l_titles = ["添加公告", "添加资讯", "添加宣教"];
            var s_titles = ["公告与资讯/对内公告", "公告与资讯/对外资讯", "公告与资讯/健康宣教/计生指导", "公告与资讯/健康宣教/政策法规", "公告与资讯/健康宣教/优生优育"];
            if ($(".right-main:nth-child(1)>input").val() <= 1) {
                $(".right-main:nth-child(2) .l-title").html('<img src="' + rootPath + '/resources/icon/fanhui.png">' + l_titles[parseInt($(".right-main:nth-child(1)>input").val())]);
                $(".right-main:nth-child(2) .main-cover:nth-child(7)").addClass("hidden");
            } else {
                $(".right-main:nth-child(2) .l-title").html('<img src="' + rootPath + '/resources/icon/fanhui.png">' + l_titles[2])
                $(".right-main:nth-child(2) .main-cover:nth-child(7)").removeClass("hidden");
                $(".right-main:nth-child(2) .main-title >span").html("标题");
                $(".right-main:nth-child(2) .main-cover:nth-child(7) a").addClass("hidden");
                $(".right-main:nth-child(2) .main-cover:nth-child(7) iframe").removeAttr("src");
                $(".right-main:nth-child(2) .main-cover:nth-child(7) iframe").next().attr("href", "")
                $(".right-main:nth-child(2) .main-cover:nth-child(7) iframe").next().next().attr("href", "")
                $(".right-main:nth-child(2) .main-cover:nth-child(7) iframe").next().next().attr("download", "");
            }
            if ($(".right-main:nth-child(1)>input").val() == 0) {
                $(".right-main:nth-child(2) .main-title input").addClass("Announcement-input");
                $(".right-main:nth-child(2) .main-title label:nth-child(3)").removeClass("hidden");
            } else {
                $(".right-main:nth-child(2) .main-title input").removeClass("Announcement-input");
                $(".right-main:nth-child(2) .main-title label:nth-child(3)").addClass("hidden");
            }
            $(".right-main:nth-child(2) .s-title").html(s_titles[parseInt($(".right-main:nth-child(1)>input").val())])
            if ($(".right-main:nth-child(1)>input").val() == 0) {
                $(".right-main:nth-child(2) .main-cover:nth-child(6)").addClass("hidden");
            } else {
                $(".right-main:nth-child(2) .main-cover:nth-child(6)").removeClass("hidden");
            }
            $("#edit>input[name=id]").val(-1);
            $(".right-main").addClass("hidden");
            $(".right-main:nth-child(2)").removeClass("hidden");
            $("#edit .main-text").removeClass("hidden");
        });
        $(".right-main:nth-child(1) .information-buttons .normal-button").click(function () {
            if ($(".right-main:nth-child(1)>input").val() == 0) {
                reloadAjax(dataInfoTableGg);
            } else if ($(".right-main:nth-child(1)>input").val() == 1) {
                reloadAjax(dataInfoTableZx);
            } else {
                reloadAjax(dataInfoTableXj);
            }
        });
        $("body").on("click", "#chacha", function () {
            bootbox.hideAll();
        });
        $(".right-main:nth-child(4) .information-buttons .main-button").click(function () {
            if ($(".right-main:nth-child(4) .information-buttons .normal-button:nth-child(3)").html() === "完&nbsp;成") {
                bootAlert("请先完成编辑操作再进行添加");
            } else {
                $("#selectType").css("display", "block");
                $("body").addClass("body-hidden");
            }

        });
        //添加类型选择
        $("#selectType .typeButtons .normal-button").click(function () {
            //pdf
            $("#edit-title").val("");
            $("#inputArea").html("");
            $("#addCover1>img").remove();
            $("#image-src").val("");
            $("#edit>input[name=id]").val(-1);
            var l_titles = "添加宣教";
            var s_titles = ["公告与资讯/健康宣教/青春教育/添加PDF", "公告与资讯/健康宣教/计生指导/添加PDF", "公告与资讯/健康宣教/政策法规/添加图文", "公告与资讯/健康宣教/优生优育/添加PDF"];
            $(".right-main:nth-child(2) .l-title").html('<img src="' + rootPath + '/resources/icon/fanhui.png">' + l_titles);
            $(".right-main:nth-child(2) .main-cover:nth-child(7)").removeClass("hidden");
            $(".right-main:nth-child(2) .main-title >span").html("标题");
            $(".right-main:nth-child(2) .main-cover:nth-child(7) a").addClass("hidden");
            $(".right-main:nth-child(2) .main-cover:nth-child(7) iframe").removeAttr("src");
            $(".right-main:nth-child(2) .main-cover:nth-child(7) iframe").next().attr("href", "");
            $(".right-main:nth-child(2) .main-cover:nth-child(7) iframe").next().next().attr("href", "");
            $(".right-main:nth-child(2) .main-cover:nth-child(7) iframe").next().next().attr("download", "");
            $(".right-main:nth-child(2) .main-title input").removeClass("Announcement-input");
            $(".right-main:nth-child(2) .main-title label:nth-child(3)").addClass("hidden");
            $(".right-main:nth-child(2) .s-title").html(s_titles[xjType - 1]);
            $("#edit>input[name=id]").val(-1);
            $(".right-main").addClass("hidden");
            $(".right-main:nth-child(2)").removeClass("hidden");
            if (xjType != 3){
                $(".right-main:nth-child(2) .main-text").addClass("hidden");
            }else{
                $(".right-main:nth-child(2) .main-text").removeClass("hidden");
            }
            $(".right-main:nth-child(2) .main-cover").removeClass("hidden");
            $(".closeType").click();
        })

        $("#selectType .typeButtons .main-button").click(function () {
            //视频
            $("#add-video-title").val("");
            $(".right-main:nth-child(5) .uploadvideo").remove()
            $("#add-video-image .uploadimg").remove()
            $(".right-main").addClass("hidden");
            $(".right-main:nth-child(5)").removeClass("hidden");
            $(".right-main:nth-child(5) .l-title").html('<img src="' + rootPath + '/resources/icon/fanhui.png">' + '添加视频');
            $(".right-main:nth-child(5)>input[name=id]").val(-1);
            var l_titles = "添加宣教";
            var s_titles = ["公告与资讯/健康宣教/青春教育/添加视频", "公告与资讯/健康宣教/计生指导/添加视频", "公告与资讯/健康宣教/政策法规/添加视频", "公告与资讯/健康宣教/优生优育/添加视频"];
            $(".right-main:nth-child(5) .l-title").html('<img src="' + rootPath + '/resources/icon/fanhui.png">' + l_titles);
            $(".right-main:nth-child(5) .s-title").html(s_titles[xjType - 1]);
            $(".closeType").click();
        })

        //返回按钮
        $(".right-main:nth-child(2) .l-title").on("click", "img", function () {
            if ($(".right-main:nth-child(1)>input").val() <= 1) {
                $(".left>ul>li").eq(parseInt($(".right-main:nth-child(1)>input").val())).children().click()
            } else {
                $(".left>ul>li>ul>li").eq(parseInt($(".right-main:nth-child(1)>input").val()) - 2).children().click()
            }
        });
        $(".right-main:nth-child(3) .l-title").on("click", "img", function () {
            if ($(".right-main:nth-child(1)>input").val() <= 1) {
                $(".left>ul>li").eq(parseInt($(".right-main:nth-child(1)>input").val())).children().click()
            } else {
                $(".left>ul>li>ul>li").eq(parseInt($(".right-main:nth-child(1)>input").val()) - 2).children().click()
            }
        });
        $(".right-main:nth-child(5) .l-title").on("click", "img", function () {
            $("#add-video-title").val("");
            $(".right-main:nth-child(5) .main-cover:nth-child(4)>div:nth-child(3)>video").remove();
            $(".right-main:nth-child(5) .main-cover:nth-child(4)>div:nth-child(3) input").val("");
            $(".right-main:nth-child(5) .main-cover:nth-child(4)>div:nth-child(3)>div:nth-child(3)").addClass("hidden");
            $(".right-main:nth-child(5) .main-cover:nth-child(4)>div:nth-child(3)>div:nth-child(4)").addClass("hidden");
            $(".right-main:nth-child(5) .main-cover:nth-child(5)>div:nth-child(3)>img").remove();
            $(".right-main:nth-child(5) .main-cover:nth-child(5)>div:nth-child(3) input").val("");
            $(".right-main:nth-child(5) .main-cover:nth-child(5) .deleteImg").css("display", "none");
            $(".right-main:nth-child(5) .main-cover:nth-child(5) .mask").addClass("hidden");
            $(".left>ul>li>ul>li").eq(parseInt($(".right-main:nth-child(1)>input").val()) - 2).children().click()
        });
        $(".right-main:nth-child(5) .normal-button").click(function () {
            $("#add-video-title").val("");
            $(".right-main:nth-child(5) .main-cover:nth-child(4)>div:nth-child(3)>video").remove();
            $(".right-main:nth-child(5) .main-cover:nth-child(4)>div:nth-child(3) input").val("");
            $(".right-main:nth-child(5) .main-cover:nth-child(4)>div:nth-child(3)>div:nth-child(3)").addClass("hidden");
            $(".right-main:nth-child(5) .main-cover:nth-child(4)>div:nth-child(3)>div:nth-child(4)").addClass("hidden");
            $(".right-main:nth-child(5) .main-cover:nth-child(5)>div:nth-child(3)>img").remove();
            $(".right-main:nth-child(5) .main-cover:nth-child(5)>div:nth-child(3) input").val("");
            $(".right-main:nth-child(5) .main-cover:nth-child(5) .deleteImg").css("display", "none");
            $(".right-main:nth-child(5) .main-cover:nth-child(5) .mask").addClass("hidden");
            $("#qc").click();
        })
        //封面删除按钮
        $(".right-main:nth-child(2) .main-cover:nth-child(6)>div:nth-child(3)").mouseover(function () {
            if ($(".right-main:nth-child(2) .main-cover:nth-child(6)>div:nth-child(3)>img").length !== 0 && $(".right-main:nth-child(2) .main-cover:nth-child(6)>div:nth-child(3)>img").attr("src").indexOf(imgBitmap) === -1) {
                $(".right-main:nth-child(2) .main-cover:nth-child(6)>div:nth-child(3) .deleteImg").css("display", "block");
                $(".right-main:nth-child(2) .main-cover:nth-child(6)>div:nth-child(3) .mask").removeClass("hidden");
            }
        });
        $(".right-main:nth-child(2) .main-cover:nth-child(6)>div:nth-child(3)").mouseout(function () {
            $(".right-main:nth-child(2) .main-cover:nth-child(6)>div:nth-child(3) .deleteImg").css("display", "none");
            $(".right-main:nth-child(2) .main-cover:nth-child(6)>div:nth-child(3) .mask").addClass("hidden");
        });
        $(".right-main:nth-child(2) .main-cover:nth-child(6)>div:nth-child(3) .deleteImg").click(function () {
            $(".right-main:nth-child(2) .main-cover:nth-child(6)>div:nth-child(3) .deleteImg").css("display", "none");
            $(".right-main:nth-child(2) .main-cover:nth-child(6)>div:nth-child(3) .mask").addClass("hidden");
            $(".right-main:nth-child(2) .main-cover:nth-child(6)>div:nth-child(3)>img").remove();
            $(".right-main:nth-child(2) .main-cover:nth-child(6)>div:nth-child(3) input").val("");
        });
        $(".right-main:nth-child(5) .main-cover:nth-child(5)>div:nth-child(3)").mouseover(function () {
            if ($(".right-main:nth-child(5) .main-cover:nth-child(5)>div:nth-child(3)>img").length !== 0 && $(".right-main:nth-child(5) .main-cover:nth-child(5)>div:nth-child(3)>img").attr("src").indexOf(imgBitmap) === -1) {
                $(".right-main:nth-child(5) .main-cover:nth-child(5) .deleteImg").css("display", "block");
                $(".right-main:nth-child(5) .main-cover:nth-child(5) .mask").removeClass("hidden");
            }
        });
        $(".right-main:nth-child(5) .main-cover:nth-child(5)>div:nth-child(3)").mouseout(function () {
            $(".right-main:nth-child(5) .main-cover:nth-child(5) .deleteImg").css("display", "none");
            $(".right-main:nth-child(5) .main-cover:nth-child(5) .mask").addClass("hidden");
        });
        $(".right-main:nth-child(5) .main-cover:nth-child(5) .deleteImg").click(function () {
            $(".right-main:nth-child(5) .main-cover:nth-child(5) .deleteImg").css("display", "none");
            $(".right-main:nth-child(5) .main-cover:nth-child(5) .mask").addClass("hidden");
            $(".right-main:nth-child(5) .main-cover:nth-child(5)>div:nth-child(3)>img").remove();
            $(".right-main:nth-child(5) .main-cover:nth-child(5)>div:nth-child(3) input").val("");
        });
        //视频删除
        $(".right-main:nth-child(5) .main-cover:nth-child(4)>div:nth-child(3)").mouseover(function () {
            if ($(".right-main:nth-child(5) .main-cover:nth-child(4)>div:nth-child(3)>video").length !== 0) {
                $(".deleteVideo").css("display", "block");
                $(".right-main:nth-child(5) .main-cover:nth-child(4) .play").removeClass("hidden");
                $(".right-main:nth-child(5) .main-cover:nth-child(4) .mask").removeClass("hidden");
            }
        });
        $(".right-main:nth-child(5) .main-cover:nth-child(4)>div:nth-child(3)").mouseout(function () {
            $(".deleteVideo").css("display", "none");
            $(".right-main:nth-child(5) .main-cover:nth-child(4) .play").addClass("hidden");
            $(".right-main:nth-child(5) .main-cover:nth-child(4) .mask").addClass("hidden");
        });
        $(".right-main:nth-child(5)").on('click', ".main-cover:nth-child(4)>div:nth-child(3)>.deleteVideo", function () {
            $(".right-main:nth-child(5) .main-cover:nth-child(4) .play").addClass("hidden");
            $(".right-main:nth-child(5) .main-cover:nth-child(4)>div:nth-child(3) .mask").addClass("hidden");
            $(".right-main:nth-child(5) .main-cover:nth-child(4)>div:nth-child(3)>video").remove();
            $(".right-main:nth-child(5) .main-cover:nth-child(4)>div:nth-child(3) input").val("");
        });
        //pdf上传
        $(".right-main:nth-child(2) .main-cover:nth-child(7)>div:nth-child(2)").click(function () {
            $(".right-main:nth-child(2) .main-cover:nth-child(7)>label>input").click()
        });
        $(".right-main:nth-child(2) .main-cover:nth-child(7)>label>input").change(function () {
            var allowType = ["pdf"];
            var name = $(this)[0].files[0].name;
            var fileType = name.split('.').pop();
            if (allowType.indexOf(fileType.toLowerCase()) === -1) {
                bootAlert("请上传pdf格式文件");
                $(".right-main:nth-child(2) .main-cover:nth-child(7)>label>input").val('')
                return;
            }
            var formData = new FormData();
            formData.append('file_data', $(this)[0].files[0]);

            var input = $(this);

            $.ajax({
                type: "POST",
                url: rootPath + "/api/file/fileUpload?fileType=pdf",
                dataType: "json",
                data: formData,
                contentType: false,
                processData: false,
                beforeSend: function () {

                },
                xhr: xhrOnProgress(function (e) {

                }),
                success: function (data) {
                    if (data.status == 200) {
                        $(".right-main:nth-child(2) .main-cover:nth-child(7) iframe").attr("src", pdfPath + data.data.fileName);
                        $(".right-main:nth-child(2) .main-cover:nth-child(7) a").removeClass("hidden");
                        $(".right-main:nth-child(2) .main-cover:nth-child(7) iframe").next().attr("href", pdfPath + data.data.fileName)
                        $(".right-main:nth-child(2) .main-cover:nth-child(7) iframe").next().next().attr("href", pdfPath + data.data.fileName)
                        $(".right-main:nth-child(2) .main-cover:nth-child(7) iframe").next().next().attr("download", name);
                    } else {

                    }
                    input.val("");
                },
                error: function () {

                    input.val("");
                }
            })
            input.val("");
        });
        //pdf删除
        $(".right-main:nth-child(2) .main-cover:nth-child(7) iframe").next().next().next().click(function () {
            $(".right-main:nth-child(2) .main-cover:nth-child(7) a").addClass("hidden");
            $(".right-main:nth-child(2) .main-cover:nth-child(7) iframe").removeAttr("src");
            $(".right-main:nth-child(2) .main-cover:nth-child(7) iframe").next().attr("href", "")
            $(".right-main:nth-child(2) .main-cover:nth-child(7) iframe").next().next().attr("href", "")
            $(".right-main:nth-child(2) .main-cover:nth-child(7) iframe").next().next().attr("download", "");
        });
        //资讯宣教图片上传
        $(".right-main:nth-child(2) .main-cover:nth-child(6)>div:nth-child(2)").click(function () {
            $(".right-main:nth-child(2) .main-cover:nth-child(6)>label>input").click()
        });
        $(".right-main:nth-child(2) .main-cover:nth-child(6)>label>input").change(function () {
            var formData = new FormData();
            formData.append('file_data', $(this)[0].files[0]);
            var src = $(".right-main:nth-child(2) .main-cover:nth-child(6)>div:nth-child(3)>img").attr("src");
            var input = $(this);
            $.ajax({
                type: "POST",
                url: rootPath + "/api/file/fileUpload?fileType=image",
                dataType: "json",
                data: formData,
                contentType: false,
                processData: false,
                beforeSend: function () {
                    $(".right-main:nth-child(2) .main-cover:nth-child(6)>div:nth-child(3) input").val("")
                    if ($(".right-main:nth-child(2) .main-cover:nth-child(6)>div:nth-child(3)>img").length === 0) {
                        $(".right-main:nth-child(2) .main-cover:nth-child(6)>div:nth-child(3)").append('<img class="upload" src="' + imgBitmap + '">')
                    } else {
                        $(".right-main:nth-child(2) .main-cover:nth-child(6)>div:nth-child(3)>img").attr("src", imgBitmap);
                    }
                },
                xhr: xhrOnProgress(function (e) {

                }),
                success: function (data) {
                    if (data.status == 200) {
                        $(".right-main:nth-child(2) .main-cover:nth-child(6)>div:nth-child(3) input").val(data.data.fileName);
                        if ($(".right-main:nth-child(2) .main-cover:nth-child(6)>div:nth-child(3)>img").length === 0) {
                            $(".right-main:nth-child(2) .main-cover:nth-child(6)>div:nth-child(3)").append('<img class="uploadimg" src="' + imgPath + data.data.fileName + '">')
                        } else {
                            $(".right-main:nth-child(2) .main-cover:nth-child(6)>div:nth-child(3)>img").attr("src", imgPath + data.data.fileName);
                        }
                    } else {
                        if (src !== "" || src != undefined) {
                            $(".right-main:nth-child(2) .main-cover:nth-child(6)>div:nth-child(3) input").val(src.replace(imgPath, ""));
                            if ($(".right-main:nth-child(2) .main-cover:nth-child(6)>div:nth-child(3)>img").length === 0) {
                                $(".right-main:nth-child(2) .main-cover:nth-child(6)>div:nth-child(3)").append('<img class="uploadimg" src="' + src + '">')
                            } else {
                                $(".right-main:nth-child(2) .main-cover:nth-child(6)>div:nth-child(3)>img").attr("src", src);
                            }
                        }
                    }
                    input.val("");
                },
                error: function () {
                    if (src !== "" || src != undefined) {
                        $(".right-main:nth-child(2) .main-cover:nth-child(6)>div:nth-child(3) input").val(src.replace(imgPath, ""));
                        if ($(".right-main:nth-child(2) .main-cover:nth-child(6)>div:nth-child(3)>img").length === 0) {
                            $(".right-main:nth-child(2) .main-cover:nth-child(6)>div:nth-child(3)").append('<img class="uploadimg" src="' + src + '">')
                        } else {
                            $(".right-main:nth-child(2) .main-cover:nth-child(6)>div:nth-child(3)>img").attr("src", src);
                        }
                    }
                    input.val("");
                }
            })
            input.val("");
        });
        $(".right-main:nth-child(5) .main-cover:nth-child(5)>div:nth-child(2)").click(function () {
            $(".right-main:nth-child(5) .main-cover:nth-child(5)>label>input").click()
        });
        $(".right-main:nth-child(5) .main-cover:nth-child(5)>label>input").change(function () {
            var formData = new FormData();
            formData.append('file_data', $(this)[0].files[0]);
            var input = $(this);
            var src = $(".right-main:nth-child(5) .main-cover:nth-child(5)>div:nth-child(3)>img").attr("src");
            $.ajax({
                type: "POST",
                url: rootPath + "/api/file/fileUpload?fileType=image",
                dataType: "json",
                data: formData,
                contentType: false,
                processData: false,
                beforeSend: function () {
                    $(".right-main:nth-child(5) .main-cover:nth-child(5)>div:nth-child(3) input").val("");
                    if ($(".right-main:nth-child(5) .main-cover:nth-child(5)>div:nth-child(3)>img").length === 0) {
                        $(".right-main:nth-child(5) .main-cover:nth-child(5)>div:nth-child(3)").append('<img class="uploadimg" src="' + imgBitmap + '">')
                    } else {
                        $(".right-main:nth-child(5) .main-cover:nth-child(5)>div:nth-child(3)>img").attr("src", imgBitmap);
                    }
                },
                xhr: xhrOnProgress(function (e) {

                }),
                success: function (data) {
                    if (data.status == 200) {
                        $(".right-main:nth-child(5) .main-cover:nth-child(5)>div:nth-child(3) input").val(data.data.fileName);
                        if ($(".right-main:nth-child(5) .main-cover:nth-child(5)>div:nth-child(3)>img").length === 0) {
                            $(".right-main:nth-child(5) .main-cover:nth-child(5)>div:nth-child(3)").append('<img class="uploadimg" src="' + imgPath + data.data.fileName + '">')
                        } else {
                            $(".right-main:nth-child(5) .main-cover:nth-child(5)>div:nth-child(3)>img").attr("src", imgPath + data.data.fileName);
                        }
                    } else {
                        if (src !== "" || src != undefined) {
                            $(".right-main:nth-child(5) .main-cover:nth-child(5)>div:nth-child(3) input").val(src.replace(imgPath, ""));
                            if ($(".right-main:nth-child(5) .main-cover:nth-child(5)>div:nth-child(3)>img").length === 0) {
                                $(".right-main:nth-child(5) .main-cover:nth-child(5)>div:nth-child(3)").append('<img class="uploadimg" src="' + src + '">')
                            } else {
                                $(".right-main:nth-child(5) .main-cover:nth-child(5)>div:nth-child(3)>img").attr("src", src);
                            }
                        }
                    }
                    input.val("");
                },
                error: function () {
                    if (src !== "" || src != undefined) {
                        $(".right-main:nth-child(5) .main-cover:nth-child(5)>div:nth-child(3) input").val(src.replace(imgPath, ""));
                        if ($(".right-main:nth-child(5) .main-cover:nth-child(5)>div:nth-child(3)>img").length === 0) {
                            $(".right-main:nth-child(5) .main-cover:nth-child(5)>div:nth-child(3)").append('<img class="uploadimg" src="' + src + '">')
                        } else {
                            $(".right-main:nth-child(5) .main-cover:nth-child(5)>div:nth-child(3)>img").attr("src", src);
                        }
                    }
                    input.val("");
                }
            })
        });
        //视频上传
        $(".right-main:nth-child(5) .main-cover:nth-child(4)>div:nth-child(2)").click(function () {
            $(".right-main:nth-child(5) .main-cover:nth-child(4)>label>input").click()
        });
        $(".right-main:nth-child(5) .main-cover:nth-child(4)>label>input").change(function () {
            var formData = new FormData();
            formData.append('file_data', $(this)[0].files[0]);
            var src = $(".right-main:nth-child(5) .main-cover:nth-child(4)>div:nth-child(3)>video").attr("src");
            var input = $(this);
            $.ajax({
                type: "POST",
                url: rootPath + "/api/file/fileUpload?fileType=audio",
                dataType: "json",
                data: formData,
                contentType: false,
                processData: false,
                beforeSend: function () {
                    $(".right-main:nth-child(5) .main-cover:nth-child(4)>div:nth-child(3) input").val("");
                    $(".right-main:nth-child(5) .main-cover:nth-child(4)>div:nth-child(3)>video").remove();
                    if ($(".right-main:nth-child(5) .main-cover:nth-child(4)>div:nth-child(3)>img").length === 0) {
                        $(".right-main:nth-child(5) .main-cover:nth-child(4)>div:nth-child(3)").append('<img  class="uploadvideo" src="' + videoBitmap + '">')
                    } else {
                        $(".right-main:nth-child(5) .main-cover:nth-child(4)>div:nth-child(3)>img").attr("src", videoBitmap);
                    }
                },
                xhr: xhrOnProgress(function (e) {

                }),
                success: function (data) {
                    $(".right-main:nth-child(5) .main-cover:nth-child(4)>div:nth-child(3)>img").remove();
                    if (data.status == 200) {
                        $(".right-main:nth-child(5) .main-cover:nth-child(4)>div:nth-child(3) input").val(data.data.fileName);
                        if ($(".right-main:nth-child(5) .main-cover:nth-child(4)>div:nth-child(3)>video").length === 0) {
                            $(".right-main:nth-child(5) .main-cover:nth-child(4)>div:nth-child(3)").append('<video class="uploadvideo" src="' + videoPath + data.data.fileName + '"></video>')
                        } else {
                            $(".right-main:nth-child(5) .main-cover:nth-child(4)>div:nth-child(3)>video").attr("src", videoPath + data.data.fileName);
                        }
                    } else {
                        if (src !== "" || src != undefined) {
                            $(".right-main:nth-child(5) .main-cover:nth-child(4)>div:nth-child(3) input").val(src.replace(videoPath, ""));
                            if ($(".right-main:nth-child(5) .main-cover:nth-child(4)>div:nth-child(3)>video").length === 0) {
                                $(".right-main:nth-child(5) .main-cover:nth-child(4)>div:nth-child(3)").append('<video class="uploadvideo" src="' + src + '"></video>')
                            } else {
                                $(".right-main:nth-child(5) .main-cover:nth-child(4)>div:nth-child(3)>video").attr("src", src);
                            }
                        }
                    }
                    input.val("");
                },
                error: function () {
                    if (src !== "" || src != undefined) {
                        $(".right-main:nth-child(5) .main-cover:nth-child(4)>div:nth-child(3) input").val(src.replace(videoPath, ""));
                        if ($(".right-main:nth-child(5) .main-cover:nth-child(4)>div:nth-child(3)>video").length === 0) {
                            $(".right-main:nth-child(5) .main-cover:nth-child(4)>div:nth-child(3)").append('<video class="uploadvideo" src="' + src + '"></video>')
                        } else {
                            $(".right-main:nth-child(5) .main-cover:nth-child(4)>div:nth-child(3)>video").attr("src", src);
                        }
                    }
                    input.val("");
                }
            })
            input.val('')
        });
        //视频样式
        $(".right-main:nth-child(4)").on("mouseover", ".video", function () {
            if ($(".right-main:nth-child(4) .information-buttons .normal-button:nth-child(3)").html() === "编&nbsp;辑") {
                if ($(this).children("video").length === 1) {
                    if ($(this).children('div').eq(3).hasClass('video-2')) {
                        $(this).children("div:nth-child(2)").removeClass("hidden");
                    }
                    $(this).children(".mask").removeClass("hidden");
                } else {
                    $(this).children("img").css("cursor", "pointer");
                }
            }

        });
        $(".right-main:nth-child(4)").on("mouseout", ".video", function () {
            if ($(".right-main:nth-child(4) .information-buttons .normal-button:nth-child(3)").html() === "编&nbsp;辑") {
                if ($(this).children("video").length === 1) {
                    $(this).children(".mask").addClass("hidden");
                    $(this).children("div:nth-child(2)").addClass("hidden");
                }
            }
        });
        $(".others").on("mouseover", ".other-item-type1", function () {
            $(this).children(".otherVideo").children(".mask").removeClass("hidden");
            $(this).children(".otherVideo").children(".play").removeClass("hidden");
        });
        $(".others").on("mouseout", ".other-item-type1", function () {
            $(this).children(".otherVideo").children(".mask").addClass("hidden");
            $(this).children(".otherVideo").children(".play").addClass("hidden");
        });
        //视频刷新
        $(".right-main:nth-child(4) .information-buttons .normal-button:nth-child(2)").click(function () {
            if ($(".right-main:nth-child(4) .information-buttons .normal-button:nth-child(3)").html() === "完&nbsp;成") {
                bootAlert("请先完成删除视频操作再进行刷新");
            } else {
                reloadAjax(dataInfoTableVideo);
            }

        });
        $(".right-main:nth-child(4) .information-buttons .normal-button:nth-child(3)").click(function () {
            if ($(this).hasClass("delete-button")) {
                reloadAjax(dataInfoTableVideo)
                $(this).removeClass("delete-button");
                $(this).html("编&nbsp;辑")
                $(".right-main:nth-child(4) .video").children(".mask").addClass("hidden");
                $(".right-main:nth-child(4) .video").children(".mask").css("opacity", "0.2");
                $(".right-main:nth-child(4) .video>div:nth-child(5)").addClass("hidden");
                $(".right-main:nth-child(4) .video>div:nth-child(6)").addClass("hidden");
            } else {
                $(this).addClass("delete-button");
                $(this).html("完&nbsp;成")
                $(".right-main:nth-child(4) .video").children(".mask").removeClass("hidden");
                $(".right-main:nth-child(4) .video").children(".mask").css("opacity", "0.4");
                $(".right-main:nth-child(4) .video video").each(function () {
                    var scope = parseInt($(this).attr("type"));
                    if (user.scopeId === 0) {
                        $(this).next().next("div").removeClass("hidden");
                        $(this).next().next("div").next("div").removeClass("hidden");
                    } else if (user.scopeId % 10000 === 0 && scope >= user.scopeId && scope <= user.scopeId + 9999) {
                        $(this).next().next("div").removeClass("hidden");
                        $(this).next().next("div").next("div").removeClass("hidden");
                    } else if (user.scopeId % 100 === 0 && scope >= user.scopeId && scope <= user.scopeId + 99) {
                        $(this).next().next("div").removeClass("hidden");
                        $(this).next().next("div").next("div").removeClass("hidden");
                    } else if (user.scopeId % 100 !== 0 && scope === user.scopeId) {
                        $(this).next().next("div").removeClass("hidden");
                        $(this).next().next("div").next("div").removeClass("hidden");
                    }
                })
                $(".right-main:nth-child(4) .video>img").each(function () {
                    var scope = parseInt($(this).attr("type"));
                    if (user.scopeId === 0) {
                        $(this).next().next("div").removeClass("hidden");
                        $(this).next().next("div").next("div").removeClass("hidden");
                    } else if (user.scopeId % 10000 === 0 && scope >= user.scopeId && scope <= user.scopeId + 9999) {
                        $(this).next().next("div").removeClass("hidden");
                        $(this).next().next("div").next("div").removeClass("hidden");
                    } else if (user.scopeId % 100 === 0 && scope >= user.scopeId && scope <= user.scopeId + 99) {
                        $(this).next().next("div").removeClass("hidden");
                        $(this).next().next("div").next("div").removeClass("hidden");
                    } else if (user.scopeId % 100 !== 0 && scope === user.scopeId) {
                        $(this).next().next("div").removeClass("hidden");
                        $(this).next().next("div").next("div").removeClass("hidden");
                    }
                })

            }
        });
        $(".right-main:nth-child(4)").on('click', '.paginate_button', function (e) {
            $(".right-main:nth-child(4) .information-buttons .normal-button:nth-child(3)").removeClass("delete-button");
            $(".right-main:nth-child(4) .information-buttons .normal-button:nth-child(3)").html("编&nbsp;辑")
            $(".right-main:nth-child(4) .video").children(".mask").addClass("hidden");
            $(".right-main:nth-child(4) .video").children(".mask").css("opacity", "0.2");
            $(".right-main:nth-child(4) .video>div:nth-child(5)").addClass("hidden");
            $(".right-main:nth-child(4) .video>div:nth-child(6)").addClass("hidden");
        });
        //删除视频
        $(".right-main:nth-child(4)").on("click", ".video .delete", function () {
            var id = $(this).attr("id").replace("video-", "");
            var messages = ["请确认是否删除青春教育?", "请确认是否删除计生指导?", "请确认是否删除政策法规?", "请确认事发欧删除优生优育?"];
            bootbox.confirm({
                title: "删除宣教",
                message: messages[xjType - 1],
                callback: function (result) {
                    if (result) {
                        deleteXuanjiao(id);
                    } else {
                        return;
                    }
                }
            });

        });
        //编辑视频
        $(".right-main:nth-child(4)").on("click", ".video .videoEdit", function () {
            var id = $(this).attr("id").replace("video-", "");
            if ($(this).hasClass("video-1")) {
                if ($(".right-main:nth-child(1)>input").val() == 0) {
                    $(".right-main:nth-child(2) .main-title input").addClass("Announcement-input");
                    $(".right-main:nth-child(2) .main-title label:nth-child(3)").removeClass("hidden");
                } else {
                    $(".right-main:nth-child(2) .main-title input").removeClass("Announcement-input");
                    $(".right-main:nth-child(2) .main-title label:nth-child(3)").addClass("hidden");
                }
                $.ajax({
                    type: "GET",
                    url: rootPath + "/api/getXuanjiao",
                    dataType: "json",
                    data: {
                        id: id,
                    },
                    success: function (data) {
                        if (data.status === 200) {
                            $("#edit-title").val(data.data.name);
                            $("#inputArea").html(data.data.content);
                            $("#addCover1>img").remove();
                            $("#image-src").val("");
                            if (data.data.attachment != "") {
                                $("#addCover1").append('<img src="' + imgPath + data.data.attachment + '">')
                                $("#image-src").val(data.data.attachment);
                            }
                            editPageInit();
                            if (data.data.pdf != "") {
                                $(".right-main:nth-child(2) .main-cover:nth-child(7) iframe").attr("src", pdfPath + data.data.pdf);
                                $(".right-main:nth-child(2) .main-cover:nth-child(7) a").removeClass("hidden");
                                $(".right-main:nth-child(2) .main-cover:nth-child(7) iframe").next().attr("href", pdfPath + data.data.pdf);
                                $(".right-main:nth-child(2) .main-cover:nth-child(7) iframe").next().next().attr("href", pdfPath + data.data.pdf);
                                $(".right-main:nth-child(2) .main-cover:nth-child(7) iframe").next().next().attr("download", data.data.pdfName);
                            }
                            if (xjType != 3){
                                $("#edit .main-text").addClass("hidden");
                            }else{
                                $("#edit .main-text").removeClass("hidden");
                            }

                            $("#edit>input[name=id]").val(id);
                        }
                    },
                    error: function () {
                        alert("服务器请求失败")
                    }
                })
            } else {
                $("#add-video-title").val("");
                $(".right-main:nth-child(5) .uploadvideo").remove()
                $("#add-video-image .uploadimg").remove()
                $(".right-main").addClass("hidden");
                $(".right-main:nth-child(5)").removeClass("hidden");
                $(".right-main:nth-child(5) .l-title").html('<img src="' + rootPath + '/resources/icon/fanhui.png">' + '编辑视频');
                var s_titles = ["公告与资讯/健康宣教/青春教育/添加视频", "公告与资讯/健康宣教/计生指导/添加视频", "公告与资讯/健康宣教/政策法规/添加视频", "公告与资讯/健康宣教/优生优育/添加视频"];
                $(".right-main:nth-child(5) .s-title").html(s_titles[xjType - 1]);
                $(".right-main:nth-child(5)>input[name=id]").val(id);
                ToVideoEditPage(id);
            }
        })


        //切换公告详情界面
        $(".gonggaoList").on('click', 'td:nth-child(2)', function () {
            var id = $(this).children().attr("id").replace("gonggao-read-", "");
            ToAnnouncementReadPage(id);
        })
        $(".gonggaoList").delegate('.information-operator3', 'click', function () {
            var id = $(this).attr("id").replace("gonggao-edit-", "");
            ToAnnouncementReadPage(id);
        })
        //切换资讯详情界面
        $(".zixunList").on('click', 'td:nth-child(3)', function () {
            var id = $(this).children().attr("id").replace("zixun-read-", "");
            ToZixunReadPage(id);
        })
        $(".zixunList").delegate('.information-operator3', 'click', function () {
            var id = $(this).attr("id").replace("zixun-edit-", "");
            ToZixunReadPage(id);
        })
        //切换宣教详情界面
        $(".right-main:nth-child(4)").on("click", ".video", function () {
            if ($(this).children(".mask").attr("class").indexOf("hidden") != -1){
                window.open(pdfPath + $(this).children("img").attr("class"));
            }
        })
        $(".xuanjiaoList").on('click', "td:nth-child(3)", function () {
            var id = $(this).children().attr("id").replace("xuanjiao-read-", "");
            ToXuanjiaoReadPage(id);
        })
        $(".xuanjiaoList").delegate('.information-operator3', 'click', function () {
            var id = $(this).attr("id").replace("xuanjiao-edit-", "");
            ToXuanjiaoReadPage(id);
        })

        //切换至公告编辑界面
        $(".gonggaoList").delegate('.information-operator1', 'click', function () {
            if ($(".right-main:nth-child(1)>input").val() == 0) {
                $(".right-main:nth-child(2) .main-title input").addClass("Announcement-input");
                $(".right-main:nth-child(2) .main-title label:nth-child(3)").removeClass("hidden");
            } else {
                $(".right-main:nth-child(2) .main-title input").removeClass("Announcement-input");
                $(".right-main:nth-child(2) .main-title label:nth-child(3)").addClass("hidden");
            }
            var id = $(this).attr("id").replace("gonggao-edit-", "");
            $("#edit>input[name=id]").val(id);
            $.ajax({
                type: "GET",
                url: rootPath + "/api/getAnnouncement",
                dataType: "json",
                data: {
                    id: id,
                },
                success: function (data) {
                    if (data.status === 200) {
                        $("#edit-title").val(data.data.title);
                        $("#inputArea").html(data.data.content);
                        $("#edit-imporance").val(data.data.importance).trigger('change');
                        editPageInit();
                        $("#edit>input[name=id]").val(id);
                    }
                },
                error: function () {
                    alert("服务器请求失败")
                }
            })
        })
        //切换至资讯编辑界面
        $(".zixunList").delegate('.information-operator1', 'click', function () {
            if ($(".right-main:nth-child(1)>input").val() == 0) {
                $(".right-main:nth-child(2) .main-title input").addClass("Announcement-input");
                $(".right-main:nth-child(2) .main-title label:nth-child(3)").removeClass("hidden");
            } else {
                $(".right-main:nth-child(2) .main-title input").removeClass("Announcement-input");
                $(".right-main:nth-child(2) .main-title label:nth-child(3)").addClass("hidden");
            }
            var id = $(this).attr("id").replace("zixun-edit-", "");
            $.ajax({
                type: "GET",
                url: rootPath + "/api/getZixun",
                dataType: "json",
                data: {
                    id: id,
                },
                success: function (data) {
                    if (data.status === 200) {
                        $("#edit-title").val(data.data.title);
                        $("#inputArea").html(data.data.content);
                        $("#addCover1>img").remove();
                        $("#image-src").val("");
                        if (data.data.attachment != "") {
                            $("#addCover1").append('<img src="' + imgPath + data.data.attachment + '">');
                            $("#image-src").val(data.data.attachment);
                        }
                        editPageInit();
                        $("#edit>input[name=id]").val(id);
                    }
                },
                error: function () {
                    alert("服务器请求失败")
                }
            })
        })
        //切换至宣教编辑界面
        $(".xuanjiaoList").delegate('.information-operator1', 'click', function () {
            if ($(".right-main:nth-child(1)>input").val() == 0) {
                $(".right-main:nth-child(2) .main-title input").addClass("Announcement-input");
                $(".right-main:nth-child(2) .main-title label:nth-child(3)").removeClass("hidden");
            } else {
                $(".right-main:nth-child(2) .main-title input").removeClass("Announcement-input");
                $(".right-main:nth-child(2) .main-title label:nth-child(3)").addClass("hidden");
            }
            var id = $(this).attr("id").replace("xuanjiao-edit-", "");
            $.ajax({
                type: "GET",
                url: rootPath + "/api/getXuanjiao",
                dataType: "json",
                data: {
                    id: id,
                },
                success: function (data) {
                    if (data.status === 200) {
                        $("#edit-title").val(data.data.name);
                        $("#inputArea").html(data.data.content);
                        $("#addCover1>img").remove();
                        $("#image-src").val("");
                        if (data.data.attachment != "") {
                            $("#addCover1").append('<img src="' + imgPath + data.data.attachment + '">')
                            $("#image-src").val(data.data.attachment);
                        }
                        editPageInit();
                        if (data.data.pdf != "") {
                            $(".right-main:nth-child(2) .main-cover:nth-child(7) iframe").attr("src", pdfPath + data.data.pdf);
                            $(".right-main:nth-child(2) .main-cover:nth-child(7) a").removeClass("hidden");
                            $(".right-main:nth-child(2) .main-cover:nth-child(7) iframe").next().attr("href", pdfPath + data.data.pdf);
                            $(".right-main:nth-child(2) .main-cover:nth-child(7) iframe").next().next().attr("href", pdfPath + data.data.pdf);
                            $(".right-main:nth-child(2) .main-cover:nth-child(7) iframe").next().next().attr("download", data.data.pdfName);
                        }

                        $("#edit>input[name=id]").val(id);
                    }
                },
                error: function () {
                    alert("服务器请求失败")
                }
            })
        })

        //删除公告
        $(".gonggaoList").delegate('.information-operator2', 'click', function () {
            var id = $(this).attr("id").replace("gonggao-edit-", "");
            bootbox.confirm({
                title: "删除公告",
                message: "请确认是否删除公告？",
                callback: function (result) {
                    if (result) {
                        deleteAnnouncement(id);
                    } else {
                        return;
                    }
                }
            });
        })
        //删除资讯
        $(".zixunList").delegate('.information-operator2', 'click', function () {
            var id = $(this).attr("id").replace("zixun-edit-", "");
            bootbox.confirm({
                title: "删除资讯",
                message: '<img style="width: 40px;margin-right: 10px" src="' + rootPath + '/resources/icon/hint.png">' + '是否选择删除对外资讯',
                callback: function (result) {
                    if (result) {
                        deleteZixun(id);
                    } else {
                        return;
                    }
                }
            });
            $(".modal-title").css("color", "#fb2020");
            $(".bootbox-body").css("color", "#314659");
        })
        //删除宣教
        $(".xuanjiaoList").delegate('.information-operator2', 'click', function () {
            var id = $(this).attr("id").replace("xuanjiao-edit-", "");
            var titles = ["删除计生指导", "删除政策法规", "删除优生优育"];
            var messages = ["请确认是否删除计生指导", "请确认是否删除政策法规", "请确认是否删除优生优育"]
            // $(".bootbox-confirm .modal-header").css("color","#fb2020");
            bootbox.confirm({
                title: titles[parseInt($(".right-main:nth-child(1)>input").val()) - 2],
                message: messages[parseInt($(".right-main:nth-child(1)>input").val()) - 2],
                callback: function (result) {
                    if (result) {
                        deleteXuanjiao(id)
                    } else {
                        return;
                    }
                }
            });
        })
        $("#cancel-btn").click(function () {
            $(".right-main:nth-child(2) .l-title img").click();
        });
        //编辑添加界面确认按钮
        $("#add-update-button").click(function () {
            //添加
            if ($("#edit>input[name=id]").val() == -1) {
                if ($(".right-main:nth-child(1)>input").val() == 0) {
                    if ($("#edit-title").val() === "" || $("#inputArea").html() == "" || $("#inputArea").html() === "<p><br></p>") {
                        bootAlert("标题与内容不能为空")
                    } else {
                        bootbox.confirm({
                            title: "添加公告",
                            message: "请确认是否添加公告？",
                            callback: function (result) {
                                if (result) {
                                    insertAnnouncement();
                                } else {
                                    return;
                                }
                            }
                        });
                    }
                } else if ($(".right-main:nth-child(1)>input").val() == 1) {
                    if ($("#edit-title").val() === "" || $("#inputArea").html() == "" || $("#inputArea").html() === "<p><br></p>") {
                        bootAlert("标题与内容不能为空")
                    } else {
                        bootbox.confirm({
                            title: "添加资讯",
                            message: '<img style="width: 40px;margin-right: 10px" src="' + rootPath + '/resources/icon_old/hint.png">' + '是否选择发布对外资讯',
                            callback: function (result) {
                                if (result) {
                                    insertZixun();
                                } else {
                                    return;
                                }
                            }
                        });
                        $(".modal-title").css("color", "#fb2020");
                        $(".bootbox-body").css("color", "#314659");
                    }
                } else {
                    var titles = ["添加青春健康", "添加计生指导", "添加政策法规", "添加优生优育"];
                    var messages = ["请确认是否添加青春健康", "请确认是否添加计生指导", "请确认是否添加政策法规", "请确认是否添加优生优育"];
                    if ($("#edit-title").val() === "") {
                        bootAlert("标题不能为空")
                    }else if (parseInt($(".right-main:nth-child(1)>input").val()) - 2 == 2 && ($("#inputArea").html() == "" || $("#inputArea").html() === "<p><br></p>")){
                        bootAlert("内容不能为空")
                    }else if ($(".right-main:nth-child(1)>input").val() - 2 != 2 && $(".right-main:nth-child(2) .main-cover:nth-child(7) iframe").attr("src") == undefined){
                        bootAlert("请上传pdf")
                    }else {
                        bootbox.confirm({
                            title: titles[parseInt($(".right-main:nth-child(1)>input").val()) - 2],
                            message: messages[parseInt($(".right-main:nth-child(1)>input").val()) - 2],
                            callback: function (result) {
                                if (result) {
                                    insertXuanjiao();
                                } else {
                                    return;
                                }
                            }
                        });
                    }
                }
            } else {
                var id = $("#edit>input[name=id]").val();
                if ($(".right-main:nth-child(1)>input").val() == 0) {
                    if ($("#edit-title").val() === "" || $("#inputArea").html() == "" || $("#inputArea").html() === "<p><br></p>") {
                        bootAlert("标题与内容不能为空")
                    } else {
                        bootbox.confirm({
                            title: "修改公告",
                            message: "请确认是否修改公告？",
                            callback: function (result) {
                                if (result) {
                                    updateAnnouncement(id);
                                } else {
                                    return;
                                }
                            }
                        });
                    }

                } else if ($(".right-main:nth-child(1)>input").val() == 1) {
                    if ($("#edit-title").val() === "" || $("#inputArea").html() == "" || $("#inputArea").html() === "<p><br></p>") {
                        bootAlert("标题与内容不能为空")
                    } else {
                        bootbox.confirm({
                            title: "修改资讯",
                            message: "请确认是否修改资讯？",
                            callback: function (result) {
                                if (result) {
                                    updateZixun(id);
                                } else {
                                    return;
                                }
                            }
                        });
                    }

                } else {
                    var titles = ["修改青春教育", "修改计生指导", "修改政策法规", "修改优生优育"];
                    var messages = ["请确认是否修改青春教育", "请确认是否修改计生指导", "请确认是否修改政策法规", "请确认是否修改优生优育"];
                    if ($("#edit-title").val() === "") {
                        bootAlert("标题不能为空")
                    }else if (parseInt($(".right-main:nth-child(1)>input").val()) - 2 == 2 && ($("#inputArea").html() == "" || $("#inputArea").html() === "<p><br></p>")){
                        bootAlert("内容不能为空")
                    } else {
                        bootbox.confirm({
                            title: titles[parseInt($(".right-main:nth-child(1)>input").val()) - 2],
                            message: messages[parseInt($(".right-main:nth-child(1)>input").val()) - 2],
                            callback: function (result) {
                                if (result) {
                                    updateXuanjiao(id);
                                } else {
                                    return;
                                }
                            }
                        });
                    }

                }
            }
        })
        //视频播放
        $(".right-main:nth-child(4)").on("click", ".video .play", function () {
            var poster = $(this).parent().children("video").attr("poster");
            var src = $(this).parent().children("input").val();
            if (poster === undefined) {
                $("#playVideo .popBox-content>div").html('<div class="close">×<div></div></div><video src="' + videoPath + src + '" preload="auto" controls="controls"></video>')
            } else {
                $("#playVideo .popBox-content>div").html('<div class="close">×<div></div></div><video poster="' + poster + '" src="' + videoPath + src + '" preload="auto" controls="controls"></video>')
            }
            $("#playVideo").css("display", "block");
            $("body").addClass("body-hidden");
            $(this).addClass("hidden");
        });
        $(".main-cover").on("click", '.play', function () {
            var src = $(this).next().attr("src");
            $("#playVideo .popBox-content>div").html('<div class="close">×<div></div></div><video src="' + src + '"preload="auto" controls="controls"></video>')
            $("#playVideo").css("display", "block");
            $("body").addClass("body-hidden");
        });
        $(".others").on("click", ".play", function () {
            var src = $(this).next().attr("src");
            var poster = $(this).next().attr("poster");
            if (poster == undefined) {
                $("#playVideo .popBox-content>div").html('<div class="close">×<div></div></div><video src="' + src + '"preload="auto" controls="controls"></video>')
            } else {
                $("#playVideo .popBox-content>div").html('<div class="close">×<div></div></div><video poster="' + poster + '" src="' + src + '"preload="auto" controls="controls"></video>')
            }
            $("#playVideo").css("display", "block");
            $("body").addClass("body-hidden");
        });
        $("#playVideo").on("click", '.close', function () {
            $("#playVideo .popBox-content>div").html("");
            $("#playVideo").css("display", "none");
            $("body").removeClass("body-hidden");
        });
        $("#selectType").on("click", '.closeType', function () {
            $("#selectType").css("display", "none");
            $("body").removeClass("body-hidden");
        });
        $("#add-QCJY-button").click(function () {
            if ($("#add-video-title").val() === "") {
                bootAlert("请填写标题");
                return;
            }
            if ($("#video-src").val() === "") {
                bootAlert("请选择视频");
                return;
            }
            var id = $(".right-main:nth-child(5)>input[name=id]").val();
            if (id == -1) {
                insretVideo();
            } else {
                updateQCJY(id);
            }
        })

        indexToRead();

        //查询
        $(".right-main:nth-child(1) .search-div .main-button").click(function () {
            if ($(".right-main:nth-child(1)>input").val() == 0) {
                reloadAjax(dataInfoTableGg);
            } else if ($(".right-main:nth-child(1)>input").val() == 1) {
                reloadAjax(dataInfoTableZx);
            } else if ($(".right-main:nth-child(1)>input").val() == 2) {
                reloadAjax(dataInfoTableXj);
            }
        })
        $("#xuanjiao-search-button").click(function () {
            reloadAjax(dataInfoTableVideo);
        })
        $("#xuanjiao-query").click(function () {
            reloadAjax(dataInfoTableXj);
        })
        $(document).keydown(function (event) {
            if (event.keyCode === 13) {
                $(".right-main:nth-child(1) .search-div .main-button").click();
            }
        });

        //详情页其他跳转
        $(".right-main:nth-child(3) .others").on('click', '.other-item-type1', function () {
            if ($(this).children(".otherVideo").length == 1) {
                var src = $(this).children(".otherVideo").children("video").attr("src");
                var poster = $(this).children(".otherVideo").children("video").attr("poster");
                if (poster == undefined) {
                    $("#playVideo .popBox-content>div").html('<div class="close">×<div></div></div><video src="' + src + '"preload="auto" controls="controls"></video>')
                } else {
                    $("#playVideo .popBox-content>div").html('<div class="close">×<div></div></div><video poster="' + poster + '" src="' + src + '"preload="auto" controls="controls"></video>')
                }
                $("#playVideo").css("display", "block");
                $("body").addClass("body-hidden");
            }else{
                var id = $(this).attr("id");
                var type = $(this).attr("type");
                if (type == 0&&$(this).attr("data-pdf")==undefined) {
                    ToAnnouncementReadPage(id);
                } else if (type == 1&&$(this).attr("data-pdf")==undefined) {
                    ToZixunReadPage(id);
                } else {
                    xjType = type;
                    $(".right-main:nth-child(1)>input").val(parseInt(type) + 1);

                    //$(".left li a").removeClass("selected-li");
                    if (type == 3) {
                        $("#zc").addClass("selected-li");
                        ToXuanjiaoReadPage(id);
                    }else if (type==1 || type == 2 || type == 4){
                        window.open(pdfPath + $(this).attr("data-pdf"));
                    }

                }
            }
        });
        $(".right-main:nth-child(3) .others").on('click', '.other-item-type2', function () {
            var id = $(this).attr("id");
            var type = $(this).attr("type");
            if (type == 0) {
                ToAnnouncementReadPage(id);
            } else if (type == 1) {
                ToZixunReadPage(id);
            } else {
                xjType = type;
                $(".right-main:nth-child(1)>input").val(type + 1);
                $(".left li a").removeClass("selected-li");
                if (type == 2) {
                    $("#zd").addClass("selected-li");
                } else if (type == 3) {
                    $("#zc").addClass("selected-li");
                } else if (type == 4) {
                    $("#ys").addClass("selected-li");
                }
                ToXuanjiaoReadPage(id);
            }
        });
        document.addEventListener("error", function (e) {
            var elem = e.target;
            if (elem.tagName.toLowerCase() === 'img') {
                elem.src = imgBitmap;
            } else if (elem.tagName.toLowerCase() === 'video') {
                if ($(elem).attr("poster") === undefined) {
                    elem.poster = videoBitmap;
                }
            }
        }, true);

        // bootbox.confirm({
        //     title:"asd",
        //     message: "This is a confirm with custom button text and color! Do you like it?",
        //     buttons: {
        //         confirm: {
        //             label: '视频',
        //         },
        //         cancel: {
        //             label: '图文',
        //         }
        //     },
        //     callback: function (result) {
        //     }
        // });
    }
);

//二行省略号处理
function solveText(title) {
    for (var i = 0; i < title.length; i++) {
        $("#othertext").html(title.substr(0, i));
        if ($("#othertext").height() > $("#other").height()) {
            $("#othertext").html("");
            title = title.substr(0, i - 3) + "...";
            break;
        }
        $("#othertext").html("");
    }
    return title;
}

function solveText1(title) {
    for (var i = 0; i < title.length; i++) {
        $("#othertext1").html(title.substr(0, i));
        if ($("#othertext1").height() > $("#other1").height()) {
            $("#othertext1").html("");
            title = title.substr(0, i - 8) + "...";
            break;
        }
        $("#othertext1").html("");
    }
    return title;
}

//初始化详情页面
function readPageInit() {
    $(".right-main").addClass("hidden");
    $(".right-main:nth-child(3)").removeClass("hidden");
    var l_titles = ["公告详情", "资讯详情", "宣教详情"];
    var s_titles = ["公告与资讯/对内公告", "公告与资讯/对外资讯", "公告与资讯/健康宣教/青春健康", "公告与资讯/健康宣教/计生指导", "公告与资讯/健康宣教/政策法规", "公告与资讯/健康宣教/优生优育"];
    if ($(".right-main:nth-child(1)>input").val() <= 1) {
        $(".right-main:nth-child(3) .l-title").html('<img src="' + rootPath + '/resources/icon/fanhui.png">' + l_titles[parseInt($(".right-main:nth-child(1)>input").val())]);
        $(".right-main:nth-child(3) .main-title span").html("标题");
    } else {
        $(".right-main:nth-child(3) .l-title").html('<img src="' + rootPath + '/resources/icon/fanhui.png">' + l_titles[2]);
        $(".right-main:nth-child(3) .main-title span").html("标题");
    }
    $(".right-main:nth-child(3) .s-title").html(s_titles[parseInt($(".right-main:nth-child(1)>input").val())]);
    if ($(".right-main:nth-child(1)>input").val() == 0) {
        $(".right-main:nth-child(3) .read-cover").addClass("hidden");
    } else {
        $(".right-main:nth-child(3) .read-cover").removeClass("hidden");
    }
    $(".right-main:nth-child(3) .read-video").addClass("hidden");
}

//初始化编辑页面
function editPageInit() {
    $(".right-main").addClass("hidden");
    $(".right-main:nth-child(2)").removeClass("hidden");
    var l_titles = ["编辑公告", "编辑资讯", "编辑宣教"];
    var s_titles = ["公告与资讯/对内公告/编辑", "公告与资讯/对外资讯/编辑", "公告与资讯/健康宣教/青春教育/编辑", "公告与资讯/健康宣教/计生指导/编辑", "公告与资讯/健康宣教/政策法规/编辑", "公告与资讯/健康宣教/优生优育/编辑"];
    if ($(".right-main:nth-child(1)>input").val() <= 1) {
        $(".right-main:nth-child(2) .l-title").html('<img src="' + rootPath + '/resources/icon/fanhui.png">' + l_titles[parseInt($(".right-main:nth-child(1)>input").val())]);
        $(".right-main:nth-child(2) .main-title >span").html("标题");
        $(".right-main:nth-child(2) .main-cover:nth-child(7)").addClass("hidden");
    } else {
        $(".right-main:nth-child(2) .l-title").html('<img src="' + rootPath + '/resources/icon/fanhui.png">' + l_titles[2]);
        $(".right-main:nth-child(2) .main-title >span").html("标题");
        $(".right-main:nth-child(2) .main-cover:nth-child(7)").removeClass("hidden");
        $(".right-main:nth-child(2) .main-cover:nth-child(7) a").addClass("hidden");
        $(".right-main:nth-child(2) .main-cover:nth-child(7) iframe").removeAttr("src");
        $(".right-main:nth-child(2) .main-cover:nth-child(7) iframe").next().attr("href", "")
        $(".right-main:nth-child(2) .main-cover:nth-child(7) iframe").next().next().attr("href", "")
        $(".right-main:nth-child(2) .main-cover:nth-child(7) iframe").next().next().attr("download", "");
        $("#edit .main-cover").removeClass("hidden");
    }
    $(".right-main:nth-child(2) .s-title").html(s_titles[parseInt($(".right-main:nth-child(1)>input").val())]);
    if ($(".right-main:nth-child(1)>input").val() == 0) {
        $(".right-main:nth-child(2) .main-cover:nth-child(6)").addClass("hidden");
    } else {
        $(".right-main:nth-child(2) .main-cover:nth-child(6)").removeClass("hidden");
    }
    $("#edit .main-text").removeClass("hidden");
}


//公告查看界面
function ToAnnouncementReadPage(id) {
    $(".read-main>div:nth-child(3)").css("width", "calc(348px * 1280 /1440)");
    $(".read-main>div:nth-child(3)").css("padding", "0 46px");
    var read_types = ["对内公告", "对外资讯", "计生指导", "政策法规", "优生优育"];
    $.ajax({
        type: "GET",
        url: rootPath + "/api/getAnnouncement",
        dataType: "json",
        data: {
            id: id
        },
        success: function (data) {
            if (data.status === 200) {
                $(".read-title").html(data.data.title);
                $(".read-text").html(data.data.content);
                $(".right-main:nth-child(3) .read-type").html('<div>' + data.data.createdTime.substr(0, 4) + '年' + data.data.createdTime.substr(5, 2) + '月' + data.data.createdTime.substr(8, 2) + '日 &nbsp;&nbsp;&nbsp;&nbsp;来源：<span>' + data.data.createOrganizationName + '</span>&nbsp;&nbsp;&nbsp;&nbsp;' + read_types[parseInt($(".right-main:nth-child(1)>input").val())] + '</div>');
                readPageInit();
            }
        },
        error: function () {
            alert("服务器请求失败")
        }
    })
    $.ajax({
        type: "POST",
        url: rootPath + "/api/updateAnnouncementCountRead",
        dataType: "json",
        data: {
            id: id
        },
        success: function (data) {
        },
        error: function () {
        }
    })
    var count = 0;
    $(".right-main:nth-child(3) .others").html("<div class=\"other-title\">\n" +
        "                            其他公告\n" +
        "                        </div>")
    $.ajax({
        type: "GET",
        url: rootPath + "/api/listAnnouncement",
        dataType: "json",
        data: {},
        success: function (data) {
            if (data.status === 200) {
                for (var i = 0; i < data.data.length && count < 5; i++) {
                    if (data.data[i].id != id) {
                        var title = solveText1(data.data[i].title);
                        var content = "";
                        if (data.data[i].importance == 3) {
                            content += "<span style='color: #fb2020'>【紧急】</span>"
                        } else if (data.data[i].importance == 2) {
                            content += "<span style='color: #ffb30c'>【重要】</span>"
                        } else {
                            content += "<span style='color: #1890ff'>【普通】</span>"
                        }
                        content += title;
                        $(".right-main:nth-child(3) .others").append("<div id='" + data.data[i].id + "' type='0' class=\"other-item-type2\">\n" +
                            "                            <div style='border-bottom: 1px solid #d9d9d9'>\n" +
                            "                                <div>" + content + "</div>\n" +
                            "                                <div>对内公告</div>\n" +
                            "                            </div>\n" +
                            "                        </div>\n")
                        count++;
                    }
                }
            }
        },
        error: function () {

        }
    })
}

//资讯查看界面
function ToZixunReadPage(id) {
    $(".read-main>div:nth-child(3)").css("width", "calc(448px * 1280 /1440)");
    $(".read-main>div:nth-child(3)").css("padding", "0 46px 0 64px");
    var read_types = ["对内公告", "对外资讯", "计生指导", "政策法规", "优生优育"];
    $.ajax({
        type: "GET",
        url: rootPath + "/api/getZixun",
        dataType: "json",
        data: {
            id: id
        },
        success: function (data) {
            if (data.status === 200) {
                $(".read-title").html(data.data.title);
                $(".read-text").html(data.data.content);
                $(".right-main:nth-child(3) .read-type").html('<div>' + data.data.createdTime.substr(0, 4) + '年' + data.data.createdTime.substr(5, 2) + '月' + data.data.createdTime.substr(8, 2) + '日 &nbsp;&nbsp;&nbsp;&nbsp;来源：<span>' + data.data.createOrganizationName + '</span>&nbsp;&nbsp;&nbsp;&nbsp;' + read_types[parseInt($(".right-main:nth-child(1)>input").val())] + '</div>');
                var html = "";
                if (data.data.attachment !== "") {
                    html += '<img src="' + imgPath + data.data.attachment + '">';
                }
                $(".read-cover").html(html);
                readPageInit();
            }
        },
        error: function () {
            alert("服务器请求失败")
        }
    })
    $.ajax({
        type: "POST",
        url: rootPath + "/api/updateZixunCountRead",
        dataType: "json",
        data: {
            id: id
        },
        success: function (data) {
        },
        error: function () {
        }
    })
    var count = 0;
    $(".right-main:nth-child(3) .others").html("<div class=\"other-title\">\n" +
        "                            其他资讯\n" +
        "                        </div>")
    $.ajax({
        type: "GET",
        url: rootPath + "/api/listZixun",
        dataType: "json",
        data: {},
        success: function (data) {
            if (data.status === 200) {
                for (var i = 0; i < data.data.length && count < 5; i++) {
                    if (data.data[i].id != id) {
                        var title = solveText(data.data[i].title)
                        var imgSrc = "";
                        if (data.data[i].attachment === "") {
                            imgSrc = baseImgPath;
                        } else {
                            imgSrc = imgPath + data.data[i].attachment;
                        }
                        $(".right-main:nth-child(3) .others").append("<div id='" + data.data[i].id + "' type='1' class=\"other-item-type1\">\n" +
                            "                            <div>\n" +
                            "                                <img src='" + imgSrc + "'>\n" +
                            "                            </div>\n" +
                            "                            <div>\n" +
                            "                                <div>" + title + "</div>\n" +
                            "                                <div>对外资讯</div>\n" +
                            "                            </div>\n" +
                            "                        </div>\n")
                        count++;
                    }
                }
            }
        },
        error: function () {

        }
    })
}

//宣教查看界面
function ToXuanjiaoReadPage(id) {
    $(".read-main>div:nth-child(3)").css("width", "calc(448px * 1280 /1440)");
    $(".read-main>div:nth-child(3)").css("padding", "0 46px 0 64px");
    var read_types = ["对内公告", "对外资讯", "青春健康", "计生指导", "政策法规", "优生优育"];
    $.ajax({
        type: "GET",
        url: rootPath + "/api/getXuanjiao",
        dataType: "json",
        data: {
            id: id
        },
        success: function (data) {
            if (data.status === 200) {
                $(".read-title").html(data.data.name);
                $(".read-text").html(data.data.content);
                $(".right-main:nth-child(3) .read-type").html('<div>' + data.data.createdTime.substr(0, 4) + '年' + data.data.createdTime.substr(5, 2) + '月' + data.data.createdTime.substr(8, 2) + '日 &nbsp;&nbsp;&nbsp;&nbsp;来源：<span>' + data.data.createOrganizationName + '</span>&nbsp;&nbsp;&nbsp;&nbsp;' + read_types[parseInt($(".right-main:nth-child(1)>input").val())] + '</div>');
                var html = "";
                if (data.data.attachment !== "") {
                    html += '<img src="' + imgPath + data.data.attachment + '">';
                }
                $(".read-cover").html(html);
                $(".read-fujian").html("")
                if (data.data.pdf != "") {
                    $(".read-fujian").html("<a style='color: #1890ff' href='" + pdfPath + data.data.pdf + "' download='" + data.data.pdfName + "'>" + data.data.pdfName + "</a>")
                }
                readPageInit();
            }
        },
        error: function () {
            alert("服务器请求失败")
        }
    })
    var count = 0;
    $(".right-main:nth-child(3) .others").html("<div class=\"other-title\">\n" +
        "                            其他宣教\n" +
        "                        </div>")
    $.ajax({
        type: "GET",
        url: rootPath + "/api/listXuanjiao",
        dataType: "json",
        data: {},
        success: function (data) {
            if (data.status === 200) {
                for (var i = 0; i < data.data.length && count < 5; i++) {
                    if (data.data[i].id != id) {
                        var title = solveText(data.data[i].name)
                        var imgSrc = "";
                        if (data.data[i].attachment === "") {
                            imgSrc = baseImgPath;
                        } else {
                            imgSrc = imgPath + data.data[i].attachment;
                        }
                        var typeName = "";
                        var typeId;
                        if (data.data[i].type == 1) {
                            typeName = "青春健康";
                            typeId = 1;
                        } else if (data.data[i].type == 2) {
                            typeName = "计生指导";
                            typeId = 2;
                        } else if (data.data[i].type == 3) {
                            typeName = "政策法规";
                            typeId = 3;
                        } else if (data.data[i].type == 4) {
                            typeName = "优生优育";
                            typeId = 4;
                        }
                        if (data.data[i].video == "") {
                            if (data.data[i].type == 3){
                                $(".right-main:nth-child(3) .others").append("<div id='" + data.data[i].id + "' type='" + typeId + "' class=\"other-item-type1\">\n" +
                                    "                            <div>\n" +
                                    "                                <img src='" + imgSrc + "'>\n" +
                                    "                            </div>\n" +
                                    "                            <div>\n" +
                                    "                                <div>" + title + "</div>\n" +
                                    "                                <div>" + typeName + "</div>\n" +
                                    "                            </div>\n" +
                                    "                        </div>\n")
                            }else{
                                $(".right-main:nth-child(3) .others").append("<div id='" + data.data[i].id + "' type='" + typeId + "' class=\"other-item-type1\"  data-pdf='" + data.data[i].pdf + "' >\n" +
                                    "                            <div>\n" +
                                    "                                <img src='" + imgSrc + "'>\n" +
								    '<div class="othertipPDF" style="border: 40px solid transparent !important;\n' +
									'    border-top-width: 0 !important;\n' +
									'    border-bottom-color: #d9d9d9 !important;"></div>'+
								    '<div class="otherPDF">PDF</div>\n'+
                                    "                            </div>\n" +
                                    "                            <div>\n" +
                                    "                                <div>" + title + "</div>\n" +
                                    "                                <div>" + typeName + "</div>\n" +
                                    "                            </div>\n" +
                                    "                        </div>\n")
                            }

                        } else {
                            var pic = "";
                            if (data.data[i].attachment !== "") {
                                pic = imgPath + data.data[i].attachment;
                            }
                            var html = "<div id='" + data.data[i].id + "' type='" + typeId + "' class=\"other-item-type1\">\n" +
                                "<div class='otherVideo'>\n" +
                                '<div class="mask hidden"></div>\n' +
                                '<div class="play hidden"><img src=' + rootPath + '/resources/icon/bofang.png></div>\n';
                            if (pic !== "") {
                                html += '<video type="' + data.data[i].createMemberScopeId + '" poster="' + pic + '" src="' + videoPath + data.data[i].video + '" ></video>\n';
                            } else {
                                html += '<video type="' + data.data[i].createMemberScopeId + '" src="' + videoPath + data.data[i].video + '" ></video>\n';
                            }
                            html += "</div>\n" +
                                "<div>\n" +
                                "<div>" + title + "</div>\n" +
                                "<div>" + typeName + "</div>\n" +
                                "</div>\n" +
                                "</div>\n";

                            $(".right-main:nth-child(3) .others").append(html)
                        }
                        count++;
                    }
                }
            }
        },
        error: function () {

        }
    })
}

function ToVideoEditPage(id) {
    $.ajax({
        type: "GET",
        url: rootPath + "/api/getXuanjiao",
        dataType: "json",
        data: {
            id: id
        },
        success: function (data) {
            if (data.status === 200) {
                $("#add-video-title").val(data.data.name);
                var html = "";
                if (data.data.attachment !== "") {
                    html += '<img src="' + imgPath + data.data.attachment + '">';
                }
                console.log(html, data.data.attachment);
                $("#add-video-image").append(html);
                html = "";
                if (data.data.video !== "") {
                    html += '<video class="uploadvideo" src="' + videoPath + data.data.video + '"></video>';
                }
                $(".right-main:nth-child(5) .main-cover:nth-child(4)>div:nth-child(3)").append(html);
                $("#video-src").val(data.data.video);
            }
        },
        error: function () {
            alert("服务器请求失败")
        }
    })
}

//插入公告
function insertAnnouncement() {
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: rootPath + "/api/insertAnnouncement",
        dataType: "json",
        async: false,
        data: JSON.stringify({
            title: $("#edit-title").val(),
            createMemberScopeId: user.scopeId,
            createdMemberId: user.id,
            readCount: 0,
            content: $("#inputArea").html(),
            importance: $("#edit-imporance option:selected").val(),
            version: 1,
            status: 1
        }),
        success: function (data1) {
            if (data1.status === 200) {
                bootAlert("添加成功");
                $(".left>ul>li").eq(parseInt($(".right-main:nth-child(1)>input").val())).children().click()
            } else {
                bootAlert("添加失败");
            }
        },
        error: function () {
            bootAlert("服务器请求失败");
        }
    })
}

//更新公告
function updateAnnouncement(id) {
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: rootPath + "/api/updateAnnouncement",
        dataType: "json",
        async: false,
        data: JSON.stringify({
            id: id,
            importance: $("#edit-imporance").val(),
            title: $("#edit-title").val(),
            content: $("#inputArea").html(),
        }),
        success: function (data1) {
            if (data1.status === 200) {
                bootAlert("修改成功");
                $(".left>ul>li").eq(parseInt($(".right-main:nth-child(1)>input").val())).children().click()
            } else {
                bootAlert("修改失败");
            }
        },
        error: function () {
            bootAlert("服务器请求失败");
        }
    })
}

//删除公告
function deleteAnnouncement(id) {
    $.ajax({
        type: "POST",
        url: rootPath + "/api/deleteAnnouncement",
        dataType: "json",
        data: {
            id: id
        },
        success: function (data) {
            if (data.status === 200) {
                $(".left>ul>li").eq(parseInt($(".right-main:nth-child(1)>input").val())).children().click();
            }

        },
        error: function () {
            bootAlert("服务器请求失败");
        }
    })
}

//插入资讯
function insertZixun() {
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: rootPath + "/api/insertZixun",
        dataType: "json",
        async: false,
        data: JSON.stringify({
            createMemberScopeId: user.scopeId,
            title: $("#edit-title").val(),
            createdMemberId: user.id,
            readCount: 0,
            content: $("#inputArea").html(),
            attachment: $("#image-src").val(),
            version: 1,
            status: 1
        }),
        success: function (data1) {
            if (data1.status === 200) {
                bootAlert("添加成功");
                $(".left>ul>li").eq(parseInt($(".right-main:nth-child(1)>input").val())).children().click()
            } else {
                bootAlert("添加失败");
            }
        },
        error: function () {
            bootAlert("服务器请求失败");
        }
    })
}

//更新资讯
function updateZixun(id) {
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: rootPath + "/api/updateZixun",
        dataType: "json",
        async: false,
        data: JSON.stringify({
            id: id,
            title: $("#edit-title").val(),
            content: $("#inputArea").html(),
            attachment: $("#image-src").val(),
        }),
        success: function (data1) {
            if (data1.status === 200) {
                bootAlert("修改成功");
                $(".left>ul>li").eq(parseInt($(".right-main:nth-child(1)>input").val())).children().click()
            } else {
                bootAlert("修改失败");
            }
        },
        error: function () {
            bootAlert("服务器请求失败");
        }
    })
}

//删除资讯
function deleteZixun(id) {
    $.ajax({
        type: "POST",
        url: rootPath + "/api/deleteZixun",
        dataType: "json",
        data: {
            id: id
        },
        success: function (data) {
            if (data.status === 200) {
                $(".left>ul>li").eq(parseInt($(".right-main:nth-child(1)>input").val())).children().click();
            }

        },
        error: function () {
            bootAlert("服务器请求失败");
        }
    })
}

//插入宣教
function insertXuanjiao() {
    var pdf = $(".right-main:nth-child(2) .main-cover:nth-child(7) iframe").attr("src");
    if (pdf !== undefined) {
        pdf = pdf.replace(pdfPath, "")
    } else {
        pdf = "";
    }
    var pdfName = $(".right-main:nth-child(2) .main-cover:nth-child(7) iframe").next().next().attr("download");
    if (pdfName == undefined) {
        pdfName = "";
    }
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: rootPath + "/api/insertXuanjiao",
        dataType: "json",
        async: false,
        data: JSON.stringify({
            type: xjType,
            createMemberScopeId: user.scopeId,
            name: $("#edit-title").val(),
            content: $("#inputArea").html(),
            attachment: $("#image-src").val(),
            pdf: pdf,
            pdfName: pdfName,
            version: 1,
            status: 1
        }),
        success: function (data1) {
            if (data1.status === 200) {
                bootAlert("添加成功");
                $(".left>ul>li>ul>li").eq(parseInt($(".right-main:nth-child(1)>input").val()) - 2).children().click()
            } else {
                bootAlert("添加失败");
            }
        },
        error: function () {
            bootAlert("服务器请求失败");
        }
    })
}

function insretVideo() {
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: rootPath + "/api/insertXuanjiao",
        dataType: "json",
        async: false,
        data: JSON.stringify({
            type: xjType,
            createMemberScopeId: user.scopeId,
            name: $("#add-video-title").val(),
            attachment: $("#QCJY-img-src").val(),
            video: $("#video-src").val(),
            content: "",
            version: 1,
            status: 1
        }),
        success: function (data1) {
            if (data1.status === 200) {
                bootAlert("添加成功");
                $("#add-video-title").val("");
                $(".right-main:nth-child(5) .main-cover:nth-child(4)>div:nth-child(3)>video").remove();
                $(".right-main:nth-child(5) .main-cover:nth-child(4)>div:nth-child(3) input").val("");
                $(".right-main:nth-child(5) .main-cover:nth-child(4)>div:nth-child(3)>div:nth-child(3)").addClass("hidden");
                $(".right-main:nth-child(5) .main-cover:nth-child(4)>div:nth-child(3)>div:nth-child(4)").addClass("hidden");
                $(".right-main:nth-child(5) .main-cover:nth-child(5)>div:nth-child(3)>img").remove();
                $(".right-main:nth-child(5) .main-cover:nth-child(5)>div:nth-child(3) input").val("");
                $(".right-main:nth-child(5) .main-cover:nth-child(5) .deleteImg").css("display", "none");
                $(".right-main:nth-child(5) .main-cover:nth-child(5) .mask").addClass("hidden");
                $(".left>ul>li>ul>li").eq(parseInt($(".right-main:nth-child(1)>input").val()) - 2).children().click()
            } else {
                bootAlert("添加失败");
            }
        },
        error: function () {
            bootAlert("服务器请求失败");
        }
    })
}

//更新宣教
function updateXuanjiao(id) {
    var pdf = $(".right-main:nth-child(2) .main-cover:nth-child(7) iframe").attr("src");
    if (pdf !== undefined) {
        pdf = pdf.replace(pdfPath, "")
    } else {
        pdf = "";
    }
    var pdfName = $(".right-main:nth-child(2) .main-cover:nth-child(7) iframe").next().next().attr("download");
    if (pdfName == undefined) {
        pdfName = "";
    }
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: rootPath + "/api/updateXuanjiao",
        dataType: "json",
        async: false,
        data: JSON.stringify({
            id: id,
            name: $("#edit-title").val(),
            content: $("#inputArea").html(),
            attachment: $("#image-src").val(),
            pdf: pdf,
            pdfName: pdfName,
        }),
        success: function (data1) {
            if (data1.status === 200) {
                bootAlert("修改成功");
                $(".left>ul>li>ul>li").eq(parseInt($(".right-main:nth-child(1)>input").val()) - 2).children().click()
            } else {
                bootAlert("修改失败");
            }
        },
        error: function () {
            bootAlert("服务器请求失败");
        }
    })
}

function updateQCJY(id) {
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: rootPath + "/api/updateXuanjiao",
        dataType: "json",
        async: false,
        data: JSON.stringify({
            id: id,
            name: $("#add-video-title").val(),
            attachment: $("#QCJY-img-src").val(),
            video: $("#video-src").val(),
        }),
        success: function (data1) {
            if (data1.status === 200) {
                bootAlert("修改成功");
                $("#add-video-title").val("");
                $(".right-main:nth-child(5) .main-cover:nth-child(4)>div:nth-child(3)>video").remove();
                $(".right-main:nth-child(5) .main-cover:nth-child(4)>div:nth-child(3) input").val("");
                $(".right-main:nth-child(5) .main-cover:nth-child(4)>div:nth-child(3)>div:nth-child(3)").addClass("hidden");
                $(".right-main:nth-child(5) .main-cover:nth-child(4)>div:nth-child(3)>div:nth-child(4)").addClass("hidden");
                $(".right-main:nth-child(5) .main-cover:nth-child(5)>div:nth-child(3)>img").remove();
                $(".right-main:nth-child(5) .main-cover:nth-child(5)>div:nth-child(3) input").val("");
                $(".right-main:nth-child(5) .main-cover:nth-child(5) .deleteImg").css("display", "none");
                $(".right-main:nth-child(5) .main-cover:nth-child(5) .mask").addClass("hidden");
                $(".left>ul>li>ul>li").eq(parseInt($(".right-main:nth-child(1)>input").val()) - 2).children().click()
            } else {
                bootAlert("更新失败");
            }
        },
        error: function () {
            bootAlert("服务器请求失败");
        }
    })
}

//删除宣教
function deleteXuanjiao(id) {
    $.ajax({
        type: "POST",
        url: rootPath + "/api/deleteXuanjiao",
        dataType: "json",
        data: {
            id: id
        },
        success: function (data) {
            if (data.status === 200) {
                $(".left>ul>li>ul>li").eq(parseInt($(".right-main:nth-child(1)>input").val()) - 2).children().click()
                $("#video-" + id).parent().parent().parent().remove();
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

function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;

}

function getObjectURL(file) {
    var url = null;
    if (window.createObjectURL != undefined) {
        url = window.createObjectURL(file);
    } else if (window.URL != undefined) {
        url = window.URL.createObjectURL(file);
    } else if (window.webkitURL != undefined) {
        url = window.webkitURL.createObjectURL(file);
    }
    return url;
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

//首页详情跳转
function indexToRead() {
    if (localStorage.getItem("readPage") !== null) {
        if (localStorage.getItem("readPage") === "gg") {
            $(".right-main:nth-child(1)>input").val(0);
            $(".left>ul>li").eq(parseInt($(".right-main:nth-child(1)>input").val())).children().click();
            localStorage.removeItem("readPage");
        } else if (localStorage.getItem("readPage") === "zx") {
            $(".right-main:nth-child(1)>input").val(1);
            $(".left>ul>li").eq(parseInt($(".right-main:nth-child(1)>input").val())).children().click();
            localStorage.removeItem("readPage");
        } else if (localStorage.getItem("readPage") === "qc") {
            $(".left>ul>li:nth-child(3) a").click();
            $(".left>ul>li:nth-child(3)>ul>li:nth-child(1) a").click();
            localStorage.removeItem("readPage");
        } else if (localStorage.getItem("readPage").indexOf("gg") !== -1) {
            $(".right-main:nth-child(1)>input").val(0);
            $(".left>ul>li").eq(parseInt($(".right-main:nth-child(1)>input").val())).children().click();
            ToAnnouncementReadPage(localStorage.getItem("readPage").replace("gg", ""));
            localStorage.removeItem("readPage");
        } else if (localStorage.getItem("readPage").indexOf("zx") !== -1) {
            $(".right-main:nth-child(1)>input").val(1);
            $(".left>ul>li").eq(parseInt($(".right-main:nth-child(1)>input").val())).children().click();
            ToZixunReadPage(localStorage.getItem("readPage").replace("zx", ""));
            localStorage.removeItem("readPage");
        } else if (localStorage.getItem("readPage").indexOf("zd") !== -1) {
            $(".right-main:nth-child(1)>input").val(2);
            $(".left>ul>li").eq(parseInt("2")).children().click();
            $(".right-main:nth-child(1)>input").val(1);
            $(".left>ul>li>ul>li").eq(parseInt($(".right-main:nth-child(1)>input").val()) - 1).children().click()
            $(".right-main:nth-child(1)>input").val(2);
            $(".left>ul>li>ul>li").eq(parseInt($(".right-main:nth-child(1)>input").val()) - 1).children().click()
            ToXuanjiaoReadPage(localStorage.getItem("readPage").replace("zd", ""));
            localStorage.removeItem("readPage");
        } else if (localStorage.getItem("readPage").indexOf("zc") !== -1) {
            $(".right-main:nth-child(1)>input").val(2);
            $(".left>ul>li").eq(parseInt("2")).children().click();
            $(".right-main:nth-child(1)>input").val(1);
            $(".left>ul>li>ul>li").eq(parseInt($(".right-main:nth-child(1)>input").val()) - 1).children().click()
            $(".right-main:nth-child(1)>input").val(3);
            $(".left>ul>li>ul>li").eq(parseInt($(".right-main:nth-child(1)>input").val()) - 1).children().click()
            ToXuanjiaoReadPage(localStorage.getItem("readPage").replace("zc", ""));
            localStorage.removeItem("readPage");
        } else if (localStorage.getItem("readPage").indexOf("ys") !== -1) {
            $(".right-main:nth-child(1)>input").val(2);
            $(".left>ul>li").eq(parseInt("2")).children().click();
            $(".right-main:nth-child(1)>input").val(1);
            $(".left>ul>li>ul>li").eq(parseInt($(".right-main:nth-child(1)>input").val()) - 1).children().click()
            $(".right-main:nth-child(1)>input").val(4);
            $(".left>ul>li>ul>li").eq(parseInt($(".right-main:nth-child(1)>input").val()) - 1).children().click()
            ToXuanjiaoReadPage(localStorage.getItem("readPage").replace("ys", ""));
            localStorage.removeItem("readPage");
        } else if (localStorage.getItem("readPage").indexOf("qc") !== -1) {
            $(".left>ul>li:nth-child(3) a").click();
            $(".left>ul>li:nth-child(3)>ul>li:nth-child(1) a").click();
            localStorage.removeItem("readPage");
        }
    }
}