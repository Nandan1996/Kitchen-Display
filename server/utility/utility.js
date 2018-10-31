function getDateString() {
    const date = new Date();
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
}

function to(promise) {
    return promise.then(data => {
        return [null, data];
    })
        .catch(err => [err]);
}

module.exports = {
    getDateString, to
}