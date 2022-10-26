export { request } from './request'

// 防抖
export function debounce(fn, delay = 500, immediate = false) {
  let timer = null
  let flag = true
  return function () {
    if (timer) clearTimeout(timer)
    if (immediate) {
      if (flag) {
        fn.apply(this, arguments)
        flag = false
      }
      timer = setTimeout(() => {
        flag = true
      }, delay)
    } else {
      timer = setTimeout(() => {
        fn.apply(this, arguments)
      }, delay)
    }
  }
}

// 节流
export function throttle(fn, delay = 300) {
  let time = 0
  return function () {
    const now = Date.now()
    if (now - time >= delay) {
      fn.apply(this, arguments)
      time = now
    }
  }
}

// 是否在线
export function isOnline() {
  let networkType = 'none'
  uni.getNetworkType({
    success(res) {
      networkType = res.networkType
    }
  })
  return networkType !== 'none'
}

// 快排
export function quickSort(arr, l = 0, r = arr.length - 1, attribute) {
  if (l >= r) return

  let i = l - 1,
    j = r + 1,
    x = arr[l + ((r - l) >> 1)]

  while (i < j) {
    while (arr[++i] < x);
    while (arr[--j] > x);
    if (i < j) {
      ;[arr[i], arr[j]] = [arr[j], arr[i]]
    }
  }

  quickSort(arr, l, j)
  quickSort(arr, j + 1, r)
}

// 二分查找
export function binarySearch(arr, target) {
  let L = 0
  let R = arr.length - 1

  while (L <= R) {
    const centerIndex = L + ((R - L) >> 1)
    if (arr[centerIndex] > target) {
      R = centerIndex - 1
    } else if (arr[centerIndex] < target) {
      L = centerIndex + 1
    } else {
      return [centerIndex, arr[centerIndex]]
    }
  }

  return [-1, null]
}
