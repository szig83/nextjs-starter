import { pgTable, pgSchema, unique, uuid, varchar, timestamp, text, foreignKey, integer, boolean } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const auth = pgSchema("auth");


export const userInAuth = auth.table("user", {
	id: uuid().primaryKey().notNull(),
	name: varchar(),
	email: varchar(),
	emailVerified: timestamp({ mode: 'string' }),
	password: varchar(),
	image: varchar(),
	valami: varchar(),
}, (table) => [
	unique("user_email_unique").on(table.email),
]);

export const verificationTokenInAuth = auth.table("verificationToken", {
	identifier: text().notNull(),
	token: text().notNull(),
	expires: timestamp({ mode: 'string' }).notNull(),
});

export const accountInAuth = auth.table("account", {
	userId: uuid().notNull(),
	type: text().notNull(),
	provider: text().notNull(),
	providerAccountId: text().notNull(),
	refreshToken: text("refresh_token"),
	accessToken: text("access_token"),
	expiresAt: integer("expires_at"),
	tokenType: text("token_type"),
	scope: text(),
	idToken: text("id_token"),
	sessionState: text("session_state"),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [userInAuth.id],
			name: "account_userId_user_id_fk"
		}).onDelete("cascade"),
]);

export const authenticatorInAuth = auth.table("authenticator", {
	credentialId: text().notNull(),
	userId: uuid().notNull(),
	providerAccountId: text().notNull(),
	credentialPublicKey: text().notNull(),
	counter: integer().notNull(),
	credentialDeviceType: text().notNull(),
	credentialBackedUp: boolean().notNull(),
	transports: text(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [userInAuth.id],
			name: "authenticator_userId_user_id_fk"
		}).onDelete("cascade"),
	unique("authenticator_credentialID_unique").on(table.credentialId),
]);

export const sessionInAuth = auth.table("session", {
	sessionToken: text().primaryKey().notNull(),
	userId: uuid().notNull(),
	expires: timestamp({ mode: 'string' }).notNull(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [userInAuth.id],
			name: "session_userId_user_id_fk"
		}).onDelete("cascade"),
]);
