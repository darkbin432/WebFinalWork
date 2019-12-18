package com.hznu.lwb.service.impl;

import com.hznu.lwb.model.report.ProjectReport;
import com.hznu.lwb.model.result.ApiResult;
import com.hznu.lwb.persistence.ProjectReportDao;
import com.hznu.lwb.service.IProjectReportService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * @author Xueht
 */
@Service
public class ProjectReportService implements IProjectReportService {
    private Logger logger = LoggerFactory.getLogger(this.getClass());

    @Resource
    private ProjectReportDao projectReportDao;

    @Override
    public ApiResult insertProjectReportDao(ProjectReport projectReport) {
        return null;
    }

    @Override
    public ApiResult updateProjectReport(ProjectReport projectReport) {
        return null;
    }

    @Override
    public ApiResult getOneYearProjectReport(Integer year, Integer organizationId) {
        ApiResult apiResult = new ApiResult();
        try {
            ProjectReport projectReport = projectReportDao.getOneYearProjectReport(year, organizationId);
            if(projectReport != null){
                apiResult.success(projectReport);
            } else{
                apiResult.fail("项目报表获取失败");
            }
        } catch (Exception ex){
            logger.error(ex.getMessage(), ex);
            apiResult.fail("项目报表获取失败");
        }
        return apiResult;
    }
}
