import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("api/*", "routes/auth-api.ts"),
  route("/sign-up", "routes/sign-up.tsx"),
  route("/profile", "routes/profile.tsx"),
] satisfies RouteConfig;
