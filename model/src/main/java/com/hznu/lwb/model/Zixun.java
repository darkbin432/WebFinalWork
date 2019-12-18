package com.hznu.lwb.model;

public class Zixun extends Entity {

    private String title;
    private Integer projectId;
    private Integer receiveObject;
    private Integer createdMemberId;
    private String createMemberName;
    private Integer createMemberScopeId;
    private String createOrganizationName;
    private Integer readCount;
    private Integer publishStatus;
    private String attachment;
    private String content;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Integer getProjectId() {
        return projectId;
    }

    public void setProjectId(Integer projectId) {
        this.projectId = projectId;
    }

    public Integer getReceiveObject() {
        return receiveObject;
    }

    public void setReceiveObject(Integer receiveObject) {
        this.receiveObject = receiveObject;
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

    public Integer getPublishStatus() {
        return publishStatus;
    }

    public void setPublishStatus(Integer publishStatus) {
        this.publishStatus = publishStatus;
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
        if (content != null && content != "") {
            setContentText(content);
        }
    }

    public String getCreateOrganizationName() {
        return createOrganizationName;
    }

    public void setCreateOrganizationName(String createOrganizationName) {
        this.createOrganizationName = createOrganizationName;
    }
}
