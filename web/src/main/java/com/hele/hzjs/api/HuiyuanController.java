package com.hele.hzjs.api;

import com.hele.hzjs.model.Huiyuan;
import com.hele.hzjs.model.VolunteerApprovalRecord;
import com.hele.hzjs.model.param.HuiyuanParam;
import com.hele.hzjs.model.result.ApiResult;
import com.hele.hzjs.service.IHuiyuanService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;

@Controller
@RequestMapping("/api")
public class HuiyuanController {

    @Resource
    private IHuiyuanService huiyuanService;

    @RequestMapping(value = "/insertHuiyuan",method = RequestMethod.POST)
    @ResponseBody
    public ApiResult insertHuiyuan(Huiyuan huiyuan){
        ApiResult apiResult =huiyuanService.insertHuiyuan(huiyuan);
        return apiResult;
    }

    @RequestMapping(value = "/deleteHuiyuan",method = RequestMethod.POST)
    @ResponseBody
    public ApiResult deleteHuiyuan(Integer id){
        ApiResult apiResult = huiyuanService.deleteHuiyuan(id);
        return apiResult;
    }

    @RequestMapping(value = "/updateHuiyuan",method = RequestMethod.POST)
    @ResponseBody
    public ApiResult updateHuiyuan(Huiyuan huiyuan){
        ApiResult apiResult = huiyuanService.updateHuiyuan(huiyuan);
        return apiResult;
    }

    @RequestMapping(value = "/selectHuiyuan",method = RequestMethod.POST)
    @ResponseBody
    public ApiResult selectHuiyuan(HuiyuanParam huiyuanParam){
        ApiResult apiResult = huiyuanService.selectHuiyuan(huiyuanParam);
        return apiResult;
    }

    @RequestMapping(value = "/selectAllHuiyuan",method = RequestMethod.GET)
    @ResponseBody
    public ApiResult selectAllHuiyuan(String aoData,HuiyuanParam huiyuanParam){
        return huiyuanService.selectAllHuiyuan(aoData,huiyuanParam);
    }

    @RequestMapping(value = "/getHuiyuan",method = RequestMethod.POST)
    @ResponseBody
    public ApiResult getHuiyuan(Huiyuan huiyuan){
        ApiResult apiResult = huiyuanService.getHuiyuan(huiyuan);
        return apiResult;
    }

    @RequestMapping(value = "/approvalVolunteer",method = RequestMethod.POST)
    @ResponseBody
    public ApiResult approvalVolunteer(Huiyuan huiyuan){
        ApiResult apiResult = huiyuanService.updateHuiyuan(huiyuan);
        return apiResult;
    }

    @RequestMapping(value = "/getActivitiesByHuiyuan" ,method = RequestMethod.POST)
    @ResponseBody
    public ApiResult getActivities(String aoData, HuiyuanParam huiyuanParam){
        ApiResult apiResult = huiyuanService.getActivities(aoData,huiyuanParam);
        return apiResult;
    }

    @RequestMapping(value = "/insertVolunteerRecord",method = RequestMethod.POST)
    @ResponseBody
    public ApiResult insertVolunteerRecord(VolunteerApprovalRecord record){
        ApiResult apiResult = huiyuanService.insertVolunteerRecord(record);
        return apiResult;
    }

    @RequestMapping(value = "/updateVolunteerRecord",method = RequestMethod.POST)
    @ResponseBody
    public ApiResult updateVolunteerRecord(VolunteerApprovalRecord record){
        ApiResult apiResult = huiyuanService.updateVolunteerRecord(record);
        return apiResult;
    }

    @RequestMapping(value = "/getVolunteerApprovalRecord",method = RequestMethod.GET)
    @ResponseBody
    public ApiResult getVolunteerApprovalRecord(String aoData, HuiyuanParam huiyuanParam){
        ApiResult apiResult = huiyuanService.getVolunteerApprovalRecord(aoData,huiyuanParam);
        return apiResult;
    }

}
