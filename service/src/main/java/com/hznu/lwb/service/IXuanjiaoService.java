package com.hznu.lwb.service;

import com.hznu.lwb.model.Xuanjiao;
import com.hznu.lwb.model.param.XuanjiaoParam;
import com.hznu.lwb.model.result.ApiResult;

public interface IXuanjiaoService {
    ApiResult insert(Xuanjiao xuanjiao);

    ApiResult getMany(Integer num);

    ApiResult getManyIndex(Integer num);

    ApiResult delete(Integer id);
    
    ApiResult selectByPage(String title, String name, Integer type, String pageNow);

    ApiResult update(Xuanjiao xuanjiao);

    ApiResult getOne(Integer id);

    ApiResult getAllXuanjiao(String aoData, XuanjiaoParam xuanjiaoParam);

    ApiResult countRead(Integer id);

    ApiResult getList(XuanjiaoParam xuanjiaoParam);
}
