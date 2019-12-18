package com.hznu.lwb.model;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.io.Serializable;
import java.util.Date;

/**
 * @author
 */
public class Huiyuan extends Entity {

    /**
     * 会员姓名
     */
    private String name;

    /**
     * 性别（0 女性 1 男性）
     */
    private Integer sex;

    /**
     * 身份证号码（年龄根据身份证号码计算）
     */
    private String cardNo;

    /**
     * 现居住址
     */
    private String address;

    /**
     * 联系电话
     */
    private String mobile;

    /**
     * 附件
     */
    private String attachment;

    /**
     * 所在区域
     */
    private Integer scopeId;

    /**
     * 政治面貌
     */
    private Integer political;

    /**
     * 服务对象
     */
    private String serviceType;

    /**
     * 感兴趣
     */
    private String hobby;

    /**
     * 志愿者状态 0不是1是2申请中
     */
    private Integer volunteerStatus;

    @JsonFormat(pattern = "yyyy-MM-dd", timezone = "GMT+8")
    private Date applyTime;

    /**
     * 个体会员/团体会员
     */
    private Integer huiyuanType;

    /**
     * 是否愿意接收协会的活动通知
     */
    private Integer notifyStatus;

    /**
     * 介绍和描述
     */
    private String description;


    //会员积分
    private Integer point;

    private Integer rowNum;

    private Integer volunteerApplyResult = 0;

    private String insititutionName;

    @JsonFormat(pattern = "yyyy-MM-dd",timezone="GMT+8")
    private Date jiuzhenDate;

    public Integer getVolunteerApplyResult() {
        return volunteerApplyResult;
    }

    public void setVolunteerApplyResult(Integer volunteerApplyResult) {
        this.volunteerApplyResult = volunteerApplyResult;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getSex() {
        return sex;
    }

    public void setSex(Integer sex) {
        this.sex = sex;
    }

    public String getCardNo() {
        return cardNo;
    }

    public void setCardNo(String cardNo) {
        this.cardNo = cardNo;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public String getAttachment() {
        return attachment;
    }

    public void setAttachment(String attachment) {
        this.attachment = attachment;
    }

    public Integer getScopeId() {
        return scopeId;
    }

    public void setScopeId(Integer scopeId) {
        this.scopeId = scopeId;
    }

    public Integer getPolitical() {
        return political;
    }

    public void setPolitical(Integer political) {
        this.political = political;
    }

    public String getServiceType() {
        return serviceType;
    }

    public void setServiceType(String serviceType) {
        this.serviceType = serviceType;
    }

    public Integer getVolunteerStatus() {
        return volunteerStatus;
    }

    public void setVolunteerStatus(Integer volunteerStatus) {
        this.volunteerStatus = volunteerStatus;
    }

    public String getHobby() {
        return hobby;
    }

    public void setHobby(String hobby) {
        this.hobby = hobby;
    }

    public Integer getHuiyuanType() {
        return huiyuanType;
    }

    public void setHuiyuanType(Integer huiyuanType) {
        this.huiyuanType = huiyuanType;
    }

    public Integer getNotifyStatus() {
        return notifyStatus;
    }

    public void setNotifyStatus(Integer notifyStatus) {
        this.notifyStatus = notifyStatus;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getRowNum() {
        return rowNum;
    }

    public void setRowNum(Integer rowNum) {
        this.rowNum = rowNum;
    }

    public Date getApplyTime() {
        return applyTime;
    }

    public void setApplyTime(Date applyTime) {
        this.applyTime = applyTime;
    }

    public String getInsititutionName() {
        return insititutionName;
    }

    public void setInsititutionName(String insititutionName) {
        this.insititutionName = insititutionName;
    }

    public Date getJiuzhenDate() {
        return jiuzhenDate;
    }

    public void setJiuzhenDate(Date jiuzhenDate) {
        this.jiuzhenDate = jiuzhenDate;
    }

    public Integer getPoint() {
        return point;
    }

    public void setPoint(Integer point) {
        this.point = point;
    }
}