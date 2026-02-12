use std::sync::Arc;
use crate::{AppState, database::model::ApplicationForm};
use tokio_postgres::{
    Row
};

impl ApplicationForm{
    //Select all
    pub async fn select_all(state: Arc<AppState>) -> Vec<Row> {
        match state.client
            .query("select * from applications", &[])
            .await {
                Ok(data) => {
                    data
                }
                Err(err) => {
                    eprintln!("Can't select all from applications! Error message: {:?}", err);
                    vec![]
                }
            }
    }

    pub async fn select_all_and_order_by(state: Arc<AppState>, filter: String) -> Vec<Row> {
        match state.client
            .query("select * from applications order by $1", &[&filter])
            .await {
                Ok(data) => {
                    data
                }
                Err(err) => {
                    eprintln!("Can't select all from applications! Error message: {:?}", err);
                    vec![]
                }
            }
    }

    pub async fn insert_into(state: Arc<AppState>, data: ApplicationForm){
        match state.client.query(
            "insert into applications(visit_date, visit_time, \
            organization, higher_school, course, group_of, count_of_customers, \
            name_of_accompanying, phone_number_of_accompanying, status) \
            values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)", 
            &[&data.visit_date, &data.visit_time, &data.organization, &data.higher_school, 
            &data.course, &data.group_of, &data.count_of_customers, &data.name_of_accompanying,
            &data.phone_number_of_accompanying, &data.status]
        ).await {
            Ok(_) => {
                state.applications.lock().unwrap().push(data);
            }
            Err(err) => {
                eprintln!("Can't select all from applications! Error message: {:?}", err);
            }
        }
    }


}