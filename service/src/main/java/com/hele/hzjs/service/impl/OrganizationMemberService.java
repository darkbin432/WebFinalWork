package com.hele.hzjs.service.impl;

import com.hele.hzjs.model.OrganizationMember;
import com.hele.hzjs.model.result.ApiResult;
import com.hele.hzjs.persistence.OrganizationMemberDao;
import com.hele.hzjs.persistence.UserDao;
import com.hele.hzjs.service.IOrganizationMemberService;
import com.hele.utils.MD5Util;
import org.apache.shiro.SecurityUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

@Service
public class OrganizationMemberService implements IOrganizationMemberService {

    Logger logger = LoggerFactory.getLogger(this.getClass());

    @Resource
    private OrganizationMemberDao organizationMemberDao;

    @Resource
    private UserDao userDao;

    // FIXME: 2019/3/10 值传递？
    @Override
    public ApiResult updateOne(OrganizationMember organizationMember) {

        ApiResult apiResult = new ApiResult();
        try{
            if (organizationMember.getId() == null) {
                Integer order = organizationMemberDao.getMaxSequence(organizationMember.getOrganizationId());
                if (order != null){
                    organizationMember.setSequence(order+ 1);
                }else{
                    organizationMember.setSequence(1);
                }
                organizationMember.setPassword(MD5Util.md5Encrypt(organizationMember.getPassword()));
                if (organizationMemberDao.isUsernameUnique(organizationMember.getUsername()) > 0){
                    apiResult.fail("该用户名已存在");
                    return apiResult;
                }
                OrganizationMember om = organizationMemberDao.getOneToJudge(organizationMember.getName(),organizationMember.getMobile());
                if (om != null){
                    apiResult.fail("该成员已存在于" + om.getOrganizationName());
                    return apiResult;
                }
                organizationMemberDao.insertOne(organizationMember);
            } else {
                if (organizationMember.getPassword() != null){
                    organizationMember.setPassword(MD5Util.md5Encrypt(organizationMember.getPassword()));
                }
                organizationMemberDao.updateOne(organizationMember);

                OrganizationMember userSession=(OrganizationMember) SecurityUtils.getSubject().getPrincipal();
                if (organizationMember.getUsername().equals(userSession.getUsername())){
                    OrganizationMember user = userDao.login(organizationMember.getUsername());
                    userSession.setName(user.getName());
                    userSession.setType(user.getType());
                    userSession.setScopeId(user.getScopeId());
                    userSession.setMobile(user.getMobile());
                }
            }
            apiResult.success();
        }catch(Exception e){
            logger.error(e.getMessage(),e);
            apiResult.fail("新增或更新机构成员失败");
        }
        return apiResult;
    }

    @Override
    public ApiResult getMembers(Integer organizationId) {
        ApiResult apiResult = new ApiResult();
        try {
            apiResult.success(organizationMemberDao.getMembers(organizationId));
        }catch(Exception e){
            apiResult.fail("获取机构成员失败");
        }
        return apiResult;
    }

    @Override
    public Integer getScope(Integer myId) {
//        ApiResult apiResult = new ApiResult();
        Integer scope;

        try {
            OrganizationMember organizationMember = organizationMemberDao.getOne(myId);
            if (organizationMember == null) {
//                apiResult.fail("获取失败");
                return null;
            }

            scope = organizationMemberDao.getScope(organizationMember.getOrganizationId());


        } catch (Exception ex) {
            logger.error(ex.getMessage(), ex);
            return null;
        }
        return scope;
    }

    @Override
    public ApiResult listAllMember() {
        ApiResult apiResult = new ApiResult();
        try {
            apiResult.success(organizationMemberDao.listAll());
        }catch(Exception e){
            logger.error(e.getMessage(),e);
            apiResult.fail("获取全部机构成员失败");
        }
        return apiResult;
    }

    @Override
    public ApiResult selectMember(String term) {
        ApiResult apiResult = new ApiResult();
        try {
            apiResult.success(organizationMemberDao.selectMember(term));
        }catch(Exception e){
            logger.error(e.getMessage(),e);
            apiResult.fail("获取全部机构成员失败");
        }
        return apiResult;
    }

    @Override
    public ApiResult selectMember2(String term) {
        ApiResult apiResult = new ApiResult();
        try {
            apiResult.success(organizationMemberDao.selectMember2(term));
        }catch(Exception e){
            logger.error(e.getMessage(),e);
            apiResult.fail("获取全部机构成员失败");
        }
        return apiResult;
    }

    @Override
    public ApiResult selectByScopeId(Integer scopeId) {
        ApiResult apiResult = new ApiResult();
        try {
            List<OrganizationMember> lo = organizationMemberDao.selectByScopeId(scopeId);
            if(lo != null){
                apiResult.success(lo);
            } else{
                apiResult.fail("筛选人员失败");
            }
        } catch (Exception ex){
            logger.error(ex.getMessage(), ex);
            apiResult.fail("筛选人员失败");
        }
        return apiResult;
    }

    @Override
    public ApiResult getOneScopeId(Integer id) {
        ApiResult apiResult = new ApiResult();
        try {
            Integer scopeId = organizationMemberDao.getOneScopeId(id);
            if(scopeId != null) {
                apiResult.success(String.valueOf(scopeId));
            } else {
                apiResult.fail("获取区域失败");
            }
        } catch (Exception ex){
            logger.error(ex.getMessage(), ex);
            apiResult.fail("获取区域失败");
        }
        return apiResult;
    }

    @Override
    public ApiResult selectApprovalId(Integer id) {
        ApiResult apiResult = new ApiResult();
        try {
            Integer approvalId = organizationMemberDao.selectApprovalId(id);
            if (approvalId != null) {
               apiResult.success(String.valueOf(approvalId));
            } else {
                apiResult.fail("获取审批机构失败");
            }
        } catch (Exception ex) {
            logger.error(ex.getMessage(), ex);
            apiResult.fail("获取审批机构失败");
        }
        return apiResult;
    }

    @Override
    public ApiResult selectAllOrganizationAdmin(Integer id) {
        ApiResult apiResult = new ApiResult();
        try {
            List<OrganizationMember> lo = organizationMemberDao.selectAllOrganizationAdmin(id);
            if(lo != null) {
                apiResult.success(lo);
            } else {
                apiResult.fail("获取机构管理员失败");
            }
        } catch (Exception ex ) {
            logger.error(ex.getMessage(), ex);
            apiResult.fail("获取机构管理员失败");
        }
        return apiResult;
    }

    @Override
    public ApiResult changeMemberSequence(String newSequence) {
        ApiResult apiResult = new ApiResult();
        try {
            for (String i : newSequence.substring(0,newSequence.length()-1).split(";")){
                String[] tmp = i.split(":");
                organizationMemberDao.updateMemberSequence(Integer.valueOf(tmp[0]),Integer.valueOf(tmp[1]));
            }
            apiResult.success();
        }catch(Exception e){
            logger.error(e.getMessage(),e);
            apiResult.fail("调整排序失败");
        }
        return apiResult;
    }

    @Override
    public ApiResult getOne(Integer id) {
        ApiResult apiResult = new ApiResult();
        try{
            OrganizationMember organizationMember = organizationMemberDao.getOne(id);
            if(organizationMember != null) {
                apiResult.success(organizationMember);
            } else {

                apiResult.fail("获取机构成员失败");
            }
        }catch(Exception e){
            logger.error(e.getMessage(), e);
            apiResult.fail("获取机构成员失败");
        }
        return apiResult;
    }

    @Override
    public ApiResult deleteMembers(String ids) {
        ApiResult apiResult = new ApiResult();
        try {
            for (String id : ids.substring(0,ids.length()-1).split(";")){
                organizationMemberDao.deleteOne(Integer.valueOf(id));
            }
            apiResult.success();
        }catch(Exception e){
            logger.error(e.getMessage(),e);
            apiResult.fail("删除机构成员失败");
        }
        return apiResult;
    }
}