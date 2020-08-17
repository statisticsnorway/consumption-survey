import moment from 'moment'

export const simpleFormat = (date) =>
    moment(date).locale('nb').format('DD.MM')
