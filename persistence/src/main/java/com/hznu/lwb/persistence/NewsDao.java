package com.hznu.lwb.persistence;

import com.hznu.lwb.model.News;
import com.hznu.lwb.model.param.NewsParam;

import java.util.List;

/**
 * @author 斌
 */
public interface NewsDao {

    int deleteByPrimaryKey(Integer id);

    int insert(News record);

    int insertSelective(News record);

    News selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(News record);

    List<News> selectByCondition(NewsParam newsParam);

    Integer getCount();

    Integer addReadCount(Integer id);

    List<News> selectByPage(NewsParam newsParam);

}