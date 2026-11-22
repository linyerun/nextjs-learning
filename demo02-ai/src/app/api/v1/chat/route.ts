import { NextRequest } from "next/server";
import {
  streamText,
  convertToModelMessages,
  toUIMessageStream,
  createUIMessageStreamResponse,
} from "ai";
import { createDeepSeek } from "@ai-sdk/deepseek";

// .env 必须放在项目根目录（demo02-ai/.env），Next 不会读取 src 下的 .env
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;
if (!DEEPSEEK_API_KEY) {
  throw new Error("缺少 DEEPSEEK_API_KEY，请在项目根目录 .env 中配置");
}

const deepSeek = createDeepSeek({
  apiKey: DEEPSEEK_API_KEY, //设置API密钥
});

export async function POST(req: NextRequest) {
  const { messages } = await req.json(); //获取请求体
  //这里为什么接受messages 因为我们使用前端的useChat 他会自动注入这个参数，所有可以直接读取
  const result = streamText({
    model: deepSeek("deepseek-flash"), //使用deepseek-flash模型
    //新版 convertToModelMessages 是异步的，必须 await
    //前端传过来的messages不符合sdk格式，转换后：
    //[{ role: 'user', content: [{ type: 'text', text: '...' }] }, ...]
    messages: await convertToModelMessages(messages),
    system: "你是一个高级程序员，请根据用户的问题给出回答", //系统提示词
  });

  //新版写法：result.toUIMessageStreamResponse() 已废弃
  //改用独立的 toUIMessageStream 把 result.stream 转成 UI 消息流
  //再由 createUIMessageStreamResponse 包装成 SSE 响应（含正确响应头）
  return createUIMessageStreamResponse({
    stream: toUIMessageStream({ stream: result.stream }),
  });
}
