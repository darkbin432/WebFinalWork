package com.hznu.lwb.service.impl;

import com.hznu.lwb.model.result.ApiResult;
import com.hznu.lwb.service.IMailSenderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

/**
 * @author 斌
 */
@Service
public class MailSenderService implements IMailSenderService {
    @Autowired
    private JavaMailSenderImpl mailSender;

    /**
     *   JavaMailSenderImpl支持MimeMessages和SimpleMailMessages。
     * MimeMessages为复杂邮件模板，支持文本、附件、html、图片等。
     * SimpleMailMessages实现了MimeMessageHelper，为普通邮件模板，支持文本
     */

    /**
     * 描述：Spring 依赖注入
     *
     * @param mailSender
     * @author wanghaoyu
     * @date
     * @version 1.0
     * @since 1.8
     */
    public void setMailSender(JavaMailSenderImpl mailSender) {
        this.mailSender = mailSender;
    }

    /**
     * 单发
     *
     * @param recipient 收件人
     * @param subject   主题
     * @param content   内容
     */
    @Override
    public ApiResult sendEmail(String recipient, String subject, String content) {
        ApiResult apiResult = new ApiResult();
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        try {
            MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage, true, "UTF-8");
            messageHelper.setFrom("1015817997@qq.com");//发件人
            messageHelper.setTo(recipient);
            messageHelper.setSubject(subject);
            messageHelper.setText(content, true);//true代表支持html格式
            mailSender.send(mimeMessage);
            apiResult.success();
        } catch (MessagingException e) {
            apiResult.fail();
//            e.printStackTrace();
        }
        return apiResult;

    }


    @Override
    public void sendHtmlEmail(String recipient, String subject, String content) throws Exception {
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        try {
            MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage, true, "UTF-8");
            messageHelper.setFrom("xx@qq.com");//发件人
            messageHelper.setTo(recipient);
            messageHelper.setSubject(subject);
            messageHelper.setText(content, true);
            mimeMessage.setRecipients(Message.RecipientType.CC, "xx@qq.com");//抄送人
            mailSender.send(mimeMessage);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }

}