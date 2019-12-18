package com.hznu.lwb.api;

import com.hznu.lwb.model.param.*;
import com.hznu.lwb.model.report.FloatingPopulationReport;
import com.hznu.lwb.model.report.OrganizationConstructionReport;
import com.hznu.lwb.model.report.WarmHeartReport;
import com.hznu.lwb.model.report.YearReport;
import com.hznu.lwb.model.result.ApiResult;
import com.hznu.lwb.service.*;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.time.Year;

/**
 * @author 斌
 */

@Controller
@RequestMapping("/api")
public class ReportController {

    @Resource
    private IHuiyuanReportService huiyuanReportService;

    @Resource
    private IVolunteerReportService volunteerReportService;

    @Resource
    private IProjectWorkReportService projectWorkReportService;

    @Resource
    private IYearReportService yearReportService;

    @Resource
    private IOrganizationConstructionReportService organizationConstructionReportService;

    @Resource
    private IFamilyHelpRecordService familyHelpRecordService;

    @Resource
    private IFloatingPopulationReportService floatingPopulationReportService;

    @Resource
    private IWarmHeartReportService warmHeartReportService;

    @RequestMapping(value = "/getHuiyuanReport",method = RequestMethod.GET)
    @ResponseBody
    public ApiResult getHuiyuanReport(String aoData, Integer year, Integer volunteerStatus){
        ApiResult apiResult = huiyuanReportService.getHuiyuanReport(aoData, year, volunteerStatus);
        return apiResult;
    }

    @RequestMapping(value = "/exportHuiyuanReport",method = RequestMethod.GET)
    @ResponseBody
    public ApiResult exportHuiyuanReport(String aoData, Integer year, Integer volunteerStatus){
        ApiResult apiResult = huiyuanReportService.exportReport(aoData, year, volunteerStatus);
        return apiResult;
    }

    @RequestMapping(value = "/getHuiyuanReportYears",method = RequestMethod.GET)
    @ResponseBody
    public ApiResult getHuiyuanReportYears(){
        return huiyuanReportService.getYears();
    }

    @RequestMapping(value = "/toFileHuiyuanReport",method = RequestMethod.GET)
    @ResponseBody
    public ApiResult toFileHuiyuanReport(Integer year){
        return huiyuanReportService.toFile(year);
    }

    @RequestMapping(value = "/getVolunteerReportYears",method = RequestMethod.GET)
    @ResponseBody
    public ApiResult getVolunteerReportYears(){
        return volunteerReportService.getYears();
    }

    @RequestMapping(value = "/toFileVolunteerReport",method = RequestMethod.GET)
    @ResponseBody
    public ApiResult toFileVolunteerReport(Integer year){
        return volunteerReportService.toFile(year);
    }

    @RequestMapping(value = "/getProjectWorkReport",method = RequestMethod.GET)
    @ResponseBody
    public ApiResult getProjectWorkReport(String  aoData, Integer year){
        ApiResult apiResult = projectWorkReportService.getProjectWorkReport(aoData, year);
        return apiResult;
    }

    @RequestMapping(value = "/exportProjectWorkReport",method = RequestMethod.GET)
    @ResponseBody
    public ApiResult exportProjectWorkReport(String  aoData, Integer year){
        ApiResult apiResult = projectWorkReportService.exportReport(aoData, year);
        return apiResult;
    }

    @RequestMapping(value = "/getProjectWorkReportYears",method = RequestMethod.GET)
    @ResponseBody
    public ApiResult getProjectWorkReportYears(){
        return projectWorkReportService.getYears();
    }

    @RequestMapping(value = "/toFileProjectWorkReport",method = RequestMethod.GET)
    @ResponseBody
    public ApiResult toFileProjectWorkReport(Integer year){
        return projectWorkReportService.toFile(year);
    }

    @RequestMapping(value = "/getOrganizationConstructionReportYears",method = RequestMethod.GET)
    @ResponseBody
    public ApiResult getOrganizationConstructionReportYears(){
        return organizationConstructionReportService.getYears();
    }

    @RequestMapping(value = "/getOrganizationConstructionReportChildrenStatus",method = RequestMethod.GET)
    @ResponseBody
    public ApiResult getOrganizationConstructionReportChildrenStatus(String  aoData, OrganizationConstructionReportParam param){
        return organizationConstructionReportService.selectChildrenStatus(aoData, param);
    }

    @RequestMapping(value = "/getOrganizationConstructionReport",method = RequestMethod.GET)
    @ResponseBody
    public ApiResult getOrganizationConstructionReport(OrganizationConstructionReportParam param){
        ApiResult apiResult = organizationConstructionReportService.getOrganizationConstructionReport(param);
        return apiResult;
    }

    @RequestMapping(value = "/insertOrganizationConstructionReport" ,method = RequestMethod.POST)
    @ResponseBody
    public ApiResult insertOrganizationConstructionReport(OrganizationConstructionReport record){
        return organizationConstructionReportService.insert(record);
    }

    @RequestMapping(value = "/updateOrganizationConstructionReport" ,method = RequestMethod.POST)
    @ResponseBody
    public ApiResult updateOrganizationConstructionReport(OrganizationConstructionReport record){
        return organizationConstructionReportService.update(record);
    }

    @RequestMapping(value = "/toFileOrganizationConstructionReport" ,method = RequestMethod.GET)
    @ResponseBody
    public ApiResult toFileOrganizationConstructionReport(Integer year){
        return organizationConstructionReportService.toFile(year);
    }

    @RequestMapping(value = "/exportOrganizationConstructionReport" ,method = RequestMethod.GET)
    @ResponseBody
    public ApiResult exportOrganizationConstructionReport(OrganizationConstructionReportParam param){
        return organizationConstructionReportService.exportReport(param);
    }

    @RequestMapping(value = "/getYearReportYears",method = RequestMethod.GET)
    @ResponseBody
    public ApiResult getYearReportYears(){
        return yearReportService.getYears();
    }

    @RequestMapping(value = "/insertYearReport" ,method = RequestMethod.POST)
    @ResponseBody
    public ApiResult insertYearReport(YearReport record){
        return yearReportService.insert(record);
    }

    @RequestMapping(value = "/updateYearReport" ,method = RequestMethod.POST)
    @ResponseBody
    public ApiResult updateYearReport(YearReport record){
        return yearReportService.update(record);
    }

    @RequestMapping(value = "/getYearReport",method = RequestMethod.GET)
    @ResponseBody
    public ApiResult getYearReport(YearReportParam param){
        return yearReportService.getYearReport(param);
    }

    @RequestMapping(value = "/exportYearReport",method = RequestMethod.GET)
    @ResponseBody
    public ApiResult exportYearReport(YearReportParam param){
        return yearReportService.exportReport(param);
    }

    @RequestMapping(value = "/getYearReportChildrenStatus",method = RequestMethod.GET)
    @ResponseBody
    public ApiResult getYearReportChildrenStatus(String  aoData, YearReportParam param){
        return yearReportService.selectChildrenStatus(aoData, param);
    }

    @RequestMapping(value = "/toFileYearReport" ,method = RequestMethod.GET)
    @ResponseBody
    public ApiResult toFileYearReport(Integer year){
        return yearReportService.toFile(year);
    }

    @RequestMapping(value = "/getFamilyHelpRecord", method = RequestMethod.GET)
    @ResponseBody
    public ApiResult getFamilyHelpRecord(String aoData, FamilyHelpRecordParam param){
        return familyHelpRecordService.getFamilyHelpRecord(aoData, param);
    }

    @RequestMapping(value = "/getFamilyHelpRecordYears", method = RequestMethod.GET)
    @ResponseBody
    public ApiResult getFamilyHelpRecordYears(){
        return familyHelpRecordService.getYears();
    }

    @RequestMapping(value = "/insertFloatingPopulationReport",method = RequestMethod.POST)
    @ResponseBody
    public ApiResult insertFloatingPopulationReport(FloatingPopulationReport floatingPopulationReport){
        return floatingPopulationReportService.insert(floatingPopulationReport);
    }

    @RequestMapping(value = "/updateFloatingPopulationReport",method = RequestMethod.POST)
    @ResponseBody
    public ApiResult updateFloatingPopulationReport(FloatingPopulationReport floatingPopulationReport){
        return floatingPopulationReportService.update(floatingPopulationReport);
    }

    @RequestMapping(value = "/getFloatingPopulationReportYears", method = RequestMethod.GET)
    @ResponseBody
    public ApiResult getFloatingPopulationReportYears(){
        return floatingPopulationReportService.getYears();
    }

    @RequestMapping(value = "/getFloatingPopulationReport",method = RequestMethod.GET)
    @ResponseBody
    public ApiResult getFloatingPopulationReport(String aoData, FloatingPopulationReportParam param){
        return floatingPopulationReportService.selectByCondition(aoData, param);
    }

    @RequestMapping(value = "/exportFloatingPopulationReportTotal",method = RequestMethod.GET)
    @ResponseBody
    public ApiResult exportFloatingPopulationReportTotal(String aoData, FloatingPopulationReportParam param){
        return floatingPopulationReportService.exportReport(aoData, param);
    }

    @RequestMapping(value = "/exportFloatingPopulationReport",method = RequestMethod.GET)
    @ResponseBody
    public ApiResult exportFloatingPopulationReport(Integer id){
        return floatingPopulationReportService.exportReportById(id);
    }

    @RequestMapping(value = "/getOneFloatingPopulationReport",method = RequestMethod.GET)
    @ResponseBody
    public ApiResult getOneFloatingPopulationReport(Integer id){
        return floatingPopulationReportService.selectOne(id);
    }

    @RequestMapping(value = "/getFloatingPopulationReportChildrenStatus",method = RequestMethod.GET)
    @ResponseBody
    public ApiResult getFloatingPopulationReportChildrenStatus(){
        return floatingPopulationReportService.selectChildrenStatus();
    }

    @RequestMapping(value = "/insertWarmHeartReport",method = RequestMethod.POST)
    @ResponseBody
    public ApiResult insertWarmHeartReport(WarmHeartReport warmHeartReport){
        return warmHeartReportService.insert(warmHeartReport);
    }

    @RequestMapping(value = "/updateWarmHeartReport",method = RequestMethod.POST)
    @ResponseBody
    public ApiResult updateWarmHeartReport(WarmHeartReport warmHeartReport){
        return warmHeartReportService.update(warmHeartReport);
    }

    @RequestMapping(value = "/getWarmHeartReportYears", method = RequestMethod.GET)
    @ResponseBody
    public ApiResult getWarmHeartReportYears(){
        return warmHeartReportService.getYears();
    }

    @RequestMapping(value = "/getWarmHeartReport",method = RequestMethod.GET)
    @ResponseBody
    public ApiResult getWarmHeartReport(String aoData, WarmHeartReportParam param){
        return warmHeartReportService.selectByCondition(aoData, param);
    }

    @RequestMapping(value = "/exportWarmHeartReport",method = RequestMethod.GET)
    @ResponseBody
    public ApiResult exportWarmHeartReport(String aoData, WarmHeartReportParam param){
        return warmHeartReportService.exportReportTotal(aoData, param);
    }

    @RequestMapping(value = "/getOneWarmHeartReport",method = RequestMethod.GET)
    @ResponseBody
    public ApiResult getOneWarmHeartReport(Integer id){
        return warmHeartReportService.selectOne(id);
    }

    @RequestMapping(value = "/exportOneWarmHeartReport",method = RequestMethod.GET)
    @ResponseBody
    public ApiResult exportOneWarmHeartReport(Integer id){
        return warmHeartReportService.exportReportById(id);
    }

    @RequestMapping(value = "/getWarmHeartReportChildrenStatus",method = RequestMethod.GET)
    @ResponseBody
    public ApiResult getWarmHeartReportChildrenStatus(String aoData, WarmHeartReportParam param){
        return warmHeartReportService.selectChildrenStatus(aoData, param);
    }

    @RequestMapping(value = "/getWarmHeartReportLici",method = RequestMethod.GET)
    @ResponseBody
    public ApiResult getWarmHeartReportLici(String aoData, WarmHeartReportParam param){
        return warmHeartReportService.getLici(aoData, param);
    }

    @RequestMapping(value = "/judgeWarmHeartReport",method = RequestMethod.GET)
    @ResponseBody
    public ApiResult judgeWarmHeartReport(WarmHeartReportParam param){
        return warmHeartReportService.judge(param);
    }

}
