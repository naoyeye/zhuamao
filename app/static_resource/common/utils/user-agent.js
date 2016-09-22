let ua = navigator.userAgent

const WX_PATTERN = /micromessenger/i
const FRODO_PATTERN = /com.douban.frodo/i
const WEIBO_PATTERN = /weibo/i
const ANDROID_PATTERN = /Android/i

export function isWeixin() {
  if (!ua) {
    return false
  }

  return WX_PATTERN.test(ua)
}

// 4.0.1 后的 Frodo 可唤起支付宝 App 支付
export function isNewAlipayFrodo() {
  if (!ua) {
    return false
  }
  
  let version_pattern = /.*com\.douban\.frodo[\S]*\/([0-9]{1,2}\.[0-9]{1,2}\.[0-9]{1,2}).*/i

  let version = ua.replace(version_pattern, function (a, b) {
    return b
  })

  if (FRODO_PATTERN.test(ua)) {
    let major_version = parseInt(version[0])
    let minor_version = parseInt(version[2])
    let patch_version = parseInt(version[4])
    if (major_version >= 4 && (minor_version > 0 || patch_version > 0)) {
        return true 
    }
  }
  return false
}

export function isFrodo() {
  if (!ua) {
    return false
  }

  return FRODO_PATTERN.test(ua)
}

export function isLowFrodo() {
  if (!ua) {
    return false
  }

  let version_pattern = /.*com\.douban\.frodo\/([0-9]{1,2}\.[0-9]{1,2}\.[0-9]{1,2}).*/gi
  let version = ua.replace(version_pattern, function (a, b) {
    return b
  })

  if (isAndroid() && FRODO_PATTERN.test(ua) && parseFloat(version, 10) < 3.6) {
    return true
  }

  return false
}

export function isWeibo() {
  if (!ua) {
    return false
  }

  return WEIBO_PATTERN.test(ua)
}

export function isAndroid() {
  if (!ua) {
    return false
  }

  return ANDROID_PATTERN.test(ua)
}
