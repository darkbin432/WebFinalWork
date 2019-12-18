package com.hznu.lwb.api;

import com.hznu.lwb.ApplicationController;
import com.hznu.lwb.model.Zixun;
import com.hznu.lwb.model.param.ZixunParam;
import com.hznu.lwb.model.result.ApiResult;
import com.hznu.lwb.service.IZixunService;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

@Controller
@RequestMapping("/api")
public class ZixunController extends ApplicationController {

    @Resource
    private IZixunService zixunService;

    @RequestMapping(value = "/listZixun", method = RequestMethod.GET)
    @ResponseBody
    public ApiResult listZixun(){
        return zixunService.getMany(6);
    }
    @RequestMapping(value = "/getZixuns", method = RequestMethod.GET)
    @ResponseBody
    private ApiResult getZixuns(@Param("title")String title, @Param("scopeId")Integer scopeId, @Param("startTime")String startTime, @Param("endTime")String endTime, @Param("pageNow") String pageNow) {
        ApiResult apiResult = new ApiResult();
        return zixunService.selectByPage(title, scopeId, startTime, endTime, pageNow);
    }

    @RequestMapping(value = "/getZixun", method = RequestMethod.GET)
    @ResponseBody
    private ApiResult getZixun(Integer id) {
        return zixunService.getOne(id);
    }

    @RequestMapping(value = "/deleteZixun", method = RequestMethod.POST)
    @ResponseBody
    private ApiResult deleteZixun(@Param("id") Integer id){
        return zixunService.delete(id);
    }

    @RequestMapping(value = "/updateZixun", method = RequestMethod.POST)
    @ResponseBody
    private ApiResult updateZixun(@RequestBody Zixun zixun){
        return zixunService.update(zixun);
    }

    @RequestMapping(value = "/insertZixun", method = RequestMethod.POST)
    @ResponseBody
    private ApiResult insertZixun(@RequestBody Zixun zixun){
        return zixunService.insert(zixun);
    }

    @RequestMapping(value = "/getAllZixun", method = RequestMethod.GET)
    @ResponseBody
    private ApiResult getAllZixun(String aoData, ZixunParam zixunParam){
        return zixunService.getAllZixun(aoData, zixunParam);
    }

    @RequestMapping(value = "/updateZixunCountRead", method = RequestMethod.POST)
    @ResponseBody
    private ApiResult updateZixunCountRead(@RequestParam("id")Integer id){
        return zixunService.countRead(id);
    }
}
