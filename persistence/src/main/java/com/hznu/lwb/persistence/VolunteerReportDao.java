package com.hznu.lwb.persistence;

import com.hznu.lwb.model.report.HuiyuanReport;

import java.util.List;

public interface VolunteerReportDao {
    Integer insertVolunteerReport(HuiyuanReport huiyuanReport);

    List<HuiyuanReport> getVolunteerReport(Integer year);

    List<Integer> getYears();

    Integer judgeFiled(Integer year);

    List<HuiyuanReport> getVolunteerReportByTable(Integer year);

    HuiyuanReport getTotalCount(Integer year);

}
