import { RandomUserOptions, RandomUserResponse, User } from "./types";
import {
  formatFullName,
  formatAddress,
  formatDateOfBirth,
} from "./utils/formatters";

export class RandomUserClient {
  private baseUrl = "https://randomuser.me/api/";

  private validateOptions(options: RandomUserOptions): void {
    if (options.results !== undefined) {
      if (!Number.isInteger(options.results) || options.results <= 0) {
        throw new Error("Results must be a positive integer");
      }
    }

    if (options.gender && !["male", "female"].includes(options.gender)) {
      throw new Error('Gender must be either "male" or "female"');
    }

    if (options.nat) {
      const validNationalities = [
        "AU",
        "BR",
        "CA",
        "CH",
        "DE",
        "DK",
        "ES",
        "FI",
        "FR",
        "GB",
        "IE",
        "IN",
        "IR",
        "MX",
        "NL",
        "NO",
        "NZ",
        "RS",
        "TR",
        "US",
      ];
      if (!validNationalities.includes(options.nat.toUpperCase())) {
        throw new Error("Invalid nationality code");
      }
    }
  }

  private buildUrl(options: RandomUserOptions): string {
    const params = new URLSearchParams();

    if (options.results) {
      params.append("results", options.results.toString());
    }
    if (options.gender) {
      params.append("gender", options.gender);
    }
    if (options.nat) {
      params.append("nat", options.nat);
    }

    return `${this.baseUrl}?${params.toString()}`;
  }

  private async fetchData(
    options: RandomUserOptions
  ): Promise<RandomUserResponse> {
    try {
      const response = await fetch(this.buildUrl(options));

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to fetch users: ${error.message}`);
      } else {
        throw new Error("Failed to fetch users: An unknown error occurred");
      }
    }
  }

  async getUsers(options: RandomUserOptions = {}): Promise<User[]> {
    this.validateOptions(options);
    const response = await this.fetchData(options);
    return response.results;
  }

  async getUser(
    options: Omit<RandomUserOptions, "results"> = {}
  ): Promise<User> {
    this.validateOptions(options);
    const users = await this.getUsers({ ...options, results: 1 });
    return users[0];
  }

  getFullName(user: User): string {
    return formatFullName(user.name);
  }

  getFormattedAddress(user: User): string {
    return formatAddress(user.location);
  }

  getFormattedDateOfBirth(user: User): string {
    return formatDateOfBirth(user.dob);
  }
}
