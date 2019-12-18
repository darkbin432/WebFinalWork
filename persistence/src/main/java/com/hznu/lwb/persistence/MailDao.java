package com.hznu.lwb.persistence;

import com.hznu.lwb.model.Mail;
import com.hznu.lwb.model.param.MailParam;
import org.apache.ibatis.annotations.Param;
import org.omg.PortableInterceptor.INACTIVE;

import java.util.List;

public interface MailDao {
    Integer getMaxId(@Param("table") String tableName);

    Integer insert(Mail mail);

    Integer insertRelationship(@Param("mailId") Integer mailId,@Param("organizationMemberId") Integer organizationMemberId);

    Integer getRecievePageCount(MailParam mailParam);

    List<Mail> listRecieveMail(MailParam mailParam);

    Integer getSendPageCount(MailParam mailParam);

    List<Mail> getSendMail(MailParam mailParam);

    Mail getOne(MailParam mailParam);

    Mail getOneBySender(@Param("mailId")Integer mailId);

    Mail getOneByAddressee(MailParam mailParam);

    Mail getOneMail(MailParam mailParam);

    Integer getUnsolvedMail(Integer id);

    Integer updateInfo(Mail mail);

    Integer updateRelationship(Mail mail);

    Integer deleteIn(Integer id);

    Integer deleteTo(Integer id);
}
