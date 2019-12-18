package com.hznu.lwb.model;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.io.Serializable;
import java.util.Date;

/**
 * @author 
 */
public class HuiyuanActivity extends Entity implements Serializable {

    /**
     * 会员id
     */
    private Integer huiyuanId;

    /**
     * 活动id
     */
    private Integer activityId;

    /**
     * 活动名称
     */
    private String title;

    /**
     * 活动区域
     */
    private String activityScope;

    /**
     * 是否以志愿者身份参与
     */
    private Integer volunteerApplyStatus;

    /**
     * 志愿者积分
     */
    private Integer volunteerPoint;

    /**
     * 签到状态 0 未签到 1签到
     */
    private Boolean attendStatus;

    private String name;

    private String mobile;

    private String cardNo;

    @JsonFormat(pattern = "yyyy-MM-dd",timezone="GMT+8")
    private Date startTime;

    @JsonFormat(pattern = "yyyy-MM-dd",timezone="GMT+8")
    private Date endTime;


    private static final long serialVersionUID = 1L;

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

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
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

    public String getActivityScope() {
        return activityScope;
    }

    public void setActivityScope(String activityScope) {
        this.activityScope = activityScope;
    }


    public Integer getVolunteerPoint() {
        return volunteerPoint;
    }

    public void setVolunteerPoint(Integer volunteerPoint) {
        this.volunteerPoint = volunteerPoint;
    }

    public Boolean getAttendStatus() {
        return attendStatus;
    }

    public void setAttendStatus(Boolean attendStatus) {
        this.attendStatus = attendStatus;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public String getCardNo() {
        return cardNo;
    }

    public void setCardNo(String cardNo) {
        this.cardNo = cardNo;
    }

    public static long getSerialVersionUID() {
        return serialVersionUID;
    }

    public Integer getVolunteerApplyStatus() {
        return volunteerApplyStatus;
    }

    public void setVolunteerApplyStatus(Integer volunteerApplyStatus) {
        this.volunteerApplyStatus = volunteerApplyStatus;
    }
}