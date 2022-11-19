import { oakCors } from "cors/mod.ts";
import { Application, Router } from "oak/mod.ts";
import { parse as parseXML } from "xml/mod.ts";
import { z } from "zod/mod.ts";

const app = new Application();
const router = new Router();

const schema = z.union([
  z.object({ "@status": z.literal("fail") }),
  z.object({
    "@status": z.literal("ok"),
    thumb: z.object({
      video_id: z.string(),
      title: z.string(),
      thumbnail_url: z.string(),
      watch_url: z.string(),
      length: z.string(),
      user_id: z.number(),
      user_nickname: z.string(),
      user_icon_url: z.string(),
      view_counter: z.number(),
      comment_num: z.number(),
      mylist_counter: z.number(),
      first_retrieve: z.preprocess(
        (arg) => {
          if (typeof arg == "string" || arg instanceof Date) {
            return new Date(arg);
          }
        },
        z.date(),
      ),
      tags: z.object({
        tag: z.array(
          z.union([
            z.string(),
            z.object({
              "@lock": z.literal(1),
              "#text": z.string(),
            }),
          ]),
        ),
      }),
    }),
  }),
]);

router.get("/:id", async ({ params, response }) => {
  const result = await fetch(`http://ext.nicovideo.jp/api/getthumbinfo/${params.id}`);
  const xml = await result.text();
  const parsedXML = parseXML(xml);
  const parsedResult = schema.safeParse(parsedXML.nicovideo_thumb_response);

  if (!parsedResult.success) {
    return { ok: false, error: { status: 404 } };
  }
  if (parsedResult.data["@status"] === "fail") {
    return { ok: false, error: { status: 404 } };
  }

  const {
    data: {
      thumb: {
        video_id,
        watch_url,
        thumbnail_url,
        first_retrieve,
        title,
        tags,
        length,
        user_id,
        user_icon_url,
        user_nickname,
        view_counter,
        comment_num,
        mylist_counter,
      },
    },
  } = parsedResult;

  const normalizedTags = tags.tag.map((tag) => {
    if (typeof tag !== "string") return ({ locked: true, value: tag["#text"] });
    else return ({ locked: false, value: tag });
  });
  const normalizedLength = (([m, s]) => (parseInt(m, 10) * 60 + parseInt(s, 10)))(length.split(":"));

  response.body = {
    id: video_id,
    title,
    watch_url,
    thumbnail_url: {
      original: thumbnail_url,
      large: `${thumbnail_url}.L`,
    },
    uploaded_at: first_retrieve,
    tags: normalizedTags,
    length: normalizedLength,
    user: {
      id: user_id,
      icon_url: user_icon_url,
      nickname: user_nickname,
    },
    views: view_counter,
    comments: comment_num,
    mylists: mylist_counter,
  };
  return;
});

app.use(oakCors());
app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8090 });
