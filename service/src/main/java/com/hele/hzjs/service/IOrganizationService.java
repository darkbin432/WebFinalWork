package com.hele.hzjs.service;

import com.hele.hzjs.model.Organization;
import com.hele.hzjs.model.result.ApiResult;

public interface IOrganizationService {
    ApiResult insertOne(Organization organization);
    ApiResult getOne(Integer id);
    ApiResult listChildren(Integer parentId);
    ApiResult updateInfo(Organization organization);
    ApiResult deleteOne(Integer id);
    ApiResult listScope();
    ApiResult getLocation();
    ApiResult getStreet(Integer scopeId);
    ApiResult listAll();
    ApiResult changeOrganizationSequence(String Sequence);
}