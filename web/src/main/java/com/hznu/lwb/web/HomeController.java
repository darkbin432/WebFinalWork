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

    @RequestMapping({"/"})
    public ModelAndView index() {
        return buildMAV("default.jsp");
    }

    @RequestMapping({"/general"})
    public ModelAndView general() {
        return buildMAV("general.jsp");
    }

    @RequestMapping({"/mechanism"})
    public ModelAndView mechanism() {
        return buildMAV("mechanism.jsp");
    }

    @RequestMapping({"/teachers"})
    public ModelAndView teachers() {
        return buildMAV("teachers.jsp");
    }

    @RequestMapping({"/discipline"})
    public ModelAndView discipline() {
        return buildMAV("discipline.jsp");
    }

    @RequestMapping({"/important"})
    public ModelAndView important() {
        return buildMAV("important.jsp");
    }

    @RequestMapping({"/notice"})
    public ModelAndView notice() {
        return buildMAV("notice.jsp");
    }

    @RequestMapping({"/content"})
    public ModelAndView content() {
        return buildMAV("content.jsp");
    }

    @RequestMapping({"/teach"})
    public ModelAndView teach() {
        return buildMAV("teach.jsp");
    }

    @RequestMapping({"/manage/index"})
    public ModelAndView manage() {
        return buildMAV("index.jsp");
    }

    @RequestMapping({"/manage/edit"})
    public ModelAndView edit() {
        return buildMAV("edit.jsp");
    }

    @RequestMapping({"/manage/search"})
    public ModelAndView search() {
        return buildMAV("search.jsp");
    }

    @RequestMapping({"/manage/personal"})
    public ModelAndView personal() {
        return buildMAV("personal.jsp");
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

    @RequestMapping(value = "/manage/logout", method = RequestMethod.GET)
    public String logout() {
        currentSubjectLogout();
        return "redirect:/login";
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