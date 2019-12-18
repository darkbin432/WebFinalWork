/**
 * Created by ckl on 2017/6/10.
 */
// 基础路由
var localObj = window.location;
var contextPath = localObj.pathname.split("/")[1];
var basePath = localObj.protocol + "//" + localObj.host + "/";
var server_context = basePath;
var rootPath = basePath + contextPath;

var imgPath=basePath+"webFinalResource/images/";
var videoPath=basePath+"webFinalResource/videos/";
var mailAttachmentPath=basePath+"webFinalResource/mail-attachments/";
var pdfPath=basePath+"webFinalResource/pdfs/";
var excelPath=basePath+"webFinalResource/excels/";
var taskPath=basePath+"webFinalResource/tasks/";


var imgBitmap=rootPath+"/resources/icon/1-tupianzhanweitu.png";
var videoBitmap=rootPath+"/resources/icon/2-shipingzhanweitu.png";
var headBitmap=rootPath+"/resources/icon/3-touxiangzhanweitu.png";

var baseImgPath = rootPath+"/resources/icon/1-tupianzhanweitu.png";
