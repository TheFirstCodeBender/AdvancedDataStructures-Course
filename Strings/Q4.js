/* Question: Given two strings S and T, return if they equal when both are typed out. Any '#' that
    appears in the string counts as a backspace.
*/

/* ✅ Step 1: Verify the constraints

    What happens when two #'s appear beside each other?
    Delete the values before the first #
    Ex. "ab##"
    Result: "" Deletes both characters

    What happens to # when there is no character to remove?
    It deletes nothing then, just like backspace would.
    Ex. "a###b"
    Result: "b"

    Are two empty strings equivalent to each other?
    Yes, consider two empty strings as equal.
    Ex. S: "x#y#z#" T: "a#"
    Result: S:"" === T:""

    Does case sensitivity matter?
    Yes it does, "a" does not equal "A"
    (Note) If it had been no we would have to just lower case all letters or
    vice versa since case sensetivity doesnt matter and by default in javascript
    it does.
*/

/* ✅ Step 2: Write out some test cases
        Best Case Test Case
    Input: S: "ab#z" T: "az#z"
    Output: (S: "az" === T: "az") === True

        False Test Case
    Input: S: "abc#d" T: "acc#c"
    Output: (S: "abd" === T: "acc") === False

        Empty String Case
    Input: S: "x#y#z#" T: "a#"
    Output: (S: "" T: "") === True

        Consecutive Hashes Case
    Input: S: "a###b" T: "b"
    Output: (S: "b" === T: "b") === True

        Case Sensitivity Case
    Input: S: "Ab#z" T: "ab#z"
    Output: (S: "Az" === "az") === False
*/

/* ✅ Step 3: Figure out a solution without code
    Think about how we would solve this logically, first thing that comes to mind is that we can compare each index to each other.
    However we soon realize that comparing the character locations to each other initially doesn't necessarily work because the final result 
    can be equivalent if there is a # that follows the differing characters. So really we can only compare the two strings 
    after they have been turned into their final output considering the #. So a way we could approach this problem would be
    to loop over each string individually and turn them to their final result. After that we can loop over each of them and compare
    each idividual character.
*/

/* ✅ Step 4: Code brute force solution */

// ! Important note! This solution Does not Show we are good Developers because it is not DRY
const findStringMatchBad = function (S, T) {
    //Set initial arrays
    const Sarray = []
    const Tarray = []

    // iterate through S array and push each character onto array otherwise pop if it is a #
    for (let i = 0; i < S.length; i++) {
        if (S[i] === '#') {
            Sarray.pop()
        } else {
            Sarray.push(S[i])
        }
    }

    // iterate through T string and push each character onto array otherwise pop from array if it is a #
    for (let i = 0; i < T.length; i++) {
        if (T[i] === '#') {
            Tarray.pop()
        } else {
            Tarray.push(T[i])
        }
    }

    // Check if the final length of the arrays are equal if not return false
    if (Tarray.length !== Sarray.length) {
        return false
    }
    
    //check if each character is equivalent to each other if not return false
    for (let i = 0; i < Tarray.length; i++) {
        if (Tarray[i] !== Sarray[i]) {
            return false
        }
    }

    // if you haven't returned false yet then the two strings must be equivalent.
    return true
}


// * This Shows Good Practice because we are not repeating the for loop!
const findStringMatchGood = function (S, T) {
    
    //Create function that will loop through and create the final string (in this case array) without the #.
    function initialToFinal(str) {
        let strArray = []
        for (let i = 0; i < str.length; i++) {
            if (str[i] === '#') {
                strArray.pop()
            } else {
                str.push(str[i])
            }
        }
        return strArray
    }

    // Set the final arrays equal to the product of the strings being passed into the initialToFinal function
    const Sarray = initialToFinal(S); // O(a)
    const Tarray = initialToFinal(T); // O(b)

    // Check if the final length of the arrays are equal if not return false
    if (Tarray.length !== Sarray.length) {
        return false
    }
    
    //check if each character is equivalent to each other if not return false
    for (let i = 0; i < Tarray.length; i++) {
        if (Tarray[i] !== Sarray[i]) {
            return false
        }
    }

    // if you haven't returned false yet then the two strings must be equivalent.
    return true
}

/* ✅ Step 5: Check for mistakes 
    I forgot to put paranthesis () on push and instead put brackets []
    Didn't initally write a function for clean code with the for loops
*/

/* ✅ Step 6: Test Naive Bruteforce solution against test cases 
    Works.
*/


/* ✅ Step 7: Determine Space and Time Complexity
    
    Space Complexity: O(a+b)
    Time Complexity: O(2a+b) or O(a+2b) => O(a+b)

*/


/* ✅ Step 8 and 9: can we optimize solution? if yes then how? 
        It must be our space complexity because our time complexity is essentially O(n).
        Space: O(a + b)

        Yihua's Hints to optimizing
        1st Hint: Utilize the original stirngs.
        2nd Hint: Use 2 pointer technique.
        3rd Hint: Start from the end of the strings.

        So when we analyze this we have to look at how we can check each string without storing it. Disregarding Yihua's Hint if
        we go forward we know that a backspace can appear at any moment but we don't know how many or what the previous value is
        or where the incorrect value is.
        However when we start from the end we KNOW that they last values must equal each other because a # is a backspace and therefore 
        only affects the characters that are before it and not after it when reading the string from left to right. Next we have to
        consider what happens when we have a #. When we look at a #
*/

/* ✅ Step 10: Code Optimal Solution */

//My solution
var backspaceCompare = function (S, T) {
    //create a function that skips the pointer if it is equal to a hashtag and returns pointer
    function skiphash(string, pointer) {
        let hashCount = 0
        let temppointer = pointer

        while (string[pointer] === '#') {
                // while pointer is still === '#' increase hashcount and increment 1
                while (string[temppointer] === '#') {
                    hashCount++
                    temppointer--
            }
                //loop through and check each value before removing it
            for (let i = 0; i < hashCount; i++) {
            
                //if value is equivalent to '#' break out of loop
                   if (string[temppointer] === '#') {
                       break
                    //if not skip it and reduce hashcount by 1
                   } else {
                       temppointer--
                       hashCount--
                   }
            }
            // when hash count is 0 make temppointer = to pointer to break out of loop
                if(hashCount === 0) {
                    pointer = temppointer
                }
            
        }
        // return new pointer location
        return pointer
    }
    // start at both ends of each respective string
    let sPointer = S.length - 1
    let tPointer = T.length - 1

    // while either pointer is greater than 0 loop through
    while (sPointer >= 0 || tPointer >= 0) {

        // if either pointer value = # run it through the hash function. if it doesn't ==='#' it will never go through the while loop
        // and it will just return
        if (S[sPointer] === '#' || T[tPointer] === '#') {
            sPointer = skiphash(S, sPointer)
            tPointer = skiphash(T, tPointer)
        // if the pointer values are not equal then return false
        } else if (S[sPointer] !== T[tPointer]) {
            return false
        //else shift pointers
        } else {
            sPointer--
            tPointer--
        }
    }
    // if it hasn't returned false then it must be true!
    return true
};

// Yihua's Solution
const backspaceCompareYi = function (s, t) {
    let p1 = s.length - 1, p2 = t.length - 1;
    while (p1 >= 0 || p2 >= 0) {
        if (s[p1] === "#" || t[p2] === "#") {
            if (s[p1] === "#") {
                let backCount = 2;
                while (backCount > 0) {
                    p1--;
                    backCount--;
                    if (s[p1] === "#") {
                        backCount = backCount +2
                    }
                }
            }
            if (t[p2] === "#") {
                let backCount = 2;
                while (backCount > 0) {
                    p1--;
                    backCount--;
                    if (t[p2] === "#") {
                        backCount = backCount + 2;
                    }
                }
            }
        } else {
            if (s[p1] !== t[p2]) {

            } else {
                p1--;
                p2--;
            }
        }
    }
}
/* ✅ Step 11: Double check code!

    All good in the hood!
*/

/* ✅ Step 12: Space and Time Complexity 
    Space Complexity: O(1)
    Time Complexity: O(a + b)
*/


//! A lot of the techniques can be used differently but how you use them is the main thing this course is teaching us!
//! Understanding breakdown problems and work on abstract and critical thinking