import CategoryHelper from './CategoryHelper'


export default class NotificationsHelper {

  constructor({ budget, thresholds = [ 0.5, 0.9 ] })  {
    this.budget = budget
    this.thresholds = thresholds
  }

  getThreshHolds(){
    return this.thresholds;
  }

  calculateSingleThreshold(category) {
    // Should return any categories that are over a threshold
      // this.budget.categories[i].thresholdmet = getThresholdMet(this.budget.categories[i]);
      // console.log('THRESHOLD IN CATEGRY:', this.budget.categories[i].thresholdmet);
      let categoryBudgetHelper = new CategoryHelper(category);
      let percentage = categoryBudgetHelper.categoryBudgetPercentage();
      for (var j=this.thresholds.length-1; j>=0; j--) {
        console.log('THRESHOLD:', this.thresholds[j]);
        if (percentage>=this.thresholds[j]){
              category.thresholdmet = this.thresholds[j];
              console.log('THRESHOLD IN CATEGRY:', category.thresholdmet);
              return category.thresholdmet;
        }
        else {
          return 0;
        }
      }

    }


  calculateThresholds() {
    // Should return any categories that are over a threshold

    //For each budget
    if(this.budget.categories != null){
      for (var i=0; i<this.budget.categories.length; i++) {

        // this.budget.categories[i].thresholdmet = getThresholdMet(this.budget.categories[i]);
        // console.log('THRESHOLD IN CATEGRY:', this.budget.categories[i].thresholdmet);
        let categoryBudgetHelper = new CategoryHelper(this.budget.categories[i]);
        let percentage = categoryBudgetHelper.categoryBudgetPercentage();
        percentage = percentage/100;
        console.log('PERCENTAGE:', percentage);
        for (var j=this.thresholds.length-1; j>=0; j--) {
          console.log('THRESHOLD:', this.thresholds[j]);
          if (percentage>=this.thresholds[j]){
                this.budget.categories[i].thresholdmet = this.thresholds[j];
                console.log('THRESHOLD IN CATEGRY:', this.budget.categories[i].thresholdmet);
                return this.budget.categories[i].thresholdmet;
          }
        }
      }
    }

  }

}
