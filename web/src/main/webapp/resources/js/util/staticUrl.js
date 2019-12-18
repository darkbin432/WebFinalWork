/**
 * Created by ckl on 2017/6/10.
 */
// 基础路由
var localObj = window.location;
var contextPath = localObj.pathname.split("/")[1];
var basePath = localObj.protocol + "//" + localObj.host + "/";
var server_context = basePath;
var rootPath = basePath + contextPath;

var imgPath=basePath+"hzjsResource/images/";
var videoPath=basePath+"hzjsResource/videos/";
var mailAttachmentPath=basePath+"hzjsResource/mail-attachments/";
var pdfPath=basePath+"hzjsResource/pdfs/";
var excelPath=basePath+"hzjsResource/excels/";
var taskPath=basePath+"hzjsResource/tasks/";


var imgBitmap=rootPath+"/resources/icon/1-tupianzhanweitu.png";
var videoBitmap=rootPath+"/resources/icon/2-shipingzhanweitu.png";
var headBitmap=rootPath+"/resources/icon/3-touxiangzhanweitu.png";

var baseImgPath = rootPath+"/resources/icon/1-tupianzhanweitu.png";
