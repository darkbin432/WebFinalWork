package com.hele.hzjs.service;

import com.hele.hzjs.model.result.ApiResult;

/**
 *  * @Author:hanbing
 */
public interface IToolService {

    ApiResult getQrcodeByActivityId(Integer id);

    ApiResult getQrcodeByOrganizationMemberId(Integer id);

    ApiResult refreshCache();
}
