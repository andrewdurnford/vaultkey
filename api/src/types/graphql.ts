import { GraphQLResolveInfo } from 'graphql';
import { User } from '.prisma/client';
import { Context } from './context';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type IItem = {
  __typename?: 'Item';
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
};

export type IItemCreateInput = {
  name?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
};

export type ILoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type ILoginPayload = {
  __typename?: 'LoginPayload';
  token: Scalars['String'];
  user: IUser;
};

export type IMutation = {
  __typename?: 'Mutation';
  itemCreate?: Maybe<IItem>;
  login?: Maybe<ILoginPayload>;
  signup?: Maybe<ISignupPayload>;
};


export type IMutationItemCreateArgs = {
  input: IItemCreateInput;
};


export type IMutationLoginArgs = {
  input: ILoginInput;
};


export type IMutationSignupArgs = {
  input: ISignupInput;
};

export type IQuery = {
  __typename?: 'Query';
  items: Array<IItem>;
  user?: Maybe<IUser>;
};

export type ISignupInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type ISignupPayload = {
  __typename?: 'SignupPayload';
  token: Scalars['String'];
  user: IUser;
};

export type IUser = {
  __typename?: 'User';
  email: Scalars['String'];
  id: Scalars['ID'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type IResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Item: ResolverTypeWrapper<IItem>;
  ItemCreateInput: IItemCreateInput;
  LoginInput: ILoginInput;
  LoginPayload: ResolverTypeWrapper<Omit<ILoginPayload, 'user'> & { user: IResolversTypes['User'] }>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  SignupInput: ISignupInput;
  SignupPayload: ResolverTypeWrapper<Omit<ISignupPayload, 'user'> & { user: IResolversTypes['User'] }>;
  String: ResolverTypeWrapper<Scalars['String']>;
  User: ResolverTypeWrapper<User>;
};

/** Mapping between all available schema types and the resolvers parents */
export type IResolversParentTypes = {
  Boolean: Scalars['Boolean'];
  ID: Scalars['ID'];
  Item: IItem;
  ItemCreateInput: IItemCreateInput;
  LoginInput: ILoginInput;
  LoginPayload: Omit<ILoginPayload, 'user'> & { user: IResolversParentTypes['User'] };
  Mutation: {};
  Query: {};
  SignupInput: ISignupInput;
  SignupPayload: Omit<ISignupPayload, 'user'> & { user: IResolversParentTypes['User'] };
  String: Scalars['String'];
  User: User;
};

export type IItemResolvers<ContextType = Context, ParentType extends IResolversParentTypes['Item'] = IResolversParentTypes['Item']> = {
  id?: Resolver<IResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>;
  password?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>;
  username?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ILoginPayloadResolvers<ContextType = Context, ParentType extends IResolversParentTypes['LoginPayload'] = IResolversParentTypes['LoginPayload']> = {
  token?: Resolver<IResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<IResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type IMutationResolvers<ContextType = Context, ParentType extends IResolversParentTypes['Mutation'] = IResolversParentTypes['Mutation']> = {
  itemCreate?: Resolver<Maybe<IResolversTypes['Item']>, ParentType, ContextType, RequireFields<IMutationItemCreateArgs, 'input'>>;
  login?: Resolver<Maybe<IResolversTypes['LoginPayload']>, ParentType, ContextType, RequireFields<IMutationLoginArgs, 'input'>>;
  signup?: Resolver<Maybe<IResolversTypes['SignupPayload']>, ParentType, ContextType, RequireFields<IMutationSignupArgs, 'input'>>;
};

export type IQueryResolvers<ContextType = Context, ParentType extends IResolversParentTypes['Query'] = IResolversParentTypes['Query']> = {
  items?: Resolver<Array<IResolversTypes['Item']>, ParentType, ContextType>;
  user?: Resolver<Maybe<IResolversTypes['User']>, ParentType, ContextType>;
};

export type ISignupPayloadResolvers<ContextType = Context, ParentType extends IResolversParentTypes['SignupPayload'] = IResolversParentTypes['SignupPayload']> = {
  token?: Resolver<IResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<IResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type IUserResolvers<ContextType = Context, ParentType extends IResolversParentTypes['User'] = IResolversParentTypes['User']> = {
  email?: Resolver<IResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<IResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type IResolvers<ContextType = Context> = {
  Item?: IItemResolvers<ContextType>;
  LoginPayload?: ILoginPayloadResolvers<ContextType>;
  Mutation?: IMutationResolvers<ContextType>;
  Query?: IQueryResolvers<ContextType>;
  SignupPayload?: ISignupPayloadResolvers<ContextType>;
  User?: IUserResolvers<ContextType>;
};

