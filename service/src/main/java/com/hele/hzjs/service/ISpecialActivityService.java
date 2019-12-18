package com.hele.hzjs.service;

import com.hele.hzjs.model.SpecialActivity;
import com.hele.hzjs.model.param.SpecialActivityParam;
import com.hele.hzjs.model.result.ApiResult;

/**
 * @author Xueht
 */
public interface ISpecialActivityService {

    ApiResult insert(SpecialActivity specialActivity);

    ApiResult update(SpecialActivity specialActivity);

    ApiResult delete(Integer id);

    ApiResult getOne(Integer id);

    ApiResult getAllSpecialActivity(String aoData, SpecialActivityParam specialActivityParam);

    ApiResult getAllYear();
}
