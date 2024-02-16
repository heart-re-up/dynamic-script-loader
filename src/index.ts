/**
 * url 을 hash 아이디로 변환합니다.
 *
 * @param url
 */
export function urlToHash(url: string): string {
  let id = 0;

  for (let i = 0; i < url.length; i += 1) {
    // eslint-disable-next-line no-bitwise
    id = (id << 5) - id + url.charCodeAt(i);
    // eslint-disable-next-line no-bitwise
    id |= 0;
  }

  return String(id);
}

/**
 * Load a script synchronously.
 *
 * @param url A url script file placed.
 * @param async async attribute
 * @param resolve load callback
 * @param reject error callback
 */
export function loadScriptSync(
  url: string,
  async: boolean = true,
  resolve?: (el: HTMLScriptElement) => void,
  reject?: (ev: ErrorEvent) => void,
) {
  const id = urlToHash(url);
  const foundScriptEl = document.getElementById(id);

  // 이미 로드된 스크립트를 찾았다면 아무것도 안함
  if (foundScriptEl != null && foundScriptEl instanceof HTMLScriptElement) {
    resolve?.(foundScriptEl);
    return;
  }

  // 아직 로드된 스크립트가 없음. 로드함.
  const el = document.createElement<"script">("script");
  el.setAttribute("id", String(id));
  el.setAttribute("src", url);
  el.setAttribute("type", "text/javascript");
  el.setAttribute("async", String(async));
  el.addEventListener("load", () => resolve?.(el));
  el.addEventListener("error", (ev) => reject?.(ev));
  document.body.append(el);
}

/**
 * Load a script asynchronously.
 *
 * @param url A url script file placed.
 * @param async async attribute
 */
export function loadScript(url: string): Promise<HTMLScriptElement> {
  return new Promise((resolve, reject) => {
    loadScriptSync(url, true, resolve, reject);
  });
}
