package com.hznu.lwb.service.impl;

import com.hznu.lwb.model.ExcelNames;
import com.hznu.lwb.model.param.ProjectMonthlyReportParam;
import com.hznu.lwb.model.report.ProjectMonthlyReport;
import com.hznu.lwb.model.report.ProjectWorkReport;
import com.hznu.lwb.model.result.ApiResult;
import com.hznu.lwb.model.vm.DataTablesParameters;
import com.hznu.lwb.persistence.ProjectMonthlyReportDao;
import com.hznu.lwb.service.IProjectMonthlyReportService;
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


/**
 * @author Xueht
 */
@Service
public class ProjectMonthlyReportService implements IProjectMonthlyReportService {

    private Logger logger = LoggerFactory.getLogger(this.getClass());

    @Value("#{config['staticResourceDir']}")
    private String staticResourceDir;
    @Value("#{config['uploadPath']}")
    private String uploadPath;

    @Resource
    private ProjectMonthlyReportDao projectMonthlyReportDao;

    @Override
    public ApiResult insert(ProjectMonthlyReport projectMonthlyReport) {
        ApiResult apiResult = new ApiResult();
        try {
            if (projectMonthlyReport.getType() == 1) {
                projectMonthlyReportDao.insertMonthlyAlonePerson(projectMonthlyReport);
                apiResult.success();
            } else if (projectMonthlyReport.getType() == 2) {
                projectMonthlyReportDao.insertMonthlyMentalityPerson(projectMonthlyReport);
                apiResult.success();
            }else if (projectMonthlyReport.getType() == 3) {
                projectMonthlyReportDao.insertMonthlyMigratePerson(projectMonthlyReport);
                apiResult.success();
            } else if (projectMonthlyReport.getType() == 4) {
                projectMonthlyReportDao.insertMonthlyChangePerson(projectMonthlyReport);
                apiResult.success();
            } else if (projectMonthlyReport.getType() == 5) {
                ProjectMonthlyReportParam projectMonthlyReportParam = new ProjectMonthlyReportParam();
                projectMonthlyReportParam.setMonth(projectMonthlyReport.getMonth());
                projectMonthlyReportParam.setYear(projectMonthlyReport.getYear());
                projectMonthlyReportParam.setScopeId(projectMonthlyReport.getScopeId());
                ProjectMonthlyReport projectMonthlyReport1 = projectMonthlyReportDao.getMonthlyActivity(projectMonthlyReportParam);
                if (projectMonthlyReport1 == null) {
                    projectMonthlyReportDao.insertMonthlyActivity(projectMonthlyReport);
                } else {
                    projectMonthlyReport.setId(projectMonthlyReport1.getId());
                    projectMonthlyReportDao.updateMonthlyActivity(projectMonthlyReport);
                }
                apiResult.success();
            } else {
                apiResult.fail("类型不正确");
            }
        } catch (Exception ex) {
            logger.error(ex.getMessage(), ex);
            apiResult.fail("插入失败");
        }
        return apiResult;
    }

    @Override
    public ApiResult delete(String ids, Integer type) {
        ApiResult apiResult = new ApiResult();
        try {
            String[] idArray=ids.split(";");
            if (type == 1) {
                for(String id:idArray){
                    projectMonthlyReportDao.deleteMonthlyAlonePerson(Integer.valueOf(id));
                }
                apiResult.success();
            } else if (type == 2) {
                for(String id:idArray){
                    projectMonthlyReportDao.deleteMonthlyMentalityPerson(Integer.valueOf(id));
                }
                apiResult.success();
            } else if (type == 3) {
                for(String id:idArray){
                    projectMonthlyReportDao.deleteMonthlyMigratePerson(Integer.valueOf(id));
                }
                apiResult.success();
            } else if (type == 4) {
                for(String id:idArray){
                    projectMonthlyReportDao.deleteMonthlyChangePerson(Integer.valueOf(id));
                }
                apiResult.success();
            }else {
                apiResult.fail("类型不正确");
            }
        } catch (Exception ex) {
            logger.error(ex.getMessage(), ex);
            apiResult.fail("删除失败");
        }
        return apiResult;
    }

    @Override
    public ApiResult getAll(String aoData, ProjectMonthlyReportParam projectMonthlyReportParam) {
        ApiResult apiResult = new ApiResult();
        try {
            DataTablesParameters parameters = DataTablesParameters.fromJson(aoData);
            projectMonthlyReportParam.setSize(parameters.getRows());
            projectMonthlyReportParam.setOffset(parameters.getStart());

            if (projectMonthlyReportParam.getScopeId() == 0) {
                projectMonthlyReportParam.setLeftScopeId(null);
                projectMonthlyReportParam.setRightScopeId(null);
            } else if (projectMonthlyReportParam.getScopeId() % 100 != 0) {
                projectMonthlyReportParam.setLeftScopeId(projectMonthlyReportParam.getScopeId());
                projectMonthlyReportParam.setRightScopeId(projectMonthlyReportParam.getScopeId());
            } else if (projectMonthlyReportParam.getScopeId() % 10000 != 0) {
                projectMonthlyReportParam.setLeftScopeId(projectMonthlyReportParam.getScopeId() / 100 * 100);
                projectMonthlyReportParam.setRightScopeId(projectMonthlyReportParam.getScopeId() / 100 * 100 + 99);
            } else if (projectMonthlyReportParam.getScopeId() % 1000000 != 0) {
                projectMonthlyReportParam.setLeftScopeId(projectMonthlyReportParam.getScopeId() / 10000 * 10000);
                projectMonthlyReportParam.setRightScopeId(projectMonthlyReportParam.getScopeId() / 10000 * 10000 + 9999);
            }
            if (projectMonthlyReportParam.getType() == 1) {
                Integer totalCount = projectMonthlyReportDao.getMonthlyAlonePersonPageCount(projectMonthlyReportParam);
                List<ProjectMonthlyReport> lp = projectMonthlyReportDao.getMonthlyAlonePerson(projectMonthlyReportParam);
                apiResult.dataTable(parameters.getsEcho(), totalCount, lp);
                apiResult.success();
            } else if (projectMonthlyReportParam.getType() == 2) {
                Integer totalCount = projectMonthlyReportDao.getMonthlyMentalityPersonPageCount(projectMonthlyReportParam);
                List<ProjectMonthlyReport> lp = projectMonthlyReportDao.getMonthlyMentalityPerson(projectMonthlyReportParam);
                apiResult.dataTable(parameters.getsEcho(), totalCount, lp);
                apiResult.success();
            }  else if (projectMonthlyReportParam.getType() == 3) {
                Integer totalCount = projectMonthlyReportDao.getMonthlyMigratePersonPageCount(projectMonthlyReportParam);
                List<ProjectMonthlyReport> lp = projectMonthlyReportDao.getMonthlyMigratePerson(projectMonthlyReportParam);
                apiResult.dataTable(parameters.getsEcho(), totalCount, lp);
                apiResult.success();
            } else if (projectMonthlyReportParam.getType() == 4) {
                Integer totalCount = projectMonthlyReportDao.getMonthlyChangePersonPageCount(projectMonthlyReportParam);
                List<ProjectMonthlyReport> lp = projectMonthlyReportDao.getMonthlyChangePerson(projectMonthlyReportParam);
                apiResult.dataTable(parameters.getsEcho(), totalCount, lp);
                apiResult.success();
            } else if (projectMonthlyReportParam.getType() == 5) {
                ProjectMonthlyReport projectMonthlyReport = projectMonthlyReportDao.getMonthlyActivity(projectMonthlyReportParam);
                apiResult.success(projectMonthlyReport);
            } else {
                apiResult.fail("类型错误");
            }
        } catch (Exception ex) {
            logger.error(ex.getMessage(), ex);
            apiResult.fail("获取失败");
        }
        return apiResult;
    }

    @Override
    public ApiResult getChildStatus(String aoData, ProjectMonthlyReportParam projectMonthlyReportParam) {
        ApiResult apiResult = new ApiResult();
        try {
            DataTablesParameters parameters = DataTablesParameters.fromJson(aoData);
            projectMonthlyReportParam.setSize(parameters.getRows());
            projectMonthlyReportParam.setOffset(parameters.getStart());

            Integer totalCount = projectMonthlyReportDao.getChildOrganizationCount(projectMonthlyReportParam);
            List<ProjectMonthlyReport> lp = projectMonthlyReportDao.selectChildOrganization(projectMonthlyReportParam);
            if (lp != null) {
                for (ProjectMonthlyReport it : lp) {
                    projectMonthlyReportParam.setScopeId(it.getScopeId());
                    if (it.getScopeId() == 0) {
                        projectMonthlyReportParam.setLeftScopeId(null);
                        projectMonthlyReportParam.setRightScopeId(null);
                    } else if (it.getScopeId() % 100 != 0) {
                        projectMonthlyReportParam.setLeftScopeId(it.getScopeId());
                        projectMonthlyReportParam.setRightScopeId(it.getScopeId());
                    } else if (it.getScopeId() % 10000 != 0) {
                        projectMonthlyReportParam.setLeftScopeId(it.getScopeId() / 100 * 100);
                        projectMonthlyReportParam.setRightScopeId(it.getScopeId() / 100 * 100 + 99);
                    } else if (it.getScopeId() % 1000000 != 0) {
                        projectMonthlyReportParam.setLeftScopeId(it.getScopeId() / 10000 * 10000);
                        projectMonthlyReportParam.setRightScopeId(it.getScopeId() / 10000 * 10000 + 9999);
                    }
                    it.setChileStatus(0);
//                  if (projectMonthlyReportDao.getOneMonthlyAlonePersonPage(projectMonthlyReportParam) != 0 ||
//                            projectMonthlyReportDao.getOneMonthlyMentalityPersonPage(projectMonthlyReportParam) != 0 ||
//                            projectMonthlyReportDao.getOneMonthlyMigratePersonPage(projectMonthlyReportParam) != 0 ||
//                            projectMonthlyReportDao.getOneMonthlyChangePersonPage(projectMonthlyReportParam) != 0 ||
//                            projectMonthlyReportDao.getMonthlyActivity(projectMonthlyReportParam) != null) {
//                        it.setChileStatus(1);
//                    } else {
//                        it.setChileStatus(0);
//                    }
                }
                apiResult.dataTable(parameters.getsEcho(), totalCount, lp);
                apiResult.success();
            } else {
                apiResult.fail();
            }
        } catch (Exception ex) {
            logger.error(ex.getMessage(), ex);
            apiResult.fail("获取失败");
        }
        return apiResult;
    }

    @Override
    public ApiResult getChildTotalCount(String aoData, ProjectMonthlyReportParam projectMonthlyReportParam) {
        ApiResult apiResult = new ApiResult();
        try {
            DataTablesParameters parameters = DataTablesParameters.fromJson(aoData);

            Integer totalCount = projectMonthlyReportDao.getChildOrganizationCount(projectMonthlyReportParam);
            List<ProjectMonthlyReport> lp = projectMonthlyReportDao.selectChildOrganization(projectMonthlyReportParam);
            if (lp != null) {
                for (ProjectMonthlyReport it : lp) {
                    if (it.getScopeId() == 0) {
                        projectMonthlyReportParam.setLeftScopeId(null);
                        projectMonthlyReportParam.setRightScopeId(null);
                    } else if (it.getScopeId() % 100 != 0) {
                        projectMonthlyReportParam.setLeftScopeId(it.getScopeId());
                        projectMonthlyReportParam.setRightScopeId(it.getScopeId());
                    } else if (it.getScopeId() % 10000 != 0) {
                        projectMonthlyReportParam.setLeftScopeId(it.getScopeId() / 100 * 100);
                        projectMonthlyReportParam.setRightScopeId(it.getScopeId() / 100 * 100 + 99);
                    } else if (it.getScopeId() % 1000000 != 0) {
                        projectMonthlyReportParam.setLeftScopeId(it.getScopeId() / 10000 * 10000);
                        projectMonthlyReportParam.setRightScopeId(it.getScopeId() / 10000 * 10000 + 9999);
                    }
                    it.setSumMonthlyAlonePerson(projectMonthlyReportDao.getMonthlyAlonePersonTotalCount(projectMonthlyReportParam));
                    it.setSumMonthlyMentalityPerson(projectMonthlyReportDao.getMonthlyMentalityPersonTotalCount(projectMonthlyReportParam));
                    it.setSumMonthlyMigratePerson(projectMonthlyReportDao.getMonthlyMigratePersonTotalCount(projectMonthlyReportParam));
                    it.setSumMonthlyChangePerson(projectMonthlyReportDao.getMonthlyChangePersonTotalCount(projectMonthlyReportParam));
                }
                ProjectMonthlyReport pmr = new ProjectMonthlyReport();
                pmr.setScopeId(0);
                projectMonthlyReportParam.setLeftScopeId(null);
                projectMonthlyReportParam.setRightScopeId(null);
                pmr.setSumMonthlyAlonePerson(projectMonthlyReportDao.getMonthlyAlonePersonTotalCount(projectMonthlyReportParam));
                pmr.setSumMonthlyChangePerson(projectMonthlyReportDao.getMonthlyChangePersonTotalCount(projectMonthlyReportParam));
                pmr.setSumMonthlyMentalityPerson(projectMonthlyReportDao.getMonthlyMentalityPersonTotalCount(projectMonthlyReportParam));
                pmr.setSumMonthlyMigratePerson(projectMonthlyReportDao.getMonthlyMigratePersonTotalCount(projectMonthlyReportParam));
                lp.add(lp.size(), pmr);
                apiResult.dataTable(parameters.getsEcho(), totalCount, lp);
                apiResult.success();
            } else {
                apiResult.fail();
            }
        } catch (Exception ex) {
            logger.error(ex.getMessage(), ex);
            apiResult.fail("获取失败");
        }
        return apiResult;
    }

    @Override
    public ApiResult exportReport(String aoData, ProjectMonthlyReportParam projectMonthlyReportParam) {
        ApiResult apiResult = new ApiResult();
        try {
            List<ProjectMonthlyReport> data = (List<ProjectMonthlyReport>)getChildTotalCount(aoData, projectMonthlyReportParam).getData();
            ExcelNames excelNames = reportToExcel(data, projectMonthlyReportParam.getYear(), projectMonthlyReportParam.getMonth());
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
    public ApiResult exportReportXQ(String aoData, ProjectMonthlyReportParam projectMonthlyReportParam) {
        ApiResult apiResult = new ApiResult();
        try {
            ProjectMonthlyReportParam param = projectMonthlyReportParam;
            param.setType(1);
            List<ProjectMonthlyReport> data0 = (List<ProjectMonthlyReport>)getAll(aoData, param).getData();
            param.setType(2);
            List<ProjectMonthlyReport> data1 = (List<ProjectMonthlyReport>)getAll(aoData, param).getData();
            param.setType(3);
            List<ProjectMonthlyReport> data2 = (List<ProjectMonthlyReport>)getAll(aoData, param).getData();
            param.setType(4);
            List<ProjectMonthlyReport> data3 = (List<ProjectMonthlyReport>)getAll(aoData, param).getData();

            ExcelNames excelNames = reportToExcel(data0, data1, data2, data3, projectMonthlyReportParam.getYear(), projectMonthlyReportParam.getMonth(), projectMonthlyReportParam.getScopeName());
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

    public ExcelNames reportToExcel(List<ProjectMonthlyReport> data, Integer year, Integer month){
        ExcelNames excelNames = new ExcelNames();
        try {
            HSSFWorkbook wb = new HSSFWorkbook();
            HSSFSheet sheet = wb.createSheet("特殊家庭帮扶月报");
            HSSFCellStyle style = wb.createCellStyle(); // 样式对象

            style.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);// 垂直
            style.setAlignment(HSSFCellStyle.ALIGN_CENTER);// 水平
            HSSFRow row0 = sheet.createRow((short) 0);
            HSSFRow row1 = sheet.createRow((short) 1);

            sheet.addMergedRegion(new CellRangeAddress(0, 0, (short) 0, (short) 4));
            HSSFCell ce = row0.createCell((short) 0);
            ce.setCellValue("杭州市特殊家庭帮扶月报"); // 表格的第一行第一列显示的数据
            ce.setCellStyle(style); // 样式，居中

            ce = row1.createCell((short) 0);
            ce.setCellValue("机构名称");
            ce.setCellStyle(style);

            ce = row1.createCell((short) 1);
            ce.setCellValue("新增失独人员");
            ce.setCellStyle(style);

            ce = row1.createCell((short) 2);
            ce.setCellValue("新增心理干预人员");
            ce.setCellStyle(style);

            ce = row1.createCell((short) 3);
            ce.setCellValue("需信息迁移人员");
            ce.setCellStyle(style);

            ce = row1.createCell((short) 4);
            ce.setCellValue("需信息变更人员");
            ce.setCellStyle(style);

            HSSFRow row;
            HSSFCell cell;
            for (int i = 0; i < data.size(); ++i){
                row = sheet.createRow((short) (2 + i));

                cell = row.createCell(0);
                if (data.get(i).getScopeId() == 0){
                    cell.setCellValue("合计");
                }else{
                    cell.setCellValue(data.get(i).getOrganizationName() + "计生协");
                }
                cell.setCellStyle(style);

                cell = row.createCell(1);
                cell.setCellValue(data.get(i).getSumMonthlyAlonePerson() == null ? 0 : data.get(i).getSumMonthlyAlonePerson());
                cell.setCellStyle(style);

                cell = row.createCell(2);
                cell.setCellValue(data.get(i).getSumMonthlyMentalityPerson() == null ? 0 : data.get(i).getSumMonthlyMentalityPerson());
                cell.setCellStyle(style);

                cell = row.createCell(3);
                cell.setCellValue(data.get(i).getSumMonthlyMigratePerson() == null ? 0 : data.get(i).getSumMonthlyMigratePerson());
                cell.setCellStyle(style);

                cell = row.createCell(4);
                cell.setCellValue(data.get(i).getSumMonthlyChangePerson() == null ? 0 : data.get(i).getSumMonthlyChangePerson());
                cell.setCellStyle(style);
            }

            row0.setHeightInPoints(30);
            row1.setHeightInPoints(20);

            for (int i = 0; i < data.size(); ++i){
                row = sheet.getRow(i + 2);
                row.setHeightInPoints(20);
            }

            sheet.setColumnWidth(0, MSExcelUtil.pixel2WidthUnits(100));
            sheet.setColumnWidth(1, MSExcelUtil.pixel2WidthUnits(120));
            sheet.setColumnWidth(2, MSExcelUtil.pixel2WidthUnits(120));
            sheet.setColumnWidth(3, MSExcelUtil.pixel2WidthUnits(120));
            sheet.setColumnWidth(4, MSExcelUtil.pixel2WidthUnits(120));

            String filePath = staticResourceDir + uploadPath + FileType.PATH_EXCEL;

            String fileName = UUIDGenerator.getUUID() + ".xls";

            //这里是问题的关键，将这个工作簿写入到一个流中就可以输出相应的名字，这里需要写路径就ok了。
            FileOutputStream fileOut = new FileOutputStream(filePath + fileName);
            wb.write(fileOut);
            fileOut.close();

            excelNames.setFileName(fileName);
            excelNames.setRealName("杭州市特殊家庭帮扶月报-" + year + "-" + month + ".xls");
        }catch (Exception ex){
            return null;
        }
        return excelNames;
    }

    public ExcelNames reportToExcel(List<ProjectMonthlyReport> data0, List<ProjectMonthlyReport> data1, List<ProjectMonthlyReport> data2, List<ProjectMonthlyReport> data3, Integer year, Integer month, String scopeName) {
        ExcelNames excelNames = new ExcelNames();
        try {
            HSSFWorkbook wb = new HSSFWorkbook();
            HSSFSheet sheet0 = wb.createSheet("新增失独人员");
            HSSFSheet sheet1 = wb.createSheet("新增心理干预人员");
            HSSFSheet sheet2 = wb.createSheet("需信息迁移人员");
            HSSFSheet sheet3 = wb.createSheet("需信息变更人员");
            HSSFCellStyle style = wb.createCellStyle(); // 样式对象

            style.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);// 垂直
            style.setAlignment(HSSFCellStyle.ALIGN_CENTER);// 水平
            HSSFRow row0 = sheet0.createRow((short) 0);
            HSSFRow row1 = sheet0.createRow((short) 1);

            sheet0.addMergedRegion(new CellRangeAddress(0, 0, (short) 0, (short) 8));
            HSSFCell ce = row0.createCell((short) 0);
            ce.setCellValue(scopeName + "新增失独人员汇总表"); // 表格的第一行第一列显示的数据
            ce.setCellStyle(style); // 样式，居中

            ce = row1.createCell((short) 0);
            ce.setCellValue("信息编码");
            ce.setCellStyle(style);

            ce = row1.createCell((short) 1);
            ce.setCellValue("父亲姓名");
            ce.setCellStyle(style);

            ce = row1.createCell((short) 2);
            ce.setCellValue("父亲身份证");
            ce.setCellStyle(style);

            ce = row1.createCell((short) 3);
            ce.setCellValue("母亲姓名");
            ce.setCellStyle(style);

            ce = row1.createCell((short) 4);
            ce.setCellValue("母亲身份证");
            ce.setCellStyle(style);

            ce = row1.createCell((short) 5);
            ce.setCellValue("现居住详细地址");
            ce.setCellStyle(style);

            ce = row1.createCell((short) 6);
            ce.setCellValue("失独时间");
            ce.setCellStyle(style);

            ce = row1.createCell((short) 7);
            ce.setCellValue("失独原因");
            ce.setCellStyle(style);

            ce = row1.createCell((short) 8);
            ce.setCellValue("联系电话");
            ce.setCellStyle(style);

            HSSFRow row;
            HSSFCell cell;
            for (int i = 0; i < data0.size(); ++i){
                row = sheet0.createRow((short) (2 + i));

                cell = row.createCell(0);
                cell.setCellValue(data0.get(i).getInformationCoding() == null ? "" : data0.get(i).getInformationCoding());
                cell.setCellStyle(style);

                cell = row.createCell(1);
                cell.setCellValue(data0.get(i).getFatherName());
                cell.setCellStyle(style);

                cell = row.createCell(2);
                cell.setCellValue(data0.get(i).getFatherIdCard() == null ? "" : data0.get(i).getFatherIdCard());
                cell.setCellStyle(style);

                cell = row.createCell(3);
                cell.setCellValue(data0.get(i).getMotherName());
                cell.setCellStyle(style);

                cell = row.createCell(4);
                cell.setCellValue(data0.get(i).getMotherIdCard() == null ? "" : data0.get(i).getMotherIdCard());
                cell.setCellStyle(style);

                cell = row.createCell(5);
                cell.setCellValue(data0.get(i).getAddress());
                cell.setCellStyle(style);

                cell = row.createCell(6);
                cell.setCellValue(data0.get(i).getAloneTime());
                cell.setCellStyle(style);

                cell = row.createCell(7);
                cell.setCellValue(data0.get(i).getReason());
                cell.setCellStyle(style);

                cell = row.createCell(8);
                cell.setCellValue(data0.get(i).getMobile());
                cell.setCellStyle(style);

            }

            row0.setHeightInPoints(30);
            row1.setHeightInPoints(20);

            for (int i = 0; i < data0.size(); ++i){
                row = sheet0.getRow(i + 2);
                row.setHeightInPoints(20);
            }

            sheet0.setColumnWidth(0, MSExcelUtil.pixel2WidthUnits(80));
            sheet0.setColumnWidth(1, MSExcelUtil.pixel2WidthUnits(100));
            sheet0.setColumnWidth(2, MSExcelUtil.pixel2WidthUnits(150));
            sheet0.setColumnWidth(3, MSExcelUtil.pixel2WidthUnits(100));
            sheet0.setColumnWidth(4, MSExcelUtil.pixel2WidthUnits(150));
            sheet0.setColumnWidth(5, MSExcelUtil.pixel2WidthUnits(200));
            sheet0.setColumnWidth(6, MSExcelUtil.pixel2WidthUnits(100));
            sheet0.setColumnWidth(7, MSExcelUtil.pixel2WidthUnits(150));
            sheet0.setColumnWidth(8, MSExcelUtil.pixel2WidthUnits(100));

            row0 = sheet1.createRow((short) 0);
            row1 = sheet1.createRow((short) 1);

            sheet1.addMergedRegion(new CellRangeAddress(0, 0, (short) 0, (short) 8));
            ce = row0.createCell((short) 0);
            ce.setCellValue(scopeName + "新增心理干预人员汇总表"); // 表格的第一行第一列显示的数据
            ce.setCellStyle(style); // 样式，居中

            ce = row1.createCell((short) 0);
            ce.setCellValue("信息编码");
            ce.setCellStyle(style);

            ce = row1.createCell((short) 1);
            ce.setCellValue("父亲姓名");
            ce.setCellStyle(style);

            ce = row1.createCell((short) 2);
            ce.setCellValue("父亲身份证");
            ce.setCellStyle(style);

            ce = row1.createCell((short) 3);
            ce.setCellValue("母亲姓名");
            ce.setCellStyle(style);

            ce = row1.createCell((short) 4);
            ce.setCellValue("母亲身份证");
            ce.setCellStyle(style);

            ce = row1.createCell((short) 5);
            ce.setCellValue("现居住详细地址");
            ce.setCellStyle(style);

            ce = row1.createCell((short) 6);
            ce.setCellValue("心理干预时间");
            ce.setCellStyle(style);

            ce = row1.createCell((short) 7);
            ce.setCellValue("心理干预原因");
            ce.setCellStyle(style);

            ce = row1.createCell((short) 8);
            ce.setCellValue("联系电话");
            ce.setCellStyle(style);


            for (int i = 0; i < data1.size(); ++i){
                row = sheet1.createRow((short) (2 + i));

                cell = row.createCell(0);
                cell.setCellValue(data1.get(i).getInformationCoding() == null ? "" : data1.get(i).getInformationCoding());
                cell.setCellStyle(style);

                cell = row.createCell(1);
                cell.setCellValue(data1.get(i).getFatherName());
                cell.setCellStyle(style);

                cell = row.createCell(2);
                cell.setCellValue(data1.get(i).getFatherIdCard() == null ? "" : data1.get(i).getFatherIdCard());
                cell.setCellStyle(style);

                cell = row.createCell(3);
                cell.setCellValue(data1.get(i).getMotherName());
                cell.setCellStyle(style);

                cell = row.createCell(4);
                cell.setCellValue(data1.get(i).getMotherIdCard() == null ? "" : data1.get(i).getMotherIdCard());
                cell.setCellStyle(style);

                cell = row.createCell(5);
                cell.setCellValue(data1.get(i).getAddress());
                cell.setCellStyle(style);

                cell = row.createCell(6);
                cell.setCellValue(data1.get(i).getAloneTime());
                cell.setCellStyle(style);

                cell = row.createCell(7);
                cell.setCellValue(data1.get(i).getReason());
                cell.setCellStyle(style);

                cell = row.createCell(8);
                cell.setCellValue(data1.get(i).getMobile());
                cell.setCellStyle(style);

            }

            row0.setHeightInPoints(30);
            row1.setHeightInPoints(20);

            for (int i = 0; i < data1.size(); ++i){
                row = sheet1.getRow(i + 2);
                row.setHeightInPoints(20);
            }

            sheet1.setColumnWidth(0, MSExcelUtil.pixel2WidthUnits(80));
            sheet1.setColumnWidth(1, MSExcelUtil.pixel2WidthUnits(100));
            sheet1.setColumnWidth(2, MSExcelUtil.pixel2WidthUnits(150));
            sheet1.setColumnWidth(3, MSExcelUtil.pixel2WidthUnits(100));
            sheet1.setColumnWidth(4, MSExcelUtil.pixel2WidthUnits(150));
            sheet1.setColumnWidth(5, MSExcelUtil.pixel2WidthUnits(200));
            sheet1.setColumnWidth(6, MSExcelUtil.pixel2WidthUnits(100));
            sheet1.setColumnWidth(7, MSExcelUtil.pixel2WidthUnits(150));
            sheet1.setColumnWidth(8, MSExcelUtil.pixel2WidthUnits(100));

            row0 = sheet2.createRow((short) 0);
            row1 = sheet2.createRow((short) 1);

            sheet2.addMergedRegion(new CellRangeAddress(0, 0, (short) 0, (short) 8));
            ce = row0.createCell((short) 0);
            ce.setCellValue(scopeName + "需信息迁移人员汇总表"); // 表格的第一行第一列显示的数据
            ce.setCellStyle(style); // 样式，居中

            ce = row1.createCell((short) 0);
            ce.setCellValue("信息编码");
            ce.setCellStyle(style);

            ce = row1.createCell((short) 1);
            ce.setCellValue("父亲姓名");
            ce.setCellStyle(style);

            ce = row1.createCell((short) 2);
            ce.setCellValue("父亲身份证");
            ce.setCellStyle(style);

            ce = row1.createCell((short) 3);
            ce.setCellValue("母亲姓名");
            ce.setCellStyle(style);

            ce = row1.createCell((short) 4);
            ce.setCellValue("母亲身份证");
            ce.setCellStyle(style);

            ce = row1.createCell((short) 5);
            ce.setCellValue("迁出地址");
            ce.setCellStyle(style);

            ce = row1.createCell((short) 6);
            ce.setCellValue("迁入地址");
            ce.setCellStyle(style);

            ce = row1.createCell((short) 7);
            ce.setCellValue("迁移原因");
            ce.setCellStyle(style);

            ce = row1.createCell((short) 8);
            ce.setCellValue("迁移时间");
            ce.setCellStyle(style);


            for (int i = 0; i < data2.size(); ++i){
                row = sheet2.createRow((short) (2 + i));

                cell = row.createCell(0);
                cell.setCellValue(data2.get(i).getInformationCoding() == null ? "" : data2.get(i).getInformationCoding());
                cell.setCellStyle(style);

                cell = row.createCell(1);
                cell.setCellValue(data2.get(i).getFatherName());
                cell.setCellStyle(style);

                cell = row.createCell(2);
                cell.setCellValue(data2.get(i).getFatherIdCard() == null ? "" : data2.get(i).getFatherIdCard());
                cell.setCellStyle(style);

                cell = row.createCell(3);
                cell.setCellValue(data2.get(i).getMotherName());
                cell.setCellStyle(style);

                cell = row.createCell(4);
                cell.setCellValue(data2.get(i).getMotherIdCard() == null ? "" : data2.get(i).getMotherIdCard());
                cell.setCellStyle(style);

                cell = row.createCell(5);
                cell.setCellValue(data2.get(i).getOldAddress());
                cell.setCellStyle(style);

                cell = row.createCell(6);
                cell.setCellValue(data2.get(i).getNewAddress());
                cell.setCellStyle(style);

                cell = row.createCell(7);
                cell.setCellValue(data2.get(i).getReason());
                cell.setCellStyle(style);

                cell = row.createCell(8);
                cell.setCellValue(data2.get(i).getMigrateTime());
                cell.setCellStyle(style);

            }

            row0.setHeightInPoints(30);
            row1.setHeightInPoints(20);

            for (int i = 0; i < data2.size(); ++i){
                row = sheet2.getRow(i + 2);
                row.setHeightInPoints(20);
            }

            sheet2.setColumnWidth(0, MSExcelUtil.pixel2WidthUnits(80));
            sheet2.setColumnWidth(1, MSExcelUtil.pixel2WidthUnits(100));
            sheet2.setColumnWidth(2, MSExcelUtil.pixel2WidthUnits(150));
            sheet2.setColumnWidth(3, MSExcelUtil.pixel2WidthUnits(100));
            sheet2.setColumnWidth(4, MSExcelUtil.pixel2WidthUnits(150));
            sheet2.setColumnWidth(5, MSExcelUtil.pixel2WidthUnits(200));
            sheet2.setColumnWidth(6, MSExcelUtil.pixel2WidthUnits(200));
            sheet2.setColumnWidth(7, MSExcelUtil.pixel2WidthUnits(150));
            sheet2.setColumnWidth(8, MSExcelUtil.pixel2WidthUnits(120));

            row0 = sheet3.createRow((short) 0);
            row1 = sheet3.createRow((short) 1);

            sheet3.addMergedRegion(new CellRangeAddress(0, 0, (short) 0, (short) 7));
            ce = row0.createCell((short) 0);
            ce.setCellValue(scopeName + "需信息变更人员汇总表"); // 表格的第一行第一列显示的数据
            ce.setCellStyle(style); // 样式，居中

            ce = row1.createCell((short) 0);
            ce.setCellValue("信息编码");
            ce.setCellStyle(style);

            ce = row1.createCell((short) 1);
            ce.setCellValue("父亲姓名");
            ce.setCellStyle(style);

            ce = row1.createCell((short) 2);
            ce.setCellValue("父亲身份证");
            ce.setCellStyle(style);

            ce = row1.createCell((short) 3);
            ce.setCellValue("母亲姓名");
            ce.setCellStyle(style);

            ce = row1.createCell((short) 4);
            ce.setCellValue("母亲身份证");
            ce.setCellStyle(style);

            ce = row1.createCell((short) 5);
            ce.setCellValue("删除或注销原因");
            ce.setCellStyle(style);

            ce = row1.createCell((short) 6);
            ce.setCellValue("删除或注销时间");
            ce.setCellStyle(style);

            ce = row1.createCell((short) 7);
            ce.setCellValue("地址");
            ce.setCellStyle(style);


            for (int i = 0; i < data3.size(); ++i){
                row = sheet3.createRow((short) (2 + i));

                cell = row.createCell(0);
                cell.setCellValue(data3.get(i).getInformationCoding() == null ? "" : data3.get(i).getInformationCoding());
                cell.setCellStyle(style);

                cell = row.createCell(1);
                cell.setCellValue(data3.get(i).getFatherName());
                cell.setCellStyle(style);

                cell = row.createCell(2);
                cell.setCellValue(data3.get(i).getFatherIdCard() == null ? "" : data3.get(i).getFatherIdCard());
                cell.setCellStyle(style);

                cell = row.createCell(3);
                cell.setCellValue(data3.get(i).getMotherName());
                cell.setCellStyle(style);

                cell = row.createCell(4);
                cell.setCellValue(data3.get(i).getMotherIdCard() == null ? "" : data3.get(i).getMotherIdCard());
                cell.setCellStyle(style);

                cell = row.createCell(5);
                cell.setCellValue(data3.get(i).getReason());
                cell.setCellStyle(style);

                cell = row.createCell(6);
                cell.setCellValue(data3.get(i).getDeleteTime());
                cell.setCellStyle(style);

                cell = row.createCell(7);
                cell.setCellValue(data3.get(i).getAddress());
                cell.setCellStyle(style);

            }

            row0.setHeightInPoints(30);
            row1.setHeightInPoints(20);

            for (int i = 0; i < data3.size(); ++i){
                row = sheet3.getRow(i + 2);
                row.setHeightInPoints(20);
            }

            sheet3.setColumnWidth(0, MSExcelUtil.pixel2WidthUnits(80));
            sheet3.setColumnWidth(1, MSExcelUtil.pixel2WidthUnits(100));
            sheet3.setColumnWidth(2, MSExcelUtil.pixel2WidthUnits(150));
            sheet3.setColumnWidth(3, MSExcelUtil.pixel2WidthUnits(100));
            sheet3.setColumnWidth(4, MSExcelUtil.pixel2WidthUnits(150));
            sheet3.setColumnWidth(5, MSExcelUtil.pixel2WidthUnits(150));
            sheet3.setColumnWidth(6, MSExcelUtil.pixel2WidthUnits(120));
            sheet3.setColumnWidth(7, MSExcelUtil.pixel2WidthUnits(200));

            String filePath = staticResourceDir + uploadPath + FileType.PATH_EXCEL;

            String fileName = UUIDGenerator.getUUID() + ".xls";

            //这里是问题的关键，将这个工作簿写入到一个流中就可以输出相应的名字，这里需要写路径就ok了。
            FileOutputStream fileOut = new FileOutputStream(filePath + fileName);
            wb.write(fileOut);
            fileOut.close();

            excelNames.setFileName(fileName);
            excelNames.setRealName(scopeName + "特殊家庭帮扶月报统计表-" + year + "-" + month + ".xls");
        }catch (Exception ex){
            return null;
        }
        return excelNames;
    }
}
