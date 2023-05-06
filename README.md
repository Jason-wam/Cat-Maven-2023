# Cat-Maven-2023
资源猫用到的相关数据集

``
videocat://subscribe/add?url=http%3A%2F%2F192.168.0.5%3A8080%2Fsearchers
``

[测试添加订阅](https://jason-wam.github.io/Cat-Maven-2023/const/intent.html)

# 资源猫相关文档

### 如何自定义搜索源
#### 01.自定义苹果CMS搜索源
苹果CMS搜索源示例：
```
    {
      "id": "cj.xx.com",
      "name": "xx资源网",
      "charset": "utf-8",
      "summary": "修订日期：2022-03-03",
      "api": "http://www.xx.com/inc/api.php/provide/vod/at/xml",
      "sort": 25,
      "proxy": "http:\/\/www.xxx.com:8080\/?url=",
      "usePCUserAgent": true,
      
      "dtEntities": [
        {
          "id": "xxm3u8",
          "sort": 0,
          "name": "在线播放",
          "type": "Direct",
          "canDownload": true
        },
        {
          "id": "xxyun",
          "sort": 1,
          "name": "云播放",
          "type": "WebView"
        }
      ]
    }
```
苹果CMS搜索源带注释：
```
    {
      "id": "cj.xx.com",                             //id在你的搜索源列表必须是唯一的，这里建议使用域名
      "name": "xx资源网",                            //软件中显示的站源名称
      "charset": "utf-8",                           //网页编码，绝大部分为utf-8
      "summary": "修订日期：2022-03-03",             //可自行定义介绍或版本标识
      "api": "http://www.xx.com/inc/api.php/provide/vod/at/xml",   //苹果cms开放API裁剪地址 [支持JSON格式的API]
      "sort": 25,                                   //搜索源在软件和搜索结果中的排序优先级，数值越小越靠前
      "proxy": "http:\/\/www.xxx.com:8080\/?url=",  //请求代理CURL地址，软件会自动在代理地址后拼接请求地址
      "usePCUserAgent": true,   //是否使用电脑User-Agent[模拟电脑请求]，根据实际需求设置，默认为true，否则false
      
      "headers":{  //可空，搜索时将自动加入header
          "User-Agent": "xxxx",
          "User-Agent": "xxxx"
       },
      
      "dtEntities": [           //苹果CMS播放线路，可为多个线路
        {
          "id": "xxm3u8",       //线路ID[唯一]，请根据实际采集地址网页源码内的id填写，例如 <dt>xxyun,xxm3u8</dt>
          "sort": 0,            //线路排序，数值越小越靠前
          "name": "在线播放",    //播放线路名称
          "type": "Direct",     //链接类型[Direct, Sniff, WebView, Decode, Regex, Uri]，具体类型请看文档后方详解
          "prefix":""           //播放地址前缀补充，默认为空，通常type为Decode时作为解析地址使用
          "sniffRules":["",""]  //可空[仅适用于Sniff类型]，不填写则软件自动嗅探，嗅探规则见下方文档
          "canDownload": true   //是否支持下载，软件通过调用IDM+下载，支持m3u8
          "isLive": false        //是否是直播，默认为false，软件会根据是否是直播切换不同播放器UI界面
        },
        {
          "id": "xxyun",        //线路ID
          "sort": 1,
          "name": "云播放",
          "type": "WebView"     //这里的WebView意味着调用软件内置浏览器打开播放
        }
      ]
    }
```

#### 02.自定义WEB搜索源[较难]，支持[Jsoup,XPath,JSONPath]
WEB搜索源示例：
```
    {
      "id": "sakura-comic",
      "sort": 29,
      "host": "http:\/\/www.yinghuacd.com\/",
      "name": "樱花动漫",
      "charset": "utf-8",
      "summary": "修订日期：2022-03-03",
      "searchUrl": "search\/{wd}\/?page={pg}",
      "resListRule": "div.lpic > ul > li",
      "resNameRule": "h2 > a > @text",
      "resNoteRule": "span > @index(0) > @text",
      "resCoverRule": "a > img > @attr(src)",
      "resDetailUrlRule": "h2 > a > @attr(href)",
      
      "detailNameRule": "h1 > @text",
      "detailDateRule": "div.sinfo > span:nth-child(1) > a > @text",
      "detailTypeRule": "div.sinfo > span:nth-child(3) > a > @text",
      "detailAreaRule": "div.sinfo > span:nth-child(2) > a > @text",
      "detailNoteRule": "div.sinfo > p > @text",
      "detailCoverRule": "div.thumb.l > img > @attr(src)",
      "detailDescriptionRule": "div.info > @text",
      "playRuleEntities": [
        {
          "id": "0",
          "sort": 0,
          "name": "播放列表",
          "itemListRule": "div.movurl > ul > li",
          "itemURLRule": "a > @attr(href)",
          "itemNameRule": "a > @text",
          "type": "Regex",
          "regexURLFinder": "data-vid=\"(.*?)\\$"
        }
      ]
    }
```
Web搜索源带注释：
```
    {
      "id": "sakura-comic", //搜索源id[唯一]
      "sort": 29,                              
      "host": "http://www.yinghuacd.com/",      //搜索源host地址，如果搜索结果中的链接或图片地址不完整，程序会自动根据此地址补全。
      "name": "樱花动漫",                        //搜索源名称
      "charset": "utf-8",                       //网页编码
      "summary": "修订日期：2022-03-03",         //简介或版本信息
      "searchUrl": "search\/{wd}\/?page={pg}",  //搜索api，不可为空。程序会自动根据host补全，也可以使用完整的搜索地址。wd会被替换为关键词，page会被替换为第几页[page可固定]。
      
      //搜索规则
      "resListRule": "div.lpic > ul > li",      //搜索结果列表规则，不可为空。 结果类型 [List<String>]
      "resNameRule": "h2 > a > @text",          //搜索结果标题规则，不可为空。 结果类型 [String]
      "resCoverRule": "a > img > @attr(src)",               //媒体封面地址规则，可空 [暂未用到]。 结果类型 [String]
      "resTypeRule": "span > @index(1) > @clear(类型： )",  //媒体信息类型规则，可空。 结果类型 [String]
      "resNoteRule": "span > @index(0) > @text",            //媒体信息规则，可空。 结果类型 [String]
      "resDateRule": "",                     //日期规则，可空。 结果类型 [String] 
      "resActorRule": "",                    //演员规则，可空。 结果类型 [String] ，有助于资源相关度筛选，建议填写
      "resDirectorRule": "",                 //导演规则，可空。 结果类型 [String] ，有助于资源相关度筛选，建议填写
      "resDetailUrlRule": "h2 > a > @attr(href)",           //媒体详情页地址规则，不可为空[无结果则程序不显示]。 结果类型 [String]
      "resDetailUrlPrefix": "",                             //媒体详情页地址前缀补全，可空且默认为空。
      
      //详情页规则
      "detailNameRule": "h1 > @text", //详情页标题规则 [String]
    
    [  这几个规则都是按需填写，软件会自动拼接成副标题，实际打乱规则顺序无影响
      "detailDateRule": "div.sinfo > span:nth-child(1) > a > @text", //详情页日期规则 [String]
      "detailTypeRule": "div.sinfo > span:nth-child(3) > a > @text", //详情页类型规则 [String]
      "detailAreaRule": "div.sinfo > span:nth-child(2) > a > @text", //详情页地区规则 [String]
      "detailNoteRule": "div.sinfo > p > @text",                     //详情页简略信息规则 [String]
      "detailCoverRule": "div.thumb.l > img > @attr(src)",           //详情页封面图片规则 [String]
     ]
    
      "detailDescriptionRule": "div.info > @text",                   //详情页媒体简介规则 [String]
      
      "playRuleEntities": [ //播放线路规则，可以是多个线路
        {
          "id": "0", //线路id，不同于苹果CMS，这里的id自定义即可，不重复就行
          "sort": 0, //线路排序，越小越靠前
          "name": "播放列表",
          "itemListRule": "div.movurl > ul > li",  //播放列表规则，查询结果为List<String> >>例如：多个 <li><a href="http...xxx.html">第*集</a></li>
          "itemURLRule": "a > @attr(href)",        //播放列表子项标题规则 [String] 例如：从 <a href="xxx.html">第*集</a> 取出 第*集
          "itemNameRule": "a > @text",             //播放列表子项地址规则 [String] 例如：从 <a href="xxx.html">第*集</a> 取出 http...xxx.html
          "type": "Regex",                         //播放地址类型
          "regexURLFinder": "data-vid=\"(.*?)\\$"  //正则匹配播放地址[仅适用于Regex地址类型]
        }
      ]
    }
```
```
注：XPath规则需要在规则前加上    @XPath:  或  //      ， @XPath: 会被软件自动替换为 //
注：JSONPath规则需要在规则前加上 @JSON:   或  $.      ， @JSON:  会被软件自动替换为  $.
注：正则规则需要在规则前加上     @Regex:              ， @Regex: 会被软件自动移除
注：JSOUP规则无需添加前缀                    ，
```


2) 自定义数据源
3) 自定义音频源
4) 如何导入资源
