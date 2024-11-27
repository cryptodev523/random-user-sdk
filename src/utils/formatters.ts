import { UserName, UserLocation, UserDob } from "../types";

export function formatFullName(name: UserName): string {
  return `${name.title} ${name.first} ${name.last}`.trim();
}

export function formatAddress(location: UserLocation): string {
  return `${location.street.number} ${location.street.name}, ${location.city}, ${location.state} ${location.postcode}, ${location.country}`;
}

export function formatDateOfBirth(dob: UserDob): string {
  return new Date(dob.date).toLocaleDateString();
}
