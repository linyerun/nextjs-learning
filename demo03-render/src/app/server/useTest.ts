import "server-only";
export function useTest(type: 0 | 1) {
  if (type === 0) {
    return fetch("https://api.github.com");
  } else {
    return new WebSocket("wss://api.github.com");
  }
}

/**
 * 通过 import "server-only"; 标记fetch和new WebSocket在服务端执行,
 * 因为在客户端执行, 尽管客户端和服务端都支持这两种api
 * */
