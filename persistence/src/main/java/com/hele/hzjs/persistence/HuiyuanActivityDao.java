package com.hele.hzjs.persistence;

import com.hele.hzjs.model.Huiyuan;
import com.hele.hzjs.model.HuiyuanActivity;
import com.hele.hzjs.model.VolunteerApprovalRecord;
import com.hele.hzjs.model.param.HuiyuanParam;

import java.util.List;

public interface HuiyuanActivityDao {
    int insert(HuiyuanActivity activity);

    void cancel(HuiyuanActivity huiyuanActivity);

    void attend(HuiyuanActivity huiyuanActivity);

    HuiyuanActivity selectOne(HuiyuanActivity huiyuanActivity);

    Integer getCurrentHuiyuanCount(Integer id);

    Integer getCurrentVolunteerCount(Integer id);
}