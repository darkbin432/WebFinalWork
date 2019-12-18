package com.hele.hzjs.persistence;

import com.hele.hzjs.model.param.FloatingPopulationReportParam;
import com.hele.hzjs.model.report.FloatingPopulationReport;

import java.util.List;

public interface FloatingPopulationReportDao {

    int deleteByPrimaryKey(Integer id);

    List<Integer> getYears();

    int insert(FloatingPopulationReport record);

    int insertSelective(FloatingPopulationReport record);

    FloatingPopulationReport selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(FloatingPopulationReport record);

    int updateByPrimaryKey(FloatingPopulationReport record);

    List<FloatingPopulationReport> selectChildrenStatus();

    Integer selectByConditionPageCount(FloatingPopulationReportParam param);

    List<FloatingPopulationReport> selectByCondition(FloatingPopulationReportParam param);

    List<FloatingPopulationReport> selectByQu(FloatingPopulationReportParam param);

    FloatingPopulationReport selectTotal(FloatingPopulationReportParam param);
}