package com.hznu.lwb.service;

import com.hznu.lwb.model.result.ApiResult;

public interface IVolunteerReportService {
    ApiResult getYears();
    ApiResult toFile(Integer year);
}
