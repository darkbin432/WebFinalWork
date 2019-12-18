package com.hele.hzjs.persistence;

import com.hele.hzjs.model.OfficialDocument;
import com.hele.hzjs.model.param.OfficialDocumentParam;

import java.util.List;

public interface OfficialDocumentDao {

    Integer deleteByPrimaryKey(Integer id);

    Integer insertSelective(OfficialDocument record);

    OfficialDocument selectByPrimaryKey(Integer id);

    Integer getPageCount(OfficialDocumentParam param);

    List<OfficialDocument> selectByCondition(OfficialDocumentParam param);

    Integer updateByPrimaryKeySelective(OfficialDocument record);
}