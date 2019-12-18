package com.hele.hzjs.persistence;

import java.util.List;

import com.hele.hzjs.model.param.YearReportParam;
import com.hele.hzjs.model.report.YearReport;
import org.apache.ibatis.annotations.Param;

public interface YearReportDao {

    Integer insert(YearReport record);

    List<Integer> getYears();

    YearReport selectByYear(Integer year);

    YearReport selectByQu(YearReportParam param);

    Integer updateByPrimaryKeySelective(YearReport record);

    Integer selectChildrenStatusPageCount(YearReportParam param);

    List<YearReport> selectChildrenStatus(YearReportParam param);

    YearReport getOne(YearReportParam param);

    List<YearReport> getLici(Integer scopeId);

    Integer judgeFiled(Integer year);

    Integer toFile(Integer year);
}