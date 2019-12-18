/**
 * 扩展 fileinput 方法
 */
//显示错误信息
function showError(msg){
	var innerHTML = '<ul><li data-file-id="preview-1-0">' + msg + '</li></ul>';
	$(".kv-fileinput-error.file-error-message").html(innerHTML);
	$(".kv-fileinput-error.file-error-message").fadeIn(800);
}

//初始显示多张图片
//function initArrayPreview(array){
//	for(var i=0;i<array.length;i++){
//		initPreview(array[i], false);
//    }
//}
//初始显示单张图片
function initPreview(src, one, dom){
	if(src){
		var innerHTML = '<div class="file-live-thumbs"><div class="file-preview-frame file-preview-initial" id="preview-1-init_0" data-fileindex="init_0" data-template="image"><div class="kv-file-content">'
			+ '<img style="width:200px" src="' + src + '" class="file-preview-image">'
			+ '</div></div></div>';

		if(!dom) 
			dom = "";
		else 
			dom = dom + " ";
		
		$(dom + ".file-drop-zone-title").addClass("hide");
		
		if(one === false){
			$(dom + ".file-preview-thumbnails").append(innerHTML);
		}else{
			$(dom + ".file-preview-thumbnails").html(innerHTML);
		}
	}
}

function clearPreview(){
	$(".fileinput-remove-button").click()
}

