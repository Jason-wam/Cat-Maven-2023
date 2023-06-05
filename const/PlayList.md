###创建自定义歌单|音频源格式的简单示例

```
{
  "id": "3392507118", //id必须唯一
  "name": "翻唱老歌｜新声演绎，别有风味",
  "sources": [ //sources可以包含多个子项
    {
      "id": "339250711801", //id必须唯一
      "name": "翻唱老歌｜新声演绎，别有风味",
      "image": "https:\/\/img1.kuwo.cn\/star\/userpl2015\/27\/81\/1660725544320_577690227_150.jpg",
      "background": "",
      "description": "就让往事随风，静心聆听",
      "audioList": [
        {
          "id": "dcd4177e9531e4b484050bceb4c67cec", //id必须唯一
          "url": "http:\/\/192.168.0.140:8080\/dcd4177e9531e4b484050bceb4c67cec.mp3", //音频直链播放地址
          "name": "往事随风(Live)",
          "image": "https:\/\/img2.kuwo.cn\/star\/albumcover\/500\/40\/50\/3085924338.jpg",
          "album": "蒙面唱将猜猜猜第二季 中秋特辑",
          "artist": "吉克隽逸",
          "isLive": false
        },
        {
          "id": "1c2da71095fe14f9331c71bac863937c", //id必须唯一
          "url": "http:\/\/192.168.0.140:8080\/1c2da71095fe14f9331c71bac863937c.mp3",
          "name": "太多",
          "image": "https:\/\/img1.kuwo.cn\/star\/albumcover\/500\/54\/70\/2356835387.jpg",
          "album": "情留感（1）",
          "artist": "米雅",
          "isLive": false
        }
      ]
    }
  ]
}
```
创建的音频源可以命名为 *.vdv.json或 *.vdv，然后选择资源猫打开即可
