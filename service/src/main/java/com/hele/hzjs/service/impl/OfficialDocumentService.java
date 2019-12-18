package com.hele.hzjs.service.impl;

import com.hele.hzjs.model.OfficialDocument;
import com.hele.hzjs.model.param.OfficialDocumentParam;
import com.hele.hzjs.model.result.ApiResult;
import com.hele.hzjs.model.vm.DataTablesParameters;
import com.hele.hzjs.persistence.OfficialDocumentDao;
import com.hele.hzjs.service.IOfficialDocumentService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.AbstractSequentialList;
import java.util.ArrayList;
import java.util.List;
import java.util.ListIterator;

@Service
public class OfficialDocumentService implements IOfficialDocumentService {

    Logger logger = LoggerFactory.getLogger(this.getClass());

    @Resource
    OfficialDocumentDao officialDocumentDao;

    @Override
    public ApiResult insert(OfficialDocument record) {
        ApiResult apiResult = new ApiResult();
        try {
            officialDocumentDao.insertSelective(record);
            apiResult.success(String.valueOf(record.getId()));
        }catch (Exception e){
            apiResult.fail("新增公文失败");
        }
        return apiResult;
    }

    @Override
    public ApiResult update(OfficialDocument record) {
        ApiResult apiResult = new ApiResult();
        try {
            officialDocumentDao.updateByPrimaryKeySelective(record);
            apiResult.success();
        }catch (Exception e){
            apiResult.fail("更新公文失败");
        }
        return apiResult;
    }

    @Override
    public ApiResult delete(Integer id) {
        ApiResult apiResult = new ApiResult();
        try {
            officialDocumentDao.deleteByPrimaryKey(id);
            apiResult.success();
        }catch (Exception e){
            apiResult.fail("删除公文失败");
        }
        return apiResult;
    }

    @Override
    public ApiResult selectByCondition(String aoData, OfficialDocumentParam param) {
        ApiResult apiResult = new ApiResult();
        try {
            DataTablesParameters parameters = DataTablesParameters.fromJson(aoData);

            param.setSize(parameters.getRows());
            param.setOffset(parameters.getStart());

            Integer totalCount = officialDocumentDao.getPageCount(param);

            List<OfficialDocument> lod = officialDocumentDao.selectByCondition(param);

            apiResult.dataTable(parameters.getsEcho(), totalCount, lod);
            apiResult.success();
        }catch (Exception e){
            apiResult.fail("获取公文列表失败");
            logger.error(e.getMessage(), e);
        }
        return apiResult;
    }

    @Override
    public ApiResult selectOne(Integer id) {
        ApiResult apiResult = new ApiResult();
        try {
            OfficialDocument officialDocument = officialDocumentDao.selectByPrimaryKey(id);
            apiResult.success(officialDocument);
        }catch (Exception e){
            apiResult.fail("获取公文失败");
        }
        return apiResult;
    }
}
