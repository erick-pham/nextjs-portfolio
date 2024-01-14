/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import type { IRuleSet } from "@/types/rule";
import { generateKey } from "@/util/crypto";
import type { Model } from "mongoose";
import mongoose from "mongoose";

export const RuleSetSchema = new mongoose.Schema<IRuleSet>(
  {
    id: { type: String, default: (): string => generateKey(10, "base64url") },
    factors: [{ type: Object }],
    name: { type: String },
    decisions: [{ type: Object }],
  },
  { timestamps: true },
);

export const RuleSetModel = (mongoose.models["ruleset"] ||
  mongoose.model("ruleset", RuleSetSchema)) as Model<IRuleSet>;
