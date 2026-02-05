mod route;
mod database;

use std::sync::Arc;
use axum::http::{
    header::{ACCEPT, AUTHORIZATION, CONTENT_TYPE},
    HeaderValue, Method
};
use dotenv::dotenv;
use tower_http::cors::{Any, CorsLayer};
use route::create_route;
use tokio_postgres::{
    NoTls,
    Error
};

pub struct AppState{
    db: Pool<Postgres>
}

#[tokio::main]
async fn main() {
    //init dotenv
    dotenv().ok();

    //init database
    let database_url = std::env::var("DATABASE_URL").expect("DATABASE_URL must be set!");




    //Cors layer
    let cors = CorsLayer::new()
        .allow_origin("http://localhost:3000".parse::<HeaderValue>().unwrap())
        .allow_methods([Method::GET, Method::POST, Method::PATCH, Method::DELETE])
        .allow_credentials(true)
        .allow_headers([ACCEPT, AUTHORIZATION, CONTENT_TYPE]);

    //Create app
    let app = create_route(Arc::new(AppState{ db: pool.clone() })).layer(cors);
    //Create listener
    let listener = tokio::net::TcpListener::bind("0.0.0.0:8080"). await.unwrap();

    //start server
    axum::serve(listener, app).await.unwrap();
}
