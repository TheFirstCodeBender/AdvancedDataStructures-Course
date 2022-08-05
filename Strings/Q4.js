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
        consider what happens when we have a #. Well we know that when we have a # that the other string MUST have one of these
        or a combination of them:

        1. Be shorter than the other string by that many #'s
        2. Have the equivalent #'s
        3. Have the equivalent incorrect characters

        We can easily test these by testing the difference between the distance of the # when we first see it to the next incorrect
        character. If the distance between the # and the next incorrect character is greater than 1 and we haven't seen a # tag in the
        other array then we know they can't be equal because the # cannot "reach" the incorrect matching pair to potentially make the 
        strings equal.
*/

/* ⬜ Step 10: Code Optimal Solution */
// ! Note to self haven't tested out whether this works or not yet but I suspect there is an incorrect logical reasoning.
const findStringMatchOptimal = function (S, T) {
    let sPointer = S.length - 1
    let tPointer = T.length - 1
    let hashCountS = 0
    let hashCountT = 0
    let incorrectCount = 0
    while (sPointer >= 0 || tPointer >= 0) {
        if (S[sPointer] === '#' || T[tPointer] === '#') {
            if (S[sPointer === '#']) {
                hashCountS++
                tPointer--
                sPointer--
            } else {
                hashCountT++
                tPointer--
                sPointer--
            }
        }
        else if (S[sPointer] !== T[tPointer]) {
            if (hashCountS === 0 && hashCountT === 0) {
                return false
            } else if (hashCountS > hashCountT) {
                hashCountS--
                tPointer--
                sPointer--
            } else {
                hashCountT--
                tPointer--
                sPointer--
            }
        } else {
            tPointer--
            sPointer--
        }
    }

}

/* ⬜ Step 11: Determine Space and Time Complexity 

*/