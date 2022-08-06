//Keys: ✅ = Complete ⬜ = Incomplete

//---------------------------------------------------------------------------------------------------------------------------------

/* Question: Given a string, find the length of the longest substring without repeating characters.

*/


/* ✅  Step 1: Verify Constraints
    0 <= s.length <= 5 * 104
    s consists of English letters, digits, symbols and spaces
    
    can we have an empty array?
    yes we can

    is the substring contiguous?
    yes, look for a substring not a subsequence

    Does case sensitivity matter?
    No, assume all characters in the string are lowercase.

    Personal Questions:
    substring vs. subsequence
    "abcbbd"
    substring: "abc" - contiguous
    subsequence: "abc__d" - not contiguous
    what is contiguous?
    characters are sequential and don't have any breaks in them.

*/


/* ✅  Step 2: Create Test Cases
        Best case:
        "abccabb" -> 3

        Single case:
        "ccccccc" -> 1

        Empty case:
        "" -> 0

        Overlapping Substrings case:
        "abcbda" -> 4
*/


/* ✅ Step 3: Figure out a solution without code 
    My thought Process:
    My initial thought process is to store the substring into an array and then iterate over the string and loop over the array to compare
    each character to the character of the larger string im about to add. If there is a character already in it then we start from the next character and do the same thing.

    After Watching Video:
    Creating a hashmap is faster and does reduce the time complexity by a factor of n but uses a bit more space due to hash size spacing
    but this is more ideal.

*/


/* ✅ Step 4: Code Solution */
var lengthOfLongestSubstring = function (s) {
    //intialize maxSubstring
    let maxSub = 0

    //small optimization
    if (s.length <= 1) {
        return s.length
    }
    //loop through Main string
    for (let i = 0; i < s.length; i++) {
            
        //reset/set currMap and sublength
        let currMap = {}
        let subLength = 0
        
            //loop through each potential instance of a substring and check for the longest one
        for (let k = i; k < s.length; k++){

                //check against current map to see if it exists
            if (currMap[s[k]]) {
                break
            }
            
            //otherwise push to map and increase subLength counter
            currMap[s[k]] = true
            subLength++
        }
        //compare to currentMaxSub and keep the greater value then reset currentMap and reset subLength
        maxSub = Math.max(maxSub, subLength)

    }
    //return maxSubstring value
    return maxSub
};

/* ✅ Step 5: Double Check for mistakes 
    Forgot to reset isFound to false. Later changed solution to Yihuas solution.
*/


/* ✅ Step 6: Test Naive Bruteforce solution against test cases 
    worked
*/


/* ✅ Step 7: Determine Space and Time Complexity
    Space Complexity: O(n)
    Time Complexity: O(n^2)
*/


/* ⬜ Step 8 and 9: can we optimize solution? if yes then how? 
    my thoughts: was not able to intuitively comme up with solution on my own. I wanted to use Linked lists.

    Sliding window Technique:
    Form a window over some portion of sequential data, then move that window throughout the data to capture different parts of it.

    Yi Hua's hints
    1st Hint: Use a sliding window to represent the current substring.

    2nd Hint: The size of the window will change ased on new characters and characters we've already seen before

    3rd Hint: Our seen Characters hashmap keeps track of what characters we've seen, and the index we saw them at.

    After Hint:
    So from my understanding we can create an initial hashmap and a variable that stores the length of the substring as we iterate over it
    the main string. While we are iterating over the main string we store the letter as a key and the index as the value or add + 1 since
    when we find that index we will actually be subtracting from the length and if the index is 0 we actually want to subtract something
    that will affect the value. After iterating through the whole string we return the length.
*/

/* ⬜ Step 10: Code Optimal Solution */
//"abcabcbb"
const theLongestSubstring = function (s) {
    let window = {}
    let length = 0
    let pointer = -1
    let maxLength = 0
    //loop through string
    for (let i = 0; i < s.length; i++) {
        //if the item in window exists and the index is greater than the pointer this means that the index is in the current substring so we subtract the
        //the characters preceding it from the length and move the pointer to the index number and delete the index or we could set the index
        //to 0 in this case im going to delete it from the hash map.
        if (window[s[i]] && window[s[i]] > pointer) {
            length -= window[s[i]] + 1
            pointer = window[s[i]]
            delete window[s[i]]
        } else {
            //set the key to character and the value to the index if it is a previous index that has been seen but was preceding the index
            //that we deleted we will just set the value to be the index and then we increment the length by 1.
            window[s[i]] = i
            length++
        }
        maxLength = Math.max(maxLength,length)
    }
    return length
    }

/* ⬜ Step 11: Double check Code always! */


/* ⬜ Step 12: Determine Space and Time Complexity 
    Space Complexity: O()
    Time Complexity: O()
*/