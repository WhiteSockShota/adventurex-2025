use axum::{
    extract::{WebSocketUpgrade, ws::WebSocket},
    response::Response,
};
use worker::durable_object;

const SYSTEM_PROMPT: &str = include_str!("../../../prompts/patient_zero.txt");

#[durable_object]
pub struct State {}

impl DurableObject for State {
    fn new(state: worker::State, env: worker::Env) -> Self {
        Self {}
    }

    async fn fetch(&self, req: worker::Request) -> worker::Result<worker::Response> {
        todo!()
    }
}

async fn websocket(mut ws: WebSocket) -> Result<(), axum::Error> {
    while let Some(msg) = ws.recv().await {
        let msg = msg?;
    }

    Ok(())
}

pub async fn handler(upgrade: WebSocketUpgrade) -> Response {
    upgrade.on_upgrade(async |ws| match websocket(ws).await {
        Ok(_) => (),
        Err(e) => eprintln!("WebSocket error: {e}"),
    })
}
