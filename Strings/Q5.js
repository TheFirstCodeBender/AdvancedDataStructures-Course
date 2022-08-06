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


/* ✅ Step 8 and 9: can we optimize solution? if yes then how? 
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

/* ✅ Step 10: Code Optimal Solution */
//My solution
const theLongestSubstring = function (s) {
   let memory = {}
    let leftPointer = 0
    let maxLength = 0
    //loop through string
    for (let rightPointer = 0; rightPointer < s.length; rightPointer++) {
        //initialize current character and whether it has been previously seen.
        const currChar = s[rightPointer]
        const prevSeenChar = memory[currChar]
        //if the item in window exists and the index is greater than the pointer this means that the index is in the current substring so we subtract the
        //the characters preceding it from the length and move the pointer to the index number and delete the index or we could set the index
        //to 0 in this case im going to delete it from the hash map.
        if (memory[currChar] >= leftPointer) {
            leftPointer = prevSeenChar + 1
            
        }
           //set the key to character and the value to the index if it is a previous index that has been seen but was preceding the index
            //that we deleted we will just set the value to be the index and then we increment the length by 1.
        memory[currChar] = rightPointer
        maxLength = Math.max(maxLength, rightPointer - leftPointer  + 1)
    }
    return maxLength
}
    
    //Yihua's solution
const lengthOfLongestSub = function (s) {
    //if it's 0 or 1 we know thats the longest string so we return 0
    if (s.length <= 1) return s.length;
    //initialize leftPointer and longest string and hashmap of seen characters
    const seenChars = {}
    let left = 0, longest = 0;
    //loop through characters of string using right pointer
    for (let right = 0; right < s.length; right++) {
        // set the current character to a variable and check to see if its previously seen.
        //if it is not in the hashmap it will be undefined else it will give the index of the character
        const currentChar = s[right];
        const prevSeenChar = seenChars[currentChar]
        //if it is seen it will be greater than the current left pointer because it will mean that it is in our current
        //substring then we set the value to the index +1 so that we dont include it. if it is undefined it will return false.
        if (prevSeenChar >= left) {
            left = prevSeenChar + 1;
        }
        //set the character to the index we are at since we will always be updating the location regardless of seen or not.
        //then we compare the longest substring to the current substring which is right index - left index + 1.
        seenChars[currentChar] = right;
        longest = Math.max(longest, right - left + 1);
    }
    //return longest
    return longest;
}
/* ✅ Step 11: Double check Code always! */


/* ✅ Step 12: Determine Space and Time Complexity 
    Space Complexity: O(N)
    Time Complexity: O(N)
*/