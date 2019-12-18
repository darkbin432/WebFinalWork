package com.hele.hzjs.service;

import com.hele.hzjs.model.param.WarmHeartReportParam;
import com.hele.hzjs.model.report.WarmHeartReport;
import com.hele.hzjs.model.result.ApiResult;

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
