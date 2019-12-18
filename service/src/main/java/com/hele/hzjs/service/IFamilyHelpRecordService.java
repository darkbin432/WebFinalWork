package com.hele.hzjs.service;

import com.hele.hzjs.model.param.FamilyHelpRecordParam;
import com.hele.hzjs.model.report.FamilyHelpRecord;
import com.hele.hzjs.model.result.ApiResult;

public interface IFamilyHelpRecordService {
    ApiResult getFamilyHelpRecord(String aoData, FamilyHelpRecordParam param);

    ApiResult getYears();

    ApiResult insertRecord(FamilyHelpRecord record);
}
