package com.hznu.lwb.persistence;

import java.util.List;

import com.hznu.lwb.model.Organization;
import com.hznu.lwb.model.param.OrganizationConstructionReportParam;
import com.hznu.lwb.model.report.OrganizationConstructionReport;
import com.sun.org.apache.xpath.internal.operations.Or;

/**
 * @author 斌
 */
public interface OrganizationConstructionReportDao {
    Integer insert(OrganizationConstructionReport record);

    Integer updateByPrimaryKeySelective(OrganizationConstructionReport record);

    List<Integer> getYears();

    Integer toFile(Integer year);

    Integer judgeFiled(Integer year);

    OrganizationConstructionReport getOne(OrganizationConstructionReportParam param);

    List<OrganizationConstructionReport> getLici(Integer scopeId);

    Integer selectChildrenStatusPageCount(OrganizationConstructionReportParam param);

    List<OrganizationConstructionReport> selectChildrenStatus(OrganizationConstructionReportParam param);

    OrganizationConstructionReport getShequji(Integer year);

    OrganizationConstructionReport getJiedaoji(Integer year);

    OrganizationConstructionReport getQuji(Integer year);

    OrganizationConstructionReport getShiji(Integer year);
}