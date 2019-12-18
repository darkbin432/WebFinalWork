package com.hele.hzjs.service;

import com.hele.hzjs.model.OfficialDocument;
import com.hele.hzjs.model.param.OfficialDocumentParam;
import com.hele.hzjs.model.result.ApiResult;

public interface IOfficialDocumentService {

    ApiResult insert(OfficialDocument record);

    ApiResult update(OfficialDocument record);

    ApiResult delete(Integer id);

    ApiResult selectByCondition(String aoData, OfficialDocumentParam param);

    ApiResult selectOne(Integer id);
}
