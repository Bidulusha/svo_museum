use serde::{Serialize, Deserialize};
use chrono::{NaiveDate, NaiveTime};
use sqlx::FromRow;
use uuid::Uuid;

enum ApplicationStatus {
    SUBMITTED,
    NEEDEDITING,
    ACCEPTED
}

#[derive(Debug, FromRow, Deserialize, Serialize)]
#[allow(non_snake_case)]
pub struct ApplicationsModel {
    pub id: Uuid,
    pub visit_date: NaiveDate,
    pub visit_time: NaiveTime,
    pub organization: String,
    pub higher_school: string,
    pub course: i16,
    pub group_of: i32,
    pub count_of_customers: i16,
    pub name_of_accompanying: String,
    pub phone_number_of_accompanying: String,
    pub status: ApplicationStatus
}