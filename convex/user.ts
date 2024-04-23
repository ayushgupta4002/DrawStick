import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getuser = query({
  args: {
    email: v.string(),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db
      .query("user")
      .filter((q) => q.eq(q.field("email"), args.email))
      .collect();

    return result;
  },
});


export const getuserbyId = query({
  args: {
    _id: v.id('user'),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.get(args._id);
  
    return result;
  },
});

export const updateFreeCredits=mutation({
  args:{
      _id:v.id('user'),
      freeCredits : v.number()
  },
  handler:async(ctx, args) =>{
      const result =await ctx.db.patch(args._id,{freeCredits:args.freeCredits});
      return result;
  },
})


export const createUser = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    freeCredits: v.number()
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("user", args);
  },
});
