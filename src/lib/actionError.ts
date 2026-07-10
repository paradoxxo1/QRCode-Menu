/**
 * Server actions built on useActionState return an error message string
 * instead of throwing, so the form can show it inline. Our domain errors
 * (ValidationError, ForbiddenError, UnauthorizedError) all carry `status`
 * + `message` — anything else (e.g. Next's internal redirect signal) is
 * rethrown so it isn't swallowed.
 */
export function toActionErrorMessage(error: unknown): string {
  if (
    error &&
    typeof error === "object" &&
    "status" in error &&
    "message" in error &&
    typeof (error as { message: unknown }).message === "string"
  ) {
    return (error as { message: string }).message;
  }
  throw error;
}
