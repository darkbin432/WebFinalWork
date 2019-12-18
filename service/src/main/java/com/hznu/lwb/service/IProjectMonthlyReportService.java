package com.hznu.lwb.service;


import com.hznu.lwb.model.param.ProjectMonthlyReportParam;
import com.hznu.lwb.model.report.ProjectMonthlyReport;
import com.hznu.lwb.model.result.ApiResult;

/**
 * @author Xueht
 */
public interface IProjectMonthlyReportService {

    ApiResult insert(ProjectMonthlyReport projectMonthlyReport);

    ApiResult delete(String ids,Integer type);

    ApiResult getAll(String aoData, ProjectMonthlyReportParam projectMonthlyReportParam);

    ApiResult getChildStatus(String aoData, ProjectMonthlyReportParam projectMonthlyReportParam);

    ApiResult getChildTotalCount(String aoData, ProjectMonthlyReportParam projectMonthlyReportParam);

    ApiResult exportReport(String aoData, ProjectMonthlyReportParam projectMonthlyReportParam);

    ApiResult exportReportXQ(String aoData, ProjectMonthlyReportParam projectMonthlyReportParam);
}
