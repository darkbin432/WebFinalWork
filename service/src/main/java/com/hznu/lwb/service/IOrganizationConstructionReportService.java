package com.hznu.lwb.service;

import com.hznu.lwb.model.param.OrganizationConstructionReportParam;
import com.hznu.lwb.model.report.OrganizationConstructionReport;
import com.hznu.lwb.model.result.ApiResult;

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
