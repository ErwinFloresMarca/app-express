module.exports = {
  success(data) {
    return {
      status: 200,
      data: data
    }
  },
  error(errmsn) {
    return {
      status: 400,
      msn: errmsn
    }
  }
}
