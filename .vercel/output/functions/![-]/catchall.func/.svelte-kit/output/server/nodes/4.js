import * as server from '../entries/pages/calls/_call_/_page.server.ts.js';

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/calls/_call_/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/calls/[call]/+page.server.ts";
export const imports = ["_app/immutable/nodes/4.DUnf1MBk.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/q-bSWnWw.js","_app/immutable/chunks/Dy4U-Nbq.js","_app/immutable/chunks/DJwrhxke.js","_app/immutable/chunks/DrdaUQUm.js","_app/immutable/chunks/DoV-FpeZ.js","_app/immutable/chunks/ZQvcI8pd.js","_app/immutable/chunks/Dd4rhl3l.js","_app/immutable/chunks/DIpXyyUT.js","_app/immutable/chunks/Ga0CjPpz.js","_app/immutable/chunks/3bhba-X8.js"];
export const stylesheets = ["_app/immutable/assets/header.BuuigBQi.css","_app/immutable/assets/footer.gUvAjaOI.css","_app/immutable/assets/4.C2gqK3pd.css","_app/immutable/assets/manifesto.CKWxn7RJ.css"];
export const fonts = [];
