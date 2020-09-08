const promisic = function(n) {
    return function(t = {}) {
      return new Promise((c, r) => {
        const s = Object.assign(t, {
          success: n => {
            c(n);
          },
          fail: n => {
            r(n);
          }
        });
        n(s);
      });
    };
  },
  px2rpx = function(n) {
    const { screenWidth: t } = wx.getSystemInfoSync();
    return (750 / t) * n;
  };
var now = new Date(); //当前日期
var nowDayOfWeek = now.getDay(); //今天本周的第几天
var nowDay = now.getDate(); //当前日
var nowMonth = now.getMonth(); //当前月
var nowYear = now.getYear(); //当前年
nowYear += nowYear < 2000 ? 1900 : 0; //

var lastMonthDate = new Date(); //上月日期
lastMonthDate.setDate(1);
lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);
var lastYear = lastMonthDate.getYear();
var lastMonth = lastMonthDate.getMonth();

/*时间戳改日期--不传第二个参数返回年月日,传第二个参数返回年月日时分秒*/
function formatDateTime(inputTime, type) {
  var date = new Date(inputTime);
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  m = m < 10 ? "0" + m : m;
  var d = date.getDate();
  d = d < 10 ? "0" + d : d;
  var h = date.getHours();
  h = h < 10 ? "0" + h : h;
  var minute = date.getMinutes();
  var second = date.getSeconds();
  minute = minute < 10 ? "0" + minute : minute;
  second = second < 10 ? "0" + second : second;
  if (type) {
    return y + "-" + m + "-" + d + " " + h + ":" + minute + ":" + second; //2017-12-12 12:23:34
  } else {
    return y + "-" + m + "-" + d; //2017-12-12
  }
}

//格局化日期：yyyy-MM-dd
function formatDate(date) {
  var myyear = date.getFullYear();
  var mymonth = date.getMonth() + 1;
  var myweekday = date.getDate();

  if (mymonth < 10) {
    mymonth = "0" + mymonth;
  }
  if (myweekday < 10) {
    myweekday = "0" + myweekday;
  }
  return myyear + "-" + mymonth + "-" + myweekday;
}

function getTodayStart() {
  return new Date(new Date().toLocaleDateString()).getTime() / 1000;
}

function getTodayEnd() {
  return (
    new Date(new Date().toLocaleDateString()).getTime() / 1000 + 24 * 3600 - 1
  );
}

//获得某月的天数
function getMonthDays(myMonth) {
  var monthStartDate = new Date(nowYear, myMonth, 1);
  var monthEndDate = new Date(nowYear, myMonth + 1, 1);
  var days = (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24);
  return days;
}

//获得本季度的开端月份
function getQuarterStartMonth() {
  var quarterStartMonth = 0;
  if (nowMonth < 3) {
    quarterStartMonth = 0;
  }
  if (2 < nowMonth && nowMonth < 6) {
    quarterStartMonth = 3;
  }
  if (5 < nowMonth && nowMonth < 9) {
    quarterStartMonth = 6;
  }
  if (nowMonth > 8) {
    quarterStartMonth = 9;
  }
  return quarterStartMonth;
}

//获得本周的开端日期
const getWeekStartDate = function() {
  var weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek + 1);
  return weekStartDate.getTime() / 1000;
};

//获得本周的停止日期
const getWeekEndDate = function() {
  var weekEndDate = new Date(nowYear, nowMonth, nowDay + (7 - nowDayOfWeek));
  return weekEndDate.getTime() / 1000 + 24 * 3600 - 1;
};

//获得本月的开端日期
const getMonthStartDate = function() {
  var monthStartDate = new Date(nowYear, nowMonth, 1);
  return monthStartDate.getTime() / 1000;
};

//获得本月的停止日期
const getMonthEndDate = function() {
  var monthEndDate = new Date(nowYear, nowMonth, getMonthDays(nowMonth));
  return monthEndDate.getTime() / 1000 + 24 * 3600 - 1;
};

//获得上月开端时候
const getLastMonthStartDate = function() {
  var lastMonthStartDate = new Date(nowYear, lastMonth, 1);
  return lastMonthStartDate.getTime() / 1000;
};

//获得上月停止时候
const getLastMonthEndDate = function() {
  var lastMonthEndDate = new Date(nowYear, lastMonth, getMonthDays(lastMonth));
  return lastMonthEndDate.getTime() / 1000 + 24 * 3600 - 1;
};

//获得本季度的开端日期
function getQuarterStartDate() {
  var quarterStartDate = new Date(nowYear, getQuarterStartMonth(), 1);
  return formatDate(quarterStartDate);
}

//或的本季度的停止日期
function getQuarterEndDate() {
  var quarterEndMonth = getQuarterStartMonth() + 2;
  var quarterStartDate = new Date(
    nowYear,
    quarterEndMonth,
    getMonthDays(quarterEndMonth)
  );
  return formatDate(quarterStartDate);
}

// 获得本年开始日期
const getYearStartDate = function() {
  var yearStartDate = new Date(nowYear, 0, 1);
  return formatDate(yearStartDate);
};
// 获得本年结束日期
const getYearEndDate = function() {
  var yearEndDate = new Date(nowYear, 11, 1);
  return formatDate(yearEndDate);
};

export {
  promisic,
  px2rpx,
  formatDateTime,
  getMonthStartDate,
  getMonthEndDate,
  getWeekStartDate,
  getWeekEndDate,
  getTodayStart,
  getTodayEnd,
  getLastMonthStartDate,
  getLastMonthEndDate
};
