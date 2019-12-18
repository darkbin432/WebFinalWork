package com.hznu.lwb.persistence;

import com.hznu.lwb.model.Xuanjiao;
import com.hznu.lwb.model.param.XuanjiaoParam;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface XuanjiaoDao {

    void insert(Xuanjiao xuanjiao);

    Xuanjiao getOne(int id);

    List<Xuanjiao> getMany(@Param("num")int num);

    List<Xuanjiao> getManyIndex(@Param("num")int num);

    void countRead(int id);

    void updateInfo(Xuanjiao xuanjiao);

    void deleteInfo(int id);

//    int getPageCount(@Param("title") String title, @Param("name")String name);

//    List<Xuanjiao> selectXuanjiaoInfo(@Param("title")String title, @Param("name")String name, @Param("startPos")Integer startPos, @Param("pageSize")Integer pageSize);

    int getPageCount(XuanjiaoParam xuanjiaoParam);

    List<Xuanjiao> selectXuanjiaoInfo(XuanjiaoParam xuanjiaoParam);

    List<Xuanjiao> selectAll(XuanjiaoParam xuanjiaoParam);

    int countAll(XuanjiaoParam xuanjiaoParam);
}
