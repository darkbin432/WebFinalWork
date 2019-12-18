package com.hznu.lwb.service.impl;

import com.hznu.lwb.model.ExcelNames;
import com.hznu.lwb.model.Organization;
import com.hznu.lwb.model.param.OrganizationConstructionReportParam;
import com.hznu.lwb.model.report.OrganizationConstructionReport;
import com.hznu.lwb.model.report.WarmHeartReport;
import com.hznu.lwb.model.result.ApiResult;
import com.hznu.lwb.model.vm.DataTablesParameters;
import com.hznu.lwb.persistence.OrganizationConstructionReportDao;
import com.hznu.lwb.service.IOrganizationConstructionReportService;
import com.hznu.lwb.service.tool.MSExcelUtil;
import com.hznu.utils.UUIDGenerator;
import com.hznu.utils.constant.FileType;
import com.sun.org.apache.xpath.internal.operations.Or;
import org.apache.poi.hssf.usermodel.*;
import org.apache.poi.ss.util.CellRangeAddress;
import org.omg.CORBA.TRANSACTION_MODE;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import javax.swing.table.TableRowSorter;
import java.io.FileOutputStream;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

/**
 * @author 斌
 */
@Service
public class OrganizationConstructionReportService implements IOrganizationConstructionReportService {

    Logger logger = LoggerFactory.getLogger(this.getClass());

    @Value("#{config['staticResourceDir']}")
    private String staticResourceDir;
    @Value("#{config['uploadPath']}")
    private String uploadPath;

    @Resource
    OrganizationConstructionReportDao organizationConstructionReportDao;

    @Override
    public ApiResult insert(OrganizationConstructionReport record) {
        ApiResult apiResult = new ApiResult();
        try {
            Calendar now = Calendar.getInstance();
            Integer cnt = 0;
            cnt = organizationConstructionReportDao.judgeFiled(now.get(Calendar.YEAR));
            if (cnt > 0){
                apiResult.fail("本年度已归档");
                return apiResult;
            }
            organizationConstructionReportDao.insert(record);
            apiResult.success(String.valueOf(record.getId()));
        }catch (Exception e){
            apiResult.fail("新增报表失败");
        }
        return apiResult;
    }

    @Override
    public ApiResult update(OrganizationConstructionReport record) {
        ApiResult apiResult = new ApiResult();
        try {
            Calendar now = Calendar.getInstance();
            Integer cnt = 0;
            cnt = organizationConstructionReportDao.judgeFiled(now.get(Calendar.YEAR));
            if (cnt > 0){
                apiResult.fail("本年度已归档");
                return apiResult;
            }
            organizationConstructionReportDao.updateByPrimaryKeySelective(record);
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
            List<Integer> ly = organizationConstructionReportDao.getYears();
            apiResult.success(ly);
        }catch (Exception e){
            apiResult.fail("获取历史年度失败");
        }
        return apiResult;
    }

    @Override
    public ApiResult selectChildrenStatus(String aoData, OrganizationConstructionReportParam param) {
        ApiResult apiResult = new ApiResult();
        try {
            DataTablesParameters parameters = DataTablesParameters.fromJson(aoData);
            param.setSize(parameters.getRows());
            param.setOffset(parameters.getStart());

            Integer totalCount = organizationConstructionReportDao.selectChildrenStatusPageCount(param);
            List<OrganizationConstructionReport> locr = organizationConstructionReportDao.selectChildrenStatus(param);

            apiResult.dataTable(parameters.getsEcho(),totalCount,locr);
            apiResult.success();
        }catch (Exception e){
            apiResult.fail("获取下级上报状态失败");
        }
        return apiResult;
    }

    @Override
    public ApiResult getOrganizationConstructionReport(OrganizationConstructionReportParam param) {
        ApiResult apiResult = new ApiResult();
        try {
            List<OrganizationConstructionReport> locr = new ArrayList<>();
            if (param.getScopeId() == null && param.getYear() != null){
                OrganizationConstructionReport shequji = organizationConstructionReportDao.getShequji(param.getYear());
                OrganizationConstructionReport jiedaoji = organizationConstructionReportDao.getJiedaoji(param.getYear());
                OrganizationConstructionReport quji = organizationConstructionReportDao.getQuji(param.getYear());
                OrganizationConstructionReport shiji = organizationConstructionReportDao.getShiji(param.getYear());
                locr.add(0,shequji);
                locr.add(1,jiedaoji);
                locr.add(2,quji);
                locr.add(3,shiji);
                apiResult.success(locr);
            }else if (param.getYear() == null && param.getScopeId() != null){
                DataTablesParameters parameters = DataTablesParameters.fromJson(param.getAoData());
                if (param.getScopeId() > 0){
                    locr = organizationConstructionReportDao.getLici(param.getScopeId());
                    apiResult.dataTable(parameters.getsEcho(),locr.size(),locr);
                }else{
                    apiResult.dataTable(parameters.getsEcho(),0,null);
                }
            }else{
                OrganizationConstructionReport one = organizationConstructionReportDao.getOne(param);
                locr.add(0,one);
                apiResult.success(locr);
            }
        }catch (Exception e){
            logger.error(e.getMessage(),e);
            apiResult.fail("获取组织建设报表失败");
        }
        return apiResult;
    }

    @Override
    public ApiResult toFile(Integer year) {
        ApiResult apiResult = new ApiResult();
        try {
            organizationConstructionReportDao.toFile(year);
            apiResult.success();
        }catch (Exception e){
            apiResult.fail("归档失败");
        }
        return apiResult;
    }

    @Override
    public ApiResult exportReport(OrganizationConstructionReportParam param) {
        ApiResult apiResult = new ApiResult();
        try {
            List<OrganizationConstructionReport> data = (List<OrganizationConstructionReport>)getOrganizationConstructionReport(param).getData();
            ExcelNames excelNames = reportToExcel(data, param.getYear());
            if (excelNames != null){
                apiResult.success(excelNames);
            }else{
                apiResult.fail("绘制Excel出错");
            }
        }catch (Exception e){
            logger.error(e.getMessage(),e);
            apiResult.fail("获取Excel失败");
        }
        return apiResult;
    }

    public ExcelNames reportToExcel(List<OrganizationConstructionReport> data, Integer year) {
        ExcelNames excelNames = new ExcelNames();
        try {
            HSSFWorkbook wb = new HSSFWorkbook();
            HSSFSheet sheet = wb.createSheet("杭州市组织建设报表");

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

            sheet.addMergedRegion(new CellRangeAddress(0, 0, (short) 0, (short) 41));
            HSSFCell ce = row0.createCell((short) 0);
            ce.setCellValue("杭州市组织建设报表");
            ce.setCellStyle(style); // 样式，居中

            sheet.addMergedRegion(new CellRangeAddress(1, 5, (short) 0, (short) 0));
            ce = row1.createCell((short) 0);
            ce.setCellValue("单\r\n位");
            ce.setCellStyle(style); // 样式，居中

            sheet.addMergedRegion(new CellRangeAddress(1, 5, (short) 1, (short) 1));
            ce = row1.createCell((short) 1);
            ce.setCellValue("汇\r\n总\r\n性\r\n质");
            ce.setCellStyle(style); // 样式，居中

            sheet.addMergedRegion(new CellRangeAddress(1, 1, (short) 2, (short) 5));
            ce = row1.createCell((short) 2);
            ce.setCellValue("");
            ce.setCellStyle(style); // 样式，居中

            sheet.addMergedRegion(new CellRangeAddress(2, 5, (short) 2, (short) 2));
            ce = row2.createCell((short) 2);
            ce.setCellValue("行\r\n政\r\n区\r\n数\r\n量");
            ce.setCellStyle(style); // 样式，居中

            sheet.addMergedRegion(new CellRangeAddress(2, 5, (short) 3, (short) 3));
            ce = row2.createCell((short) 3);
            ce.setCellValue("机\r\n构\r\n数\r\n量");
            ce.setCellStyle(style); // 样式，居中

            sheet.addMergedRegion(new CellRangeAddress(2, 5, (short) 4, (short) 4));
            ce = row2.createCell((short) 4);
            ce.setCellValue("党\r\n组\r\n数\r\n量");
            ce.setCellStyle(style); // 样式，居中

            sheet.addMergedRegion(new CellRangeAddress(2, 5, (short) 5, (short) 5));
            ce = row2.createCell((short) 5);
            ce.setCellValue("党\r\n支\r\n部\r\n数\r\n量");
            ce.setCellStyle(style); // 样式，居中

            sheet.addMergedRegion(new CellRangeAddress(1, 1, (short) 6, (short) 10));
            ce = row1.createCell((short) 6);
            ce.setCellValue("机构建设");
            ce.setCellStyle(style); // 样式，居中

            sheet.addMergedRegion(new CellRangeAddress(2, 5, (short) 6, (short) 6));
            ce = row2.createCell((short) 6);
            ce.setCellValue("入\r\n序");
            ce.setCellStyle(style); // 样式，居中

            sheet.addMergedRegion(new CellRangeAddress(2, 5, (short) 7, (short) 7));
            ce = row2.createCell((short) 7);
            ce.setCellValue("参\r\n公");
            ce.setCellStyle(style); // 样式，居中

            sheet.addMergedRegion(new CellRangeAddress(2, 5, (short) 8, (short) 8));
            ce = row2.createCell((short) 8);
            ce.setCellValue("三\r\n定");
            ce.setCellStyle(style); // 样式，居中

            sheet.addMergedRegion(new CellRangeAddress(2, 5, (short) 9, (short) 9));
            ce = row2.createCell((short) 9);
            ce.setCellValue("内\r\n设\r\n机\r\n构\r\n数\r\n量");
            ce.setCellStyle(style); // 样式，居中

            sheet.addMergedRegion(new CellRangeAddress(2, 5, (short) 10, (short) 10));
            ce = row2.createCell((short) 10);
            ce.setCellValue("数\r\n量");
            ce.setCellStyle(style); // 样式，居中

            sheet.addMergedRegion(new CellRangeAddress(1, 1, (short) 11, (short) 13));
            ce = row1.createCell((short) 11);
            ce.setCellValue("编制");
            ce.setCellStyle(style); // 样式，居中

            sheet.addMergedRegion(new CellRangeAddress(2, 2, (short) 11, (short) 13));
            ce = row2.createCell((short) 11);
            ce.setCellValue("类别");
            ce.setCellStyle(style); // 样式，居中

            sheet.addMergedRegion(new CellRangeAddress(3, 5, (short) 11, (short) 11));
            ce = row3.createCell((short) 11);
            ce.setCellValue("行\r\n政\r\n编\r\n制");
            ce.setCellStyle(style); // 样式，居中

            sheet.addMergedRegion(new CellRangeAddress(3, 5, (short) 12, (short) 12));
            ce = row3.createCell((short) 12);
            ce.setCellValue("事\r\n业\r\n编\r\n制");
            ce.setCellStyle(style); // 样式，居中

            sheet.addMergedRegion(new CellRangeAddress(3, 5, (short) 13, (short) 13));
            ce = row3.createCell((short) 13);
            ce.setCellValue("其\r\n他\r\n编\r\n制");
            ce.setCellStyle(style); // 样式，居中

            sheet.addMergedRegion(new CellRangeAddress(1, 1, (short) 14, (short) 24));
            ce = row1.createCell((short) 14);
            ce.setCellValue("实际工作人员");
            ce.setCellStyle(style); // 样式，居中

            sheet.addMergedRegion(new CellRangeAddress(2, 2, (short) 14, (short) 23));
            ce = row2.createCell((short) 14);
            ce.setCellValue("在编人数");
            ce.setCellStyle(style); // 样式，居中

            sheet.addMergedRegion(new CellRangeAddress(3, 3, (short) 14, (short) 16));
            ce = row3.createCell((short) 14);
            ce.setCellValue("");
            ce.setCellStyle(style); // 样式，居中

            sheet.addMergedRegion(new CellRangeAddress(4, 5, (short) 14, (short) 14));
            ce = row4.createCell((short) 14);
            ce.setCellValue("人\r\n数");
            ce.setCellStyle(style); // 样式，居中

            sheet.addMergedRegion(new CellRangeAddress(4, 5, (short) 15, (short) 15));
            ce = row4.createCell((short) 15);
            ce.setCellValue("女\r\n性\r\n数\r\n量");
            ce.setCellStyle(style); // 样式，居中

            sheet.addMergedRegion(new CellRangeAddress(4, 5, (short) 16, (short) 16));
            ce = row4.createCell((short) 16);
            ce.setCellValue("党\r\n员\r\n数\r\n量");
            ce.setCellStyle(style); // 样式，居中

            sheet.addMergedRegion(new CellRangeAddress(3, 3, (short) 17, (short) 23));
            ce = row3.createCell((short) 17);
            ce.setCellValue("级别");
            ce.setCellStyle(style); // 样式，居中

            sheet.addMergedRegion(new CellRangeAddress(4, 4, (short) 17, (short) 18));
            ce = row4.createCell((short) 17);
            ce.setCellValue("厅局级");
            ce.setCellStyle(style); // 样式，居中

            ce = row5.createCell((short) 17);
            ce.setCellValue("正厅");
            ce.setCellStyle(style); // 样式，居中

            ce = row5.createCell((short) 18);
            ce.setCellValue("副厅");
            ce.setCellStyle(style); // 样式，居中

            sheet.addMergedRegion(new CellRangeAddress(4, 4, (short) 19, (short) 20));
            ce = row4.createCell((short) 19);
            ce.setCellValue("处级");
            ce.setCellStyle(style); // 样式，居中

            ce = row5.createCell((short) 19);
            ce.setCellValue("正处");
            ce.setCellStyle(style); // 样式，居中

            ce = row5.createCell((short) 20);
            ce.setCellValue("副处");
            ce.setCellStyle(style); // 样式，居中

            sheet.addMergedRegion(new CellRangeAddress(4, 4, (short) 21, (short) 22));
            ce = row4.createCell((short) 21);
            ce.setCellValue("科级");
            ce.setCellStyle(style); // 样式，居中

            ce = row5.createCell((short) 21);
            ce.setCellValue("正科");
            ce.setCellStyle(style); // 样式，居中

            ce = row5.createCell((short) 22);
            ce.setCellValue("副科");
            ce.setCellStyle(style); // 样式，居中

            sheet.addMergedRegion(new CellRangeAddress(4, 5, (short) 23, (short) 23));
            ce = row4.createCell((short) 23);
            ce.setCellValue("科\r\n员\r\n及\r\n以\r\n下");
            ce.setCellStyle(style); // 样式，居中

            sheet.addMergedRegion(new CellRangeAddress(2, 5, (short) 24, (short) 24));
            ce = row2.createCell((short) 24);
            ce.setCellValue("兼\r\n职\r\n聘\r\n用\r\n等\r\n其\r\n他\r\n人\r\n员\r\n数");
            ce.setCellStyle(style); // 样式，居中

            sheet.addMergedRegion(new CellRangeAddress(1, 1, (short) 25, (short) 26));
            ce = row1.createCell((short) 25);
            ce.setCellValue("理事");
            ce.setCellStyle(style); // 样式，居中

            sheet.addMergedRegion(new CellRangeAddress(2, 2, (short) 25, (short) 26));
            ce = row2.createCell((short) 25);
            ce.setCellValue("");
            ce.setCellStyle(style); // 样式，居中

            sheet.addMergedRegion(new CellRangeAddress(3, 5, (short) 25, (short) 25));
            ce = row3.createCell((short) 25);
            ce.setCellValue("人\r\n数");
            ce.setCellStyle(style); // 样式，居中

            sheet.addMergedRegion(new CellRangeAddress(3, 5, (short) 26, (short) 26));
            ce = row3.createCell((short) 26);
            ce.setCellValue("其\r\n中\r\n女\r\n性");
            ce.setCellStyle(style); // 样式，居中

            sheet.addMergedRegion(new CellRangeAddress(1, 1, (short) 27, (short) 29));
            ce = row1.createCell((short) 27);
            ce.setCellValue("会员");
            ce.setCellStyle(style); // 样式，居中

            sheet.addMergedRegion(new CellRangeAddress(2, 5, (short) 27, (short) 27));
            ce = row2.createCell((short) 27);
            ce.setCellValue("团\r\n体\r\n会\r\n员");
            ce.setCellStyle(style); // 样式，居中

            sheet.addMergedRegion(new CellRangeAddress(2, 2, (short) 28, (short) 29));
            ce = row2.createCell((short) 28);
            ce.setCellValue("");
            ce.setCellStyle(style); // 样式，居中

            sheet.addMergedRegion(new CellRangeAddress(3, 5, (short) 28, (short) 28));
            ce = row3.createCell((short) 28);
            ce.setCellValue("个\r\n人\r\n会\r\n员");
            ce.setCellStyle(style); // 样式，居中

            sheet.addMergedRegion(new CellRangeAddress(3, 5, (short) 29, (short) 29));
            ce = row3.createCell((short) 29);
            ce.setCellValue("其\r\n中\r\n女\r\n性");
            ce.setCellStyle(style); // 样式，居中

            sheet.addMergedRegion(new CellRangeAddress(1, 1, (short) 30, (short) 31));
            ce = row1.createCell((short) 30);
            ce.setCellValue("志愿者");
            ce.setCellStyle(style); // 样式，居中

            sheet.addMergedRegion(new CellRangeAddress(2, 5, (short) 30, (short) 30));
            ce = row2.createCell((short) 30);
            ce.setCellValue("人\r\n数");
            ce.setCellStyle(style); // 样式，居中

            sheet.addMergedRegion(new CellRangeAddress(2, 5, (short) 31, (short) 31));
            ce = row2.createCell((short) 31);
            ce.setCellValue("队\r\n伍\r\n数");
            ce.setCellStyle(style); // 样式，居中

            sheet.addMergedRegion(new CellRangeAddress(1, 1, (short) 32, (short) 35));
            ce = row1.createCell((short) 32);
            ce.setCellValue("活动阵地、社团");
            ce.setCellStyle(style); // 样式，居中

            sheet.addMergedRegion(new CellRangeAddress(2, 5, (short) 32, (short) 32));
            ce = row2.createCell((short) 32);
            ce.setCellValue("会\r\n员\r\n小\r\n组");
            ce.setCellStyle(style); // 样式，居中

            sheet.addMergedRegion(new CellRangeAddress(2, 5, (short) 33, (short) 33));
            ce = row2.createCell((short) 33);
            ce.setCellValue("会\r\n员\r\n之\r\n家");
            ce.setCellStyle(style); // 样式，居中

            sheet.addMergedRegion(new CellRangeAddress(2, 5, (short) 34, (short) 34));
            ce = row2.createCell((short) 34);
            ce.setCellValue("文\r\n化\r\n社\r\n区");
            ce.setCellStyle(style); // 样式，居中

            sheet.addMergedRegion(new CellRangeAddress(2, 5, (short) 35, (short) 35));
            ce = row2.createCell((short) 35);
            ce.setCellValue("其\r\n他");
            ce.setCellStyle(style); // 样式，居中

            sheet.addMergedRegion(new CellRangeAddress(1, 1, (short) 36, (short) 38));
            ce = row1.createCell((short) 36);
            ce.setCellValue("资金保障");
            ce.setCellStyle(style); // 样式，居中

            sheet.addMergedRegion(new CellRangeAddress(2, 5, (short) 36, (short) 36));
            ce = row2.createCell((short) 36);
            ce.setCellValue("独\r\n立\r\n财\r\n务\r\n预\r\n算\r\n机\r\n构");
            ce.setCellStyle(style); // 样式，居中

            sheet.addMergedRegion(new CellRangeAddress(2, 5, (short) 37, (short) 37));
            ce = row2.createCell((short) 37);
            ce.setCellValue(year + "\r\n年\r\n财\r\n政\r\n拨\r\n款\r\n(万元)");
            ce.setCellStyle(style); // 样式，居中

            sheet.addMergedRegion(new CellRangeAddress(2, 5, (short) 38, (short) 38));
            ce = row2.createCell((short) 38);
            ce.setCellValue("基\r\n金\r\n会");
            ce.setCellStyle(style); // 样式，居中

            sheet.addMergedRegion(new CellRangeAddress(1, 5, (short) 39, (short) 39));
            ce = row1.createCell((short) 39);
            ce.setCellValue("机\r\n关\r\n企\r\n事\r\n业\r\n计\r\n生\r\n协");
            ce.setCellStyle(style); // 样式，居中

            sheet.addMergedRegion(new CellRangeAddress(1, 5, (short) 40, (short) 40));
            ce = row1.createCell((short) 40);
            ce.setCellValue("流\r\n动\r\n人\r\n口\r\n计\r\n生\r\n协");
            ce.setCellStyle(style); // 样式，居中

            sheet.addMergedRegion(new CellRangeAddress(1, 5, (short) 41, (short) 41));
            ce = row1.createCell((short) 41);
            ce.setCellValue("备\r\n注");
            ce.setCellStyle(style); // 样式，居中

            HSSFRow row;
            HSSFCell cell;

            row = sheet.createRow((short) 6);

            cell = row.createCell((short) 0);
            cell.setCellValue("省\r\n(自\r\n治\r\n区、\r\n直\r\n辖\r\n市)\r\n计\r\n生\r\n协");
            cell.setCellStyle(style);

            cell = row.createCell((short) 1);
            cell.setCellValue("本\r\n级");
            cell.setCellStyle(style);

            for (int i = 2; i < 42; ++i){
                cell = row.createCell((short) (i));
                cell.setCellValue("");
                cell.setCellStyle(style);
            }

            Integer[] sum = new Integer[43];
            double sumbke = 0.0;

            for (int i = 0; i < 43; ++i){
                sum[i] = 0;
            }

            for (int i = data.size() - 1; i >= 0; --i){
                row = sheet.createRow((short) (data.size() - i - 1 + 7));

                if (i == 0){
                    cell = row.createCell((short) 0);
                    cell.setCellValue("\r\n市\r\n(地)\r\n计\r\n生\r\n协");
                    cell.setCellStyle(style);
                }else if (i == 1){
                    cell = row.createCell((short) 0);
                    cell.setCellValue("区\r\n县\r\n计\r\n生\r\n协");
                    cell.setCellStyle(style);
                }else if (i == 2){
                    cell = row.createCell((short) 0);
                    cell.setCellValue("乡\r\n(镇\r\n、街\r\n道)\r\n计\r\n生\r\n协");
                    cell.setCellStyle(style);
                }else if (i == 3){
                    cell = row.createCell((short) 0);
                    cell.setCellValue("村\r\n(居)\r\n计\r\n生\r\n协");
                    cell.setCellStyle(style);
                }

                cell = row.createCell((short) 1);
                cell.setCellValue("汇\r\n总");
                cell.setCellStyle(style);

                cell = row.createCell((short) 2);
                cell.setCellValue(data.get(i).getXingzhengqsl() == null ? " " : "" + data.get(i).getXingzhengqsl());
                cell.setCellStyle(style);
                sum[2] += (data.get(i).getXingzhengqsl() == null ? 0 : data.get(i).getXingzhengqsl());

                cell = row.createCell((short) 3);
                cell.setCellValue(data.get(i).getJigousl() == null ? " " : "" + data.get(i).getJigousl());
                cell.setCellStyle(style);
                sum[3] += (data.get(i).getJigousl() == null ? 0 : data.get(i).getJigousl());

                cell = row.createCell((short) 4);
                cell.setCellValue(data.get(i).getDangzusl() == null ? " " : "" + data.get(i).getDangzusl());
                cell.setCellStyle(style);
                sum[4] += (data.get(i).getDangzusl() == null ? 0 : data.get(i).getDangzusl());

                cell = row.createCell((short) 5);
                cell.setCellValue(data.get(i).getDangzhibsl() == null ? " " : "" + data.get(i).getDangzhibsl());
                cell.setCellStyle(style);
                sum[5] += (data.get(i).getDangzhibsl() == null ? 0 : data.get(i).getDangzhibsl());

                cell = row.createCell((short) 6);
                cell.setCellValue(data.get(i).getRuxu() == null ? " " : "" + data.get(i).getRuxu());
                cell.setCellStyle(style);
                sum[6] += (data.get(i).getRuxu() == null ? 0 : data.get(i).getRuxu());

                cell = row.createCell((short) 7);
                cell.setCellValue(data.get(i).getCangong() == null ? " " : "" + data.get(i).getCangong());
                cell.setCellStyle(style);
                sum[7] += (data.get(i).getCangong() == null ? 0 : data.get(i).getCangong());

                cell = row.createCell((short) 8);
                cell.setCellValue(data.get(i).getSanding() == null ? " " : "" + data.get(i).getSanding());
                cell.setCellStyle(style);
                sum[8] += (data.get(i).getSanding() == null ? 0 : data.get(i).getSanding());
                //
                cell = row.createCell((short) 9);
                cell.setCellValue(data.get(i).getNeishejgsl() == null ? " " : "" + data.get(i).getNeishejgsl());
                cell.setCellStyle(style);
                sum[9] += (data.get(i).getNeishejgsl() == null ? 0 : data.get(i).getNeishejgsl());

                cell = row.createCell((short) 10);
                cell.setCellValue(data.get(i).getJigoujssl() == null ? " " : "" + data.get(i).getJigoujssl());
                cell.setCellStyle(style);
                sum[10] += (data.get(i).getJigoujssl() == null ? 0 : data.get(i).getJigoujssl());

                cell = row.createCell((short) 11);
                cell.setCellValue(data.get(i).getXingzhengbz() == null ? " " : "" + data.get(i).getXingzhengbz());
                cell.setCellStyle(style);
                sum[11] += (data.get(i).getXingzhengbz() == null ? 0 : data.get(i).getXingzhengbz());

                cell = row.createCell((short) 12);
                cell.setCellValue(data.get(i).getShiyebz() == null ? " " : "" + data.get(i).getShiyebz());
                cell.setCellStyle(style);
                sum[12] += (data.get(i).getShiyebz() == null ? 0 : data.get(i).getShiyebz());

                cell = row.createCell((short) 13);
                cell.setCellValue(data.get(i).getQitabz() == null ? " " : "" + data.get(i).getQitabz());
                cell.setCellStyle(style);
                sum[13] += (data.get(i).getQitabz() == null ? 0 : data.get(i).getQitabz());

                cell = row.createCell((short) 14);
                cell.setCellValue(data.get(i).getZaibianryrs() == null ? " " : "" + data.get(i).getZaibianryrs());
                cell.setCellStyle(style);
                sum[14] += (data.get(i).getZaibianryrs() == null ? 0 : data.get(i).getZaibianryrs());

                cell = row.createCell((short) 15);
                cell.setCellValue(data.get(i).getZaibianrynxsl() == null ? " " : "" + data.get(i).getZaibianrynxsl());
                cell.setCellStyle(style);
                sum[15] += (data.get(i).getZaibianrynxsl() == null ? 0 : data.get(i).getZaibianrynxsl());

                cell = row.createCell((short) 16);
                cell.setCellValue(data.get(i).getZaibianrydysl() == null ? " " : "" + data.get(i).getZaibianrydysl());
                cell.setCellStyle(style);
                sum[16] += (data.get(i).getZaibianrydysl() == null ? 0 : data.get(i).getZaibianrydysl());

                cell = row.createCell((short) 17);
                cell.setCellValue(data.get(i).getZhengting() == null ? " " : "" + data.get(i).getZhengting());
                cell.setCellStyle(style);
                sum[17] += (data.get(i).getZhengting() == null ? 0 : data.get(i).getZhengting());

                cell = row.createCell((short) 18);
                cell.setCellValue(data.get(i).getFuting() == null ? " " : "" + data.get(i).getFuting());
                cell.setCellStyle(style);
                sum[18] += (data.get(i).getFuting() == null ? 0 : data.get(i).getFuting());

                cell = row.createCell((short) 19);
                cell.setCellValue(data.get(i).getZhengchu() == null ? " " : "" + data.get(i).getZhengchu());
                cell.setCellStyle(style);
                sum[19] += (data.get(i).getZhengchu() == null ? 0 : data.get(i).getZhengchu());

                cell = row.createCell((short) 20);
                cell.setCellValue(data.get(i).getFuchu() == null ? " " : "" + data.get(i).getFuchu());
                cell.setCellStyle(style);
                sum[20] += (data.get(i).getFuchu() == null ? 0 : data.get(i).getFuchu());

                cell = row.createCell((short) 21);
                cell.setCellValue(data.get(i).getZhengke() == null ? " " : "" + data.get(i).getZhengke());
                cell.setCellStyle(style);
                sum[21] += (data.get(i).getZhengke() == null ? 0 : data.get(i).getZhengke());

                cell = row.createCell((short) 22);
                cell.setCellValue(data.get(i).getFuke() == null ? " " : "" + data.get(i).getFuke());
                cell.setCellStyle(style);
                sum[22] += (data.get(i).getFuke() == null ? 0 : data.get(i).getFuke());

                cell = row.createCell((short) 23);
                cell.setCellValue(data.get(i).getKeyuanjyx() == null ? " " : "" + data.get(i).getKeyuanjyx());
                cell.setCellStyle(style);
                sum[23] += (data.get(i).getKeyuanjyx() == null ? 0 : data.get(i).getKeyuanjyx());

                cell = row.createCell((short) 24);
                cell.setCellValue(data.get(i).getJianzhipydqtrys() == null ? " " : "" + data.get(i).getJianzhipydqtrys());
                cell.setCellStyle(style);
                sum[24] += (data.get(i).getJianzhipydqtrys() == null ? 0 : data.get(i).getJianzhipydqtrys());

                cell = row.createCell((short) 25);
                cell.setCellValue(data.get(i).getLishirs() == null ? " " : "" + data.get(i).getLishirs());
                cell.setCellStyle(style);
                sum[25] += (data.get(i).getLishirs() == null ? 0 : data.get(i).getLishirs());

                cell = row.createCell((short) 26);
                cell.setCellValue(data.get(i).getLishinx() == null ? " " : "" + data.get(i).getLishinx());
                cell.setCellStyle(style);
                sum[26] += (data.get(i).getLishinx() == null ? 0 : data.get(i).getLishinx());

                cell = row.createCell((short) 27);
                cell.setCellValue(data.get(i).getTuantihy() == null ? " " : "" + data.get(i).getTuantihy());
                cell.setCellStyle(style);
                sum[27] += (data.get(i).getTuantihy() == null ? 0 : data.get(i).getTuantihy());

                cell = row.createCell((short) 28);
                cell.setCellValue(data.get(i).getGerenhyrs() == null ? " " : "" + data.get(i).getGerenhyrs());
                cell.setCellStyle(style);
                sum[28] += (data.get(i).getGerenhyrs() == null ? 0 : data.get(i).getGerenhyrs());

                cell = row.createCell((short) 29);
                cell.setCellValue(data.get(i).getGerenhynx() == null ? " " : "" + data.get(i).getGerenhynx());
                cell.setCellStyle(style);
                sum[29] += (data.get(i).getGerenhynx() == null ? 0 : data.get(i).getGerenhynx());

                cell = row.createCell((short) 30);
                cell.setCellValue(data.get(i).getZhiyuanzrs() == null ? " " : "" + data.get(i).getZhiyuanzrs());
                cell.setCellStyle(style);
                sum[30] += (data.get(i).getZhiyuanzrs() == null ? 0 : data.get(i).getZhiyuanzrs());

                cell = row.createCell((short) 31);
                cell.setCellValue(data.get(i).getZhiyuanzdws() == null ? " " : "" + data.get(i).getZhiyuanzdws());
                cell.setCellStyle(style);
                sum[31] += (data.get(i).getZhiyuanzdws() == null ? 0 : data.get(i).getZhiyuanzdws());

                cell = row.createCell((short) 32);
                cell.setCellValue(data.get(i).getHuiyuanxz() == null ? " " : "" + data.get(i).getHuiyuanxz());
                cell.setCellStyle(style);
                sum[32] += (data.get(i).getHuiyuanxz() == null ? 0 : data.get(i).getHuiyuanxz());

                cell = row.createCell((short) 33);
                cell.setCellValue(data.get(i).getHuiyuanzj() == null ? " " : "" + data.get(i).getHuiyuanzj());
                cell.setCellStyle(style);
                sum[33] += (data.get(i).getHuiyuanzj() == null ? 0 : data.get(i).getHuiyuanzj());

                cell = row.createCell((short) 34);
                cell.setCellValue(data.get(i).getWenhuast() == null ? " " : "" + data.get(i).getWenhuast());
                cell.setCellStyle(style);
                sum[34] += (data.get(i).getWenhuast() == null ? 0 : data.get(i).getWenhuast());

                cell = row.createCell((short) 35);
                cell.setCellValue(data.get(i).getHuodongzdstqt() == null ? " " : "" + data.get(i).getHuodongzdstqt());
                cell.setCellStyle(style);
                sum[35] += (data.get(i).getHuodongzdstqt() == null ? 0 : data.get(i).getHuodongzdstqt());

                cell = row.createCell((short) 36);
                cell.setCellValue(data.get(i).getDulicwysjg() == null ? " " : "" + data.get(i).getDulicwysjg());
                cell.setCellStyle(style);
                sum[36] += (data.get(i).getDulicwysjg() == null ? 0 : data.get(i).getDulicwysjg());

                cell = row.createCell((short) 37);
                cell.setCellValue(data.get(i).getBenniandczbke() == null ? " " : "" + data.get(i).getBenniandczbke());
                cell.setCellStyle(style);
                sumbke += (data.get(i).getBenniandczbke() == null ? 0 : data.get(i).getBenniandczbke());

                cell = row.createCell((short) 38);
                cell.setCellValue(data.get(i).getJijinh() == null ? " " : "" + data.get(i).getJijinh());
                cell.setCellStyle(style);
                sum[38] += (data.get(i).getJijinh() == null ? 0 : data.get(i).getJijinh());

                cell = row.createCell((short) 39);
                cell.setCellValue(data.get(i).getJiguanqsyjsx() == null ? " " : "" + data.get(i).getJiguanqsyjsx());
                cell.setCellStyle(style);
                sum[39] += (data.get(i).getJiguanqsyjsx() == null ? 0 : data.get(i).getJiguanqsyjsx());

                cell = row.createCell((short) 40);
                cell.setCellValue(data.get(i).getLiudongrkjsx() == null ? " " : "" + data.get(i).getLiudongrkjsx());
                cell.setCellStyle(style);
                sum[40] += (data.get(i).getLiudongrkjsx() == null ? 0 : data.get(i).getLiudongrkjsx());

                cell = row.createCell((short) 41);
                cell.setCellValue("");
                cell.setCellStyle(style);

            }

            row = sheet.createRow((short) 11);

            cell = row.createCell((short) 0);
            cell.setCellValue("合\r\n计");
            cell.setCellStyle(style);

            cell = row.createCell((short) 1);
            cell.setCellValue("汇\r\n总");
            cell.setCellStyle(style);

            cell = row.createCell((short) 2);
            cell.setCellValue(sum[2]);
            cell.setCellStyle(style);

            cell = row.createCell((short) 3);
            cell.setCellValue(sum[3]);
            cell.setCellStyle(style);

            cell = row.createCell((short) 4);
            cell.setCellValue(sum[4]);
            cell.setCellStyle(style);

            cell = row.createCell((short) 5);
            cell.setCellValue(sum[5]);
            cell.setCellStyle(style);

            cell = row.createCell((short) 6);
            cell.setCellValue(sum[6]);
            cell.setCellStyle(style);

            cell = row.createCell((short) 7);
            cell.setCellValue(sum[7]);
            cell.setCellStyle(style);

            cell = row.createCell((short) 8);
            cell.setCellValue(sum[8]);
            cell.setCellStyle(style);

            cell = row.createCell((short) 9);
            cell.setCellValue(sum[9]);
            cell.setCellStyle(style);

            cell = row.createCell((short) 10);
            cell.setCellValue(sum[10]);
            cell.setCellStyle(style);

            cell = row.createCell((short) 11);
            cell.setCellValue(sum[11]);
            cell.setCellStyle(style);

            cell = row.createCell((short) 12);
            cell.setCellValue(sum[12]);
            cell.setCellStyle(style);

            cell = row.createCell((short) 13);
            cell.setCellValue(sum[13]);
            cell.setCellStyle(style);

            cell = row.createCell((short) 14);
            cell.setCellValue(sum[14]);
            cell.setCellStyle(style);

            cell = row.createCell((short) 15);
            cell.setCellValue(sum[15]);
            cell.setCellStyle(style);

            cell = row.createCell((short) 16);
            cell.setCellValue(sum[16]);
            cell.setCellStyle(style);

            cell = row.createCell((short) 17);
            cell.setCellValue(sum[17]);
            cell.setCellStyle(style);

            cell = row.createCell((short) 18);
            cell.setCellValue(sum[18]);
            cell.setCellStyle(style);

            cell = row.createCell((short) 19);
            cell.setCellValue(sum[19]);
            cell.setCellStyle(style);

            cell = row.createCell((short) 20);
            cell.setCellValue(sum[20]);
            cell.setCellStyle(style);

            cell = row.createCell((short) 21);
            cell.setCellValue(sum[21]);
            cell.setCellStyle(style);

            cell = row.createCell((short) 22);
            cell.setCellValue(sum[22]);
            cell.setCellStyle(style);

            cell = row.createCell((short) 23);
            cell.setCellValue(sum[23]);
            cell.setCellStyle(style);

            cell = row.createCell((short) 24);
            cell.setCellValue(sum[24]);
            cell.setCellStyle(style);

            cell = row.createCell((short) 25);
            cell.setCellValue(sum[25]);
            cell.setCellStyle(style);

            cell = row.createCell((short) 26);
            cell.setCellValue(sum[26]);
            cell.setCellStyle(style);

            cell = row.createCell((short) 27);
            cell.setCellValue(sum[27]);
            cell.setCellStyle(style);

            cell = row.createCell((short) 28);
            cell.setCellValue(sum[28]);
            cell.setCellStyle(style);

            cell = row.createCell((short) 29);
            cell.setCellValue(sum[29]);
            cell.setCellStyle(style);

            cell = row.createCell((short) 30);
            cell.setCellValue(sum[30]);
            cell.setCellStyle(style);

            cell = row.createCell((short) 31);
            cell.setCellValue(sum[31]);
            cell.setCellStyle(style);

            cell = row.createCell((short) 32);
            cell.setCellValue(sum[32]);
            cell.setCellStyle(style);

            cell = row.createCell((short) 33);
            cell.setCellValue(sum[33]);
            cell.setCellStyle(style);

            cell = row.createCell((short) 34);
            cell.setCellValue(sum[34]);
            cell.setCellStyle(style);

            cell = row.createCell((short) 35);
            cell.setCellValue(sum[35]);
            cell.setCellStyle(style);

            cell = row.createCell((short) 36);
            cell.setCellValue(sum[36]);
            cell.setCellStyle(style);

            cell = row.createCell((short) 37);
            cell.setCellValue(String.format("%.1f",sumbke));
            cell.setCellStyle(style);

            cell = row.createCell((short) 38);
            cell.setCellValue(sum[38]);
            cell.setCellStyle(style);

            cell = row.createCell((short) 39);
            cell.setCellValue(sum[39]);
            cell.setCellStyle(style);

            cell = row.createCell((short) 40);
            cell.setCellValue(sum[40]);
            cell.setCellStyle(style);

            cell = row.createCell((short) 41);
            cell.setCellValue("");
            cell.setCellStyle(style);

            row0.setHeightInPoints(30);
            row1.setHeightInPoints(25);
            row2.setHeightInPoints(25);
            row3.setHeightInPoints(25);
            row4.setHeightInPoints(25);
            row5.setHeightInPoints(60);

            for (int i = 0; i < data.size() + 1; ++i){
                row = sheet.getRow(i + 6);
                if (i == 0){
                    row.setHeightInPoints(150);
                }else if (i == 1 || i == 2 || i == 4){
                    row.setHeightInPoints(100);
                }else if (i == 3){
                    row.setHeightInPoints(120);
                }
            }
            row = sheet.getRow(11);
            row.setHeightInPoints(35);

            for (int i = 0; i < 42; ++i){
                sheet.setColumnWidth(i, MSExcelUtil.pixel2WidthUnits(30));
            }

            String filePath = staticResourceDir + uploadPath + FileType.PATH_EXCEL;

            String fileName = UUIDGenerator.getUUID() + ".xls";

            //这里是问题的关键，将这个工作簿写入到一个流中就可以输出相应的名字，这里需要写路径就ok了。
            FileOutputStream fileOut = new FileOutputStream(filePath + fileName);
            wb.write(fileOut);
            fileOut.close();

            excelNames.setFileName(fileName);
            excelNames.setRealName("杭州市组织建设报表-" + year + ".xls");

        } catch (Exception ex) {
            return null;
        }
        return excelNames;
    }
}
