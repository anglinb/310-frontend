
export default class CategoryHelper {

  constructor(category) {
    this.category = category
    this.logger = () => {} // Replace with console.log
  }

  categoryBudgetAmount() {
    if (!this.category) {
      return 0
    }
    let rollover = this.category.rolloverStatus === 'ACTIVE' ? (this.category.rollover || 0) : 0
    return this.category.amount  + rollover
  }

  categoryBudgetUsed() {
    if (!this.category) {
      return 0
    }
    return (this.category.transactions || []).reduce( (innerSum, transaction) => {
      return innerSum + transaction.amount
    }, 0)
  }

  categoryBudgetPercentage() {
    if (!this.category) {
      return 0
    }
    const budgetUsed = this.categoryBudgetUsed()
    const budgetAmount = this.categoryBudgetAmount()
    if (budgetAmount > 0) {
      return (budgetUsed / budgetAmount) * 100
    } else {
      return 0
    }
  }

}
