package com.hznu.lwb.persistence;

import com.hznu.lwb.model.SpecialActivity;
import com.hznu.lwb.model.param.SpecialActivityParam;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * @author Xueht
 */
public interface SpecialActivityDao {
    void insertInfo(SpecialActivity specialActivity);

    void updateInfo(SpecialActivity specialActivity);

    void deleteInfo(@Param("id") Integer id);

    SpecialActivity getOne(@Param("id") Integer id);

    Integer getPageCount(SpecialActivityParam specialActivityParam);

    List<SpecialActivity> getAllSpecialActivity(SpecialActivityParam specialActivityParam);

    List<SpecialActivity> getAllYear();
}
