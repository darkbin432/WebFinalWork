package com.hele.hzjs.api;

import com.hele.hzjs.ApplicationController;
import com.hele.hzjs.model.Announcement;
import com.hele.hzjs.model.User;
import com.hele.hzjs.model.param.AnnouncementParam;
import com.hele.hzjs.model.result.ApiResult;
import com.hele.hzjs.service.IAnnouncementService;
import com.hele.hzjs.service.IOrganizationMemberService;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

@Controller
@RequestMapping("/api")
public class AnnouncementController extends ApplicationController{

    @Resource
    private IAnnouncementService announcementService;

    @Resource
    private IOrganizationMemberService organizationMemberService;

    @RequestMapping(value = "/listAnnouncement", method = RequestMethod.GET)
    @ResponseBody
    public ApiResult ListAnnouncement(HttpServletRequest request){
        ApiResult apiResult = announcementService.getMany(6);
        return apiResult;
    }
    @RequestMapping(value = "/getAnnouncements", method = RequestMethod.GET)
    @ResponseBody
    private ApiResult getAnnouncements(@RequestParam("title") String title, @RequestParam("scopeId") Integer scopeId, @RequestParam("startTime") String startTime, @RequestParam("endTime")String endTime, @RequestParam("pageNow") Integer pageNow) {
        ApiResult apiResult = apiResult = announcementService.selectByPage(title, scopeId, startTime, endTime, pageNow);
        return apiResult;
    }

    @RequestMapping(value = "/getAnnouncement", method = RequestMethod.GET)
    @ResponseBody
    private ApiResult getAnnouncement(@Param("id")Integer id){
        ApiResult apiResult = new ApiResult();
        apiResult = announcementService.getOne(id);
        return apiResult;
    }

    @RequestMapping(value = "/deleteAnnouncement", method = RequestMethod.POST)
    @ResponseBody
    private ApiResult deleteAnnouncement(@Param("id") Integer id){
        ApiResult apiResult = new ApiResult();
        apiResult = announcementService.delete(id);
        return apiResult;
    }

    @RequestMapping(value = "/updateAnnouncement", method = RequestMethod.POST)
    @ResponseBody
    private ApiResult updateAnnouncement(@RequestBody Announcement announcement){
        ApiResult apiResult = new ApiResult();
        apiResult = announcementService.update(announcement);
        return apiResult;
    }

    @RequestMapping(value = "/insertAnnouncement", method = RequestMethod.POST)
    @ResponseBody
    private ApiResult insertAnnouncement(@RequestBody  Announcement announcement){
        ApiResult apiResult = new ApiResult();
        apiResult = announcementService.insert(announcement);
        return apiResult;
    }

    @RequestMapping(value = "/getUrl", method = RequestMethod.GET)
    @ResponseBody
    private ApiResult getUrl(@Param("id") Integer id){
        return null;
    }

    @RequestMapping(value = "/updateAnnouncementReadCount", method = RequestMethod.POST)
    @ResponseBody
    private ApiResult updateAnnouncementReadCount(@Param("id") Integer id){
        return announcementService.countRead(id);
    }

    @RequestMapping(value = "/getAllAnnouncement", method = RequestMethod.GET)
    @ResponseBody
    private ApiResult getAllAnnouncement(String aoData, AnnouncementParam announcementParam){
        return announcementService.getAllAnnouncement(aoData, announcementParam);
    }

    @RequestMapping(value = "/updateAnnouncementCountRead", method = RequestMethod.POST)
    @ResponseBody
    private ApiResult updateAnnouncementCountRead(@RequestParam("id") Integer id){
        return announcementService.countRead(id);
    }

}