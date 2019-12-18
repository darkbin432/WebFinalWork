package com.hznu.lwb.service;

import com.hznu.lwb.model.param.WarmHeartReportParam;
import com.hznu.lwb.model.report.WarmHeartReport;
import com.hznu.lwb.model.result.ApiResult;

public interface IWarmHeartReportService {
    ApiResult insert(WarmHeartReport warmHeartReport);

    ApiResult update(WarmHeartReport warmHeartReport);

    ApiResult delete(Integer id);

    ApiResult selectOne(Integer id);

    ApiResult getLici(String aoData, WarmHeartReportParam param);

    ApiResult selectByCondition(String aoData, WarmHeartReportParam param);

    ApiResult getYears();

    ApiResult judge(WarmHeartReportParam param);

    ApiResult selectChildrenStatus(String aoData, WarmHeartReportParam param);

    ApiResult exportReportTotal(String aoData, WarmHeartReportParam param);

    ApiResult exportReportById(Integer id);
}
