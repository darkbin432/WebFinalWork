package com.hele.hzjs.api;

import com.hele.hzjs.model.param.ProjectMonthlyReportParam;
import com.hele.hzjs.model.report.ProjectMonthlyReport;
import com.hele.hzjs.model.result.ApiResult;
import com.hele.hzjs.service.IProjectMonthlyReportService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

/**
 * @author Xueht
 */
@Controller
@RequestMapping("/api")
public class ProjectMonthlyReportController {
    @Resource
    private IProjectMonthlyReportService projectMonthlyReportService;

    @RequestMapping(value = "/insertProjectMonthlyReport", method = RequestMethod.POST)
    @ResponseBody
    public ApiResult insertProjectMonthlyReport(@RequestBody ProjectMonthlyReport projectMonthlyReport) {
        return projectMonthlyReportService.insert(projectMonthlyReport);
    }

    @RequestMapping(value = "/getAllProjectMonthlyReport", method = RequestMethod.GET)
    @ResponseBody
    public ApiResult getAllProjectMonthlyReport(String aoData, ProjectMonthlyReportParam projectMonthlyReportParam) {
        return projectMonthlyReportService.getAll(aoData, projectMonthlyReportParam);
    }

    @RequestMapping(value = "/exportProjectMonthlyReport", method = RequestMethod.GET)
    @ResponseBody
    public ApiResult exportProjectMonthlyReport(String aoData, ProjectMonthlyReportParam projectMonthlyReportParam) {
        return projectMonthlyReportService.exportReport(aoData, projectMonthlyReportParam);
    }

    @RequestMapping(value = "/exportProjectMonthlyReportXQ", method = RequestMethod.GET)
    @ResponseBody
    public ApiResult exportProjectMonthlyReportXQ(String aoData, ProjectMonthlyReportParam projectMonthlyReportParam) {
        return projectMonthlyReportService.exportReportXQ(aoData, projectMonthlyReportParam);
    }

    @RequestMapping(value = "/getProjectMonthlyReportChildStatus", method = RequestMethod.GET)
    @ResponseBody
    public ApiResult getProjectMonthlyReportChildStatus(String aoData, ProjectMonthlyReportParam projectMonthlyReportParam) {
        return projectMonthlyReportService.getChildStatus(aoData, projectMonthlyReportParam);
    }

    @RequestMapping(value = "/getProjectMonthlyReportTotalCount", method = RequestMethod.GET)
    @ResponseBody
    public ApiResult getProjectMonthlyReportTotalCount(String aoData, ProjectMonthlyReportParam projectMonthlyReportParam) {
        return projectMonthlyReportService.getChildTotalCount(aoData, projectMonthlyReportParam);
    }

    @RequestMapping(value = "/deleteProjectMonthlyReport", method = RequestMethod.POST)
    @ResponseBody
    public ApiResult deleteProjectMonthlyReport(String ids, Integer type) {
        return projectMonthlyReportService.delete(ids, type);
    }

}
