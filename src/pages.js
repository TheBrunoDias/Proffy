const Database = require('./database/db')

const { subjects, weekdays, getSubject, convertHourToMinutes } = require('./utils/format')

function pageLanding(req, res) {
    return res.render("index.html")
}

async function pageStudy(req, res) {
    const filters = req.query

    if (!filters.subject || !filters.weekday || !filters.time) {
        console.log(filters.subject, filters.weekday, filters.time)
        return res.render("study.html", { filters, subjects, weekdays })
    }

    //converter horas em minutos 
    const timeToMinutes = convertHourToMinutes(filters.time)

    const query = `
        SELECT classes.*, proffys.*
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE EXISTS(
            SELECT class_schedule.*
            FROM class_schedule
            WHERE class_schedule.class_id = classes.id
            AND class_schedule.weekday = ${filters.weekday}
            AND class_schedule.time_from <= ${timeToMinutes}
            AND class_schedule.time_to > ${timeToMinutes}
        )
        AND classes.subject = '${filters.subject}'
    `

    try {
        const db = await Database
        const proffys = await db.all(query)
        console.log("deu bom!")

        proffys.map((proffy) => {
            proffy.subject = getSubject(proffy.getSubject)
        })

        return res.render('study.html', { proffys, subjects, filters, weekdays })


    } catch (error) {
        console.log(error)
    }
}

function pageGiveClasses(req, res) {

    return res.render("give-classes.html", { subjects, weekdays })
}

async function saveClasses(req, res) {
    const createProffy = require('./database/createProffy')

    const proffyValue = {
        name: req.body.name,
        avatar: req.body.avatar,
        whatsapp: req.body.whatsapp,
        bio: req.body.bio
    }

    const classValue = {
        subject: req.body.subject,
        cost: req.body.cost
    }

    const classScheduleValues = req.body.weekday.map((weekday, index) => {
        return {
            weekday: weekday,
            time_from: convertHourToMinutes(req.body.time_from[index]),
            time_to: convertHourToMinutes(req.body.time_to[index])
        }
    })

        /*
       //se tiver dados(data)
       const isNotEmpty = (Object.keys(data).length > 0) //vai retornar 0 ou 1 
       if (isNotEmpty) {
   
           data.subject = getSubject(data.subject)
   
           //adicionar data a lista de proffys
           proffys.push(data)
   
       }
       */
    try{
        const db = await Database
        await createProffy(db, { proffyValue, classValue, classScheduleValues })


        let queryString = "?subject=" + req.body.subject
        queryString += "&weekday=" + req.body.weekday[0]
        queryString += "&time=" + req.body.time_from[0]


        return res.redirect("/study")
    }catch(error){
        console.log(error)
    }

}

module.exports = {
    pageLanding,
    pageStudy,
    pageGiveClasses,
    saveClasses
}