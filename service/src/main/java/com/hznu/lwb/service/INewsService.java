package com.hznu.lwb.service;

import com.hznu.lwb.model.News;
import com.hznu.lwb.model.param.NewsParam;
import com.hznu.lwb.model.result.ApiResult;

/**
 * @author 斌
 */
public interface INewsService {

    ApiResult insert(News news);

    ApiResult delete(Integer id);

    ApiResult update(News news);

    ApiResult selectById(Integer id);

    ApiResult selectByPage(NewsParam newsParam);

    ApiResult selectByCondition(NewsParam newsParam);
}
