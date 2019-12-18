package com.hele.hzjs.service;

import com.hele.hzjs.model.Zixun;
import com.hele.hzjs.model.param.ZixunParam;
import com.hele.hzjs.model.result.ApiResult;

public interface IZixunService {
    ApiResult insert(Zixun zixun);

    ApiResult getMany(Integer num);

    ApiResult delete(Integer id);

    ApiResult selectByPage(String title, Integer scopeId, String startTime, String endTime, String pageNow);

    ApiResult update(Zixun zixun);

    ApiResult getOne(Integer id);

    ApiResult getAllZixun(String aoData, ZixunParam zixunParam);

    ApiResult countRead(Integer id);

    ApiResult getList(ZixunParam zixunParam);
}
