function getCheckCode(id) {
    const weightingFactors = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
    const checkCodes = [1, 0, 'x', 9, 8, 7, 6, 5, 4, 3, 2]
    id = id.split('')
    id.pop()
    let total = 0
    id.forEach((item, i) => {
        total += (+item)*weightingFactors[i]
    })
    return checkCodes[total%11]
}

// 18位身份证号的严格校验，加入地区（精确到省级行政区），加权因子的校验
function checkId(id) {
    const provinceCodes = [11, 12, 13, 14, 15, 
        21, 22, 23,
        31, 32, 33, 34, 35, 36, 37,
        41, 42, 43, 44, 45, 46,
        50, 51, 52, 53, 54,
        61, 62, 63, 64, 65, 
        81, 82, 83]
    let provinces = provinceCodes.join('|')
    const checkCode = getCheckCode(id)
    const reg = new RegExp(String.raw`^(${provinces})\d{4}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])(\d{3})${checkCode}$`, 'i')
    return reg.test(id)
}

exports.checkId = checkId
