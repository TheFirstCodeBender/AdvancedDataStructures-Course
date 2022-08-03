// Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

// You may assume that each input would have exactly one solution, and you may not use the same element twice.

// You can return the answer in any order.

//Brute Force approach O(n^2) Time complexity O(1) Space Complexity
var twoSum = function(nums, target) {
    
    //Two pointer approach first pointer pointing at first index
    for (let i = 0; i < nums.length; i++) {
        //Second pointer pointing at indexes to the right
        for (let j = (i + 1); j < nums.length; j++) {
            //If the first pointer and second pointer === target number return the two indexes in an array.
            if ((nums[i] + nums[j]) === target) {
                return [i,j]
            }
        }
    }
};

//Optimized Approach O(n) Time complexity, O(n) Space complexity
var twoSum = function (nums, target) {
    //memory storage
    let memory = {}
    // loop through numbers
    for (let i = 0; i < nums.length; i++) {
        const currentVal = memory[nums[i]]
        //if current item doesn't exist
        if (currentVal === undefined) {
            //insert it's compliment as the key and put it's index as the value
            memory[(target - nums[i])] = i
        } else {
            //return index of compliment and current index since they are a match.
            return [memory[nums[i]],i]
        }
    }
    //If nothing is found return null
     return null
};