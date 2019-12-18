package com.hele.hzjs.service.impl;

import com.hele.hzjs.model.*;
import com.hele.hzjs.model.param.ActivityParam;
import com.hele.hzjs.model.param.ApprovalParam;
import com.hele.hzjs.model.param.HuiyuanActivityParam;
import com.hele.hzjs.model.result.ApiResult;
import com.hele.hzjs.model.vm.DataTablesParameters;
import com.hele.hzjs.persistence.ActivityDao;
import com.hele.hzjs.persistence.HuiyuanActivityDao;
import com.hele.hzjs.persistence.HuiyuanDao;
import com.hele.hzjs.service.IActivityService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * @author hanbing
 */
@Service
public class ActivityService implements IActivityService {
    private Logger logger = LoggerFactory.getLogger(this.getClass());

    @Resource
    ActivityDao activityDao;

    @Resource
    HuiyuanDao huiyuanDao;

    @Resource
    private HuiyuanActivityDao huiyuanActivityDao;

    @Override
    public ApiResult insert(Activity activity) {
        ApiResult apiResult = new ApiResult();
        try {
            activityDao.insertInfo(activity);
            int id = activity.getId();
            Integer[] scopeId = activity.getScopeId();
            for (Integer integer : scopeId) {
                activityDao.insertRelationship(id, integer, "1", 1);
            }
            activity = activityDao.getOne(id);
            if (activity != null) {
                apiResult.success(activity);
            } else {
                apiResult.fail("活动插入失败");
            }
        } catch (Exception ex) {
            logger.error(ex.getMessage(), ex);
            apiResult.fail("活动插入失败");
        }
        return apiResult;
    }

    @Override
    public ApiResult delete(Integer id) {
        ApiResult apiResult = new ApiResult();
        try {
            activityDao.deleteInfo(id);
            activityDao.deleteRelationship(id);
            Activity activity = activityDao.getOne(id);
            if (activity == null) {
                apiResult.success();
            } else {
                apiResult.fail("活动删除失败");
            }
        } catch (Exception ex) {
            logger.error(ex.getMessage(), ex);
            apiResult.fail("活动删除失败");
        }
        return apiResult;
    }

    @Override
    public ApiResult update(Activity activity) {
        ApiResult apiResult = new ApiResult();
        try {
            if (activity.getId() == null) {
                apiResult.fail();
                return apiResult;
            }
            activityDao.updateInfo(activity);
            Integer id = activity.getId();
            activityDao.deleteScope(id);
            Integer[] scopeId = activity.getScopeId();
            if (scopeId != null) {
                for (Integer integer : scopeId) {
                    activityDao.insertRelationship(id, integer, "1", 1);
                }
            }
            apiResult.success();
        } catch (Exception ex) {
            logger.error(ex.getMessage(), ex);
            apiResult.fail("活动更新失败");
        }
        return apiResult;
    }

    @Override
    public ApiResult getOne(Integer id) {
        ApiResult apiResult = new ApiResult();
        try {
            Activity activity = activityDao.getOne(id);
            activity.setScopeId(activityDao.getOneScope(activity.getId()));
            apiResult.success(activity);
        } catch (Exception ex) {
            logger.error(ex.getMessage(), ex);
            apiResult.fail("活动获取失败");
        }
        return apiResult;
    }

    @Override
    public ApiResult getAcitvityVounteer(String aoData, HuiyuanActivityParam huiyuanActivityParam) {
        ApiResult apiResult = new ApiResult();
        try {
            DataTablesParameters parameters = DataTablesParameters.fromJson(aoData);

            huiyuanActivityParam.setSize(parameters.getRows());
            huiyuanActivityParam.setOffset(parameters.getStart());

            Integer totalCount = activityDao.getVolunteerPageCount(huiyuanActivityParam);

            List<HuiyuanActivity> lh = activityDao.getAcitvityVounteers(huiyuanActivityParam);
            if (lh != null) {
                apiResult.dataTable(parameters.getsEcho(), totalCount, lh);
                apiResult.success();
            } else {
                apiResult.fail("获取会员失败");
            }
        } catch (Exception ex) {
            logger.error(ex.getMessage(), ex);
            apiResult.fail("获取会员失败");
        }
        return apiResult;
    }

    @Override
    public ApiResult getActivitiesByVipId(Integer id) {
        return null;
    }

    @Override
    public ApiResult updateActivityVolunteer(Integer volunteerId, Integer activityId, Integer volunteerStatus, Integer attendStatus) {
        ApiResult apiResult = new ApiResult();
        try {
            Huiyuan huiyuan = activityDao.getAcitvityVounteer(volunteerId, activityId);
            if (huiyuan != null) {
                activityDao.updateAcvivityVolunteer(volunteerId, activityId, volunteerStatus, attendStatus);
                apiResult.success();
            } else {
                apiResult.fail("更新活动志愿者信息失败");
            }
        } catch (Exception ex) {
            logger.error(ex.getMessage(), ex);
            apiResult.fail("更新活动志愿者信息失败");
        }
        return apiResult;
    }

    @Override
    public ApiResult getAllActivities(String aoData, ActivityParam activityParam) {

        ApiResult apiResult = new ApiResult();

        try {
            if (activityParam.getScopeId() != null && activityParam.getScopeId() == -1) {
                activityParam.setScopeId(null);
            }

            DataTablesParameters parameters = DataTablesParameters.fromJson(aoData);

            activityParam.setSize(parameters.getRows());
            activityParam.setOffset(parameters.getStart());


            Integer totalCount = activityDao.getPageCount(activityParam);

            List<Activity> la = activityDao.selectActivityInfo(activityParam);

            for (Activity activity : la) {
                activity.setScopeId(activityDao.getOneScope(activity.getId()));
            }

            apiResult.dataTable(parameters.getsEcho(), totalCount, la);
            apiResult.success();

        } catch (Exception ex) {
            logger.error(ex.getMessage(), ex);
            apiResult.fail("筛选活动失败");
        }

        return apiResult;
    }

    @Override
    public ApiResult getOneProject(Integer id) {
        ApiResult apiResult = new ApiResult();
        try {
            Project project = activityDao.getOneProject(id);
            if (project != null) {
                apiResult.success(project);
            } else {
                apiResult.fail("项目获取失败");
            }
        } catch (Exception ex) {
            logger.error(ex.getMessage(), ex);
            apiResult.fail("获取项目失败");
        }
        return apiResult;
    }

    @Override
    public ApiResult selectApproval(String aoData, ApprovalParam approvalParam) {
        ApiResult apiResult = new ApiResult();

        try {

            DataTablesParameters parameters = DataTablesParameters.fromJson(aoData);

            approvalParam.setSize(parameters.getRows());
            approvalParam.setOffset(parameters.getStart());

            if (approvalParam.getUserType() != null && approvalParam.getUserType() == 1) {
                Integer totalCount = activityDao.getApprovalPageCount(approvalParam);

                List<Activity> la = activityDao.getApprovalInfo(approvalParam);

                apiResult.dataTable(parameters.getsEcho(), totalCount, la);
                apiResult.success();
            } else {
                apiResult.dataTable(parameters.getsEcho(), 0, null);
                apiResult.success();
            }

        } catch (Exception ex) {
            logger.error(ex.getMessage(), ex);
            apiResult.fail("筛选审批失败");
        }

        return apiResult;
    }

    @Override
    public ApiResult updateActivityCheckStatus(Integer id, Integer checkStatus) {
        ApiResult apiResult = new ApiResult();
        try {
            Activity activity = activityDao.getOne(id);
            if (activity != null) {
                if (activity.getCheckStatus() == 0) {
                    activityDao.updateActivityCheckStatus(id, checkStatus);
                    apiResult.success();
                }
            } else {
                apiResult.fail("活动审批失败");
            }
        } catch (Exception ex) {
            logger.error(ex.getMessage(), ex);
            apiResult.fail("活动审批失败");
        }
        return apiResult;
    }

    @Override
    public ApiResult getAllProject() {
        ApiResult apiResult = new ApiResult();
        try {
            List<Project> lp = activityDao.getAllProject();
            if (lp != null) {
                apiResult.success(lp);
            } else {
                apiResult.fail("项目获取失败");
            }
        } catch (Exception ex) {
            logger.error(ex.getMessage(), ex);
            apiResult.fail("项目获取失败");
        }
        return apiResult;
    }

    @Override
    public ApiResult getUnsolvedApproval(Integer approvalId) {
        ApiResult apiResult = new ApiResult();
        try {
            Integer totalCount = activityDao.getUnsolvedApproval(approvalId);
            apiResult.success(String.valueOf(totalCount));
        } catch (Exception ex) {
            logger.error(ex.getMessage(), ex);
            apiResult.fail("获取未审批数量失败");
        }
        return apiResult;
    }

    @Override
    public ApiResult insertActivityRecord(ActivityApprovalRecord activityApprovalRecord) {
        ApiResult apiResult = new ApiResult();
        try {
            activityDao.insertRecord(activityApprovalRecord);
            apiResult.success();
        } catch (Exception e) {
            apiResult.fail("添加活动审批记录失败");
        }
        return apiResult;
    }

    @Override
    public ApiResult getActivityApprovalRecord(String aoData, ApprovalParam approvalParam) {
        ApiResult apiResult = new ApiResult();
        try {
            DataTablesParameters parameters = DataTablesParameters.fromJson(aoData);

            approvalParam.setSize(parameters.getRows());
            approvalParam.setOffset(parameters.getStart());

            Integer totalCount = activityDao.getActivityApprovalRecordPageCount(approvalParam);

            List<ActivityApprovalRecord> la = activityDao.getActivityApprovalRecord(approvalParam);

            apiResult.dataTable(parameters.getsEcho(), totalCount, la);
            apiResult.success();
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
            apiResult.fail("获取活动审批记录失败");
        }
        return apiResult;
    }

    @Override
    public ApiResult getListByHuiyuan(ActivityParam activityParam) {
        ApiResult apiResult = new ApiResult();

        if (activityParam.getHuiyuanId() == null) {
            apiResult.lackParams("huiyuanId");
            return apiResult;
        }

        activityParam.initOffset();

        try {
            List<Activity> activityList = activityDao.selectByHuiyuan(activityParam);

            int count = activityDao.countAll(activityParam);

            apiResult.setTotalCount(count);
            apiResult.success(activityList);
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
            apiResult.fail();
        }


        return apiResult;
    }

    @Override
    public ApiResult getByHuiyuan(ActivityParam activityParam) {
        ApiResult apiResult = new ApiResult();


        if (activityParam.getId() == null) {
            apiResult.lackParams("id");
            return apiResult;
        }

        if (activityParam.getHuiyuanId() == null) {
            apiResult.lackParams("huiyuanId");
            return apiResult;
        }

        activityParam.initOffset();

        try {
            Activity activity = activityDao.selectOneByHuiyuan(activityParam);
            apiResult.success(activity);
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
            apiResult.fail();
        }

        return apiResult;
    }

    @Override
    public ApiResult updateActivityFiled(Integer id, Integer isFiled) {
        ApiResult apiResult = new ApiResult();
        try {
            activityDao.updateActivityFiled(id, isFiled);
            apiResult.success();
        } catch (Exception ex) {
            logger.error(ex.getMessage());
            apiResult.fail("活动归档信息更行失败");
        }
        return apiResult;
    }

    @Override
    public ApiResult sign(HuiyuanActivity huiyuanActivity) {
        ApiResult apiResult = checkValid(huiyuanActivity);

        if (apiResult.IsFail()) {
            return apiResult;
        }

        if (huiyuanActivity.getVolunteerApplyStatus() == null) {
            apiResult.lackParams("volunteerApplyStatus");
            return apiResult;
        }

        try {

            Activity activity = activityDao.getOne(huiyuanActivity.getActivityId());
            if (activity == null) {
                apiResult.fail("活动不存在");
                return apiResult;
            }

            if (System.currentTimeMillis() > activity.getEndTime().getTime()) {
                apiResult.fail("活动已经结束");
                return apiResult;
            }

            Integer cnt1 = huiyuanActivityDao.getCurrentHuiyuanCount(huiyuanActivity.getActivityId());

            Integer cnt2 = huiyuanActivityDao.getCurrentVolunteerCount(huiyuanActivity.getActivityId());

            if ((cnt1 < activity.getHuiyuanLimit() && huiyuanActivity.getVolunteerApplyStatus() == 3)
                    || (cnt2 < activity.getVolunteerLimit() && huiyuanActivity.getVolunteerApplyStatus() != 3)){
                if (huiyuanActivity.getVolunteerApplyStatus() != 3){
                    huiyuanActivity.setVolunteerApplyStatus(1);
                }
                huiyuanActivityDao.insert(huiyuanActivity);
                huiyuanDao.addPoint(huiyuanActivity.getHuiyuanId());
                if (huiyuanActivity.getVolunteerApplyStatus() == 1){
                    Huiyuan huiyuan = new Huiyuan();
                    huiyuan.setId(huiyuanActivity.getHuiyuanId());
                    huiyuan.setVolunteerStatus(1);
                    huiyuanDao.updateByPrimaryKeySelective(huiyuan);
                }
                apiResult.success(huiyuanActivity);
            }else{
                if (huiyuanActivity.getVolunteerApplyStatus() == 0){
                    apiResult.fail("会员报名数超出限制");
                }else if (huiyuanActivity.getVolunteerApplyStatus() == 1){
                    apiResult.fail("志愿者报名数超出限制");
                }
                return apiResult;
            }
        } catch (Exception ex) {
            logger.error(ex.getMessage(), ex);
            apiResult.fail("活动报名失败");
        }
        return apiResult;
    }

    @Override
    public ApiResult cancel(HuiyuanActivity huiyuanActivity) {
        ApiResult apiResult = checkValid(huiyuanActivity);

        if (apiResult.IsFail()) {
            return apiResult;
        }

        try {
            huiyuanActivityDao.cancel(huiyuanActivity);
            apiResult.success();
        } catch (Exception ex) {
            logger.error(ex.getMessage(), ex);
            apiResult.fail("活动撤销失败");
        }
        return apiResult;
    }

    @Override
    public ApiResult attend(HuiyuanActivity huiyuanActivity) {
        ApiResult apiResult = checkValid(huiyuanActivity);

        if (apiResult.IsFail()) {
            return apiResult;
        }

        HuiyuanActivity oldRecord = huiyuanActivityDao.selectOne(huiyuanActivity);

        if (oldRecord == null) {
            apiResult.fail("您尚未报名参加活动");
            return apiResult;
        }

        if (System.currentTimeMillis() < oldRecord.getStartTime().getTime()) {
            apiResult.fail("活动尚未开始");
            return apiResult;
        }

        try {
            huiyuanActivityDao.attend(huiyuanActivity);
            apiResult.success();
        } catch (Exception ex) {
            logger.error(ex.getMessage(), ex);
            apiResult.fail("活动签到失败");
        }
        return apiResult;
    }

    private ApiResult checkValid(HuiyuanActivity huiyuanActivity) {
        ApiResult apiResult = new ApiResult();
        if (huiyuanActivity.getActivityId() == null) {
            apiResult.lackParams("activityId");
        }

        if (huiyuanActivity.getHuiyuanId() == null) {
            apiResult.lackParams("huiyuanId");
        }
        return apiResult;
    }

    @Override
    public ApiResult getRecordList(ActivityParam activityParam) {
        ApiResult apiResult = new ApiResult();

        if (activityParam.getHuiyuanId() == null) {
            apiResult.lackParams("huiyuanId");
            return apiResult;
        }

        activityParam.initOffset();

        try {
            List<Activity> activityList = activityDao.selectRecordByHuiyuan(activityParam);

            int count = activityDao.countAll(activityParam);

            apiResult.setTotalCount(count);
            apiResult.success(activityList);
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
            apiResult.fail();
        }


        return apiResult;
    }
}
