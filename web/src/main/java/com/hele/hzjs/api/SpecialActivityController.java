package com.hele.hzjs.api;

import com.hele.hzjs.model.SpecialActivity;
import com.hele.hzjs.model.param.HuiyuanActivityParam;
import com.hele.hzjs.model.param.SpecialActivityParam;
import com.hele.hzjs.model.result.ApiResult;
import com.hele.hzjs.service.ISpecialActivityService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

/**
 * @author Xueht
 */
@Controller
@RequestMapping("/api")
public class SpecialActivityController {

    @Resource
    private ISpecialActivityService specialActivityService;

    @RequestMapping(value = "/insertSpecialActivity", method = RequestMethod.POST)
    @ResponseBody
    private ApiResult insertSpecialActivity(@RequestBody SpecialActivity specialActivity) {
        return specialActivityService.insert(specialActivity);
    }

    @RequestMapping(value = "/deleteSpecialActivity", method = RequestMethod.POST)
    @ResponseBody
    private ApiResult deleteSpecialActivity(@RequestParam("id") Integer id) {
        return specialActivityService.delete(id);
    }

    @RequestMapping(value = "/updateSpecialActivity", method = RequestMethod.POST)
    @ResponseBody
    private ApiResult updateSpecialActivity(@RequestBody SpecialActivity specialActivity) {
        return specialActivityService.update(specialActivity);
    }

    @RequestMapping(value = "/getOneSpecialActivity", method = RequestMethod.GET)
    @ResponseBody
    private ApiResult getOneSpecialActivity(@RequestParam("id") Integer id) {
        return specialActivityService.getOne(id);
    }

    @RequestMapping(value = "/getAllSpecialActivity", method = RequestMethod.GET)
    @ResponseBody
    private ApiResult getAllSpecialActivity(String aoData, SpecialActivityParam specialActivityParam) {
        return specialActivityService.getAllSpecialActivity(aoData, specialActivityParam);
    }

    @RequestMapping(value = "/getAllYear", method = RequestMethod.GET)
    @ResponseBody
    private ApiResult getAllYear() {
        return specialActivityService.getAllYear();
    }
}
