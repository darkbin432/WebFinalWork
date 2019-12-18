package com.hznu.lwb.service;

import com.hznu.lwb.model.param.YearReportParam;
import com.hznu.lwb.model.report.YearReport;
import com.hznu.lwb.model.result.ApiResult;

public interface IYearReportService {
    ApiResult insert(YearReport record);

    ApiResult update(YearReport record);

    ApiResult getYears();

    ApiResult selectChildrenStatus(String  aoData, YearReportParam param);

    ApiResult getYearReport(YearReportParam param);

    ApiResult toFile(Integer year);

    ApiResult exportReport(YearReportParam param);
}
