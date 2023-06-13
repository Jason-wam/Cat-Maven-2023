### 创建自定义歌单|音频源格式的简单示例

```
{
  "id": "3392507118",
  "name": "翻唱老歌｜新声演绎，别有风味",
  "sources": [
    {
      "id": "339250711801",
      "name": "翻唱老歌｜新声演绎，别有风味",
      "image": "https://img1.kuwo.cn/star/userpl2015/27/81/1660725544320_577690227_150.jpg",
      "background": "",
      "description": "就让往事随风，静心聆听",
      "audioList": [
        {
          "id": "dcd4177e9531e4b484050bceb4c67cec",
          "url": "http://192.168.0.140:8080/dcd4177e9531e4b484050bceb4c67cec.mp3",
          "name": "往事随风(Live)",
          "image": "https://img2.kuwo.cn/star/albumcover/500/40/50/3085924338.jpg",
          "album": "蒙面唱将猜猜猜第二季 中秋特辑",
          "artist": "吉克隽逸",
          "isLive": false
        },
        {
          "id": "1c2da71095fe14f9331c71bac863937c",
          "url": "http://192.168.0.140:8080/1c2da71095fe14f9331c71bac863937c.mp3",
          "name": "太多",
          "image": "https://img1.kuwo.cn/star/albumcover/500/54/70/2356835387.jpg",
          "album": "情留感（1）",
          "artist": "米雅",
          "isLive": false
        }
      ]
    },
    {
      "id": "339250711802",
      "name": "频道2",
      "image": "https://img1.kuwo.cn/star/userpl2015/27/81/1660725544320_577690227_150.jpg",
      "background": "",
      "description": "Sources中的第二个频道",
      "audioList": [
        {
          "id": "dcd4177e9531e4b484050bceb4c67cec",
          "url": "http://192.168.0.140:8080/dcd4177e9531e4b484050bceb4c67cec.mp3",
          "name": "往事随风(Live)",
          "image": "https://img2.kuwo.cn/star/albumcover/500/40/50/3085924338.jpg",
          "album": "蒙面唱将猜猜猜第二季 中秋特辑",
          "artist": "吉克隽逸",
          "isLive": false
        }
      ]
    }
  ]
}
```
创建的音频源可以命名为 *.vda.json或 *.vda，然后选择资源猫打开即可

同时支持使用Intent或URI协议调用资源猫打开:
```
videocat://audio/view?url=http%3A%2F%2F192.168.0.5%3A8080%2Flocal

url建议使用URL编码

html中调用：<a href="videocat://audio/url?url=http%3A%2F%2F192.168.0.5%3A8080%2Flocal">调用示例</a>
```
