const app = Vue.createApp({
    delimiters: ['${', '}'],
    data() {
        return {
            headers: [
                'Дата посещения','Время посещения', 
                'Организация', 'Высшая школа', 'Курс', 
                'Группа', 'Количество посетителей', 'ФИО сопровождающего', 
                'Телефонный номер сопровождающего', 'Стату заявки'],
            higher_schools: [
                "-",
                "ВШИТАС", "ВИШ", "ВШСГНиМК", "ВШЭНиГ", 
                "ВШППиФК", "ВШЭУиП", "ВШЕНиТ", "ВШРиМТ", 
                "ТК Императора Петра I", "ГумИн", "ИСМАРТ", 
                "ТК (Северодвинск)"
            ],
            status_list: {
                'SUBMITTED': 'заполнена',
                'NEEDSEDITING': 'нужно отредактировать',
                'ACCEPTED': 'принята'
            },
            applications: []
        }
    },
    async mounted() {
        await this.getApplications()
    },
    methods: {
        async getApplications(){
            return $.ajax({
                url: 'http://localhost:8080/api/get_applications',
                method: 'get',
                dataType: 'json',
            }).then((response) => {
                this.applications = response
            }).catch(() => {
                console.log('rejected!')
            })
        }
    }
})

app.mount("#table_app")