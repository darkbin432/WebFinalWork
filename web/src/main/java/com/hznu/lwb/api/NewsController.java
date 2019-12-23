package com.hznu.lwb.api;

import com.hznu.lwb.model.News;
import com.hznu.lwb.model.param.NewsParam;
import com.hznu.lwb.model.result.ApiResult;
import com.hznu.lwb.service.INewsService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;

/**
 * @author 斌
 */
@Controller
@RequestMapping("/api")
public class NewsController {

    @Resource
    INewsService newsService;

    @RequestMapping(value = "/insertNews", method = RequestMethod.POST)
    @ResponseBody
    public ApiResult insertNews(News news){
        return newsService.insert(news);
    }

    @RequestMapping(value = "/deleteNews", method = RequestMethod.POST)
    @ResponseBody
    public ApiResult deleteNews(Integer id){
        return newsService.delete(id);
    }

    @RequestMapping(value = "/updateNews", method = RequestMethod.POST)
    @ResponseBody
    public ApiResult updateNews(News news){
        return newsService.update(news);
    }

    @RequestMapping(value = "/selectOneNews", method = RequestMethod.POST)
    @ResponseBody
    public ApiResult selectOneNews(Integer id){
        return newsService.selectById(id);
    }

    @RequestMapping(value = "/selectList", method = RequestMethod.POST)
    @ResponseBody
    public ApiResult selectList(NewsParam newsParam){
        return newsService.selectByPage(newsParam);
    }

    @RequestMapping(value = "/selectByCondition", method = RequestMethod.POST)
    @ResponseBody
    public ApiResult selectByCondition(NewsParam newsParam){
        return newsService.selectByCondition(newsParam);
    }
}
