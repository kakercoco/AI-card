export function dateFtt (fmt, date) {
  var o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    'S': date.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(fmt)) { fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length)) }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) { fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length))) }
  }
  return fmt
}

export const config = {
  '0': '<i>查看</i>了你的<i>名片</i>',
  '1': '<i>查看</i>了你的<i>官网</i>',
  '2': '<i>查看</i>了你的<i>案例</i>',
  '3': '<i>查看</i>了你的<i>产品</i>',
  '4': '<i>拨打</i>了你的<i>手机</i>',
  '5': '<i>拨打</i>了你的<i>座机</i>',
  '6': '<i>播放</i>了你的<i>语音介绍</i>',
  '7': '<i>复制</i>了你的<i>微信</i>，注意你的微信好友',
  '8': '<i>复制</i>了你的<i>邮箱</i>，留意你的邮件信息',
  '9': '<i>复制</i>了你的<i>公司名称</i>',
  '10': '<i>复制</i>了你的<i>公司地址</i>',
  '11': '<i>赞</i>了你的<i>标签</i>',
  '12': '<i>赞</i>了你的<i>企业动态</i>',
  '13': '<i>评论</i>了你的<i>企业动态</i>',
  '14': '<i>保存</i>了你的<i>手机号</i>',
  '15': '<i>查看</i>了你的<i>企业动态</i>',
  '16': '<i>转发</i>了你的<i>名片</i>'
}

// 聊天内容滚动到底部
export function all_srcollBtoom (that) {
  that.$nextTick(function () {
    srcollBtoom()
    const imgs = document.querySelectorAll('.previewer-demo-img2')
    for (let i = 0; i < imgs.length; i++) {
      if (!imgs[i].getAttribute('isLoad')) {
        imgs[i].onload = function () {
          srcollBtoom()
          this.setAttribute('isLoad', true)
        }
      }
    }
  })
}

// 滚动到底的计算
export function srcollBtoom () {
  const ele = document.getElementById('im')
  if (ele) {
    ele.scrollTop = ele.scrollHeight
  }
}


/**
 * 去抖函数
 */
export function mydebounce(func, wait, options) {
    var lastArgs,
        lastThis,
        maxWait,
        result,
        timerId,
        lastCallTime,
        lastInvokeTime = 0,
        leading = false,
        maxing = false,
        trailing = true;

    if (typeof func != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
    }
    wait = parseInt(wait) || 0;

    function invokeFunc(time) {
        var args = lastArgs,
            thisArg = lastThis;

        lastArgs = lastThis = undefined;
        lastInvokeTime = time;
        result = func.apply(thisArg, args);
        return result;
    }

    function leadingEdge(time) {
        // Reset any `maxWait` timer.
        lastInvokeTime = time;
        // Start the timer for the trailing edge.
        timerId = setTimeout(timerExpired, wait);
        // Invoke the leading edge.
        return leading ? invokeFunc(time) : result;
    }

    function remainingWait(time) {
        var timeSinceLastCall = time - lastCallTime,
            timeSinceLastInvoke = time - lastInvokeTime,
            timeWaiting = wait - timeSinceLastCall;

        return maxing ?
            nativeMin(timeWaiting, maxWait - timeSinceLastInvoke) :
            timeWaiting;
    }

    function shouldInvoke(time) {
        var timeSinceLastCall = time - lastCallTime,
            timeSinceLastInvoke = time - lastInvokeTime;

        return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
            (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
    }

    function timerExpired() {
        var time = Date.now();
        if (shouldInvoke(time)) {
            return trailingEdge(time);
        }
        timerId = setTimeout(timerExpired, remainingWait(time));
    }

    function trailingEdge(time) {
        timerId = undefined;

        if (trailing && lastArgs) {
            return invokeFunc(time);
        }
        lastArgs = lastThis = undefined;
        return result;
    }

    function cancel() {
        if (timerId !== undefined) {
            clearTimeout(timerId);
        }
        lastInvokeTime = 0;
        lastArgs = lastCallTime = lastThis = timerId = undefined;
    }

    function flush() {
        return timerId === undefined ? result : trailingEdge(Date.now());
    }

    function debounced() {
        var time = Date.now(),
            isInvoking = shouldInvoke(time);

        lastArgs = arguments;
        lastThis = this;
        lastCallTime = time;

        if (isInvoking) {
            if (timerId === undefined) {
                return leadingEdge(lastCallTime);
            }
            if (maxing) {
                // Handle invocations in a tight loop.
                timerId = setTimeout(timerExpired, wait);
                return invokeFunc(lastCallTime);
            }
        }
        if (timerId === undefined) {
            timerId = setTimeout(timerExpired, wait);
        }
        return result;
    }
    debounced.cancel = cancel;
    debounced.flush = flush;
    return debounced;
}
