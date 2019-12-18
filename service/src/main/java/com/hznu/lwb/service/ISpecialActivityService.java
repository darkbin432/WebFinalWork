package com.hznu.lwb.service;

import com.hznu.lwb.model.SpecialActivity;
import com.hznu.lwb.model.param.SpecialActivityParam;
import com.hznu.lwb.model.result.ApiResult;

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
