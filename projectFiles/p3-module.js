//function coinCombo accepts an integer representing the number of pennies
//returns an array of objects of the possible coinage combinations where each object contains each of:
//pennies, nickels, dimes, quarters, halves, dollars

function coinCombo(amount) {
    const coinValues = [1, 5, 10, 25, 50, 100]; // Coin values in pennies
    const coinNames = ['pennies', 'nickels', 'dimes', 'quarters', 'halves', 'dollars'];
    let combinations = [];

    function findCombinations(index, remainingAmount, currentCombo) {
        if (index === coinValues.length) {
            if (remainingAmount === 0) {
                combinations.push({ ...currentCombo });
            }
            return;
        }

        for (let count = 0; count <= Math.floor(remainingAmount / coinValues[index]); count++) {
            currentCombo[coinNames[index]] = count;
            findCombinations(index + 1, remainingAmount - count * coinValues[index], currentCombo);
        }
    }

    const totalCombinations = { total: combinations.length}
    findCombinations(0, amount, {});
    
    console.log(`amount: ${amount}`);
    console.log(`combinations:`);
    console.log(combinations.map(combo => JSON.stringify(combo)).join('\n'));
    return totalCombinations;
}


//function coinValue(cointCounts) accepts an object with properties representing each coin and amount
//returns an object with the following properties:
//coins: an obect that essentially duplicates the submitted values
//totalCents: totala amount in pennies
//totalDollars: total cents divided by 100 to two decimal places using toFixed(2)
//Must use object deconstruction of the coinCounts parameter to separate into the different values as variables

function coinValue(cointCounts) {
    const { pennies, nickels, dimes, quarters, halves, dollars } = cointCounts;
    const coinValues = [1, 5, 10, 25, 50, 100];
    const coinNames = ['pennies', 'nickels', 'dimes', 'quarters', 'halves', 'dollars'];

    let totalCents = 0;
    let coins = {};

    for (let i = 0; i < coinNames.length; i++) {
        coins[coinNames[i]] = cointCounts[coinNames[i]];
        totalCents += cointCounts[coinNames[i]] * coinValues[i];
    }

    const totalDollars = (totalCents / 100).toFixed(2);

    return {
        coins,
        totalCents,
        totalDollars
    };
}
/*
// Test cases for coinValue function
function testCoinValue() {
    const testCases = [
        {
            input: { pennies: 10, nickels: 0, dimes: 0, quarters: 0, halves: 0, dollars: 0 },
            expected: { coins: { pennies: 10, nickels: 0, dimes: 0, quarters: 0, halves: 0, dollars: 0 }, totalCents: 10, totalDollars: "0.10" }
        },
        {
            input: { pennies: 0, nickels: 2, dimes: 1, quarters: 1, halves: 0, dollars: 1 },
            expected: { coins: { pennies: 0, nickels: 2, dimes: 1, quarters: 1, halves: 0, dollars: 1 }, totalCents: 140, totalDollars: "1.40" }
        },
        {
            input: { pennies: 5, nickels: 1, dimes: 0, quarters: 0, halves: 0, dollars: 0 },
            expected: { coins: { pennies: 5, nickels: 1, dimes: 0, quarters: 0, halves: 0, dollars: 0 }, totalCents: 10, totalDollars: "0.10" }
        }
    ];

    testCases.forEach(({ input}, index) => {
        const result = coinValue(input);
        console.log(`Test Case ${index + 1}:`);
        console.log(JSON.stringify(result.coins,null,2));
        //console.log(`coins: ${JSON.stringify(result.coins, null, 2)}`);
        console.log(`totalCents: ${result.totalCents}`);
        console.log(`totalDollars: ${result.totalDollars}`);
        console.log('-------------------------');
    });
}

// Run the test cases
testCoinValue();
*/
if (require.main === module) {

    console.log('\n===== Manual Tests for coinCombo() =====');
    const testCombo1 = coinCombo(5);
    console.log(`Test 1 - coinCombo(5)`);
    console.log(`Expected combinations > 0, Actual: ${testCombo1.totalCombinations}`);
    console.log('Sample:', testCombo1.combinations.slice(0,3));
  
    const testCombo2 = coinCombo(0);
    console.log(`\nTest 2 - coinCombo(0)`);
    console.log(`Expected: 1 combination with all zeros`);
    console.log('Actual:', testCombo2.combinations);
  
    const testCombo3 = coinCombo(-5);
    console.log(`\nTest 3 - coinCombo(-5)`);
    console.log(`Expected: 0 combinations`);
    console.log('Actual:', testCombo3.totalCombinations);
  
    console.log('\n===== Manual Tests for coinValue() =====');
    const testValue1 = coinValue({ pennies: 4, nickels: 1, dimes: 2, quarters: 1, halves: 0, dollars: 1 });
    console.log(`Test 1 - coinValue({4p,1n,2d,1q,0h,1$})`);
    console.log(`Expected cents: 4 + 5 + 20 + 25 + 0 + 100 = 154`);
    console.log('Actual:', testValue1.totalCents, `($${testValue1.totalDollars})`);
  
    const testValue2 = coinValue({});
    console.log(`\nTest 2 - coinValue({})`);
    console.log(`Expected: 0 cents`);
    console.log('Actual:', testValue2.totalCents, `($${testValue2.totalDollars})`);
  
    const testValue3 = coinValue({ pennies: '10', nickels: '2', dollars: '1' });
    console.log(`\nTest 3 - coinValue(string inputs)`);
    console.log(`Expected: 10 + 10 + 100 = 120`);
    console.log('Actual:', testValue3.totalCents, `($${testValue3.totalDollars})`);
  }

  module.exports = {
    coinCombo,
    coinValue
  }