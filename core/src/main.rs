//mod file -> find file.rs of file/mod.rs
mod handler;
mod model;
mod route;

use std::net::SocketAddr;

use tracing_subscriber::{
    layer::SubscriberExt,
    util::SubscriberInitExt
};

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

    //Build route
    let app = route::create_route().layer(TraceLayer::new_for_http());

    //Create Listener
    let listener = tokio::net::TcpListener::bind("127.0.0.1:3000").await.unwrap();
    
    axum::serve(listener, app.into_make_service_with_connect_info::<SocketAddr>()).await.unwrap();
}