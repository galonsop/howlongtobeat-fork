"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios = require('axios');
const UserAgent = require('user-agents');
/**
 * Takes care about the http connection and response handling
 */
class HltbSearch {
    constructor() {
        this.payload = {
            'searchType': 'games',
            'searchTerms': [],
            'searchPage': 1,
            'size': 20,
            'searchOptions': {
                'games': {
                    'userId': 0,
                    'platform': '',
                    'sortCategory': 'popular',
                    'rangeCategory': 'main',
                    'rangeTime': {
                        'min': null,
                        'max': null
                    },
                    'gameplay': {
                        'perspective': '',
                        'flow': '',
                        'genre': ''
                    },
                    'rangeYear': {
                        'min': '',
                        'max': ''
                    },
                    'modifier': ''
                },
                'users': {
                    'sortCategory': 'postcount'
                },
                'lists': {
                    'sortCategory': 'follows'
                },
                'filter': '',
                'sort': 0,
                'randomizer': 0
            }
        };
    }
    detailHtml(gameId, signal) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let result = yield axios.get(`${HltbSearch.DETAIL_URL}${gameId}`, {
                    followRedirect: false,
                    headers: {
                        'pragma': 'no-cache',
                        'cache-control': 'no-cache',
                        'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
                        'sec-ch-ua-platform': '"macOS"',
                        'sec-ch-ua-mobile': '?0',
                        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
                        'content-type': 'application/json',
                        'accept': '*/*',
                        'origin': 'https://howlongtobeat.com',
                        'sec-fetch-site': 'same-origin',
                        'sec-fetch-mode': 'cors',
                        'sec-fetch-dest': 'empty',
                        'referer': 'https://howlongtobeat.com/',
                        'accept-language': 'es-ES,es;q=0.9,en;q=0.8,pt;q=0.7,gl;q=0.6'
                    },
                    timeout: 20000,
                    signal,
                }).catch(e => { throw e; });
                return result.data;
            }
            catch (error) {
                if (error) {
                    throw new Error(error);
                }
                else if (error.response.status !== 200) {
                    throw new Error(`Got non-200 status code from howlongtobeat.com [${error.response.status}]
          ${JSON.stringify(error.response)}
        `);
                }
            }
        });
    }
    search(query, signal) {
        return __awaiter(this, void 0, void 0, function* () {
            // Use built-in javascript URLSearchParams as a drop-in replacement to create axios.post required data param
            let search = Object.assign({}, this.payload);
            search.searchTerms = query;
            try {
                let result = yield axios.post(HltbSearch.SEARCH_URL, search, {
                    headers: {
                        'pragma': 'no-cache',
                        'cache-control': 'no-cache',
                        'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
                        'sec-ch-ua-platform': '"macOS"',
                        'sec-ch-ua-mobile': '?0',
                        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
                        'content-type': 'application/json',
                        'accept': '*/*',
                        'origin': 'https://howlongtobeat.com',
                        'sec-fetch-site': 'same-origin',
                        'sec-fetch-mode': 'cors',
                        'sec-fetch-dest': 'empty',
                        'referer': 'https://howlongtobeat.com/',
                        'accept-language': 'es-ES,es;q=0.9,en;q=0.8,pt;q=0.7,gl;q=0.6'
                    },
                    timeout: 20000,
                    signal,
                });
                // console.log('Result', JSON.stringify(result.data));
                return result.data;
            }
            catch (error) {
                if (error) {
                    throw new Error(error);
                }
                else if (error.response.status !== 200) {
                    throw new Error(`Got non-200 status code from howlongtobeat.com [${error.response.status}]
          ${JSON.stringify(error.response)}
        `);
                }
            }
        });
    }
}
HltbSearch.BASE_URL = 'https://howlongtobeat.com/';
HltbSearch.DETAIL_URL = `${HltbSearch.BASE_URL}game?id=`;
HltbSearch.SEARCH_URL = `${HltbSearch.BASE_URL}api/search`;
HltbSearch.IMAGE_URL = `${HltbSearch.BASE_URL}games/`;
exports.HltbSearch = HltbSearch;
//# sourceMappingURL=hltbsearch.js.map