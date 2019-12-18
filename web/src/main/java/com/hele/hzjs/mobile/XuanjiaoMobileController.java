package com.hele.hzjs.mobile;

import com.hele.hzjs.ApplicationController;
import com.hele.hzjs.model.param.XuanjiaoParam;
import com.hele.hzjs.model.result.ApiResult;
import com.hele.hzjs.service.IXuanjiaoService;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

/**
 * @author hanbing
 */
@Controller
@RequestMapping("/m/xuanjiao")
public class XuanjiaoMobileController extends ApplicationController {

    @Resource
    private IXuanjiaoService xuanjiaoService;

    @RequestMapping(value = "/getList", method = RequestMethod.POST)
    @ResponseBody
    public ApiResult getList(@RequestBody XuanjiaoParam xuanjiaoParam) {
        return xuanjiaoService.getList(xuanjiaoParam);
    }


    @RequestMapping(value = "/get", method = RequestMethod.GET)
    @ResponseBody
    public ApiResult getXuanjiao(@Param("id") Integer id) {
        return xuanjiaoService.getOne(id);
    }
}
