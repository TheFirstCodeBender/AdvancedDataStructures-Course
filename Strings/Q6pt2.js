//Keys: ✅ = Complete ⬜ = Incomplete

//---------------------------------------------------------------------------------------------------------------------------------

/* Question:
    Given a string s, return true if the s can be palindrome after deleting at most one character from it.
*/


/* ✅ Step 1: Verify Constraints
    Do we consider a Palindrome as an almost palindrome?
    Yes, we do.
*/


/* ✅ Step 2: Create Test Cases
    "raceacar" => True
    "abccdba" => True
    "abcdefdba" => False
    "" => True
    "a" => True
    "ab" => True 
*/


/* ✅ Step 3: Figure out a solution without code 
    To figure out how to solve this we need to check the curent index forward 1 to see if it matches the current index if it does we continue
    if it doesnt then we return false. If it is incorrect again then we return false.
*/


/* ✅ Step 4: Code Solution */
//My Dog answer... 😂😢
const almostPalindrome = function (s) {
     function newString(indexSkip) {
        let newString = ""
        for (let i = 0; i <= s.length - 1; i++ ) {
            if (i != indexSkip) {
                newString += s[i]
            }

        }
        console.log(newString)
        return newString
    }
    if (s.length <= 2) {
        return true
    }
    s = s.replace(/[^A-Za-z0-9]/g, "").toLowerCase();
    let leftPointer = 0
    let rightPointer = s.length - 1
    while (leftPointer < rightPointer) {
        if (s[leftPointer] != s[rightPointer]) {
            let string = newString(leftPointer)
            let string2 = newString(rightPointer)
            if (string.length === 2) {
                if (string[leftPointer]!= string[rightPointer]) {
                    return false
                }
                if ( string2[leftPointer] != string[rightPointer]) {
                    return false
                }
                return true
            }
            while (leftPointer < rightPointer) {
                if (string[leftPointer] != string[rightPointer]) {
                    return false
                }
                if (string2[leftPointer] != string2[rightPointer]) {
                    return false
                }
                leftPointer++
                rightPointer--
            }
        }
        leftPointer++
        rightPointer--
    }
    return true
}
//Yihua's answer
const validsubPalindrome = function (s, left, right) {
    while (left < right) {
        if (s[left] !== s[right]) {
            return false;
        }
        left++;
        right--;
    }
    return true;
}
const isAlmostPalindrome = function (s) {
    s = s.replace(/[^A-Za-z0-9]/g, "").toLowerCase();
    let left = 0, right = s.length - 1;
    while (left < right) {
        if (s[left] != s[right]) {
            return validsubPalindrome(s,left + 1, right) || validsubPalindrome(s,left,right - 1)
        }
        left++;
        right--;
    }
    return true
}

/* ✅ Step 5: Double Check for mistakes 

*/


/* ✅ Step 6: Test Naive Bruteforce solution against test cases 

*/


/* ✅ Step 7: Determine Space and Time Complexity
    Space Complexity: O(1)
    Time Complexity: O(n)
*/


/* ✅ Step 8 and 9: can we optimize solution? if yes then how? 
    no.
*/
