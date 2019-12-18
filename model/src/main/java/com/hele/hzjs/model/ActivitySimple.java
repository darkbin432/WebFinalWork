package com.hele.hzjs.model;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.util.Date;

public class ActivitySimple extends Entity {

    // 标题
    private String title;
    private String type="toActivity";
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm", timezone = "GMT+8")
    private Date startTime;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm", timezone = "GMT+8")
    private Date endTime;

    public ActivitySimple(Activity activity) {
        if (activity != null) {
            this.setId(activity.getId());
            this.title = activity.getTitle();
            this.startTime = activity.getStartTime();
            this.endTime = activity.getEndTime();
        }
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }


    public Date getStartTime() {
        return startTime;
    }

    public void setStartTime(Date startTime) {
        this.startTime = startTime;
    }

    public Date getEndTime() {
        return endTime;
    }

    public void setEndTime(Date endTime) {
        this.endTime = endTime;
    }


}
