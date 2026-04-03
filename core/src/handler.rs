//Crates
use crate::{
    model
};

//Axum askama tokio
use askama::Template;
use axum::{
    response::{
        Html, 
        IntoResponse, 
        Response
    },
    http::StatusCode
};

//Reqwest
use reqwest;

//Projects files
use model::{
    ApplicationForm
};

//Base html template struct and handler
struct HtmlTemplate<T>(T);

impl<T> IntoResponse for HtmlTemplate<T>
where
    T: Template,
{
    fn into_response(self) -> Response{
        match self.0.render() {
            Ok(html) => Html(html).into_response(),
            Err(err) => (
                StatusCode::INTERNAL_SERVER_ERROR,
                format!("Failed to render template. Error: {err}")
            ).into_response(),
        }
    }
}

/*                  Main page                */
//get
#[derive(Template)]
#[template(path = "main_page/index.html")]
struct MainPageTemplate { }

pub async fn main_page() -> impl IntoResponse{
    let template = MainPageTemplate {};
    HtmlTemplate(template)
}


/*                      form page                       */
//get
#[derive(Template)]
#[template(path="form/form.html")]
struct FormTemplate { } 

pub async fn form_page() -> impl IntoResponse {
    let template = FormTemplate {};
    HtmlTemplate(template)
}

//post 
#[derive(Template)]
#[template(path="form/submitted_form.html")]
struct SubmittedFormTemplate {}

pub async fn submitted_form_page(raw_data: String) -> impl IntoResponse{
    let template = SubmittedFormTemplate {};
    println!("on submitted form");
    let client = reqwest::Client::new();
    client.post("http://localhost:8080/api/insert_application")
        .body(raw_data)
        .send()
        .await.unwrap();

    HtmlTemplate(template)
}

/*                      Admin page                   */
#[derive(Template)]
#[template(path="admin/index.html")]
struct AdminPageTemplate { }

pub async fn admin_page() -> impl IntoResponse{  //UPDATE THIS TO WEBSOCKET CONNECTION  
    let client = reqwest::Client::new();
    let raw_data = client.get("http://localhost:8080/api/get_applications")
        .send().await.unwrap().text().await.unwrap();
    let applications:Vec<ApplicationForm> = serde_json::from_str(&raw_data).unwrap();
    println!("{:?}", applications);
    
    let template = AdminPageTemplate {};
    HtmlTemplate(template)
}