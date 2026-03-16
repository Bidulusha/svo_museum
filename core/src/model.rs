use serde::{
    Serialize,
    Deserialize
};

use chrono::{
    NaiveTime,
    NaiveDate,
};

/*                              STATUS ENUM                      */
#[derive(Debug, Clone, Serialize, Deserialize)]
pub enum ApplicationStatus {
    SUBMITTED,
    NEEDEDITING,
    ACCEPTED
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub enum ExcursionStatus {
    WAITING,
    ACCEPTED,
    MOVED,
    CANCELLED,
    SUCCEED
}


/*                              APPLICATION FORM                 */
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ApplicationForm{
    pub visit_date: NaiveDate,
    pub visit_time: NaiveTime,
    pub organization: String,
    pub higher_school: String,
    pub course: i16,
    pub group_of: i32,
    pub count_of_customers: i16,
    pub name_of_accompanying: String,
    pub phone_number_of_accompanying: String,
    pub application_status: ApplicationStatus,
    pub excursion_status: ExcursionStatus,
    pub feedback: String,
    pub real_count_of_customers: i16
}