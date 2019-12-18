package com.hznu.lwb.service;

import com.hznu.lwb.model.param.FloatingPopulationReportParam;
import com.hznu.lwb.model.report.FloatingPopulationReport;
import com.hznu.lwb.model.result.ApiResult;

public interface IFloatingPopulationReportService {

    ApiResult insert(FloatingPopulationReport floatingPopulationReport);

    ApiResult delete(Integer id);

    ApiResult update(FloatingPopulationReport floatingPopulationReport);

    ApiResult selectOne(Integer id);

    ApiResult selectByCondition(String aoData, FloatingPopulationReportParam param);

    ApiResult selectChildrenStatus();

    ApiResult getYears();

    ApiResult exportReport(String aoData, FloatingPopulationReportParam param);

    ApiResult exportReportById(Integer id);
}
