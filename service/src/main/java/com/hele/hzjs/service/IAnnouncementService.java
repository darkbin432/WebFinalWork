package com.hele.hzjs.service;

import com.hele.hzjs.model.Announcement;
import com.hele.hzjs.model.param.AnnouncementParam;
import com.hele.hzjs.model.result.ApiResult;
import org.springframework.web.multipart.MultipartFile;

public interface IAnnouncementService {
    ApiResult insert(Announcement announcement);

    ApiResult getMany(Integer num);

    ApiResult delete(Integer id);

    ApiResult selectByPage(String title, Integer scopeId, String startTime, String endTime, Integer pageNow);

    ApiResult update(Announcement announcement);

    ApiResult getOne(Integer id);

    ApiResult insertImage(MultipartFile file, String path);

    ApiResult countRead(Integer id);

    ApiResult getAllAnnouncement(String aoData, AnnouncementParam announcementParam);
}