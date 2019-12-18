package com.hele.hzjs.model;

public class Announcement extends Entity{
    private String title;
    private Integer createdMemberId;
    private String createMemberName;
    private Integer readCount;
    private Integer createMemberScopeId;
    private String createOrganizationName;
    private String attachment;
    private String content;
    private Integer importance;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Integer getCreatedMemberId() {
        return createdMemberId;
    }

    public void setCreatedMemberId(Integer createdMemberId) {
        this.createdMemberId = createdMemberId;
    }

    public String getCreateMemberName() {
        return createMemberName;
    }

    public void setCreateMemberName(String createMemberName) {
        this.createMemberName = createMemberName;
    }

    public Integer getReadCount() {
        return readCount;
    }

    public void setReadCount(Integer readCount) {
        this.readCount = readCount;
    }

    public Integer getCreateMemberScopeId() {
        return createMemberScopeId;
    }

    public void setCreateMemberScopeId(Integer createMemberScopeId) {
        this.createMemberScopeId = createMemberScopeId;
    }

    public String getAttachment() {
        return attachment;
    }

    public void setAttachment(String attachment) {
        this.attachment = attachment;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getCreateOrganizationName() {
        return createOrganizationName;
    }

    public void setCreateOrganizationName(String createOrganizationName) {
        this.createOrganizationName = createOrganizationName;
    }

    public Integer getImportance() {
        return importance;
    }

    public void setImportance(Integer importance) {
        this.importance = importance;
    }
}

