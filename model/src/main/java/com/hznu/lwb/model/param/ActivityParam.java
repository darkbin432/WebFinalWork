package com.hznu.lwb.model.param;

/**
 * @Auther: Xueht
 * @Date: Create in 17:17 2019/3/20
 */
public class ActivityParam extends BasicParam {
    private String title;
    private Integer scopeId;
    private Integer projectId;
    private Integer userId;
    private Integer huiyuanId;

    private Integer isFiled;

    /**
     * 是否以志愿者身份参与
     */
    private Integer volunteerApplyStatus;

    public Integer getVolunteerApplyStatus() {
        return volunteerApplyStatus;
    }

    public void setVolunteerApplyStatus(Integer volunteerApplyStatus) {
        this.volunteerApplyStatus = volunteerApplyStatus;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Integer getScopeId() {
        return scopeId;
    }

    public void setScopeId(Integer scopeId) {
        this.scopeId = scopeId;
    }

    public Integer getProjectId() {
        return projectId;
    }

    public void setProjectId(Integer projectId) {
        this.projectId = projectId;
    }

    public Integer getHuiyuanId() {
        return huiyuanId;
    }

    public void setHuiyuanId(Integer huiyuanId) {
        this.huiyuanId = huiyuanId;
    }
    public Integer getIsFiled() {
        return isFiled;
    }

    public void setIsFiled(Integer isFiled) {
        this.isFiled = isFiled;

    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }
}
