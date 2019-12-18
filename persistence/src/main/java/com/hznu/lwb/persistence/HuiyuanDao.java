package com.hznu.lwb.persistence;

import com.hznu.lwb.model.Huiyuan;
import com.hznu.lwb.model.HuiyuanActivity;
import com.hznu.lwb.model.VolunteerApprovalRecord;
import com.hznu.lwb.model.param.HuiyuanParam;
import org.omg.PortableInterceptor.INACTIVE;

import java.util.List;

public interface HuiyuanDao {

    int deleteByPrimaryKey(Integer id);

    int insert(Huiyuan record);

    int insertSelective(Huiyuan record);

    Huiyuan selectByPrimaryKey(Integer id);

    List<Huiyuan> selectByCondition(HuiyuanParam record);

    List<Huiyuan> selectByCondition2(HuiyuanParam record);

    List<Huiyuan> selectByConditionWhenVolunteerStatus3(Huiyuan record);

    int updateByPrimaryKeySelective(Huiyuan record);

    int updateByPrimaryKeyWithBLOBs(Huiyuan record);

    int updateByPrimaryKey(Huiyuan record);

    Integer getHuiyuanPageCount(HuiyuanParam record);

    Integer getActivityPageCount(HuiyuanParam record);

    List<HuiyuanActivity> getActivityByHuiyuanId(HuiyuanParam recoed);

    int insertRecord(VolunteerApprovalRecord record);

    int updateRecord(VolunteerApprovalRecord record);

    Integer getVolunteerApprovalRecordPageCount(HuiyuanParam huiyuanParam);

    List<VolunteerApprovalRecord> getVolunteerApprovalRecord(HuiyuanParam huiyuanParam);

    Huiyuan selectByCardNo(String cardNo);

    Integer addPoint(Integer id);
}