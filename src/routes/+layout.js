/** @type {import('@sveltejs/adapter-vercel').Config} */
// NOTE: adapter-vercel@6 supports nodejs20.x/nodejs22.x runtimes only.
// Local toolchain stays Node 24 (.nvmrc/engines); serverless runs on 22.
export const config = {
	runtime: 'nodejs22.x'
};