package com.hznu.lwb.api;

import com.hznu.lwb.model.result.ApiResult;
import com.hznu.lwb.service.IProjectService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

/**
 * @author Xueht
 * @Date: Create in 20:34 2019/3/25
 */

@Controller
@RequestMapping("/api")
public class ProjectController {
    @Resource
    private IProjectService projectService;

    @RequestMapping(value = "/getProject", method = RequestMethod.GET)
    @ResponseBody
    public ApiResult getProject(@RequestParam("id") Integer id){
        return projectService.getOne(id);
    }

    @RequestMapping(value = "/getProjectList", method = RequestMethod.GET)
    @ResponseBody
    public ApiResult getProjectList(){
        return projectService.getList();
    }

}
