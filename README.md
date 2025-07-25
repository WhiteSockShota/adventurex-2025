# Adventure X 2025 Project - 异常 Exception

This repostiory is for `异常 Exception` , a game.

# API Documentation

## Character API (/character/:name)

Character is a AI chatbot who is loyal to their profile. You can create a new chat with a character.
By track of the chat id, users could chat with character independently and sequentially.

### Create a chat with a certain character

`POST` /character/:name

### Response

```typescript
interface Response {
  id: UUID;
}
```

You could use this `id` by Chat API.

## Chat API (/chat/:id)

### Fetch previous messages

`GET` /chat/:id

#### Response

```typescript
interface Message {
  date: Date; // Utc-offset
  content: String; // Markdown format
  role: Role;
}

enum Role {
  User,
  Character,
}

type Response = Message[];
```

### Send a message (SSE-based)

`POST` /chat/:id

Request body content type: text/plain; charset=UTF-8

Response body content type: text/event-stream

> Warning: This method not atomic, which means that if connection is closed unexpectedly,
> the server would not stop to generate content, and following request will be blocking util this request is finished.

# Character profile

## 零号病人 (id: patient_zero)

TODO: Complete introduciton
