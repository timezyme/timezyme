import { integer, sqliteTable, text, uniqueIndex } from 'drizzle-orm/sqlite-core'
import { nanoid } from 'nanoid'

export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export const users = sqliteTable('users', {
  avatarUrl: text('avatar_url'),
  banned: integer('banned', { mode: 'boolean' }).notNull().default(false),
  bannedReason: text('banned_reason'),
  createdAt: integer('created_at', { mode: 'timestamp' }).$default(() => new Date()),
  email: text('email').notNull().unique(),
  emailVerified: integer('email_verified', { mode: 'boolean' }).notNull().default(false),
  hashedPassword: text('hashed_password'),
  id: text('id')
    .primaryKey()
    .$default(() => nanoid()),
  lastActive: integer('last_active', { mode: 'timestamp' }).$onUpdate(() => new Date()),
  name: text('name').notNull(),
  onboarded: integer('onboarded', { mode: 'boolean' }).notNull().default(false),
  role: text('role').notNull().default(UserRole.USER),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).$onUpdate(() => new Date()),
}, () => [])
export type SelectUser = typeof users.$inferSelect
export type InsertUser = typeof users.$inferInsert

export const userOauthAccounts = sqliteTable(
  'user_oauth_accounts',
  {
    createdAt: integer('created_at', { mode: 'timestamp' }).$default(() => new Date()),
    id: text('id')
      .primaryKey()
      .$default(() => nanoid()),
    providerId: text('provider_id').notNull(),
    providerUserId: text('provider_user_id').notNull(),
    updatedAt: integer('updated_at', { mode: 'timestamp' }).$onUpdate(() => new Date()),
    userId: text('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
  },
  table => [
    uniqueIndex('unique_provider_user').on(table.providerId, table.providerUserId),
  ],
)
export type SelectOauthAccount = typeof userOauthAccounts.$inferSelect
export type InsertOauthAccount = typeof userOauthAccounts.$inferInsert

export const userSubscriptions = sqliteTable('user_subscriptions', {
  amount: integer('amount').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).$default(() => new Date()),
  currency: text('currency').notNull(),
  discountId: text('discount_id'),
  endsAt: integer('ends_at', { mode: 'timestamp' }),
  id: text('id')
    .primaryKey()
    .$default(() => nanoid()),
  modifiedAt: integer('modified_at', { mode: 'timestamp' }).$default(() => new Date()),
  name: text('name').notNull(),
  priceId: text('price_id').notNull(),
  productId: text('product_id').notNull(),
  recurringInterval: text('recurring_interval').notNull(),
  startedAt: integer('started_at', { mode: 'timestamp' }).$default(() => new Date()),
  status: text('status').notNull(),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
}, () => [])
export type SelectSubscription = typeof userSubscriptions.$inferSelect
export type InsertSubscription = typeof userSubscriptions.$inferInsert

export const userLifeTimeDeals = sqliteTable('user_life_time_deals', {
  amount: integer('amount').notNull(),
  checkoutId: text('checkout_id').notNull(),
  customerId: text('customer_id').notNull(),
  id: text('id')
    .primaryKey()
    .$default(() => nanoid()),
  productId: text('product_id').notNull(),
  purchasedAt: integer('purchased_at', { mode: 'timestamp' }).notNull(),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
}, () => [])
export type SelectUserLifeTimeDeals = typeof userLifeTimeDeals.$inferSelect
export type InsertUserLifeTimeDeals = typeof userLifeTimeDeals.$inferInsert

export const userEmailVerificationCodes = sqliteTable('user_email_verification_codes', {
  code: text('code').notNull(),
  expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull(),
  id: integer('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
}, () => [])
export type SelectEmailVerificationCode = typeof userEmailVerificationCodes.$inferSelect
export type InsertEmailVerificationCode = typeof userEmailVerificationCodes.$inferInsert

export const userPasswordResetTokens = sqliteTable('user_password_reset_tokens', {
  code: text('code').notNull(),
  expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull(),
  id: integer('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
}, () => [])

export enum UserOneTimePasswordType {
  SIGNUP = 'SIGNUP',
  LOGIN = 'LOGIN',
  FORGOT_PASSWORD = 'FORGOT_PASSWORD',
}

export const userOneTimePasswords = sqliteTable('user_one_time_passwords', {
  code: text('code').notNull(),
  expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull(),
  id: text('id')
    .primaryKey()
    .$default(() => nanoid()),
  identifier: text('identifier').notNull(),
  type: text('type').notNull().default(UserOneTimePasswordType.SIGNUP),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
})
export type SelectOneTimePassword = typeof userOneTimePasswords.$inferSelect
export type InsertOneTimePassword = typeof userOneTimePasswords.$inferInsert
export type OneTimePassword = keyof typeof UserOneTimePasswordType

export const waitlist = sqliteTable('waitlist', {
  createdAt: integer('created_at', { mode: 'timestamp' }).$default(() => new Date()),
  email: text('email').notNull().unique(),
  emailVerificationToken: text('email_verification_token').notNull(),
  emailVerified: integer('email_verified', { mode: 'boolean' }).notNull().default(false),
  id: text('id')
    .primaryKey()
    .$default(() => nanoid()),
  referrer: text('referrer'),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).$onUpdate(() => new Date()),
})
export type SelectWaitlist = typeof waitlist.$inferSelect
export type InsertWaitlist = typeof waitlist.$inferInsert
