package com.hznu.lwb.persistence;

import com.hznu.lwb.model.User;
import com.hznu.utils.MD5Util;
import com.hznu.utils.UUIDGenerator;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;

import javax.annotation.Resource;
import java.util.HashMap;

/**
 * AppointmentDaoTest
 *
 * @author xuzou
 * @date 6/15/16
 * @copyright: copyright @ hznuTech 2016
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {"classpath:applicationContext.xml"})
@WebAppConfiguration
public class UserDaoTest {
    @Resource
    private UserDao dao;

    @Before
    public void setUp() {
    }

    @After
    public void tearDown() {
    }


    @Test
    public void testInsert() {
//        User model = new User();
//
//        model.setCode(UUIDGenerator.getUUID());
//        model.setName("august1");
//        model.setPassword(MD5Util.md5Encrypt("123456"));
//        int id  = dao.insert(model);
    }

    @Test
    public void testValidate() {
//        String loginName = "13656634693";
//
//        String password = MD5Util.md5Encrypt("123456");
//
//        User model = dao.validate(loginName,password);
//
    }

    @Test
    public void testFindOne() {
//        HashMap<String,Object> search = new HashMap<>();
//        search.put("name","august");
//        search.put("password",MD5Util.md5Encrypt("123456"));
//
//        User model = dao.findOne(search);
//
    }
}
