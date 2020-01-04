package com.hznu.lwb.api;

import com.hznu.lwb.model.result.ApiResult;
import com.hznu.lwb.service.IMailSenderService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;

/**
 * @author 斌
 */
@Controller
@RequestMapping("/api")
public class MailController {

    @Resource
    private IMailSenderService mailSenderService;

    @RequestMapping(value = "/sendMail", method = RequestMethod.POST)
    @ResponseBody
    public ApiResult sendMail(String to, String subject, String text){
        return mailSenderService.sendEmail(to, subject, text);
    }

}
