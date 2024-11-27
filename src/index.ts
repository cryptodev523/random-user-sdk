export { RandomUserClient } from "./client";

export type {
  RandomUserOptions,
  User,
  UserName,
  UserLocation,
  UserDob,
  RandomUserResponse,
} from "./types";

export {
  formatFullName,
  formatAddress,
  formatDateOfBirth,
} from "./utils/formatters";

import { RandomUserClient } from "./client";
export default RandomUserClient;
