const RPCClient = require('@alicloud/pop-core').RPCClient;

const client = new RPCClient({
    accessKeyId: 'LTAIYZfnAG47b1hw',
    accessKeySecret: 'b54UIjMRok0bqKd7mrHgtaNBjl6vk0',
    endpoint: 'https://nls-meta.cn-shanghai.aliyuncs.com',
    apiVersion: '2019-02-28'
});

exports.requestToken = (callback) => {
    client.request('CreateToken').then((result) => {
        callback(result.Token.Id);
    });
}