package com.hele.hzjs.api;

import com.hele.hzjs.ApplicationController;
import com.hele.hzjs.model.result.ApiResult;
import com.hele.hzjs.service.tool.FileService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;

@Controller
@RequestMapping("api/file")
public class FileController extends ApplicationController {

    @Resource
    private FileService fileService;
    /**
     * 上传图片和视频-韩冰
     */
    @RequestMapping(value = "fileUpload")
    @ResponseBody
    public ApiResult fileUpload(@RequestParam("fileType") String funcName,
                                @RequestParam("file_data") MultipartFile multipartFile) {
        ApiResult apiResult = fileService.fileUpload2(funcName, multipartFile);
        return apiResult;
    }
}

