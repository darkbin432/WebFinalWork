package com.hele.hzjs.persistence;

import com.hele.hzjs.model.param.ProjectMonthlyReportParam;
import com.hele.hzjs.model.report.ProjectMonthlyReport;

import java.util.List;

/**
 * @author Xueht
 */
public interface ProjectMonthlyReportDao {

    void insertMonthlyAlonePerson(ProjectMonthlyReport projectMonthlyReport);

    void insertMonthlyMentalityPerson(ProjectMonthlyReport projectMonthlyReport);

    void insertMonthlyChangePerson(ProjectMonthlyReport projectMonthlyReport);

    void insertMonthlyMigratePerson(ProjectMonthlyReport projectMonthlyReport);

    void insertMonthlyActivity(ProjectMonthlyReport projectMonthlyReport);

    void updateMonthlyActivity(ProjectMonthlyReport projectMonthlyReport);

    void deleteMonthlyAlonePerson(Integer id);

    void deleteMonthlyMentalityPerson(Integer id);

    void deleteMonthlyChangePerson(Integer id);

    void deleteMonthlyMigratePerson(Integer id);

    Integer getMonthlyAlonePersonPageCount(ProjectMonthlyReportParam projectMonthlyReportParam);

    Integer getOneMonthlyAlonePersonPage(ProjectMonthlyReportParam projectMonthlyReportParam);

    Integer getMonthlyAlonePersonTotalCount(ProjectMonthlyReportParam projectMonthlyReportParam);

    List<ProjectMonthlyReport> getMonthlyAlonePerson(ProjectMonthlyReportParam projectMonthlyReportParam);

    Integer getMonthlyMentalityPersonPageCount(ProjectMonthlyReportParam projectMonthlyReportParam);

    Integer getOneMonthlyMentalityPersonPage(ProjectMonthlyReportParam projectMonthlyReportParam);

    Integer getMonthlyMentalityPersonTotalCount(ProjectMonthlyReportParam projectMonthlyReportParam);

    List<ProjectMonthlyReport> getMonthlyMentalityPerson(ProjectMonthlyReportParam projectMonthlyReportParam);

    Integer getMonthlyChangePersonPageCount(ProjectMonthlyReportParam projectMonthlyReportParam);

    Integer getOneMonthlyChangePersonPage(ProjectMonthlyReportParam projectMonthlyReportParam);

    Integer getMonthlyChangePersonTotalCount(ProjectMonthlyReportParam projectMonthlyReportParam);

    List<ProjectMonthlyReport> getMonthlyChangePerson(ProjectMonthlyReportParam projectMonthlyReportParam);

    Integer getMonthlyMigratePersonPageCount(ProjectMonthlyReportParam projectMonthlyReportParam);

    Integer getOneMonthlyMigratePersonPage(ProjectMonthlyReportParam projectMonthlyReportParam);

    Integer getMonthlyMigratePersonTotalCount(ProjectMonthlyReportParam projectMonthlyReportParam);

    List<ProjectMonthlyReport> getMonthlyMigratePerson(ProjectMonthlyReportParam projectMonthlyReportParam);

    ProjectMonthlyReport getMonthlyActivity(ProjectMonthlyReportParam projectMonthlyReportParam);

    Integer getChildOrganizationCount(ProjectMonthlyReportParam projectMonthlyReportParam);

    List<ProjectMonthlyReport> selectChildOrganization(ProjectMonthlyReportParam projectMonthlyReportParam);
}
