package com.hele.hzjs.service;

import com.hele.hzjs.model.result.ApiResult;

/**
 * @author Xueht
 * @Date: Create in 20:31 2019/3/25
 */
public interface IProjectService {

    ApiResult getOne(Integer id);

    ApiResult getList();

}
