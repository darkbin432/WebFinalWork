package com.hele.hzjs.persistence;

import com.hele.hzjs.model.OrganizationMember;
import com.hele.hzjs.model.User;
import org.apache.ibatis.annotations.Param;

import java.util.HashMap;

/**
 * UserDao
 *
 * @author xuzou
 * @date 8/5/16
 * @copyright: copyright @ HeleTech 2016
 */
public interface UserDao {
    int insert(User model);

    int getMaxId();

    User getUser(@Param("username") String username);

    void updateInfo(User user);

    void updatePassword(@Param("username") String username, @Param("password") String password);

    OrganizationMember login(String username);

//    User findOne(HashMap<String, Object> search);
}
