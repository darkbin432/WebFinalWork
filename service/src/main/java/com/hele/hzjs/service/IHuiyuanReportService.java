package com.hele.hzjs.service;

import com.hele.hzjs.model.report.HuiyuanReport;
import com.hele.hzjs.model.result.ApiResult;

public interface IHuiyuanReportService {
    ApiResult getHuiyuanReport(String aoData, Integer year, Integer volunteerStatus);
    ApiResult getYears();
    ApiResult toFile(Integer year);
    ApiResult exportReport(String aoData, Integer year, Integer volunteerStatus);
}
