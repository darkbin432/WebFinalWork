package com.hznu.lwb.service;

import com.hznu.lwb.model.OfficialDocument;
import com.hznu.lwb.model.param.OfficialDocumentParam;
import com.hznu.lwb.model.result.ApiResult;

public interface IOfficialDocumentService {

    ApiResult insert(OfficialDocument record);

    ApiResult update(OfficialDocument record);

    ApiResult delete(Integer id);

    ApiResult selectByCondition(String aoData, OfficialDocumentParam param);

    ApiResult selectOne(Integer id);
}
