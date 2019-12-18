package com.hele.hzjs.service;

import com.hele.hzjs.model.Mail;
import com.hele.hzjs.model.param.MailParam;
import com.hele.hzjs.model.result.ApiResult;

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
