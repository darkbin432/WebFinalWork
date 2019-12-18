package com.hznu.lwb.web;

import com.hznu.lwb.ApplicationController;
import com.hznu.lwb.model.*;
import com.hznu.lwb.model.result.ApiResult;
import com.hznu.lwb.service.*;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.IncorrectCredentialsException;
import org.apache.shiro.authc.UnknownAccountException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.annotation.Resource;


/**
 * @author 斌
 */
@Controller
public class HomeController extends ApplicationController {

    @Resource
    private IOrganizationMemberService organizationMemberService;

    @Resource
    private IAnnouncementService announcementService;

    @Resource
    private IMailService mailService;

    @Resource
    private IZixunService zixunService;

    @Resource
    private IXuanjiaoService xuanjiaoService;


    @RequestMapping("/member")
    public ModelAndView toMember2()  {
        return buildMAV("member.jsp");
    }

    @RequestMapping("/personal")
    public ModelAndView toPersonal() {
        return buildMAV("personal.jsp");
    }


    @RequestMapping("/huiyuan")
    public ModelAndView toVip(){
        return buildMAV("huiyuan.jsp");
    }

    @RequestMapping("/information")
    public ModelAndView toInformation() {
        return buildMAV("information.jsp");
    }

    @RequestMapping("/approval")
    public ModelAndView toApproval() {
        return buildMAV("approval.jsp");
    }

    @RequestMapping("/mail")
    public ModelAndView toMail() {
        return buildMAV("mail.jsp");
    }

    @RequestMapping("/task")
    public ModelAndView toTask() {
        return buildMAV("task.jsp");
    }

    @RequestMapping("/statistics")
    public ModelAndView toStatistics(){ return buildMAV("statistics.jsp"); }

    @RequestMapping({"/", "/index"})
    public ModelAndView index2() {
        return buildMAV("index.jsp");
    }

    @RequestMapping({"/", "/officialdocument"})
    public ModelAndView toOfficialdocument() {
        return buildMAV("officialdocument.jsp");
    }

    @RequestMapping(value = "/login")
    public ModelAndView login() {
        currentSubjectLogout();

        String errorClassName = (String) request
                .getAttribute("shiroLoginFailure");
        String authticationError = null;
        if (UnknownAccountException.class.getName().equals(errorClassName)) {
            authticationError = "用户名/密码错误";
        } else if (IncorrectCredentialsException.class.getName().equals(
                errorClassName)) {
            authticationError = "用户名/密码错误";
        } else if (errorClassName != null) {
            authticationError = "未知错误：" + errorClassName;
        }

        request.setAttribute("errorMessage", authticationError);

        return buildMAV("login.jsp");
    }

    @RequestMapping(value = "/logout", method = RequestMethod.GET)
    public String logout() {
        currentSubjectLogout();
        return "redirect:/login";
    }

    @RequestMapping(value = "/test", method = RequestMethod.GET)
    public String test() {
        currentSubjectLogout();
        return "test/uploadPage";
    }

    @RequestMapping(value = "/test/sweetalert", method = RequestMethod.GET)
    public String sweetalert() {
        return "test/sweetalert";
    }

    @RequestMapping(value = "/test/qrTest", method = RequestMethod.GET)
    public String qrTest() {
        return "test/qrTest";
    }

    @RequestMapping("/vip2")
    public String vip2() {
        return "huiyuan/vip";
    }

    @RequestMapping("getCurrentUser")
    @ResponseBody
    public ApiResult getCurrentUser(){
        User user= (User)SecurityUtils.getSubject().getPrincipal();
        ApiResult apiResult=new ApiResult();
        apiResult.success(user);
        return apiResult;
    }
}