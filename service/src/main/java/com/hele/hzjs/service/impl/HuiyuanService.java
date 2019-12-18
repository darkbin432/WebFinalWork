package com.hele.hzjs.service.impl;

import com.hele.hzjs.model.Huiyuan;
import com.hele.hzjs.model.HuiyuanActivity;
import com.hele.hzjs.model.VolunteerApprovalRecord;
import com.hele.hzjs.model.param.HuiyuanParam;
import com.hele.hzjs.model.result.ApiResult;
import com.hele.hzjs.model.vm.DataTablesParameters;
import com.hele.hzjs.persistence.HuiyuanDao;
import com.hele.hzjs.service.IHuiyuanService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

@Service
public class HuiyuanService implements IHuiyuanService {

    Logger logger = LoggerFactory.getLogger(this.getClass());

    @Resource
    private HuiyuanDao huiyuanDao;

    @Override
    public ApiResult insertHuiyuan(Huiyuan huiyuan) {
        ApiResult apiResult = new ApiResult();
        try {
            huiyuanDao.insertSelective(huiyuan);
            apiResult.success(huiyuan);
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
            apiResult.fail("新增会员失败");
        }
        return apiResult;
    }

    @Override
    public ApiResult deleteHuiyuan(Integer id) {
        ApiResult apiResult = new ApiResult();
        try {
            huiyuanDao.deleteByPrimaryKey(id);
            apiResult.success();
        } catch (Exception e) {
            apiResult.fail("删除会员失败");
        }
        return apiResult;
    }

    @Override
    public ApiResult updateHuiyuan(Huiyuan huiyuan) {
        ApiResult apiResult = new ApiResult();
        try {
            huiyuanDao.updateByPrimaryKeySelective(huiyuan);
            apiResult.success();
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
            apiResult.fail("更新会员失败");
        }
        return apiResult;
    }

    @Override
    public ApiResult selectHuiyuan(HuiyuanParam huiyuanParam) {
        ApiResult apiResult = new ApiResult();
        try {
            huiyuanParam.setSize(8);
            huiyuanParam.initOffset();

            if (huiyuanParam.getScopeId() != null && huiyuanParam.getScopeId() != 0) {
                if (huiyuanParam.getScopeId() % 100 == 0) {
                    huiyuanParam.setScopeLeft(huiyuanParam.getScopeId() / 100 * 100);
                    huiyuanParam.setScopeRight(huiyuanParam.getScopeId() / 100 * 100 + 99);
                } else {
                    huiyuanParam.setScopeLeft(huiyuanParam.getScopeId());
                    huiyuanParam.setScopeRight(huiyuanParam.getScopeId());
                }
            }

            Integer totalCount = huiyuanDao.getHuiyuanPageCount(huiyuanParam);

            List<Huiyuan> lh = huiyuanDao.selectByCondition(huiyuanParam);
            if (lh != null) {
                apiResult.setTotalCount(totalCount);
                apiResult.success(lh);
            } else {
                apiResult.fail("筛选会员失败");
            }
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
            if (huiyuanParam.getVolunteerStatus() == 2) {
                apiResult.fail("查找待审批志愿者失败");
            } else {
                apiResult.fail("查找会员失败");
            }
        }
        return apiResult;
    }

    @Override
    public ApiResult selectAllHuiyuan(String aoData, HuiyuanParam huiyuanParam) {
        ApiResult apiResult = new ApiResult();
        try {

            DataTablesParameters parameters = DataTablesParameters.fromJson(aoData);

            huiyuanParam.setSize(parameters.getRows());
            huiyuanParam.setOffset(parameters.getStart());

//            boolean flag = false;
//
//            if (huiyuanParam.getVolunteerStatus() != null && huiyuanParam.getVolunteerStatus() == 2) {
//                if (huiyuanParam.getUserType() == 1) {
//                    flag = true;
//                } else {
//                    flag = false;
//                }
//            } else {
//                flag = true;
//            }


            if (huiyuanParam.getScopeId() != null && huiyuanParam.getScopeId() != 0) {
                if (huiyuanParam.getScopeId() % 10000 == 0) {
                    huiyuanParam.setScopeLeft(huiyuanParam.getScopeId());
                    huiyuanParam.setScopeRight(huiyuanParam.getScopeId() + 9999);
                } else if (huiyuanParam.getScopeId() % 100 == 0) {
                    huiyuanParam.setScopeLeft(huiyuanParam.getScopeId());
                    huiyuanParam.setScopeRight(huiyuanParam.getScopeId() + 99);
                } else {
                    huiyuanParam.setScopeLeft(huiyuanParam.getScopeId());
                    huiyuanParam.setScopeRight(huiyuanParam.getScopeId());
                }
            }


            Integer totalCount = huiyuanDao.getHuiyuanPageCount(huiyuanParam);

            List<Huiyuan> lh = new ArrayList<>();

            if (huiyuanParam.getBirthday() == null || huiyuanParam.getMedical() == null || huiyuanParam.getBirthday() == 0 && huiyuanParam.getMedical() == 0) {
                lh = huiyuanDao.selectByCondition(huiyuanParam);
            }

            if (huiyuanParam.getMedical() != null && huiyuanParam.getMedical() != 0) {
                Calendar now = Calendar.getInstance();
                now.setTime(new Date(now.get(Calendar.YEAR) - 1900, now.get(Calendar.MONTH), now.get(Calendar.DATE)));
                Calendar before = Calendar.getInstance();
                before.setTime(new Date(before.get(Calendar.YEAR) - 1900, before.get(Calendar.MONTH), before.get(Calendar.DATE)));
                if (huiyuanParam.getMedical() == 1) {
                    before.add(Calendar.DATE, -2);
                } else if (huiyuanParam.getMedical() == 2) {
                    before.add(Calendar.DATE, -6);
                } else if (huiyuanParam.getMedical() == 3) {
                    before.add(Calendar.MONTH, -1);
                }

                huiyuanParam.setMedicalNowTime(now.getTime());
                huiyuanParam.setMedicalBeforeTime(before.getTime());

                totalCount = huiyuanDao.getHuiyuanPageCount(huiyuanParam);

                lh = huiyuanDao.selectByCondition(huiyuanParam);
            }

            if (huiyuanParam.getBirthday() != null && huiyuanParam.getBirthday() != 0) {
                lh = huiyuanDao.selectByCondition2(huiyuanParam);
                List<Huiyuan> lhb = new ArrayList<>();
                Calendar now = Calendar.getInstance();
                now.setTime(new Date(now.get(Calendar.YEAR) - 1900, now.get(Calendar.MONTH), now.get(Calendar.DATE)));
                Calendar then = Calendar.getInstance();
                then.setTime(new Date(then.get(Calendar.YEAR) - 1900, then.get(Calendar.MONTH), then.get(Calendar.DATE)));
                Calendar tmp = Calendar.getInstance();
                if (huiyuanParam.getBirthday() == 1) {
                    then.add(Calendar.DATE, 2);
                } else if (huiyuanParam.getBirthday() == 2) {
                    then.add(Calendar.DATE, 6);
                } else if (huiyuanParam.getBirthday() == 3) {
                    then.add(Calendar.MONTH, 1);
                }
                for (Huiyuan h : lh) {
                    Integer month = 0, date = 1;
                    if (h.getCardNo().length() == 18) {
                        month = Integer.valueOf(h.getCardNo().substring(10, 12));
                        date = Integer.valueOf(h.getCardNo().substring(12, 14));
                    } else if (h.getCardNo().length() == 15) {
                        month = Integer.valueOf(h.getCardNo().substring(8, 10));
                        date = Integer.valueOf(h.getCardNo().substring(10, 12));
                    }
                    tmp.setTime(new Date(now.get(Calendar.YEAR) - 1900, month - 1, date));
                    if (now.compareTo(tmp) <= 0 && then.compareTo(tmp) >= 0) {
                        lhb.add(h);
                    }
                }
                lh = lhb.subList(huiyuanParam.getOffset(), Integer.min(huiyuanParam.getOffset() + huiyuanParam.getSize(), lhb.size()));
                totalCount = lhb.size();
            }

            apiResult.dataTable(parameters.getsEcho(), totalCount, lh);
            apiResult.success();
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
            if (huiyuanParam.getVolunteerStatus() == 2) {
                apiResult.fail("查找待审批志愿者失败");
            } else {
                apiResult.fail("查找会员失败");
            }
        }
        return apiResult;
    }

    @Override
    public ApiResult insertVolunteerRecord(VolunteerApprovalRecord record) {
        ApiResult apiResult = new ApiResult();
        if (record.getHuiyuanId() == null) {
            apiResult.lackParams("huiyuanId");
            return apiResult;
        }
        try {
            huiyuanDao.insertRecord(record);
            huiyuanDao.addPoint(record.getHuiyuanId());
            apiResult.success();
        } catch (Exception e) {
            apiResult.fail("添加志愿者审批记录失败");
        }
        return apiResult;
    }

    @Override
    public ApiResult updateVolunteerRecord(VolunteerApprovalRecord record) {
        ApiResult apiResult = new ApiResult();
        try {
            huiyuanDao.updateRecord(record);
            apiResult.success();
        } catch (Exception e) {
            apiResult.fail("更新志愿者审批记录失败");
        }
        return apiResult;
    }

    @Override
    public ApiResult getVolunteerApprovalRecord(String aoData, HuiyuanParam huiyuanParam) {
        ApiResult apiResult = new ApiResult();
        try {
            DataTablesParameters parameters = DataTablesParameters.fromJson(aoData);

            huiyuanParam.setSize(parameters.getRows());
            huiyuanParam.setOffset(parameters.getStart());

            Integer totalCount = huiyuanDao.getVolunteerApprovalRecordPageCount(huiyuanParam);

            List<VolunteerApprovalRecord> lv = huiyuanDao.getVolunteerApprovalRecord(huiyuanParam);

            apiResult.dataTable(parameters.getsEcho(), totalCount, lv);
            apiResult.success();
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
            apiResult.fail("获取志愿者审批记录失败");
        }
        return apiResult;
    }

    @Override
    public ApiResult getHuiyuan(Huiyuan huiyuan) {
        ApiResult apiResult = new ApiResult();
        try {
            Huiyuan result = huiyuanDao.selectByPrimaryKey(huiyuan.getId());
            apiResult.success(result);
        } catch (Exception e) {
            apiResult.fail("获取会员信息失败");
        }
        return apiResult;
    }

    @Override
    public ApiResult getActivities(String aoData, HuiyuanParam huiyuanParam) {
        ApiResult apiResult = new ApiResult();
        try {
            DataTablesParameters parameters = DataTablesParameters.fromJson(aoData);

            huiyuanParam.setSize(parameters.getRows());
            huiyuanParam.setOffset(parameters.getStart());

            Integer totalCount = huiyuanDao.getActivityPageCount(huiyuanParam);

            List<HuiyuanActivity> la = huiyuanDao.getActivityByHuiyuanId(huiyuanParam);

            apiResult.dataTable(parameters.getsEcho(), totalCount, la);
            apiResult.success();
        } catch (Exception e) {
            apiResult.fail("获取活动记录失败");
        }
        return apiResult;
    }

    @Override
    public ApiResult insertHuiyuan2(Huiyuan huiyuan) {
        ApiResult apiResult = new ApiResult();

        if (huiyuan.getCardNo() == null) {
            apiResult.lackParams("cardNo");
            return apiResult;
        } else {
            Huiyuan testUser = huiyuanDao.selectByCardNo(huiyuan.getCardNo());
            if (testUser != null) {
                apiResult.fail("您已经是会员，请刷新重试");
                return apiResult;
            }
        }

        if (huiyuan.getSex() == null) {
            apiResult.lackParams("sex");
            return apiResult;
        }


        if (huiyuan.getScopeId() == null) {
            apiResult.lackParams("scopeId");
            return apiResult;
        } else if (huiyuan.getScopeId() % 100 == 0 || huiyuan.getScopeId() % 10000 == 0){
            apiResult.fail("会员区域未精确到社区");
            return apiResult;
        }

        if (huiyuan.getMobile() == null) {
            apiResult.lackParams("mobile");
            return apiResult;
        }

        if (huiyuan.getHuiyuanType() == null) {
            apiResult.lackParams("huiyuanType");
            return apiResult;
        }

        return insertHuiyuan(huiyuan);
    }

    @Override
    public ApiResult getHuiyuanByCardNo(String cardNo) {
        ApiResult apiResult = new ApiResult();

        if (cardNo == null) {
            apiResult.lackParams("cardNo");
            return apiResult;
        }

        try {

            Huiyuan huiyuan = huiyuanDao.selectByCardNo(cardNo);

            apiResult.success(huiyuan);

        } catch (Exception e) {
            logger.error(e.getMessage(), e);
            apiResult.fail("");
        }
        return apiResult;
    }
}
