import $ from 'jquery'

export default async function request(url, options) {
    return new Promise(function(resolve, reject) {
        $.ajax({
            url: url,
            method: options.method,
            data: options.data,
            success(data) {
                resolve(data);
            },
            error(err) {
                reject(err);
            }
        });

    });

}