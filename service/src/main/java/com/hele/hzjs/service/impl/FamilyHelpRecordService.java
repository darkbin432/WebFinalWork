package com.hele.hzjs.service.impl;

import com.hele.hzjs.model.param.FamilyHelpRecordParam;
import com.hele.hzjs.model.report.FamilyHelpRecord;
import com.hele.hzjs.model.result.ApiResult;
import com.hele.hzjs.model.vm.DataTablesParameters;
import com.hele.hzjs.persistence.FamilyHelpRecordDao;
import com.hele.hzjs.service.IFamilyHelpRecordService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class FamilyHelpRecordService implements IFamilyHelpRecordService {

    Logger logger = LoggerFactory.getLogger(this.getClass());

    @Resource
    private FamilyHelpRecordDao familyHelpRecordDao;

    @Override
    public ApiResult getFamilyHelpRecord(String aoData, FamilyHelpRecordParam param) {
        ApiResult apiResult = new ApiResult();
        try {
            DataTablesParameters parameters = DataTablesParameters.fromJson(aoData);
            param.setSize(parameters.getRows());
            param.setOffset(parameters.getStart());

            Integer totalCount = familyHelpRecordDao.getPageCount(param);
            List<FamilyHelpRecord> lfhr = familyHelpRecordDao.getRecord(param);

            apiResult.dataTable(parameters.getsEcho(), totalCount, lfhr);
            apiResult.success();
        }catch (Exception e){
            logger.error(e.getMessage(),e);
            apiResult.fail("获取帮扶家庭记录失败");
        }
        return apiResult;
    }

    @Override
    public ApiResult getYears() {
        ApiResult apiResult = new ApiResult();
        try {
            apiResult.success(familyHelpRecordDao.getYears());
        }catch(Exception e){
            apiResult.fail("获取时间失败");
        }
        return apiResult;
    }

    @Override
    public ApiResult insertRecord(FamilyHelpRecord record) {
        ApiResult apiResult = new ApiResult();

        if(record.getHuiyuanId()==null){
            apiResult.lackParams("huiyuanId");
        }

        if(record.getOrganizationMemberId()==null){
            apiResult.lackParams("organizationMemberId");
        }

        if(apiResult.IsFail()){
            return apiResult;
        }

        try {
            familyHelpRecordDao.insertRecord(record);
            apiResult.success();
        }catch (Exception e){
            apiResult.fail("插入访视记录失败");
        }
        return apiResult;
    }
}
