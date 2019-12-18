package com.hznu.lwb.model.param;

/**
 * @Auther: Xueht
 * @Date: Create in 21:35 2019/3/26
 */
public class ApprovalParam extends BasicParam {
    private Integer approvalId;
    private Integer userType;

    public Integer getApprovalId() {
        return approvalId;
    }

    public void setApprovalId(Integer approvalId) {
        this.approvalId = approvalId;
    }

    public Integer getUserType() {
        return userType;
    }

    public void setUserType(Integer userType) {
        this.userType = userType;
    }
}
