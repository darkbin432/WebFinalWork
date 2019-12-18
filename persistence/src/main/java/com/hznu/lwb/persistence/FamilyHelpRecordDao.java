package com.hznu.lwb.persistence;

import com.hznu.lwb.model.param.FamilyHelpRecordParam;
import com.hznu.lwb.model.report.FamilyHelpRecord;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface FamilyHelpRecordDao {

    Integer insertRecord(FamilyHelpRecord record);

    List<FamilyHelpRecord> getRecord(FamilyHelpRecordParam param);

    List<Integer> getYears();

    Integer getPageCount(FamilyHelpRecordParam param);
}
