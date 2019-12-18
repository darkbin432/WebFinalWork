package com.hznu.lwb.model.report;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.hznu.lwb.model.Entity;

import java.util.Date;

/**
 * @author Xueht
 */
public class ProjectMonthlyReport extends Entity {
    private String organizationName;
    private String informationCoding;
    private String fatherName;
    private String fatherIdCard;
    private String motherName;
    private String motherIdCard;
    private String address;
    @JsonFormat(pattern = "yyyy-MM-dd", timezone = "GMT+8")
    private Date aloneTime;
    private String reason;
    private String mobile;
    private Integer scopeId;
    @JsonFormat(pattern = "yyyy-MM-dd", timezone = "GMT+8")
    private Date deleteTime;
    @JsonFormat(pattern = "yyyy-MM-dd", timezone = "GMT+8")
    private Date migrateTime;
    private String oldAddress;
    private String newAddress;
    private String headMemberName;
    private String description;
    private Integer type;//1 新增失独或心理干预人员 2 需信息迁移人员 3 需信息变更人员 4 活动情况
    private Integer chileStatus;
    private Integer year;
    private Integer month;
    private Integer sumMonthlyAlonePerson;
    private Integer sumMonthlyMentalityPerson;
    private Integer sumMonthlyChangePerson;
    private Integer sumMonthlyMigratePerson;


    public String getOrganizationName() {
        return organizationName;
    }

    public void setOrganizationName(String organizationName) {
        this.organizationName = organizationName;
    }

    public String getInformationCoding() {
        return informationCoding;
    }

    public void setInformationCoding(String informationCoding) {
        this.informationCoding = informationCoding;
    }

    public String getFatherName() {
        return fatherName;
    }

    public void setFatherName(String fatherName) {
        this.fatherName = fatherName;
    }

    public String getFatherIdCard() {
        return fatherIdCard;
    }

    public void setFatherIdCard(String fatherIdCard) {
        this.fatherIdCard = fatherIdCard;
    }

    public String getMotherName() {
        return motherName;
    }

    public void setMotherName(String motherName) {
        this.motherName = motherName;
    }

    public String getMotherIdCard() {
        return motherIdCard;
    }

    public void setMotherIdCard(String motherIdCard) {
        this.motherIdCard = motherIdCard;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Date getAloneTime() {
        return aloneTime;
    }

    public void setAloneTime(Date aloneTime) {
        this.aloneTime = aloneTime;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public Integer getScopeId() {
        return scopeId;
    }

    public void setScopeId(Integer scopeId) {
        this.scopeId = scopeId;
    }

    public Date getDeleteTime() {
        return deleteTime;
    }

    public void setDeleteTime(Date deleteTime) {
        this.deleteTime = deleteTime;
    }

    public Date getMigrateTime() {
        return migrateTime;
    }

    public void setMigrateTime(Date migrateTime) {
        this.migrateTime = migrateTime;
    }

    public String getOldAddress() {
        return oldAddress;
    }

    public void setOldAddress(String oldAddress) {
        this.oldAddress = oldAddress;
    }

    public String getNewAddress() {
        return newAddress;
    }

    public void setNewAddress(String newAddress) {
        this.newAddress = newAddress;
    }

    public String getHeadMemberName() {
        return headMemberName;
    }

    public void setHeadMemberName(String headMemberName) {
        this.headMemberName = headMemberName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }

    public Integer getChileStatus() {
        return chileStatus;
    }

    public void setChileStatus(Integer chileStatus) {
        this.chileStatus = chileStatus;
    }

    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public Integer getMonth() {
        return month;
    }

    public void setMonth(Integer month) {
        this.month = month;
    }

    public Integer getSumMonthlyAlonePerson() {
        return sumMonthlyAlonePerson;
    }

    public void setSumMonthlyAlonePerson(Integer sumMonthlyAlonePerson) {
        this.sumMonthlyAlonePerson = sumMonthlyAlonePerson;
    }

    public Integer getSumMonthlyMentalityPerson() {
        return sumMonthlyMentalityPerson;
    }

    public void setSumMonthlyMentalityPerson(Integer sumMonthlyMentalityPerson) {
        this.sumMonthlyMentalityPerson = sumMonthlyMentalityPerson;
    }

    public Integer getSumMonthlyChangePerson() {
        return sumMonthlyChangePerson;
    }

    public void setSumMonthlyChangePerson(Integer sumMonthlyChangePerson) {
        this.sumMonthlyChangePerson = sumMonthlyChangePerson;
    }

    public Integer getSumMonthlyMigratePerson() {
        return sumMonthlyMigratePerson;
    }

    public void setSumMonthlyMigratePerson(Integer sumMonthlyMigratePerson) {
        this.sumMonthlyMigratePerson = sumMonthlyMigratePerson;
    }
}
