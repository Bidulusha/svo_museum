use std::sync::Arc;
use axum::{routing::{get, post, any}, Router};

use crate::{
    AppState, handler::{
            add_application_to_database, admin_page_ws_handler, get_applicatoins_from_database
        }
};

pub fn create_route(shared_state: Arc<AppState>) -> Router{
    Router::new()
        .route("/api/insert_application", post(add_application_to_database))
        .route("/api/get_applications", get(get_applicatoins_from_database))
        .route("/api/admin_page_ws", any(admin_page_ws_handler))
        .with_state(shared_state)
}