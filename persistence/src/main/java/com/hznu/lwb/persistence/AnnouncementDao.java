package com.hznu.lwb.persistence;

import com.hznu.lwb.model.Announcement;
import com.hznu.lwb.model.param.AnnouncementParam;
import org.apache.ibatis.annotations.Param;
import org.omg.PortableInterceptor.INACTIVE;

import java.util.Date;
import java.util.List;

public interface AnnouncementDao {


    void insertInfo(Announcement announcement);

    void insertRelationship(@Param("announcementId") Integer announcementId,@Param("scopeId") Integer scopeId,
                            @Param("version") String version,@Param("status") Integer status);

    List<Announcement> getMany(@Param("num")Integer num);

    Announcement getOne(int id);

    void countRead(int id);

    void updateInfo(Announcement announcement);

    void updateRelationship(@Param("id") Integer id,@Param("scope") Integer scope);

    void deleteInfo(int id);

    void deleteRelationship(int id);

//    int getPageCount(@Param("title") String title, @Param("scopeId") Integer scopeId, @Param("startTime") String startTime, @Param("endTime")String endTime);

//    List<Announcement> selectAnnouncementInfo(@Param("title") String title, @Param("scopeId") Integer scopeId, @Param("startTime") String startTime, @Param("endTime")String endTime, @Param("startPos")Integer startPos, @Param("pageSize")Integer pageSize);

    int getPageCount(AnnouncementParam announcementParam);

    List<Announcement> selectAnnouncementInfo(AnnouncementParam announcementParam);
}