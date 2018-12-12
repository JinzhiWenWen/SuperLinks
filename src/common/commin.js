// 转换是假格式
function getDate(time){
    var date = new Date(time);
    var Y = date.getFullYear() + '/';
    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '/';
    var D = date.getDate() + ' ';
    var h = date.getHours() + ':';
    var m = date.getMinutes() + ':';
    var s = date.getSeconds();
    return Y+M+D
}
// 转换日期 时间格式
function timestampToTime(timestamp) {
    var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '/';
    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '/';
    var D = date.getDate() + ' ';
    var h = (date.getHours()<10 ?'0'+(date.getHours()):date.getHours()) + ':';
    var m = (date.getMinutes()<10 ?'0'+(date.getMinutes()):date.getMinutes()) + ':';
    var s = (date.getSeconds()<10 ?'0'+(date.getSeconds()):date.getSeconds());
    return Y+M+D+h+m+s;
    }
function Typeface_time(timestamp) {
    var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '年';
    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '月';
    var D = date.getDate() + '日';
    var h = (date.getHours()<10 ?'0'+(date.getHours()):date.getHours()) + ':时';
    var m = (date.getMinutes()<10 ?'0'+(date.getMinutes()):date.getMinutes()) + '分';
    var s = (date.getSeconds()<10 ?'0'+(date.getSeconds()):date.getSeconds());
    return Y+M+D+h+m+s;
    }
    function Typeface_date(timestamp) {
        var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y = date.getFullYear() + '/';
        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '/';
        var D = date.getDate() + '';
        return Y+M+D;
        }
module.exports = {
    getDate,
    timestampToTime,
    Typeface_time,
    Typeface_date
}
