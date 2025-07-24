use axum::{Router, response::Response, routing::get};
use tower_service::Service;
use worker::{Context, Env, HttpRequest, event};

pub mod api;

pub async fn root() -> &'static str {
    "Hello Axum!"
}

fn router() -> Router {
    Router::new().route("/", get(root))
}

#[event(fetch)]
async fn fetch(req: HttpRequest, _env: Env, _ctx: Context) -> worker::Result<Response> {
    Ok(router().call(req).await?)
}
