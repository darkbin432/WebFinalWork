package com.hele.hzjs.service.impl;

import com.hele.hzjs.model.Announcement;
import com.hele.hzjs.model.PageBean;
import com.hele.hzjs.model.param.AnnouncementParam;
import com.hele.hzjs.model.result.ApiResult;
import com.hele.hzjs.model.vm.DataTablesParameters;
import com.hele.hzjs.persistence.AnnouncementDao;
import com.hele.hzjs.service.IAnnouncementService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import sun.security.krb5.internal.APOptions;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

@Service
public class
AnnouncementService implements IAnnouncementService {

    private Logger logger = LoggerFactory.getLogger(this.getClass());

    @Resource
    AnnouncementDao announcementDao;

    @Override
    public ApiResult getMany(Integer num) {
        ApiResult apiResult = new ApiResult();
        try {
            List<Announcement> la = announcementDao.getMany(num);
            apiResult.success(la);
        } catch (Exception ex) {
            logger.error(ex.getMessage(), ex);
            apiResult.fail("获取公告失败或无可见公告");
        }
        return apiResult;
    }

    @Override
    public ApiResult insert(Announcement announcement) {
        ApiResult apiResult = new ApiResult();
        try {
            announcementDao.insertInfo(announcement);
            int id = announcement.getId();
            announcement = announcementDao.getOne(id);
            if (announcement != null) {
                apiResult.success(announcement);
            } else {
                apiResult.fail("公告新增失败");
            }
        } catch (Exception ex) {
            logger.error(ex.getMessage(), ex);
            apiResult.fail("公告新增失败");
        }
        return apiResult;
    }

    @Override
    public ApiResult delete(Integer id) {
        ApiResult apiResult = new ApiResult();
        try {
            announcementDao.deleteInfo(id);
            Announcement announcement = announcementDao.getOne(id);
            if (announcement == null) {
                apiResult.success();
            } else {
                apiResult.fail("公告删除失败");
            }
        } catch (Exception ex) {
            logger.error(ex.getMessage(), ex);
        }
        return apiResult;
    }

    @Override
    public ApiResult selectByPage(String title, Integer scopeId, String startTime, String endTime, Integer pageNow) {
        ApiResult apiResult = new ApiResult();
        try {

            AnnouncementParam announcementParam = new AnnouncementParam();

            announcementParam.setPageNow(Integer.valueOf(pageNow));
            announcementParam.setSize(8);
            announcementParam.initOffset();

            if (title != null) {
                announcementParam.setTitle(title);
            }
//            if (scopeId != null && scopeId != 0) {
//                if (scopeId % 100 == 0) {
//                    announcementParam.setScopeLeft(scopeId / 100 * 100);
//                    announcementParam.setScopeRight(scopeId / 100 * 100 + 99);
//                } else {
//                    announcementParam.setScopeLeft(scopeId);
//                    announcementParam.setScopeRight(scopeId);
//                }
//
//            }
            if (startTime != null) {
                announcementParam.setStartTime(startTime);
            }
            if (endTime != null) {
                announcementParam.setEndTime(endTime);
            }

            Integer totalCount = announcementDao.getPageCount(announcementParam);

            List<Announcement> la = announcementDao.selectAnnouncementInfo(announcementParam);
            if (la != null) {
                apiResult.setTotalCount(totalCount);
                apiResult.success(la);
            } else {
                apiResult.fail("筛选资讯失败");
            }
        } catch (Exception ex) {
            logger.error(ex.getMessage(), ex);
            apiResult.fail("公告获取失败");
        }
        return apiResult;
    }

    @Override
    public ApiResult update(Announcement announcement) {
        ApiResult apiResult = new ApiResult();
        try {
            int id = announcement.getId();
            Announcement tmp = announcementDao.getOne(id);
            if (tmp != null) {
                announcementDao.updateInfo(announcement);
                apiResult.success(announcement);
            } else {
                apiResult.fail("公告更新失败");
            }
        } catch (Exception ex) {
            logger.error(ex.getMessage(), ex);
            apiResult.fail("公告更新失败");
        }
        return apiResult;
    }

    @Override
    public ApiResult getOne(Integer id) {
        ApiResult apiResult = new ApiResult();
        try {
            Announcement announcement = announcementDao.getOne(id);
            if (announcement != null) {
                apiResult.success(announcement);
            } else {
                apiResult.fail("公告获取失败");
            }
        } catch (Exception ex) {
            logger.error(ex.getMessage(), ex);
            apiResult.fail("公告获取失败");
        }
        return apiResult;
    }

    @Override
    public ApiResult insertImage(MultipartFile file, String path) {
        return null;
    }

    @Override
    public ApiResult countRead(Integer id) {
        ApiResult apiResult = new ApiResult();
        try {
            announcementDao.countRead(id);
            apiResult.success();
        } catch (Exception ex) {
            logger.error(ex.getMessage(), ex);
            apiResult.fail("更新失败");
        }
        return apiResult;
    }

    @Override
    public ApiResult getAllAnnouncement(String aoData, AnnouncementParam announcementParam) {
        ApiResult apiResult = new ApiResult();

        try {

            DataTablesParameters parameters = DataTablesParameters.fromJson(aoData);

            announcementParam.setSize(parameters.getRows());
            announcementParam.setOffset(parameters.getStart());

            List<Announcement> la = announcementDao.selectAnnouncementInfo(announcementParam);

            apiResult.dataTable(parameters.getsEcho(), la.size(), la);
            apiResult.success();

        } catch (Exception ex) {
            logger.error(ex.getMessage(), ex);
            apiResult.fail("筛选公告失败");
        }

        return apiResult;
    }
}