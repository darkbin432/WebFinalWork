package com.hznu.lwb.service;

import com.hznu.lwb.model.OrganizationMember;
import com.hznu.lwb.model.result.ApiResult;

import java.util.ArrayList;

public interface IOrganizationMemberService {
    ApiResult updateOne(OrganizationMember organizationMember);

    ApiResult getMembers(Integer organizationId);

    ApiResult getOne(Integer id);

    ApiResult deleteMembers(String ids);

    Integer getScope(Integer id);

    ApiResult listAllMember();

    ApiResult selectMember(String term);

    ApiResult selectMember2(String term);

    ApiResult selectByScopeId(Integer scopeId);

    ApiResult getOneScopeId(Integer id);

    ApiResult selectApprovalId(Integer id);

    ApiResult selectAllOrganizationAdmin(Integer id);

    ApiResult changeMemberSequence(String newSequence);
}