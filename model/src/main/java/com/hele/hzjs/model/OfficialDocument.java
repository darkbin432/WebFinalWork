package com.hele.hzjs.model;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.sql.Date;

/**
 * @author 
 */
public class OfficialDocument extends Entity{
    private Integer reportPersonId;

    private String zhusongjg;

    private String danweiyj;

    private String shenheyj;

    private String fawenh;

    private String zhubancs;

    private String title;

    private String contentReal;

    private String contentSize;

    private String content;

    private String file;

    private String fileSize;

    private String fileReal;

    private String chaosongjg;

    private String zhutic;

    private String chuzhanghq;

    private String nigaor;

    private String jiaodui;

    private Integer gongyin;

    @JsonFormat(pattern = "yyyy-MM-dd",timezone="GMT+8")
    private Date yinfasj;

    public Integer getReportPersonId() {
        return reportPersonId;
    }

    public void setReportPersonId(Integer reportPersonId) {
        this.reportPersonId = reportPersonId;
    }

    public String getZhusongjg() {
        return zhusongjg;
    }

    public void setZhusongjg(String zhusongjg) {
        this.zhusongjg = zhusongjg;
    }

    public String getDanweiyj() {
        return danweiyj;
    }

    public void setDanweiyj(String danweiyj) {
        this.danweiyj = danweiyj;
    }

    public String getShenheyj() {
        return shenheyj;
    }

    public void setShenheyj(String shenheyj) {
        this.shenheyj = shenheyj;
    }

    public String getFawenh() {
        return fawenh;
    }

    public void setFawenh(String fawenh) {
        this.fawenh = fawenh;
    }

    public String getZhubancs() {
        return zhubancs;
    }

    public void setZhubancs(String zhubancs) {
        this.zhubancs = zhubancs;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContentReal() {
        return contentReal;
    }

    public void setContentReal(String contentReal) {
        this.contentReal = contentReal;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getFile() {
        return file;
    }

    public void setFile(String file) {
        this.file = file;
    }

    public String getFileReal() {
        return fileReal;
    }

    public void setFileReal(String fileReal) {
        this.fileReal = fileReal;
    }

    public String getChaosongjg() {
        return chaosongjg;
    }

    public void setChaosongjg(String chaosongjg) {
        this.chaosongjg = chaosongjg;
    }

    public String getZhutic() {
        return zhutic;
    }

    public void setZhutic(String zhutic) {
        this.zhutic = zhutic;
    }

    public String getChuzhanghq() {
        return chuzhanghq;
    }

    public void setChuzhanghq(String chuzhanghq) {
        this.chuzhanghq = chuzhanghq;
    }

    public String getNigaor() {
        return nigaor;
    }

    public void setNigaor(String nigaor) {
        this.nigaor = nigaor;
    }

    public String getJiaodui() {
        return jiaodui;
    }

    public void setJiaodui(String jiaodui) {
        this.jiaodui = jiaodui;
    }

    public Integer getGongyin() {
        return gongyin;
    }

    public void setGongyin(Integer gongyin) {
        this.gongyin = gongyin;
    }

    public Date getYinfasj() {
        return yinfasj;
    }

    public void setYinfasj(Date yinfasj) {
        this.yinfasj = yinfasj;
    }

    public String getContentSize() {
        return contentSize;
    }

    public void setContentSize(String contentSize) {
        this.contentSize = contentSize;
    }

    public String getFileSize() {
        return fileSize;
    }

    public void setFileSize(String fileSize) {
        this.fileSize = fileSize;
    }
}