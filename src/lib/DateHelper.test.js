import moment from 'moment'
import DateHelper from './DateHelper'

describe('nextResetDate', () => {
  it('should find the next reset date when it has passed', () => {
    let dateHelper = new DateHelper({
      currentDate: moment('2017-10-15'),
      resetDate: 1, // It resets on the 1st of the month
    })
    let nextResetDate = dateHelper.nextResetDate()
    expect(nextResetDate.format('YYYY MM DD')).toEqual('2017 11 01')
  })
  it('should find the next reset date when it has not passed', () => {
    let dateHelper = new DateHelper({
      currentDate: moment('2017-10-15'),
      resetDate: 20, // It resets on the 20th of the month
    })
    let nextResetDate = dateHelper.nextResetDate()
    expect(nextResetDate.format('YYYY MM DD')).toEqual('2017 10 20')
  })
  it('should find the next reset date (in the next month) when it is equal', () => {
    let dateHelper = new DateHelper({
      currentDate: moment('2017-10-15'),
      resetDate: 15, // It resets on the 0th of the month
    })
    let nextResetDate = dateHelper.nextResetDate()
    expect(nextResetDate.format('YYYY MM DD')).toEqual('2017 11 15')
  })
  it('should handle looping around years', () => {
    let dateHelper = new DateHelper({
      currentDate: moment('2017-12-15'),
      resetDate: 2, // It resets on the 0th of the month
    })
    let nextResetDate = dateHelper.nextResetDate()
    expect(nextResetDate.format('YYYY MM DD')).toEqual('2018 01 02')
  })
})

describe('previousResetDate', () => {
  it('should find the next reset date when it has passed', () => {
    let dateHelper = new DateHelper({
      currentDate: moment('2017-10-15'),
      resetDate: 1, // It resets on the 1st of the month
    })
    let previousResetDate = dateHelper.previousResetDate()
    expect(previousResetDate.format('YYYY MM DD')).toEqual('2017 10 01')
  })
  it('should find the next reset date when it has not passed', () => {
    let dateHelper = new DateHelper({
      currentDate: moment('2017-10-15'),
      resetDate: 20, // It resets on the 20th of the month
    })
    let previousResetDate = dateHelper.previousResetDate()
    expect(previousResetDate.format('YYYY MM DD')).toEqual('2017 09 20')
  })
  it('should find the next reset date (in the next month) when it is equal', () => {
    let dateHelper = new DateHelper({
      currentDate: moment('2017-10-15'),
      resetDate: 15, // It resets on the 0th of the month
    })
    let previousResetDate = dateHelper.previousResetDate()
    expect(previousResetDate.format('YYYY MM DD')).toEqual('2017 10 15')
  })
  it('should handle looping around years', () => {
    let dateHelper = new DateHelper({
      currentDate: moment('2018-01-01'),
      resetDate: 5, // It resets on the 0th of the month
    })
    let previousResetDate = dateHelper.previousResetDate()
    expect(previousResetDate.format('YYYY MM DD')).toEqual('2017 12 05')
  })

})