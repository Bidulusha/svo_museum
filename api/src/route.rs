use std::sync::Arc;

use axum::{routing::{get, post}, Router};

use crate::{
    database::handler,
    AppState
};

pub fn create_route(app_state: Arc<AppState>) -> Router{
    Router::new()
        .route("/api/data", get(|| async {"hello!"}))
        .with_state(app_state)
}