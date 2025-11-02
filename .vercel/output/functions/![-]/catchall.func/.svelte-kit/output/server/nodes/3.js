import * as server from '../entries/pages/about/_page.server.ts.js';

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/about/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/about/+page.server.ts";
export const imports = ["_app/immutable/nodes/3.Da5Zs_AB.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/q-bSWnWw.js","_app/immutable/chunks/DoV-FpeZ.js","_app/immutable/chunks/Dy4U-Nbq.js","_app/immutable/chunks/DJwrhxke.js","_app/immutable/chunks/ZQvcI8pd.js","_app/immutable/chunks/DIpXyyUT.js","_app/immutable/chunks/Ga0CjPpz.js","_app/immutable/chunks/3bhba-X8.js"];
export const stylesheets = ["_app/immutable/assets/header.BuuigBQi.css","_app/immutable/assets/footer.gUvAjaOI.css","_app/immutable/assets/3.Dppdbp7P.css"];
export const fonts = [];
