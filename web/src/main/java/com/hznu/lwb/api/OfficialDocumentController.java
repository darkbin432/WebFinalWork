package com.hznu.lwb.api;

import com.hznu.lwb.model.OfficialDocument;
import com.hznu.lwb.model.param.OfficialDocumentParam;
import com.hznu.lwb.model.result.ApiResult;
import com.hznu.lwb.service.IOfficialDocumentService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;

@Controller
@RequestMapping("/api")
public class OfficialDocumentController {

    @Resource
    private IOfficialDocumentService officialDocumentService;

    @RequestMapping(value = "/insertOfficialDocument",method = RequestMethod.POST)
    @ResponseBody
    public ApiResult insertOfficialDocument(OfficialDocument record){
        ApiResult apiResult = officialDocumentService.insert(record);
        return apiResult;
    }

    @RequestMapping(value = "/updateOfficialDocument",method = RequestMethod.POST)
    @ResponseBody
    public ApiResult updateOfficialDocument(OfficialDocument record){
        ApiResult apiResult = officialDocumentService.update(record);
        return apiResult;
    }

    @RequestMapping(value = "/deleteOfficialDocument",method = RequestMethod.POST)
    @ResponseBody
    public ApiResult deleteOfficialDocument(Integer id){
        ApiResult apiResult = officialDocumentService.delete(id);
        return apiResult;
    }

    @RequestMapping(value = "/selectOneOfficialDocument",method = RequestMethod.GET)
    @ResponseBody
    public ApiResult selectOneOfficialDocument(Integer id){
        ApiResult apiResult = officialDocumentService.selectOne(id);
        return apiResult;
    }

    @RequestMapping(value = "/selectAllOfficialDocument",method = RequestMethod.GET)
    @ResponseBody
    public ApiResult selectAllOfficialDocument(String aoData, OfficialDocumentParam param){
        ApiResult apiResult = officialDocumentService.selectByCondition(aoData, param);
        return apiResult;
    }

}
