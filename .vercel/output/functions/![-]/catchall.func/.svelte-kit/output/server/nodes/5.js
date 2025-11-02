import * as server from '../entries/pages/issues/_issue_/_page.server.ts.js';

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/issues/_issue_/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/issues/[issue]/+page.server.ts";
export const imports = ["_app/immutable/nodes/5.Bpx0XdEs.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/q-bSWnWw.js","_app/immutable/chunks/Dy4U-Nbq.js","_app/immutable/chunks/DJwrhxke.js","_app/immutable/chunks/DrdaUQUm.js","_app/immutable/chunks/DoV-FpeZ.js","_app/immutable/chunks/ZQvcI8pd.js","_app/immutable/chunks/Dh4NC_tM.js","_app/immutable/chunks/D314UYB1.js","_app/immutable/chunks/Ga0CjPpz.js","_app/immutable/chunks/3bhba-X8.js","_app/immutable/chunks/Dd4rhl3l.js","_app/immutable/chunks/DIpXyyUT.js","_app/immutable/chunks/C_XvBwd4.js"];
export const stylesheets = ["_app/immutable/assets/header.BuuigBQi.css","_app/immutable/assets/buying_slider.BXuHpdUO.css","_app/immutable/assets/footer.gUvAjaOI.css","_app/immutable/assets/ultrabutton.JrA_sGbL.css","_app/immutable/assets/5.ptsIAAnP.css","_app/immutable/assets/manifesto.CKWxn7RJ.css"];
export const fonts = [];
