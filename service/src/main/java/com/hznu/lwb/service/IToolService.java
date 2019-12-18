package com.hznu.lwb.service;

import com.hznu.lwb.model.result.ApiResult;

/**
 *  * @Author:hanbing
 */
public interface IToolService {

    ApiResult getQrcodeByActivityId(Integer id);

    ApiResult getQrcodeByOrganizationMemberId(Integer id);

    ApiResult refreshCache();
}
