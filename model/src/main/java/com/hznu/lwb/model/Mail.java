package com.hznu.lwb.model;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.util.Date;

public class Mail extends Entity{
    private Integer inMail;
    private String toMail;
    private String inName;
    private String inUserName;
    private String inMobile;
    private String inOrganizationName;
    private Integer organizationMemberId;
    private String toUserName;
    private String subject;
    private String content;
    private String attachment;
    private String attachmentName;
    private String attachmentSize;
    private Integer isRead;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm",timezone="GMT+8")
    private Date date;
    private Integer sendStatus;
    private Integer inStar;
    private Integer toStar;
    private Integer isGarbage;

    public Integer getInMail() {
        return inMail;
    }

    public void setInMail(Integer inMail) {
        this.inMail = inMail;
    }

    public String getToMail() {
        return toMail;
    }

    public void setToMail(String toMail) {
        this.toMail = toMail;
    }

    public String getInName() {
        return inName;
    }

    public void setInName(String inName) {
        this.inName = inName;
    }

    public String getInUserName() {
        return inUserName;
    }

    public void setInUserName(String inUserName) {
        this.inUserName = inUserName;
    }

    public String getInMobile() {
        return inMobile;
    }

    public void setInMobile(String inMobile) {
        this.inMobile = inMobile;
    }

    public String getInOrganizationName() {
        return inOrganizationName;
    }

    public void setInOrganizationName(String inOrganizationName) {
        this.inOrganizationName = inOrganizationName;
    }

    public Integer getOrganizationMemberId() {
        return organizationMemberId;
    }

    public void setOrganizationMemberId(Integer organizationMemberId) {
        this.organizationMemberId = organizationMemberId;
    }

    public String getToUserName() {
        return toUserName;
    }

    public void setToUserName(String toUserName) {
        this.toUserName = toUserName;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getAttachment() {
        return attachment;
    }

    public void setAttachment(String attachment) {
        this.attachment = attachment;
    }

    public String getAttachmentName() {
        return attachmentName;
    }

    public void setAttachmentName(String attachmentName) {
        this.attachmentName = attachmentName;
    }

    public String getAttachmentSize() {
        return attachmentSize;
    }

    public void setAttachmentSize(String attachmentSize) {
        this.attachmentSize = attachmentSize;
    }

    public Integer getIsRead() {
        return isRead;
    }

    public void setIsRead(Integer isRead) {
        this.isRead = isRead;
    }

    public Integer getSendStatus() {
        return sendStatus;
    }

    public void setSendStatus(Integer sendStatus) {
        this.sendStatus = sendStatus;
    }

    public Integer getInStar() {
        return inStar;
    }

    public void setInStar(Integer inStar) {
        this.inStar = inStar;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Integer getToStar() {
        return toStar;
    }

    public void setToStar(Integer toStar) {
        this.toStar = toStar;
    }

    public Integer getIsGarbage() {
        return isGarbage;
    }

    public void setIsGarbage(Integer isGarbage) {
        this.isGarbage = isGarbage;
    }
}
