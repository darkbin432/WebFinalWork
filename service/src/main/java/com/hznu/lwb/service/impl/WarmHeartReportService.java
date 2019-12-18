package com.hznu.lwb.service.impl;

import com.hznu.lwb.model.ExcelNames;
import com.hznu.lwb.model.param.WarmHeartReportParam;
import com.hznu.lwb.model.report.WarmHeartReport;
import com.hznu.lwb.model.report.YearReport;
import com.hznu.lwb.model.result.ApiResult;
import com.hznu.lwb.model.vm.DataTablesParameters;
import com.hznu.lwb.persistence.OrganizationDao;
import com.hznu.lwb.persistence.WarmHeartReportDao;
import com.hznu.lwb.service.IWarmHeartReportService;
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
import java.util.List;

@Service
public class WarmHeartReportService implements IWarmHeartReportService {

    Logger logger = LoggerFactory.getLogger(this.getClass());

    @Value("#{config['staticResourceDir']}")
    private String staticResourceDir;
    @Value("#{config['uploadPath']}")
    private String uploadPath;

    @Resource
    private WarmHeartReportDao warmHeartReportDao;

    @Resource
    private OrganizationDao organizationDao;

    @Override
    public ApiResult insert(WarmHeartReport warmHeartReport) {
        ApiResult apiResult = new ApiResult();
        try {
            warmHeartReportDao.insert(warmHeartReport);
            apiResult.success(String.valueOf(warmHeartReport.getId()));
        } catch (Exception e) {
            apiResult.fail("新增失败");
        }
        return apiResult;
    }

    @Override
    public ApiResult update(WarmHeartReport warmHeartReport) {
        ApiResult apiResult = new ApiResult();
        try {
            warmHeartReportDao.updateByPrimaryKeySelective(warmHeartReport);
            apiResult.success();
        } catch (Exception e) {
            apiResult.fail("更新失败");
        }
        return apiResult;
    }

    @Override
    public ApiResult delete(Integer id) {
        ApiResult apiResult = new ApiResult();
        try {
            warmHeartReportDao.deleteByPrimaryKey(id);
            apiResult.success();
        } catch (Exception e) {
            apiResult.fail("删除失败");
        }
        return apiResult;
    }

    @Override
    public ApiResult selectOne(Integer id) {
        ApiResult apiResult = new ApiResult();
        try {
            apiResult.success(warmHeartReportDao.selectByPrimaryKey(id));
        }catch (Exception e){
            apiResult.fail("获取失败");
        }
        return apiResult;
    }

    @Override
    public ApiResult getLici(String aoData, WarmHeartReportParam param) {
        ApiResult apiResult = new ApiResult();
        try {
            DataTablesParameters parameters = DataTablesParameters.fromJson(aoData);

            param.setSize(parameters.getRows());
            param.setOffset(parameters.getStart());

            if (param.getScopeId() % 10000 == 0 && param.getScopeId() != 0){
                param.setScopeType(0);
            }else if (param.getScopeId() % 100 == 0){
                param.setScopeType(1);
            }else if (param.getScopeId() % 100 != 0){
                param.setScopeType(2);
            }

            Integer totalCount = warmHeartReportDao.getLiciPageCount(param);
            List<WarmHeartReport> lwhr =  warmHeartReportDao.getLici(param);

            apiResult.dataTable(parameters.getsEcho(), totalCount, lwhr);
            apiResult.success();
        }catch (Exception e){
            logger.error(e.getMessage(),e);
            apiResult.fail("获取失败");
        }
        return apiResult;
    }

    @Override
    public ApiResult selectByCondition(String aoData, WarmHeartReportParam param) {
        ApiResult apiResult = new ApiResult();
        try {
            List<WarmHeartReport> lwhr = new ArrayList<>();
            if (param.getScopeId() == 0){
                lwhr = warmHeartReportDao.selectByShi(param);
                WarmHeartReport whr = warmHeartReportDao.selectByShiTotal(param);
                if (whr == null){
                    whr = new WarmHeartReport();
                }
                lwhr.add(lwhr.size(), whr);
            }else if (param.getScopeId() % 10000 == 0){
                lwhr = warmHeartReportDao.selectByQu(param);
                WarmHeartReport whr = warmHeartReportDao.selectByQuTotal(param);
                if (whr == null){
                    whr = new WarmHeartReport();
                }
                lwhr.add(lwhr.size(), whr);
            }else if (param.getScopeId() % 100 == 0){
                lwhr = warmHeartReportDao.selectByJiedao(param);
                WarmHeartReport whr = warmHeartReportDao.selectByJiedaoTotal(param);
                if (whr == null){
                    whr = new WarmHeartReport();
                }
                lwhr.add(lwhr.size(), whr);
            }
            apiResult.success(lwhr);
        }catch (Exception e){
            apiResult.fail("获取失败");
        }
        return apiResult;
    }

    @Override
    public ApiResult getYears() {
        ApiResult apiResult = new ApiResult();
        try {
            apiResult.success(warmHeartReportDao.getYears());
        }catch (Exception e){
            apiResult.fail("获取年份失败");
        }
        return apiResult;
    }

    @Override
    public ApiResult judge(WarmHeartReportParam param) {
        ApiResult apiResult = new ApiResult();
        try {
            apiResult.success(warmHeartReportDao.judge(param));
        }catch (Exception e){
            apiResult.fail("判断上传状态失败");
        }
        return apiResult;
    }

    @Override
    public ApiResult selectChildrenStatus(String aoData, WarmHeartReportParam param) {
        ApiResult apiResult = new ApiResult();
        try {
            DataTablesParameters parameters = DataTablesParameters.fromJson(aoData);

            param.setSize(parameters.getRows());
            param.setOffset(parameters.getStart());

            Integer totalCount = warmHeartReportDao.selectChildrenStatusPageCount(param);
            List<WarmHeartReport> lwhr =  warmHeartReportDao.selectChildrenStatus(param);

            apiResult.dataTable(parameters.getsEcho(), totalCount, lwhr);
            apiResult.success();
        }catch (Exception e){
            logger.error(e.getMessage(),e);
            apiResult.fail("获取下级机构失败");
        }
        return apiResult;
    }

    @Override
    public ApiResult exportReportTotal(String aoData, WarmHeartReportParam param) {
        ApiResult apiResult = new ApiResult();
        try {
            List<WarmHeartReport> data = (List<WarmHeartReport>)selectByCondition(aoData, param).getData();
            String scopeName = organizationDao.getOneScope(param.getScopeId()).getName();
            ExcelNames excelNames = reportToExcel(data, param.getYear(), param.getMonth(), scopeName);
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

    @Override
    public ApiResult exportReportById(Integer id) {
        ApiResult apiResult = new ApiResult();
        try {
            WarmHeartReport data = (WarmHeartReport) selectOne(id).getData();
            ExcelNames excelNames = reportToExcel1(data, data.getCreatedTime().getYear() + 1900, data.getCreatedTime().getMonth() + 1);
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

    public ExcelNames reportToExcel(List<WarmHeartReport> data, Integer year, Integer month, String scopeName) {
        ExcelNames excelNames = new ExcelNames();
        try {
            HSSFWorkbook wb = new HSSFWorkbook();
            HSSFSheet sheet = wb.createSheet(scopeName + "计生特殊家庭暖心行动月报表");

            HSSFCellStyle style = wb.createCellStyle(); // 样式对象

            style.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);// 垂直
            style.setAlignment(HSSFCellStyle.ALIGN_CENTER);// 水平
            HSSFRow row0 = sheet.createRow((short) 0);
            HSSFRow row1 = sheet.createRow((short) 1);
            HSSFRow row2 = sheet.createRow((short) 2);
            HSSFRow row3 = sheet.createRow((short) 3);
            HSSFRow row4 = sheet.createRow((short) 4);

            sheet.addMergedRegion(new CellRangeAddress(0, 0, (short) 0, (short) 20));
            HSSFCell ce = row0.createCell((short) 0);
            ce.setCellValue(scopeName + "计生特殊家庭暖心行动月报表");
            ce.setCellStyle(style); // 样式，居中

            sheet.addMergedRegion(new CellRangeAddress(1, 4, (short) 0, (short) 0));
            ce = row1.createCell((short) 0);
            ce.setCellValue("单位");
            ce.setCellStyle(style); // 样式，居中

            sheet.addMergedRegion(new CellRangeAddress(1, 1, (short) 1, (short) 20));
            ce = row1.createCell((short) 1);
            ce.setCellValue("主要内容");
            ce.setCellStyle(style); // 样式，居中

            sheet.addMergedRegion(new CellRangeAddress(2, 2, (short) 1, (short) 2));
            ce = row2.createCell((short) 1);
            ce.setCellValue("需求调查");
            ce.setCellStyle(style); // 样式，居中

            sheet.addMergedRegion(new CellRangeAddress(3, 4, (short) 1, (short) 1));
            ce = row3.createCell((short) 1);
            ce.setCellValue("户");
            ce.setCellStyle(style); // 样式，居中

            sheet.addMergedRegion(new CellRangeAddress(3, 4, (short) 2, (short) 2));
            ce = row3.createCell((short) 2);
            ce.setCellValue("人");
            ce.setCellStyle(style); // 样式，居中

            sheet.addMergedRegion(new CellRangeAddress(2, 2, (short) 3, (short) 4));
            ce = row2.createCell((short) 3);
            ce.setCellValue("保险理赔");
            ce.setCellStyle(style); // 样式，居中

            sheet.addMergedRegion(new CellRangeAddress(3, 4, (short) 3, (short) 3));
            ce = row3.createCell((short) 3);
            ce.setCellValue("例");
            ce.setCellStyle(style); // 样式，居中

            sheet.addMergedRegion(new CellRangeAddress(3, 4, (short) 4, (short) 4));
            ce = row3.createCell((short) 4);
            ce.setCellValue("金额（元）");
            ce.setCellStyle(style); // 样式，居中

            sheet.addMergedRegion(new CellRangeAddress(2, 2, (short) 5, (short) 8));
            ce = row2.createCell((short) 5);
            ce.setCellValue("心理健康服务");
            ce.setCellStyle(style); // 样式，居中

            sheet.addMergedRegion(new CellRangeAddress(3, 4, (short) 5, (short) 5));
            ce = row3.createCell((short) 5);
            ce.setCellValue("户");
            ce.setCellStyle(style); // 样式，居中

            sheet.addMergedRegion(new CellRangeAddress(3, 4, (short) 6, (short) 6));
            ce = row3.createCell((short) 6);
            ce.setCellValue("人");
            ce.setCellStyle(style); // 样式，居中

            sheet.addMergedRegion(new CellRangeAddress(3, 4, (short) 7, (short) 7));
            ce = row3.createCell((short) 7);
            ce.setCellValue("建档（份）");
            ce.setCellStyle(style); // 样式，居中

            sheet.addMergedRegion(new CellRangeAddress(3, 4, (short) 8, (short) 8));
            ce = row3.createCell((short) 8);
            ce.setCellValue("测评（人）");
            ce.setCellStyle(style); // 样式，居中

            sheet.addMergedRegion(new CellRangeAddress(2, 2, (short) 9, (short) 18));
            ce = row2.createCell((short) 9);
            ce.setCellValue("走访慰问落实");
            ce.setCellStyle(style); // 样式，居中

            sheet.addMergedRegion(new CellRangeAddress(3, 3, (short) 9, (short) 10));
            ce = row3.createCell((short) 9);
            ce.setCellValue("日常走访");
            ce.setCellStyle(style); // 样式，居中

            ce = row4.createCell((short) 9);
            ce.setCellValue("户");
            ce.setCellStyle(style); // 样式，居中

            ce = row4.createCell((short) 10);
            ce.setCellValue("人");
            ce.setCellStyle(style); // 样式，居中

            sheet.addMergedRegion(new CellRangeAddress(3, 3, (short) 11, (short) 12));
            ce = row3.createCell((short) 11);
            ce.setCellValue("节日看望");
            ce.setCellStyle(style); // 样式，居中

            ce = row4.createCell((short) 11);
            ce.setCellValue("户");
            ce.setCellStyle(style); // 样式，居中

            ce = row4.createCell((short) 12);
            ce.setCellValue("人");
            ce.setCellStyle(style); // 样式，居中


            sheet.addMergedRegion(new CellRangeAddress(3, 3, (short) 13, (short) 14));
            ce = row3.createCell((short) 13);
            ce.setCellValue("生日陪伴");
            ce.setCellStyle(style); // 样式，居中

            ce = row4.createCell((short) 13);
            ce.setCellValue("户");
            ce.setCellStyle(style); // 样式，居中

            ce = row4.createCell((short) 14);
            ce.setCellValue("人");
            ce.setCellStyle(style); // 样式，居中

            sheet.addMergedRegion(new CellRangeAddress(3, 3, (short) 15, (short) 16));
            ce = row3.createCell((short) 15);
            ce.setCellValue("住院探望");
            ce.setCellStyle(style); // 样式，居中

            ce = row4.createCell((short) 15);
            ce.setCellValue("户");
            ce.setCellStyle(style); // 样式，居中

            ce = row4.createCell((short) 16);
            ce.setCellValue("人");
            ce.setCellStyle(style); // 样式，居中

            sheet.addMergedRegion(new CellRangeAddress(3, 3, (short) 17, (short) 18));
            ce = row3.createCell((short) 17);
            ce.setCellValue("突发事件");
            ce.setCellStyle(style); // 样式，居中

            ce = row4.createCell((short) 17);
            ce.setCellValue("户");
            ce.setCellStyle(style); // 样式，居中

            ce = row4.createCell((short) 18);
            ce.setCellValue("人");
            ce.setCellStyle(style); // 样式，居中

            sheet.addMergedRegion(new CellRangeAddress(2, 2, (short) 19, (short) 20));
            ce = row2.createCell((short) 19);
            ce.setCellValue("服务活动开展");
            ce.setCellStyle(style); // 样式，居中

            sheet.addMergedRegion(new CellRangeAddress(3, 4, (short) 19, (short) 19));
            ce = row3.createCell((short) 19);
            ce.setCellValue("场");
            ce.setCellStyle(style); // 样式，居中

            sheet.addMergedRegion(new CellRangeAddress(3, 4, (short) 20, (short) 20));
            ce = row3.createCell((short) 20);
            ce.setCellValue("人");
            ce.setCellStyle(style); // 样式，居中

            HSSFRow row;
            HSSFCell cell;
            for (int i = 0; i < data.size(); ++i) {
                row = sheet.createRow((short) (5 + i));

                cell = row.createCell((short) 0);
                if (data.get(i).getScopeName() == null){
                    data.get(i).setScopeName("合计");
                }
                cell.setCellValue(data.get(i).getScopeName());
                cell.setCellStyle(style); // 样式，居中

                cell = row.createCell((short) 1);
                cell.setCellValue(data.get(i).getXuqiudch() == null ? 0 : data.get(i).getXuqiudch());
                cell.setCellStyle(style); // 样式，居中

                cell = row.createCell((short) 2);
                cell.setCellValue(data.get(i).getXuqiudcr() == null ? 0 : data.get(i).getXuqiudcr());
                cell.setCellStyle(style); // 样式，居中

                cell = row.createCell((short) 3);
                cell.setCellValue(data.get(i).getBaoxianlpl() == null ? 0 : data.get(i).getBaoxianlpl());
                cell.setCellStyle(style); // 样式，居中

                cell = row.createCell((short) 4);
                cell.setCellValue(data.get(i).getBaoxianlpje() == null ? 0 : data.get(i).getBaoxianlpje());
                cell.setCellStyle(style); // 样式，居中

                cell = row.createCell((short) 5);
                cell.setCellValue(data.get(i).getXinlijkfwh() == null ? 0 : data.get(i).getXinlijkfwh());
                cell.setCellStyle(style); // 样式，居中

                cell = row.createCell((short) 6);
                cell.setCellValue(data.get(i).getXinlijkfwr() == null ? 0 : data.get(i).getXinlijkfwr());
                cell.setCellStyle(style); // 样式，居中

                cell = row.createCell((short) 7);
                cell.setCellValue(data.get(i).getXinlijkfwjd() == null ? 0 : data.get(i).getXinlijkfwjd());
                cell.setCellStyle(style); // 样式，居中

                cell = row.createCell((short) 8);
                cell.setCellValue(data.get(i).getXinlijkfwcp() == null ? 0 : data.get(i).getXinlijkfwcp());
                cell.setCellStyle(style); // 样式，居中

                cell = row.createCell((short) 9);
                cell.setCellValue(data.get(i).getRichangzfh() == null ? 0 : data.get(i).getRichangzfh());
                cell.setCellStyle(style); // 样式，居中

                cell = row.createCell((short) 10);
                cell.setCellValue(data.get(i).getRichangzfr() == null ? 0 : data.get(i).getRichangzfr());
                cell.setCellStyle(style); // 样式，居中

                cell = row.createCell((short) 11);
                cell.setCellValue(data.get(i).getJierikwh() == null ? 0 : data.get(i).getJierikwh());
                cell.setCellStyle(style); // 样式，居中

                cell = row.createCell((short) 12);
                cell.setCellValue(data.get(i).getJierikwr() == null ? 0 : data.get(i).getJierikwr());
                cell.setCellStyle(style); // 样式，居中

                cell = row.createCell((short) 13);
                cell.setCellValue(data.get(i).getShengripbh() == null ? 0 : data.get(i).getShengripbh());
                cell.setCellStyle(style); // 样式，居中

                cell = row.createCell((short) 14);
                cell.setCellValue(data.get(i).getShengripbr() == null ? 0 : data.get(i).getShengripbr());
                cell.setCellStyle(style); // 样式，居中

                cell = row.createCell((short) 15);
                cell.setCellValue(data.get(i).getZhuyuantwh() == null ? 0 : data.get(i).getZhuyuantwh());
                cell.setCellStyle(style); // 样式，居中

                cell = row.createCell((short) 16);
                cell.setCellValue(data.get(i).getZhuyuantwr() == null ? 0 : data.get(i).getZhuyuantwr());
                cell.setCellStyle(style); // 样式，居中

                cell = row.createCell((short) 17);
                cell.setCellValue(data.get(i).getTufasjh() == null ? 0 : data.get(i).getTufasjh());
                cell.setCellStyle(style); // 样式，居中

                cell = row.createCell((short) 18);
                cell.setCellValue(data.get(i).getTufasjr() == null ? 0 : data.get(i).getTufasjr());
                cell.setCellStyle(style); // 样式，居中

                cell = row.createCell((short) 19);
                cell.setCellValue(data.get(i).getFuwuhdkzc() == null ? 0 : data.get(i).getFuwuhdkzc());
                cell.setCellStyle(style); // 样式，居中

                cell = row.createCell((short) 20);
                cell.setCellValue(data.get(i).getFuwuhdkzr() == null ? 0 : data.get(i).getFuwuhdkzr());
                cell.setCellStyle(style); // 样式，居中
            }

            row0.setHeightInPoints(30);
            row1.setHeightInPoints(20);
            row2.setHeightInPoints(20);
            row3.setHeightInPoints(20);
            row4.setHeightInPoints(20);

            for (int i = 0; i < data.size(); ++i){
                row = sheet.getRow(i + 5);
                row.setHeightInPoints(30);
            }

            sheet.setColumnWidth(0, MSExcelUtil.pixel2WidthUnits(140));
            sheet.setColumnWidth(1, MSExcelUtil.pixel2WidthUnits(80));
            sheet.setColumnWidth(2, MSExcelUtil.pixel2WidthUnits(80));
            sheet.setColumnWidth(3, MSExcelUtil.pixel2WidthUnits(80));
            sheet.setColumnWidth(4, MSExcelUtil.pixel2WidthUnits(100));
            sheet.setColumnWidth(5, MSExcelUtil.pixel2WidthUnits(80));
            sheet.setColumnWidth(6, MSExcelUtil.pixel2WidthUnits(80));
            sheet.setColumnWidth(7, MSExcelUtil.pixel2WidthUnits(100));
            sheet.setColumnWidth(8, MSExcelUtil.pixel2WidthUnits(100));
            sheet.setColumnWidth(9, MSExcelUtil.pixel2WidthUnits(80));
            sheet.setColumnWidth(10, MSExcelUtil.pixel2WidthUnits(80));
            sheet.setColumnWidth(11, MSExcelUtil.pixel2WidthUnits(80));
            sheet.setColumnWidth(12, MSExcelUtil.pixel2WidthUnits(80));
            sheet.setColumnWidth(13, MSExcelUtil.pixel2WidthUnits(80));
            sheet.setColumnWidth(14, MSExcelUtil.pixel2WidthUnits(80));
            sheet.setColumnWidth(15, MSExcelUtil.pixel2WidthUnits(80));
            sheet.setColumnWidth(16, MSExcelUtil.pixel2WidthUnits(80));
            sheet.setColumnWidth(17, MSExcelUtil.pixel2WidthUnits(80));
            sheet.setColumnWidth(18, MSExcelUtil.pixel2WidthUnits(80));
            sheet.setColumnWidth(19, MSExcelUtil.pixel2WidthUnits(80));
            sheet.setColumnWidth(20, MSExcelUtil.pixel2WidthUnits(80));

            String filePath = staticResourceDir + uploadPath + FileType.PATH_EXCEL;

            String fileName = UUIDGenerator.getUUID() + ".xls";

            //这里是问题的关键，将这个工作簿写入到一个流中就可以输出相应的名字，这里需要写路径就ok了。
            FileOutputStream fileOut = new FileOutputStream(filePath + fileName);
            wb.write(fileOut);
            fileOut.close();

            excelNames.setFileName(fileName);
            excelNames.setRealName(scopeName + "计生特殊家庭暖心行动月报表-" + year + "-" + month + ".xls");
        }catch (Exception ex){
            return null;
        }
        return excelNames;
    }

    public ExcelNames reportToExcel1(WarmHeartReport data, Integer year, Integer month) {
        ExcelNames excelNames = new ExcelNames();
        try {
            HSSFWorkbook wb = new HSSFWorkbook();
            HSSFSheet sheet = wb.createSheet("杭州市计生特殊家庭暖心行动月报表");

            HSSFCellStyle style = wb.createCellStyle(); // 样式对象

            style.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);// 垂直
            style.setAlignment(HSSFCellStyle.ALIGN_CENTER);// 水平
            HSSFRow row0 = sheet.createRow((short) 0);
            HSSFRow row1 = sheet.createRow((short) 1);
            HSSFRow row2 = sheet.createRow((short) 2);
            HSSFRow row3 = sheet.createRow((short) 3);
            HSSFRow row4 = sheet.createRow((short) 4);
            HSSFRow row5 = sheet.createRow((short) 5);

            sheet.addMergedRegion(new CellRangeAddress(0, 0, (short) 0, (short) 20));
            HSSFCell ce = row0.createCell((short) 0);
            ce.setCellValue("杭州市计生特殊家庭暖心行动月报表");
            ce.setCellStyle(style); // 样式，居中

            sheet.addMergedRegion(new CellRangeAddress(1, 4, (short) 0, (short) 0));
            ce = row1.createCell((short) 0);
            ce.setCellValue("单位");
            ce.setCellStyle(style); // 样式，居中

            ce = row5.createCell((short) 0);
            ce.setCellValue(data.getScopeName());
            ce.setCellStyle(style); // 样式，居中

            sheet.addMergedRegion(new CellRangeAddress(1, 1, (short) 1, (short) 20));
            ce = row1.createCell((short) 1);
            ce.setCellValue("主要内容");
            ce.setCellStyle(style); // 样式，居中

            sheet.addMergedRegion(new CellRangeAddress(2, 2, (short) 1, (short) 2));
            ce = row2.createCell((short) 1);
            ce.setCellValue("需求调查");
            ce.setCellStyle(style); // 样式，居中

            sheet.addMergedRegion(new CellRangeAddress(3, 4, (short) 1, (short) 1));
            ce = row3.createCell((short) 1);
            ce.setCellValue("户");
            ce.setCellStyle(style); // 样式，居中

            ce = row5.createCell((short) 1);
            ce.setCellValue(data.getXuqiudch() == null ? 0 : data.getXuqiudch());
            ce.setCellStyle(style); // 样式，居中

            sheet.addMergedRegion(new CellRangeAddress(3, 4, (short) 2, (short) 2));
            ce = row3.createCell((short) 2);
            ce.setCellValue("人");
            ce.setCellStyle(style); // 样式，居中

            ce = row5.createCell((short) 2);
            ce.setCellValue(data.getXuqiudcr() == null ? 0 : data.getXuqiudcr());
            ce.setCellStyle(style); // 样式，居中

            sheet.addMergedRegion(new CellRangeAddress(2, 2, (short) 3, (short) 4));
            ce = row2.createCell((short) 3);
            ce.setCellValue("保险理赔");
            ce.setCellStyle(style); // 样式，居中

            sheet.addMergedRegion(new CellRangeAddress(3, 4, (short) 3, (short) 3));
            ce = row3.createCell((short) 3);
            ce.setCellValue("例");
            ce.setCellStyle(style); // 样式，居中

            ce = row5.createCell((short) 3);
            ce.setCellValue(data.getBaoxianlpl() == null ? 0 : data.getBaoxianlpl());
            ce.setCellStyle(style); // 样式，居中

            sheet.addMergedRegion(new CellRangeAddress(3, 4, (short) 4, (short) 4));
            ce = row3.createCell((short) 4);
            ce.setCellValue("金额（元）");
            ce.setCellStyle(style); // 样式，居中

            ce = row5.createCell((short) 4);
            ce.setCellValue(data.getBaoxianlpje() == null ? 0 : data.getBaoxianlpje());
            ce.setCellStyle(style); // 样式，居中

            sheet.addMergedRegion(new CellRangeAddress(2, 2, (short) 5, (short) 8));
            ce = row2.createCell((short) 5);
            ce.setCellValue("心理健康服务");
            ce.setCellStyle(style); // 样式，居中

            sheet.addMergedRegion(new CellRangeAddress(3, 4, (short) 5, (short) 5));
            ce = row3.createCell((short) 5);
            ce.setCellValue("户");
            ce.setCellStyle(style); // 样式，居中

            ce = row5.createCell((short) 5);
            ce.setCellValue(data.getXinlijkfwh() == null ? 0 : data.getXinlijkfwh());
            ce.setCellStyle(style); // 样式，居中

            sheet.addMergedRegion(new CellRangeAddress(3, 4, (short) 6, (short) 6));
            ce = row3.createCell((short) 6);
            ce.setCellValue("人");
            ce.setCellStyle(style); // 样式，居中

            ce = row5.createCell((short) 6);
            ce.setCellValue(data.getXinlijkfwr() == null ? 0 : data.getXinlijkfwr());
            ce.setCellStyle(style); // 样式，居中
            sheet.addMergedRegion(new CellRangeAddress(3, 4, (short) 7, (short) 7));
            ce = row3.createCell((short) 7);
            ce.setCellValue("建档（份）");
            ce.setCellStyle(style); // 样式，居中

            ce = row5.createCell((short) 7);
            ce.setCellValue(data.getXinlijkfwjd() == null ? 0 : data.getXinlijkfwjd());
            ce.setCellStyle(style); // 样式，居中

            sheet.addMergedRegion(new CellRangeAddress(3, 4, (short) 8, (short) 8));
            ce = row3.createCell((short) 8);
            ce.setCellValue("测评（人）");
            ce.setCellStyle(style); // 样式，居中

            ce = row5.createCell((short) 8);
            ce.setCellValue(data.getXinlijkfwcp() == null ? 0 : data.getXinlijkfwcp());
            ce.setCellStyle(style); // 样式，居中

            sheet.addMergedRegion(new CellRangeAddress(2, 2, (short) 9, (short) 18));
            ce = row2.createCell((short) 9);
            ce.setCellValue("走访慰问落实");
            ce.setCellStyle(style); // 样式，居中

            sheet.addMergedRegion(new CellRangeAddress(3, 3, (short) 9, (short) 10));
            ce = row3.createCell((short) 9);
            ce.setCellValue("日常走访");
            ce.setCellStyle(style); // 样式，居中

            ce = row4.createCell((short) 9);
            ce.setCellValue("户");
            ce.setCellStyle(style); // 样式，居中

            ce = row5.createCell((short) 9);
            ce.setCellValue(data.getRichangzfh() == null ? 0 : data.getRichangzfh());
            ce.setCellStyle(style); // 样式，居中

            ce = row4.createCell((short) 10);
            ce.setCellValue("人");
            ce.setCellStyle(style); // 样式，居中

            ce = row5.createCell((short) 10);
            ce.setCellValue(data.getRichangzfr() == null ? 0 : data.getRichangzfr());
            ce.setCellStyle(style); // 样式，居中

            sheet.addMergedRegion(new CellRangeAddress(3, 3, (short) 11, (short) 12));
            ce = row3.createCell((short) 11);
            ce.setCellValue("节日看望");
            ce.setCellStyle(style); // 样式，居中

            ce = row4.createCell((short) 11);
            ce.setCellValue("户");
            ce.setCellStyle(style); // 样式，居中

            ce = row5.createCell((short) 11);
            ce.setCellValue(data.getJierikwh() == null ? 0 : data.getJierikwh());
            ce.setCellStyle(style); // 样式，居中

            ce = row4.createCell((short) 12);
            ce.setCellValue("人");
            ce.setCellStyle(style); // 样式，居中

            ce = row5.createCell((short) 12);
            ce.setCellValue(data.getJierikwr() == null ? 0 : data.getJierikwr());
            ce.setCellStyle(style); // 样式，居中

            sheet.addMergedRegion(new CellRangeAddress(3, 3, (short) 13, (short) 14));
            ce = row3.createCell((short) 13);
            ce.setCellValue("生日陪伴");
            ce.setCellStyle(style); // 样式，居中

            ce = row4.createCell((short) 13);
            ce.setCellValue("户");
            ce.setCellStyle(style); // 样式，居中

            ce = row5.createCell((short) 13);
            ce.setCellValue(data.getShengripbh() == null ? 0 : data.getShengripbh());
            ce.setCellStyle(style); // 样式，居中

            ce = row4.createCell((short) 14);
            ce.setCellValue("人");
            ce.setCellStyle(style); // 样式，居中

            ce = row5.createCell((short) 14);
            ce.setCellValue(data.getShengripbr() == null ? 0 : data.getShengripbr());
            ce.setCellStyle(style); // 样式，居中

            sheet.addMergedRegion(new CellRangeAddress(3, 3, (short) 15, (short) 16));
            ce = row3.createCell((short) 15);
            ce.setCellValue("住院探望");
            ce.setCellStyle(style); // 样式，居中

            ce = row4.createCell((short) 15);
            ce.setCellValue("户");
            ce.setCellStyle(style); // 样式，居中

            ce = row5.createCell((short) 15);
            ce.setCellValue(data.getZhuyuantwh() == null ? 0 : data.getZhuyuantwh());
            ce.setCellStyle(style); // 样式，居中

            ce = row4.createCell((short) 16);
            ce.setCellValue("人");
            ce.setCellStyle(style); // 样式，居中

            ce = row5.createCell((short) 16);
            ce.setCellValue(data.getZhuyuantwr() == null ? 0 : data.getZhuyuantwr());
            ce.setCellStyle(style); // 样式，居中

            sheet.addMergedRegion(new CellRangeAddress(3, 3, (short) 17, (short) 18));
            ce = row3.createCell((short) 17);
            ce.setCellValue("突发事件");
            ce.setCellStyle(style); // 样式，居中

            ce = row4.createCell((short) 17);
            ce.setCellValue("户");
            ce.setCellStyle(style); // 样式，居中

            ce = row5.createCell((short) 17);
            ce.setCellValue(data.getTufasjh() == null ? 0 : data.getTufasjh());
            ce.setCellStyle(style); // 样式，居中

            ce = row4.createCell((short) 18);
            ce.setCellValue("人");
            ce.setCellStyle(style); // 样式，居中

            ce = row5.createCell((short) 18);
            ce.setCellValue(data.getTufasjr() == null ? 0 : data.getTufasjr());
            ce.setCellStyle(style); // 样式，居中

            sheet.addMergedRegion(new CellRangeAddress(2, 2, (short) 19, (short) 20));
            ce = row2.createCell((short) 19);
            ce.setCellValue("服务活动开展");
            ce.setCellStyle(style); // 样式，居中

            sheet.addMergedRegion(new CellRangeAddress(3, 4, (short) 19, (short) 19));
            ce = row3.createCell((short) 19);
            ce.setCellValue("场");
            ce.setCellStyle(style); // 样式，居中

            ce = row5.createCell((short) 19);
            ce.setCellValue(data.getFuwuhdkzc() == null ? 0 : data.getFuwuhdkzc());
            ce.setCellStyle(style); // 样式，居中

            sheet.addMergedRegion(new CellRangeAddress(3, 4, (short) 20, (short) 20));
            ce = row3.createCell((short) 20);
            ce.setCellValue("人");
            ce.setCellStyle(style); // 样式，居中

            ce = row5.createCell((short) 20);
            ce.setCellValue(data.getFuwuhdkzr() == null ? 0 : data.getFuwuhdkzr());
            ce.setCellStyle(style); // 样式，居中

            row0.setHeightInPoints(30);
            row1.setHeightInPoints(20);
            row2.setHeightInPoints(20);
            row3.setHeightInPoints(20);
            row4.setHeightInPoints(20);
            row5.setHeightInPoints(20);

            sheet.setColumnWidth(0, MSExcelUtil.pixel2WidthUnits(140));
            sheet.setColumnWidth(1, MSExcelUtil.pixel2WidthUnits(80));
            sheet.setColumnWidth(2, MSExcelUtil.pixel2WidthUnits(80));
            sheet.setColumnWidth(3, MSExcelUtil.pixel2WidthUnits(80));
            sheet.setColumnWidth(4, MSExcelUtil.pixel2WidthUnits(100));
            sheet.setColumnWidth(5, MSExcelUtil.pixel2WidthUnits(80));
            sheet.setColumnWidth(6, MSExcelUtil.pixel2WidthUnits(80));
            sheet.setColumnWidth(7, MSExcelUtil.pixel2WidthUnits(100));
            sheet.setColumnWidth(8, MSExcelUtil.pixel2WidthUnits(100));
            sheet.setColumnWidth(9, MSExcelUtil.pixel2WidthUnits(80));
            sheet.setColumnWidth(10, MSExcelUtil.pixel2WidthUnits(80));
            sheet.setColumnWidth(11, MSExcelUtil.pixel2WidthUnits(80));
            sheet.setColumnWidth(12, MSExcelUtil.pixel2WidthUnits(80));
            sheet.setColumnWidth(13, MSExcelUtil.pixel2WidthUnits(80));
            sheet.setColumnWidth(14, MSExcelUtil.pixel2WidthUnits(80));
            sheet.setColumnWidth(15, MSExcelUtil.pixel2WidthUnits(80));
            sheet.setColumnWidth(16, MSExcelUtil.pixel2WidthUnits(80));
            sheet.setColumnWidth(17, MSExcelUtil.pixel2WidthUnits(80));
            sheet.setColumnWidth(18, MSExcelUtil.pixel2WidthUnits(80));
            sheet.setColumnWidth(19, MSExcelUtil.pixel2WidthUnits(80));
            sheet.setColumnWidth(20, MSExcelUtil.pixel2WidthUnits(80));

            String filePath = staticResourceDir + uploadPath + FileType.PATH_EXCEL;

            String fileName = UUIDGenerator.getUUID() + ".xls";

            //这里是问题的关键，将这个工作簿写入到一个流中就可以输出相应的名字，这里需要写路径就ok了。
            FileOutputStream fileOut = new FileOutputStream(filePath + fileName);
            wb.write(fileOut);
            fileOut.close();

            excelNames.setFileName(fileName);
            excelNames.setRealName(data.getScopeName() + "计生特殊家庭暖心行动月报表-" + year + "-" + month + ".xls");

        }catch (Exception ex){
            return null;
        }
        return excelNames;
    }

}


