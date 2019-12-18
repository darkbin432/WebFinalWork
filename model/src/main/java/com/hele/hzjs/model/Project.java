package com.hele.hzjs.model;

/**
 * @Auther: Xueht
 * @Date: Create in 20:27 2019/3/25
 */
public class Project extends Entity {
    private String name;
    private String description;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
