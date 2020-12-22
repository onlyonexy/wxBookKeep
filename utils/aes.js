const CryptoJs = require('crypto-js');
const defaultKey = "23d$%Q#kjwgsl@@$#@"; // 默认的key
const defaultIv = "ogiGRWos02oH22301#"; // 默认的key 偏移量



/**
 * 加密方法
 * @param: str 需要加密的字符
 * @param: key 密钥
 * @param: iv 密钥偏移量
 */
function encrypt(str, key, iv) {
  const keyStr = key ? encParse(key) : encParse(defaultKey);
  const ivStr = iv ? encParse(iv) : encParse(defaultIv);

  const encryptedStr = CryptoJs.AES.encrypt(str, keyStr, {
    iv: ivStr,
    mode: CryptoJs.mode.CFB,
    padding: CryptoJs.pad.Pkcs7
  });

  // 直接toString()是base64格式的字符串
  // ciphertext.toString() 是128位的字符串
  return encryptedStr.toString();
}
/**
 * 解密方法
 * @param: str 需要解密的字符
 * @param: key 密钥
 * @param: iv 密钥偏移量
 */
function decrypt(str, key, iv) {
  const keyStr = key ? encParse(key) : encParse(defaultKey);
  const ivStr = iv ? encParse(iv) : encParse(defaultIv);

  // 判断str是否为base64,如果不是就要转base64，是了就不能再转
  const flag = isBase64(str);
  if (!flag) {
    // 转为base64之前要先转16进制
    str = CryptoJs.enc.Hex.parse(str);
    // 只有base64格式的字符才能被解密
    str = CryptoJs.enc.Base64.stringify(str);
  }

  const encryptedStr = CryptoJs.AES.decrypt(str, keyStr, {
    iv: ivStr,
    mode: CryptoJs.mode.CFB,
    padding: CryptoJs.pad.Pkcs7
  });
  return encryptedStr.toString(CryptoJs.enc.Utf8);
}
/**
 * 处理密钥字符格式
 * @param: key 需要转格式的字符
 */
function encParse(key) {
  // key = CryptoJs.enc.Utf8.parse(key);
  return CryptoJs.enc.Latin1.parse(key);
}
/**
 * 使用MD5 hash字符串
 * @param: str 需要加密的字符串
 * @param: times 需要hash的次数
 */
function md5(str, times = 1) {
  for (let i = 0; i < times; i++) {
    str = CryptoJs.MD5(str).toString();
  }
  return str;
}
/**
 * 判断是否是Base64格式的字符串
 */
function isBase64(str) {
  let reg = /^(([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{3}=))|(([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{2}==))$/;
  return reg.test(str);
}


const key = CryptoJs.enc.Utf8.parse('8*/5@so!@^&*23()') // 十六位十六进制数作为密钥
const iv = CryptoJs.enc.Utf8.parse("12sd@#7/*5+6*-78"); //十六位十六进制数作为密钥偏移量
// 解密方法
export const DecryptContent = (word)  => {
    var encryptedHexStr = CryptoJs.enc.Hex.parse(word);
    var srcs = CryptoJs.enc.Base64.stringify(encryptedHexStr);
    let decrypt = CryptoJs.AES.decrypt(srcs, key, {
        iv: iv,
        mode: CryptoJs.mode.CBC,
        padding: CryptoJs.pad.Pkcs7
    })
    let decryptedStr = decrypt.toString(CryptoJs.enc.Utf8)
    return decryptedStr.toString()
}
 
// 加密方法
export const  EncryptContent = (word)  =>{
    let encrypted = CryptoJs.AES.encrypt(word, key, {
        iv: iv,
        mode: CryptoJs.mode.CBC,
        padding: CryptoJs.pad.Pkcs7
    })
    return encrypted.toString()
}

// export default {
//   decrypt,
//   encrypt,
//   DecryptContent,
//   EncryptContent,
//   md5
// }