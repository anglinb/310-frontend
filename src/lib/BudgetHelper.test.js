import BudgetHelper from './BudgetHelper'

describe('BudgetHelper', () => {
  let budget 
  let budgetHelper
  beforeEach(() => {
    budget = {
      _id: '59e409b032d1c0c0a9eefd64',
      name: 'Budget 1',
      resetType: 'MONTH',
      resetDate: 1,
      owner_id: '59e3fe71bce41056bf4deb7f',
      categories: [
        {
          slug: 'food',
          name: 'Food',
          amount: 30
        }
      ],
      reated_at: '2017-10-16T01:21:52.369Z',
      updated_at: '2017-10-16T01:26:28.678Z'
    }
    budgetHelper = new BudgetHelper(budget)
  })

  it('should return from all without exception', () => {
    let { budgetAmount, budgetUsed, transactionCount, nextResetDate } = budgetHelper.all()
    expect(budgetAmount).toEqual(30)
    expect(budgetUsed).toEqual(0)
    expect(transactionCount).toEqual(0)
    // expect(nextResetDate.format('YYYY MM DD')).toEqual('2017 ')
  })

})