import { z } from 'zod';

const envSchema = z.object({
	NODE_ENV: z
		.enum(['development', 'production', 'test'])
		.default('development'),
	PORT: z.string().default('5000'),
	DATABASE_URL: z.string(),
	FRONT_END_URL: z.url(),
	RPC_WEB_SOCKET_URL: z.url(),
	CONTRACT_ADDRESS: z.string(),
});

const env = envSchema.safeParse(process.env);

if (!env.success) {
	console.error('Invalid environment variables:', env.error.message);
	throw new Error('Invalid environment variables');
}

declare global {
	namespace NodeJS {
		interface ProcessEnv extends z.infer<typeof envSchema> {}
	}
}

export default env;
