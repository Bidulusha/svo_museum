use std::sync::Arc;
use crate::{AppState, database::model::ApplicationForm};
use tokio_postgres::{
    Client
};

impl ApplicationForm{
    //Select all
    pub async fn select_all(client: &Client) -> Vec<ApplicationForm> {
        match client
            .query("select * from applications", &[])
            .await {
                Ok(data) => {
                    data.into_iter().map(Into::into).collect()
                }
                Err(err) => {
                    eprintln!("Can't select all from applications! Error message: {:?}", err);
                    vec![]
                }
            }
    }

    // pub async fn select_all_and_order_by(client: &Client, filter: &'static str) -> Vec<ApplicationForm> {
    //     match client
    //         .query("select * from applications order by $1", &[&filter])
    //         .await {
    //             Ok(data) => {
    //                 data.into_iter().map(Into::into).collect()
    //             }
    //             Err(err) => {
    //                 eprintln!("Can't select all from applications! Error message: {:?}", err);
    //                 vec![]
    //             }
    //         }
    // }

    pub async fn insert_into(state: &Arc<AppState>, data: ApplicationForm) -> i8{
        match state.client.query(
            "insert into applications(visit_date, visit_time, \
            organization, higher_school, course, group_of, count_of_customers, \
            name_of_accompanying, phone_number_of_accompanying, status_of_application, status_of_excursion, \
            feedback, real_count_of_customers)\
            values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)", 
            &[&data.visit_date, &data.visit_time, &data.organization, &data.higher_school, 
            &data.course, &data.group_of, &data.count_of_customers, &data.name_of_accompanying,
            &data.phone_number_of_accompanying, &data.application_status, &data.excursion_status, 
            &data.feedback, &data.real_count_of_customers]
        ).await {
            Ok(_) => {
                println!("Add new application to database!");
                1
            }
            Err(err) => {
                eprintln!("Can't select all from applications! Error message: {:?}", err);
                0
            }
        }
    }


}