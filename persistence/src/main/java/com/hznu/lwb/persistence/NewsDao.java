package com.hznu.lwb.persistence;

import com.hznu.lwb.model.News;
import com.hznu.lwb.model.param.NewsParam;

import java.util.List;

/**
 * @author 斌
 */
public interface NewsDao {

    Integer deleteByPrimaryKey(Integer id);

    Integer insert(News record);

    Integer insertSelective(News record);

    News selectByPrimaryKey(Integer id);

    Integer updateByPrimaryKeySelective(News record);

    Integer publishById(Integer id);

    List<News> selectByCondition(NewsParam newsParam);

    Integer getCount();

    Integer addReadCount(Integer id);

    List<News> selectByPage(NewsParam newsParam);

}