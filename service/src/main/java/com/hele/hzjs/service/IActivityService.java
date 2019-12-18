package com.hele.hzjs.service;

import com.hele.hzjs.model.Activity;
import com.hele.hzjs.model.ActivityApprovalRecord;
import com.hele.hzjs.model.Huiyuan;
import com.hele.hzjs.model.HuiyuanActivity;
import com.hele.hzjs.model.param.ActivityParam;
import com.hele.hzjs.model.param.ApprovalParam;
import com.hele.hzjs.model.param.HuiyuanActivityParam;
import com.hele.hzjs.model.result.ApiResult;

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
