package com.hele.hzjs.persistence;

import com.hele.hzjs.model.Project;

import java.util.List;

/**
 * @Auther: Xueht
 * @Date: Create in 20:28 2019/3/25
 */
public interface ProjectDao {

    Project getOne(Integer id);

    List<Project> selectAll();
}
