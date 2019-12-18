package com.hznu.lwb.service;

import com.hznu.lwb.model.report.ProjectReport;
import com.hznu.lwb.model.result.ApiResult;

/**
 * @author Xueht
 */
public interface IProjectReportService {
    ApiResult insertProjectReportDao(ProjectReport projectReport);
    ApiResult updateProjectReport(ProjectReport projectReport);
    ApiResult getOneYearProjectReport(Integer year, Integer organizationId);
}
