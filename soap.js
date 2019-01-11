const axios=require('axios')
axios({
    url: 'http://10.138.89.56:8181/ws/ServiceNow',
    method: get,
    data: {},
    headers: {
        'Content-Type': 'text/xml',
        
       // 'Authorization': 'Basic ' + Buffer.from('admin'+':'+'ynZVT7Uwa5gW').toString('base64'),
        'Authorization': 'Basic cGFydGg6UGFydGg=',
    }
}
)