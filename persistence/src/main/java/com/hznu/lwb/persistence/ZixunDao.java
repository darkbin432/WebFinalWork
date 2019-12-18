package com.hznu.lwb.persistence;

import com.hznu.lwb.model.Zixun;
import com.hznu.lwb.model.param.ZixunParam;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface ZixunDao {
    int getMaxId(@Param("table") String tableName);

    void insert(Zixun zixun);

    Zixun getOne(int id);

    List<Zixun> getMany(@Param("num")int num);

    void countRead(int id);

    void updateInfo(Zixun zixun);

    void deleteInfo(int id);

//    int getPageCount(@Param("title") String title, @Param("scopeId") Integer scopeId, @Param("startTime") String startTime, @Param("endTime")String endTime);

//    List<Zixun> selectzixunInfo(@Param("title") String title, @Param("scopeId") Integer scopeId, @Param("startTime") String startTime, @Param("endTime")String endTime,@Param("startPos")Integer startPos, @Param("pageSize")Integer pageSize);

    Integer getPageCount(ZixunParam zixunParam);

    List<Zixun> selectzixunInfo(ZixunParam zixunParam);

    List<Zixun> selectAll(ZixunParam zixunParam);

    int countAll(ZixunParam zixunParam);
}
