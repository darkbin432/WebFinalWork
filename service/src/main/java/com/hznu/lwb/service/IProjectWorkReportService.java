package com.hznu.lwb.service;


import com.hznu.lwb.model.result.ApiResult;

public interface IProjectWorkReportService {
    ApiResult getProjectWorkReport(String aoData, Integer year);
    ApiResult getYears();
    ApiResult toFile(Integer year);
    ApiResult exportReport(String aoData, Integer year);
}
