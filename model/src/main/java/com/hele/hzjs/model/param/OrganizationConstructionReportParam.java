package com.hele.hzjs.model.param;

public class OrganizationConstructionReportParam extends BasicParam{
    private Integer year;
    private Integer scopeId;
    private Integer parentOrganizationId;
    private String aoData;

    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public Integer getScopeId() {
        return scopeId;
    }

    public void setScopeId(Integer scopeId) {
        this.scopeId = scopeId;
    }

    public Integer getParentOrganizationId() {
        return parentOrganizationId;
    }

    public void setParentOrganizationId(Integer parentOrganizationId) {
        this.parentOrganizationId = parentOrganizationId;
    }

    public String getAoData() {
        return aoData;
    }

    public void setAoData(String aoData) {
        this.aoData = aoData;
    }
}
