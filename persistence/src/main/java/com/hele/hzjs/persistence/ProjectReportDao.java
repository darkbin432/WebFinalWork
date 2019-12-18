package com.hele.hzjs.persistence;


import com.hele.hzjs.model.report.ProjectReport;
import org.apache.ibatis.annotations.Param;

/**
 * @author Xueht
 */

public interface ProjectReportDao {
    void insertProjectReportDao(ProjectReport projectReport);
    void updateProjectReport(ProjectReport projectReport);
    ProjectReport getOneYearProjectReport(@Param("year") Integer year, @Param("organizationId") Integer organizationId);
    Integer getProjectActivityCount(@Param("projectId") Integer projectId, @Param("organizationId") Integer organizationId, @Param("year") Integer year);
    Integer getProjectPeopleCount(@Param("projectId") Integer projectId, @Param("organizationId") Integer organizationId, @Param("year") Integer year);
}
