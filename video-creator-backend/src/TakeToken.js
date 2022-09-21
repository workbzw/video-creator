const RPCClient = require('@alicloud/pop-core').RPCClient;


exports.requestToken = (id,secret,callback) => {
    const client = new RPCClient({
        accessKeyId: id,
        accessKeySecret: secret,
        endpoint: 'https://nls-meta.cn-shanghai.aliyuncs.com',
        apiVersion: '2019-02-28'
    });
    client.request('CreateToken').then((result) => {
        callback(result.Token.Id);
    });
}