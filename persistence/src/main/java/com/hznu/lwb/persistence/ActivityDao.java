package com.hznu.lwb.persistence;

import com.hznu.lwb.model.*;
import com.hznu.lwb.model.param.ActivityParam;
import com.hznu.lwb.model.param.ApprovalParam;
import com.hznu.lwb.model.param.HuiyuanActivityParam;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface ActivityDao {

    void insertInfo(Activity activity);

    void insertRelationship(@Param("activityId") Integer activityId, @Param("scopeId") Integer scopeId, @Param("version") String version, @Param("status") Integer status);

    Activity getOne(@Param("id") Integer id);

    void updateInfo(Activity activity);

    void updateRelationship(@Param("id") Integer id, @Param("scopeId") Integer scopeId);

    void deleteInfo(@Param("id") Integer id);

    void deleteRelationship(@Param("id") Integer id);

    int getPageCount(ActivityParam activityParam);

    int getVolunteerPageCount(HuiyuanActivityParam huiyuanActivityParam);

    List<Activity> selectActivityInfo(ActivityParam activityParam);

    List<HuiyuanActivity> getAcitvityVounteers(HuiyuanActivityParam huiyuanActivityParam);

    Huiyuan getAcitvityVounteer(@Param("huiyuanId") Integer huiyuanId, @Param("activityId") Integer activityId);

    void updateAcvivityVolunteer(@Param("huiyuanId") Integer huiyuanId, @Param("activityId") Integer activityId, @Param("volunteerApplyStatus") Integer volunteerApplyStatus, @Param("attendStatus") Integer attendStatus);

    Project getOneProject(@Param("id") Integer id);

    void updateActivityCheckStatus(@Param("id") Integer id, @Param("checkStatus") Integer checkStatus);

    int getApprovalPageCount(ApprovalParam approvalParam);

    List<Activity> getApprovalInfo(ApprovalParam approvalParam);

    List<Project> getAllProject();

    int getUnsolvedApproval(@Param("approvalId") Integer approvalId);

    int insertRecord(ActivityApprovalRecord record);

    int getActivityApprovalRecordPageCount(ApprovalParam approvalParam);

    List<ActivityApprovalRecord> getActivityApprovalRecord(ApprovalParam approvalParam);

    void deleteScope(@Param("activityId") Integer activityId);

    Integer[] getOneScope(@Param("activityId") Integer activityId);

    List<Activity> selectByHuiyuan(ActivityParam activityParam);

    int countAll(ActivityParam activityParam);

    Activity selectOneByHuiyuan(ActivityParam activityParam);

    void updateActivityFiled(@Param("id") Integer id, @Param("isFiled") Integer isFiled);

    List<Activity> selectRecordByHuiyuan(ActivityParam activityParam);
}
