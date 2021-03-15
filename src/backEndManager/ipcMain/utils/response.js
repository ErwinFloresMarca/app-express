module.exports = {
  success(data) {
    return {
      code: 20000,
      data: data
    }
  },
  error(errmsn) {
    return {
      code: 40000,
      data: {
        message: errmsn
      }
    }
  }
}
