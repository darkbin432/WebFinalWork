package com.hele.hzjs.service.impl;

import com.hele.hzjs.model.Project;
import com.hele.hzjs.model.result.ApiResult;
import com.hele.hzjs.persistence.ProjectDao;
import com.hele.hzjs.service.IProjectService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * @Auther: Xueht
 * @Date: Create in 20:30 2019/3/25
 */

@Service
public class ProjectService implements IProjectService {

    private Logger logger = LoggerFactory.getLogger(this.getClass());

    @Resource
    ProjectDao projectDao;

    @Override
    public ApiResult getOne(Integer id) {
        ApiResult apiResult = new ApiResult();
        try {
            Project project = projectDao.getOne(id);
            if (project != null) {
               apiResult.success(project);
            } else {
                apiResult.fail("项目获取失败");
            }
        } catch (Exception ex) {
            logger.error(ex.getMessage(), ex);
            apiResult.fail("获取项目失败");
        }
        return apiResult;
    }

    @Override
    public ApiResult getList() {
        ApiResult apiResult = new ApiResult();
        try {
            List<Project> projectList = projectDao.selectAll();
            apiResult.success(projectList);
        } catch (Exception ex) {
            logger.error(ex.getMessage(), ex);
            apiResult.fail("获取项目失败");
        }
        return apiResult;
    }
}
