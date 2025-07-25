use crate::predule::*;

use ai_types::llm::Role;
use axum::{body::Body, extract::Path, http::Response, response::IntoResponse};
use futures_util::{Stream, StreamExt, TryStreamExt};
use sse_stream::{Sse, SseBody};

#[worker::send]
async fn send_message(env: State<Env>, content: String) -> impl IntoResponse {
    let db = env.d1("chats").expect("D1 database not found");
    let id = uuid();

    let role = Role::User;
    let date = UtcDateTime::now();

    // Insert the message into the database
    query!(
        &db,
        "INSERT INTO messages (id, date, content, role) VALUES (?, ?, ?, ?)",
        id,
        date,
        content,
        role
    );

    // Create a response with the new message ID
    let response = Response::builder()
        .status(201)
        .body(Body::from(format!("Message sent with ID: {}", id)))
        .expect("Failed to create response");

    Body::new(SseBody::new(
        generate().map_ok(|chunk| Sse::default().data(chunk)),
    ))
}

fn generate() -> impl Stream<Item = Result<String, axum::Error>> {
    futures_util::stream::empty()
}

pub type FetchResponse = Vec<Message>;

#[derive(Debug, Serialize, Deserialize)]
pub struct Message {
    date: UtcDateTime,
    content: String,
    role: Role,
}

pub fn router(env: Env) -> Router {
    Router::new()
        .route("/:id", get(fetch))
        .route("/:id", post(send_message))
        .with_state(env)
}

#[worker::send]
async fn fetch(id: Path<Uuid>, env: State<Env>) -> Json<FetchResponse> {
    let db = env.d1("chats").expect("D1 database not found");
    let result: Vec<Message> = query!(&db, "SELECT * FROM messages WHERE id = ?", *id);

    Json(result)
}
