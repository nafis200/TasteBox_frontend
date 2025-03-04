

type JwtPayload = {
  email: string;
  role: "user" | "admin";
  name: string;
  phone_number: string;
  address: string;
};

export type IUser = {
  jwtPayload: JwtPayload;
  iat: number;
  exp: number;
};
