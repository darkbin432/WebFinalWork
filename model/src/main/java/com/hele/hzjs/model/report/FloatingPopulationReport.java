package com.hele.hzjs.model.report;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.hele.hzjs.model.Entity;

import java.util.Date;

/**
 * @author 斌
 */
public class FloatingPopulationReport extends Entity {

    private Integer scopeId;

    private Integer reportPersonId;

    private String name;

    private Integer level;

    private Integer type;

    private String address;

    private Integer zhigongNumber;

    private Integer liudongrkNumber;

    @JsonFormat(pattern = "yyyy-MM-dd",timezone="GMT+8")
    private Date liudongrkjsxjlDate;

    private Integer huiyuanNumber;

    private Integer liudongMaleNumber;

    private Integer liudongFemaleNumber;

    private Integer liudongUnmarriedNumber;

    private Integer liudongMarriedNumber;

    private Integer childStatus;

    private String scopeName;

    private String organizationName;

    private String reportPersonName;

    public Integer getScopeId() {
        return scopeId;
    }

    public void setScopeId(Integer scopeId) {
        this.scopeId = scopeId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getLevel() {
        return level;
    }

    public void setLevel(Integer level) {
        this.level = level;
    }

    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Integer getZhigongNumber() {
        return zhigongNumber;
    }

    public void setZhigongNumber(Integer zhigongNumber) {
        this.zhigongNumber = zhigongNumber;
    }

    public Integer getLiudongrkNumber() {
        return liudongrkNumber;
    }

    public void setLiudongrkNumber(Integer liudongrkNumber) {
        this.liudongrkNumber = liudongrkNumber;
    }

    public Date getLiudongrkjsxjlDate() {
        return liudongrkjsxjlDate;
    }

    public void setLiudongrkjsxjlDate(Date liudongrkjsxjlDate) {
        this.liudongrkjsxjlDate = liudongrkjsxjlDate;
    }

    public Integer getHuiyuanNumber() {
        return huiyuanNumber;
    }

    public void setHuiyuanNumber(Integer huiyuanNumber) {
        this.huiyuanNumber = huiyuanNumber;
    }

    public Integer getLiudongMaleNumber() {
        return liudongMaleNumber;
    }

    public void setLiudongMaleNumber(Integer liudongMaleNumber) {
        this.liudongMaleNumber = liudongMaleNumber;
    }

    public Integer getLiudongFemaleNumber() {
        return liudongFemaleNumber;
    }

    public void setLiudongFemaleNumber(Integer liudongFemaleNumber) {
        this.liudongFemaleNumber = liudongFemaleNumber;
    }

    public Integer getLiudongUnmarriedNumber() {
        return liudongUnmarriedNumber;
    }

    public void setLiudongUnmarriedNumber(Integer liudongUnmarriedNumber) {
        this.liudongUnmarriedNumber = liudongUnmarriedNumber;
    }

    public Integer getLiudongMarriedNumber() {
        return liudongMarriedNumber;
    }

    public void setLiudongMarriedNumber(Integer liudongMarriedNumber) {
        this.liudongMarriedNumber = liudongMarriedNumber;
    }

    public Integer getChildStatus() {
        return childStatus;
    }

    public void setChildStatus(Integer childStatus) {
        this.childStatus = childStatus;
    }

    public String getScopeName() {
        return scopeName;
    }

    public void setScopeName(String scopeName) {
        this.scopeName = scopeName;
    }

    public String getOrganizationName() {
        return organizationName;
    }

    public void setOrganizationName(String organizationName) {
        this.organizationName = organizationName;
    }

    public Integer getReportPersonId() {
        return reportPersonId;
    }

    public void setReportPersonId(Integer reportPersonId) {
        this.reportPersonId = reportPersonId;
    }

    public String getReportPersonName() {
        return reportPersonName;
    }

    public void setReportPersonName(String reportPersonName) {
        this.reportPersonName = reportPersonName;
    }
}