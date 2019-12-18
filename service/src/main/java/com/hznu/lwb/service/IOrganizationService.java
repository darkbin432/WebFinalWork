package com.hznu.lwb.service;

import com.hznu.lwb.model.Organization;
import com.hznu.lwb.model.result.ApiResult;

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