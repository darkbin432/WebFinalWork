package com.hznu.lwb.service;

import com.hznu.lwb.model.Zixun;
import com.hznu.lwb.model.param.ZixunParam;
import com.hznu.lwb.model.result.ApiResult;

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
