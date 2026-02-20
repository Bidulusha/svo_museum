use crate::database::model::{
    ApplicationForm,
    AnotherFormRaw,
    NarfuFormRaw,
    ApplicationStatus,
    ExcursionStatus
};
use tokio_postgres::Row;
use chrono::{NaiveDate, NaiveTime};

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
            organization: String::from("САФУ"),
            higher_school: item.higher_school,
            course: item.course,
            group_of: item.group,
            count_of_customers: item.count_of_customers,
            name_of_accompanying: item.name_of_accompanying,
            phone_number_of_accompanying: item.phone_number_of_accompanying,
            status: ApplicationStatus::SUBMITTED,
            excursion_status: ExcursionStatus::WAITING
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
            organization: item.organization_name,
            higher_school: String::from("higher_school_0"),
            course: -1,
            group_of: -1,
            count_of_customers: item.count_of_customers,
            name_of_accompanying: item.name_of_accompanying,
            phone_number_of_accompanying: item.phone_number_of_accompanying,
            status: ApplicationStatus::SUBMITTED,
            excursion_status: ExcursionStatus::WAITING
        }
    }
}

impl From<Row> for ApplicationForm{
    fn from(item: Row) -> Self {
        ApplicationForm {
            visit_date: item.get(1),
            visit_time: item.get(2),
            organization: item.get(3),
            higher_school: item.get(4),
            course: item.get(5),
            group_of: item.get(6),
            count_of_customers: item.get(7),
            name_of_accompanying: item.get(8),
            phone_number_of_accompanying: item.get(9),
            status: item.get(10),
            excursion_status: item.get(11)
        } 
    }
}