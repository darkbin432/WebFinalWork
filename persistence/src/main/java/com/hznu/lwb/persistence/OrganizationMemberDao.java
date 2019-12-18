package com.hznu.lwb.persistence;

import com.hznu.lwb.model.Organization;
import com.hznu.lwb.model.OrganizationMember;
import com.sun.org.apache.xpath.internal.operations.Or;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface OrganizationMemberDao {
    Integer getMaxId(@Param("table") String tableName);

    List<Integer> getMemberId(Integer id);

    List<OrganizationMember> getMembers(Integer organizationId);

    OrganizationMember getOne(Integer id);

    OrganizationMember getOneToJudge(@Param("name")String name,@Param("mobile")String mobile);

    Integer getIdByUserName(String username);

    Integer getScope(Integer id);

    Integer getMaxSequence(Integer organizationId);

    void insertOne(OrganizationMember organizationMember);

    Integer isUsernameUnique(String username);

    void updateOne(OrganizationMember organizationMember);

    void deleteOne(Integer id);

    void deleteByOrganization(Integer organizationId);

    List<OrganizationMember> listAll();

    List<OrganizationMember> selectMember(String term);

    List<OrganizationMember> selectMember2(String term);

    List<OrganizationMember> selectByScopeId(Integer scopeId);

    Integer getOneScopeId(Integer id);

    Integer selectApprovalId(Integer id);

    List<OrganizationMember> selectAllOrganizationAdmin(Integer id);

    Integer updateMemberSequence(@Param("id")Integer id,@Param("sequence")Integer sequence);
}