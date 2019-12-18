package com.hele.hzjs.persistence;

import com.hele.hzjs.model.Huiyuan;
import com.hele.hzjs.model.report.HuiyuanReport;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface HuiyuanReportDao {
    Integer insertHuiyuanReport(HuiyuanReport huiyuanReport);

    List<HuiyuanReport> getHuiyuanReport(Integer year);

    List<Integer> getYears();

    Integer judgeFiled(Integer year);

    List<HuiyuanReport> getHuiyuanReportByTable(Integer year);

    HuiyuanReport getTotalCount(Integer year);

}
