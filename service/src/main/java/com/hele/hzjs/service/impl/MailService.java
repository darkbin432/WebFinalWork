package com.hele.hzjs.service.impl;

import com.hele.hzjs.model.Mail;
import com.hele.hzjs.model.param.MailParam;
import com.hele.hzjs.model.result.ApiResult;
import com.hele.hzjs.model.vm.DataTablesParameters;
import com.hele.hzjs.persistence.MailDao;
import com.hele.hzjs.persistence.OrganizationMemberDao;
import com.hele.hzjs.service.IMailService;
import com.sun.org.apache.xml.internal.resolver.readers.TR9401CatalogReader;
import org.apache.shiro.authc.MergableAuthenticationInfo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class MailService implements IMailService {

    Logger logger = LoggerFactory.getLogger(this.getClass());

    @Resource
    MailDao mailDao;

    @Resource
    OrganizationMemberDao organizationMemberDao;

    @Override
    public ApiResult listMail(MailParam mailParam) {
        ApiResult apiResult = new ApiResult();
        try {
            mailParam.initOffset();

            List<Mail> lm = mailDao.listRecieveMail(mailParam);
//            List<Mail> lm = new ArrayList<>();
//            for (int i: lmi) {
//                mailParam.setId(i);
//                lm.add(mailDao.getOneByAddressee(mailParam));
//            }
            apiResult.success(lm);
        }catch(Exception e){
            logger.error(e.getMessage(),e);
            apiResult.fail("获取收件失败");
        }
        return apiResult;
    }

    @Override
    public ApiResult listRecieveMail(String aoData,MailParam mailParam){
        ApiResult apiResult = new ApiResult();
        try {

            DataTablesParameters parameters = DataTablesParameters.fromJson(aoData);

            mailParam.setSize(parameters.getRows());
            mailParam.setOffset(parameters.getStart());

            Integer totalCount = mailDao.getRecievePageCount(mailParam);

            List<Mail> lm = mailDao.listRecieveMail(mailParam);

//            List<Mail> lm = new ArrayList<>();
//            for (int i: lmi) {
//                mailParam.setId(i);
//                lm.add(mailDao.getOneByAddressee(mailParam));
//            }
            apiResult.dataTable(parameters.getsEcho(),totalCount,lm);
            apiResult.success(lm);
        }catch(Exception e){
            logger.error(e.getMessage(),e);
            apiResult.fail("获取收件失败");
        }
        return apiResult;
    }

    @Override
    public ApiResult updateByAddressee(Mail mail) {
        ApiResult apiResult = new ApiResult();
        try {
            mailDao.updateRelationship(mail);
            apiResult.success("更新邮件成功");
        }catch(Exception e){
            logger.error(e.getMessage(),e);
            apiResult.fail("更新邮件失败");
        }
        return apiResult;
    }

    @Override
    public ApiResult updateBySender(Mail mail) {
        ApiResult apiResult = new ApiResult();
        try {
            mailDao.updateInfo(mail);
            apiResult.success();
        }catch(Exception e){
            apiResult.fail("更新邮件失败");
        }
        return apiResult;
    }

    @Override
    public ApiResult listSendMail(String aoData,MailParam mailParam) {
        ApiResult apiResult = new ApiResult();
        try {
            DataTablesParameters parameters = DataTablesParameters.fromJson(aoData);

            mailParam.setSize(parameters.getRows());
            mailParam.setOffset(parameters.getStart());

            Integer totalCount = mailDao.getSendPageCount(mailParam);

            List<Mail> lm = mailDao.getSendMail(mailParam);

            apiResult.dataTable(parameters.getsEcho(),totalCount,lm);
            apiResult.success();
        }catch(Exception e){
            logger.error(e.getMessage(),e);
            apiResult.fail("获取发送方邮件失败");
        }
        return apiResult;
    }

    @Override
    public ApiResult insertMail(Mail mail) {
        ApiResult apiResult = new ApiResult();
        try {
            mailDao.insert(mail);
            apiResult.success();
        }catch(Exception e){
            apiResult.fail("新建邮件失败");
        }
        return apiResult;
    }

    @Override
    public ApiResult sendMail(Mail mail) {
        ApiResult apiResult = new ApiResult();
        try {
            mail.setSendStatus(1);
            mail.setDate(new Date());
            //使用用户名发送邮件，通过用户名转化为id在进行状态变化
            String tmp = "";
            for (String i : mail.getToUserName().split(";")){
                tmp += organizationMemberDao.getIdByUserName(i) + ";";
            }
            mail.setToMail(tmp);
            mailDao.insert(mail);
            for (String i : tmp.substring(0,tmp.length()-1).split(";")){
                mailDao.insertRelationship(mail.getId(),Integer.valueOf(i));
            }
            apiResult.success("邮件发送成功");
        }catch(Exception e){
            logger.error(e.getMessage(),e);
            apiResult.fail("发送邮件失败");
        }
        return apiResult;
    }

    @Override
    public ApiResult saveAsDraft(Mail mail) {
        ApiResult apiResult = new ApiResult();
        try {
            mail.setSendStatus(0);
            mailDao.insert(mail);
            apiResult.success();
        }catch(Exception e){
            apiResult.fail("保存草稿失败");
        }
        return apiResult;
    }

    @Override
    public ApiResult getMail(MailParam mailParam) {
        ApiResult apiResult = new ApiResult();
        try {
            Mail mail = mailDao.getOneMail(mailParam);
            apiResult.success(mail);
        }catch(Exception e){
            logger.error(e.getMessage(),e);
            apiResult.fail("获取邮件失败");
        }
        return apiResult;
    }

    @Override
    public ApiResult getUnsolvedMail(Integer id) {
        ApiResult apiResult = new ApiResult();
        try {
            Integer totalCount = mailDao.getUnsolvedMail(id);
            apiResult.success(String.valueOf(totalCount));
        } catch (Exception ex){
            logger.error(ex.getMessage(), ex);
            apiResult.fail("获取未读数量失败");
        }
        return apiResult;
    }
}
