const axios: any = require('axios');
const UserAgent: any = require('user-agents');


/**
 * Takes care about the http connection and response handling
 */
export class HltbSearch {
  public static BASE_URL: string = 'https://howlongtobeat.com/';
  public static DETAIL_URL: string = `${HltbSearch.BASE_URL}game?id=`;
  public static SEARCH_URL: string = `${HltbSearch.BASE_URL}api/search`;
  public static IMAGE_URL: string = `${HltbSearch.BASE_URL}games/`;

  payload: any = {
    'searchType': 'games',
    'searchTerms': [

    ],
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
  }

  async detailHtml(gameId: string, signal?: AbortSignal): Promise<string> {
    try {
      let result =
        await axios.get(`${HltbSearch.DETAIL_URL}${gameId}`, {
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
    } catch (error) {
      if (error) {
        throw new Error(error);
      } else if (error.response.status !== 200) {
        throw new Error(`Got non-200 status code from howlongtobeat.com [${error.response.status}]
          ${JSON.stringify(error.response)}
        `);
      }
    }
  }

  async search(query: Array<string>, signal?: AbortSignal): Promise<any> {
    // Use built-in javascript URLSearchParams as a drop-in replacement to create axios.post required data param
    let search = { ...this.payload };
    search.searchTerms = query;
    try {
      let result =
        await axios.post(HltbSearch.SEARCH_URL, search, {
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
    } catch (error) {
      if (error) {
        throw new Error(error);
      } else if (error.response.status !== 200) {
        throw new Error(`Got non-200 status code from howlongtobeat.com [${error.response.status}]
          ${JSON.stringify(error.response)}
        `);
      }
    }
  }
}
