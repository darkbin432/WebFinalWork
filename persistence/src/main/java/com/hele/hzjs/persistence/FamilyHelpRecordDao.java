package com.hele.hzjs.persistence;

import com.hele.hzjs.model.param.FamilyHelpRecordParam;
import com.hele.hzjs.model.report.FamilyHelpRecord;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface FamilyHelpRecordDao {

    Integer insertRecord(FamilyHelpRecord record);

    List<FamilyHelpRecord> getRecord(FamilyHelpRecordParam param);

    List<Integer> getYears();

    Integer getPageCount(FamilyHelpRecordParam param);
}
