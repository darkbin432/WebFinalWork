/**
 * @author 斌
 */

jQuery(
    function ($) {
        var editId = localStorage.getItem("editId");

        if (editId == null){
            $(".btn2").css("display", "none");
        }

        function getContent() {
            if (editId == null) {
                return ;
            }
            $.ajax({
                type: "POST",
                url: rootPath + "/api/selectOneNews",
                dataType: "json",
                data: {
                    id: editId
                },
                success: function (response) {
                    if (response.status === 200) {
                        $("#titleText").val(response.data.title);
                        $(".type-select").val(response.data.type);
                        $("#sourceText").val(response.data.source);
                        $("#authorText").val(response.data.author);
                        $("#contentText").html(response.data.content);
                    }
                },
                error: function () {

                }
            })
        }

        getContent();

        $("#saveEdit").click(function () {
            if (editId == null){
                $.ajax({
                    type: "POST",
                    url: rootPath + "/api/insertNews",
                    dataType: "json",
                    data: {
                        title: $("#titleText").val(),
                        type: $(".type-select").val(),
                        source: $("#sourceText").val(),
                        author: $("#authorText").val(),
                        content: $("#contentText").html()
                    },
                    success: function (response) {
                        if (response.status === 200) {
                            bootbox.alert({
                                message: "添加成功",
                                buttons: {
                                    ok: {
                                        label: '确认',
                                    }
                                },
                                callback: function () {
                                    window.location=rootPath + "/manage/index";
                                }
                            });

                        }
                    },
                    error: function () {

                    }
                })
            }else{
                $.ajax({
                    type: "POST",
                    url: rootPath + "/api/updateNews",
                    dataType: "json",
                    data: {
                        id: editId,
                        title: $("#titleText").val(),
                        type: $(".type-select").val(),
                        source: $("#sourceText").val(),
                        author: $("#authorText").val(),
                        content: $("#contentText").html()
                    },
                    success: function (response) {
                        if (response.status === 200) {
                            bootbox.alert({
                                message: "保存成功",
                                buttons: {
                                    ok: {
                                        label: '确认',
                                    }
                                },
                                callback: function () {
                                    window.location=rootPath + "/manage/index";
                                }
                            });

                        }
                    },
                    error: function () {

                    }
                })
            }

        })

        $("#editToDelete").click(function () {
            $.ajax({
                type: "POST",
                url: rootPath + "/api/deleteNews",
                dataType: "json",
                data: {
                    id: editId
                },
                success: function (response) {
                    if (response.status === 200) {
                        window.location=rootPath + "/manage/index";
                    }
                },
                error: function () {

                }
            })
        })

        $("#editToPublish").click(function () {
            $.ajax({
                type: "POST",
                url: rootPath + "/api/publishNews",
                dataType: "json",
                data: {
                    id: editId
                },
                success: function (response) {
                    if (response.status === 200) {
                        window.location=rootPath + "/manage/index";
                    }
                },
                error: function () {

                }
            })
        })

        $("#addCover").on('click', 'img', function () {
            $(this).remove();
        })
        
        $("#headPic>div>img").click(function () {
            $("#headPic>label>input").click();
        })

        $("#headPic>label>input").change(function () {
            var allowType = ["jpg","png","jpeg"];
            var name = $(this)[0].files[0].name;
            var fileType = name.split('.').pop();
            if (allowType.indexOf(fileType.toLowerCase()) === -1) {
                bootAlert("请上传以.png、.jpeg、.jpg结尾文件");
                $("#headPic>label>input").val('')
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
                xhr: xhrOnProgress(function (e) {

                }),
                success: function (data) {
                    if (data.status == 200) {
                        $("#addCover").html('<img class="pic" src="' + imgPath + data.data.fileName + '">')
                        $("#image-src").val(data.data.fileName);
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

        $("#addCover1").on('click', '.deletePdf', function () {
            $("#addCover1").html("");
        })

        $("#fujian>div>img").click(function () {
            $("#fujian>label>input").click();
        })

        $("#fujian>label>input").change(function () {
            var allowType = ["pdf"];
            var name = $(this)[0].files[0].name;
            var fileType = name.split('.').pop();
            if (allowType.indexOf(fileType.toLowerCase()) === -1) {
                bootAlert("请上传pdf格式文件");
                $("#fujian>label>input").val('')
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
                        $("#addCover1").html('<iframe src="' + pdfPath + data.data.fileName + '"></iframe>\n' +
                            '                        <a target="_blank" href="' + pdfPath + data.data.fileName + '">预览</a>\n' +
                            '                        <a target="_blank" download="' + name + '" href="' + pdfPath + data.data.fileName + '">下载</a>\n' +
                            '                        <a target="_blank" class="deletePdf">删除</a>');
                        $("#fujian-src").val(data.data.fileName);
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

    }
);

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
