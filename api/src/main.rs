mod route;
mod database;


use dotenv::dotenv;
use tower_http::cors::{CorsLayer};
use route::create_route;
use database::model::ApplicationForm;
use std::sync::{Arc, Mutex};

use tokio_postgres::{
    NoTls,
    Error,
    Client
};

use axum::http::{
    header::{ACCEPT, AUTHORIZATION, CONTENT_TYPE},
    HeaderValue, Method
};

struct AppState{
    client: Client,
    applications: Mutex<Vec<ApplicationForm>>
}


#[tokio::main]
async fn main() -> Result<(), Error>{
    //init dotenv
    dotenv().ok();

    //init database
    let db_host = std::env::var("POSTGRES_HOST").expect("POSTGRES_HOST must be set!");
    let db_name = std::env::var("POSTGRES_DB").expect("POSTGRES_DB must be set!");
    let db_user = std::env::var("POSTGRES_USER").expect("POSTGRES_USER must be set!");
    let db_password = std::env::var("POSTGRES_PASSWORD").expect("POSTGRES_PASSWORD must be set");

    let (client, connection) = 
        tokio_postgres::connect(&format!("host={} dbname={} user={} password={}", db_host, db_name, db_user, db_password), NoTls).await?;

    
    tokio::spawn(async move{
        if let Err(err) = connection.await {
            eprint!("Connection error: {err}")
        }
    });

    //Cors layer
    let cors = CorsLayer::new()
        .allow_origin("http://localhost:3000".parse::<HeaderValue>().unwrap())
        .allow_methods([Method::GET, Method::POST, Method::PATCH, Method::DELETE])
        .allow_credentials(true)
        .allow_headers([ACCEPT, AUTHORIZATION, CONTENT_TYPE]);

    //Create app
    let shared_state = Arc::new(
            AppState {
                applications: Mutex::new(client.query("select * from applications order by id", &[])
                    .await.unwrap().into_iter().map(Into::into).collect()),
                client: client,
            }
        );
    let app = create_route(shared_state).layer(cors);
    //Create listener
    let listener = tokio::net::TcpListener::bind("0.0.0.0:8080"). await.unwrap();

    //start server
    axum::serve(listener, app).await.unwrap();

    Ok(())
}
