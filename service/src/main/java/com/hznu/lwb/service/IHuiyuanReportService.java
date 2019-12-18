package com.hznu.lwb.service;

import com.hznu.lwb.model.report.HuiyuanReport;
import com.hznu.lwb.model.result.ApiResult;

public interface IHuiyuanReportService {
    ApiResult getHuiyuanReport(String aoData, Integer year, Integer volunteerStatus);
    ApiResult getYears();
    ApiResult toFile(Integer year);
    ApiResult exportReport(String aoData, Integer year, Integer volunteerStatus);
}
