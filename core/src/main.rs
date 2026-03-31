//mod file -> find file.rs of file/mod.rs
mod handler;
mod model;
mod route;

use std::net::SocketAddr;

use tracing_subscriber::{
    layer::SubscriberExt,
    util::SubscriberInitExt
};

use tower_http::cors::{CorsLayer};
use axum::{extract::ws::{Message, WebSocket}, http::{
    HeaderValue, Method, header::{ACCEPT, AUTHORIZATION, CONTENT_TYPE}
}};


use tower_http::trace::TraceLayer;

#[tokio::main]
async fn main(){
    //Add logging
    tracing_subscriber::registry()
        .with(
            tracing_subscriber::EnvFilter::try_from_default_env()
                .unwrap_or_else(|_| format!("{}=debug", env!("CARGO_CRATE_NAME")).into()),
        )
        .with(tracing_subscriber::fmt::layer())
        .init();


    // let cors = CorsLayer::new()
    //     .allow_origin("http://0.0.0.0:3000".parse::<HeaderValue>().unwrap())
    //     .allow_methods([Method::GET, Method::POST, Method::PATCH, Method::DELETE])
    //     .allow_credentials(true)
    //     .allow_headers([ACCEPT, AUTHORIZATION, CONTENT_TYPE]);
    //Build route
    let app = route::create_route().layer(TraceLayer::new_for_http());

    //Create Listener
    let listener = tokio::net::TcpListener::bind("0.0.0.0:3000").await.unwrap();
    
    axum::serve(listener, app.into_make_service_with_connect_info::<SocketAddr>()).await.unwrap();
}