// types/express/index.d.ts
import { IUser } from "../../models/user.model";

declare global {
  namespace Express {
    interface Request {
      user?: IUser; // Extend Request to include the user property
    }
  }
}
