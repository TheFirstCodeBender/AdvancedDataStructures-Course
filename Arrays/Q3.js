/* Question: Given n non-negative integers representing an elevation map where the width of each bar is 1, 
compute how much water it can trap after raining.
*/

 
/* Step 1: Verify constraints

    n == height.length
    1 <= n <= 2 * 104
    0 <= height[i] <= 105

    From the above constraints we can determine that there will always at least be one block.
    Also we can rule out that there will be no negative numbers.

    Do the left and the right sides of the graph count as walls?
    No, the sides are not walls.
    Will there be negative integers?
    No, assume all integers are positive.
*/

/* Step 2: Create Test cases
    Input: [0,1,0,2,1,0,3,1,0,1,2]
    Output: 8

    Input: height = []
    Output: 0

    Input: height = [3]
    Output: 0

    Input: [3,4,3]
    Output: 0
     
*/

/* Step 3: Figure out a solution without code
     When we visually look at this problem we can see that at any one point 
     the amount of water that we have is determined by the difference between the lowest height between the two heights and the
     height of the current index. It can be seen in this equation:
     CurrentWater = min(maxLeft,maxRight) - currentHeight
     To get the total amount we just sum the the total currentWater at each index.
     so to start we set the initial total, maxLeft and maxRight to 0.
*/


/* Step 4: Code Solution */
var trap = function (height) {
    //set initial total water to 0
    let totalWater = 0;

    //Loop through the array with an initial pointer starting at index 0
    for (let pointer = 0; pointer < height.length; pointer++) {
        
        //set leftPointer and rightPointer to start at pointer and reset max for left and right
        let leftPointer = pointer, rightPointer = pointer;
        let maxLeft = 0, maxRight = 0;

        //while pointer is greater than or equal to 0 loop and compare the current height to maxleft and get the greater one.
        while (leftPointer >= 0) {
            maxLeft = Math.max(maxLeft, height[leftPointer]);
            leftPointer--;       
        }
        //while pointer is less than the length of array loop and compare the current height to maxRight and get the greater one.
        while(rightPointer < height.length) {
            maxRight = Math.max(maxRight,height[rightPointer]);
            rightPointer++;
        }
        
        //set the current water to be the min between left and right heights and subtract the current height of initial pointer 
        let currentWater = Math.min(maxLeft,maxRight) - height[pointer];
        if (currentWater >= 0) {
            totalWater += currentWater;
        }
    }
    return totalWater
};

/* Step 5: Check for Mistakes
    Mistakingly set let leftPointer, rightPointer = pointer; Which made leftPointer undefined
    this doesn't affect both of them it only affects leftPointer...
    to fix:
    let leftPointer = pointer, rightPointer = pointer;
*/

/* Step 6: Test Naive Bruteforce against test cases.
    All steps work after checking and changing syntax.
*/

/* Step 7: Space and Time Complexity
    Space Complexity: O(1)
    Time Complexity: O(n^2)
*/

/* Step 8 and 9: Can we optimize? if yes how?
    When trying to optimize this we need to look at how we assess if we can optimize our time by creating space:
------------------------------------------------------------------------------------------------------------
    var trap = function (height) {
    let totalWater = 0; // Just stores final answer
    for (let pointer = 0; pointer < height.length; pointer++) {
        let leftPointer = pointer, rightPointer = pointer;
        let maxLeft = 0, maxRight = 0;
        while (leftPointer >= 0) {
            maxLeft = Math.max(maxLeft, height[leftPointer]);
            leftPointer--;       
        }
        while(rightPointer < height.length) {
            maxRight = Math.max(maxRight,height[rightPointer]);
            rightPointer++;
        }
        let currentWater = Math.min(maxLeft,maxRight) - height[pointer];
        if (currentWater >= 0) {
            totalWater += currentWater;
        }
    }
    return totalWater
-----------------------------------------------------------------------------------------------------------
    When we analyze our code we can see that there isn't much that can be used to store memory in a datastructure for scaleable use since
    our whole for loop logic is dependant on the current iteration.
    However if we try to think about it using the two pointer technique we can see that we are in a way doing it since both our
    while loops loop over different sides of our array once to equal a total of O(n). So that means that we may be able to use this
    technique to reduce time complexity.
    Next we have to consider how do we shift each pointer we need to understand the reasoning as to why we would move one pointer over the 
    other. Once we move a pointer we are at a new iteration. To understand how we are iterating we need to look at our formula to find the current water:
------------------------------------------------------------    
    CurrentWater = min(maxLeft,maxRight) - currentHeight
------------------------------------------------------------    
    Like the previous example we can try to start from both ends of the array but when we start from both ends we don't actually know 
    anything about the middle of the array so we can't calculate the current water that way. So we have to think about how do we determine the value 
    that has the greatest imapct on currentWater? When we check our equation we can see that just like the previous equation the value that has the greatest 
    impact at determining the currentWater is the min between the Left and the right max because we know that that is the value we will reduce by the current
    height to get the currentWater.
    So the Question is how do we get the maxLeft or maxRight and currentHeight with only 2 pointers looping once?
    we can actually do this by setting our initial maxLeft and maxRight to 0 and starting at both sides and shift the pointer towards the center based on the min pointer once we
    we use the lesser of the two pointer values to compare to the max value at that side because we know that on the otherside there has to be a wall because
    it's greater than the current value. then we compare the current pointers value to the current max on that side and the currentWater is the 
    difference between the two.  if the current value happens to be greater than or equal to the max value on that side
    we replace the max value after that we then shift and restart the whole process again.
*/

/* Step 10: Code Optimal Solution */
//Input: [0,1,0,2,1,0,3,1,0,1,2]
var trap = function (height) {
    //Initialize variables
    let totalWater = 0;
    let leftPointer = 0, rightPointer = height.length - 1;
    let maxLeft = 0, maxRight = 0;

    //loop throught height array until leftpointer = right pointer
    while (leftPointer < rightPointer) {

        // reset currentWater and height everytime we loop through
        let currentHeight = 0, currentWater = 0;
        
        //check if either the right or the left pointer value is greater if so we use the other value for current height.
        if (height[leftPointer] < height[rightPointer]) {
            currentHeight = height[leftPointer]

            //if the current height is less than maxLeft we know there is water above it so we can calculate the currentWater otherwise we set it
            //to be the new maxLeft
            if (currentHeight < maxLeft) {
                currentWater = maxLeft - currentHeight
            } else {
                maxLeft = currentHeight
            }
            // shift the pointer towards the opposite pointer
            leftPointer++

            //The height value is less so we set the curent height to the right pointers value.
        } else {
            currentHeight = height[rightPointer]

            //like above if the current height is less than maxRight we know there is water above so we calculate the currentWater otherwise we set it 
            //to be the new maxRight.
            if (currentHeight < maxRight) {
                currentWater = maxRight - currentHeight
            } else {
                maxRight = currentHeight
            }
            // shift the pointer towards the opposite pointer
            rightPointer--
        }
        // at the end we add currentWater to totalWater
        totalWater += currentWater
    }
    // After loop is done we return the sum of all currentWater
    return totalWater
};

/* Step 11: Space time complexity of Optimization
    Space Complexity: O(1)
    Time Complexity: O(n)
*/



/* Yihua's steps 
    1. Identify pointer with lesser value
    2. Is this pointer value lesser than or equal to max on that side
     if yes get water for pointer value, add to total
     if no update max on that side
    3. move pointer inwards
    4. repeat for other pointer

*/
