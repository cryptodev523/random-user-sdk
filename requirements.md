
# Build an SDK for Random User API

## Objective

Design an SDK that wraps around the [Random User API](https://randomuser.me/documentation). This SDK should simplify the process of fetching, filtering, and formatting user data for applications. The implementation should demonstrate your understanding of API design and good coding practices. You may use any programming language of your choice, though TypeScript, JavaScript, or Go are suggested.

## Requirements

### 1. Functionality: Fetch a List of Users

- The SDK must provide a way to retrieve a list of users from the API.
- Allow customization of the request using the following parameters:
  - `results`: Number of results
  - `gender`: Gender
  - `nat`: Nationality
- Return the data in the JSON format provided by the Random User API.
- Handle input validation and errors.

### 2. Functionality: Fetch a Random Single User

- The SDK must provide a way to fetch a single random user.
- Use the `results=1` parameter to retrieve one user.
- Allow optional filters such as gender and nationality.
- Return the data in the JSON format provided by the Random User API.

### 3. Helper Methods

- The SDK must include utility functions to:
  - Get a user's full name.
  - Get a formatted address.
  - Format a user's date of birth.

### 4. Testing
- Write unit tests to verify the functionality of the SDK.
- Include tests for both success and error scenarios.
