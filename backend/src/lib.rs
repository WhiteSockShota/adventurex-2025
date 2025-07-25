#![allow(clippy::future_not_send)]

use axum::{Router, response::Response, routing::get};
use tower_service::Service;
use worker::{Context, Env, HttpRequest, event};
pub mod api;

mod macros;
mod predule {
    pub use crate::*;
    pub use axum::{
        Json,
        extract::{Path, State},
        routing::{Router, get, post},
    };
    pub use serde::{Deserialize, Serialize};
    pub use time::UtcDateTime;

    pub use worker::Env;
}

pub async fn root() -> &'static str {
    "Hello Axum!"
}

fn router() -> Router {
    Router::new().route("/chat", get(root))
}

#[event(fetch)]
async fn fetch(req: HttpRequest, _env: Env, _ctx: Context) -> worker::Result<Response> {
    Ok(router().call(req).await?)
}

type Uuid = String;

#[must_use]
#[allow(clippy::missing_panics_doc)]
pub fn uuid() -> Uuid {
    use std::str::FromStr;
    let window = web_sys::window().expect("No global `window` exists");
    let crypto = window.crypto().expect("No global `crypto` exists");
    let uuid = crypto.random_uuid();
    Uuid::from_str(&uuid).expect("Invalid UUID format")
}
