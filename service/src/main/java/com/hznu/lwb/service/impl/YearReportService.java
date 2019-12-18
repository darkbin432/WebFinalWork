package com.hznu.lwb.service.impl;

import com.hznu.lwb.model.ExcelNames;
import com.hznu.lwb.model.Organization;
import com.hznu.lwb.model.param.YearReportParam;
import com.hznu.lwb.model.report.YearReport;
import com.hznu.lwb.model.result.ApiResult;
import com.hznu.lwb.model.vm.DataTablesParameters;
import com.hznu.lwb.persistence.OrganizationDao;
import com.hznu.lwb.persistence.YearReportDao;
import com.hznu.lwb.service.IYearReportService;
import com.hznu.lwb.service.tool.MSExcelUtil;
import com.hznu.utils.UUIDGenerator;
import com.hznu.utils.constant.FileType;
import org.apache.poi.hssf.usermodel.*;
import org.apache.poi.ss.util.CellRangeAddress;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.io.FileOutputStream;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

@Service
public class YearReportService implements IYearReportService {

    Logger logger = LoggerFactory.getLogger(this.getClass());

    @Value("#{config['staticResourceDir']}")
    private String staticResourceDir;
    @Value("#{config['uploadPath']}")
    private String uploadPath;

    @Resource
    private YearReportDao yearReportDao;

    @Resource
    private OrganizationDao organizationDao;

    @Override
    public ApiResult insert(YearReport record) {
        ApiResult apiResult = new ApiResult();
        try {
            Calendar now = Calendar.getInstance();
            Integer cnt = 0;
            cnt = yearReportDao.judgeFiled(now.get(Calendar.YEAR));
            if (cnt > 0){
                apiResult.fail("本年度已归档");
                return apiResult;
            }
            yearReportDao.insert(record);
            apiResult.success(String.valueOf(record.getId()));
        }catch (Exception e){
            logger.error(e.getMessage(),e);
            apiResult.fail("新增年度报表失败");
        }
        return apiResult;
    }

    @Override
    public ApiResult update(YearReport record) {
        ApiResult apiResult = new ApiResult();
        try {
            Calendar now = Calendar.getInstance();
            Integer cnt = 0;
            cnt = yearReportDao.judgeFiled(now.get(Calendar.YEAR));
            if (cnt > 0){
                apiResult.fail("本年度已归档");
                return apiResult;
            }
            yearReportDao.updateByPrimaryKeySelective(record);
            apiResult.success();
        }catch (Exception e){
            apiResult.fail("更新报表失败");
            logger.error(e.getMessage(),e);
        }
        return apiResult;
    }

    @Override
    public ApiResult getYears() {
        ApiResult apiResult = new ApiResult();
        try {
            List<Integer> ly = yearReportDao.getYears();
            apiResult.success(ly);
        }catch (Exception e){
            apiResult.fail("获取年度报表年份失败");
        }
        return apiResult;
    }

    @Override
    public ApiResult selectChildrenStatus(String aoData, YearReportParam param) {
        ApiResult apiResult = new ApiResult();
        try {
            DataTablesParameters parameters = DataTablesParameters.fromJson(aoData);
            param.setSize(parameters.getRows());
            param.setOffset(parameters.getStart());
            Integer totalCount = yearReportDao.selectChildrenStatusPageCount(param);
            List<YearReport> locr = yearReportDao.selectChildrenStatus(param);
            apiResult.dataTable(parameters.getsEcho(),totalCount,locr);
        }catch (Exception e){
            logger.error(e.getMessage(),e);
            apiResult.fail("获取下级上报状态失败");
        }
        return apiResult;
    }

    @Override
    public ApiResult getYearReport(YearReportParam param) {
        ApiResult apiResult = new ApiResult();
        try {
            List<YearReport> lyr = new ArrayList<>();
            if (param.getQu() != null && param.getQu() == 1){
                YearReport yr = yearReportDao.selectByQu(param);
                lyr.add(0,yr);
                apiResult.success(lyr);
            }else if (param.getScopeId() == null && param.getYear() != null){
                YearReport yr = yearReportDao.selectByYear(param.getYear());
                lyr.add(0,yr);
                apiResult.success(lyr);
            }else if (param.getYear() == null && param.getScopeId() != null){
                DataTablesParameters parameters = DataTablesParameters.fromJson(param.getAoData());
                if (param.getScopeId() > 0){
                    lyr = yearReportDao.getLici(param.getScopeId());
                    apiResult.dataTable(parameters.getsEcho(),lyr.size(),lyr);
                }else{
                    apiResult.dataTable(parameters.getsEcho(),0,null);
                }
            }else{
                YearReport one = yearReportDao.getOne(param);
                lyr.add(0,one);
                apiResult.success(lyr);
            }
        }catch (Exception e){
            logger.error(e.getMessage(),e);
            apiResult.fail("获取年度报表失败");
        }
        return apiResult;
    }

    @Override
    public ApiResult toFile(Integer year) {
        ApiResult apiResult = new ApiResult();
        try {
            yearReportDao.toFile(year);
            apiResult.success();
        }catch (Exception e){
            apiResult.fail("归档失败");
        }
        return apiResult;
    }

    @Override
    public ApiResult exportReport(YearReportParam param) {
        ApiResult apiResult = new ApiResult();
        try {
            YearReport data = ((List<YearReport>)getYearReport(param).getData()).get(0);
            if (data == null){
                data = new YearReport();
                if (param.getQu() != null && param.getQu() == 1){
                    data.setScopeName(organizationDao.getOneScope(param.getScopeId()).getName());
                }
            }
            ExcelNames excelNames = reportToExcel(data, param.getYear());
            if (excelNames != null){
                apiResult.success(excelNames);
            }else{
                apiResult.fail("绘制Excel出错");
            }
        }catch (Exception e){
            apiResult.fail("获取Excel失败");
        }
        return apiResult;
    }

    public ExcelNames reportToExcel(YearReport data, Integer year) {
        ExcelNames excelNames = new ExcelNames();
        try {
            HSSFWorkbook wb = new HSSFWorkbook();
            HSSFSheet sheet = wb.createSheet("杭州市年度工作报表");

            HSSFCellStyle style = wb.createCellStyle(); // 样式对象

            style.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);// 垂直
            style.setAlignment(HSSFCellStyle.ALIGN_CENTER);// 水平
            HSSFRow row0 = sheet.createRow((short) 0);
            HSSFRow row1 = sheet.createRow((short) 1);
            HSSFRow row2 = sheet.createRow((short) 2);
            HSSFRow row3 = sheet.createRow((short) 3);
            HSSFRow row4 = sheet.createRow((short) 4);
            HSSFRow row5 = sheet.createRow((short) 5);
            HSSFRow row6 = sheet.createRow((short) 6);
            HSSFRow row7 = sheet.createRow((short) 7);
            HSSFRow row8 = sheet.createRow((short) 8);
            HSSFRow row9 = sheet.createRow((short) 9);
            HSSFRow row10 = sheet.createRow((short) 10);

            sheet.addMergedRegion(new CellRangeAddress(0, 0, (short) 0, (short) 19));
            HSSFCell ce = row0.createCell((short) 0);
            if (data.getScopeName() == null){
                ce.setCellValue("杭州市年度工作报表");
            }else{
                ce.setCellValue(data.getScopeName() + "年度工作报表");
            }
            ce.setCellStyle(style); // 样式，居中

            sheet.addMergedRegion(new CellRangeAddress(5, 5, (short) 0, (short) 19));
            ce = row5.createCell((short) 0);
            ce.setCellStyle(style); // 样式，居中

            sheet.addMergedRegion(new CellRangeAddress(1, 1, (short) 0, (short) 9));
            ce = row1.createCell((short) 0);
            ce.setCellValue("青春健康教育");
            ce.setCellStyle(style);

            sheet.addMergedRegion(new CellRangeAddress(2, 2, (short) 0, (short) 1));
            ce = row2.createCell((short) 0);
            ce.setCellValue("面对青少年的讲座和培训");
            ce.setCellStyle(style);

            ce = row3.createCell((short) 0);
            ce.setCellValue("场次");
            ce.setCellStyle(style);

            ce = row4.createCell((short) 0);
            ce.setCellValue(data.getMianduiqsndjzhpxcc() == null ? 0 : data.getMianduiqsndjzhpxcc());
            ce.setCellStyle(style);

            ce = row3.createCell((short) 1);
            ce.setCellValue("人数");
            ce.setCellStyle(style);

            ce = row4.createCell((short) 1);
            ce.setCellValue(data.getMianduiqsndjzhpxrs() == null ? 0 : data.getMianduiqsndjzhpxrs());
            ce.setCellStyle(style);

            sheet.addMergedRegion(new CellRangeAddress(2, 2, (short) 2, (short) 3));
            ce = row2.createCell((short) 2);
            ce.setCellValue("面对家长的讲座和培训");
            ce.setCellStyle(style);

            ce = row3.createCell((short) 2);
            ce.setCellValue("场次");
            ce.setCellStyle(style);

            ce = row4.createCell((short) 2);
            ce.setCellValue(data.getMianduijzdjzhpxcc() == null ? 0 : data.getMianduijzdjzhpxcc());
            ce.setCellStyle(style);

            ce = row3.createCell((short) 3);
            ce.setCellValue("人数");
            ce.setCellStyle(style);

            ce = row4.createCell((short) 3);
            ce.setCellValue(data.getMianduijzdjzhpxrs() == null ? 0 : data.getMianduijzdjzhpxrs());
            ce.setCellStyle(style);

            sheet.addMergedRegion(new CellRangeAddress(2, 2, (short) 4, (short) 5));
            ce = row2.createCell((short) 4);
            ce.setCellValue("现有师资人数");
            ce.setCellStyle(style);

            ce = row3.createCell((short) 4);
            ce.setCellValue("市级");
            ce.setCellStyle(style);

            ce = row4.createCell((short) 4);
            ce.setCellValue(data.getXianyouszrssj() == null ? 0 : data.getXianyouszrssj());
            ce.setCellStyle(style);

            ce = row3.createCell((short) 5);
            ce.setCellValue("县级");
            ce.setCellStyle(style);

            ce = row4.createCell((short) 5);
            ce.setCellValue(data.getXianyouszrsxj() == null ? 0 : data.getXianyouszrsxj());
            ce.setCellStyle(style);

            sheet.addMergedRegion(new CellRangeAddress(2, 2, (short) 6, (short) 7));
            ce = row2.createCell((short) 6);
            ce.setCellValue("现有基地个数");
            ce.setCellStyle(style);

            ce = row3.createCell((short) 6);
            ce.setCellValue("市级");
            ce.setCellStyle(style);

            ce = row4.createCell((short) 6);
            ce.setCellValue(data.getXianyoujdgssj() == null ? 0 : data.getXianyoujdgssj());
            ce.setCellStyle(style);

            ce = row3.createCell((short) 7);
            ce.setCellValue("县级");
            ce.setCellStyle(style);

            ce = row4.createCell((short) 7);
            ce.setCellValue(data.getXianyoujdgsxj() == null ? 0 : data.getXianyoujdgsxj());
            ce.setCellStyle(style);

            sheet.addMergedRegion(new CellRangeAddress(2, 3, (short) 8, (short) 9));
            ce = row2.createCell((short) 8);
            ce.setCellValue("现有青春健康同伴社的高校数量");
            ce.setCellStyle(style);

            sheet.addMergedRegion(new CellRangeAddress(4, 4, (short) 8, (short) 9));
            ce = row4.createCell((short) 8);
            ce.setCellValue(data.getXianyouqcjktbsdgxsl() == null ? 0 : data.getXianyouqcjktbsdgxsl());
            ce.setCellStyle(style);

            sheet.addMergedRegion(new CellRangeAddress(1, 1, (short) 10, (short) 15));
            ce = row1.createCell((short) 10);
            ce.setCellValue("计生特殊家庭帮扶");
            ce.setCellStyle(style);

            sheet.addMergedRegion(new CellRangeAddress(2, 2, (short) 10, (short) 11));
            ce = row2.createCell((short) 10);
            ce.setCellValue("计生协组织开展的各类帮扶和服务活动");
            ce.setCellStyle(style);

            ce = row3.createCell((short) 10);
            ce.setCellValue("场次");
            ce.setCellStyle(style);

            ce = row4.createCell((short) 10);
            ce.setCellValue(data.getJishengxzzkzdglbfhfwhdcc() == null ? 0 : data.getJishengxzzkzdglbfhfwhdcc());
            ce.setCellStyle(style);

            ce = row3.createCell((short) 11);
            ce.setCellValue("对象人次");
            ce.setCellStyle(style);

            ce = row4.createCell((short) 11);
            ce.setCellValue(data.getJishengxzzkzdglbfhfwhddxrc() == null ? 0 : data.getJishengxzzkzdglbfhfwhddxrc());
            ce.setCellStyle(style);

            sheet.addMergedRegion(new CellRangeAddress(2, 3, (short) 12, (short) 13));
            ce = row2.createCell((short) 12);
            ce.setCellValue("现有会员、志愿者与特殊家庭结对帮扶的对数");
            ce.setCellStyle(style);

            sheet.addMergedRegion(new CellRangeAddress(4, 4, (short) 12, (short) 13));
            ce = row4.createCell((short) 12);
            ce.setCellValue(data.getXianyouhyzyzytsjtjdbfdds() == null ? 0 : data.getXianyouhyzyzytsjtjdbfdds());
            ce.setCellStyle(style);

            sheet.addMergedRegion(new CellRangeAddress(2, 3, (short) 14, (short) 15));
            ce = row2.createCell((short) 14);
            ce.setCellValue("现有会员、现有相关民非组织数 （与计生协建立联系的）");
            ce.setCellStyle(style);

            sheet.addMergedRegion(new CellRangeAddress(4, 4, (short) 14, (short) 15));
            ce = row4.createCell((short) 14);
            ce.setCellValue(data.getXianyouxgmfzzs() == null ? 0 : data.getXianyouxgmfzzs());
            ce.setCellStyle(style);

            sheet.addMergedRegion(new CellRangeAddress(1, 1, (short) 16, (short) 19));
            ce = row1.createCell((short) 16);
            ce.setCellValue("健康服务");
            ce.setCellStyle(style);

            sheet.addMergedRegion(new CellRangeAddress(2, 3, (short) 16, (short) 17));
            ce = row2.createCell((short) 16);
            ce.setCellValue("举办生殖健康和优生优育等各类培训讲座场次");
            ce.setCellStyle(style);

            sheet.addMergedRegion(new CellRangeAddress(4, 4, (short) 16, (short) 17));
            ce = row4.createCell((short) 16);
            ce.setCellValue(data.getJubanszjkhysyydglpxjzcc() == null ? 0 : data.getJubanszjkhysyydglpxjzcc());
            ce.setCellStyle(style);

            sheet.addMergedRegion(new CellRangeAddress(2, 3, (short) 18, (short) 19));
            ce = row2.createCell((short) 18);
            ce.setCellValue("参加培训和听讲人次");
            ce.setCellStyle(style);

            sheet.addMergedRegion(new CellRangeAddress(4, 4, (short) 18, (short) 19));
            ce = row4.createCell((short) 18);
            ce.setCellValue(data.getCanjiapxhtjrc() == null ? 0 : data.getCanjiapxhtjrc());
            ce.setCellStyle(style);

            sheet.addMergedRegion(new CellRangeAddress(6, 6, (short) 0, (short) 2));
            ce = row6.createCell((short) 0);
            ce.setCellValue("慰问救助");
            ce.setCellStyle(style);

            sheet.addMergedRegion(new CellRangeAddress(7, 9, (short) 0, (short) 0));
            ce = row7.createCell((short) 0);
            ce.setCellValue("受助对象户数（人数）");
            ce.setCellStyle(style);

            ce = row10.createCell((short) 0);
            ce.setCellValue(data.getShouzhudxhs() == null ? 0 : data.getShouzhudxhs());
            ce.setCellStyle(style);

            sheet.addMergedRegion(new CellRangeAddress(7, 7, (short) 1, (short) 2));
            ce = row7.createCell((short) 1);
            ce.setCellValue("其中");
            ce.setCellStyle(style);

            sheet.addMergedRegion(new CellRangeAddress(8, 9, (short) 1, (short) 1));
            ce = row8.createCell((short) 1);
            ce.setCellValue("圆梦微心愿个数");
            ce.setCellStyle(style);

            ce = row10.createCell((short) 1);
            ce.setCellValue(data.getShouzhudxhsqzymwxygs() == null ? 0 : data.getShouzhudxhsqzymwxygs());
            ce.setCellStyle(style);

            sheet.addMergedRegion(new CellRangeAddress(8, 9, (short) 2, (short) 2));
            ce = row8.createCell((short) 2);
            ce.setCellValue("圆梦微心愿资金");
            ce.setCellStyle(style);

            ce = row10.createCell((short) 2);
            ce.setCellValue(data.getShouzhudxhsqzymwxyzj() == null ? 0 : data.getShouzhudxhsqzymwxyzj());
            ce.setCellStyle(style);

            sheet.addMergedRegion(new CellRangeAddress(6, 6, (short) 3, (short) 9));
            ce = row6.createCell((short) 3);
            ce.setCellValue("宣传教育");
            ce.setCellStyle(style);

            sheet.addMergedRegion(new CellRangeAddress(7, 7, (short) 3, (short) 5));
            ce = row7.createCell((short) 3);
            ce.setCellValue("各类主题宣传活动");
            ce.setCellStyle(style);

            sheet.addMergedRegion(new CellRangeAddress(8, 9, (short) 3, (short) 3));
            ce = row8.createCell((short) 3);
            ce.setCellValue("场次");
            ce.setCellStyle(style);

            ce = row10.createCell((short) 3);
            ce.setCellValue(data.getGeleiztxchdcc() == null ? 0 : data.getGeleiztxchdcc());
            ce.setCellStyle(style);

            sheet.addMergedRegion(new CellRangeAddress(8, 9, (short) 4, (short) 4));
            ce = row8.createCell((short) 4);
            ce.setCellValue("群众参与人数");
            ce.setCellStyle(style);

            ce = row10.createCell((short) 4);
            ce.setCellValue(data.getgeleiztxchdqzcyrs() == null ? 0 : data.getgeleiztxchdqzcyrs());
            ce.setCellStyle(style);

            sheet.addMergedRegion(new CellRangeAddress(8, 9, (short) 5, (short) 5));
            ce = row8.createCell((short) 5);
            ce.setCellValue("宣传资料发放数量");
            ce.setCellStyle(style);

            ce = row10.createCell((short) 5);
            ce.setCellValue(data.getGeleiztxchdxczlffsl() == null ? 0 : data.getGeleiztxchdxczlffsl());
            ce.setCellStyle(style);

            sheet.addMergedRegion(new CellRangeAddress(7, 7, (short) 6, (short) 7));
            ce = row7.createCell((short) 6);
            ce.setCellValue("新闻宣传");
            ce.setCellStyle(style);

            sheet.addMergedRegion(new CellRangeAddress(8, 9, (short) 6, (short) 6));
            ce = row8.createCell((short) 6);
            ce.setCellValue("县以上广播电视报告数量");
            ce.setCellStyle(style);

            ce = row10.createCell((short) 6);
            ce.setCellValue(data.getXinwenxcxysgbdsbgsl() == null ? 0 : data.getXinwenxcxysgbdsbgsl());
            ce.setCellStyle(style);

            sheet.addMergedRegion(new CellRangeAddress(8, 9, (short) 7, (short) 7));
            ce = row8.createCell((short) 7);
            ce.setCellValue("县以上纸媒体报告数量");
            ce.setCellStyle(style);

            ce = row10.createCell((short) 7);
            ce.setCellValue(data.getXinwenxcxyszmtbgsl() == null ? 0 : data.getXinwenxcxyszmtbgsl());
            ce.setCellStyle(style);

            sheet.addMergedRegion(new CellRangeAddress(7, 7, (short) 8, (short) 9));
            ce = row7.createCell((short) 8);
            ce.setCellValue("新媒体");
            ce.setCellStyle(style);

            sheet.addMergedRegion(new CellRangeAddress(8, 9, (short) 8, (short) 8));
            ce = row8.createCell((short) 8);
            ce.setCellValue("市一级是否有建有官微");
            ce.setCellStyle(style);

            ce = row10.createCell((short) 8);
            ce.setCellValue(data.getXinmeitsyjsfyjygw() == null ? 0 : data.getXinmeitsyjsfyjygw());
            ce.setCellStyle(style);

            sheet.addMergedRegion(new CellRangeAddress(8, 9, (short) 9, (short) 9));
            ce = row8.createCell((short) 9);
            ce.setCellValue("市一级官微数量");
            ce.setCellStyle(style);

            ce = row10.createCell((short) 9);
            ce.setCellValue(data.getXinmeitsyjgwsl() == null ? 0 : data.getXinmeitsyjgwsl());
            ce.setCellStyle(style);

            sheet.addMergedRegion(new CellRangeAddress(6, 6, (short) 10, (short) 11));
            ce = row6.createCell((short) 10);
            ce.setCellValue("流动人口");
            ce.setCellStyle(style);

            sheet.addMergedRegion(new CellRangeAddress(7, 8, (short) 10, (short) 11));
            ce = row7.createCell((short) 10);
            ce.setCellValue("现有企业和流动人口计生协");
            ce.setCellStyle(style);

            ce = row9.createCell((short) 10);
            ce.setCellValue("组织个数");
            ce.setCellStyle(style);

            ce = row10.createCell((short) 10);
            ce.setCellValue(data.getXianyouqyhldrkjsxzzgs() == null ? 0 : data.getXianyouqyhldrkjsxzzgs());
            ce.setCellStyle(style);

            ce = row9.createCell((short) 11);
            ce.setCellValue("会员个数");
            ce.setCellStyle(style);

            ce = row10.createCell((short) 11);
            ce.setCellValue(data.getXianyouqyhldrkjsxhygs() == null ? 0 : data.getXianyouqyhldrkjsxhygs());
            ce.setCellStyle(style);

            sheet.addMergedRegion(new CellRangeAddress(6, 6, (short) 12, (short) 17));
            ce = row6.createCell((short) 12);
            ce.setCellValue("业务培训");
            ce.setCellStyle(style);

            sheet.addMergedRegion(new CellRangeAddress(7, 8, (short) 12, (short) 13));
            ce = row7.createCell((short) 12);
            ce.setCellValue("市、县计生协举办培训");
            ce.setCellStyle(style);

            ce = row9.createCell((short) 12);
            ce.setCellValue("场次");
            ce.setCellStyle(style);

            ce = row10.createCell((short) 12);
            ce.setCellValue(data.getShixianjsxjbpxcc() == null ? 0 : data.getShixianjsxjbpxcc());
            ce.setCellStyle(style);

            ce = row9.createCell((short) 13);
            ce.setCellValue("人数");
            ce.setCellStyle(style);

            ce = row10.createCell((short) 13);
            ce.setCellValue(data.getShixianjsxjbpxcc() == null ? 0 : data.getShixianjsxjbpxcc());
            ce.setCellStyle(style);

            sheet.addMergedRegion(new CellRangeAddress(7, 7, (short) 14, (short) 17));
            ce = row7.createCell((short) 14);
            ce.setCellValue("其中");
            ce.setCellStyle(style);

            sheet.addMergedRegion(new CellRangeAddress(8, 8, (short) 14, (short) 15));
            ce = row8.createCell((short) 14);
            ce.setCellValue("青春健康师资培训");
            ce.setCellStyle(style);

            ce = row9.createCell((short) 14);
            ce.setCellValue("场次");
            ce.setCellStyle(style);

            ce = row10.createCell((short) 14);
            ce.setCellValue(data.getQingchunjkszpxcc() == null ? 0 : data.getQingchunjkszpxcc());
            ce.setCellStyle(style);

            ce = row9.createCell((short) 15);
            ce.setCellValue("人数");
            ce.setCellStyle(style);

            ce = row10.createCell((short) 15);
            ce.setCellValue(data.getQingchunjkszpxrs() == null ? 0 : data.getQingchunjkszpxrs());
            ce.setCellStyle(style);

            sheet.addMergedRegion(new CellRangeAddress(8, 8, (short) 16, (short) 17));
            ce = row8.createCell((short) 16);
            ce.setCellValue("计生特殊家庭帮扶骨干培训");
            ce.setCellStyle(style);

            ce = row9.createCell((short) 16);
            ce.setCellValue("场次");
            ce.setCellStyle(style);

            ce = row10.createCell((short) 16);
            ce.setCellValue(data.getJishengtsjtbfggpxcc() == null ? 0 : data.getJishengtsjtbfggpxcc());
            ce.setCellStyle(style);

            ce = row9.createCell((short) 17);
            ce.setCellValue("人数");
            ce.setCellStyle(style);

            ce = row10.createCell((short) 17);
            ce.setCellValue(data.getJishengtsjtbfggpxrs() == null ? 0 : data.getJishengtsjtbfggpxrs());
            ce.setCellStyle(style);

            sheet.addMergedRegion(new CellRangeAddress(6, 6, (short) 18, (short) 19));
            ce = row6.createCell((short) 18);
            ce.setCellValue("志愿者队伍建设");
            ce.setCellStyle(style);

            sheet.addMergedRegion(new CellRangeAddress(7, 9, (short) 18, (short) 18));
            ce = row7.createCell((short) 18);
            ce.setCellValue("现有队伍数（支）");
            ce.setCellStyle(style);

            ce = row10.createCell((short) 18);
            ce.setCellValue(data.getZhiyuanzdwjsxydws() == null ? 0 : data.getZhiyuanzdwjsxydws());
            ce.setCellStyle(style);

            sheet.addMergedRegion(new CellRangeAddress(7, 9, (short) 19, (short) 19));
            ce = row7.createCell((short) 19);
            ce.setCellValue("人数");
            ce.setCellStyle(style);

            ce = row10.createCell((short) 19);
            ce.setCellValue(data.getZhiyuanzdwjsrs() == null ? 0 : data.getZhiyuanzdwjsrs());
            ce.setCellStyle(style);

            row0.setHeightInPoints(30);
            row1.setHeightInPoints(20);
            row2.setHeightInPoints(20);
            row3.setHeightInPoints(20);
            row4.setHeightInPoints(30);
            row5.setHeightInPoints(20);
            row6.setHeightInPoints(20);
            row7.setHeightInPoints(20);
            row8.setHeightInPoints(20);
            row9.setHeightInPoints(20);
            row10.setHeightInPoints(30);

            sheet.setColumnWidth(0, MSExcelUtil.pixel2WidthUnits(140));
            sheet.setColumnWidth(1, MSExcelUtil.pixel2WidthUnits(120));
            sheet.setColumnWidth(2, MSExcelUtil.pixel2WidthUnits(120));
            sheet.setColumnWidth(3, MSExcelUtil.pixel2WidthUnits(120));
            sheet.setColumnWidth(4, MSExcelUtil.pixel2WidthUnits(120));
            sheet.setColumnWidth(5, MSExcelUtil.pixel2WidthUnits(120));
            sheet.setColumnWidth(6, MSExcelUtil.pixel2WidthUnits(150));
            sheet.setColumnWidth(7, MSExcelUtil.pixel2WidthUnits(140));
            sheet.setColumnWidth(8, MSExcelUtil.pixel2WidthUnits(140));
            sheet.setColumnWidth(9, MSExcelUtil.pixel2WidthUnits(120));
            sheet.setColumnWidth(10, MSExcelUtil.pixel2WidthUnits(120));
            sheet.setColumnWidth(11, MSExcelUtil.pixel2WidthUnits(120));
            sheet.setColumnWidth(12, MSExcelUtil.pixel2WidthUnits(150));
            sheet.setColumnWidth(13, MSExcelUtil.pixel2WidthUnits(150));
            sheet.setColumnWidth(14, MSExcelUtil.pixel2WidthUnits(160));
            sheet.setColumnWidth(15, MSExcelUtil.pixel2WidthUnits(160));
            sheet.setColumnWidth(16, MSExcelUtil.pixel2WidthUnits(150));
            sheet.setColumnWidth(17, MSExcelUtil.pixel2WidthUnits(150));
            sheet.setColumnWidth(18, MSExcelUtil.pixel2WidthUnits(120));
            sheet.setColumnWidth(19, MSExcelUtil.pixel2WidthUnits(120));

            String filePath = staticResourceDir + uploadPath + FileType.PATH_EXCEL;

            String fileName = UUIDGenerator.getUUID() + ".xls";

            //这里是问题的关键，将这个工作簿写入到一个流中就可以输出相应的名字，这里需要写路径就ok了。
            FileOutputStream fileOut = new FileOutputStream(filePath + fileName);
            wb.write(fileOut);
            fileOut.close();

            excelNames.setFileName(fileName);
            if (data.getScopeName() == null){
                excelNames.setRealName("杭州市年度工作报表-" + year + ".xls");
            }else{
                excelNames.setRealName(data.getScopeName() + "年度工作报表-" + year + ".xls");
            }

        }catch (Exception ex){
            return null;
        }
        return excelNames;
    }
}
