const prod = process.env.NODE_ENV === 'production';

module.exports = {
    'process.env.BASE_URL': prod ? 'https://nizzolilaurent.herokuapp.com' : 'http://localhost:3000',
    'process.env.NAMESPACE': 'https://nizzolilaurent.herokuapp.com',
    'process.env.CLIENT_ID': 'JGcmOSpCzImmzYY1FG4xfTv0Qap2VkEv'
}
