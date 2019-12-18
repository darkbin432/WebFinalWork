package com.hznu.lwb.api;


import com.hznu.lwb.model.Activity;
import com.hznu.lwb.model.ActivityApprovalRecord;
import com.hznu.lwb.model.HuiyuanActivity;
import com.hznu.lwb.model.VolunteerApprovalRecord;
import com.hznu.lwb.model.param.ActivityParam;
import com.hznu.lwb.model.param.ApprovalParam;
import com.hznu.lwb.model.param.HuiyuanActivityParam;
import com.hznu.lwb.model.param.HuiyuanParam;
import com.hznu.lwb.model.result.ApiResult;
import com.hznu.lwb.service.IActivityService;
import com.hznu.lwb.service.IOrganizationMemberService;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

@Controller
@RequestMapping("/api")
public class ActivityController {
    @Resource
    private IActivityService activityService;

    @Resource
    private IOrganizationMemberService organizationMemberService;

//    @RequestMapping(value = "/getActivities", method = RequestMethod.GET)
//    @ResponseBody
//    private ApiResult getActivities(@RequestParam("title")String title, @RequestParam("scopeId")Integer scopeId, @RequestParam("startTime")String startTime,
//                                    @RequestParam("pageNow") Integer pageNow, @RequestParam("startProjectId") Integer startProjectId, @RequestParam("endProjectId") Integer endProjectId){
//        return activityService.selectByPage(title, scopeId, startTime, pageNow, startProjectId, endProjectId);
//    }

    @RequestMapping(value = "/getActivity", method = RequestMethod.GET)
    @ResponseBody
    private ApiResult getActivity(@RequestParam("id") Integer id) {
        return activityService.getOne(id);
    }

    @RequestMapping(value = "/insertActivity", method = RequestMethod.POST)
    @ResponseBody
    private ApiResult insertActivity(@RequestBody Activity activity) {
        return activityService.insert(activity);
    }

    @RequestMapping(value = "/deleteActivity", method = RequestMethod.POST)
    @ResponseBody
    private ApiResult deleteActivity(@RequestParam("id") Integer id) {
        return activityService.delete(id);
    }

    @RequestMapping(value = "/updateActivity", method = RequestMethod.POST)
    @ResponseBody
    private ApiResult updateActivity(@RequestBody Activity activity) {
        return activityService.update(activity);
    }

    @RequestMapping(value = "/getAcitvityVolunteer", method = RequestMethod.GET)
    @ResponseBody
    private ApiResult getAcitvityVolunteer(String aoData, HuiyuanActivityParam huiyuanActivityParam) {
        return activityService.getAcitvityVounteer(aoData, huiyuanActivityParam);
    }

    @RequestMapping(value = "/updateActivityVolunteer", method = RequestMethod.POST)
    @ResponseBody
    private ApiResult updateActivityVolunteer(@RequestParam("huiyuanId") Integer huiyuanId, @RequestParam("activityId") Integer activityId, @RequestParam(value = "volunteerStatus", required = false) Integer volunteerStatus, @RequestParam(value = "attendStatus", required = false) Integer attendStatus) {
        return activityService.updateActivityVolunteer(huiyuanId, activityId, volunteerStatus, attendStatus);
    }


    @RequestMapping(value = "/getAllActivities", method = RequestMethod.GET)
    @ResponseBody
    private ApiResult getAllActivities(String aoData, ActivityParam activityParam) {
        return activityService.getAllActivities(aoData, activityParam);
    }

    @RequestMapping(value = "/updateActivityCheckStatus", method = RequestMethod.POST)
    @ResponseBody
    private ApiResult updateActivityCheckStatus(@RequestParam("id") Integer id, @RequestParam("checkStatus") Integer checkStatus) {
        return activityService.updateActivityCheckStatus(id, checkStatus);
    }

    @RequestMapping(value = "/selectApproval", method = RequestMethod.GET)
    @ResponseBody
    private ApiResult selectApproval(String aoData, ApprovalParam approvalParam) {
        return activityService.selectApproval(aoData, approvalParam);
    }

    @RequestMapping(value = "/getAllProject", method = RequestMethod.GET)
    @ResponseBody
    private ApiResult getAllProject() {
        return activityService.getAllProject();
    }

    @RequestMapping(value = "/getUnsolvedApproval", method = RequestMethod.GET)
    @ResponseBody
    private ApiResult getUnsolvedApproval(@RequestParam("approvalId") Integer approvalId) {
        return activityService.getUnsolvedApproval(approvalId);
    }

    @RequestMapping(value = "/insertActivityRecord", method = RequestMethod.POST)
    @ResponseBody
    public ApiResult insertActivityRecord(ActivityApprovalRecord activityApprovalRecord) {
        return activityService.insertActivityRecord(activityApprovalRecord);
    }

    @RequestMapping(value = "/getActivityApprovalRecord", method = RequestMethod.GET)
    @ResponseBody
    public ApiResult getActivityApprovalRecord(String aoData, ApprovalParam approvalParam) {
        return activityService.getActivityApprovalRecord(aoData, approvalParam);
    }

    @RequestMapping(value = "/updateActivityFiled", method = RequestMethod.POST)
    @ResponseBody
    public ApiResult updateActivityFiled(@RequestParam("id") Integer id, @RequestParam("isFiled") Integer isFiled) {
        return activityService.updateActivityFiled(id, isFiled);
    }
}
