package com.hznu.lwb.model.report;

import com.hznu.lwb.model.Entity;

/**
 * @author 斌
 */
public class OrganizationConstructionReport extends Entity {

    /**
     * 机构区域id
     */
    private Integer scopeId;

    /**
     * 上报人id
     */
    private Integer reportPersonId;

    /**
     * 是否归档
     */
    private Integer isFiled;

    /**
     * 行政区数量
     */
    private Integer xingzhengqsl;

    /**
     * 机构数量
     */
    private Integer jigousl;

    /**
     * 党组数量
     */
    private Integer dangzusl;

    /**
     * 党支部数量
     */
    private Integer dangzhibsl;

    /**
     * 入序
     */
    private Integer ruxu;

    /**
     * 参公
     */
    private Integer cangong;

    /**
     * 三定
     */
    private Integer sanding;

    /**
     * 内设机构数量
     */
    private Integer neishejgsl;

    /**
     * 机构建设-数量
     */
    private Integer jigoujssl;

    /**
     * 行政编制
     */
    private Integer xingzhengbz;

    /**
     * 事业编制
     */
    private Integer shiyebz;

    /**
     * 其他编制
     */
    private Integer qitabz;

    /**
     * 在编人员人数
     */
    private Integer zaibianryrs;

    /**
     * 在编人员女性人数
     */
    private Integer zaibianrynxsl;

    /**
     * 在编人员党员人数
     */
    private Integer zaibianrydysl;

    /**
     * 正厅
     */
    private Integer zhengting;

    /**
     * 副厅
     */
    private Integer futing;

    /**
     * 正处
     */
    private Integer zhengchu;

    /**
     * 副处
     */
    private Integer fuchu;

    /**
     * 正科
     */
    private Integer zhengke;

    /**
     * 副科
     */
    private Integer fuke;

    /**
     * 科员及以下
     */
    private Integer keyuanjyx;

    /**
     * 兼职聘用等其他人员数
     */
    private Integer jianzhipydqtrys;

    /**
     * 理事人数
     */
    private Integer lishirs;

    /**
     * 理事女性
     */
    private Integer lishinx;

    /**
     * 团体会员
     */
    private Integer tuantihy;

    /**
     * 个人会员人数
     */
    private Integer gerenhyrs;

    /**
     * 个人会员女性
     */
    private Integer gerenhynx;

    /**
     * 志愿者人数
     */
    private Integer zhiyuanzrs;

    /**
     * 志愿者队伍数
     */
    private Integer zhiyuanzdws;

    /**
     * 会员小组
     */
    private Integer huiyuanxz;

    /**
     * 会员之家
     */
    private Integer huiyuanzj;

    /**
     * 文化社团
     */
    private Integer wenhuast;

    /**
     * 活动阵地、社团-其他
     */
    private Integer huodongzdstqt;

    /**
     * 独立财务预算机构
     */
    private Integer dulicwysjg;

    /**
     * 本年度财政拨款额
     */
    private Float benniandczbke;

    /**
     * 基金会
     */
    private Integer jijinh;

    /**
     * 机关企事业计生协
     */
    private Integer jiguanqsyjsx;

    /**
     * 流动人口计生协
     */
    private Integer liudongrkjsx;

    private String organizationName;

    private Integer childStatus;

    private String scopeName;

    private String reportPersonName;


    public Integer getScopeId() {
        return scopeId;
    }

    public void setScopeId(Integer scopeId) {
        this.scopeId = scopeId;
    }

    public Integer getReportPersonId() {
        return reportPersonId;
    }

    public void setReportPersonId(Integer reportPersonId) {
        this.reportPersonId = reportPersonId;
    }

    public Integer getIsFiled() {
        return isFiled;
    }

    public void setIsFiled(Integer isFiled) {
        this.isFiled = isFiled;
    }

    public Integer getXingzhengqsl() {
        return xingzhengqsl;
    }

    public void setXingzhengqsl(Integer xingzhengqsl) {
        this.xingzhengqsl = xingzhengqsl;
    }

    public Integer getJigousl() {
        return jigousl;
    }

    public void setJigousl(Integer jigousl) {
        this.jigousl = jigousl;
    }

    public Integer getDangzusl() {
        return dangzusl;
    }

    public void setDangzusl(Integer dangzusl) {
        this.dangzusl = dangzusl;
    }

    public Integer getDangzhibsl() {
        return dangzhibsl;
    }

    public void setDangzhibsl(Integer dangzhibsl) {
        this.dangzhibsl = dangzhibsl;
    }

    public Integer getRuxu() {
        return ruxu;
    }

    public void setRuxu(Integer ruxu) {
        this.ruxu = ruxu;
    }

    public Integer getCangong() {
        return cangong;
    }

    public void setCangong(Integer cangong) {
        this.cangong = cangong;
    }

    public Integer getSanding() {
        return sanding;
    }

    public void setSanding(Integer sanding) {
        this.sanding = sanding;
    }

    public Integer getNeishejgsl() {
        return neishejgsl;
    }

    public void setNeishejgsl(Integer neishejgsl) {
        this.neishejgsl = neishejgsl;
    }

    public Integer getJigoujssl() {
        return jigoujssl;
    }

    public void setJigoujssl(Integer jigoujssl) {
        this.jigoujssl = jigoujssl;
    }

    public Integer getXingzhengbz() {
        return xingzhengbz;
    }

    public void setXingzhengbz(Integer xingzhengbz) {
        this.xingzhengbz = xingzhengbz;
    }

    public Integer getShiyebz() {
        return shiyebz;
    }

    public void setShiyebz(Integer shiyebz) {
        this.shiyebz = shiyebz;
    }

    public Integer getQitabz() {
        return qitabz;
    }

    public void setQitabz(Integer qitabz) {
        this.qitabz = qitabz;
    }

    public Integer getZaibianryrs() {
        return zaibianryrs;
    }

    public void setZaibianryrs(Integer zaibianryrs) {
        this.zaibianryrs = zaibianryrs;
    }

    public Integer getZaibianrynxsl() {
        return zaibianrynxsl;
    }

    public void setZaibianrynxsl(Integer zaibianrynxsl) {
        this.zaibianrynxsl = zaibianrynxsl;
    }

    public Integer getZaibianrydysl() {
        return zaibianrydysl;
    }

    public void setZaibianrydysl(Integer zaibianrydysl) {
        this.zaibianrydysl = zaibianrydysl;
    }

    public Integer getZhengting() {
        return zhengting;
    }

    public void setZhengting(Integer zhengting) {
        this.zhengting = zhengting;
    }

    public Integer getFuting() {
        return futing;
    }

    public void setFuting(Integer futing) {
        this.futing = futing;
    }

    public Integer getZhengchu() {
        return zhengchu;
    }

    public void setZhengchu(Integer zhengchu) {
        this.zhengchu = zhengchu;
    }

    public Integer getFuchu() {
        return fuchu;
    }

    public void setFuchu(Integer fuchu) {
        this.fuchu = fuchu;
    }

    public Integer getZhengke() {
        return zhengke;
    }

    public void setZhengke(Integer zhengke) {
        this.zhengke = zhengke;
    }

    public Integer getFuke() {
        return fuke;
    }

    public void setFuke(Integer fuke) {
        this.fuke = fuke;
    }

    public Integer getKeyuanjyx() {
        return keyuanjyx;
    }

    public void setKeyuanjyx(Integer keyuanjyx) {
        this.keyuanjyx = keyuanjyx;
    }

    public Integer getJianzhipydqtrys() {
        return jianzhipydqtrys;
    }

    public void setJianzhipydqtrys(Integer jianzhipydqtrys) {
        this.jianzhipydqtrys = jianzhipydqtrys;
    }

    public Integer getLishirs() {
        return lishirs;
    }

    public void setLishirs(Integer lishirs) {
        this.lishirs = lishirs;
    }

    public Integer getLishinx() {
        return lishinx;
    }

    public void setLishinx(Integer lishinx) {
        this.lishinx = lishinx;
    }

    public Integer getTuantihy() {
        return tuantihy;
    }

    public void setTuantihy(Integer tuantihy) {
        this.tuantihy = tuantihy;
    }

    public Integer getGerenhyrs() {
        return gerenhyrs;
    }

    public void setGerenhyrs(Integer gerenhyrs) {
        this.gerenhyrs = gerenhyrs;
    }

    public Integer getGerenhynx() {
        return gerenhynx;
    }

    public void setGerenhynx(Integer gerenhynx) {
        this.gerenhynx = gerenhynx;
    }

    public Integer getZhiyuanzrs() {
        return zhiyuanzrs;
    }

    public void setZhiyuanzrs(Integer zhiyuanzrs) {
        this.zhiyuanzrs = zhiyuanzrs;
    }

    public Integer getZhiyuanzdws() {
        return zhiyuanzdws;
    }

    public void setZhiyuanzdws(Integer zhiyuanzdws) {
        this.zhiyuanzdws = zhiyuanzdws;
    }

    public Integer getHuiyuanxz() {
        return huiyuanxz;
    }

    public void setHuiyuanxz(Integer huiyuanxz) {
        this.huiyuanxz = huiyuanxz;
    }

    public Integer getHuiyuanzj() {
        return huiyuanzj;
    }

    public void setHuiyuanzj(Integer huiyuanzj) {
        this.huiyuanzj = huiyuanzj;
    }

    public Integer getWenhuast() {
        return wenhuast;
    }

    public void setWenhuast(Integer wenhuast) {
        this.wenhuast = wenhuast;
    }

    public Integer getHuodongzdstqt() {
        return huodongzdstqt;
    }

    public void setHuodongzdstqt(Integer huodongzdstqt) {
        this.huodongzdstqt = huodongzdstqt;
    }

    public Integer getDulicwysjg() {
        return dulicwysjg;
    }

    public void setDulicwysjg(Integer dulicwysjg) {
        this.dulicwysjg = dulicwysjg;
    }

    public Float getBenniandczbke() {
        return benniandczbke;
    }

    public void setBenniandczbke(Float benniandczbke) {
        this.benniandczbke = benniandczbke;
    }

    public Integer getJijinh() {
        return jijinh;
    }

    public void setJijinh(Integer jijinh) {
        this.jijinh = jijinh;
    }

    public Integer getJiguanqsyjsx() {
        return jiguanqsyjsx;
    }

    public void setJiguanqsyjsx(Integer jiguanqsyjsx) {
        this.jiguanqsyjsx = jiguanqsyjsx;
    }

    public Integer getLiudongrkjsx() {
        return liudongrkjsx;
    }

    public void setLiudongrkjsx(Integer liudongrkjsx) {
        this.liudongrkjsx = liudongrkjsx;
    }

    public String getOrganizationName() {
        return organizationName;
    }

    public void setOrganizationName(String organizationName) {
        this.organizationName = organizationName;
    }

    public Integer getChildStatus() {
        return childStatus;
    }

    public void setChildStatus(Integer childStatus) {
        this.childStatus = childStatus;
    }

    public String getScopeName() {
        return scopeName;
    }

    public void setScopeName(String scopeName) {
        this.scopeName = scopeName;
    }

    public String getReportPersonName() {
        return reportPersonName;
    }

    public void setReportPersonName(String reportPersonName) {
        this.reportPersonName = reportPersonName;
    }
}
