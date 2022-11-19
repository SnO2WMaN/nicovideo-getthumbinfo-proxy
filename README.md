# nicovideo-getthumbinfo-proxy

Convert XML result to JSON result for [`http://ext.nicovideo.jp/api/getthumbinfo/sm41362383`](http://ext.nicovideo.jp/api/getthumbinfo/sm41379870)

## Usage

```shell
http `https://nicovideo-gti-proxy.deno.dev/sm41362383`
```

### Result

example

```json
{
    "comments": 26,
    "id": "sm41362383",
    "length": 36,
    "mylists": 38,
    "tags": [
        {
            "locked": true,
            "value": "音MAD"
        },
        {
            "locked": false,
            "value": "ぼっち・ざ・まっど!"
        },
        {
            "locked": false,
            "value": "ぼっち・ざ・ろっく!"
        }
    ],
    "thumbnail_url": {
        "large": "http://nicovideo.cdn.nimg.jp/thumbnails/41362383/41362383.53585872.L",
        "original": "http://nicovideo.cdn.nimg.jp/thumbnails/41362383/41362383.53585872"
    },
    "title": "ぼっち・ざ・がらーじ",
    "uploaded_at": "2022-11-12T07:43:02.000Z",
    "user": {
        "icon_url": "https://secure-dcdn.cdn.nimg.jp/nicoaccount/usericon/defaults/blank_s.jpg",
        "id": 126591954,
        "nickname": "？。"
    },
    "views": 2287,
    "watch_url": "https://www.nicovideo.jp/watch/sm41362383"
}
```

## Reference

[![sm41362383](https://nicothumb2img.vercel.app/image/sm41362383)](https://nico.ms/sm41362383)
