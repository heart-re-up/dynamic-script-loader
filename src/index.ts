export function loadScript(url: string, async: boolean = true): Promise<HTMLScriptElement> {
    return new Promise((resolve, reject) => {
        let id = 0;

        for (let i = 0; i < url.length; i++) {
            id = (id << 5) - id + url.charCodeAt(i);
            id |= 0;
        }

        const exists = document.getElementById(String(id));
        if (exists != null && exists instanceof HTMLScriptElement) {
            resolve(exists as HTMLScriptElement)
            return
        }

        const el = document.createElement("script");
        el.setAttribute('id', String(id))
        el.setAttribute('src', url)
        el.setAttribute('type', 'text/javascript')
        el.setAttribute('async', String(async))
        el.addEventListener('load', () => resolve(el))
        el.addEventListener('error', (ev) => reject(ev))
        document.body.append(el);
    });
};