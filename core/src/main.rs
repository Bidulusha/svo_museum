//mod file -> find file.rs of file/mod.rs
mod handler;
mod route;

use tracing_subscriber::{
    layer::SubscriberExt,
    util::SubscriberInitExt
};

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
    let app = route::create_route();

    //Create Listener
    let listener = tokio::net::TcpListener::bind("0.0.0.0:3000").await.unwrap();
    
    axum::serve(listener, app).await.unwrap();
}