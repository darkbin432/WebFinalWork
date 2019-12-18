package com.hele.hzjs.service.impl;

import com.hele.hzjs.model.PageBean;
import com.hele.hzjs.model.Xuanjiao;
import com.hele.hzjs.model.param.XuanjiaoParam;
import com.hele.hzjs.model.result.ApiResult;
import com.hele.hzjs.model.vm.DataTablesParameters;
import com.hele.hzjs.persistence.XuanjiaoDao;
import com.hele.hzjs.service.IXuanjiaoService;
import org.apache.ibatis.annotations.Param;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class XuanjiaoService implements IXuanjiaoService {

    private Logger logger = LoggerFactory.getLogger(this.getClass());

    @Resource
    XuanjiaoDao xuanjiaoDao;

    @Override
    public ApiResult insert(Xuanjiao xuanjiao) {
        ApiResult apiResult = new ApiResult();
        try {
            xuanjiaoDao.insert(xuanjiao);
            int id = xuanjiao.getId();
            xuanjiao = xuanjiaoDao.getOne(id);
            if (xuanjiao != null) {
                apiResult.success(xuanjiao);
            } else {
                apiResult.fail("宣教插入失败");
            }
        } catch (Exception ex) {
            logger.error(ex.getMessage(), ex);
            apiResult.fail("宣教插入失败");
        }
        return apiResult;
    }

    @Override
    public ApiResult getMany(Integer num) {
        ApiResult apiResult = new ApiResult();
        try {

            List<Xuanjiao> lx = xuanjiaoDao.getMany(num);
            if (lx != null) {
                apiResult.success(lx);
            } else {
                apiResult.fail("宣教获取失败");
            }
        } catch (Exception ex) {
            logger.error(ex.getMessage(), ex);
            apiResult.fail("宣教获取失败");
        }
        return apiResult;
    }

    @Override
    public ApiResult getManyIndex(Integer num) {
        ApiResult apiResult = new ApiResult();
        try {

            List<Xuanjiao> lx = xuanjiaoDao.getManyIndex(num);
            if (lx != null) {
                apiResult.success(lx);
            } else {
                apiResult.fail("宣教获取失败");
            }
        } catch (Exception ex) {
            logger.error(ex.getMessage(), ex);
            apiResult.fail("宣教获取失败");
        }
        return apiResult;
    }

    @Override
    public ApiResult delete(Integer id) {
        ApiResult apiResult = new ApiResult();
        try {

            xuanjiaoDao.deleteInfo(id);
            Xuanjiao xuanjiao = xuanjiaoDao.getOne(id);
            if (xuanjiao == null) {
                apiResult.success();
            } else {
                apiResult.fail("宣教删除失败");
            }
        } catch (Exception ex) {
            logger.error(ex.getMessage(), ex);
            apiResult.fail("宣教删除失败");
        }
        return apiResult;
    }

    @Override
    public ApiResult selectByPage(String title, String name, Integer type, String pageNow) {
        ApiResult apiResult = new ApiResult();
        try {
            XuanjiaoParam xuanjiaoParam = new XuanjiaoParam();

            if (title != null) {
                xuanjiaoParam.setTitle(title);
            }

            if (name != null) {
                xuanjiaoParam.setName(name);
            }

            if (type != null) {
                xuanjiaoParam.setType(type);
            }

            xuanjiaoParam.setPageNow(Integer.valueOf(pageNow));
            xuanjiaoParam.setSize(8);
            xuanjiaoParam.initOffset();

            Integer totalCount = xuanjiaoDao.getPageCount(xuanjiaoParam);

            List<Xuanjiao> lx = xuanjiaoDao.selectXuanjiaoInfo(xuanjiaoParam);
            if (lx != null) {
                apiResult.setTotalCount(totalCount);
                apiResult.success(lx);
            } else {
                apiResult.fail("筛选宣教失败");
            }
        } catch (Exception ex) {
            logger.error(ex.getMessage(), ex);
            apiResult.fail("筛选宣教失败");
        }
        return apiResult;
    }

    @Override
    public ApiResult update(Xuanjiao xuanjiao) {
        ApiResult apiResult = new ApiResult();
        try {

            int id = xuanjiao.getId();
            Xuanjiao tmp = xuanjiaoDao.getOne(id);
            if (tmp != null) {
                xuanjiaoDao.updateInfo(xuanjiao);
                apiResult.success(xuanjiao);
            } else {
                apiResult.fail("宣教更新失败");
            }
        } catch (Exception ex) {
            logger.error(ex.getMessage(), ex);
            apiResult.fail("宣教更新失败");
        }
        return apiResult;
    }

    @Override
    public ApiResult getOne(Integer id) {
        ApiResult apiResult = new ApiResult();
        try {

            Xuanjiao xuanjiao = xuanjiaoDao.getOne(id);
            if (xuanjiao != null) {
                apiResult.success(xuanjiao);
                countRead2(id);
            } else {
                apiResult.fail("宣教获取失败");
            }
        } catch (Exception ex) {
            logger.error(ex.getMessage(), ex);
            apiResult.fail("宣教获取失败");
        }
        return apiResult;
    }

    @Override
    public ApiResult getAllXuanjiao(String aoData, XuanjiaoParam xuanjiaoParam) {
        ApiResult apiResult = new ApiResult();

        try {

            DataTablesParameters parameters = DataTablesParameters.fromJson(aoData);

            xuanjiaoParam.setSize(parameters.getRows());
            xuanjiaoParam.setOffset(parameters.getStart());

            Integer totalCount = xuanjiaoDao.getPageCount(xuanjiaoParam);

            List<Xuanjiao> la = xuanjiaoDao.selectXuanjiaoInfo(xuanjiaoParam);

            if (la != null) {
                apiResult.dataTable(parameters.getsEcho(), totalCount, la);
                apiResult.success();
            } else {
                apiResult.fail("筛选宣教失败");
            }

        } catch (Exception ex) {
            logger.error(ex.getMessage(), ex);
            apiResult.fail("筛选宣教失败");
        }

        return apiResult;
    }

    @Override
    public ApiResult countRead(Integer id) {
        ApiResult apiResult = new ApiResult();
        try {
            xuanjiaoDao.countRead(id);
            apiResult.success();
        } catch (Exception ex) {
            logger.error(ex.getMessage(), ex);
            apiResult.fail("更新阅读失败");
        }
        return apiResult;
    }

    @Override
    public ApiResult getList(XuanjiaoParam xuanjiaoParam) {
        ApiResult apiResult = new ApiResult();
        try {
            xuanjiaoParam.initOffset();
            List<Xuanjiao> xuanjiaoList = xuanjiaoDao.selectAll(xuanjiaoParam);
            int count = xuanjiaoDao.countAll(xuanjiaoParam);
            apiResult.setTotalCount(count);
            apiResult.success(xuanjiaoList);
        } catch (Exception ex) {
            logger.error(ex.getMessage(), ex);
            apiResult.fail("更新失败");
        }
        return apiResult;
    }

    @Async
    public void countRead2(Integer id) {
        try {
            xuanjiaoDao.countRead(id);

        } catch (Exception ex) {
            logger.error(ex.getMessage(), ex);
        }
    }
}
