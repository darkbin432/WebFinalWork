//package com.hele.hzjs.service.impl;
//
//import com.hele.hzjs.model.OrganizationMember;
//import com.hele.hzjs.model.result.ApiResult;
//import com.hele.hzjs.persistence.OrganizationMemberDao;
//import com.hele.hzjs.service.IOrganizationMemberService;
//import com.hele.utils.MD5Util;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.stereotype.Service;
//
//import javax.annotation.Resource;
//import java.util.ArrayList;
//import java.util.List;
//
//@Service
//public class OrganizationMemberService_old implements IOrganizationMemberService {
//
//    Logger logger = LoggerFactory.getLogger(this.getClass());
//
//    @Resource
//    private OrganizationMemberDao organizationMemberDao;
//
//    @Override
//    public ApiResult updateOne(int organization_id, int member_id, String name, String sex, String mobile, String department, String position, String zhineng, String username, String password) {
//        ApiResult apiResult = new ApiResult();
//        OrganizationMember organizationMember = new OrganizationMember();
//        organizationMember.setId(member_id);
//        organizationMember.setName(name);
//        if (sex.equals("男")) organizationMember.setSex(0);
//        else organizationMember.setSex(1);
//        organizationMember.setOrganization_id(organization_id);
//        organizationMember.setMobile(mobile);
//        organizationMember.setDepartment(department);
//        organizationMember.setPosition(position);
//        organizationMember.setUsername(username);
//        organizationMember.setStatus(1);
//        if (member_id == 0) {
//            organizationMember.setPassword(MD5Util.md5Encrypt(password));
//            organizationMemberDao.insertOne(organizationMember);
//        } else organizationMemberDao.updateOne(organizationMember);
//        apiResult.success();
//        return apiResult;
//    }
//
//    @Override
//    public ApiResult getMany(int organization_id) {
//        ApiResult apiResult = new ApiResult();
//        List<Integer> li = organizationMemberDao.getMemberId(organization_id);
//        List<OrganizationMember> lom = new ArrayList<>();
//        for (int i : li) {
//            lom.add(organizationMemberDao.getOne(i));
//        }
//        apiResult.success(lom);
//        return apiResult;
//    }
//
//    @Override
//    public ApiResult getScope(int myId) {
//        ApiResult apiResult = new ApiResult();
//
//        try {
//            OrganizationMember organizationMember = organizationMemberDao.getOne(myId);
//            if (organizationMember == null) {
//                apiResult.fail("获取失败");
//                return apiResult;
//            }
//            System.out.println("organiz test  ---------------4");
//            System.out.println(myId + "     " + organizationMember.getId());
//            System.out.println(organizationMember.getOrganization_id());
//            Integer scope_id = organizationMemberDao.getScope(organizationMember.getOrganization_id());
//            System.out.println("organiz test  ---------------5");
//            System.out.println(scope_id);
//            apiResult.success(scope_id.toString());
//        } catch (Exception ex) {
//            logger.error(ex.getMessage(), ex);
//        }
//
//        return apiResult;
//    }
//
//    @Override
//    public ApiResult getOne(int id) {
//        ApiResult apiResult = new ApiResult();
//        apiResult.success(organizationMemberDao.getOne(id));
//        return apiResult;
//    }
//
//    @Override
//    public ApiResult deleteMember(int id) {
//        ApiResult apiResult = new ApiResult();
//        organizationMemberDao.deleteOne(id);
//        apiResult.success();
//        return apiResult;
//    }
//}