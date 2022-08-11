//Keys: ✅ = Complete ⬜ = Incomplete

//---------------------------------------------------------------------------------------------------------------------------------

/* Question: Given a string, determine if it is a palindrome considering only alphanumeric
    characters and ignoring case sensitivity.

*/


/* ✅ Step 1: Verify Constraints
    Very clear what we need to do so we don't need to 
    verify any constraints
*/


/* ✅  Step 2: Create Test Cases
    "aabaa" => True
    "aabbaa" => True
    "abc" => False
    "a" => True
    "" => True
    "A man, a plan, a canal: Panama" => True


*/


/* ✅ Step 3: Figure out a solution without code 
    What we can do is set a pointer at the begining and end and then compare each character while moving inwards if it gets through
    return true otherwise return false.
    We can also reverse the string and then compare the reversed string to each other.
    We can also start from the middle and compare each character to each other from going inside out.
*/


/* ✅ Step 4: Code Solution */
// "A man, a plan, a canal: Panama"


const isValidPalindrome2outsidePointer = function (s) {
    if (s.length <= 1) {
        return true
    }
    s = s.replace(/[^A-Za-z0-9]/g, "").toLowerCase();
    let leftPointer = 0
    let rightPointer = s.length - 1
    while (leftPointer < rightPointer) {
        if (s[leftPointer] != s[rightPointer]) {
            return false
        }
        leftPointer++
        rightPointer--
    }
    return true
}


const isValidPalindrome2InsidePointer = function (s) {
    if (s.length <= 1) {
        return true
    }
    s = s.replace(/[^A-Za-z0-9]/g, "").toLowerCase();
    let length = s.length - 1
    let middle = Math.floor(length / 2)
    let rightPointer = middle
    let leftPointer = middle
    if (length % 2 === 0) {
        rightPointer++
    }
    while (leftPointer >= 0) {
        if (s[leftPointer] != s[rightPointer]) {
            return false
        }
        leftPointer--
        rightPointer++
    }
    return true
}


const isValidPalindromeReverse = function (s) {
    if (s.length <= 1) {
        return true
    }
    s = s.replace(/[^A-Za-z0-9]/g, "").toLowerCase();
    let length = s.length - 1
    reverse = ""
    for (let i = length; i >= 0; i--) {
        reverse += s[i]
    }
    let pointer = 0
    while (pointer <= length) {
        if (reverse[pointer] != s[pointer]) {
            return false
        }
        pointer++
    }
    return true
}
/* ✅ Step 5: Double Check for mistakes 
    Done
*/


/* ✅ Step 6: Test Naive Bruteforce solution against test cases 
    Done
*/


/* ✅ Step 7: Determine Space and Time Complexity
    Space Complexity: O(n) or O(1)
    Time Complexity: O(n)
*/


/* ✅ Step 8 and 9: can we optimize solution? if yes then how? 
    No This was just a sub problem
*/

/* ⬜ Step 10: Code Optimal Solution */


/* ⬜ Step 11: Double check Code always! */


/* ⬜ Step 12: Determine Space and Time Complexity 
    Space Complexity: O()
    Time Complexity: O()
*/