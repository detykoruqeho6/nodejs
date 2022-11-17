const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../../package/mysql");
const { prefix } = require("../../config");

// 路由表
exports.Router = sequelize.define(
  "bac_Router",
  {
    // id主键,自增,非空,无符号,整型,长度10
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unsigned: true,
      comment: "路由id",
    },

    // name路由名,非空,长度20
    name: {
      type: DataTypes.STRING(20),
      allowNull: false,
      comment: "路由名",
    },

    // path路由路径,非空,长度20
    path: {
      type: DataTypes.STRING(20),
      allowNull: false,
      comment: "路由路径",
    },

    // component路由组件,非空,长度20
    component: {
      type: DataTypes.STRING(20),
      allowNull: false,
      comment: "路由组件",
    },

    // redirect路由重定向,长度20
    redirect: {
      type: DataTypes.STRING(20),
      comment: "路由重定向",
    },

    // meta路由元信息,json,非空,长度10
    // menu?: RouteMenu; // 菜单
    // title?: string; // 菜单标题
    // icon?: string; // 图标
    // auth?: boolean; //登录用户才能访问
    // guest?: boolean; //游客访问
    // hidden?: boolean; //是否隐藏
    // cache?: boolean; //是否缓存
    // affix?: boolean; //是否固定
    // breadcrumb?: boolean; //是否显示面包屑
    // enterClass?: string; //进入动画
    // leaveClass?: string; //离开动画
    // permission?: string[]; //权限验证标识
    meta: {
      type: DataTypes.JSON,
      allowNull: false,
      comment: "路由元信息",
    },

    // children路由子路由,json,非空,长度10
    children: {
      type: DataTypes.JSON,
      allowNull: false,
      comment: "路由子路由",
    },

    // status路由状态,非空,默认1,长度1
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },

    // sort路由排序,非空,默认1,长度1
    sort: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      comment: "路由排序",
    },

    // remark路由备注,长度34
    remark: {
      type: DataTypes.STRING(34),
      comment: "路由备注",
    },

    // parent_id父级id,非空,无符号,整型,长度10
    parent_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unsigned: true,
      comment: "父级id",
    },
  },
  {
    sequelize,
    charset: "utf8mb4",
    tableName: prefix + "bac_Router",
  }
);
