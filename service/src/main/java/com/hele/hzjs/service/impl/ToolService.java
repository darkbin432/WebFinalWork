package com.hele.hzjs.service.impl;


import com.hele.hzjs.model.Activity;
import com.hele.hzjs.model.ActivitySimple;
import com.hele.hzjs.model.OrganizationMember;
import com.hele.hzjs.model.OrganizationMemberSimple;
import com.hele.hzjs.model.param.ActivityParam;
import com.hele.hzjs.model.result.ApiResult;
import com.hele.hzjs.persistence.ActivityDao;
import com.hele.hzjs.persistence.OrganizationMemberDao;
import com.hele.hzjs.service.IToolService;
import com.hele.utils.GsonUtil;
import com.hele.utils.QrCodeUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cache.annotation.CacheConfig;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Caching;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 *  * @Author: hanbing
 */
@Service
@CacheConfig(cacheNames = {"userCache", "friendCircleCache"})
public class ToolService implements IToolService {

    private Logger logger = LoggerFactory.getLogger(this.getClass());

    @Resource
    private ActivityDao activityDao;

    @Resource
    private OrganizationMemberDao organizationMemberDao;

    /**
     * @param activityId 活动id
     * @return ApiResult
     */
    @Override
    public ApiResult getQrcodeByActivityId(Integer activityId) {

        ApiResult apiResult = new ApiResult();
        try {
            Activity activity = activityDao.getOne(activityId);

            if (activity != null) {
                ActivitySimple activitySimple = new ActivitySimple(activity);
                String base64String = QrCodeUtil.getBase64QRCode(GsonUtil.objectToJson(activitySimple));
                apiResult.success(
                        String.format("data:image/png;base64,%s",
                                 base64String)
                );
            } else {
                apiResult.success("无该活动");
            }

        } catch (Exception e) {
            logger.error(e.getMessage());
            apiResult.fail("二维码生成异常");
        }

        return apiResult;
    }

    @Override
    public ApiResult getQrcodeByOrganizationMemberId(Integer id) {

        ApiResult apiResult = new ApiResult();
        try {
            OrganizationMember organizationMember = organizationMemberDao.getOne(id);

            if (organizationMember != null) {
                OrganizationMemberSimple organizationMemberSimple = new OrganizationMemberSimple();
                organizationMemberSimple.setOrganizationMemberId(organizationMember.getId());
                organizationMemberSimple.setType("toFangShi");
                String base64String = QrCodeUtil.getBase64QRCode(GsonUtil.objectToJson(organizationMemberSimple));
                apiResult.success(
                        String.format("data:image/png;base64,%s", base64String)
                );
            } else {
                apiResult.success("无该用户");
            }

        } catch (Exception e) {
            logger.error(e.getMessage());
            apiResult.fail("二维码生成异常");
        }

        return apiResult;
    }

    @Override
    @Caching(
            evict = {
                    @CacheEvict(allEntries = true)
            }
    )
    public ApiResult refreshCache() {
        return new ApiResult();
    }
}
