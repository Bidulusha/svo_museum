use serde::{
    Serialize,
    Deserialize
};

use chrono::{
    NaiveTime,
    NaiveDate,
};

/*                              STATUS ENUM                      */
#[derive(Debug, Clone)]
enum ApplicationStatus {
    SUBMITTED,
    NEEDEDITING,
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
    count_of_customers: i32,
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
    count_of_customers: i32,
    name_of_accompanying: String,
    phone_number_of_accompanying: String
}

/*                              APPLICATION FORM                 */
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


/*                              FROM IMPLEMENTATIONS             */
//APP TO NARFU
impl From<ApplicationForm> for NarfuFormRaw{
    fn from(item: ApplicationForm) -> Self{
        NarfuFormRaw {
            visit_date: item.visit_date.to_string(),
            visit_time: item.visit_time.to_string(),
            organization: item.organization,
            higher_school: item.higher_school,
            course: item.course,
            group: item.group_of,
            count_of_customers: item.count_of_customers,
            name_of_accompanying: item.name_of_accompanying,
            phone_number_of_accompanying: item.phone_number_of_accompanying
        }
    }
}

//NARFU TO APP
impl From<NarfuFormRaw> for ApplicationForm{
    fn from(item: NarfuFormRaw) -> Self{
        ApplicationForm {
            visit_date: NaiveDate::parse_from_str(&item.visit_date, "%Y-%m-%d").unwrap(),
            visit_time: NaiveTime::parse_from_str(&item.visit_time, "%H:%M").unwrap(),
            organization: item.organization,
            higher_school: item.higher_school,
            course: item.course,
            group_of: item.group,
            count_of_customers: item.count_of_customers,
            name_of_accompanying: item.name_of_accompanying,
            phone_number_of_accompanying: item.phone_number_of_accompanying,
            status: ApplicationStatus::SUBMITTED
        }
    }
}

//APP TO ANTH
impl From<ApplicationForm> for AnotherFormRaw{
    fn from(item: ApplicationForm) -> Self{
        AnotherFormRaw {
            visit_date: item.visit_date.to_string(),
            visit_time: item.visit_time.to_string(),
            organization: String::from("another"),
            organization_name: item.organization,
            count_of_customers: item.count_of_customers,
            name_of_accompanying: item.name_of_accompanying,
            phone_number_of_accompanying: item.phone_number_of_accompanying
        }
    }
}
//ANTH TO APP
impl From<AnotherFormRaw> for ApplicationForm{
    fn from(item: AnotherFormRaw) -> Self{
        ApplicationForm {
            visit_date: NaiveDate::parse_from_str(&item.visit_date, "%Y-%m-%d").unwrap(),
            visit_time: NaiveTime::parse_from_str(&item.visit_time, "%H:%M").unwrap(),
            organization: item.organization,
            higher_school: String::from("-"),
            course: -1,
            group_of: -1,
            count_of_customers: item.count_of_customers,
            name_of_accompanying: item.name_of_accompanying,
            phone_number_of_accompanying: item.phone_number_of_accompanying,
            status: ApplicationStatus::SUBMITTED
        }
    }
}