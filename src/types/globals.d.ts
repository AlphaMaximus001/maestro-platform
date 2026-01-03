export {}

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: "admin" | "teacher" | "student";
    };
  }
}