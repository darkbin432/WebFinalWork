package com.hele.hzjs.api;

import com.hele.hzjs.ApplicationController;
import com.hele.hzjs.model.Mail;
import com.hele.hzjs.model.User;
import com.hele.hzjs.model.param.MailParam;
import com.hele.hzjs.model.result.ApiResult;
import com.hele.hzjs.service.IMailService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * @author 斌
 */
@Controller
@RequestMapping("/api")
public class MailController extends ApplicationController {

    @Resource
    private IMailService mailService;

    @RequestMapping(value = "/listMail",method = RequestMethod.GET)
    @ResponseBody
    public ApiResult listMail(MailParam mailParam){
        ApiResult apiResult = mailService.listMail(mailParam);
        return apiResult;
    }

    @RequestMapping(value = "/listRecieveMail",method = RequestMethod.GET)
    @ResponseBody
    public ApiResult listRecieveMail(String aoData,MailParam mailParam){
        ApiResult apiResult = mailService.listRecieveMail(aoData,mailParam);
        return apiResult;
    }

    @RequestMapping(value = "/updateByAddressee",method = RequestMethod.POST)
    @ResponseBody
    public ApiResult updateByAddressee(Mail mail){
        ApiResult apiResult = mailService.updateByAddressee(mail);
        return apiResult;
    }

    @RequestMapping(value = "/updateBySender",method = RequestMethod.POST)
    @ResponseBody
    public ApiResult updateBySender(Mail mail){
        ApiResult apiResult = mailService.updateBySender(mail);
        return apiResult;
    }

    @RequestMapping(value = "/listSendMail",method = RequestMethod.GET)
    @ResponseBody
    public ApiResult listSendMail(String aoData,MailParam mailParam){
        ApiResult apiResult = mailService.listSendMail(aoData,mailParam);
        return apiResult;
    }

    @RequestMapping(value = "/insertMail",method = RequestMethod.POST)
    @ResponseBody
    public ApiResult insertMail(Mail mail){
        ApiResult apiResult = mailService.insertMail(mail);
        return apiResult;
    }

    @RequestMapping(value = "/sendMail",method = RequestMethod.POST)
    @ResponseBody
    public ApiResult sendMail(Mail mail){
        ApiResult apiResult = mailService.sendMail(mail);
        return apiResult;
    }

    @RequestMapping(value = "/saveAsDraft",method = RequestMethod.POST)
    @ResponseBody
    public ApiResult saveAsDraft(Mail mail){
        ApiResult apiResult = mailService.saveAsDraft(mail);
        return apiResult;
    }

    @RequestMapping(value = "/getMail",method = RequestMethod.GET)
    @ResponseBody
    public ApiResult getMail(MailParam mailParam){
        ApiResult apiResult = mailService.getMail(mailParam);
        return apiResult;
    }

    @RequestMapping(value = "/getUnsolvedMail",method = RequestMethod.GET)
    @ResponseBody
    public ApiResult getUnsolvedMail(Integer id){
        return mailService.getUnsolvedMail(id);
    }

}
