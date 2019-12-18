package com.hele.hzjs.service;

import com.hele.hzjs.model.result.ApiResult;

public interface IVolunteerReportService {
    ApiResult getYears();
    ApiResult toFile(Integer year);
}
