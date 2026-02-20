use crate::{ database::model::{AnotherFormRaw, ApplicationForm, NarfuFormRaw}, AppState };

use std::{sync::Arc};
use axum::{ extract::State, Json };
use serde_html_form;

// ADD TO DATABASE
pub async fn add_application_to_database(State(state): State<Arc<AppState>>, raw_data: String){
    let mut data: Option<ApplicationForm> = None;
   
    match serde_html_form::from_str::<NarfuFormRaw>(&raw_data){
        Ok(form) => {
            data = Some(form.into());
        }
        Err(_) => {
            match serde_html_form::from_str::<AnotherFormRaw>(&raw_data){
                Ok(form) => {
                    data = Some(form.into());
                }
                Err(err) => {
                    println!("Error to deserialize data! Error message {:?}", err) // ADD ERROR PAGE
                }
            }
        }
    }
    println!("{:?}", data);

    ApplicationForm::insert_into(state, data.unwrap()).await;
}

// GET FROM DATABASE AlL
pub async fn get_applicatoins_from_database(State(state): State<Arc<AppState>>) -> Json<Vec<ApplicationForm>>{
    Json(state.applications.lock().unwrap().clone())
}