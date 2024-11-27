# Random User SDK

## Description

This is a TypeScript SDK that wraps around the [Random User API](https://randomuser.me/documentation). It provides a simple way to fetch, filter, and format user data for applications.

## Features

- Fetch multiple random users with customizable filters
- Fetch a single random user
- Helper methods for formatting user data
- Type-safe implementation with TypeScript
- Comprehensive error handling
- Input validation

## Installation

```bash
npm install random-user-api-sdk
```

## Setup

```typescript
import { RandomUserClient } from "random-user-api-sdk";

const client = new RandomUserClient();
```

## API Reference

### RandomUserClient

The main class that provides methods to interact with the Random User API.

#### Methods

##### `getUsers(options: RandomUserOptions): Promise<User[]>`

Fetches a list of users based on the provided options.

Parameters:

- `options`: An object containing the following properties:
  - `results`: Number of results to fetch (between 1 and 5000).
  - `gender`: Filter results by gender (`male` or `female`).
  - `nat`: Filter results by nationality code

Example:

```typescript
const client = new RandomUserClient();
// Get 10 male users from the US
const users = await client.getUsers({ results: 10, gender: "male", nat: "US" });
```

##### `getUser(options: Omit<RandomUserOptions, "results">): Promise<User>`

Fetches a single user based on the provided options.

Parameters:

- `options`: An object containing the following properties:
  - `gender`: Filter results by gender (`male` or `female`).
  - `nat`: Filter results by nationality code

Example:

```typescript
const client = new RandomUserClient();
// Get a single male user from the US
const user = await client.getUser({ gender: "male", nat: "US" });
```

##### Helper Methods

- `getFullName(user: User): string`
Returns the full name of the user

- `getFormattedAddress(user: User): string`
Returns the formatted address of the user

- `getFormattedDateOfBirth(user: User): string`
Returns the formatted date of birth of the user

Example:

```typescript
const user = await client.getUser();
const fullName = client.getFullName(user);
// Example output: "Mr Jordan Jones 
const formattedAddress = client.getFormattedAddress(user);
// Example output: "123 Main St, New York, NY 10001, United States"
const formattedDateOfBirth = client.getFormattedDateOfBirth(user);
// Example output: "12/13/1990"
```

## Error Handling

The SDK includes comprehensive error handling for:
- Invalid input parameters
- Network errors
- API response errors
- Malformed responses

Example:

```typescript
const client = new RandomUserClient();

try {
    const users = await client.getUsers({results: -1});
} catch (error) {
    console.error(error);   // Error: Results must be a positive number
}
```
