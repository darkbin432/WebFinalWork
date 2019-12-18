package com.hele.hzjs.model.param;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.util.Date;

public class HuiyuanParam extends BasicParam {

    private Integer scopeId;
    private Integer scopeLeft;
    private Integer scopeRight;
    private Integer userScope;
    private Integer userType;
    private Integer volunteerStatus;
    private Integer attendStatus;
    private String huiyuanName;
    private Integer birthday;
    private Integer medical;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm",timezone="GMT+8")
    private Date medicalNowTime;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm",timezone="GMT+8")
    private Date medicalBeforeTime;

    public Integer getScopeId() {
        return scopeId;
    }

    public void setScopeId(Integer scopeId) {
        this.scopeId = scopeId;
    }

    public Integer getScopeLeft() {
        return scopeLeft;
    }

    public Integer getScopeRight() {
        return scopeRight;
    }

    public void setScopeRight(Integer scopeRight) {
        this.scopeRight = scopeRight;
    }

    public Integer getUserScope() {
        return userScope;
    }

    public void setUserScope(Integer userScope) {
        this.userScope = userScope;
    }

    public Integer getUserType() {
        return userType;
    }

    public void setUserType(Integer userType) {
        this.userType = userType;
    }

    public Integer getAttendStatus() {
        return attendStatus;
    }

    public void setAttendStatus(Integer attendStatus) {
        this.attendStatus = attendStatus;
    }

    public void setScopeLeft(Integer scopeLeft) {
        this.scopeLeft = scopeLeft;
    }

    public Integer getVolunteerStatus() {
        return volunteerStatus;
    }

    public void setVolunteerStatus(Integer volunteerStatus) {
        this.volunteerStatus = volunteerStatus;
    }

    public String getHuiyuanName() {
        return huiyuanName;
    }

    public void setHuiyuanName(String huiyuanName) {
        this.huiyuanName = huiyuanName;
    }

    public Integer getBirthday() {
        return birthday;
    }

    public void setBirthday(Integer birthday) {
        this.birthday = birthday;
    }

    public Integer getMedical() {
        return medical;
    }

    public void setMedical(Integer medical) {
        this.medical = medical;
    }

    public Date getMedicalNowTime() {
        return medicalNowTime;
    }

    public void setMedicalNowTime(Date medicalNowTime) {
        this.medicalNowTime = medicalNowTime;
    }

    public Date getMedicalBeforeTime() {
        return medicalBeforeTime;
    }

    public void setMedicalBeforeTime(Date medicalBeforeTime) {
        this.medicalBeforeTime = medicalBeforeTime;
    }
}
