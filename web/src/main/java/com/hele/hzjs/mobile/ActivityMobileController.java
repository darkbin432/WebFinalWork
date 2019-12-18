package com.hele.hzjs.mobile;


import com.hele.hzjs.model.HuiyuanActivity;
import com.hele.hzjs.model.VolunteerApprovalRecord;
import com.hele.hzjs.model.param.ActivityParam;
import com.hele.hzjs.model.report.FamilyHelpRecord;
import com.hele.hzjs.model.result.ApiResult;
import com.hele.hzjs.service.IActivityService;
import com.hele.hzjs.service.IFamilyHelpRecordService;
import com.hele.hzjs.service.IHuiyuanService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

/**
 * @author hanbing
 */
@Controller
@RequestMapping("m/activity")
public class ActivityMobileController {
    @Resource
    private IActivityService activityService;

    @Resource
    private IHuiyuanService huiyuanService;

    @Resource
    private IFamilyHelpRecordService familyHelpRecordService;

    @RequestMapping(value = "/getList", method = RequestMethod.POST)
    @ResponseBody
    public ApiResult getListByHuiyuan(@RequestBody ActivityParam activityParam) {
        return activityService.getListByHuiyuan(activityParam);
    }

    @RequestMapping(value = "/get", method = RequestMethod.POST)
    @ResponseBody
    public ApiResult getByHuiyuan(@RequestBody ActivityParam activityParam) {
        return activityService.getByHuiyuan(activityParam);
    }

    @RequestMapping(value = "/sign", method = RequestMethod.POST)
    @ResponseBody
    public ApiResult sign(@RequestBody HuiyuanActivity huiyuanActivity) {
        return activityService.sign(huiyuanActivity);
    }

    @RequestMapping(value = "/cancel", method = RequestMethod.POST)
    @ResponseBody
    public ApiResult cancel(@RequestBody HuiyuanActivity huiyuanActivity) {
        return activityService.cancel(huiyuanActivity);
    }

    @RequestMapping(value = "/attend", method = RequestMethod.POST)
    @ResponseBody
    public ApiResult attend(@RequestBody HuiyuanActivity huiyuanActivity) {
        return activityService.attend(huiyuanActivity);
    }

    @RequestMapping(value = "/recordList", method = RequestMethod.POST)
    @ResponseBody
    public ApiResult recordList(@RequestBody ActivityParam activityParam) {
        return activityService.getRecordList(activityParam);
    }

    @RequestMapping(value = "/applyVolunteer", method = RequestMethod.POST)
    @ResponseBody
    public ApiResult applyVolunteer(@RequestBody VolunteerApprovalRecord volunteerApprovalRecord) {
        return huiyuanService.insertVolunteerRecord(volunteerApprovalRecord);
    }

    @RequestMapping(value = "/addFs", method = RequestMethod.POST)
    @ResponseBody
    public ApiResult addFs(@RequestBody FamilyHelpRecord record) {
        return familyHelpRecordService.insertRecord(record);
    }

}
