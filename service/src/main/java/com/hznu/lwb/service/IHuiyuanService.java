package com.hznu.lwb.service;

import com.hznu.lwb.model.Huiyuan;
import com.hznu.lwb.model.VolunteerApprovalRecord;
import com.hznu.lwb.model.param.HuiyuanParam;
import com.hznu.lwb.model.result.ApiResult;

public interface IHuiyuanService {
    ApiResult insertHuiyuan(Huiyuan huiyuan);
    ApiResult deleteHuiyuan(Integer id);
    ApiResult updateHuiyuan(Huiyuan huiyuan);
    ApiResult selectHuiyuan(HuiyuanParam huiyuanParam);
    ApiResult getHuiyuan(Huiyuan huiyuan);
    ApiResult getActivities(String aoData, HuiyuanParam huiyuanParam);
    ApiResult selectAllHuiyuan(String aoData, HuiyuanParam huiyuanParam);
    ApiResult insertVolunteerRecord(VolunteerApprovalRecord record);
    ApiResult updateVolunteerRecord(VolunteerApprovalRecord record);
    ApiResult getVolunteerApprovalRecord(String aoData, HuiyuanParam huiyuanParam);

    ApiResult insertHuiyuan2(Huiyuan huiyuan);

    ApiResult getHuiyuanByCardNo(String cardNo);
}
