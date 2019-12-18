package com.hznu.lwb.service;

import com.hznu.lwb.model.param.FamilyHelpRecordParam;
import com.hznu.lwb.model.report.FamilyHelpRecord;
import com.hznu.lwb.model.result.ApiResult;

public interface IFamilyHelpRecordService {
    ApiResult getFamilyHelpRecord(String aoData, FamilyHelpRecordParam param);

    ApiResult getYears();

    ApiResult insertRecord(FamilyHelpRecord record);
}
