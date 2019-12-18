package com.hznu.lwb.service;

import com.hznu.lwb.model.Activity;
import com.hznu.lwb.model.ActivityApprovalRecord;
import com.hznu.lwb.model.Huiyuan;
import com.hznu.lwb.model.HuiyuanActivity;
import com.hznu.lwb.model.param.ActivityParam;
import com.hznu.lwb.model.param.ApprovalParam;
import com.hznu.lwb.model.param.HuiyuanActivityParam;
import com.hznu.lwb.model.result.ApiResult;

import java.beans.AppletInitializer;

public interface IActivityService {

    ApiResult insert(Activity activity);

    ApiResult delete(Integer id);

    ApiResult update(Activity activity);

    ApiResult getOne(Integer id);

//    ApiResult selectByPage(String title, Integer scopeId, String startTime, Integer pageNow, Integer startProjectId, Integer endProjectId);

    ApiResult getAcitvityVounteer(String aoData, HuiyuanActivityParam huiyuanActivityParam);

    ApiResult getActivitiesByVipId(Integer id);

    ApiResult updateActivityVolunteer(Integer volunteerId, Integer activityId, Integer volunteerStatus, Integer attendStatus);

    ApiResult getAllActivities(String aoData, ActivityParam activityParam);

    ApiResult getOneProject(Integer id);

    ApiResult selectApproval(String aoData, ApprovalParam approvalParam);

    ApiResult updateActivityCheckStatus(Integer id, Integer checkStatus);

    ApiResult getAllProject();

    ApiResult getUnsolvedApproval(Integer approvalId);

    ApiResult insertActivityRecord(ActivityApprovalRecord activityApprovalRecord);

    ApiResult getActivityApprovalRecord(String aoData, ApprovalParam approvalParam);


    ApiResult getListByHuiyuan(ActivityParam activityParam);

    ApiResult getByHuiyuan(ActivityParam activityParam);

    ApiResult sign(HuiyuanActivity huiyuanActivity);

    ApiResult updateActivityFiled(Integer id, Integer isFiled);

    ApiResult cancel(HuiyuanActivity huiyuanActivity);

    ApiResult attend(HuiyuanActivity huiyuanActivity);

    ApiResult getRecordList(ActivityParam activityParam);
}
