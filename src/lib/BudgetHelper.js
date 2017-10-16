import DateHelper from './DateHelper'

export default class BudgetHelper {

  constructor(budget) {
    this.budget = budget 
    this.logger = () => {}
  }

  budgetAmount() {
    const returnValue =  this.budget.categories.reduce((accumulator, category) => {
      return accumulator + category.amount
    }, 0)
    this.logger('BUDGET AMOUNT', returnValue)
    return returnValue
  } 

  budgetUsed() {
    const returnValue = this.budget.categories.reduce( (sum, category)  => {
      return sum + (category.transactions || []).reduce( (innerSum, transaction) => {
        return innerSum + transaction.value
      }, 0)
    },  0)
    this.logger('RETURN VALUE', returnValue)
    return returnValue
  }

  transactionCount() {
    const returnValue =  this.budget.categories.reduce((accumulator, category) => {
      return accumulator + (category.transactions || []).length
    }, 0)
    this.logger('TRANSACTION COUNT', returnValue)
    return returnValue
  }


  nextResetDate() {
    let returnValue = this.getDateHelper().nextResetDate()
    this.logger('NEXT RESET', returnValue)
    return returnValue
  }

  previousResetDate() {
    let returnValue = this.getDateHelper().previousResetDate()
    this.logger('PREVISO RESET', returnValue)
    return returnValue
  }

  getDateHelper() {
    if (!this.dateHelper) {
      this.dateHelper = new DateHelper({resetDate: this.budget.resetDate})
    }
    return this.dateHelper
  }

  all() {
    const output =  {
      budgetAmount: this.budgetAmount(),
      budgetUsed: this.budgetUsed(),
      transactionCount: this.transactionCount(),
      nextResetDate: this.nextResetDate(),
      previousResetDate: this.previousResetDate(),
    }
    return output
  }
}