import DateHelper from './DateHelper'

export default class BudgetHelper {

  constructor(budget) {
    this.budget = budget
    this.logger =  console.log //() => {} // Replace this with console.log to get messages
  }

  budgetAmount() {
    const returnValue =  this.budget.categories.reduce((accumulator, category) => {
      return accumulator + category.amount
    }, 0)
    //this.logger('BUDGET AMOUNT', returnValue)
    return returnValue
  }

  budgetUsed() {
    const returnValue = this.budget.categories.reduce( (sum, category)  => {
      return sum + (category.transactions || []).reduce( (innerSum, transaction) => {
        return innerSum + transaction.amount
      }, 0)
    },  0)
    //this.logger('RETURN VALUE', returnValue)
    return returnValue
  }


  budgetPercentage() {
    const budgetUsed = this.budgetUsed()
    const budgetAmount = this.budgetAmount()
    if (budgetAmount > 0) {
      return (budgetUsed / budgetAmount) * 100
    } else {
      return 0
    }
  }

  transactionCount() {
    const returnValue =  this.budget.categories.reduce((accumulator, category) => {
      return accumulator + (category.transactions || []).length
    }, 0)
    //this.logger('TRANSACTION COUNT', returnValue)
    return returnValue
  }


  nextResetDate() {
    let returnValue
    if(this.budget.resetType == "MONTH"){
      returnValue = this.getDateHelper().nextResetDateMonth()
    }
    else{
      returnValue = this.getDateHelper().nextResetDateWeek()
    }
    //this.logger('PREVISO RESET', returnValue)
    return returnValue
  }

  previousResetDate() {
    let returnValue
    if(this.budget.resetType == "MONTH"){
      returnValue = this.getDateHelper().previousResetDateMonth()
    }
    else{
      returnValue = this.getDateHelper().previousResetDateWeek()
    }
    //this.logger('PREVISO RESET', returnValue)
    return returnValue
  }

  transactions() {
    // let transactions = this.budget.categories.reduce((accumulator, category)  => {
    //   let categoryTransactions =
    //   return accumulator.concat(category.transactions)
    // })

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
      // budgetPercentage: this.budgetPercentage(),
      budgetUsed: this.budgetUsed(),
      transactionCount: this.transactionCount(),
      nextResetDate: this.nextResetDate(),
      previousResetDate: this.previousResetDate(),
    }
    return output
  }
}
