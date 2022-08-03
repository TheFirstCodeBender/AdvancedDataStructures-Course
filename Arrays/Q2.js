/* 
    Question: You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]).

    Find two lines that together with the x-axis form a container, such that the container contains the most water.

    Return the maximum amount of water a container can store.

    Notice that you may not slant the container.
*/

/*  
    Step 1: Verify constraints
    n == height.length
    2 <= n <= 10^5
    0 <= height[i] <= 10^4

    From the above constraints we can determine that The length of the array n will never
    be less than two meaning that we will always have atleast two sides of the container thus
    we won't have to worry about a null case.
    From the last line we can also determine that there is a possibility that the height is 0 but that's okay because we will be multiplying.
    So we don't have to worry about undefined.

    Questions we might ask:
    Does the thickness of the lines affect the area?
    No, assume they take up no space.
    Do the left and right sides of the graph count as walls?
    No, the sides cannot be used to form a container.
    Does a higher line inside our container affect our area?
    No, lines inside a container don't affect the area.
*/


/*  
    Step 2: Write out some test cases
    My test cases
    Input: height = [7,5,6,10,21,5,6,4] 
    Output: 36
    Input: height = [1,0] 
    Output: 0

    Given test case
    Input: height = [1,8,6,2,5,4,8,3,7]
    Output: 49
    Explanation: The above vertical lines are represented by array
    [1,8,6,2,5,4,8,3,7]. In this case, the max area of water 
    (blue section) the container can contain is 49.
*/

/* Step 3: Figuring out a Naive solution
    How I would approach this, is by using a 2 pointer technique and start by setting a max area to be 0.
    Then I would loop over the array starting at the first pointer pointing at index of 0 and the second pointer
    always starting at the index after the first pointer. To determine the area we take the difference between the two indexes
    and multiply them by the height of the lowest height since if it was higher it would spill over. Then we start iterating over the array using the second
    pointer and comparing the current area to the max area if the current area is greater than 
    the max area then we set it to be the new max area otherwise we continue looping through.
    After pointing at all of the other heights with the second pointer we change the first pointer to be the second pointer and we
    continue iterating over the array with the second pointer shifting to the index to the right of the first pointer.

    After checking all possible area's we return the max area since it is indeed the max area of the container.
*/

/* Step 4: Write out Naive solution in code (I wrote it first😂) */

const findMaxArea = function (height) {
    // set initial maxArea to 0 so we can change it later
    let maxArea = 0;

    // set length of array height to n for readability
    const n = height.length;

    // first pointer that loops through the array starts at index 0
    for (firstPointer = 0; firstPointer < n; firstPointer++){

        // second pointer that loops through the array starts at the index after the first pointer so that there is no overlap
        for (let secondPointer = firstPointer + 1; secondPointer < n; secondPointer++) {

            //Determine the current height with the lowest height between the two heights.
            let currentHeight = Math.min(height[firstPointer], height[secondPointer])

            //set the current length to be the difference, distance, between the second pointer and the first pointer.
            let currentLength = secondPointer - firstPointer;
            
            // calculate the currentArea by multiplying the currentLength by the CurrentHeight
            let currentArea = currentLength * currentHeight

            //if it is greater than the current maxArea value replace the previous value with currentArea
            maxArea = Math.max(currentArea,maxArea)
        }
    }
    return maxArea
}

/* Step 5: Double check for errors 
    I forgot to switch the second pointer to subtract by the first pointer.
*/

/* Step 6: Test the Naive Brute force solution against your test cases.
    All of them are accepted
*/

/* Step 7: Space and Time Complexity
    Space complexity = O(1) Constant Time
    Time complexity = O(n^2) Quadratic Time 
*/

/* Step 8 and 9: Can we optimize our solution, if yes then write optimization
    So to understand how to optimize this we have to look at the formula that we use to calculate the area:
    area = min(pointer1Height,pointer2Height) * (pointer2index-pointer1index)
                (Height)                                (Length)
    since the height varies and the only value that actually matters and has potential of increasing the area is the minimum height
    we can simplify our time by having two pointers start at opposite sides of the array incrementally shift the pointer over when a number
    is less than the other number.
    This is called the two pointer technique.
*/

/* Step 10: Optimizing our solution with code */

const findMaxArea2 = function (height) {
    // set initial maxArea to 0 so we can change it later set pointers 1 and 2 to start and end respectively
    let maxArea = 0;
    let firstPointer = 0;
    let secondPointer = height.length - 1

    //loop through the array until first pointer < second pointer
    while (firstPointer < secondPointer) {
        // set values height and length and calculate area
        let currHeight = Math.min(height[firstPointer], height[secondPointer])
        let currLength = (secondPointer - firstPointer)
        let area = currHeight * currLength
        //set max area to be the greater of the two areas
        maxArea = Math.max(area, maxArea)
        //if height first pointer is less than height second pointer increment left or right depending on the lower height value.
        if (height[firstPointer] < height[secondPointer]) {
            firstPointer++
        } else {
            secondPointer--
        }
    }
    return maxArea
}
/* Step 11: Space time complexity of Optimization
    This creates a Time Complexity of O(n).
    Space Complexity is O(1)
*/