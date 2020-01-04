package com.hznu.lwb.service;

import com.hznu.lwb.model.result.ApiResult;
import org.springframework.transaction.annotation.Transactional;
import javax.mail.MessagingException;

public interface IMailSenderService {
    /*普通格式发送
     * @recipient 收件人地址
     * @subject 主题
     * @content 正文
     * */
    @Transactional
    ApiResult sendEmail(String recipient, String subject, String content);

    /*带抄送
     * */
    void sendHtmlEmail(String recipient,String subject,String content) throws MessagingException, Exception;

}