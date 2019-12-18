package com.hznu.lwb.service.impl;

import com.hznu.lwb.model.ExcelNames;
import com.hznu.lwb.model.report.HuiyuanReport;
import com.hznu.lwb.model.result.ApiResult;
import com.hznu.lwb.model.vm.DataTablesParameters;
import com.hznu.lwb.persistence.HuiyuanReportDao;
import com.hznu.lwb.persistence.VolunteerReportDao;
import com.hznu.lwb.service.IHuiyuanReportService;
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
import java.io.File;
import java.io.FileOutputStream;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

@Service
public class HuiyuanReportService implements IHuiyuanReportService {

    Logger logger = LoggerFactory.getLogger(this.getClass());

    @Value("#{config['staticResourceDir']}")
    private String staticResourceDir;
    @Value("#{config['uploadPath']}")
    private String uploadPath;

    @Resource
    private HuiyuanReportDao huiyuanReportDao;

    @Resource
    private VolunteerReportDao volunteerReportDao;

    @Override
    public ApiResult getHuiyuanReport(String aoData, Integer year, Integer volunteerStatus) {
        ApiResult apiResult = new ApiResult();
        try {
            DataTablesParameters parameters = DataTablesParameters.fromJson(aoData);
            List<HuiyuanReport> lhr = new ArrayList<>();
            if (volunteerStatus == 0){
                Integer count = huiyuanReportDao.judgeFiled(year);
                if (count > 0){
                    lhr = huiyuanReportDao.getHuiyuanReportByTable(year);
                }else{
                    lhr = huiyuanReportDao.getHuiyuanReport(year);
                    HuiyuanReport huiyuanReport = huiyuanReportDao.getTotalCount(year);
                    lhr.add(huiyuanReport);
                }
            }else{
                Integer count = volunteerReportDao.judgeFiled(year);
                if (count > 0){
                    lhr = volunteerReportDao.getVolunteerReportByTable(year);
                }else{
                    lhr = volunteerReportDao.getVolunteerReport(year);
                    HuiyuanReport volunteerReport = volunteerReportDao.getTotalCount(year);
                    lhr.add(volunteerReport);
                }
            }

            apiResult.dataTable(parameters.getsEcho(),lhr.size(),lhr);
            apiResult.success();
        }catch(Exception e){
            logger.error(e.getMessage(),e);
            apiResult.fail("获取会员管理报表失败");
        }
        return apiResult;
    }

    @Override
    public ApiResult getYears() {
        ApiResult apiResult = new ApiResult();
        Calendar now = Calendar.getInstance();
        List<Integer> ly = new ArrayList<>();
        try {
            ly = huiyuanReportDao.getYears();
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
            List<HuiyuanReport> lhr = huiyuanReportDao.getHuiyuanReport(year);
            HuiyuanReport huiyuanReport = huiyuanReportDao.getTotalCount(year);
            lhr.add(huiyuanReport);
            for (int i = 0; i < lhr.size(); ++i){
                huiyuanReportDao.insertHuiyuanReport(lhr.get(i));
            }
            apiResult.success("归档成功");
        }catch (Exception e){
            logger.error(e.getMessage(),e);
            apiResult.fail("归档失败");
        }
        return apiResult;
    }

    @Override
    public ApiResult exportReport(String aoData, Integer year, Integer volunteerStatus) {
        ApiResult apiResult = new ApiResult();
        try {
            List<HuiyuanReport> data = (List<HuiyuanReport>)getHuiyuanReport(aoData, year, volunteerStatus).getData();
            ExcelNames excelNames = reportToExcel(data, year, volunteerStatus);
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

    public ExcelNames reportToExcel(List<HuiyuanReport> data, Integer year, Integer volunteerStatus) {
        ExcelNames excelNames = new ExcelNames();
        try {
            HSSFWorkbook wb = new HSSFWorkbook();
            HSSFSheet sheet;
            if (volunteerStatus == 0){
                sheet = wb.createSheet("会员管理分析表");
            }else{
                sheet = wb.createSheet("志愿者统计分析表");
            }

            HSSFCellStyle style = wb.createCellStyle(); // 样式对象

            style.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);// 垂直
            style.setAlignment(HSSFCellStyle.ALIGN_CENTER);// 水平
            HSSFRow row0 = sheet.createRow((short) 0);
            HSSFRow row1 = sheet.createRow((short) 1);
            HSSFRow row2 = sheet.createRow((short) 2);

            sheet.addMergedRegion(new CellRangeAddress(0, 0, (short) 0, (short) 10));
            HSSFCell ce = row0.createCell((short) 0);
            if (volunteerStatus == 0){
                ce.setCellValue("杭州市会员管理分析报表");
            }else{
                ce.setCellValue("杭州市志愿者统计分析报表");
            }

            ce.setCellStyle(style); // 样式，居中

            sheet.addMergedRegion(new CellRangeAddress(1, 2, (short) 0, (short) 0));
            ce = row1.createCell((short) 0);
            ce.setCellValue("机构名称");
            ce.setCellStyle(style);

            sheet.addMergedRegion(new CellRangeAddress(1, 2, (short) 1, (short) 1));
            ce = row1.createCell((short) 1);
            if (volunteerStatus == 0){
                ce.setCellValue("会员数量");
            }else{
                ce.setCellValue("志愿者数量");
            }
            ce.setCellStyle(style);

            sheet.addMergedRegion(new CellRangeAddress(1, 1, (short) 2, (short) 3));
            ce = row1.createCell((short) 2);
            ce.setCellValue("性别比例");
            ce.setCellStyle(style);

            ce = row2.createCell((short) 2);
            ce.setCellValue("男");
            ce.setCellStyle(style);

            ce = row2.createCell((short) 3);
            ce.setCellValue("女");
            ce.setCellStyle(style);

            sheet.addMergedRegion(new CellRangeAddress(1, 1, (short) 4, (short) 7));
            ce = row1.createCell((short) 4);
            ce.setCellValue("会员结构");
            ce.setCellStyle(style);

            ce = row2.createCell((short) 4);
            ce.setCellValue("个体会员");
            ce.setCellStyle(style);

            ce = row2.createCell((short) 5);
            ce.setCellValue("团体会员");
            ce.setCellStyle(style);

            ce = row2.createCell((short) 6);
            ce.setCellValue("流动人口");
            ce.setCellStyle(style);

            ce = row2.createCell((short) 7);
            ce.setCellValue("常住人口");
            ce.setCellStyle(style);

            sheet.addMergedRegion(new CellRangeAddress(1, 1, (short) 8, (short) 10));
            ce = row1.createCell((short) 8);
            ce.setCellValue("重点服务对象");
            ce.setCellStyle(style);

            ce = row2.createCell((short) 8);
            ce.setCellValue("失独人口");
            ce.setCellStyle(style);

            ce = row2.createCell((short) 9);
            ce.setCellValue("育龄人口");
            ce.setCellStyle(style);

            ce = row2.createCell((short) 10);
            ce.setCellValue("青少年");
            ce.setCellStyle(style);

            HSSFRow row;
            HSSFCell cell;
            for (int i = 0; i < data.size(); ++i){
                row = sheet.createRow((short) (3 + i));

                if (data.get(i).getScopeId() == 0){
                    cell = row.createCell(0);
                    cell.setCellValue("合计");
                    cell.setCellStyle(style);
                }else{
                    cell = row.createCell(0);
                    cell.setCellValue(data.get(i).getScopeName() + "计生协");
                    cell.setCellStyle(style);
                }

                cell = row.createCell(1);
                cell.setCellValue(data.get(i).getHuiyuanCount() == null ? 0 : data.get(i).getHuiyuanCount());
                cell.setCellStyle(style);

                cell = row.createCell(2);
                if (data.get(i).getHuiyuanCount() == null || data.get(i).getHuiyuanCount() == 0){
                    cell.setCellValue(0 + "%");
                }else{
                    cell.setCellValue(Integer.valueOf(data.get(i).getMale() * 100 / data.get(i).getHuiyuanCount()) + "%");
                }
                cell.setCellStyle(style);

                cell = row.createCell(3);
                if (data.get(i).getHuiyuanCount() == null || data.get(i).getHuiyuanCount() == 0){
                    cell.setCellValue(0 + "%");
                }else{
                    cell.setCellValue((100 - Integer.valueOf(data.get(i).getMale() * 100 / data.get(i).getHuiyuanCount())) + "%");
                }
                cell.setCellStyle(style);

                cell = row.createCell(4);
                cell.setCellValue(data.get(i).getGeti() == null ? 0 : data.get(i).getGeti());
                cell.setCellStyle(style);

                cell = row.createCell(5);
                cell.setCellValue(data.get(i).getTuanti() == null ? 0 : data.get(i).getTuanti());
                cell.setCellStyle(style);

                cell = row.createCell(6);
                cell.setCellValue(data.get(i).getLiudong() == null ? 0 : data.get(i).getLiudong());
                cell.setCellStyle(style);

                cell = row.createCell(7);
                cell.setCellValue(data.get(i).getChangzhu() == null ? 0 : data.get(i).getChangzhu());
                cell.setCellStyle(style);

                cell = row.createCell(8);
                cell.setCellValue(data.get(i).getShidu() == null ? 0 : data.get(i).getShidu());
                cell.setCellStyle(style);

                cell = row.createCell(9);
                cell.setCellValue(data.get(i).getYuling() == null ? 0 : data.get(i).getYuling());
                cell.setCellStyle(style);

                cell = row.createCell(10);
                cell.setCellValue(data.get(i).getQingshaonian() == null ? 0 : data.get(i).getQingshaonian());
                cell.setCellStyle(style);

            }

            row0.setHeightInPoints(30);
            row1.setHeightInPoints(30);
            row2.setHeightInPoints(30);

            for (int i = 0; i < data.size(); ++i){
                row = sheet.getRow(i + 3);
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
            if (volunteerStatus == 0){
                excelNames.setRealName("杭州市会员管理分析报表-" + year + ".xls");
            }else{
                excelNames.setRealName("杭州市志愿者统计分析报表-" + year + ".xls");
            }

        } catch (Exception ex) {
           return null;
        }
        return excelNames;
    }


}
