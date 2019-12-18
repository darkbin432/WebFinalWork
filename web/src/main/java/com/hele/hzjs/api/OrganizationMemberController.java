package com.hele.hzjs.api;

import com.hele.hzjs.model.OrganizationMember;
import com.hele.hzjs.model.result.ApiResult;
import com.hele.hzjs.service.IOrganizationMemberService;
import com.hele.hzjs.service.IOrganizationService;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.swing.*;
import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.List;

/**
 * @author 斌
 */
@Controller
@RequestMapping("/api")
public class OrganizationMemberController {

    @Resource
    private IOrganizationMemberService organizationMemberService;

    @RequestMapping(value = "/getMembers",method = RequestMethod.GET)
    @ResponseBody
    public ApiResult getMembers(Integer organizationId){
        ApiResult apiResult = organizationMemberService.getMembers(organizationId);
        return apiResult;
    }

    @RequestMapping(value = "/updateMember",method = RequestMethod.POST)
    @ResponseBody
    public ApiResult updateMember(OrganizationMember organizationMember){
        ApiResult apiResult = organizationMemberService.updateOne(organizationMember);

        return apiResult;
    }

    @RequestMapping(value = "/getMember",method = RequestMethod.GET)
    @ResponseBody
    public ApiResult getMember(@RequestParam("id")int id){
        ApiResult apiResult = organizationMemberService.getOne(id);
        return apiResult;
    }

    @RequestMapping(value = "/deleteMembers",method = RequestMethod.POST)
    @ResponseBody
    public ApiResult deleteMember(String ids){
        ApiResult apiResult = organizationMemberService.deleteMembers(ids);
        return apiResult;
    }

    @RequestMapping(value = "/listAllMember",method = RequestMethod.GET)
    @ResponseBody
    public ApiResult listAllMember(){
        ApiResult apiResult = organizationMemberService.listAllMember();
        return apiResult;
    }

    @RequestMapping(value = "/selectMember",method = RequestMethod.GET)
    @ResponseBody
    public ApiResult selectMember(String term){
        ApiResult apiResult = organizationMemberService.selectMember(term);
        return apiResult;
    }

    @RequestMapping(value = "/selectMember2",method = RequestMethod.GET)
    @ResponseBody
    public ApiResult selectMember2(String term){
        ApiResult apiResult = organizationMemberService.selectMember2(term);
        return apiResult;
    }

    @RequestMapping(value = "/selectByScopeId", method = RequestMethod.GET)
    @ResponseBody
    public ApiResult selectByScopeId(@Param("scopeId") Integer scopeId){
        return organizationMemberService.selectByScopeId(scopeId);
    }

    @RequestMapping(value = "/getOneScopeId", method = RequestMethod.GET)
    @ResponseBody
    public ApiResult getOneScopeId(@Param("id")Integer id){
        return organizationMemberService.getOneScopeId(id);
    }

    @RequestMapping(value = "/getApprovalId", method = RequestMethod.GET)
    @ResponseBody
    public ApiResult getApprovalId(@Param("id")Integer id) {
        return organizationMemberService.selectApprovalId(id);
    }

    @RequestMapping(value = "/selectAllOrganizationAdmin", method = RequestMethod.GET)
    @ResponseBody
    public ApiResult selectAllOrganizationAdmin(@Param("id") Integer id) {
        return organizationMemberService.selectAllOrganizationAdmin(id);
    }

    @RequestMapping(value = "/changeMemberSequence",method = RequestMethod.POST)
    @ResponseBody
    public ApiResult changeMemberSequence(String newSequence){
        ApiResult apiResult = organizationMemberService.changeMemberSequence(newSequence);
        return apiResult;
    }
}