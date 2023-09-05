/*
 * Surge 网络详情面板
 * @Nebulosa-Cat
 * 详情见 README
 */

/**
 * 网络请求封装为 Promise
 * Usage: httpMethod.get(option).then(response => { logger.log(data) }).catch(error => { logger.log(error) })
 * Usage: httpMethod.post(option).then(response => { logger.log(data) }).catch(error => { logger.log(error) })
 * response: { status, headers, data }
 */
class httpMethod {
  /**
   * 回调函数
   * @param {*} resolve
   * @param {*} reject
   * @param {*} error
   * @param {*} response
   * @param {*} data
   */
  static _httpRequestCallback(resolve, reject, error, response, data) {
    if (error) {
      reject(error);
    } else {
      resolve(Object.assign(response, { data }));
    }
  }

  /**
   * HTTP GET
   * @param {Object} option 选项
   * @returns
   */
  static get(option = {}) {
    return new Promise((resolve, reject) => {
      $httpClient.get(option, (error, response, data) => {
        this._httpRequestCallback(resolve, reject, error, response, data);
      });
    });
  }

  /**
   * HTTP POST
   * @param {Object} option 选项
   * @returns
   */
  static post(option = {}) {
    return new Promise((resolve, reject) => {
      $httpClient.post(option, (error, response, data) => {
        this._httpRequestCallback(resolve, reject, error, response, data);
      });
    });
  }
}

class loggerUtil {
  constructor() {
    this.id = randomString();
  }

  log(message) {
    message = `[${this.id}] [ LOG ] ${message}`;
    console.log(message);
  }

  error(message) {
    message = `[${this.id}] [ERROR] ${message}`;
    console.log(message);
  }
}

var logger = new loggerUtil();

function randomString(e = 6) {
  var t = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678",
    a = t.length,
    n = "";
  for (i = 0; i < e; i++) n += t.charAt(Math.floor(Math.random() * a));
  return n;
}

function getFlagEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function loadCarrierNames() {
  //整理逻辑:前三码相同->后两码相同运营商->剩下的
  return {
    //台湾运营商 Taiwan
    '466-11': '中華電信', '466-92': '中華電信',
    '466-01': '遠傳電信', '466-03': '遠傳電信',
    '466-97': '台灣大哥大', '466-89': '台灣之星', '466-05': 'GT',
    //大陆运营商 China
    '460-03': '中国电信', '460-05': '中国电信', '460-11': '中国电信',
    '460-01': '中国联通', '460-06': '中国联通', '460-09': '中国联通',
    '460-00': '中国移动', '460-02': '中国移动', '460-04': '中国移动', '460-07': '中国移动', '460-08': '中国移动',
    '460-15': '中国广电', '460-20': '中移铁通',
    //香港运营商 HongKong
    '454-00': 'CSL', '454-02': 'CSL', '454-10': 'CSL', '454-18': 'CSL',
    '454-03': '3', '454-04': '3', '454-05': '3',
    '454-06': 'SMC HK', '454-15': 'SMC HK', '454-17': 'SMC HK',
    '454-09': 'CMHK', '454-12': 'CMHK', '454-13': 'CMHK', '454-28': 'CMHK', '454-31': 'CMHK',
    '454-16': 'csl.', '454-19': 'csl.', '454-20': 'csl.', '454-29': 'csl.',
    '454-01': '中信國際電訊', '454-07': 'UNICOM HK', '454-08': 'Truphone', '454-11': 'CHKTL', '454-23': 'Lycamobile',
    //日本运营商 Japan
    '440-00': 'Y!mobile', '440-10': 'docomo', '440-11': 'Rakuten', '440-20': 'SoftBank',
    '440-50': ' au', '440-51': ' au', '440-52': ' au', '440-53': ' au', '440-54': ' au',
    '441-00': 'WCP', '441-10': 'UQ WiMAX',
    //韩国运营商 Korea
    '450-03': 'SKT', '450-05': 'SKT',
    '450-02': 'KT', '450-04': 'KT', '450-08': 'KT',
    '450-06': 'LG U+', '450-10': 'LG U+',
    //美国运营商 USA
    '310-030': 'AT&T', '310-070': 'AT&T', '310-150': 'AT&T', '310-170': 'AT&T', '310-280': 'AT&T', '310-380': 'AT&T', '310-410': 'AT&T', '310-560': 'AT&T', '310-680': 'AT&T', '310-980': 'AT&T',
    '310-160': 'T-Mobile', '310-200': 'T-Mobile', '310-210': 'T-Mobile', '310-220': 'T-Mobile', '310-230': 'T-Mobile', '310-240': 'T-Mobile', '310-250': 'T-Mobile', '310-260': 'T-Mobile', '310-270': 'T-Mobile', '310-300': 'T-Mobile', '310-310': 'T-Mobile', '310-660': 'T-Mobile', '310-800': 'T-Mobile', '311-660': 'T-Mobile', '311-882': 'T-Mobile', '311-490': 'T-Mobile', '312-530': 'T-Mobile', '311-870': 'T-Mobile', '311-880': 'T-Mobile',
    '310-004': 'Verizon', '310-010': 'Verizon', '310-012': 'Verizon', '310-013': 'Verizon', '311-110': 'Verizon', '311-270': 'Verizon', '311-271': 'Verizon', '311-272': 'Verizon', '311-273': 'Verizon', '311-274': 'Verizon', '311-275': 'Verizon', '311-276': 'Verizon', '311-277': 'Verizon', '311-278': 'Verizon', '311-279': 'Verizon', '311-280': 'Verizon', '311-281': 'Verizon', '311-282': 'Verizon', '311-283': 'Verizon', '311-284': 'Verizon', '311-285': 'Verizon', '311-286': 'Verizon', '311-287': 'Verizon', '311-288': 'Verizon', '311-289': 'Verizon', '311-390': 'Verizon', '311-480': 'Verizon', '311-481': 'Verizon', '311-482': 'Verizon', '311-483': 'Verizon', '311-484': 'Verizon', '311-485': 'Verizon', '311-486': 'Verizon', '311-487': 'Verizon', '311-488': 'Verizon', '311-489': 'Verizon', '310-590': 'Verizon', '310-890': 'Verizon', '310-910': 'Verizon',
    '310-120': 'Sprint',
    '310-850': 'Aeris Comm. Inc.', '310-510': 'Airtel Wireless LLC', '312-090': 'Allied Wireless Communications Corporation', '310-710': 'Arctic Slope Telephone Association Cooperative Inc.', '311-440': 'Bluegrass Wireless LLC', '311-800': 'Bluegrass Wireless LLC', '311-810': 'Bluegrass Wireless LLC', '310-900': 'Cable & Communications Corp.', '311-590': 'California RSA No. 3 Limited Partnership', '311-500': 'Cambridge Telephone Company Inc.', '310-830': 'Caprock Cellular Ltd.', '312-270': 'Cellular Network Partnership LLC', '312-280': 'Cellular Network Partnership LLC', '310-360': 'Cellular Network Partnership LLC', '311-120': 'Choice Phone LLC', '310-480': 'Choice Phone LLC', '310-420': 'Cincinnati Bell Wireless LLC', '310-180': 'Cingular Wireless', '310-620': 'Coleman County Telco /Trans TX', '310-06': 'Consolidated Telcom', '310-60': 'Consolidated Telcom', '310-700': 'Cross Valliant Cellular Partnership', '312-030': 'Cross Wireless Telephone Co.', '311-140': 'Cross Wireless Telephone Co.', '312-040': 'Custer Telephone Cooperative Inc.', '310-440': 'Dobson Cellular Systems', '310-990': 'E.N.M.R. Telephone Coop.', '312-120': 'East Kentucky Network LLC', '312-130': 'East Kentucky Network LLC', '310-750': 'East Kentucky Network LLC', '310-090': 'Edge Wireless LLC', '310-610': 'Elkhart TelCo. / Epic Touch Co.', '311-311': 'Farmers', '311-460': 'Fisher Wireless Services Inc.', '311-370': 'GCI Communication Corp.', '310-430': 'GCI Communication Corp.', '310-920': 'Get Mobile Inc.', '311-340': 'Illinois Valley Cellular RSA 2 Partnership', '312-170': 'Iowa RSA No. 2 Limited Partnership', '311-410': 'Iowa RSA No. 2 Limited Partnership', '310-770': 'Iowa Wireless Services LLC', '310-650': 'Jasper', '310-870': 'Kaplan Telephone Company Inc.', '312-180': 'Keystone Wireless LLC', '310-690': 'Keystone Wireless LLC', '311-310': 'Lamar County Cellular', '310-016': 'Leap Wireless International Inc.', '310-040': 'Matanuska Tel. Assn. Inc.', '310-780': 'Message Express Co. / Airlink PCS', '311-330': 'Michigan Wireless LLC', '310-400': 'Minnesota South. Wirel. Co. / Hickory', '311-010': 'Missouri RSA No 5 Partnership', '312-010': 'Missouri RSA No 5 Partnership', '311-020': 'Missouri RSA No 5 Partnership', '312-220': 'Missouri RSA No 5 Partnership', '311-920': 'Missouri RSA No 5 Partnership', '310-350': 'Mohave Cellular LP', '310-570': 'MTPCS LLC', '310-290': 'NEP Cellcorp Inc.', '310-34': 'Nevada Wireless LLC', '310-600': 'New-Cell Inc.', '311-300': 'Nexus Communications Inc.', '310-130': 'North Carolina RSA 3 Cellular Tel. Co.', '312-230': 'North Dakota Network Company', '311-610': 'North Dakota Network Company', '310-450': 'Northeast Colorado Cellular Inc.', '311-710': 'Northeast Wireless Networks LLC', '310-011': 'Northstar', '310-670': 'Northstar', '311-420': 'Northwest Missouri Cellular Limited Partnership', '310-760': 'Panhandle Telephone Cooperative Inc.', '310-580': 'PCS ONE', '311-170': 'PetroCom', '311-670': 'Pine Belt Cellular, Inc.', '310-100': 'Plateau Telecommunications Inc.', '310-940': 'Poka Lambro Telco Ltd.', '310-500': 'Public Service Cellular Inc.', '312-160': 'RSA 1 Limited Partnership', '311-430': 'RSA 1 Limited Partnership', '311-350': 'Sagebrush Cellular Inc.', '310-46': 'SIMMETRY', '311-260': 'SLO Cellular Inc / Cellular One of San Luis', '310-320': 'Smith Bagley Inc.', '316-011': 'Southern Communications Services Inc.', '310-740': 'Telemetrix Inc.', '310-14': 'Testing', '310-860': 'Texas RSA 15B2 Limited Partnership', '311-050': 'Thumb Cellular Limited Partnership', '311-830': 'Thumb Cellular Limited Partnership', '310-460': 'TMP Corporation', '310-490': 'Triton PCS', '312-290': 'Uintah Basin Electronics Telecommunications Inc.', '311-860': 'Uintah Basin Electronics Telecommunications Inc.', '310-960': 'Uintah Basin Electronics Telecommunications Inc.', '310-020': 'Union Telephone Co.', '311-220': 'United States Cellular Corp.', '310-730': 'United States Cellular Corp.', '311-650': 'United Wireless Communications Inc.', '310-003': 'Unknown', '310-15': 'Unknown', '310-23': 'Unknown', '310-24': 'Unknown', '310-25': 'Unknown', '310-26': 'Unknown', '310-190': 'Unknown', '310-950': 'Unknown', '310-38': 'USA 3650 AT&T', '310-999': 'Various Networks', '310-520': 'VeriSign', '310-530': 'West Virginia Wireless', '310-340': 'Westlink Communications, LLC', '311-070': 'Wisconsin RSA #7 Limited Partnership', '310-390': 'Yorkville Telephone Cooperative',
    //英国运营商 UK
    '234-08': 'BT OnePhone UK', '234-10': 'O2-UK', '234-15': 'vodafone UK', '234-20': '3', '234-30': 'EE', '234-33': 'EE', '234-38': 'Virgin', '234-50': 'JT', '234-55': 'Sure', '234-58': 'Manx Telecom',
    //菲律宾运营商 Philippine
    '515-01': 'Islacom', '515-02': 'Globe', '515-03': 'Smart', '515-04': 'Sun', '515-08': 'Next Mobile', '515-18': 'Cure', '515-24': 'ABS-CBN',
    //越南运营商 Vietnam
    '452-01': 'Mobifone', '452-02': 'VinaPhone', '452-03': 'S-Fone', '452-04': 'Viettel', '452-05': 'VietNamobile', '452-06': 'E-mobile', '452-07': 'Gmobile',
  };
}

//获取手机运营商信息(通过内置的 API 调用设备信息)
function getCellularInfo() {
  const radioGeneration = {
    'GPRS': '2.5G',
    'CDMA1x': '2.5G',
    'EDGE': '2.75G',
    'WCDMA': '3G',
    'HSDPA': '3.5G',
    'CDMAEVDORev0': '3.5G',
    'CDMAEVDORevA': '3.5G',
    'CDMAEVDORevB': '3.75G',
    'HSUPA': '3.75G',
    'eHRPD': '3.9G',
    'LTE': '4G',
    'NRNSA': '5G',
    'NR': '5G',
  };

  let cellularInfo = '';
  const carrierNames = loadCarrierNames();
  if ($network['cellular-data']) {
    const carrierId = $network['cellular-data'].carrier;
    const radio = $network['cellular-data'].radio;
    if ($network.wifi?.ssid == null && radio) {
      cellularInfo = carrierNames[carrierId] ?
        `${carrierNames[carrierId]} | ${radioGeneration[radio]} - ${radio} ` :
        `Cellular Data | ${radioGeneration[radio]} - ${radio}`;
    }
  }
  return cellularInfo;
}

function getSSID() {
  return $network.wifi?.ssid;
}

function getIP() {
  const { v4, v6 } = $network;
  let info = [];

  if (!v4 && !v6) {
    info = ['Network may be interrupted', 'Please refresh manually to obtain a new IP'];
  } else {
    let ipv6 = v6?.primaryAddress;
    let ipv4 = v4?.primaryAddress;
    let router = v4?.primaryRouter;

    // Print the original IPs
    console.log("Original IPv6: ", ipv6);
    console.log("Original IPv4: ", ipv4);
    console.log("Original Router IP: ", router);

    // Transform IPs
    ipv6 = transformFont(ipv6, TABLE, INDEX);
    ipv4 = transformFont(ipv4, TABLE, INDEX);
    router = transformFont(router, TABLE, INDEX);

    if (ipv6) {
      info.push(`𝙸𝙿𝚟𝟼:${ipv6}`);
    } else if (ipv4) {
      info.push(`𝙸𝙿𝚟𝟺:${ipv4}`);
    }

    if (router && getSSID()) {
      info.push(`𝚁𝙾𝚄𝚃𝙴𝚁 𝙸𝙿:${router}`);
    }
  }

  info = info.join("\n");
  return info + "\n";
}

// 字体表
const TABLE = {
  "monospace-regular": ["𝟶", "𝟷", "𝟸", "𝟹", "𝟺", "𝟻", "𝟼", "𝟽", "𝟾", "𝟿", "𝚊", "𝚋", "𝚌", "𝚍", "𝚎", "𝚏", "𝚐", "𝚑", "𝚒", "𝚓", "𝚔", "𝚕", "𝚖", "𝚗", "𝚘", "𝚙", "𝚚", "𝚛", "𝚜", "𝚝", "𝚞", "𝚟", "𝚠", "𝚡", "𝚢", "𝚣", "𝙰", "𝙱", "𝙲", "𝙳", "𝙴", "𝙵", "𝙶", "𝙷", "𝙸", "𝙹", "𝙺", "𝙻", "𝙼", "𝙽", "𝙾", "𝙿", "𝚀", "𝚁", "𝚂", "𝚃", "𝚄", "𝚅", "𝚆", "𝚇", "𝚈", "𝚉"],
};

// 索引对象
const INDEX = {};
for (let i = 48; i <= 57; i++) INDEX[i] = i - 48; // 数字 0-9
for (let i = 65; i <= 90; i++) INDEX[i] = i - 65 + 36; // 大写字母 A-Z
for (let i = 97; i <= 122; i++) INDEX[i] = i - 97 + 10; // 小写字母 a-z

// 字体转换函数
function transformFont(str, table, index) {
  return [...(str || '')].map(c => {
    const code = c.charCodeAt(0).toString();
    const idx = index[code];
    return table["monospace-regular"][idx] || c;
  }).join('');
}

/**
 * 获取 IP 信息
 * @param {*} retryTimes // 重试次数
 * @param {*} retryInterval // 重试间隔 ms
 */
function getNetworkInfo(retryTimes = 5, retryInterval = 1000) {

  // 发送网络请求
  httpMethod.get('http://ip-api.com/json').then(response => {
    if (Number(response.status) > 300) {
      throw new Error(`Request error with http status code: ${response.status}\n${response.data}`);
    }
    const info = JSON.parse(response.data);
     // 字体转换
     const transformedQuery = transformFont(info.query, TABLE, INDEX);
     const transformedAs = transformFont(info.as, TABLE, INDEX);
     const transformedCountryCode = transformFont(info.countryCode, TABLE, INDEX);
     const transformedCity = transformFont(info.city, TABLE, INDEX);
 
     // 打印转换后的信息
     console.log("Transformed Node IP: ", transformedQuery);
     console.log("Transformed IRR: ", transformedAs);
     console.log("Transformed Country Code: ", transformedCountryCode);
     console.log("Transformed City: ", transformedCity);
 
     $done({
       title: getSSID() ?? getCellularInfo(),
       content:
         getIP() +
         '𝙿𝚁𝙾𝚇𝚈 𝙸𝙿:' + transformedQuery +
         '\n𝙰𝚂 𝙸𝙽𝙵𝙾:' + transformedAs +
         '\n𝙻𝙾𝙲𝙰𝚃𝙸𝙾𝙽:' + getFlagEmoji(info.countryCode) + ' | ' + transformedCountryCode + '  -  ' + transformedCity,
       icon: getSSID() ? 'wifi' : 'simcard',
       'icon-color': getSSID() ? '#5A9AF9' : '#8AB8DD',
     });
  }).catch(error => {
    // 网络切换
    if (String(error).startsWith("Network changed")) {
      if (getSSID()) {
        $network.wifi = undefined;
        $network.v4 = undefined;
        $network.v6 = undefined;
      }
    }
    // 判断是否还有重试机会
if (String(error).startsWith("Network changed")) {
  if (getSSID()) {
    $network.wifi = undefined;
    $network.v4 = undefined;
    $network.v6 = undefined;
  }
}
// Check if there are still retry chances
if (retryTimes > 0) {
  logger.error(error);
  logger.log(`Retry after ${retryInterval}ms`);
  // Execute the function again after retryInterval time
  setTimeout(() => getNetworkInfo(--retryTimes, retryInterval), retryInterval);
} else {
  // Print log
  logger.error(error);
  $done({
    title: 'Error Occurred',
    content: 'Unable to retrieve current network information.\nPlease check your network status and try again.',
    icon: 'wifi.exclamationmark',
    'icon-color': '#CB1B45',
  });
}
});
}
/**
 * 主要逻辑，程序入口
 */
(() => {
  const retryTimes = 5;
  const retryInterval = 1000;
  // Set script timeout to 30s (Surge script timeout is 30s)
  // End the process 500ms in advance
  const surgeMaxTimeout = 29500;
  // Script timeout
  // retryTimes * 5000 is the timeout for each network request (Surge network request timeout is 5s)
  const scriptTimeout = retryTimes * 5000 + retryTimes * retryInterval;
  setTimeout(() => {
    logger.log("Script timeout");
    $done({
      title: "Request Timeout",
      content: "The connection request has timed out. Please check your network status and try again.",
      icon: 'wifi.exclamationmark',
      'icon-color': '#CB1B45',
    });
  }, scriptTimeout > surgeMaxTimeout ? surgeMaxTimeout : scriptTimeout);

  // Get network information
  logger.log("Script start");
  getNetworkInfo(retryTimes, retryInterval);
})();