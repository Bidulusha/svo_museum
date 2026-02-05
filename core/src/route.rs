use axum::{
    routing::{
        get,
        post
    },
    Router
};

use crate::{
    handler
};

use tower_http::services::ServeDir;

//Creating app routing
pub fn create_route() -> Router {
    Router::new()
        .route("/", get(handler::main_page))
        .route("/form", get(handler::form_page))
        .route("/form", post(handler::submitted_form_page))
        .nest_service("/static", ServeDir::new("static"))
}