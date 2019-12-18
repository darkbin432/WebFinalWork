package com.hznu.lwb.service;

import com.hznu.lwb.model.Mail;
import com.hznu.lwb.model.param.MailParam;
import com.hznu.lwb.model.result.ApiResult;

import java.util.List;

public interface IMailService {
    ApiResult listMail(MailParam mailParam);
    ApiResult listRecieveMail(String aoData,MailParam mailParam);
    ApiResult listSendMail(String aoData,MailParam mailParam);
    ApiResult updateByAddressee(Mail mail);
    ApiResult updateBySender(Mail mail);
    ApiResult insertMail(Mail mail);
    ApiResult sendMail(Mail mail);
    ApiResult saveAsDraft(Mail mail);
    ApiResult getMail(MailParam mailParam);
    ApiResult getUnsolvedMail(Integer id);
}
