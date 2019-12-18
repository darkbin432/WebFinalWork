package com.hznu.lwb.model;

public class Xuanjiao extends Entity{
    private String title;
    private String name;
    private String type;
    private Integer createMemberScopeId;
    private String createOrganizationName;
    private String attachment;
    private String content;
    private String video;
    private String pdf;
    private String pdfName;

    public Integer getCreateMemberScopeId() {
        return createMemberScopeId;
    }

    public void setCreateMemberScopeId(Integer createMemberScopeId) {
        this.createMemberScopeId = createMemberScopeId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
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
        if(content!=null && content!=""){
            setContentText(content);
        }
    }

    public String getVideo() {
        return video;
    }

    public void setVideo(String video) {
        this.video = video;
    }

    public String getPdf() {
        return pdf;
    }

    public void setPdf(String pdf) {
        this.pdf = pdf;
    }

    public String getPdfName() {
        return pdfName;
    }

    public void setPdfName(String pdfName) {
        this.pdfName = pdfName;
    }

    public String getCreateOrganizationName() {
        return createOrganizationName;
    }

    public void setCreateOrganizationName(String createOrganizationName) {
        this.createOrganizationName = createOrganizationName;
    }
}
