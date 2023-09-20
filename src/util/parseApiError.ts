import { ConvexError } from "convex/values";

export function parseApiError(error: unknown) {
  return error instanceof ConvexError
    ? (error.data as string)
    : "Unexpected error occurred";
}
