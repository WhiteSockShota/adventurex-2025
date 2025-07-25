use axum::Json;
use serde::Serialize;

use crate::{Uuid, uuid};

#[derive(Debug, Serialize)]
pub struct Response {
    id: Uuid,
}

pub fn create_chat() -> Json<Response> {
    let id = uuid();
    Json(Response { id })
}
