package com.hele.hzjs.service;

import com.hele.hzjs.model.param.OrganizationConstructionReportParam;
import com.hele.hzjs.model.report.OrganizationConstructionReport;
import com.hele.hzjs.model.result.ApiResult;

/**
 * @author 斌
 */
public interface IOrganizationConstructionReportService {
    ApiResult insert(OrganizationConstructionReport record);

    ApiResult update(OrganizationConstructionReport record);

    ApiResult getYears();

    ApiResult selectChildrenStatus(String  aoData, OrganizationConstructionReportParam param);

    ApiResult getOrganizationConstructionReport(OrganizationConstructionReportParam param);

    ApiResult toFile(Integer year);

    ApiResult exportReport(OrganizationConstructionReportParam param);
}
