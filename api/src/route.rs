use axum::{routing::{get}, Router};
use crate::{database::model}

pub fn create_route() -> Router{
    Router::new()
        .route("/api/data", get(|| async {"hello!"}))
}