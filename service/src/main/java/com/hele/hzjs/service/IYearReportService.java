package com.hele.hzjs.service;

import com.hele.hzjs.model.param.YearReportParam;
import com.hele.hzjs.model.report.YearReport;
import com.hele.hzjs.model.result.ApiResult;

public interface IYearReportService {
    ApiResult insert(YearReport record);

    ApiResult update(YearReport record);

    ApiResult getYears();

    ApiResult selectChildrenStatus(String  aoData, YearReportParam param);

    ApiResult getYearReport(YearReportParam param);

    ApiResult toFile(Integer year);

    ApiResult exportReport(YearReportParam param);
}
