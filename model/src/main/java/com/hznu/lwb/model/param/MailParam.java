package com.hznu.lwb.model.param;

public class MailParam extends BasicParam {
    private Integer inMail;
    private Integer organizationMemberId;
    private Integer isGarbage;
    private Integer toStar;
    private Integer inStar;
    private Integer sendStatus;


    public Integer getInMail() {
        return inMail;
    }

    public void setInMail(Integer inMail) {
        this.inMail = inMail;
    }

    public Integer getOrganizationMemberId() {
        return organizationMemberId;
    }

    public void setOrganizationMemberId(Integer organizationMemberId) {
        this.organizationMemberId = organizationMemberId;
    }

    public Integer getIsGarbage() {
        return isGarbage;
    }

    public void setIsGarbage(Integer isGarbage) {
        this.isGarbage = isGarbage;
    }

    public Integer getToStar() {
        return toStar;
    }

    public void setToStar(Integer toStar) {
        this.toStar = toStar;
    }

    public Integer getInStar() {
        return inStar;
    }

    public void setInStar(Integer inStar) {
        this.inStar = inStar;
    }

    public Integer getSendStatus() {
        return sendStatus;
    }

    public void setSendStatus(Integer sendStatus) {
        this.sendStatus = sendStatus;
    }
}
