const router = require("express").Router();

router.get("/index", (req, res) => {
  const { cateid, key } = req.query;
  if (key) {
    COMMON.error(res, null, "非法参数");
  } else {
    const data = [
      {
        id: 1,
        cate: {
          title: "新闻",
          id: 1,
        },
        title: "欸嘿我是新闻1,看我看我 ",
        content: `世界足坛的“梅罗时代”是不是真的结束了？在球场上，梅西和C罗已经不再是绝对的统治者；在足坛奖项的竞争上，也不再都是他们的名字；而如今，在足坛球员的年收入上，他们也被超越。近日，福布斯公布了世界足球运动员2022年的收入排行榜，姆巴佩以1.28亿美元超越了梅西和C罗，成为了世界足坛年度收入最高的球员。`,
        coverImg: "https://temp.im/754x754",
        date: "2021-09-17 10:00:00",
      },
      {
        id: 2,
        title: "看到了,看到了,别叫了 ",
        cate: {
          title: "新闻",
          id: 1,
        },
        content:
          "此外，在国际拳坛，前羽量级世界拳王徐灿的回归之战在美国坦帕打响，徐灿与墨西哥对手贝尼特斯血战十回合，最终以分歧判定遗憾告负。",
        coverImg: "https://temp.im/288x288",
        date: "2021-09-17 10:00:00",
      },
      {
        id: 3,
        title: "OK兄弟们,全体目光向我看齐",
        cate: {
          title: "新闻",
          id: 2,
        },
        content:
          "此外，在国际拳坛，前羽量级世界拳王徐灿的回归之战在美国坦帕打响，徐灿与墨西哥对手贝尼特斯血战十回合，最终以分歧判定遗憾告负。",
        coverImg: "https://temp.im/288x288",
        date: "2021-09-17 10:00:00",
      },
      {
        id: 4,
        title: "假装看不见,假装看不见",
        cate: {
          title: "新闻",
          id: 3,
        },
        content:
          "此外，在国际拳坛，前羽量级世界拳王徐灿的回归之战在美国坦帕打响，徐灿与墨西哥对手贝尼特斯血战十回合，最终以分歧判定遗憾告负。",
        coverImg: "https://temp.im/288x288",
        date: "2021-09-17 10:00:00",
      },
      {
        id: 5,
        title: "阿拉阿拉",
        cate: {
          title: "新闻a",
          id: 4,
        },
        content:
          "此外，在国际拳坛，前羽量级世界拳王徐灿的回归之战在美国坦帕打响，徐灿与墨西哥对手贝尼特斯血战十回合，最终以分歧判定遗憾告负。",
        coverImg: "https://temp.im/288x288",
        date: "2021-09-17 10:00:00",
      },
    ];
    let result = data.filter((item) => item.cate.id == cateid);
    if (!cateid) {
      result = data.filter((item) => item.cate.id == 1);
    }
    COMMON.success(res, result, "halo啊,咳咳卡痰了");
  }
});

module.exports = router;
