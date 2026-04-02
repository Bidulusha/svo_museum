
use serde::{Serialize, Deserialize};
use postgres_types::{ToSql, FromSql};
use chrono::{NaiveTime, NaiveDate};


/*                              STATUS ENUM                      */
#[derive(Debug, Clone, ToSql, FromSql, Serialize, Deserialize)]
#[postgres(name = "application_status")]
pub enum ApplicationStatus {
    #[postgres(name="submitted")]
    SUBMITTED,
    #[postgres(name="needs editing")]
    NEEDSEDITING,
    #[postgres(name="accepted")]
    ACCEPTED
}

#[derive(Debug, Clone, ToSql, FromSql, Serialize, Deserialize)]
#[postgres(name = "excursion_status")]
pub enum ExcursionStatus {
    #[postgres(name="waiting accepting")]
    WAITING,
    #[postgres(name="accepted")]
    ACCEPTED,
    #[postgres(name="moved")]
    MOVED,
    #[postgres(name="cancelled")]
    CANCELLED,
    #[postgres(name="succeed")]
    SUCCEED
}


/*                              NARFU FOMR                       */
#[derive(Clone, Serialize, Deserialize, Debug)]
pub struct NarfuFormRaw{
    pub visit_date: String,
    pub visit_time: String,
    pub organization: String,
    pub higher_school: String,
    pub course: i16,
    pub group: i32,
    pub count_of_customers: i16,
    pub name_of_accompanying: String,
    pub phone_number_of_accompanying: String
}

/*                              ANOTHER FORM                      */
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct AnotherFormRaw{
    pub visit_date: String,
    pub visit_time: String,
    pub organization: String,
    pub organization_name: String,
    pub count_of_customers: i16,
    pub name_of_accompanying: String,
    pub phone_number_of_accompanying: String
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