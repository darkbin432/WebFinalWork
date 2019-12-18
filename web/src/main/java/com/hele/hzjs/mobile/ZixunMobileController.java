package com.hele.hzjs.mobile;

import com.hele.hzjs.ApplicationController;
import com.hele.hzjs.model.param.ZixunParam;
import com.hele.hzjs.model.result.ApiResult;
import com.hele.hzjs.service.IZixunService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

/**
 * @author hanbing
 */
@Controller
@RequestMapping("/m/zixun")
public class ZixunMobileController extends ApplicationController {

    @Resource
    private IZixunService zixunService;

    @RequestMapping(value = "/getList", method = RequestMethod.POST)
    @ResponseBody
    public ApiResult getList(@RequestBody ZixunParam zixunParam) {
        return zixunService.getList(zixunParam);
    }

    @RequestMapping(value = "/get", method = RequestMethod.GET)
    @ResponseBody
    public ApiResult get(Integer id) {
        return zixunService.getOne(id);
    }
}
