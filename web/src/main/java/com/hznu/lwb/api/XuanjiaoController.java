package com.hznu.lwb.api;

import com.hznu.lwb.ApplicationController;
import com.hznu.lwb.model.Xuanjiao;
import com.hznu.lwb.model.param.XuanjiaoParam;
import com.hznu.lwb.model.result.ApiResult;
import com.hznu.lwb.service.IXuanjiaoService;
import org.apache.ibatis.annotations.Param;
import org.apache.poi.xssf.XLSBUnsupportedException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

@Controller
@RequestMapping("/api")
public class XuanjiaoController extends ApplicationController {

    @Resource
    private IXuanjiaoService xuanjiaoService;

    @RequestMapping(value = "/listXuanjiao", method = RequestMethod.GET)
    @ResponseBody
    public ApiResult listXuanjiao(){
        ApiResult apiResult = xuanjiaoService.getMany(6);
        return apiResult;
    }

    @RequestMapping(value = "/listXuanjiaoIndex", method = RequestMethod.GET)
    @ResponseBody
    public ApiResult listXuanjiaoIndex(){
        ApiResult apiResult = xuanjiaoService.getManyIndex(3);
        return apiResult;
    }

    @RequestMapping(value = "/getXuanjiaos", method = RequestMethod.GET)
    @ResponseBody
    private ApiResult getXuanjiaos(@Param("num")Integer num, @Param("title") String title, @Param("name") String name, @Param("type")Integer type, @Param("pageNow") String pageNow) {
        ApiResult apiResult = new ApiResult();
        apiResult = xuanjiaoService.selectByPage(title, name, type, pageNow);
        return apiResult;
    }

    @RequestMapping(value = "/getXuanjiao", method = RequestMethod.GET)
    @ResponseBody
    private ApiResult getXuanjiao(@Param("id") Integer id) {
        ApiResult apiResult = new ApiResult();
        apiResult = xuanjiaoService.getOne(id);
        return apiResult;
    }

    @RequestMapping(value = "/deleteXuanjiao", method = RequestMethod.POST)
    @ResponseBody
    private ApiResult deleteXuanjiao(@Param("id") Integer id){
        ApiResult apiResult = new ApiResult();
        apiResult = xuanjiaoService.delete(id);
        return apiResult;
    }

    @RequestMapping(value = "/updateXuanjiao", method = RequestMethod.POST)
    @ResponseBody
    private ApiResult updateXuanjiao(@RequestBody Xuanjiao xuanjiao){
        ApiResult apiResult = xuanjiaoService.update(xuanjiao);
        return apiResult;
    }

    @RequestMapping(value = "/insertXuanjiao", method = RequestMethod.POST)
    @ResponseBody
    private ApiResult insertXuanjiao(@RequestBody Xuanjiao xuanjiao){
        return xuanjiaoService.insert(xuanjiao);
    }

    @RequestMapping(value = "/getAllXuanjiao", method = RequestMethod.GET)
    @ResponseBody
    private ApiResult getAllXuanjiao(String aoData, XuanjiaoParam xuanjiaoParam){
        return xuanjiaoService.getAllXuanjiao(aoData, xuanjiaoParam);
    }

    @RequestMapping(value = "/updateXuanjiaoCountRead", method = RequestMethod.POST)
    @ResponseBody
    private ApiResult updateXuanjiaoCountRead(@RequestParam("id") Integer id){
        return xuanjiaoService.countRead(id);
    }
}
