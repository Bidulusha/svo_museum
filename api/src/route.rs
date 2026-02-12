use std::sync::Arc;
use axum::{routing::{get, post}, Router};

use crate::{
    AppState, database::handler::{
            add_application_to_database, get_applicatoins_from_database
        }
};

pub fn create_route(shared_state: Arc<AppState>) -> Router{
    Router::new()
        .route("/api/insert_application", post(add_application_to_database))
        .route("/api/get_applications", get(get_applicatoins_from_database))
        .with_state(shared_state)
}