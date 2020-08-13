const Database = require('./db.js')
const createProffy = require('./createProffy')

Database.then(async (db) => {
    //Inserir dados
    proffyValue = {
        name: 'Bruno Sousa Dias',
        avatar: 'https://avatars3.githubusercontent.com/u/68758215?s=460&u=e996ee6ea0fdc629a90e2eb69d389b5cca9f362e&v=4',
        whatsapp: '99999999',
        bio: 'Tiozao hacker',
    }

    classValue = {
        subject: 4,
        cost: "50",
    }

    classScheduleValues = [
        {
            weekday: 1,
            time_from: 720,
            time_to: 1220
        },
        {
            weekday: 0,
            time_from: 520,
            time_to: 1220
        },
    ]

    //  await createProffy(db, {proffyValue,classValue,classScheduleValues})

    //Consultar os dados inserios

    //todos os proffys
    // const selectedProffys = await db.all("SELECT * FROM proffys")

    //consultar as classes de um determinado professor e trazer junto os dados do professor    
    // const selectedClassesAndProffys = await db.all(`
    //     SELECT classes.*, proffys.* FROM proffys JOIN classes 
    //     ON (classes.proffy_id = proffys.id)
    //     WHERE classes.proffy_id = 1;
    // `)

    //se o horário que a pessoa trabalha, por exemplo, é das 8h - 18h
    //o horário to time_from(8h) precisa ser maior ou igual ao horário solicidato
    //o time_to precisa ser acima

    const selectClassesSchedules = await db.all(`
        SELECT class_schedule.*
        FROM class_schedule
        WHERE class_schedule.class_id = 1 
        AND class_schedule.weekday = "0"
        AND class_schedule.time_from <= "520"
        AND class_schedule.time_to > "520"
    `)

})