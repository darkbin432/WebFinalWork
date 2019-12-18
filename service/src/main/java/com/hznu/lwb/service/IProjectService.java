package com.hznu.lwb.service;

import com.hznu.lwb.model.result.ApiResult;

/**
 * @author Xueht
 * @Date: Create in 20:31 2019/3/25
 */
public interface IProjectService {

    ApiResult getOne(Integer id);

    ApiResult getList();

}
