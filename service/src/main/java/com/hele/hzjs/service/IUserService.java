package com.hele.hzjs.service;

import com.hele.hzjs.model.User;
import com.hele.hzjs.model.result.ApiResult;

/**
 * ISourceService
 *
 * @author xuzou
 * @date 16/6/14
 * @copyright: copyright @ HeleTech 2016
 */
public interface IUserService {

    ApiResult login(User user);

    ApiResult updatePersonalInfo(User user);
}
