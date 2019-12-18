package com.hznu.lwb.persistence;

import com.hznu.lwb.model.Huiyuan;
import com.hznu.lwb.model.HuiyuanActivity;
import com.hznu.lwb.model.VolunteerApprovalRecord;
import com.hznu.lwb.model.param.HuiyuanParam;

import java.util.List;

public interface HuiyuanActivityDao {
    int insert(HuiyuanActivity activity);

    void cancel(HuiyuanActivity huiyuanActivity);

    void attend(HuiyuanActivity huiyuanActivity);

    HuiyuanActivity selectOne(HuiyuanActivity huiyuanActivity);

    Integer getCurrentHuiyuanCount(Integer id);

    Integer getCurrentVolunteerCount(Integer id);
}