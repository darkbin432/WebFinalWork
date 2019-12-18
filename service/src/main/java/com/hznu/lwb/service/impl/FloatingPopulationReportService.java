package com.hznu.lwb.service.impl;

import com.hznu.lwb.model.ExcelNames;
import com.hznu.lwb.model.param.FloatingPopulationReportParam;
import com.hznu.lwb.model.report.FloatingPopulationReport;
import com.hznu.lwb.model.result.ApiResult;
import com.hznu.lwb.model.vm.DataTablesParameters;
import com.hznu.lwb.persistence.FloatingPopulationReportDao;
import com.hznu.lwb.service.IFloatingPopulationReportService;
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
import java.util.List;

@Service
public class FloatingPopulationReportService implements IFloatingPopulationReportService {

    Logger logger = LoggerFactory.getLogger(this.getClass());

    @Value("#{config['staticResourceDir']}")
    private String staticResourceDir;
    @Value("#{config['uploadPath']}")
    private String uploadPath;

    @Resource
    private FloatingPopulationReportDao floatingPopulationReportDao;

    @Override
    public ApiResult insert(FloatingPopulationReport floatingPopulationReport) {
        ApiResult apiResult = new ApiResult();
        try {
            floatingPopulationReportDao.insert(floatingPopulationReport);
            apiResult.success();
        }catch (Exception e){
            logger.error(e.getMessage(),e);
            apiResult.fail("新增失败");
        }
        return apiResult;
    }

    @Override
    public ApiResult delete(Integer id) {
        ApiResult apiResult = new ApiResult();
        try {
            floatingPopulationReportDao.deleteByPrimaryKey(id);
            apiResult.success();
        }catch (Exception e){
            apiResult.fail("删除失败");
        }
        return apiResult;
    }

    @Override
    public ApiResult update(FloatingPopulationReport floatingPopulationReport) {
        ApiResult apiResult = new ApiResult();
        try {
            floatingPopulationReportDao.updateByPrimaryKeySelective(floatingPopulationReport);
            apiResult.success();
        }catch (Exception e){
            apiResult.fail("更新失败");
        }
        return apiResult;
    }

    @Override
    public ApiResult selectOne(Integer id) {
        ApiResult apiResult = new ApiResult();
        try {
            apiResult.success(floatingPopulationReportDao.selectByPrimaryKey(id));
        }catch (Exception e){
            apiResult.fail("获取失败");
        }
        return apiResult;
    }

    @Override
    public ApiResult selectByCondition(String aoData, FloatingPopulationReportParam param) {
        ApiResult apiResult = new ApiResult();
        try {
            if (param.getScopeId() == null){
                List<FloatingPopulationReport> lf = floatingPopulationReportDao.selectByQu(param);
                FloatingPopulationReport fpr = floatingPopulationReportDao.selectTotal(param);
                lf.add(fpr);
                apiResult.success(lf);
            }else{
                DataTablesParameters parameters = DataTablesParameters.fromJson(aoData);
                param.setSize(parameters.getRows());
                param.setOffset(parameters.getStart());

                Integer totalCount = floatingPopulationReportDao.selectByConditionPageCount(param);
                List<FloatingPopulationReport> lf = floatingPopulationReportDao.selectByCondition(param);

                apiResult.dataTable(parameters.getsEcho(),totalCount,lf);
            }
        }catch (Exception e){
            logger.error(e.getMessage(),e);
            apiResult.fail("获取失败");
        }
        return apiResult;
    }

    @Override
    public ApiResult selectChildrenStatus() {
        ApiResult apiResult = new ApiResult();
        try {
            apiResult.success(floatingPopulationReportDao.selectChildrenStatus());
        }catch (Exception e){
            logger.error(e.getMessage(),e);
            apiResult.fail("获取失败");
        }
        return apiResult;
    }

    @Override
    public ApiResult getYears() {
        ApiResult apiResult = new ApiResult();
        try {
            apiResult.success(floatingPopulationReportDao.getYears());
        }catch (Exception e){
            logger.error(e.getMessage(),e);
            apiResult.fail("获取失败");
        }
        return apiResult;
    }

    @Override
    public ApiResult exportReport(String aoData, FloatingPopulationReportParam param) {
        ApiResult apiResult = new ApiResult();
        try {
            List<FloatingPopulationReport> data = (List<FloatingPopulationReport>)selectByCondition(aoData, param).getData();
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

    @Override
    public ApiResult exportReportById(Integer id) {
        ApiResult apiResult = new ApiResult();
        try {
            FloatingPopulationReport data = (FloatingPopulationReport) selectOne(id).getData();
            ExcelNames excelNames = reportToExcel2(data);
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

    public ExcelNames reportToExcel(List<FloatingPopulationReport> data, Integer year) {
        ExcelNames excelNames = new ExcelNames();
        try {
            HSSFWorkbook wb = new HSSFWorkbook();
            HSSFSheet sheet = wb.createSheet("流动人口计生协示范点信息统计表");

            HSSFCellStyle style = wb.createCellStyle(); // 样式对象

            style.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);// 垂直
            style.setAlignment(HSSFCellStyle.ALIGN_CENTER);// 水平
            HSSFRow row0 = sheet.createRow((short) 0);
            HSSFRow row1 = sheet.createRow((short) 1);
            HSSFRow row2 = sheet.createRow((short) 2);
            HSSFRow row3 = sheet.createRow((short) 3);
            HSSFRow row4 = sheet.createRow((short) 4);

            sheet.addMergedRegion(new CellRangeAddress(0, 0, (short) 0, (short) 7));
            HSSFCell ce = row0.createCell((short) 0);
            ce.setCellValue("杭州市流动人口计生协示范点信息统计表");
            ce.setCellStyle(style); // 样式，居中

            sheet.addMergedRegion(new CellRangeAddress(1, 4, (short) 0, (short) 0));
            ce = row1.createCell((short) 0);
            ce.setCellValue("机构名称");
            ce.setCellStyle(style);

            sheet.addMergedRegion(new CellRangeAddress(1, 4, (short) 1, (short) 1));
            ce = row1.createCell((short) 1);
            ce.setCellValue("职工总数");
            ce.setCellStyle(style);

            sheet.addMergedRegion(new CellRangeAddress(1, 4, (short) 2, (short) 2));
            ce = row1.createCell((short) 2);
            ce.setCellValue("流动人口总数");
            ce.setCellStyle(style);

            sheet.addMergedRegion(new CellRangeAddress(1, 4, (short) 3, (short) 3));
            ce = row1.createCell((short) 3);
            ce.setCellValue("流动人口总数");
            ce.setCellStyle(style);

            sheet.addMergedRegion(new CellRangeAddress(1, 1, (short) 4, (short) 7));
            ce = row1.createCell((short) 4);
            ce.setCellValue("项目单位流动人口基本信息");
            ce.setCellStyle(style);

            sheet.addMergedRegion(new CellRangeAddress(2, 2, (short) 4, (short) 5));
            ce = row2.createCell((short) 4);
            ce.setCellValue("流动人口数");
            ce.setCellStyle(style);

            sheet.addMergedRegion(new CellRangeAddress(3, 3, (short) 4, (short) 5));
            ce = row3.createCell((short) 4);
            ce.setCellValue("（人）");
            ce.setCellStyle(style);

            ce = row4.createCell((short) 4);
            ce.setCellValue("男");
            ce.setCellStyle(style);

            ce = row4.createCell((short) 5);
            ce.setCellValue("女");
            ce.setCellStyle(style);

            ce = row2.createCell((short) 6);
            ce.setCellValue("未婚");
            ce.setCellStyle(style);

            ce = row2.createCell((short) 7);
            ce.setCellValue("已婚");
            ce.setCellStyle(style);

            sheet.addMergedRegion(new CellRangeAddress(3, 4, (short) 6, (short) 6));
            ce = row3.createCell((short) 6);
            ce.setCellValue("（人）");
            ce.setCellStyle(style);

            sheet.addMergedRegion(new CellRangeAddress(3, 4, (short) 7, (short) 7));
            ce = row3.createCell((short) 7);
            ce.setCellValue("（人）");
            ce.setCellStyle(style);

            HSSFRow row;
            HSSFCell cell;
            for (int i = 0; i < data.size(); ++i){
                row = sheet.createRow((short) (5 + i));

                if (data.get(i).getScopeName() == null){
                    cell = row.createCell(0);
                    cell.setCellValue("合计");
                    cell.setCellStyle(style);
                }else{
                    cell = row.createCell(0);
                    cell.setCellValue(data.get(i).getScopeName() + "计生协");
                    cell.setCellStyle(style);
                }

                cell = row.createCell(1);
                cell.setCellValue(data.get(i).getZhigongNumber() == null ? 0 : data.get(i).getZhigongNumber());
                cell.setCellStyle(style);

                cell = row.createCell(2);
                cell.setCellValue(data.get(i).getLiudongrkNumber() == null ? 0 : data.get(i).getLiudongrkNumber());
                cell.setCellStyle(style);

                cell = row.createCell(3);
                cell.setCellValue(data.get(i).getHuiyuanNumber() == null ? 0 : data.get(i).getHuiyuanNumber());
                cell.setCellStyle(style);

                cell = row.createCell(4);
                cell.setCellValue(data.get(i).getLiudongMaleNumber() == null ? 0 : data.get(i).getLiudongMaleNumber());
                cell.setCellStyle(style);

                cell = row.createCell(5);
                cell.setCellValue(data.get(i).getLiudongFemaleNumber() == null ? 0 : data.get(i).getLiudongFemaleNumber());
                cell.setCellStyle(style);

                cell = row.createCell(6);
                cell.setCellValue(data.get(i).getLiudongUnmarriedNumber() == null ? 0 : data.get(i).getLiudongUnmarriedNumber());
                cell.setCellStyle(style);

                cell = row.createCell(7);
                cell.setCellValue(data.get(i).getLiudongMarriedNumber() == null ? 0 : data.get(i).getLiudongMarriedNumber());
                cell.setCellStyle(style);

            }

            row0.setHeightInPoints(30);
            row1.setHeightInPoints(20);
            row2.setHeightInPoints(20);
            row3.setHeightInPoints(20);
            row4.setHeightInPoints(20);

            for (int i = 0; i < data.size(); ++i){
                row = sheet.getRow(i + 5);
                row.setHeightInPoints(20);
            }

            sheet.setColumnWidth(0, MSExcelUtil.pixel2WidthUnits(100));
            sheet.setColumnWidth(1, MSExcelUtil.pixel2WidthUnits(100));
            sheet.setColumnWidth(2, MSExcelUtil.pixel2WidthUnits(100));
            sheet.setColumnWidth(3, MSExcelUtil.pixel2WidthUnits(100));
            sheet.setColumnWidth(4, MSExcelUtil.pixel2WidthUnits(100));
            sheet.setColumnWidth(5, MSExcelUtil.pixel2WidthUnits(100));
            sheet.setColumnWidth(6, MSExcelUtil.pixel2WidthUnits(100));
            sheet.setColumnWidth(7, MSExcelUtil.pixel2WidthUnits(100));

            String filePath = staticResourceDir + uploadPath + FileType.PATH_EXCEL;

            String fileName = UUIDGenerator.getUUID() + ".xls";

            //这里是问题的关键，将这个工作簿写入到一个流中就可以输出相应的名字，这里需要写路径就ok了。
            FileOutputStream fileOut = new FileOutputStream(filePath + fileName);
            wb.write(fileOut);
            fileOut.close();

            excelNames.setFileName(fileName);
            excelNames.setRealName("杭州市流动人口计生协示范点信息统计表-" + year + ".xls");

        }catch (Exception ex){
            return null;
        }
        return excelNames;
    }

    public ExcelNames reportToExcel2(FloatingPopulationReport data) {
        ExcelNames excelNames = new ExcelNames();
        try {
            HSSFWorkbook wb = new HSSFWorkbook();
            HSSFSheet sheet = wb.createSheet("流动人口计生协示范点信息统计表");

            HSSFCellStyle style = wb.createCellStyle(); // 样式对象

            style.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);// 垂直
            style.setAlignment(HSSFCellStyle.ALIGN_CENTER);// 水平
            style.setWrapText(true);
            HSSFRow row0 = sheet.createRow((short) 0);
            HSSFRow row1 = sheet.createRow((short) 1);
            HSSFRow row2 = sheet.createRow((short) 2);
            HSSFRow row3 = sheet.createRow((short) 3);
            HSSFRow row4 = sheet.createRow((short) 4);
            HSSFRow row5 = sheet.createRow((short) 5);
            HSSFRow row6 = sheet.createRow((short) 6);

            sheet.addMergedRegion(new CellRangeAddress(0, 0, (short) 0, (short) 13));
            HSSFCell ce = row0.createCell((short) 0);
            ce.setCellValue("流动人口计生协示范点信息统计表");
            ce.setCellStyle(style); // 样式，居中

            sheet.addMergedRegion(new CellRangeAddress(1, 1, (short) 0, (short) 13));
            ce = row1.createCell((short) 0);
            ce.setCellValue("示范点名称：" + data.getName());
            ce.setCellStyle(style);

            sheet.addMergedRegion(new CellRangeAddress(2, 5, (short) 0, (short) 3));
            ce = row2.createCell((short) 0);
            ce.setCellValue("示范层级");
            ce.setCellStyle(style);

            sheet.addMergedRegion(new CellRangeAddress(2, 5, (short) 4, (short) 4));
            ce = row2.createCell((short) 4);
            ce.setCellValue("类型");
            ce.setCellStyle(style);

            sheet.addMergedRegion(new CellRangeAddress(2, 5, (short) 5, (short) 5));
            ce = row2.createCell((short) 5);
            ce.setCellValue("地址");
            ce.setCellStyle(style);

            sheet.addMergedRegion(new CellRangeAddress(2, 5, (short) 6, (short) 6));
            ce = row2.createCell((short) 6);
            ce.setCellValue("职工总数");
            ce.setCellStyle(style);

            sheet.addMergedRegion(new CellRangeAddress(2, 5, (short) 7, (short) 7));
            ce = row2.createCell((short) 7);
            ce.setCellValue("流动人口总数");
            ce.setCellStyle(style);

            sheet.addMergedRegion(new CellRangeAddress(2, 5, (short) 8, (short) 8));
            ce = row2.createCell((short) 8);
            ce.setCellValue("流动人口计生协建立时间");
            ce.setCellStyle(style);

            sheet.addMergedRegion(new CellRangeAddress(2, 5, (short) 9, (short) 9));
            ce = row2.createCell((short) 9);
            ce.setCellValue("会员数");
            ce.setCellStyle(style);

            sheet.addMergedRegion(new CellRangeAddress(2, 2, (short) 10, (short) 13));
            ce = row2.createCell((short) 10);
            ce.setCellValue("项目单位流动人口基本信息");
            ce.setCellStyle(style);

            sheet.addMergedRegion(new CellRangeAddress(3, 3, (short) 10, (short) 11));
            ce = row3.createCell((short) 10);
            ce.setCellValue("流动人口数");
            ce.setCellStyle(style);

            sheet.addMergedRegion(new CellRangeAddress(4, 4, (short) 10, (short) 11));
            ce = row4.createCell((short) 10);
            ce.setCellValue("（人）");
            ce.setCellStyle(style);

            sheet.addMergedRegion(new CellRangeAddress(5, 5, (short) 10, (short) 10));
            ce = row5.createCell((short) 10);
            ce.setCellValue("男");
            ce.setCellStyle(style);

            sheet.addMergedRegion(new CellRangeAddress(5, 5, (short) 11, (short) 11));
            ce = row5.createCell((short) 11);
            ce.setCellValue("女");
            ce.setCellStyle(style);

            sheet.addMergedRegion(new CellRangeAddress(3, 3, (short) 12, (short) 12));
            ce = row3.createCell((short) 12);
            ce.setCellValue("未婚");
            ce.setCellStyle(style);

            sheet.addMergedRegion(new CellRangeAddress(3, 3, (short) 13, (short) 13));
            ce = row3.createCell((short) 13);
            ce.setCellValue("已婚");
            ce.setCellStyle(style);

            sheet.addMergedRegion(new CellRangeAddress(4, 5, (short) 12, (short) 12));
            ce = row4.createCell((short) 12);
            ce.setCellValue("（人）");
            ce.setCellStyle(style);

            sheet.addMergedRegion(new CellRangeAddress(4, 5, (short) 13, (short) 13));
            ce = row4.createCell((short) 13);
            ce.setCellValue("（人）");
            ce.setCellStyle(style);

            HSSFCell cell;

            cell = row6.createCell(0);
            cell.setCellValue("国家级" + (data.getLevel() == 0 ? "√" : "□"));
            cell.setCellStyle(style);

            cell = row6.createCell(1);
            cell.setCellValue("省级" + (data.getLevel() == 1 ? "√" : "□"));
            cell.setCellStyle(style);

            cell = row6.createCell(2);
            cell.setCellValue("地市级" + (data.getLevel() == 2 ? "√" : "□"));
            cell.setCellStyle(style);

            cell = row6.createCell(3);
            cell.setCellValue("区县级" + (data.getLevel() == 3 ? "√" : "□"));
            cell.setCellStyle(style);

            cell = row6.createCell(4);
            cell.setCellValue("企业" + (data.getType() == 0 ? "√" : "□")
            + " 集市" + (data.getType() == 1 ? "√" : "□")
            + " 商圈" + (data.getType() == 2 ? "√" : "□")
            + " 市场" + (data.getType() == 3 ? "√" : "□")
            + "\r\n外驻" + (data.getType() == 4 ? "√" : "□")
            + " 商会" + (data.getType() == 5 ? "√" : "□")
            + " 商场" + (data.getType() == 6 ? "√" : "□")
            + " 其他" + (data.getType() == 7 ? "√" : "□"));
            cell.setCellStyle(style);

            cell = row6.createCell(5);
            cell.setCellValue(data.getAddress() == null ? "" : data.getAddress());
            cell.setCellStyle(style);

            cell = row6.createCell(6);
            cell.setCellValue(data.getZhigongNumber() == null ? 0 : data.getZhigongNumber());
            cell.setCellStyle(style);

            cell = row6.createCell(7);
            cell.setCellValue(data.getLiudongrkNumber() == null ? 0 : data.getLiudongrkNumber());
            cell.setCellStyle(style);

            cell = row6.createCell(8);
            cell.setCellValue(data.getLiudongrkjsxjlDate().getYear() + 1900 + "年" + (data.getLiudongrkjsxjlDate().getMonth() + 1) + "月");
            cell.setCellStyle(style);

            cell = row6.createCell(9);
            cell.setCellValue(data.getHuiyuanNumber() == null ? 0 : data.getHuiyuanNumber());
            cell.setCellStyle(style);

            cell = row6.createCell(10);
            cell.setCellValue(data.getLiudongMaleNumber() == null ? 0 : data.getLiudongMaleNumber());
            cell.setCellStyle(style);

            cell = row6.createCell(11);
            cell.setCellValue(data.getLiudongFemaleNumber() == null ? 0 : data.getLiudongFemaleNumber());
            cell.setCellStyle(style);

            cell = row6.createCell(12);
            cell.setCellValue(data.getLiudongUnmarriedNumber() == null ? 0 : data.getLiudongUnmarriedNumber());
            cell.setCellStyle(style);

            cell = row6.createCell(13);
            cell.setCellValue(data.getLiudongMarriedNumber() == null ? 0 : data.getLiudongMarriedNumber());
            cell.setCellStyle(style);

            row0.setHeightInPoints(30);
            row1.setHeightInPoints(30);
            row2.setHeightInPoints(20);
            row3.setHeightInPoints(20);
            row4.setHeightInPoints(20);
            row5.setHeightInPoints(20);
            row6.setHeightInPoints(30);

            sheet.setColumnWidth(0, MSExcelUtil.pixel2WidthUnits(80));
            sheet.setColumnWidth(1, MSExcelUtil.pixel2WidthUnits(80));
            sheet.setColumnWidth(2, MSExcelUtil.pixel2WidthUnits(80));
            sheet.setColumnWidth(3, MSExcelUtil.pixel2WidthUnits(80));
            sheet.setColumnWidth(4, MSExcelUtil.pixel2WidthUnits(250));
            sheet.setColumnWidth(5, MSExcelUtil.pixel2WidthUnits(200));
            sheet.setColumnWidth(6, MSExcelUtil.pixel2WidthUnits(80));
            sheet.setColumnWidth(7, MSExcelUtil.pixel2WidthUnits(100));
            sheet.setColumnWidth(8, MSExcelUtil.pixel2WidthUnits(160));
            sheet.setColumnWidth(9, MSExcelUtil.pixel2WidthUnits(60));
            sheet.setColumnWidth(10, MSExcelUtil.pixel2WidthUnits(50));
            sheet.setColumnWidth(11, MSExcelUtil.pixel2WidthUnits(50));
            sheet.setColumnWidth(12, MSExcelUtil.pixel2WidthUnits(50));
            sheet.setColumnWidth(13, MSExcelUtil.pixel2WidthUnits(50));

            String filePath = staticResourceDir + uploadPath + FileType.PATH_EXCEL;

            String fileName = UUIDGenerator.getUUID() + ".xls";

            //这里是问题的关键，将这个工作簿写入到一个流中就可以输出相应的名字，这里需要写路径就ok了。
            FileOutputStream fileOut = new FileOutputStream(filePath + fileName);
            wb.write(fileOut);
            fileOut.close();

            excelNames.setFileName(fileName);
            excelNames.setRealName("流动人口计生协示范点信息统计表-" + data.getName() + ".xls");

        }catch (Exception ex){
            return null;
        }
        return excelNames;
    }

}
