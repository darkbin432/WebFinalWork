package com.hele.hzjs.persistence;

import com.hele.hzjs.model.param.WarmHeartReportParam;
import com.hele.hzjs.model.report.WarmHeartReport;

import java.util.List;
import java.util.Queue;

public interface WarmHeartReportDao {

    int deleteByPrimaryKey(Integer id);

    int insert(WarmHeartReport record);

    int insertSelective(WarmHeartReport record);

    WarmHeartReport selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(WarmHeartReport record);

    int updateByPrimaryKey(WarmHeartReport record);

    Integer getLiciPageCount(WarmHeartReportParam param);

    List<WarmHeartReport> getLici(WarmHeartReportParam param);

    List<Integer> getYears();

    WarmHeartReport judge(WarmHeartReportParam param);

    List<WarmHeartReport> selectByShi(WarmHeartReportParam param);

    WarmHeartReport selectByShiTotal(WarmHeartReportParam param);

    List<WarmHeartReport> selectByQu(WarmHeartReportParam param);

    WarmHeartReport selectByQuTotal(WarmHeartReportParam param);

    List<WarmHeartReport> selectByJiedao(WarmHeartReportParam param);

    WarmHeartReport selectByJiedaoTotal(WarmHeartReportParam param);

    Integer selectChildrenStatusPageCount(WarmHeartReportParam param);

    List<WarmHeartReport> selectChildrenStatus(WarmHeartReportParam param);
}