import { Notify, copyToClipboard, date } from 'quasar'

export function success(msg: string, icon = 'check_circle') {
  Notify.create({
    type: 'positive',
    icon: icon,
    message: msg,
  })
}

export function fail(msg: string) {
  Notify.create({
    type: 'negative',
    message: msg,
  })
}

export function str2color(status: string) {
  if (status === 'Pending') return 'orange'
  else if (status === 'Finished') return 'green'
  else return 'teal'
}

export function fmtTime(time: string): string {
  // return new Date(time).toLocaleString('zh-cn', {
  //   hour12: false,
  // })
  return date.formatDate(time, 'YY/MM/DD HH:mm')
}

export function copy(str: string) {
  copyToClipboard(str).then(() => {
    success('已复制到剪贴板')
  })
}

export function onRejected(rejectedEntries: File[]) {
  Notify.create({
    type: 'negative',
    message: `${rejectedEntries.length} 个文件未通过检查`,
  })
}

export function notEmpty(val: string) {
  return !!val || '* 不能为空'
}

export function maxLength(val: string, length: number) {
  if (!val) return true
  return val.length <= length || `! 最多输入 ${length} 个字符`
}
