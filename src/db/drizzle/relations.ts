import { relations } from "drizzle-orm/relations";
import { userInAuth, accountInAuth, authenticatorInAuth, sessionInAuth } from "./schema";

export const accountInAuthRelations = relations(accountInAuth, ({one}) => ({
	userInAuth: one(userInAuth, {
		fields: [accountInAuth.userId],
		references: [userInAuth.id]
	}),
}));

export const userInAuthRelations = relations(userInAuth, ({many}) => ({
	accountInAuths: many(accountInAuth),
	authenticatorInAuths: many(authenticatorInAuth),
	sessionInAuths: many(sessionInAuth),
}));

export const authenticatorInAuthRelations = relations(authenticatorInAuth, ({one}) => ({
	userInAuth: one(userInAuth, {
		fields: [authenticatorInAuth.userId],
		references: [userInAuth.id]
	}),
}));

export const sessionInAuthRelations = relations(sessionInAuth, ({one}) => ({
	userInAuth: one(userInAuth, {
		fields: [sessionInAuth.userId],
		references: [userInAuth.id]
	}),
}));