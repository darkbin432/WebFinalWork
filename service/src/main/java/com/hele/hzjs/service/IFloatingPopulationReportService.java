package com.hele.hzjs.service;

import com.hele.hzjs.model.param.FloatingPopulationReportParam;
import com.hele.hzjs.model.report.FloatingPopulationReport;
import com.hele.hzjs.model.result.ApiResult;

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
