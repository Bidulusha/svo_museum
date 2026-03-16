const ws = new WebSocket('ws://localhost:8080/api/admin_page_ws', 'protocol1')

ws.onopen = function (event) {
    ws.send('Hallo??')
}

ws.onmessage = function (event) {
    console.log(event.data)
}

const app = Vue.createApp({
    delimiters: ['${', '}'],
    data() {
        return {
            headers: [
                'Дата посещения','Время посещения', 
                'Организация', 'Высшая школа', 'Курс', 
                'Группа', 'Количество посетителей', 'ФИО сопровождающего', 
                'Телефонный номер сопровождающего', 'Стату заявки', 'Статус экскурсии',
                'Обратная связь', 'Реальное количество участников'
            ],
            higher_schools: [
                "-",
                "ВШИТАС", "ВИШ", "ВШСГНиМК", "ВШЭНиГ", 
                "ВШППиФК", "ВШЭУиП", "ВШЕНиТ", "ВШРиМТ", 
                "ТК Императора Петра I", "ГумИн", "ИСМАРТ", 
                "ТК (Северодвинск)"
            ],
            application_status_list: {
                'SUBMITTED': 'заполнена',
                'NEEDSEDITING': 'нужно отредактировать',
                'ACCEPTED': 'принята'
            },
            excursion_status_list:{
                'waiting accepting': 'Ожидает подтверждения',
                'accepted': 'Принята',
                'moved': 'Перенесена',
                'cancelled': 'Отменена',
                'succeed': 'Прошла'
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