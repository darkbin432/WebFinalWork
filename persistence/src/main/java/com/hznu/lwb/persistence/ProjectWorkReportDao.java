package com.hznu.lwb.persistence;

import com.hznu.lwb.model.report.ProjectWorkReport;

import java.util.List;

public interface ProjectWorkReportDao {
    Integer insertProjectWorkReport(ProjectWorkReport projectWorkReport);

    List<ProjectWorkReport> getProjectWorkReport(Integer year);

    ProjectWorkReport getProjectWorkReportTotal(Integer year);

    List<Integer> getYears();

    Integer judgeFiled(Integer year);

    List<ProjectWorkReport> getProjectWorkReportByTable(Integer year);

    ProjectWorkReport getProjectWorkReportTotalByTable(Integer year);

}
