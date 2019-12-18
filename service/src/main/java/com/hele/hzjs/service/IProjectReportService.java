package com.hele.hzjs.service;

import com.hele.hzjs.model.report.ProjectReport;
import com.hele.hzjs.model.result.ApiResult;

/**
 * @author Xueht
 */
public interface IProjectReportService {
    ApiResult insertProjectReportDao(ProjectReport projectReport);
    ApiResult updateProjectReport(ProjectReport projectReport);
    ApiResult getOneYearProjectReport(Integer year, Integer organizationId);
}
