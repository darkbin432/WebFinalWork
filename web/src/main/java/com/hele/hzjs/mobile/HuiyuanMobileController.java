package com.hele.hzjs.mobile;

import com.hele.hzjs.model.Huiyuan;
import com.hele.hzjs.model.result.ApiResult;
import com.hele.hzjs.service.IHuiyuanService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;

@Controller
@RequestMapping("/m/huiyuan")
public class HuiyuanMobileController {

    @Resource
    private IHuiyuanService huiyuanService;

    @RequestMapping(value = "/add",method = RequestMethod.POST)
    @ResponseBody
    public ApiResult insertHuiyuan(@RequestBody  Huiyuan huiyuan){
        return huiyuanService.insertHuiyuan2(huiyuan);
    }

    @RequestMapping(value = "/edit",method = RequestMethod.POST)
    @ResponseBody
    public ApiResult updateHuiyuan(@RequestBody Huiyuan huiyuan){
        return huiyuanService.updateHuiyuan(huiyuan);
    }

    @RequestMapping(value = "/apply",method = RequestMethod.POST)
    @ResponseBody
    public ApiResult apply(Huiyuan huiyuan){
        return huiyuanService.updateHuiyuan(huiyuan);
    }

    @RequestMapping(value = "/get",method = RequestMethod.GET)
    @ResponseBody
    public ApiResult getHuiyuan(String cardNo){
        return huiyuanService.getHuiyuanByCardNo(cardNo);
    }
}
