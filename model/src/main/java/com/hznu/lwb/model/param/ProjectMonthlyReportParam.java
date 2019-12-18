package com.hznu.lwb.model.param;

/**
 * @author Xueht
 */
public class ProjectMonthlyReportParam extends BasicParam {
    private Integer scopeId;
    private String scopeName;
    private Integer year;
    private Integer month;
    private Integer type;
    private Integer leftScopeId;
    private Integer rightScopeId;

    public Integer getScopeId() {
        return scopeId;
    }

    public void setScopeId(Integer scopeId) {
        this.scopeId = scopeId;
    }

    public String getScopeName() {
        return scopeName;
    }

    public void setScopeName(String scopeName) {
        this.scopeName = scopeName;
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

    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }

    public Integer getLeftScopeId() {
        return leftScopeId;
    }

    public void setLeftScopeId(Integer leftScopeId) {
        this.leftScopeId = leftScopeId;
    }

    public Integer getRightScopeId() {
        return rightScopeId;
    }

    public void setRightScopeId(Integer rightScopeId) {
        this.rightScopeId = rightScopeId;
    }
}
