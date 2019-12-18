package com.hznu.lwb.persistence;

import com.hznu.lwb.model.Huiyuan;
import com.hznu.lwb.model.report.HuiyuanReport;
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
