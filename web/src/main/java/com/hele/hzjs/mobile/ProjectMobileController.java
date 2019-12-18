package com.hele.hzjs.mobile;

import com.hele.hzjs.model.result.ApiResult;
import com.hele.hzjs.service.IProjectService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;

/**
 * @author Xueht
 * @Date: Create in 20:34 2019/3/25
 */

@Controller
@RequestMapping("/m/project")
public class ProjectMobileController {
    @Resource
    private IProjectService projectService;

    @RequestMapping(value = "/getList", method = RequestMethod.GET)
    @ResponseBody
    ApiResult getList(){
        return projectService.getList();
    }

}
