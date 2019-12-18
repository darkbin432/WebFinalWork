package com.hele.hzjs.model.param;

public class FamilyHelpRecordParam extends BasicParam {

    private Integer organizationMemberId;

    private String huiyuanName;

    private Integer year;

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

    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }
}
