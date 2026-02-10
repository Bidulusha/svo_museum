use chrono::{NaiveDate, NaiveTime};
use uuid::Uuid;
use postgres_types::{ToSql, FromSql};

#[derive(Debug, Clone)]
enum ApplicationStatus {
    SUBMITTED,
    NEEDEDITING,
    ACCEPTED
}

#[derive(Debug, Clone)]
pub struct ApplicationForm{
    visit_date: NaiveDate,
    visit_time: NaiveTime,
    organization: String,
    higher_school: String,
    course: i16,
    group_of: i32,
    count_of_customers: i32,
    name_of_accompanying: String,
    phone_number_of_accompanying: String,
    status: ApplicationStatus
}

