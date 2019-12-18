package com.hele.hzjs.api;

import com.hele.hzjs.model.result.ApiResult;
import com.hele.hzjs.service.impl.ToolService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 *  *
 *
 * @author hanbing
 */
@Controller
@RequestMapping("api/test")
public class TestApiController {

    private final ToolService toolService;

    @Autowired
    public TestApiController(ToolService toolService) {

        this.toolService = toolService;
    }


    @RequestMapping(value = "getActivityQR/{id}", method = RequestMethod.GET)
    @ResponseBody
    public ApiResult getActivityQR(@PathVariable("id") Integer id) {
        return toolService.getQrcodeByActivityId(id);
    }

    @RequestMapping(value = "getOrganizationMemberQR/{id}", method = RequestMethod.GET)
    @ResponseBody
    public ApiResult getOrganizationMemberQR(@PathVariable("id") Integer id) {
        return toolService.getQrcodeByOrganizationMemberId(id);
    }

    @RequestMapping(value = "refreshCache", method = RequestMethod.GET)
    @ResponseBody
    public ApiResult refreshCache() {
        return toolService.refreshCache();
    }
}
