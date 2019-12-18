package com.hznu.lwb.model;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.util.Date;

public class Activity extends Entity {
    private Integer projectId;

    // 审批记录
    private Integer approvalId;
    //    3无需审批 2审批未通过 1审批通过 0未审批
    private Integer checkStatus;
    // 标题
    private String title;
    private Integer initiatorId;
    private Integer headMemberId;
    private String headMemberName;
    private Integer createMemberId;
    private String createMemberUsername;
    private String createMemberName;
    private String activityArea;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm",timezone="GMT+8")
    private Date publishTime;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm",timezone="GMT+8")
    private Date startTime;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm",timezone="GMT+8")
    private Date endTime;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm",timezone="GMT+8")
    private Date enrollTime;
    // 会员最大人数
    private Integer huiyuanLimit;
    // 志愿者最大人数
    private Integer volunteerLimit;
    // 当前会员报名人数
    private Integer huiyuanCount;
    private Integer volunteerCount;
    private String description;
    // 附件
    private String attachment;
    private String summary;
    // 活动所属机构
    private Integer[] scopeId;
    private String organizationName;
    private Integer createMemberScopeId;
    private Integer headMemberType;
    private String summaryImage;
    private Integer isFiled;
    private String oneOrganizationName;

    // 当前用户是否报名
    private Integer hasSigned;

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

    public Integer getCreateMemberId() {
        return createMemberId;
    }

    public void setCreateMemberId(Integer createMemberId) {
        this.createMemberId = createMemberId;
    }

    public String getCreateMemberUsername() {
        return createMemberUsername;
    }

    public void setCreateMemberUsername(String createMemberUsername) {
        this.createMemberUsername = createMemberUsername;
    }

    public Integer getInitiatorId() {
        return initiatorId;
    }

    public void setInitiatorId(Integer initiatorId) {
        this.initiatorId = initiatorId;
    }

    public Integer getProjectId() {
        return projectId;
    }

    public void setProjectId(Integer projectId) {
        this.projectId = projectId;
    }

    public Integer getApprovalId() {
        return approvalId;
    }

    public void setApprovalId(Integer approvalId) {
        this.approvalId = approvalId;
    }

    public Integer getCheckStatus() {
        return checkStatus;
    }

    public void setCheckStatus(Integer checkStatus) {
        this.checkStatus = checkStatus;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Integer getHeadMemberId() {
        return headMemberId;
    }

    public void setHeadMemberId(Integer headMemberId) {
        this.headMemberId = headMemberId;
    }

    public String getHeadMemberName() {
        return headMemberName;
    }

    public void setHeadMemberName(String headMemberName) {
        this.headMemberName = headMemberName;
    }

    public String getCreateMemberName() {
        return createMemberName;
    }

    public void setCreateMemberName(String createMemberName) {
        this.createMemberName = createMemberName;
    }

    public String getActivityArea() {
        return activityArea;
    }

    public void setActivityArea(String activityArea) {
        this.activityArea = activityArea;
    }

    public Date getPublishTime() {
        return publishTime;
    }

    public void setPublishTime(Date publishTime) {
        this.publishTime = publishTime;
    }

    public Date getStartTime() {
        return startTime;
    }

    public void setStartTime(Date startTime) {
        this.startTime = startTime;
    }

    public Date getEndTime() {
        return endTime;
    }

    public void setEndTime(Date endTime) {
        this.endTime = endTime;
    }

    public Integer getHuiyuanLimit() {
        return huiyuanLimit;
    }

    public void setHuiyuanLimit(Integer huiyuanLimit) {
        this.huiyuanLimit = huiyuanLimit;
    }

    public Integer getHuiyuanCount() {
        return huiyuanCount;
    }

    public void setHuiyuanCount(Integer huiyaunCount) {
        this.huiyuanCount = huiyaunCount;
    }

    public Integer getVolunteerLimit() {
        return volunteerLimit;
    }

    public void setVolunteerLimit(Integer volunteerLimit) {
        this.volunteerLimit = volunteerLimit;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getAttachment() {
        return attachment;
    }

    public void setAttachment(String attachment) {
        this.attachment = attachment;
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public Integer[] getScopeId() {
        return scopeId;
    }

    public void setScopeId(Integer[] scopeId) {
        this.scopeId = scopeId;
    }

    public String getOrganizationName() {
        return organizationName;
    }

    public void setOrganizationName(String organizationName) {
        this.organizationName = organizationName;
    }

    public Integer getCreateMemberScopeId() {
        return createMemberScopeId;
    }

    public void setCreateMemberScopeId(Integer createMemberScopeId) {
        this.createMemberScopeId = createMemberScopeId;
    }

    public Integer getHeadMemberType() {
        return headMemberType;
    }

    public void setHeadMemberType(Integer headMemberType) {
        this.headMemberType = headMemberType;
    }


    public Integer getHasSigned() {
        return hasSigned;
    }

    public void setHasSigned(Integer hasSigned) {
        this.hasSigned = hasSigned;
    }

    public Integer getVolunteerCount() {
        return volunteerCount;
    }

    public void setVolunteerCount(Integer volunteerCount) {
        this.volunteerCount = volunteerCount;
    }
    public String getSummaryImage() {
        return summaryImage;
    }

    public void setSummaryImage(String summaryImage) {
        this.summaryImage = summaryImage;
    }

    public Integer getIsFiled() {
        return isFiled;
    }

    public void setIsFiled(Integer isFiled) {
        this.isFiled = isFiled;
    }

    public String getOneOrganizationName() {
        return oneOrganizationName;
    }

    public void setOneOrganizationName(String oneOrganizationName) {
        this.oneOrganizationName = oneOrganizationName;
    }

    public Date getEnrollTime() {
        return enrollTime;
    }

    public void setEnrollTime(Date enrollTime) {
        this.enrollTime = enrollTime;
    }
}
