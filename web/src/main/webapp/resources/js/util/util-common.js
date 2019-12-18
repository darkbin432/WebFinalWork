/**
 * Created by cmj on 2017/4/10.
 */

jQuery(function ($) {

        Date.prototype.format = function (format) {
            var o = {
                "M+": this.getMonth() + 1, //month
                "d+": this.getDate(), //day
                "h+": this.getHours(), //hour
                "m+": this.getMinutes(), //minute
                "s+": this.getSeconds(), //second
                "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
                "S": this.getMilliseconds() //millisecond
            }

            if (/(y+)/i.test(format)) {
                format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
            }

            for (var k in o) {
                if (new RegExp("(" + k + ")").test(format)) {
                    format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
                }
            }
            return format;
        }


        $.fn.extend({
            //表单加载json对象数据
            setForm: function (jsonValue) {
                var obj = this;
                $.each(jsonValue, function (name, ival) {
                    var $oinput = obj.find("input[name=" + name + "]");
                    if ($oinput.attr("type") == "checkbox") {
                        if (ival !== null) {
                            var checkboxObj = $("[name=" + name + "]");
                            var checkArray = ival.split(";");
                            for (var i = 0; i < checkboxObj.length; i++) {
                                for (var j = 0; j < checkArray.length; j++) {
                                    if (checkboxObj[i].value == checkArray[j]) {
                                        checkboxObj[i].click();
                                    }
                                }
                            }
                        }
                    }
                    else if ($oinput.attr("type") == "radio") {
                        $oinput.each(function () {
                            var radioObj = $("[name=" + name + "]");
                            for (var i = 0; i < radioObj.length; i++) {
                                if (radioObj[i].value == ival) {
                                    radioObj[i].click();
                                }
                            }
                        });
                    }
                    else if ($oinput.attr("type") == "textarea") {
                        obj.find("[name=" + name + "]").html(ival);
                    }
                    else {
                        obj.find("[name=" + name + "]").val(ival);
                    }
                })

            }
        });


    }
)

function loadingData(seletor) {
    if (!seletor) {
        seletor = "table";
    }
    loading(seletor + " tbody");
}

function loadingModalData(seletor) {
    if (!seletor) {
        seletor = ".modal-content";
    }
    loading(seletor + " .modal-content");
}

function loadingFormData(seletor) {
    loading(seletor);
}

function loading(seletor) {
    $(seletor).append('<div class="message-loading-overlay loadingClass"><i class="fa-spin ace-icon fa fa-spinner hele-blue bigger-300"></i></div>');
}

function dismiss() {
    $('.loadingClass').remove('.loadingClass');
}


// --- ckl-common start ---
// CKL DataTable的初始化


/**
 * dataTable删除响应事件
 * @param url
 * @param msg
 * @param dataTableObj
 */
function deleteRow(url, msg, dataTableObj) {
    Confirm.show('确认删除!', msg, {
        '是': {
            'primary': true,
            'callback': function () {
                Confirm.hide();
                $.ajax({
                    type: "DELETE",
                    url: server_context + url,
                    dataType: 'json',
                    success: function (data) {
                        alertM(data.msg);
                        if (data.status == 200) {
                            dataTableObj.ajax.reload();
                        }
                    },
                });
            }
        }
    });
}

function validate(frm, url, table) {
    var submitForm;
    //改变form提交路径
    $(frm).attr("action", server_context + contextPath + url);
    jQuery.validator.addMethod("isMobile", function (value, element) {
        var length = value.length;
        var mobile = /^(13[0-9]{9})|(18[0-9]{9})|(14[0-9]{9})|(17[0-9]{9})|(15[0-9]{9})$/;
        return this.optional(element) || (length == 11 && mobile.test(value));
    }, "请正确填写您的手机号码");
    jQuery.validator.addMethod("isPhone", function (value, element) {
        var length = value.length;
        var phone = /^\d{3}-\d{8}|\d{4}-\d{7}$/;
        return this.optional(element) || (length == 12 && phone.test(value));
    }, "请正确填写您的电话号码");
    jQuery.validator.addMethod("isFax", function (value, element) {
        var length = value.length;
        var fax = /^\d{3}-\d{8}|\d{4}-\d{7}$/;
        return this.optional(element) || (length == 12 && fax.test(value));
    }, "请正确填写您的传真号码");
    jQuery.validator.addMethod("isId", function (value, element) {
        var length = value.length;
        var id = /^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/;
        return this.optional(element) || (id.test(value));
    }, "请正确填写您的身份证号码");
    jQuery.validator.addMethod("keepDecimal", function (value, element) {
        var num = /^\d+\.?\d{0,2}$/;
        return this.optional(element) || (num.test(value));
    }, "最多保留两位小数");
    jQuery.validator.addMethod("doctorIsExist", function (value, element) {
        var result = false;
        $.ajax({
            type: "get",
            url: server_context + "/appUserManage/doctor/checkDoctor?timestamp=" + new Date().getTime() + "&mobile=" + value + "&huanxinId=" + $("#checkHuanxinId").val(),
            async: false,
            success: function (data) {
                result = data;
            }
        });
        return result;
    }, "改手机号已经注册为医生");
    var validateForm = $(frm).validate({
        rules: {
            title: "required",
            name: "required",
            content: "required",
            mobile: {
                required: true,
                isMobile: true,
                doctorIsExist: true
            },
            password: "required",
            enrollStart: "required",
        },
        messages: {
            hospitalLevel: "请选择医院水平"
        },
        ignore: ".ignore",
        errorPlacement: function (error, element) {
            //error.appendTo(element.parent());
            error.insertAfter(element);
        },
        submitHandler: function (frm) {
            $(frm).find("button[type='submit']").attr("disabled", true);
            submitForm = $(frm).ajaxSubmit({
                type: "post",
                dataType: "json",
                cache: false,
                success: function (data) {
                    if (data.status == 200) {
                        console.log(data);
                        alertM(data.msg);
                        //$("#dialog-message").dialog('close');
                        $('#myModal').addClass("hide");
                        window.location.reload();
                    } else {
                        alertM(data.msg);
                        //window.location.reload();
                    }
                },
                error: function (data) {
                    alertM("发送错误！")
                },
                complete: function (data) {
                    $(frm).find("button[type='submit']").removeAttr("disabled");
                }
            });
        }
    });
}

function alertM(msg, callFun) {
    bootbox.dialog({
        message: msg,
        buttons: {
            confirm: {
                label: "确定",
                className: "",
                callback: function () {
                    if (callFun)
                        callFun();
                }
            },
        },
    });
}

var urlEncode = function (param, key, encode) {
    if (param == null) return '';
    var paramStr = '';
    var t = typeof (param);
    if (t == 'string' || t == 'number' || t == 'boolean') {
        paramStr += '&' + key + '=' + ((encode == null || encode) ? encodeURIComponent(param) : param);
    } else {
        for (var i in param) {
            var k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i);
            paramStr += urlEncode(param[i], k, encode);
        }
    }
    return paramStr;
};

function ajaxLoginTimeout(data) {
    if (data.status == 300) {
        alertM(data.msg, function () {
            window.location.reload(true);
        });
        return false;
    }
    return true;
}

/**
 * 获取url参数
 * @param name 参数key
 * @returns 参数值
 */
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return "";
}

function loading(seletor) {
    $(seletor).append('<div class="message-loading-overlay loadingClass"><i class="fa-spin ace-icon fa fa-spinner ckl-blue bigger-300"></i></div>');
}

function dismiss() {
    $('.loadingClass').remove('.loadingClass');
}

/**
 * 随机返回一种颜色
 * @returns {string}
 */
function getColor() {
    var c = ['#993333', '#CC6600', '#339999', '#CC66CC', '#99CCCC', '#9966FF'];
    return c[parseInt(Math.random() * (5 + 1), 10)];
}

/**
 * 返回字符串最后一个字符
 * @param word
 * @returns {string}
 */
function getLastW(word) {
    if (word != undefined)
        return word.charAt(word.length - 1);
    else
        return '';
};

// 添加数组获取下标
Array.prototype.indexOf = function (val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == val) return i;
    }
    return -1;
};
// 添加数组删除元素
Array.prototype.remove = function (val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};

/**
 * 翻译
 * @param str
 * @returns {*}
 */
function fileSizeToKB(str) {
    if ((str + "").indexOf("B") > 0) {
        str = parseFloat(str.replace("B", ""));
    } else if ((str + "").indexOf("K") > 0) {
        str = parseFloat(str.replace("K", "")) * 1024;
    } else if ((str + "").indexOf("K") > 0) {
        str = parseFloat(str.replace("K", "")) * 1024;
    } else if ((str + "").indexOf("M") > 0) {
        str = parseFloat(str.replace("M", "")) * 1048576;
    } else if ((str + "").indexOf("G") > 0) {
        str = parseFloat(str.replace("G", "")) * 1073741824;
    }
    return parseInt(str);
}

function getFileType(FileName) {
    var index1 = FileName.lastIndexOf(".");
    var index2 = FileName.length;
    return FileName.substring(index1 + 1, index2);//后缀名
}

function getDropzoneType(FileName) {
    var fileT = getFileType(FileName).toLowerCase()
    var res = "";
    switch (fileT) {
        case "jpg":
        case "jpeg":
        case "png":
            res = "image/"+fileT;
            break;
        default:
            res = "application/"+fileT;
            break;
    }
    return res;
}

// 设置bootbox中文翻译
bootbox.setDefaults("locale", "zh_CN");

var DropzoneInit = {
    image: {
        url: server_context + contextPath + '/file/upload2',// 上传接口
        maxFiles: 9,
        maxFilesize: 512,
        paramName: "files",
        addRemoveLinks: "true",
        acceptedFiles: '.jpg,.png,.jpeg',
        dictRemoveFile: "删除图片",
        dictCancelUpload: "取消上传",
        dictMaxFilesExceeded: "您最多只能上传9张图片！",
        dictResponseError: '文件上传失败!',
        dictInvalidFileType: "图片类型只能是*.jpg;*.png;*.jpeg。",
        dictFallbackMessage: "浏览器不受支持",
        dictFileTooBig: "文件过大上传文件最大支持.",
        params: {},
        init: function () {
            this.on("success", function (file) {
                //上传完成后触发的方法
                if (file.status == 'success') {
                    var json = JSON.parse(file.xhr.response);
                    if (json.status == 200) {
                        images.push(json.data);
                    }
                }
                // console.log(file);
            });
            this.on("removedfile", function (file) {
                //删除文件时触发的方法
                if (file.status == 'success') {
                    var json = JSON.parse(file.xhr.response);
                    if (json.status == 200) {
                        for (var fileName in json.data) {
                            images.remove(fileName);
                            // delete imageSize[fileName];
                        }
                    }
                } else if (file.status == 'added') {
                    images.remove(file.name);
                    // delete imageSize[file.name];
                }
                this.setupEventListeners();
                // console.log(file);
            });
            this.on('maxfilesreached', function () {
                this.removeEventListeners();
            });
        }
    },
    file: {
        url: server_context + '/api/common/uploadFile',
        maxFiles: 9,
        paramName: "files",
        addRemoveLinks: "true",
        acceptedFiles: '.doc,.pdf,.docx,.xls,.xlsx,.ppt,.ppts,.rar,.zip',
        dictRemoveFile: "删除文件",
        dictCancelUpload: "取消上传",
        dictMaxFilesExceeded: "您最多只能上传9个文件！",
        dictResponseError: '文件上传失败!',
        dictInvalidFileType: "文件类型只能是*.doc,*.pdf,*.docx,*.xls,*.xlsx,*.ppt,*.ppts,*.rar,*.zip。",
        dictFallbackMessage: "浏览器不受支持",
        dictFileTooBig: "文件过大上传文件最大支持.",
        params: {},
        init: function () {
            this.on("success", function (file) {
                //上传完成后触发的方法
                if (file.status == 'success') {
                    var json = JSON.parse(file.xhr.response);
                    if (json.status == 200) {
                        for (var fileName in json.data) {
                            files.push(fileName);
                            fileSize[fileName] = json.data[fileName];
                        }
                    }
                }
                console.log(file);
            });
            this.on("removedfile", function (file) {
                //删除文件时触发的方法
                if (file.status == 'success') {
                    var json = JSON.parse(file.xhr.response);
                    if (json.status == 200) {
                        for (var fileName in json.data) {
                            files.remove(fileName);
                            delete fileSize[fileName];
                        }
                    }
                } else if (file.status == 'added') {
                    files.remove(file.name);
                    delete fileSize[file.name];
                }
                console.log(file);
            });
        }
    }
}
// --- ckl-common end ---

// 获取form数据json
function serializeFormData(formid) {
    var result = {};
    var data = $(formid).serializeArray();
    for (var i = 0; i < data.length; i++) {
        result[data[i].name] = data[i].value;
    }
    return result;
}

// 获取form数据json
function jsonStrFormData(formid) {
    return JSON.stringify(serializeFormData(formid));
}
