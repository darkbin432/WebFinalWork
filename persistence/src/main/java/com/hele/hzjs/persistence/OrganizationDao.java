package com.hele.hzjs.persistence;

import com.hele.hzjs.model.Organization;
import com.hele.hzjs.model.Scope;
import com.hele.hzjs.model.report.OrganizationConstructionReport;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface OrganizationDao {

    Integer insertOne(Organization organization);

    Integer getMaxSequence(Integer organizationId);

    Integer insertScope(Scope scope);

    Integer getMaxScope(@Param("scopeLeft")Integer scopeLeft,@Param("scopeRight")Integer scopeRight);

    Organization getOne(Integer Id);

    Organization getOneScope(Integer scopeId);

    List<Organization> listChildren(Integer parentId);

    Integer updateInfo(Organization organization);

    Integer updateScope(Organization organization);

    Integer deleteOne(Integer id);

    Integer deleteScope(Integer id);

    List<Scope> listScope();

    List<Scope> getLocation();

    List<Scope> getStreet(Integer scopeId);

    List<Organization> listAll();

    Integer updateOrganizationSequence(@Param("id")Integer id,@Param("sequence")Integer sequence);
}