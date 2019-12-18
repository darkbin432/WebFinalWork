package com.hele.hzjs.service.impl;

import com.hele.hzjs.model.PageBean;
import com.hele.hzjs.model.Zixun;
import com.hele.hzjs.model.param.ZixunParam;
import com.hele.hzjs.model.result.ApiResult;
import com.hele.hzjs.model.vm.DataTablesParameters;
import com.hele.hzjs.persistence.ZixunDao;
import com.hele.hzjs.service.IZixunService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class ZixunService implements IZixunService {

    private Logger logger = LoggerFactory.getLogger(this.getClass());

    @Resource
    private ZixunDao zixunDao;

    @Override
    public ApiResult insert(Zixun zixun) {
        ApiResult apiResult = new ApiResult();

        try {
            zixunDao.insert(zixun);
            int id = zixun.getId();
            zixun = zixunDao.getOne(id);
            if (zixun != null) {
                apiResult.success(zixun);
            } else {
                apiResult.fail("资讯插入失败");
            }
        } catch (Exception ex) {
            logger.error(ex.getMessage(), ex);
            apiResult.fail("资讯插入失败");
        }

        return apiResult;
    }

    @Override
    public ApiResult getMany(Integer num) {
        ApiResult apiResult = new ApiResult();

        try{
            List<Zixun> lz = zixunDao.getMany(num);
            if (lz != null) {
                apiResult.success(lz);
            } else {
                apiResult.fail("资讯获取失败");
            }
        } catch (Exception ex){
            logger.error(ex.getMessage(), ex);
            apiResult.fail("资讯获取失败");
        }
        return apiResult;
    }

    @Override
    public ApiResult delete(Integer id) {
        ApiResult apiResult = new ApiResult();
        try {

            zixunDao.deleteInfo(id);
            Zixun zixun = zixunDao.getOne(id);
            if (zixun == null) {
                apiResult.success();
            } else {
                apiResult.fail("资讯删除失败");
            }
        } catch (Exception ex){
            logger.error(ex.getMessage(), ex);
            apiResult.fail("资讯删除失败");
        }
        return apiResult;
    }

    @Override
    public ApiResult selectByPage(String title, Integer scopeId, String startTime, String endTime, String pageNow) {
        ApiResult apiResult = new ApiResult();

        try {

            ZixunParam zixunParam = new ZixunParam();

            if(title != null) {
                zixunParam.setTitle(title);
            }
            if(scopeId != null){
                zixunParam.setScopeId(scopeId);
            }
            if(startTime!=null){
                zixunParam.setStartTime(startTime);
            }
            if(endTime!=null){
                zixunParam.setEndTime(endTime);
            }
            zixunParam.setPageNow(Integer.valueOf(pageNow));
            zixunParam.setSize(8);
            zixunParam.initOffset();

            Integer totalCount = zixunDao.getPageCount(zixunParam);

            List<Zixun> lz = zixunDao.selectzixunInfo(zixunParam);
            if (lz != null) {
                apiResult.setTotalCount(totalCount);
                apiResult.success(lz);
            } else {
                apiResult.fail("筛选资讯失败");
            }
        } catch (Exception ex) {
            logger.error(ex.getMessage(), ex);
            apiResult.fail("筛选资讯失败");
        }

        return apiResult;
    }

    @Override
    public ApiResult update(Zixun zixun) {
        ApiResult apiResult = new ApiResult();
        try {
            int id = zixun.getId();
            Zixun tmp = zixunDao.getOne(id);
            if (tmp != null) {
                zixunDao.updateInfo(zixun);
                apiResult.success(zixun);
            } else {
                apiResult.fail("资讯更新失败");
            }
        } catch (Exception ex){
            logger.error(ex.getMessage(), ex);
            apiResult.fail("资讯更新失败");
        }
        return apiResult;
    }

    @Override
    public ApiResult getOne(Integer id) {
        ApiResult apiResult = new ApiResult();
        try {
            Zixun zixun = zixunDao.getOne(id);
            if (zixun != null) {
                apiResult.success(zixun);
            } else {
                apiResult.fail("资讯获取失败");
            }
        }catch (Exception ex){
            logger.error(ex.getMessage(),ex);
            apiResult.fail("资讯获取失败");
        }

        return apiResult;
    }

    @Override
    public ApiResult getAllZixun(String aoData, ZixunParam zixunParam) {
        ApiResult apiResult = new ApiResult();

        try {

            DataTablesParameters parameters = DataTablesParameters.fromJson(aoData);

            zixunParam.setSize(parameters.getRows());
            zixunParam.setOffset(parameters.getStart());

            if (zixunParam.getScopeId()!=null && zixunParam.getScopeId()!=0){
                if (zixunParam.getScopeId()%100==0){
                    zixunParam.setScopeLeft(zixunParam.getScopeId()/100*100);
                    zixunParam.setScopeRight(zixunParam.getScopeId()/100*100+99);
                }else{
                    zixunParam.setScopeLeft(zixunParam.getScopeId());
                    zixunParam.setScopeRight(zixunParam.getScopeId());
                }
            }

            Integer totalCount = zixunDao.getPageCount(zixunParam);

            List<Zixun> la = zixunDao.selectzixunInfo(zixunParam);

            if(la != null){
                apiResult.dataTable(parameters.getsEcho(), totalCount, la);
                apiResult.success();
            } else{
                apiResult.fail("筛选资讯失败");
            }

        } catch (Exception ex){
            logger.error(ex.getMessage(), ex);
            apiResult.fail("筛选资讯失败");
        }

        return apiResult;
    }

    @Override
    public ApiResult countRead(Integer id) {
        ApiResult apiResult = new ApiResult();
        try {
            zixunDao.countRead(id);
            apiResult.success();
        } catch (Exception ex){
            logger.error(ex.getMessage(), ex);
            apiResult.fail("更新阅读失败");
        }
        return apiResult;
    }


    @Override
    public ApiResult getList(ZixunParam zixunParam) {
        ApiResult apiResult = new ApiResult();
        try {
            zixunParam.initOffset();
            List<Zixun> xuanjiaoList=zixunDao.selectAll(zixunParam);
            int count=zixunDao.countAll(zixunParam);
            apiResult.setTotalCount(count);
            apiResult.success(xuanjiaoList);
        } catch (Exception ex){
            logger.error(ex.getMessage(), ex);
            apiResult.fail("更新失败");
        }
        return apiResult;
    }
}
