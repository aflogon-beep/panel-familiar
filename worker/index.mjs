// Panel familiar · Worker de Cloudflare
// Sirve la app (dist/index.html, empaquetada en el despliegue) y la API:
//   /api/login, /api/passwd, /api/logout-all  → acceso con contraseña (PBKDF2) y sesiones firmadas (HMAC)
//   /api/state                                → estado de la familia en D1, cifrado con AES-GCM (DATA_KEY)
//   /api/backups                              → copias de seguridad automáticas (cron diario, se guardan 14)
//   /api/ics                                  → lee calendarios iCal (Google, Outlook, iCloud) sin exponer el enlace
//   /api/off                                  → búsqueda de productos en Open Food Facts para la lista de la compra
// Secretos (wrangler secret put …): FAMILY_KEY (contraseña inicial), SESSION_SECRET, DATA_KEY.
import HTML from "../dist/index.html";
const SEC = {
  "x-content-type-options":"nosniff","referrer-policy":"no-referrer","x-frame-options":"DENY","strict-transport-security":"max-age=31536000; includeSubDomains","permissions-policy":"camera=(), geolocation=(), microphone=(self)","cross-origin-opener-policy":"same-origin","cross-origin-resource-policy":"same-origin","x-robots-tag":"noindex, nofollow",
  "content-security-policy":"default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; img-src 'self' data: https://images.openfoodfacts.org; connect-src 'self' https://api.open-meteo.com; manifest-src 'self'; frame-ancestors 'none'; base-uri 'none'; form-action 'self'; object-src 'none'"
};
const MANIFEST = JSON.stringify({name:"Panel familiar",short_name:"Panel",start_url:"/",display:"fullscreen",background_color:"#E8EEF0",theme_color:"#0D5C63",icons:[{src:"/icon.svg",sizes:"any",type:"image/svg+xml",purpose:"any"},{src:"/icon-180.png",sizes:"180x180",type:"image/png"}]});
const SVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect width="512" height="512" rx="96" fill="#0D5C63"/><rect x="150" y="75" width="212" height="362" rx="35" fill="#fff"/><rect x="150" y="215" width="212" height="11" fill="#0D5C63"/><rect x="325" y="125" width="13" height="60" rx="6" fill="#0D5C63"/><rect x="325" y="250" width="13" height="90" rx="6" fill="#0D5C63"/><circle cx="200" cy="130" r="22" fill="#3A6FD8"/><circle cx="212" cy="320" r="22" fill="#2A9D6A"/><circle cx="260" cy="360" r="20" fill="#C94A86"/></svg>';
const json = (o, s = 200) => new Response(JSON.stringify(o), {status: s, headers: {"content-type":"application/json","cache-control":"no-store", ...SEC}});
const eq = (a, b) => { if (!a || !b || a.length !== b.length) return false; let r = 0; for (let i = 0; i < a.length; i++) r |= a.charCodeAt(i) ^ b.charCodeAt(i); return r === 0; };
const ICON180 = "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";
const secOfTags = (t) => {
  const s = (t || []).join(" "), h = k => s.includes(k);
  if (h("frozen")) return "cong";
  if (h("dairies") || h("milks") || h("yogurts") || h("cheeses") || h("eggs")) return "lac";
  if (h("fishes") || h("seafood")) return "pescado";
  if (h("meats") || h("poultry") || h("sausages") || h("hams")) return "carne";
  if (h("breads") || h("pastries") || h("bakery")) return "pan";
  if (h("beverages") || h("waters")) return "beb";
  if (h("fresh-fruits") || h("fresh-vegetables")) return "fv";
  return "des";
};
async function offSearch(q) {
  const base = "https://search.openfoodfacts.org/search";
  const f = "code,product_name,brands,categories_tags,image_small_url";
  const mk = (qq, n) => fetch(base + "?" + new URLSearchParams({q: qq, langs: "es", page_size: String(n), fields: f}), {headers: {"User-Agent": "PanelFamiliar/1.0"}, cf: {cacheTtl: 86400, cacheEverything: true}}).then(r => r.ok ? r.json() : {hits: []}).catch(() => ({hits: []}));
  const [a, b] = await Promise.all([mk(q + " brands:hacendado", 5), mk(q + ' countries_tags:"en:spain"', 10)]);
  const out = [], seen = new Set();
  for (const hit of [...(a.hits || []), ...(b.hits || [])]) {
    const name = (hit.product_name || "").trim();
    if (!name) continue;
    const br = Array.isArray(hit.brands) ? hit.brands[0] : (hit.brands || "");
    const n = br && !name.toLowerCase().includes(br.toLowerCase()) ? name + " (" + br + ")" : name;
    const k = n.toLowerCase();
    if (seen.has(k)) continue;
    seen.add(k);
    const img = hit.image_small_url && hit.image_small_url.startsWith("https://images.openfoodfacts.org/") ? hit.image_small_url : "🛒";
    out.push({n: n.slice(0, 80), sec: secOfTags(hit.categories_tags), img});
    if (out.length >= 12) break;
  }
  return out;
}
const enc = new TextEncoder(), dec = new TextDecoder();
const b64 = (u) => { let s = ""; for (let i = 0; i < u.length; i++) s += String.fromCharCode(u[i]); return btoa(s); };
const unb64 = (s) => Uint8Array.from(atob(s), c => c.charCodeAt(0));
const b64u = (u) => b64(u).split("+").join("-").split("/").join("_").split("=").join("");
const unb64u = (s) => { s = s.split("-").join("+").split("_").join("/"); return unb64(s + "=".repeat((4 - s.length % 4) % 4)); };
const sleep = (ms) => new Promise(r => setTimeout(r, ms));
const cspMemo = {};
let ready = false, migrated = false;
async function init(env) {
  if (ready) return;
  await env.DB.batch([
    env.DB.prepare("CREATE TABLE IF NOT EXISTS state (id INTEGER PRIMARY KEY, v TEXT, rev INTEGER)"),
    env.DB.prepare("CREATE TABLE IF NOT EXISTS auth (id INTEGER PRIMARY KEY, salt TEXT, hash TEXT, iter INTEGER, epoch INTEGER)"),
    env.DB.prepare("CREATE TABLE IF NOT EXISTS fails (ip TEXT, ts INTEGER)"),
    env.DB.prepare("CREATE TABLE IF NOT EXISTS backups (id INTEGER PRIMARY KEY AUTOINCREMENT, ts TEXT, rev INTEGER, v TEXT)")
  ]);
  ready = true;
}
async function authRow(env) { await init(env); return await env.DB.prepare("SELECT salt, hash, iter, epoch FROM auth WHERE id=1").first(); }
async function sign(env, data) {
  if (!env.SESSION_SECRET) throw new Error("no secret");
  const k = await crypto.subtle.importKey("raw", enc.encode(env.SESSION_SECRET), {name: "HMAC", hash: "SHA-256"}, false, ["sign"]);
  return b64u(new Uint8Array(await crypto.subtle.sign("HMAC", k, enc.encode(data))));
}
async function mint(env, epoch) {
  const pl = b64u(enc.encode(JSON.stringify({e: Math.floor(Date.now() / 1000) + 365 * 86400, p: epoch})));
  return "v1." + pl + "." + await sign(env, "v1." + pl);
}
async function authed(req, env) {
  const h = req.headers.get("x-family-key") || "";
  const row = await authRow(env);
  if (!row) return eq(h, env.FAMILY_KEY || "");
  if (!env.SESSION_SECRET) return false;
  const parts = h.split(".");
  if (parts.length !== 3 || parts[0] !== "v1") return false;
  if (!eq(await sign(env, "v1." + parts[1]), parts[2])) return false;
  let o; try { o = JSON.parse(dec.decode(unb64u(parts[1]))); } catch (e) { return false; }
  return o.e > Date.now() / 1000 && o.p === row.epoch;
}
async function pbk(pw, salt, iter) {
  const k = await crypto.subtle.importKey("raw", enc.encode(pw), "PBKDF2", false, ["deriveBits"]);
  return b64(new Uint8Array(await crypto.subtle.deriveBits({name: "PBKDF2", hash: "SHA-256", salt: unb64(salt), iterations: iter}, k, 256)));
}
async function dkey(env) { return crypto.subtle.importKey("raw", unb64(env.DATA_KEY), "AES-GCM", false, ["encrypt", "decrypt"]); }
async function encV(env, txt) {
  if (!env.DATA_KEY) return txt;
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const ct = new Uint8Array(await crypto.subtle.encrypt({name: "AES-GCM", iv}, await dkey(env), enc.encode(txt)));
  const o = new Uint8Array(12 + ct.length); o.set(iv); o.set(ct, 12);
  return "enc1:" + b64(o);
}
async function decV(env, v) {
  if (!v.startsWith("enc1:")) return v;
  const u = unb64(v.slice(5));
  return dec.decode(await crypto.subtle.decrypt({name: "AES-GCM", iv: u.slice(0, 12)}, await dkey(env), u.slice(12)));
}
async function ensureEnc(env) {
  if (migrated || !env.DATA_KEY) return;
  await init(env);
  const s = await env.DB.prepare("SELECT v FROM state WHERE id=1").first();
  if (s && !s.v.startsWith("enc1:")) await env.DB.prepare("UPDATE state SET v=?1 WHERE id=1 AND v=?2").bind(await encV(env, s.v), s.v).run();
  const r = await env.DB.prepare("SELECT id, v FROM backups WHERE v NOT LIKE 'enc1:%'").all();
  for (const x of r.results) await env.DB.prepare("UPDATE backups SET v=?1 WHERE id=?2 AND v=?3").bind(await encV(env, x.v), x.id, x.v).run();
  migrated = true;
}
async function cspFor(name, html) {
  const m = cspMemo[name]; if (m && m.h === html) return m.c;
  const hs = []; let i = 0;
  while (true) {
    const a = html.indexOf("<script", i); if (a < 0) break;
    const e = html.indexOf(">", a), z = html.indexOf("</script>", e); if (e < 0 || z < 0) break;
    if (html.slice(a, e + 1).indexOf(" src=") < 0) { const d = await crypto.subtle.digest("SHA-256", enc.encode(html.slice(e + 1, z))); hs.push("'sha256-" + b64(new Uint8Array(d)) + "'"); }
    i = z + 9;
  }
  const c = SEC["content-security-policy"].split("script-src 'self' 'unsafe-inline'").join("script-src 'self' " + hs.join(" "));
  cspMemo[name] = {h: html, c}; return c;
}
async function snapBackup(env, force) {
  await ensureEnc(env);
  const row = await env.DB.prepare("SELECT v, rev FROM state WHERE id=1").first();
  if (!row) return false;
  const last = await env.DB.prepare("SELECT v FROM backups ORDER BY id DESC LIMIT 1").first();
  if (!force && last && (await decV(env, last.v)) === (await decV(env, row.v))) return false;
  await env.DB.prepare("INSERT INTO backups (ts, rev, v) VALUES (?1, ?2, ?3)").bind(new Date().toISOString(), row.rev, row.v.startsWith("enc1:") ? row.v : await encV(env, row.v)).run();
  await env.DB.prepare("DELETE FROM backups WHERE id NOT IN (SELECT id FROM backups ORDER BY id DESC LIMIT 14)").run();
  return true;
}
export default {
  async scheduled(ev, env, ctx) { ctx.waitUntil(snapBackup(env, false)); },
  async fetch(req, env) {
    const u = new URL(req.url), p = u.pathname;
    if (p === "/api/login" && req.method === "POST") {
      const ip = req.headers.get("cf-connecting-ip") || "x", now = Date.now();
      await authRow(env);
      await env.DB.prepare("DELETE FROM fails WHERE ts<?1").bind(now - 3600000).run();
      const fa = await env.DB.prepare("SELECT count(*) AS n FROM fails WHERE ip=?1 AND ts>?2").bind(ip, now - 900000).first();
      const fg = await env.DB.prepare("SELECT count(*) AS n FROM fails WHERE ts>?1").bind(now - 3600000).first();
      if (fa.n >= 5 || fg.n >= 25) return json({error: "locked"}, 429);
      let b; try { b = await req.json(); } catch (e) { return json({error: "bad"}, 400); }
      const k = String(b.k || "").slice(0, 200);
      const row = await authRow(env);
      const ok = row ? eq(await pbk(k, row.salt, row.iter), row.hash) : eq(k, env.FAMILY_KEY || "");
      if (!ok) { await env.DB.prepare("INSERT INTO fails (ip, ts) VALUES (?1, ?2)").bind(ip, now).run(); await sleep(600); return json({error: "auth"}, 401); }
      return json({token: row ? await mint(env, row.epoch) : k});
    }
    if ((p === "/api/passwd" || p === "/api/logout-all") && req.method === "POST") {
      if (!(await authed(req, env))) return json({error: "auth"}, 401);
      const row = await authRow(env);
      if (p === "/api/logout-all") {
        if (!row) return json({error: "nopass"}, 400);
        await env.DB.prepare("UPDATE auth SET epoch=epoch+1 WHERE id=1").run();
        return json({token: await mint(env, row.epoch + 1)});
      }
      let b; try { b = await req.json(); } catch (e) { return json({error: "bad"}, 400); }
      const pw = String(b.p || "");
      if (pw.length < 12 || pw.length > 200) return json({error: "short"}, 400);
      const salt = b64(crypto.getRandomValues(new Uint8Array(16))), iter = 100000;
      const hash = await pbk(pw, salt, iter), epoch = (row ? row.epoch : 0) + 1;
      await env.DB.prepare("INSERT OR REPLACE INTO auth (id, salt, hash, iter, epoch) VALUES (1, ?1, ?2, ?3, ?4)").bind(salt, hash, iter, epoch).run();
      return json({token: await mint(env, epoch)});
    }
    if (p === "/api/state" || p === "/api/off") {
      if (!(await authed(req, env))) return json({error: "auth"}, 401);
      if (p === "/api/off") {
        const q = (u.searchParams.get("q") || "").trim().slice(0, 60);
        if (q.length < 2) return json({items: []});
        return json({items: await offSearch(q)});
      }
      await init(env); await ensureEnc(env);
      let row = await env.DB.prepare("SELECT v, rev FROM state WHERE id=1").first();
      if (!row) { await env.DB.prepare("INSERT OR IGNORE INTO state (id, v, rev) VALUES (1, '{}', 0)").run(); row = {v: "{}", rev: 0}; }
      if (req.method === "GET") {
        const q = u.searchParams.get("rev");
        if (q !== null && Number(q) === row.rev) return json({same: true, rev: row.rev});
        return json({rev: row.rev, data: JSON.parse(await decV(env, row.v))});
      }
      if (req.method === "PUT") {
        const txt = await req.text();
        if (txt.length > 900000) return json({error: "too big"}, 413);
        let b; try { b = JSON.parse(txt); } catch (e) { return json({error: "bad json"}, 400); }
        if (typeof b.rev !== "number" || typeof b.data !== "object" || !b.data || Array.isArray(b.data)) return json({error: "bad body"}, 400);
        if (row.rev === b.rev) { try { const old = JSON.parse(await decV(env, row.v)); for (const k of Object.keys(old)) if (!(k in b.data)) b.data[k] = old[k]; } catch (e) {} }
        const r = await env.DB.prepare("UPDATE state SET v=?1, rev=rev+1 WHERE id=1 AND rev=?2").bind(await encV(env, JSON.stringify(b.data)), b.rev).run();
        if (r.meta.changes === 1) return json({rev: b.rev + 1});
        const cur = await env.DB.prepare("SELECT v, rev FROM state WHERE id=1").first();
        return json({rev: cur.rev, data: JSON.parse(await decV(env, cur.v))}, 409);
      }
      return json({error: "method"}, 405);
    }
    if (p === "/api/backups") {
      if (!(await authed(req, env))) return json({error: "auth"}, 401);
      await env.DB.prepare("CREATE TABLE IF NOT EXISTS backups (id INTEGER PRIMARY KEY AUTOINCREMENT, ts TEXT, rev INTEGER, v TEXT)").run();
      await ensureEnc(env);
      if (req.method === "POST") { const ok = await snapBackup(env, true); return json({ok}); }
      const id = u.searchParams.get("id");
      if (id) {
        const b = await env.DB.prepare("SELECT ts, rev, v FROM backups WHERE id=?1").bind(Number(id)).first();
        if (!b) return json({error: "none"}, 404);
        return json({ts: b.ts, rev: b.rev, data: JSON.parse(await decV(env, b.v))});
      }
      const l = await env.DB.prepare("SELECT id, ts, rev, length(v) AS size FROM backups ORDER BY id DESC").all();
      return json({items: l.results});
    }
    if (p === "/sw.js") {
      const sw = "const C='panel-v2';const NAV=['/','/index.html'];self.addEventListener('install',()=>self.skipWaiting());self.addEventListener('activate',e=>e.waitUntil((async()=>{for(const k of await caches.keys())if(k!==C)await caches.delete(k);await self.clients.claim()})()));self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(e.request.method!=='GET'||u.origin!==location.origin||u.pathname.startsWith('/api/')||u.pathname==='/sw.js')return;if(e.request.mode==='navigate'&&NAV.includes(u.pathname)){const key='/';e.respondWith((async()=>{const c=await caches.open(C);const hit=await c.match(key);const net=fetch(e.request).then(async r=>{if(r.ok){const t=await r.clone().text();const old=hit?await hit.clone().text():null;await c.put(key,r.clone());if(old!==null&&old!==t){const cid=e.resultingClientId;for(let i=0;i<30;i++){const cl=cid&&await self.clients.get(cid);if(cl){cl.postMessage('panel-upd');break}await new Promise(z=>setTimeout(z,500))}for(const x of await self.clients.matchAll({type:'window'}))if(x.id!==cid)x.postMessage('panel-upd')}}return r});if(hit){e.waitUntil(net.catch(()=>{}));return hit}return net.catch(async()=>(await c.match('/'))||Response.error())})());return}e.respondWith(fetch(e.request).then(r=>{if(r.ok){const c=r.clone();caches.open(C).then(x=>x.put(e.request,c))}return r}).catch(()=>caches.match(e.request).then(m=>m||Response.error())))});";
      return new Response(sw, {headers: {"content-type":"application/javascript","cache-control":"no-cache", ...SEC}});
    }
    if (p === "/api/ics") {
      if (!(await authed(req, env))) return json({error: "auth"}, 401);
      const okHost = (h) => ["google.com","outlook.live.com","outlook.com","office365.com","icloud.com"].some(d => h === d || h.endsWith("." + d));
      let t;
      try { t = new URL((u.searchParams.get("u") || "").replace(/^webcal:/i, "https:")); } catch (e) { return json({error: "url"}, 400); }
      let r = null;
      for (let i = 0; i < 4; i++) {
        if (t.protocol !== "https:" || !okHost(t.hostname)) return json({error: "host"}, 400);
        r = await fetch(t.href, {redirect: "manual", headers: {"User-Agent": "PanelFamiliar/1.0"}});
        if (r.status >= 300 && r.status < 400 && r.headers.get("location")) { t = new URL(r.headers.get("location"), t); continue; }
        break;
      }
      if (!r || !r.ok) return json({error: "upstream"}, 502);
      const txt = await r.text();
      if (txt.length > 4000000) return json({error: "too big"}, 413);
      return new Response(txt, {headers: {"content-type":"text/calendar; charset=utf-8","cache-control":"no-store", ...SEC}});
    }
    if (p === "/manifest.webmanifest") return new Response(MANIFEST, {headers: {"content-type":"application/manifest+json", ...SEC}});
    if (p === "/icon.svg") return new Response(SVG, {headers: {"content-type":"image/svg+xml","cache-control":"public, max-age=86400"}});
    if (p === "/icon-180.png") return new Response(Uint8Array.from(atob(ICON180), c => c.charCodeAt(0)), {headers: {"content-type":"image/png","cache-control":"public, max-age=86400"}});
    if (p === "/" || p === "/index.html") {
      return new Response(HTML, {headers: {"content-type":"text/html; charset=utf-8","cache-control":"no-store", ...SEC, "content-security-policy": await cspFor("index.html", HTML)}});
    }
    return new Response("No encontrado", {status: 404, headers: SEC});
  }
};
