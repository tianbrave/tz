# tz

## 1.简介

移动手机号抓取


## 2.功能
- 抓取手机
    `httpDemo.js`
    ```
    sh httpDemo_start.sh
    ```

- 分析手机号
    `findGoodNumber.js`
    ```
    node findGoodNumber.js
    ```
    查看手机号
    ```
    db.phoneNumber.find({rule1:{$lte:4}},{phoneNum:1,rule2:1}).sort({_id:-1})
    ```

## 3.部署
- 仓库:
    ```
    git remote add origin https://github.com/tianbrave/tz.git
    ```

- 运行环境:
    ```
    node 版本 9.6.1 以上
    mogno 4.0.0以上
    ```




