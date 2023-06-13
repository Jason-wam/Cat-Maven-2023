#### 资源猫自定义 视频源|直播源格式的简单示例

```
{
  "id": "e08716d6578fc25cd8297db383e82acc",
  "name": "电视直播",
  "image": "http://picture.ik123.com/uploads/allimg/180106/4-1P106094325.jpg",
  "subtitle": "2023-05-18 20:11 / 直播源 / 全球直播",
  "description": "一些从网络上收集的电视直播，可能不定时失效。",
  "sources": [
    {
      "id": "e08716d6578fc25cd8297db383e82001",
      "sort": 0,
      "name": "国内频道",
      "videoDataList": [
        {
          "id": "ddba0db4e7204e5d9e4295eb6588b2bf",
          "name": "CCTV+ 1 (600p) [Not 24/7]",
          "url": "https://cd-live-stream.news.cctvplus.com/live/smil:CHANNEL1.smil/playlist.m3u8",
          "type": "Direct",
          "isLive": true
        },
        {
          "id": "e854ccf0ab62fcbd8824e108d672df20",
          "name": "CCTV+ 2 (600p) [Not 24/7]",
          "url": "https://cd-live-stream.news.cctvplus.com/live/smil:CHANNEL2.smil/playlist.m3u8",
          "type": "Direct",
          "isLive": true
        },
        {
          "id": "156f330d0c156c609dc87c9d77bc0d77",
          "name": "CCTV-4 Asia (576p)",
          "url": "http://210.210.155.37/qwr9ew/s/s19/index.m3u8",
          "type": "Direct",
          "isLive": true
        },
        {
          "id": "a072fe6954466db2c94e14714a86b7c4",
          "name": "万州三峡移民 (576p) [Not 24/7]",
          "url": "http://123.146.162.24:8013/tslslive/PU2vzMI/hls/live_sd.m3u8",
          "type": "Direct",
          "isLive": true
        },
        {
          "id": "c519a4c5ac648d9208cc179fc6c3332e",
          "name": "万州影视 (576p) [Not 24/7]",
          "url": "http://123.146.162.24:8013/tslslive/vWlnEzU/hls/live_sd.m3u8",
          "type": "Direct",
          "isLive": true
        }
      ]
    }
  ]
}

 //注：所有的Id都必须是唯一的。
```

##### 导入方式
```
创建的音频源可以命名为 *.vdv.json或 *.vdv，然后选择资源猫打开即可。 （vdv = videocat video）

同时支持使用Intent或URI协议调用资源猫打开:

videocat://video/view?url=http%3A%2F%2F192.168.0.5%3A8080%2Flocal

url建议使用URL编码

html中调用：
 <a href="videocat://audio/url?url=http%3A%2F%2F192.168.0.5%3A8080%2Flocal">调用示例</a> 
 ```

#### 其他

##### 播放链接类型
```
Type {
     Direct, Sniff, WebView, Decode, Regex, Uri
}
    
Direct:  直接调用APP内部播放器播放

Sniff:   APP自动嗅探网站播放页视频,嗅探规则请看下文

WebView: 直接调用APP内部浏览器打开播放

Decode:
需要解析接口支持，
<链接格式    ： http://解析接口/url?=视频地址> 
<成功JSON格式： {code:200    , url="播放地址"} > //成功必须返回200
<失败JSON格式： {code:错误码 , msg:"错误信息"} >

Regex：使用正则从网页源码中抓取播放地址，例如：(http://xxx.com/.*?.mp4) ,默认从结果中获取第一个作为播放地址

Uri：设备本地文件，content或file路径地址
```

##### 嗅探规则（Sniff规则）
###### 01.举个栗子：
```
规则             ->>>  "start:http > contain:video.weibocdn.com > contain:.mp4"
匹配对应媒体链接 ->>>  https://f.video.weibocdn.com/VZ8y4bATlx07MWiZlXuo0104120j4ZMY0E070.mp4
规则解析         ->>>  链接必须以http开头，链接必须包含video.weibocdn.com，链接必须包含.mp4
```
###### 02.再举个栗子
```
规则              ->>>  "host:www.baidu.com > contain:video > end:.mp4"
匹配对应媒体链接  ->>>  https://www.baidu.com/video/VZ8y4bATlx07MWiZlXuo0104120j4ZMY0E070.mp4
规则解析          ->>>  链接域名必须是www.baidu.com，链接必须包含video，链接必须包含.mp4
```
###### 规则解释
```
host:      ->>匹配指定域名
start:     ->>匹配指定开头
end:       ->>匹配指定结尾
contain:   ->>匹配包含指定字符串
clear:     ->> <clear: 字符串,clear: 正则表达式，用于清除指定字符串，如果放在开头则匹配清除后的链接，如果放在结尾则清除匹配到的链接中的指定字符串>

!host:     ->>排除指定域名
!start:    ->>排除指定开头
!end:      ->>排除指定结尾
!contain:  ->>排除包含指定字符串

PS: 每个规则必须以 > 号分割
PS: 软件优先执行嗅探规则，如果没有填写规则软件将自动匹配媒体

//每个规则都可以是多次使用的，例如可以是多个contain ->>> contain:video.weibocdn.com > contain:.mp4
//规则也可以加上!<小写感叹号>号取反：例如 ->> !contain ,代表不能包含指定字符串。!end ,代表不能以某字符串开头，!host排除指定域名
```
