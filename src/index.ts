export function loadScript(url: string): Promise<HTMLScriptElement> {
    return new Promise(resolve => {
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
        el.src = url;
        el.id = String(id);
        document.body.append(el);
        resolve(el)

    });
};