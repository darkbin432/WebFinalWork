package com.hznu.lwb.model.param;

/**
 * @author Xueht
 */
public class HuiyuanActivityParam extends BasicParam{
    private Integer huiyuanId;
    private Integer activityId;
    private Integer volunteerApplyStatus;

    public Integer getHuiyuanId() {
        return huiyuanId;
    }

    public void setHuiyuanId(Integer huiyuanId) {
        this.huiyuanId = huiyuanId;
    }

    public Integer getActivityId() {
        return activityId;
    }

    public void setActivityId(Integer activityId) {
        this.activityId = activityId;
    }

    public Integer getVolunteerApplyStatus() {
        return volunteerApplyStatus;
    }

    public void setVolunteerApplyStatus(Integer volunteerApplyStatus) {
        this.volunteerApplyStatus = volunteerApplyStatus;
    }
}
