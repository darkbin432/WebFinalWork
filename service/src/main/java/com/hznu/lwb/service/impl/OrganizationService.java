package com.hznu.lwb.service.impl;

import com.hznu.lwb.model.Organization;
import com.hznu.lwb.model.Scope;
import com.hznu.lwb.model.result.ApiResult;
import com.hznu.lwb.persistence.OrganizationDao;
import com.hznu.lwb.persistence.OrganizationMemberDao;
import com.hznu.lwb.service.IOrganizationService;
import org.omg.CORBA.TRANSACTION_MODE;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class OrganizationService implements IOrganizationService {

    Logger logger= LoggerFactory.getLogger(this.getClass());

    @Resource
    private OrganizationDao organizationDao;

    @Resource
    private OrganizationMemberDao organizationMemberDao;

    @Override
    public ApiResult insertOne(Organization organization) {
        ApiResult apiResult = new ApiResult();
        try {
            Integer order = organizationDao.getMaxSequence(organization.getParentOrganizationId());
            if (order != null){
                organization.setSequence(order + 1);
            }else{
                organization.setSequence(1);
            }
            organizationDao.insertOne(organization);
            Scope scope = new Scope();
            scope.setName(organization.getName());
            scope.setOrganizationId(organization.getId());
            if (organization.getScopeId() == 0){
                scope.setScopeId((organizationDao.getMaxScope(9999,990001) / 10000 + 1) * 10000);
            }else if (organization.getScopeId() % 10000 == 0){
                scope.setScopeId((organizationDao.getMaxScope(organization.getScopeId(),organization.getScopeId() + 9900) / 100 + 1) * 100);
            }else if (organization.getScopeId() % 100 == 0){
                scope.setScopeId(organizationDao.getMaxScope(organization.getScopeId(),organization.getScopeId() + 99) + 1);
            }
            organizationDao.insertScope(scope);
            apiResult.success(String.valueOf(organization.getId()));
        }catch(Exception e){
            logger.error(e.getMessage(),e);
            apiResult.fail("添加部门失败");
        }
        return apiResult;
    }

    @Override
    public ApiResult getOne(Integer id){
        ApiResult apiResult = new ApiResult();
        try {
            Organization organization = organizationDao.getOne(id);
            apiResult.success(organization);
        }catch(Exception e) {
            apiResult.fail("获取机构失败");
        }
        return apiResult;
    }

    @Override
    public ApiResult listChildren(Integer parentId){
        ApiResult apiResult = new ApiResult();
        try {
            apiResult.success(organizationDao.listChildren(parentId));
        }catch(Exception e){
            logger.error(e.getMessage(),e);
            apiResult.fail("获取子机构失败");
        }
        return apiResult;
    }

    @Override
    public ApiResult updateInfo(Organization organization) {
        ApiResult apiResult = new ApiResult();
        try {
            organizationDao.updateInfo(organization);
            organizationDao.updateScope(organization);
            apiResult.success();
        }catch(Exception e){
            apiResult.fail("更新机构信息失败");
        }
        return apiResult;
    }

    @Override
    public ApiResult deleteOne(Integer id) {
        ApiResult apiResult = new ApiResult();
        try {
            organizationDao.deleteOne(id);
            organizationDao.deleteScope(id);
            organizationMemberDao.deleteByOrganization(id);
            apiResult.success();
        }catch(Exception e){
            apiResult.fail("删除机构失败");
        }
        return apiResult;
    }

    @Override
    public ApiResult listScope() {
        ApiResult apiResult = new ApiResult();
        try {
            apiResult.success(organizationDao.listScope());
        }catch (Exception e){
            apiResult.fail("获取机构区域关系失败");
        }
        return apiResult;
    }


    @Override
    public ApiResult getLocation() {
        ApiResult apiResult = new ApiResult();
        try {
            apiResult.success(organizationDao.getLocation());
        }catch(Exception e){
            apiResult.fail("获取地区失败");
        }
        return apiResult;
    }

    @Override
    public ApiResult getStreet(Integer scopeId) {
        ApiResult apiResult = new ApiResult();
        try {
            apiResult.success(organizationDao.getStreet(scopeId));
        }catch(Exception e){
            apiResult.fail("获取街道失败");
        }
        return apiResult;
    }

    @Override
    public ApiResult listAll() {
        ApiResult apiResult = new ApiResult();
        try {
            apiResult.success(organizationDao.listAll());
        }catch(Exception e){
            logger.error(e.getMessage(),e);
            apiResult.fail("获取机构导航失败");
        }
        return apiResult;
    }

    @Override
    public ApiResult changeOrganizationSequence(String newSequence) {
        ApiResult apiResult = new ApiResult();
        try {
            for (String i : newSequence.substring(0,newSequence.length()-1).split(";")){
                String[] tmp = i.split(":");
                organizationDao.updateOrganizationSequence(Integer.valueOf(tmp[0]),Integer.valueOf(tmp[1]));
            }
            apiResult.success();
        }catch(Exception e){
            logger.error(e.getMessage(),e);
            apiResult.fail("调整排序失败");
        }
        return apiResult;
    }
}