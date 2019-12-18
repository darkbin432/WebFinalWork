package com.hele.hzjs.model.report;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.hele.hzjs.model.Entity;

import java.io.Serializable;
import java.util.Date;

/**
 * @author 斌
 */
public class FamilyHelpRecord extends Entity {
    private Integer huiyuanId;

    private String huiyuanName;

    private String huiyuanCardNo;

    private String huiyuanAddress;

    private Integer organizationMemberId;

    @JsonFormat(pattern = "yyyy-MM-dd",timezone="GMT+8")
    private Date fsDate;

    public Integer getHuiyuanId() {
        return huiyuanId;
    }

    public void setHuiyuanId(Integer huiyuanId) {
        this.huiyuanId = huiyuanId;
    }

    public Integer getOrganizationMemberId() {
        return organizationMemberId;
    }

    public void setOrganizationMemberId(Integer organizationMemberId) {
        this.organizationMemberId = organizationMemberId;
    }

    public String getHuiyuanName() {
        return huiyuanName;
    }

    public void setHuiyuanName(String huiyuanName) {
        this.huiyuanName = huiyuanName;
    }

    public String getHuiyuanCardNo() {
        return huiyuanCardNo;
    }

    public void setHuiyuanCardNo(String huiyuanCardNo) {
        this.huiyuanCardNo = huiyuanCardNo;
    }

    public String getHuiyuanAddress() {
        return huiyuanAddress;
    }

    public void setHuiyuanAddress(String huiyuanAddress) {
        this.huiyuanAddress = huiyuanAddress;
    }

    public Date getFsDate() {
        return fsDate;
    }

    public void setFsDate(Date fsDate) {
        this.fsDate = fsDate;
    }
}