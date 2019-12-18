package com.hznu.lwb.service.impl;

import com.hznu.lwb.model.report.HuiyuanReport;
import com.hznu.lwb.model.result.ApiResult;
import com.hznu.lwb.persistence.VolunteerReportDao;
import com.hznu.lwb.service.IVolunteerReportService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

@Service
public class VolunteerReportService implements IVolunteerReportService {

    Logger logger = LoggerFactory.getLogger(this.getClass());

    @Resource
    private VolunteerReportDao volunteerReportDao;

    @Override
    public ApiResult getYears() {
        ApiResult apiResult = new ApiResult();
        Calendar now = Calendar.getInstance();
        List<Integer> ly = new ArrayList<>();
        try {
            ly = volunteerReportDao.getYears();
            if (ly != null && ly.get(0) < now.get(Calendar.YEAR)){
                ly.add(0,now.get(Calendar.YEAR));
            }
            apiResult.success(ly);
        }catch (Exception e){
            ly.add(0,now.get(Calendar.YEAR));
            apiResult.success(ly);
        }
        return apiResult;
    }

    @Override
    public ApiResult toFile(Integer year) {
        ApiResult apiResult = new ApiResult();
        try {
            List<HuiyuanReport> lhr = volunteerReportDao.getVolunteerReport(year);
            HuiyuanReport huiyuanReport = volunteerReportDao.getTotalCount(year);
            lhr.add(huiyuanReport);
            for (int i = 0; i < lhr.size(); ++i){
                volunteerReportDao.insertVolunteerReport(lhr.get(i));
            }
            apiResult.success("归档成功");
        }catch (Exception e){
            logger.error(e.getMessage(),e);
            apiResult.fail("归档失败");
        }
        return apiResult;
    }
}
