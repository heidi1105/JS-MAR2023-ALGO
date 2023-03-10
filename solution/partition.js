/* 
  Params: nums, left, right
    - left and right are indexes, for now, left will be 0, and right will be
        the last idx.
    - later these params will be used to specify a sub section of the array to
        partition.
  Steps
  1. Pick an number out of the arr to be your pivot value
    - usually the middle idx but can be any.
  2. Partition the array IN PLACE such that all values less than the pivot
      value are to the left of it and all values greater than the pivot value
      are to the right (not perfectly sorted).
  3. return: the index where the left section of smaller items ends.
  "Choosing a random pivot minimizes the chance that you will encounter
  worst-case O(n^2) performance (always choosing first or last would cause
  worst-case performance for nearly-sorted or nearly-reverse-sorted data).
  Choosing the middle element would also be acceptable in the majority of
  cases."
  https://stackoverflow.com/questions/164163/quicksort-choosing-the-pivot
*/

const nums1 = [11, 8, 14, 3, 6, 2, 7];

// original : [11, 8, 14, 3, 6, 2, 7]
// new.    :  [ 3, 6, 2, 7, 11, 8, 14]

// return the pivot index :3

/* 
There are many possible answers for nums1 depending on which number is chosen
as the pivot.
E.g., if 3 is chosen as the pivot, the below are some solutions because
numbers smaller than 3 are to the left and larger numbers are to the right
[2, 3, 7, 6, 11, 8, 14]
[2, 3, 11, 8, 7, 6, 14]
[2, 3, 8, 7, 11, 6, 14]
[2, 3, 8, 6, 14, 7, 11]
*/
const nums2 = [11, 8, 14, 3, 3, 3, 6, 2, 7];
const nums3 = [1, 17, 12, 3, 9, 13, 21, 4, 27];
const nums4 = [2, 1];

/**
 * Partitions the given array in-place by selecting the number at the middle
 * index to use it as a "pivot" value, then arranges all numbers less than the
 * pivot to be to it's left and all larger numbers to the right of the pivot.
 * - Time: O(?).
 * - Space: O(?).
 * @see num
 *    visualization of quickSort. Focus only on the first cycle of the visualization
 *    for the partition portion only.
 * @param {Array<number>} nums
 * @param {number} left The index indicating the start of the slice of array
 *    being processed.
 * @param {number} right The index indicating the end of the slice of array
 *    being processed.
 * @returns {Array<number>} The idx where left section of smaller items ends.
 */
function partition(nums = [], left = 0, right = nums.length - 1) {
  const pivot = nums[Math.floor(nums.length / 2)]
  const leftArr = []
  const rightArr = []
  for(let i = 0; i < nums.length ; i++){
    if(i === nums[Math.floor(nums.length / 2)]){
      continue
    }
    if(nums[i] >= pivot){
      rightArr.push(nums[i])
    }else{
      leftArr.push(nums[i])
    }
  }
  leftArr.push(pivot) 
  console.log(pivot)
  return leftArr.concat(rightArr)
  
}

// console.log(partition(nums1))
// console.log(partition(nums2))
// console.log(partition(nums3))
// console.log(partition(nums4))

function partition2(nums = [], left = 0, right = nums.length - 1) {
  let pivot = nums[Math.floor((left + right) / 2)]


  while (left <= right) {
    while (nums[left] < pivot) {
      left++;
    }
    while (nums[right] > pivot) {
      right--;
    }
    if (left <= right) {
      let temp = nums[left]
      nums[left] = nums[right]
      nums[right] = temp
      left++
      right--
    }
  }
  console.log(nums)
  return left;
}

function partition3(nums, leftIdx = 0, rightIdx = nums.length - 1) {
  const midIdx = Math.floor((leftIdx + rightIdx) / 2);
  const pivotVal = nums[midIdx];
  const tempPivotIdx = rightIdx;

  // Swap the pivot to the end of the section being partitioned so its
  // position can be kept track of, then move it last to its final position.
  [nums[midIdx], nums[tempPivotIdx]] = [nums[tempPivotIdx], nums[midIdx]];

  // Skip over the pivot that was moved to the end so it stays there for now.
  rightIdx = tempPivotIdx - 1;

  // Look for a num on the left and on the right that both need to be moved to
  // the other side so one swap can move both of them to the correct side.
  while (true) {
    // Move leftIdx until we find a num that is out of place.
    while (nums[leftIdx] < pivotVal) {
      leftIdx += 1;
    }

    // Move rightIdx until we find a num that is out of place.
    while (nums[rightIdx] > pivotVal) {
      rightIdx -= 1;
    }

    // All nums have been iterated over, partitioning is complete.
    if (leftIdx >= rightIdx) {
      // Swap the pivot to it's final location.
      [nums[tempPivotIdx], nums[leftIdx]] = [nums[leftIdx], nums[tempPivotIdx]];
      
      console.log(nums)
      console.log("Pivot: "+ pivotVal)
      
      return leftIdx;
    }

    // Swap the two out of place nums so they will both be on the correct side.
    [nums[leftIdx], nums[rightIdx]] = [nums[rightIdx], nums[leftIdx]];

    // After swapping, we're done with this pair, move on.
    leftIdx += 1;
    rightIdx -= 1;
  }
}