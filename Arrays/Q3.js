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
     the ammount of water that we have is determined by the difference between the lowest height between the two hights and the
     height of the current index. It can be seen in this equation:
     CurrentWater = min(maxLeft,maxRight) - currentHeight
     To get the total ammount we just sum the the total currentWater at each index.
     so to start we set the initial total, maxLeft and maxRight to 0.
*/

const trappingRainWater = function (height) {
    let total, maxLeft, maxRight, currentHeight, currentWater = 0;

    for (let currentIndex = 0; currentIndex < height.length; currentIndex++) {
        currentHeight = height[currentIndex];
        for (let rightIndex = currentHeight + 1; rightIndex < height.length; rightIndex++) {
                maxRight = Math.max(height[rightIndex],maxRight)
        }
        for (let leftIndex = currentHeight + 1; leftIndex < height.length; leftIndex++) {
                maxLeft = Math.max(height[leftIndex],maxLeft)
        }

        currentWater = Math.min(maxLeft, maxRight) - currentHeight
        total += currentWater
    }
    return total
}