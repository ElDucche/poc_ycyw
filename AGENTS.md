# Agent Guidelines for Proof-of-Concept Repository

This document provides guidelines for agentic coding tools operating in this repository.

## Project Structure

This is a full-stack application with:
- **Frontend**: Angular 21 application in `/front`
- **Backend**: Spring Boot 3.5.0 Java application in `/back`
- **Docker**: Containerized setup with docker-compose

## Build/Lint/Test Commands

### Backend (Spring Boot)

```bash
# Build the backend
./mvnw clean package

# Run the backend
./mvnw spring-boot:run

# Run all backend tests
./mvnw test

# Run a single test class
./mvnw test -Dtest=ChatApiApplicationTests
```

### Frontend (Angular)

```bash
# Install dependencies
npm install

# Run the frontend development server
npm run start

# Build the frontend for production
npm run build

# Run all frontend tests
npm run test

# Run a single test (using Vitest)
npx vitest run src/app/chat/chat.service.spec.ts
```

### Docker

```bash
# Build and run the full stack
docker-compose up --build

# Stop the containers
docker-compose down
```

## Code Style Guidelines

### TypeScript/Angular (Frontend)

#### Formatting
- **Indentation**: 2 spaces (configured in `.editorconfig`)
- **Quotes**: Single quotes for TypeScript, double quotes for HTML
- **Line Length**: 100 characters (Prettier configuration)
- **Trailing Whitespace**: Trimmed automatically
- **Final Newline**: Required

#### Imports
- Group imports by source (Angular, third-party, local)
- Use absolute paths for local imports starting from `src/`
- Example order:
  ```typescript
  import { Injectable } from '@angular/core';
  import { webSocket } from 'rxjs/webSocket';
  import { ChatMessage } from './chat-message.model';
  ```

#### Naming Conventions
- **Components**: PascalCase with `.component.ts` suffix
- **Services**: PascalCase with `.service.ts` suffix
- **Models**: PascalCase with `.model.ts` suffix
- **Variables**: camelCase
- **Constants**: UPPER_CASE
- **Signals**: Suffix with `Signal` (e.g., `messagesSignal`)

#### Types
- Use TypeScript strict mode (enabled in `tsconfig.json`)
- Prefer interfaces for data models
- Use `WritableSignal<T>` and `signal<T>()` for reactive state
- Avoid `any` type - use proper type annotations

#### Error Handling
- Use RxJS error handlers for observables
- Log errors to console with descriptive messages
- Example:
  ```typescript
  this.socket$.subscribe({
    error: (err) => console.error('WebSocket error:', err),
  });
  ```

#### Angular Specific
- Use standalone components (configured in `angular.json`)
- Prefer signals over BehaviorSubject for state management
- Use `@Injectable({ providedIn: 'root' })` for services
- Follow the single responsibility principle

### Java/Spring Boot (Backend)

#### Formatting
- Follow standard Java conventions
- Use 4 spaces for indentation
- Use proper JavaDoc for public methods
- Keep lines under 120 characters

#### Imports
- Group imports by package
- Use wildcard imports sparingly
- Example order:
  ```java
  import com.example.chat_api.models.ChatMessage;
  import org.springframework.messaging.handler.annotation.MessageMapping;
  import org.springframework.stereotype.Controller;
  ```

#### Naming Conventions
- **Classes**: PascalCase
- **Methods**: camelCase
- **Variables**: camelCase
- **Constants**: UPPER_CASE
- **Packages**: lowercase with dots

#### Types
- Use proper Java types
- Avoid raw types
- Use generics appropriately

#### Error Handling
- Use Spring's exception handling mechanisms
- Log errors appropriately
- Provide meaningful error messages

#### Spring Specific
- Use proper Spring annotations
- Follow RESTful conventions
- Use proper response codes
- Document API endpoints

## Testing Guidelines

### Frontend Testing
- Tests are written with Vitest
- Test files have `.spec.ts` suffix
- Focus on component and service testing
- Use Angular TestBed for component tests

### Backend Testing
- Tests are written with JUnit 5
- Test files are in `src/test/java`
- Focus on controller and service layer testing
- Use Spring Boot test utilities

## Development Workflow

1. **Feature Development**: Create feature branches from main
2. **Testing**: Write tests before or alongside implementation
3. **Code Review**: Follow the established patterns
4. **Documentation**: Update relevant documentation
5. **Merge**: Use pull requests with proper descriptions

## Important Notes

- The frontend uses Angular 21 with signals
- The backend uses Spring Boot 3.5.0
- Both services communicate via WebSocket
- The application is designed to run in Docker containers
- Follow the existing patterns and conventions in the codebase

## Additional Resources

- Angular Documentation: https://angular.dev
- Spring Boot Documentation: https://spring.io/projects/spring-boot
- RxJS Documentation: https://rxjs.dev
- TypeScript Handbook: https://www.typescriptlang.org/docs/handbook
