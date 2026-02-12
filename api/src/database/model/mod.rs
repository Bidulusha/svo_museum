mod struct_functions;
mod database_functions;

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

/*                              NARFU FOMR                       */
#[derive(Clone, Serialize, Deserialize, Debug)]
pub struct NarfuFormRaw{
    visit_date: String,
    visit_time: String,
    organization: String,
    higher_school: String,
    course: i16,
    group: i32,
    count_of_customers: i16,
    name_of_accompanying: String,
    phone_number_of_accompanying: String
}

/*                              ANOTHER FORM                      */
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct AnotherFormRaw{
    visit_date: String,
    visit_time: String,
    organization: String,
    organization_name: String,
    count_of_customers: i16,
    name_of_accompanying: String,
    phone_number_of_accompanying: String
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
    pub status: ApplicationStatus
}