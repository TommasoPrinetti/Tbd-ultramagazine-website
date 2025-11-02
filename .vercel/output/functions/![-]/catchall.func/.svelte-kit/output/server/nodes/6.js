import * as server from '../entries/pages/issues/_issue_/articles/_article_/_page.server.ts.js';

export const index = 6;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/issues/_issue_/articles/_article_/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/issues/[issue]/articles/[article]/+page.server.ts";
export const imports = ["_app/immutable/nodes/6.uaRpDbXJ.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/q-bSWnWw.js","_app/immutable/chunks/Dh4NC_tM.js","_app/immutable/chunks/BhZYN2S9.js","_app/immutable/chunks/Dy4U-Nbq.js","_app/immutable/chunks/DJwrhxke.js","_app/immutable/chunks/D9FocfZ9.js","_app/immutable/chunks/CQCFoxm7.js","_app/immutable/chunks/Ga0CjPpz.js","_app/immutable/chunks/3bhba-X8.js","_app/immutable/chunks/DrdaUQUm.js","_app/immutable/chunks/Dd4rhl3l.js","_app/immutable/chunks/BD_0fzeV.js"];
export const stylesheets = ["_app/immutable/assets/header.BuuigBQi.css","_app/immutable/assets/buying_slider.BXuHpdUO.css","_app/immutable/assets/footer.gUvAjaOI.css","_app/immutable/assets/6.BQ0XuE4K.css"];
export const fonts = [];
