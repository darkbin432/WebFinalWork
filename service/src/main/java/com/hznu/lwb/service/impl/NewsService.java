package com.hznu.lwb.service.impl;

import com.hznu.lwb.model.News;
import com.hznu.lwb.model.param.NewsParam;
import com.hznu.lwb.model.result.ApiResult;
import com.hznu.lwb.persistence.NewsDao;
import com.hznu.lwb.service.INewsService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;
import java.util.Random;

/**
 * @author 斌
 */
@Service
public class NewsService implements INewsService {

    Logger logger = LoggerFactory.getLogger(this.getClass());

    @Resource
    private NewsDao newsDao;

    @Override
    public ApiResult insert(News news) {
        ApiResult apiResult = new ApiResult();
        try {
            newsDao.insertSelective(news);
            apiResult.success();
        }catch (Exception e){
            apiResult.fail();
        }
        return apiResult;
    }

    @Override
    public ApiResult delete(Integer id) {
        ApiResult apiResult = new ApiResult();
        try {
            newsDao.deleteByPrimaryKey(id);
            apiResult.success();
        }catch (Exception e){
            apiResult.fail();
        }
        return apiResult;
    }

    @Override
    public ApiResult update(News news) {
        ApiResult apiResult = new ApiResult();
        try {
            newsDao.updateByPrimaryKeySelective(news);
            apiResult.success();
        }catch (Exception e){
            apiResult.fail();
        }
        return apiResult;
    }

    @Override
    public ApiResult publish(Integer id) {
        ApiResult apiResult = new ApiResult();
        try {
            newsDao.publishById(id);
            apiResult.success();
        }catch (Exception e){
            apiResult.fail();
        }
        return apiResult;
    }

    @Override
    public ApiResult selectById(Integer id) {
        ApiResult apiResult = new ApiResult();
        try {
            newsDao.addReadCount(id);
            apiResult.success(newsDao.selectByPrimaryKey(id));
        }catch (Exception e){
            apiResult.fail();
        }
        return apiResult;
    }

    @Override
    public ApiResult listNews(NewsParam newsParam) {
        ApiResult apiResult = new ApiResult();
        try {
            apiResult.success(newsDao.selectByCondition(newsParam));
        }catch (Exception e){
            apiResult.fail();
            logger.error(e.getMessage(), e);
        }
        return apiResult;
    }

    @Override
    public ApiResult selectByCondition(NewsParam newsParam) {
        ApiResult apiResult = new ApiResult();
        try {
            newsParam.initOffset();
            Integer totalCount = newsDao.getCount(newsParam);
            List<News> newsList = newsDao.selectByCondition(newsParam);
            apiResult.dataTable(new Random(10).nextInt(), totalCount, newsList.size(), newsList);
        }catch (Exception e){
            apiResult.fail();
        }
        return apiResult;
    }
}
