package com.hznu.lwb.api;

import com.hznu.lwb.model.Organization;
import com.hznu.lwb.model.result.ApiResult;
import com.hznu.lwb.service.IOrganizationService;
import com.sun.xml.internal.ws.api.pipe.helper.AbstractPipeImpl;
import org.aspectj.weaver.ast.Or;
import org.omg.PortableInterceptor.INACTIVE;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.List;

@Controller
@RequestMapping("/api")
public class OrganizationController {

    @Resource
    private IOrganizationService organizationService;

    @RequestMapping(value = "/listChildren",method = RequestMethod.GET)
    @ResponseBody
    public ApiResult listChildren(Integer organizationId){
        ApiResult apiResult = organizationService.listChildren(organizationId);
        return apiResult;
    }

    @RequestMapping(value = "/getInfo",method = RequestMethod.GET)
    @ResponseBody
    public ApiResult getInfo(@RequestParam("id") int id){
        ApiResult apiResult = organizationService.getOne(id);
        return apiResult;
    }

    @RequestMapping(value = "/updateInfo",method = RequestMethod.POST)
    @ResponseBody
    public ApiResult updateInfo(Organization organization){
        ApiResult apiResult = organizationService.updateInfo(organization);
        return apiResult;
    }

    @RequestMapping(value = "/deleteOrganization",method = RequestMethod.POST)
    @ResponseBody
    public ApiResult deleteOrganization(Integer id){
        ApiResult apiResult = organizationService.deleteOne(id);
        return apiResult;
    }

    @RequestMapping(value = "/insertOrganization",method = RequestMethod.POST)
    @ResponseBody
    public ApiResult insertOrganization(Organization organization){
        return organizationService.insertOne(organization);
    }

    @RequestMapping(value = "/listScope",method = RequestMethod.GET)
    @ResponseBody
    public ApiResult listScope(){
        return organizationService.listScope();
    }

    @RequestMapping(value = "/getLocation",method = RequestMethod.GET)
    @ResponseBody
    public ApiResult getLocation(){
        return organizationService.getLocation();
    }

    @RequestMapping(value = "/getStreet",method = RequestMethod.GET)
    @ResponseBody
    public ApiResult getLocation(@RequestParam("scopeId") Integer scopeId){
        return organizationService.getStreet(scopeId);
    }

    @RequestMapping(value = "/listAllOrganization",method = RequestMethod.GET)
    @ResponseBody
    public ApiResult listAllOrganization(){
        return organizationService.listAll();
    }

    @RequestMapping(value = "/changeOrganizationSequence",method = RequestMethod.POST)
    @ResponseBody
    public ApiResult changeOrganizationSequence(String newSequence){
        ApiResult apiResult = organizationService.changeOrganizationSequence(newSequence);
        return apiResult;
    }

}