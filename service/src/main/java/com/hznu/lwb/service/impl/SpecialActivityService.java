package com.hznu.lwb.service.impl;

import com.hznu.lwb.model.SpecialActivity;
import com.hznu.lwb.model.param.SpecialActivityParam;
import com.hznu.lwb.model.result.ApiResult;
import com.hznu.lwb.model.vm.DataTablesParameters;
import com.hznu.lwb.persistence.SpecialActivityDao;
import com.hznu.lwb.service.ISpecialActivityService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * @author Xueht
 */
@Service
public class SpecialActivityService implements ISpecialActivityService {
    private Logger logger = LoggerFactory.getLogger(this.getClass());

    @Resource
    private SpecialActivityDao specialActivityDao;

    @Override
    public ApiResult insert(SpecialActivity specialActivity) {
        ApiResult apiResult = new ApiResult();
        try {
            specialActivityDao.insertInfo(specialActivity);
            apiResult.success(specialActivity);
        } catch (Exception ex) {
            logger.error(ex.getMessage(), ex);
            apiResult.fail("插入失败");
        }
        return apiResult;
    }

    @Override
    public ApiResult update(SpecialActivity specialActivity) {
        ApiResult apiResult = new ApiResult();
        try {
            specialActivityDao.updateInfo(specialActivity);
            apiResult.success(specialActivity);
        } catch (Exception ex) {
            logger.error(ex.getMessage(), ex);
            apiResult.fail("更新失败");
        }
        return apiResult;
    }

    @Override
    public ApiResult delete(Integer id) {
        ApiResult apiResult = new ApiResult();
        try {
            specialActivityDao.deleteInfo(id);
            apiResult.success();
        } catch (Exception ex) {
            logger.error(ex.getMessage(), ex);
            apiResult.fail("删除失败");
        }
        return apiResult;
    }

    @Override
    public ApiResult getOne(Integer id) {
        ApiResult apiResult = new ApiResult();
        try {
            SpecialActivity specialActivity = specialActivityDao.getOne(id);
            if (specialActivity != null) {
                apiResult.success(specialActivity);
            } else {
                apiResult.fail("获取失败");
            }
        } catch (Exception ex) {
            logger.error(ex.getMessage(), ex);
            apiResult.fail("获取失败");
        }
        return apiResult;
    }

    @Override
    public ApiResult getAllSpecialActivity(String aoData, SpecialActivityParam specialActivityParam) {
        ApiResult apiResult = new ApiResult();
        try {
            DataTablesParameters parameters = DataTablesParameters.fromJson(aoData);

            specialActivityParam.setSize(parameters.getRows());
            specialActivityParam.setOffset(parameters.getStart());

            if (specialActivityParam.getArea().equals("0")) {
                specialActivityParam.setArea(null);
            }
            if (specialActivityParam.getYear() == 0) {
                specialActivityParam.setYear(null);
            }

            Integer totalCount = specialActivityDao.getPageCount(specialActivityParam);

            List<SpecialActivity> ls = specialActivityDao.getAllSpecialActivity(specialActivityParam);

            if (ls != null) {
                apiResult.dataTable(parameters.getsEcho(), totalCount, ls);
                apiResult.success();
            } else {
                apiResult.fail("获取失败");
            }
        } catch (Exception ex) {
            logger.error(ex.getMessage(), ex);
            apiResult.fail("获取失败");
        }

        return apiResult;
    }

    @Override
    public ApiResult getAllYear() {
        ApiResult apiResult = new ApiResult();
        try {
            List<SpecialActivity> ls = specialActivityDao.getAllYear();
            apiResult.success(ls);
        } catch (Exception ex) {
            logger.error(ex.getMessage(), ex);
            apiResult.fail("获取年份失败");
        }
        return apiResult;
    }
}
