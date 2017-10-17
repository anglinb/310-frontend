import moment from 'moment'

export default class DateHelper {

  constructor({currentDate = moment(), resetDate}) {
    this.currentDate = currentDate
    this.resetDate  = resetDate
  }

  nextResetDate() {
    let nextResetDate
    let dayInCurrentMonth = this.currentDate.clone().date(this.resetDate)
    if (!this.currentDate.isBefore(dayInCurrentMonth)) {
      nextResetDate = dayInCurrentMonth.clone().add(1, 'months')
    } else {
      nextResetDate = dayInCurrentMonth
    }
    return nextResetDate
  }

  previousResetDate() {
    let nextResetDate = this.nextResetDate()
    return nextResetDate.clone().subtract(1, 'months')
  }

}