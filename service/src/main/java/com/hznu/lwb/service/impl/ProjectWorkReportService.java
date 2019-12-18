package com.hznu.lwb.service.impl;

import com.hznu.lwb.model.ExcelNames;
import com.hznu.lwb.model.report.ProjectWorkReport;
import com.hznu.lwb.model.result.ApiResult;
import com.hznu.lwb.model.vm.DataTablesParameters;
import com.hznu.lwb.persistence.ProjectWorkReportDao;
import com.hznu.lwb.service.IProjectWorkReportService;
import com.hznu.lwb.service.tool.MSExcelUtil;
import com.hznu.utils.UUIDGenerator;
import com.hznu.utils.constant.FileType;
import org.apache.poi.hssf.usermodel.*;
import org.apache.poi.hssf.util.Region;
import org.apache.poi.ss.util.CellRangeAddress;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.io.FileOutputStream;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

@Service
public class ProjectWorkReportService implements IProjectWorkReportService {

    Logger logger = LoggerFactory.getLogger(this.getClass());

    @Value("#{config['staticResourceDir']}")
    private String staticResourceDir;
    @Value("#{config['uploadPath']}")
    private String uploadPath;

    @Resource
    private ProjectWorkReportDao projectWorkReportDao;

    @Override
    public ApiResult getProjectWorkReport(String aoData, Integer year) {
        ApiResult apiResult = new ApiResult();
        try {
            if (year == null){
                year = new Date().getYear() + 1900;
            }
            DataTablesParameters parameters = DataTablesParameters.fromJson(aoData);
            Integer count = projectWorkReportDao.judgeFiled(year);
            List<ProjectWorkReport> lhr;
            if (count > 0){
                lhr = projectWorkReportDao.getProjectWorkReportByTable(year);
                ProjectWorkReport pwr = projectWorkReportDao.getProjectWorkReportTotalByTable(year);
                pwr.setScopeId(0);
                lhr.add(lhr.size(), pwr);
            }else{
                lhr = projectWorkReportDao.getProjectWorkReport(year);
                ProjectWorkReport pwr = projectWorkReportDao.getProjectWorkReportTotal(year);
                pwr.setScopeId(0);
                lhr.add(lhr.size(), pwr);
            }
            apiResult.dataTable(parameters.getsEcho(),lhr.size(),lhr);
            apiResult.success();
        }catch(Exception e){
            logger.error(e.getMessage(),e);
            apiResult.fail("获取项目工作报表失败");
        }
        return apiResult;
    }

    @Override
    public ApiResult getYears() {
        ApiResult apiResult = new ApiResult();
        Calendar now = Calendar.getInstance();
        List<Integer> ly = new ArrayList<>();
        try {
            ly = projectWorkReportDao.getYears();
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
            List<ProjectWorkReport> lhr = projectWorkReportDao.getProjectWorkReport(year);
            for (int i = 0; i < lhr.size(); ++i){
                projectWorkReportDao.insertProjectWorkReport(lhr.get(i));
            }
            apiResult.success("归档成功");
        }catch (Exception e){
            logger.error(e.getMessage(),e);
            apiResult.fail("归档失败");
        }
        return apiResult;
    }

    @Override
    public ApiResult exportReport(String aoData, Integer year) {
        ApiResult apiResult = new ApiResult();
        try {
            List<ProjectWorkReport> data = (List<ProjectWorkReport>)getProjectWorkReport(aoData, year).getData();
            ExcelNames excelNames = reportToExcel(data, year);
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

    public ExcelNames reportToExcel(List<ProjectWorkReport> data, Integer year){
        ExcelNames excelNames = new ExcelNames();
        try {
            HSSFWorkbook wb = new HSSFWorkbook();
            HSSFSheet sheet = wb.createSheet("项目工作分析表");
            HSSFCellStyle style = wb.createCellStyle(); // 样式对象

            style.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);// 垂直
            style.setAlignment(HSSFCellStyle.ALIGN_CENTER);// 水平
            HSSFRow row0 = sheet.createRow((short) 0);
            HSSFRow row1 = sheet.createRow((short) 1);
            HSSFRow row2 = sheet.createRow((short) 2);
            HSSFRow row3 = sheet.createRow((short) 3);

            sheet.addMergedRegion(new CellRangeAddress(0, 0, (short) 0, (short) 15));
            HSSFCell ce = row0.createCell((short) 0);
            ce.setCellValue("杭州市项目工作分析报表"); // 表格的第一行第一列显示的数据
            ce.setCellStyle(style); // 样式，居中

            sheet.addMergedRegion(new CellRangeAddress(1, 3, (short) 0, (short) 0));
            ce = row1.createCell((short) 0);
            ce.setCellValue("机构名称");
            ce.setCellStyle(style);

            sheet.addMergedRegion(new CellRangeAddress(1, 1, (short) 1, (short) 15));
            ce = row1.createCell((short) 1);
            ce.setCellValue("八大项目");
            ce.setCellStyle(style);

            sheet.addMergedRegion(new CellRangeAddress(2, 2, (short) 1, (short) 2));
            ce = row2.createCell((short) 1);
            ce.setCellValue("宣传教育");
            ce.setCellStyle(style);

            sheet.addMergedRegion(new CellRangeAddress(2, 2, (short) 3, (short) 4));
            ce = row2.createCell((short) 3);
            ce.setCellValue("业务培训");
            ce.setCellStyle(style);

            sheet.addMergedRegion(new CellRangeAddress(2, 2, (short) 5, (short) 6));
            ce = row2.createCell((short) 5);
            ce.setCellValue("健康服务");
            ce.setCellStyle(style);

            sheet.addMergedRegion(new CellRangeAddress(2, 2, (short) 7, (short) 8));
            ce = row2.createCell((short) 7);
            ce.setCellValue("计生家庭帮扶");
            ce.setCellStyle(style);

            sheet.addMergedRegion(new CellRangeAddress(2, 2, (short) 9, (short) 10));
            ce = row2.createCell((short) 9);
            ce.setCellValue("青春健康");
            ce.setCellStyle(style);

            sheet.addMergedRegion(new CellRangeAddress(2, 2, (short) 11, (short) 12));
            ce = row2.createCell((short) 11);
            ce.setCellValue("流动人口服务");
            ce.setCellStyle(style);

            ce = row2.createCell((short) 13);
            ce.setCellValue("权益维护");
            ce.setCellStyle(style);

            sheet.addMergedRegion(new CellRangeAddress(2, 2, (short) 14, (short) 15));
            ce = row2.createCell((short) 14);
            ce.setCellValue("其他");
            ce.setCellStyle(style);

            for (int i = 1; i < 14; ++i){
                if (i % 2 == 0){
                    ce = row3.createCell((short) i);
                    ce.setCellValue("服务人数");
                    ce.setCellStyle(style);
                }else{
                    ce = row3.createCell((short) i);
                    ce.setCellValue("活动次数");
                    ce.setCellStyle(style);
                }
            }

            ce = row3.createCell((short) 14);
            ce.setCellValue("活动次数");
            ce.setCellStyle(style);

            ce = row3.createCell((short) 15);
            ce.setCellValue("服务人数");
            ce.setCellStyle(style);

            HSSFRow row;
            HSSFCell cell;
            for (int i = 0; i < data.size(); ++i){
                row = sheet.createRow((short) (4 + i));

                cell = row.createCell(0);
                if (data.get(i).getScopeId() == 0){
                    cell.setCellValue("合计");
                }else{
                    cell.setCellValue(data.get(i).getScopeName() + "计生协");
                }
                cell.setCellStyle(style);

                cell = row.createCell(1);
                cell.setCellValue(data.get(i).getXuanchuanjyhdcs() == null ? 0 : data.get(i).getXuanchuanjyhdcs());
                cell.setCellStyle(style);

                cell = row.createCell(2);
                cell.setCellValue(data.get(i).getXuanchuanjyfwrs() == null ? 0 : data.get(i).getXuanchuanjyfwrs());
                cell.setCellStyle(style);

                cell = row.createCell(3);
                cell.setCellValue(data.get(i).getYewupxhdcs() == null ? 0 : data.get(i).getYewupxhdcs());
                cell.setCellStyle(style);

                cell = row.createCell(4);
                cell.setCellValue(data.get(i).getYewupxfwrs() == null ? 0 : data.get(i).getYewupxfwrs());
                cell.setCellStyle(style);

                cell = row.createCell(5);
                cell.setCellValue(data.get(i).getJiankangfwhdcs() == null ? 0 : data.get(i).getJiankangfwhdcs());
                cell.setCellStyle(style);

                cell = row.createCell(6);
                cell.setCellValue(data.get(i).getJiankangfwfwrs() == null ? 0 : data.get(i).getJiankangfwfwrs());
                cell.setCellStyle(style);

                cell = row.createCell(7);
                cell.setCellValue(data.get(i).getJishengjtbfhdcs() == null ? 0 : data.get(i).getJishengjtbfhdcs());
                cell.setCellStyle(style);

                cell = row.createCell(8);
                cell.setCellValue(data.get(i).getJishengjtbffwrs() == null ? 0 : data.get(i).getJishengjtbffwrs());
                cell.setCellStyle(style);

                cell = row.createCell(9);
                cell.setCellValue(data.get(i).getQingchunjkhdcs() == null ? 0 : data.get(i).getQingchunjkhdcs());
                cell.setCellStyle(style);

                cell = row.createCell(10);
                cell.setCellValue(data.get(i).getQingchunjkfwrs() == null ? 0 : data.get(i).getQingchunjkfwrs());
                cell.setCellStyle(style);

                cell = row.createCell(11);
                cell.setCellValue(data.get(i).getLiudongrkfwhdcs() == null ? 0 : data.get(i).getLiudongrkfwhdcs());
                cell.setCellStyle(style);

                cell = row.createCell(12);
                cell.setCellValue(data.get(i).getLiudongrkfwfwrs() == null ? 0 : data.get(i).getLiudongrkfwfwrs());
                cell.setCellStyle(style);

                cell = row.createCell(13);
                cell.setCellValue(data.get(i).getQuanyiwhhdcs() == null ? 0 : data.get(i).getQuanyiwhhdcs());
                cell.setCellStyle(style);

                cell = row.createCell(14);
                cell.setCellValue(data.get(i).getQitahdcs() == null ? 0 : data.get(i).getQitahdcs());
                cell.setCellStyle(style);

                cell = row.createCell(15);
                cell.setCellValue(data.get(i).getQitafwrs() == null ? 0 : data.get(i).getQitafwrs());
                cell.setCellStyle(style);
            }

            row0.setHeightInPoints(30);
            row1.setHeightInPoints(30);
            row2.setHeightInPoints(30);
            row3.setHeightInPoints(30);

            for (int i = 0; i < data.size(); ++i){
                row = sheet.getRow(i + 4);
                row.setHeightInPoints(20);
            }

            sheet.setColumnWidth(0, MSExcelUtil.pixel2WidthUnits(100));

            String filePath = staticResourceDir + uploadPath + FileType.PATH_EXCEL;

            String fileName = UUIDGenerator.getUUID() + ".xls";

            //这里是问题的关键，将这个工作簿写入到一个流中就可以输出相应的名字，这里需要写路径就ok了。
            FileOutputStream fileOut = new FileOutputStream(filePath + fileName);
            wb.write(fileOut);
            fileOut.close();

            excelNames.setFileName(fileName);
            excelNames.setRealName("杭州市项目工作分析报表-" + year + ".xls");

        }catch (Exception ex) {
            return null;
        }
        return excelNames;
    }
}
