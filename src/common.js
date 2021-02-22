import { MessageBox } from 'element-ui';
import FileSaver from 'file-saver';

const XLSX = window.XLSX;
const XLSX2 = window.XLSX2;

/**
 * 信息确认
 * @param {*} msg 
 */
export function confirm(msg = '确认执行当前操作吗？') {
  return MessageBox.confirm(msg, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
}

/**
 * 日期转换
 * @param {*} date 
 * @param {*} fmt 
 */
export function convertDate(date, fmt) {
  var o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds() // 秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, date.getFullYear());
  };
  for(var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
      );
    };
  };
  return fmt;
}

function s2ab(s) {
  var buf = new ArrayBuffer(s.length);
  var view = new Uint8Array(buf);
  for(var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
  return buf;
}

/**
 * 导出excel文件通用
 * @param {*} el 
 * @param {*} fileName 
 */
export function exportExcel(el, fileName) {
  var wb = XLSX.utils.table_to_book(el);
  let wbDataInfo = wb.Sheets.Sheet1;
  for(let key in wbDataInfo) {
    if(wb.Sheets.Sheet1[key].t != undefined) {
      wb.Sheets.Sheet1[key].s = {
        alignment: {
          horizontal: 'center',
          vertical: 'center'
        }
      };
    };
  };
  var wbout = XLSX2.write(wb, {
    bookType: 'xlsx',
    bookSST: false,
    type: 'binary'
  });
  FileSaver.saveAs(new Blob([s2ab(wbout)]), {
    type: 'application/octest-stream'
  }, fileName + '.xlsx')
}